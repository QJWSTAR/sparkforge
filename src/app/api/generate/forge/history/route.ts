import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth/verify';
import { apiSuccess, apiError, apiUnauthorized } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return apiUnauthorized(auth.error);
  }

  const userId = auth.user.id;
  const supabaseAdmin = await getSupabaseAdmin();

  if (!supabaseAdmin) {
    return apiError('数据库暂时不可用，请稍后重试', 500);
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('ForgeProject')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });

    if (error) {
      throw error;
    }

    return apiSuccess(data || []);
  } catch (error) {
    console.error('Failed to fetch forge history:', error);
    return apiError('获取历史记录失败，请稍后重试', 500);
  }
}