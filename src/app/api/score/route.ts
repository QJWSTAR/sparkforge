import { NextRequest } from 'next/server';
import { scoreSignal } from '@/lib/scoring';
import { getSupabaseAdmin } from '@/lib/supabase';
import { apiSuccess, apiError } from '@/lib/api/response';
import { checkRateLimit, getClientId } from '@/lib/api/rate-limit';

export async function POST(request: NextRequest) {
  // Accept API key from header or query param (Vercel cron jobs can't set headers)
  const apiKey = request.headers.get('x-api-key') || request.nextUrl.searchParams.get('key');
  if (apiKey !== process.env.CRON_API_KEY && process.env.NODE_ENV === 'production') {
    return apiError('无权执行此操作', 401);
  }

  // Rate limiting
  const clientId = getClientId(request);
  const rateCheck = checkRateLimit(clientId, 'ai-score');
  if (!rateCheck.allowed) {
    return apiError(`请求过于频繁，请 ${rateCheck.retryAfter} 秒后重试`, 429);
  }

  const supabaseAdmin = await getSupabaseAdmin();
  if (!supabaseAdmin) {
    return apiError('服务配置异常，请联系管理员', 500);
  }

  try {
    const { signalId } = await request.json();

    if (!signalId) {
      return apiError('缺少信号ID');
    }

    const { data: signal, error: fetchError } = await supabaseAdmin
      .from('Signal')
      .select('*')
      .eq('id', signalId)
      .single();

    if (fetchError || !signal) {
      return apiError('信号不存在', 404);
    }

    const scoreResult = await scoreSignal({
      title: signal.title,
      description: signal.description || '',
      url: signal.url,
      tags: signal.tags,
      source: signal.source,
      hotScore: signal.hotScore,
    });

    const { error: updateError } = await supabaseAdmin
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
      .eq('id', signalId);

    if (updateError) {
      console.error('Failed to update signal score:', updateError);
    }

    return apiSuccess(scoreResult);
  } catch (error) {
    console.error('Scoring API error:', error);
    return apiError('评分失败，请稍后重试', 500);
  }
}