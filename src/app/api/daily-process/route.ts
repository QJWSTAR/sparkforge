import { NextRequest } from 'next/server';
import { crawlAllSources, addLogEntry } from '@/lib/signals';
import { batchScoreUnscoredSignals } from '@/lib/scoring';
import { apiSuccess, apiError } from '@/lib/api/response';

// 仅 Vercel Pro 计划生效，Hobby 计划上限 10s
export const maxDuration = 60;

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
  let scoredCount = 0;
  const errors: string[] = [];

  // 步骤 A：抓取信号（crawlAllSources 已内置自动评分 50 条）
  try {
    const crawlResult = await crawlAllSources();

    if (!crawlResult.dbAvailable) {
      return apiError('数据库连接失败，定时任务中止', 500);
    }

    crawledCount = crawlResult.total;
  } catch (err) {
    const message = err instanceof Error ? err.message : '未知错误';
    console.error('[DailyProcess] Crawl step failed:', message);
    return apiError('抓取信号失败，定时任务中止', 500);
  }

  // 步骤 B：对剩余未评分信号进行补充评分
  try {
    // crawlAllSources 已对前 50 条评分，此处补充处理剩余 PENDING 信号
    scoredCount = await batchScoreUnscoredSignals(50);
  } catch (err) {
    const message = err instanceof Error ? err.message : '未知错误';
    console.error('[DailyProcess] Score step failed:', message);
    errors.push(`评分步骤异常: ${message}`);
    // 评分失败不中断，抓取已成功
  }

  // 记录汇总日志
  try {
    await addLogEntry({
      type: 'SYSTEM',
      title: '每日定时任务完成',
      content: `抓取 ${crawledCount} 条信号，补充评分 ${scoredCount} 条`,
      metadata: { crawledCount, scoredCount, errors },
    });
  } catch (err) {
    console.error('[DailyProcess] Failed to write summary log:', err);
  }

  return apiSuccess({
    crawledCount,
    scoredCount,
    errors,
    message: `抓取 ${crawledCount} 条信号，补充评分 ${scoredCount} 条`,
  });
}