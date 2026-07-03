/**
 * 统一的 API 响应格式
 *
 * 所有 API 路由必须使用以下响应格式：
 * - 成功: { success: true, data: T }
 * - 错误: { success: false, error: string }
 *
 * 这样确保前端可以统一处理所有 API 响应。
 */
import { NextResponse } from 'next/server';

/** 成功响应 */
export function apiSuccess<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status });
}

/** 错误响应 */
export function apiError(error: string, status: number = 400): NextResponse {
  return NextResponse.json({ success: false, error }, { status });
}

/** 未授权响应 */
export function apiUnauthorized(message: string = '未授权，请先登录'): NextResponse {
  return apiError(message, 401);
}

/** 服务器内部错误响应 */
export function apiInternalError(message: string = '服务器内部错误，请稍后重试'): NextResponse {
  return apiError(message, 500);
}