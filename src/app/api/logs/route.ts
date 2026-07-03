import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth/verify';
import { apiSuccess, apiError, apiUnauthorized } from '@/lib/api/response';
import { checkRateLimit, getClientId } from '@/lib/api/rate-limit';

export async function GET() {
  const supabaseAdmin = await getSupabaseAdmin();

  if (!supabaseAdmin) {
    return apiError('数据库连接失败，请稍后重试', 500);
  }

  try {
    const { data: logs, error } = await supabaseAdmin
      .from('LogEntry')
      .select('*')
      .order('createdAt', { ascending: false })
      .limit(50);

    if (error) {
      return apiError('获取日志失败', 500);
    }

    return apiSuccess(logs ?? []);
  } catch (error) {
    console.error('Logs GET error:', error);
    return apiError('服务器内部错误，请稍后重试', 500);
  }
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const clientId = getClientId(request);
  const rateCheck = checkRateLimit(clientId, 'api');
  if (!rateCheck.allowed) {
    return apiError(`请求过于频繁，请 ${rateCheck.retryAfter} 秒后重试`, 429);
  }

  // Auth
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return apiUnauthorized(auth.error);
  }

  const supabaseAdmin = await getSupabaseAdmin();

  if (!supabaseAdmin) {
    return apiError('数据库连接失败，请稍后重试', 500);
  }

  const body = await request.json();
  const { content, type, metadata } = body;

  if (!content) {
    return apiError('日志内容不能为空');
  }

  // Sanitize content length
  const safeContent = String(content).slice(0, 5000);

  try {
    const { data: log, error: insertError } = await supabaseAdmin
      .from('LogEntry')
      .insert({
        id: crypto.randomUUID(),
        userId: auth.user.id,
        type: type || 'SYSTEM',
        content: safeContent,
        metadata: metadata || {},
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      return apiError('创建日志失败', 500);
    }

    return apiSuccess(log);
  } catch (error) {
    console.error('Logs POST error:', error);
    return apiError('服务器内部错误，请稍后重试', 500);
  }
}