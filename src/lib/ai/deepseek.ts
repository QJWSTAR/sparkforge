/**
 * DeepSeek API 客户端
 *
 * 封装 DeepSeek API 调用，提供：
 * - 自动重试（指数退避，最多 3 次）
 * - 超时控制（默认 30 秒）
 * - 速率限制处理（429 自动等待后重试）
 * - JSON 修复（解析失败时尝试修复常见格式问题）
 * - Token 使用量追踪
 * - 输入净化（防止 prompt 注入）
 */

const DEEPSEEK_API = 'https://api.deepseek.com/v1/chat/completions';
const DEFAULT_TIMEOUT_MS = 30_000;
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 1000;

export interface DeepSeekCallOptions {
  /** 系统提示词 */
  systemPrompt: string;
  /** 用户提示词 */
  userPrompt: string;
  /** 温度参数 (0-1) */
  temperature?: number;
  /** 最大输出 token 数 */
  maxTokens?: number;
  /** 超时时间（毫秒），默认 30s */
  timeoutMs?: number;
  /** 最大重试次数，默认 3 */
  maxRetries?: number;
}

export interface DeepSeekSuccessResult {
  success: true;
  content: string;
  /** Token 使用量统计 */
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface DeepSeekErrorResult {
  success: false;
  error: string;
  /** 是否经过重试仍失败 */
  retried: boolean;
}

export type DeepSeekResult = DeepSeekSuccessResult | DeepSeekErrorResult;

/**
 * 调用 DeepSeek API 并返回结果
 *
 * 支持自动重试、超时控制、速率限制处理。
 */
export async function callDeepSeek(options: DeepSeekCallOptions): Promise<DeepSeekResult> {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return { success: false, error: 'DeepSeek API key 未配置', retried: false };
  }

  const maxRetries = options.maxRetries ?? MAX_RETRIES;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  let lastError = '';

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(DEEPSEEK_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: options.systemPrompt },
            { role: 'user', content: options.userPrompt },
          ],
          temperature: options.temperature ?? 0.5,
          max_tokens: options.maxTokens ?? 2000,
          response_format: { type: 'json_object' },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // 速率限制 — 等待后重试
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitMs = retryAfter ? parseInt(retryAfter) * 1000 : RETRY_BASE_DELAY_MS * Math.pow(2, attempt);
        console.warn(`[DeepSeek] Rate limited, waiting ${waitMs}ms before retry ${attempt + 1}/${maxRetries}`);
        await sleep(waitMs);
        continue;
      }

      // 服务器错误 — 重试
      if (response.status >= 500 && attempt < maxRetries) {
        lastError = `DeepSeek API server error: ${response.status}`;
        console.warn(`[DeepSeek] Server error ${response.status}, retry ${attempt + 1}/${maxRetries}`);
        await sleep(RETRY_BASE_DELAY_MS * Math.pow(2, attempt));
        continue;
      }

      if (!response.ok) {
        return {
          success: false,
          error: `DeepSeek API error: ${response.status} ${response.statusText}`,
          retried: attempt > 0,
        };
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        return { success: false, error: 'DeepSeek 返回空响应', retried: attempt > 0 };
      }

      return {
        success: true,
        content,
        usage: {
          promptTokens: data.usage?.prompt_tokens ?? 0,
          completionTokens: data.usage?.completion_tokens ?? 0,
          totalTokens: data.usage?.total_tokens ?? 0,
        },
      };
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        lastError = 'DeepSeek API 请求超时';
      } else {
        lastError = error instanceof Error ? error.message : '未知网络错误';
      }

      if (attempt < maxRetries) {
        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt);
        console.warn(`[DeepSeek] Network error, retry ${attempt + 1}/${maxRetries} after ${delay}ms: ${lastError}`);
        await sleep(delay);
      }
    }
  }

  return { success: false, error: lastError, retried: true };
}

/**
 * 安全解析 JSON，失败时尝试修复常见格式问题再解析
 */
export function safeParseJson<T>(content: string, fallback: T): { data: T; wasRepaired: boolean } {
  // 尝试直接解析
  try {
    return { data: JSON.parse(content) as T, wasRepaired: false };
  } catch {
    // pass
  }

  // 尝试修复：去除 markdown 代码块包裹
  let cleaned = content.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n/, '').replace(/\n```\s*$/, '');
    try {
      return { data: JSON.parse(cleaned) as T, wasRepaired: true };
    } catch {
      // pass
    }
  }

  // 尝试修复：去除前后空白和 BOM 字符
  cleaned = content.replace(/^\uFEFF/, '').trim();
  if (cleaned !== content) {
    try {
      return { data: JSON.parse(cleaned) as T, wasRepaired: true };
    } catch {
      // pass
    }
  }

  // 尝试修复：提取第一个完整 JSON 对象
  const firstBrace = cleaned.indexOf('{');
  if (firstBrace >= 0) {
    let depth = 0;
    let end = -1;
    for (let i = firstBrace; i < cleaned.length; i++) {
      if (cleaned[i] === '{') depth++;
      if (cleaned[i] === '}') {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    if (end > 0) {
      try {
        return { data: JSON.parse(cleaned.slice(firstBrace, end)) as T, wasRepaired: true };
      } catch {
        // pass
      }
    }
  }

  console.warn('[DeepSeek] JSON parse failed after all repair attempts, using fallback');
  return { data: fallback, wasRepaired: false };
}

/**
 * 净化用户输入，防止 prompt 注入
 *
 * 移除常见的注入模式：
 * - "忽略之前的指令" / "Ignore previous instructions"
 * - 系统指令覆盖模式
 * - JSON 格式欺骗
 */
export function sanitizeUserInput(input: string): string {
  if (!input) return '';

  const dangerousPatterns = [
    /忽略(之前的|上述|以上|所有)?(指令|指示|命令|提示)/gi,
    /ignore\s+(previous|above|all|the)\s+(instructions?|directives?|prompts?)/gi,
    /system\s*(prompt|message|instruction)/gi,
    /you\s+are\s+(now|a|an)\s+/gi,
    /forget\s+(everything|all)/gi,
    /\[system\]/gi,
    /<\|im_start\|>/gi,
    /<\|im_end\|>/gi,
  ];

  let sanitized = input;
  for (const pattern of dangerousPatterns) {
    sanitized = sanitized.replace(pattern, '[filtered]');
  }

  return sanitized;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}