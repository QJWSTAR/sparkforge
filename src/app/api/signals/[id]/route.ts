import { NextRequest } from 'next/server';
import { getSignalById } from '@/lib/signals';
import { apiSuccess, apiError } from '@/lib/api/response';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { signal, dbAvailable } = await getSignalById(id);

    if (!signal) {
      return apiError('信号不存在', 404);
    }

    return apiSuccess({ signal, dbAvailable });
  } catch (error) {
    console.error('[API] Error in signal detail endpoint:', error);
    return apiError('服务器暂时开小差，请稍后重试', 500);
  }
}