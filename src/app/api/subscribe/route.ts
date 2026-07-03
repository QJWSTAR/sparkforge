import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth/verify';
import { apiSuccess, apiError, apiUnauthorized } from '@/lib/api/response';
import { checkRateLimit, getClientId } from '@/lib/api/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limiting
  const clientId = getClientId(request);
  const rateCheck = checkRateLimit(clientId, 'api');
  if (!rateCheck.allowed) {
    return apiError(`请求过于频繁，请 ${rateCheck.retryAfter} 秒后重试`, 429);
  }

  const auth = await verifyAuth(request);
  if (!auth.success) {
    return apiUnauthorized(auth.error);
  }

  const userId = auth.user.id;

  const body = await request.json();
  const { signalId, subscribed } = body;

  if (!signalId) {
    return apiError('缺少信号 ID');
  }

  const supabaseAdmin = await getSupabaseAdmin();
  if (!supabaseAdmin) {
    return apiError('数据库连接失败，请稍后重试', 500);
  }

  try {
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from('UserSetting')
      .select('subscribedSignals')
      .eq('userId', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      return apiError('获取订阅数据失败', 500);
    }

    const currentSignals: string[] = existing?.subscribedSignals ?? [];

    const updatedSignals = subscribed
      ? [...new Set([...currentSignals, signalId])]
      : currentSignals.filter((id) => id !== signalId);

    const { error: upsertError } = await supabaseAdmin
      .from('UserSetting')
      .upsert({ userId, subscribedSignals: updatedSignals, updatedAt: new Date().toISOString() }, { onConflict: 'userId' });

    if (upsertError) {
      return apiError('更新订阅失败', 500);
    }

    return apiSuccess({ signalId, subscribed, total: updatedSignals.length });
  } catch (error) {
    console.error('Subscribe API error:', error);
    return apiError('服务器内部错误，请稍后重试', 500);
  }
}

export async function DELETE(request: NextRequest) {
  // Rate limiting
  const clientId = getClientId(request);
  const rateCheck = checkRateLimit(clientId, 'api');
  if (!rateCheck.allowed) {
    return apiError(`请求过于频繁，请 ${rateCheck.retryAfter} 秒后重试`, 429);
  }

  const auth = await verifyAuth(request);
  if (!auth.success) {
    return apiUnauthorized(auth.error);
  }

  const userId = auth.user.id;

  const body = await request.json();
  const { signalId } = body;

  if (!signalId) {
    return apiError('缺少信号 ID');
  }

  const supabaseAdmin = await getSupabaseAdmin();
  if (!supabaseAdmin) {
    return apiError('数据库连接失败，请稍后重试', 500);
  }

  try {
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from('UserSetting')
      .select('subscribedSignals')
      .eq('userId', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      return apiError('获取订阅数据失败', 500);
    }

    const currentSignals: string[] = existing?.subscribedSignals ?? [];
    const updatedSignals = currentSignals.filter((id) => id !== signalId);

    const { error: upsertError } = await supabaseAdmin
      .from('UserSetting')
      .upsert({ userId, subscribedSignals: updatedSignals, updatedAt: new Date().toISOString() }, { onConflict: 'userId' });

    if (upsertError) {
      return apiError('取消订阅失败', 500);
    }

    return apiSuccess({ signalId, subscribed: false, total: updatedSignals.length });
  } catch (error) {
    console.error('Subscribe DELETE error:', error);
    return apiError('服务器内部错误，请稍后重试', 500);
  }
}