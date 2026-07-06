import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth/verify';
import { apiSuccess, apiError, apiUnauthorized } from '@/lib/api/response';
import { checkRateLimitAsync, getClientId } from '@/lib/api/rate-limit';

// 公开可见的活动类型（用于 /stream 动态广场）
const PUBLIC_TYPES = ['FORGE_COMPLETED', 'CANVAS_GENERATED', 'SIGNAL_TOP10', 'USER_POST'];

export async function GET(request: NextRequest) {
  const supabaseAdmin = await getSupabaseAdmin();

  if (!supabaseAdmin) {
    return apiError('数据库连接失败，请稍后重试', 500);
  }

  const { searchParams } = new URL(request.url);
  const scope = searchParams.get('scope') || 'public';
  const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 50);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  try {
    if (scope === 'mine') {
      // 个人活动 — 需要认证，只返回当前用户的活动
      const auth = await verifyAuth(request);
      if (!auth.success) {
        return apiUnauthorized(auth.error);
      }

      const { data: logs, error } = await supabaseAdmin
        .from('LogEntry')
        .select('id, type, title, content, signalId, createdAt, metadata')
        .eq('userId', auth.user.id)
        .neq('type', 'SYSTEM')
        .order('createdAt', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        return apiError('获取活动失败', 500);
      }

      return apiSuccess(logs ?? []);
    }

    // 公开动态 — 无需认证，只返回公开类型，不暴露 userId
    const { data: logs, error } = await supabaseAdmin
      .from('LogEntry')
      .select('id, type, title, content, signalId, createdAt, metadata')
      .in('type', PUBLIC_TYPES)
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return apiError('获取动态失败', 500);
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
  const rateCheck = await checkRateLimitAsync(clientId, 'api');
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
  const { content, title, type, metadata } = body;

  if (!content) {
    return apiError('日志内容不能为空');
  }

  // Sanitize content length
  const safeContent = String(content).slice(0, 5000);
  const safeTitle = title ? String(title).slice(0, 200) : null;

  try {
    const { data: log, error: insertError } = await supabaseAdmin
      .from('LogEntry')
      .insert({
        id: crypto.randomUUID(),
        userId: auth.user.id,
        type: type || 'USER_POST',
        title: safeTitle,
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