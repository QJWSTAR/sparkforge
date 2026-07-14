import { NextRequest } from 'next/server';
import { crawlAllSources, addLogEntry } from '@/lib/signals';
import { apiSuccess, apiError } from '@/lib/api/response';

// Vercel Hobby 计划 Serverless Function 上限 10s，本路由仅做抓取（~5-8s）
// 评分已分离至 /api/score/batch 按需触发，避免串行 DeepSeek 调用超时
export const maxDuration = 10;

/**
 * 验证请求是否来自 Vercel Cron Job。
 * 使用 AND 逻辑：必须同时满足 x-vercel-cron header 和 User-Agent 校验，
 * 防止外部通过伪造单一 header 触发定时任务。
 */
function isCronRequest(request: NextRequest): boolean {
  const cronHeader = request.headers.get('x-vercel-cron');
  const userAgent = request.headers.get('user-agent') || '';
  return cronHeader === '1' && userAgent.includes('vercel-cron');
}

export async function GET(request: NextRequest) {
  if (!isCronRequest(request)) {
    return apiError('无权执行此操作', 401);
  }

  let crawledCount = 0;

  // 仅抓取信号入库，不评分（评分由 /api/score/batch 按需触发）
  try {
    const crawlResult = await crawlAllSources();

    if (!crawlResult.dbAvailable) {
      return apiError('数据库连接失败，定时任务中止', 500);
    }

    crawledCount = crawlResult.total;
  } catch (err) {
    const message = err instanceof Error ? err.message : '未知错误';
    console.error('[DailyProcess] Crawl step failed:', message);
    return apiError(`抓取信号失败: ${message}`, 500);
  }

  // 记录汇总日志
  try {
    await addLogEntry({
      type: 'SYSTEM',
      title: '每日定时任务完成',
      content: `抓取 ${crawledCount} 条信号（评分请通过 /api/score/batch 触发）`,
      metadata: { crawledCount },
    });
  } catch (err) {
    console.error('[DailyProcess] Failed to write summary log:', err);
  }

  return apiSuccess({
    crawledCount,
    message: `抓取 ${crawledCount} 条信号`,
  });
}
