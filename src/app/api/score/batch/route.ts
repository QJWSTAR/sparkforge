import { NextRequest } from 'next/server';
import { scoreSignal } from '@/lib/scoring';
import { getSupabaseAdmin } from '@/lib/supabase';
import { addLogEntry } from '@/lib/signals';
import { apiSuccess, apiError } from '@/lib/api/response';
import { checkRateLimitAsync, getClientId } from '@/lib/api/rate-limit';

function isCronRequest(request: NextRequest): boolean {
  return request.headers.get('x-vercel-cron') === '1' || (request.headers.get('user-agent')?.includes('vercel-cron') ?? false);
}

function verifyApiKey(request: NextRequest): boolean {
  if (process.env.NODE_ENV !== 'production') return true;
  const authHeader = request.headers.get('authorization') || '';
  const bearerKey = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const apiKey = bearerKey || request.headers.get('x-api-key') || request.nextUrl.searchParams.get('key');
  return apiKey === process.env.CRON_API_KEY;
}

// Vercel cron 发送 GET 请求，手动调用可使用 POST
export async function GET(request: NextRequest) {
  if (!isCronRequest(request)) {
    return apiError('无权执行此操作', 401);
  }

  return handleBatchScore(request);
}

export async function POST(request: NextRequest) {
  if (!verifyApiKey(request)) {
    return apiError('无权执行此操作', 401);
  }

  return handleBatchScore(request);
}

async function handleBatchScore(request: NextRequest) {
  const clientId = getClientId(request);
  const rateCheck = await checkRateLimitAsync(clientId, 'ai-score');
  if (!rateCheck.allowed) {
    return apiError(`请求过于频繁，请 ${rateCheck.retryAfter} 秒后重试`, 429);
  }

  const supabaseAdmin = await getSupabaseAdmin();
  if (!supabaseAdmin) {
    return apiError('服务配置异常，请联系管理员', 500);
  }

  try {
    // GET 请求时使用默认 limit，POST 请求时从 body 读取
    let limit = 10;
    if (request.method === 'POST') {
      try {
        const body = await request.json();
        const rawLimit = body.limit ?? 10;
        limit = Math.min(Math.max(Number(rawLimit) || 10, 1), 100);
      } catch {
        // 非 JSON body 时使用默认值
      }
    }

    const { data: signals, error } = await supabaseAdmin
      .from('Signal')
      .select('*')
      .eq('status', 'PENDING')
      .order('hotScore', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    if (!signals || signals.length === 0) {
      return apiSuccess({ scored: 0, total: 0, message: 'No pending signals to score' });
    }

    let scoredCount = 0;
    const results: Array<{ id: string; score: number }> = [];

    for (const signal of signals) {
      try {
        const scoreResult = await scoreSignal({
          title: signal.title,
          description: signal.description || '',
          url: signal.url,
          tags: signal.tags,
          source: signal.source,
          hotScore: signal.hotScore,
        });

        await supabaseAdmin
          .from('Signal')
          .update({
            noveltyScore: scoreResult.noveltyScore,
            businessScore: scoreResult.businessScore,
            localScore: scoreResult.localScore,
            finalScore: scoreResult.finalScore,
            scoreVersion: scoreResult.version,
            status: 'SCORED',
            updatedAt: new Date().toISOString(),
          })
          .eq('id', signal.id);

        results.push({ id: signal.id, score: scoreResult.finalScore });
        scoredCount++;
      } catch (err) {
        console.error(`Failed to score signal ${signal.id}:`, err);
      }
    }

    await addLogEntry({
      type: 'SYSTEM',
      title: 'AI 批量评分完成',
      content: `已完成 ${scoredCount}/${signals.length} 条信号的 AI 评分`,
      metadata: { results },
    });

    return apiSuccess({
      scored: scoredCount,
      total: signals.length,
      results,
      message: `已完成 ${scoredCount} 条信号的 AI 评分`,
    });
  } catch (error) {
    console.error('Batch scoring error:', error);
    return apiError('批量评分失败，请稍后重试', 500);
  }
}