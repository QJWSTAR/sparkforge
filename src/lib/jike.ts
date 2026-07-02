// Jike (即刻) has no public API. This module returns mock/placeholder data
// and will be replaced with a real scraper when an API becomes available.

export interface RawJikePost {
  id: string
  title: string
  description: string
  url: string
  author: string
  votesCount: number
  commentsCount: number
  tags: string[]
}

export async function fetchJikeHot(limit: number = 10): Promise<RawJikePost[]> {
  console.warn('[Jike] No public API available, returning empty result')
  return []
}