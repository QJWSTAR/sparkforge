/**
 * Simple in-memory rate limiter for API routes.
 * Limits requests per IP address within a time window.
 * Designed for Vercel serverless (stateless, per-lambda instance).
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetTime) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const DEFAULT_CONFIGS: Record<string, RateLimitConfig> = {
  // AI generation endpoints: 5 requests per minute per user
  'ai-generate': { maxRequests: 5, windowMs: 60 * 1000 },
  // AI scoring: 10 requests per minute per user
  'ai-score': { maxRequests: 10, windowMs: 60 * 1000 },
  // General API: 30 requests per minute per user
  'api': { maxRequests: 30, windowMs: 60 * 1000 },
  // Auth: 10 requests per minute per user
  'auth': { maxRequests: 10, windowMs: 60 * 1000 },
};

/**
 * Check if a request is rate-limited.
 * @param identifier - Unique identifier (e.g., IP address)
 * @param category - Rate limit category key
 * @returns { allowed: boolean, remaining: number, retryAfter: number }
 */
export function checkRateLimit(
  identifier: string,
  category: keyof typeof DEFAULT_CONFIGS = 'api'
): { allowed: boolean; remaining: number; retryAfter: number } {
  const config = DEFAULT_CONFIGS[category];
  const key = `${category}:${identifier}`;
  const now = Date.now();

  const entry = store.get(key);

  if (!entry || now > entry.resetTime) {
    // First request or window expired
    store.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return { allowed: true, remaining: config.maxRequests - 1, retryAfter: 0 };
  }

  if (entry.count >= config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }

  entry.count++;
  return { allowed: true, remaining: config.maxRequests - entry.count, retryAfter: 0 };
}

/**
 * Extract client identifier from request headers.
 * Uses X-Forwarded-For (Vercel) or X-Real-IP as fallback.
 */
export function getClientId(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  return realIp || 'unknown';
}