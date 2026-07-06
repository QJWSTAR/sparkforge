import { NextRequest } from 'next/server';
import { crawlAllSources } from '@/lib/signals';
import { apiSuccess, apiError } from '@/lib/api/response';
import { checkRateLimitAsync, getClientId } from '@/lib/api/rate-limit';

export async function POST(request: NextRequest) {
  // Accept API key from Authorization header, x-api-key header, or query param
  const authHeader = request.headers.get('authorization') || '';
  const bearerKey = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const apiKey = bearerKey || request.headers.get('x-api-key') || request.nextUrl.searchParams.get('key');

  if (apiKey !== process.env.CRON_API_KEY && process.env.NODE_ENV === 'production') {
    return apiError('无权执行此操作', 401);
  }

  // Rate limiting (even for authenticated requests, prevent abuse)
  const clientId = getClientId(request);
  const rateCheck = await checkRateLimitAsync(clientId, 'api');
  if (!rateCheck.allowed) {
    return apiError(`请求过于频繁，请 ${rateCheck.retryAfter} 秒后重试`, 429);
  }

  try {
    const result = await crawlAllSources();

    return apiSuccess({
      ...result,
      message: `抓取完成：${result.total} 条新信号`,
    });
  } catch (error) {
    console.error('Crawl error:', error);
    return apiError('抓取信号失败，请稍后重试', 500);
  }
}