import { NextRequest } from 'next/server';
import { crawlAllSources } from '@/lib/signals';
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

  return handleCrawl(request);
}

export async function POST(request: NextRequest) {
  if (!verifyApiKey(request)) {
    return apiError('无权执行此操作', 401);
  }

  return handleCrawl(request);
}

async function handleCrawl(request: NextRequest) {
  // Rate limiting
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