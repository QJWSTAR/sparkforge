/**
 * 共享的 Bearer Token 认证验证逻辑
 * 从 HTTP 请求中提取 token 并使用 Supabase Auth 验证用户身份
 */
import { createClient } from '@supabase/supabase-js';
import type { AuthResult } from './types';

/** 从 Authorization header 中提取 Bearer token */
function extractBearerToken(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.slice(7);
}

/** 验证请求中的用户身份 */
export async function verifyAuth(request: Request): Promise<AuthResult> {
  const token = extractBearerToken(request);
  if (!token) {
    return {
      success: false,
      error: '未提供认证令牌，请先登录',
      statusCode: 401,
    };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return {
      success: false,
      error: '服务配置错误',
      statusCode: 500,
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return {
        success: false,
        error: '认证令牌无效或已过期，请重新登录',
        statusCode: 401,
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email ?? '',
      },
    };
  } catch {
    return {
      success: false,
      error: '认证服务异常，请稍后重试',
      statusCode: 500,
    };
  }
}