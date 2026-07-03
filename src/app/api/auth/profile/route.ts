import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth/verify';
import { apiSuccess, apiError, apiUnauthorized } from '@/lib/api/response';

export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return apiUnauthorized(auth.error);
  }

  const supabaseAdmin = await getSupabaseAdmin();
  if (!supabaseAdmin) {
    return apiError('数据库暂时不可用，请稍后重试', 503);
  }

  const { name } = await request.json();

  try {
    const { error: insertError } = await supabaseAdmin
      .from('profiles')
      .upsert({ id: auth.user.id, email: auth.user.email, name: name || null }, { onConflict: 'id' });

    if (insertError) {
      console.error('[API] Failed to upsert profile:', insertError);
      return apiError('创建用户资料失败，请稍后重试', 500);
    }

    return apiSuccess({ success: true });
  } catch (error) {
    console.error('[API] Profile upsert error:', error);
    return apiError('创建用户资料失败，请稍后重试', 500);
  }
}