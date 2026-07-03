/**
 * 将 API 错误信息转换为用户可理解的中文提示
 */
export function getErrorMessage(error: unknown): string {
  if (!error) return '操作失败，请稍后重试'

  const msg = typeof error === 'string' ? error : (error as Error).message || ''

  // 按 HTTP 状态码匹配
  if (msg.includes('401') || msg.includes('Unauthorized') || msg.includes('unauthorized')) {
    return '登录已过期，请重新登录'
  }
  if (msg.includes('403') || msg.includes('Forbidden')) {
    return '无权访问此资源'
  }
  if (msg.includes('404') || msg.includes('not found') || msg.includes('Not Found')) {
    return '请求的资源不存在'
  }
  if (msg.includes('500') || msg.includes('Internal Server Error')) {
    return '服务器暂时开小差，请稍后重试'
  }
  if (msg.includes('503') || msg.includes('Service Unavailable')) {
    return '服务暂时不可用，请稍后重试'
  }

  // 按网络错误匹配
  if (
    msg.includes('Failed to fetch') ||
    msg.includes('NetworkError') ||
    msg.includes('network') ||
    msg.includes('fetch failed')
  ) {
    return '网络连接失败，请检查网络后重试'
  }

  // 按已知英文错误消息匹配
  if (msg.includes('Database unavailable') || msg.includes('database unavailable')) {
    return '数据库暂时不可用，请稍后重试'
  }
  if (msg.includes('Supabase not configured')) {
    return '服务配置异常，请联系管理员'
  }
  if (msg.includes('API key not configured')) {
    return 'AI 服务配置异常，请联系管理员'
  }
  if (msg.includes('Failed to generate')) {
    return '生成失败，请稍后重试'
  }
  if (msg.includes('Failed to create')) {
    return '创建失败，请稍后重试'
  }
  if (msg.includes('Failed to fetch')) {
    return '获取数据失败，请稍后重试'
  }
  if (msg.includes('Failed to')) {
    return '操作失败，请稍后重试'
  }

  // 原始消息已经是中文或无法识别，直接返回
  return msg || '操作失败，请稍后重试'
}