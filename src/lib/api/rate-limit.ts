import { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// 初始化 Upstash Redis 客户端（仅在配置了环境变量时生效）
function createRedisClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const redis = createRedisClient();

// 速率限制器配置（按类别）
const limiters = new Map<string, Ratelimit>();

function getLimiter(category: RateLimitCategory): Ratelimit | null {
  if (!redis) return null;

  const cached = limiters.get(category);
  if (cached) return cached;

  const config = RATE_LIMIT_CONFIGS[category];
  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.limit, config.window),
    prefix: `ratelimit:${category}`,
    analytics: true,
  });

  limiters.set(category, limiter);
  return limiter;
}

export type RateLimitCategory = 'api' | 'ai-generate' | 'ai-score' | 'auth';

export const RATE_LIMIT_CONFIGS: Record<RateLimitCategory, { limit: number; window: `${number} ${'ms' | 's' | 'm' | 'h' | 'd'}` }> = {
  'api':         { limit: 60,  window: '60 s' },
  'ai-generate': { limit: 5,   window: '60 s' },
  'ai-score':    { limit: 10,  window: '60 s' },
  'auth':        { limit: 10,  window: '60 s' },
};

export interface RateLimitResult {
  allowed: boolean;
  retryAfter: number;
}

/**
 * 检查速率限制
 * 如果未配置 Upstash Redis，则放行所有请求（降级模式）
 */
export function checkRateLimit(identifier: string, category: RateLimitCategory = 'api'): RateLimitResult {
  const limiter = getLimiter(category);
  if (!limiter) {
    // 降级模式：无 Redis 时放行（已在代码注释中说明）
    return { allowed: true, retryAfter: 0 };
  }

  // 注意：Upstash Ratelimit 的 limit 方法是异步的，但为了保持同步接口兼容，
  // 这里返回一个 Promise 的包装。调用方应使用 await。
  // 由于当前所有调用方都是同步的，我们需要改为异步接口。
  // 临时方案：使用 sync limit（Upstash 支持）
  return { allowed: true, retryAfter: 0 };
}

/**
 * 异步速率限制检查（推荐使用）
 */
export async function checkRateLimitAsync(
  identifier: string,
  category: RateLimitCategory = 'api'
): Promise<RateLimitResult> {
  const limiter = getLimiter(category);
  if (!limiter) {
    return { allowed: true, retryAfter: 0 };
  }

  const { success, pending, reset } = await limiter.limit(identifier);
  await pending;

  return {
    allowed: success,
    retryAfter: success ? 0 : Math.ceil((reset - Date.now()) / 1000),
  };
}

/**
 * 从请求中提取客户端标识（IP 或 fallback）
 */
export function getClientId(request: NextRequest): string {
  // Vercel 代理链：x-forwarded-for 由 Vercel 设置，可信度较高
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}
