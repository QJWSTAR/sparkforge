/**
 * 认证相关类型定义
 */
export interface AuthenticatedUser {
  id: string;
  email: string;
}

export type AuthResult =
  | { success: true; user: AuthenticatedUser }
  | { success: false; error: string; statusCode: number };