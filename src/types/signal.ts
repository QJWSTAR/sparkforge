export interface Signal {
  id: string
  source: 'producthunt' | 'hackernews' | 'twitter' | 'github' | 'indiehackers' | 'v2ex' | 'xiaohongshu' | 'juejin' | 'medium'
  sourceId: string
  title: string
  description?: string
  url?: string
  imageUrl?: string
  tags: string[]
  author?: string
  votesCount: number
  commentsCount: number
  hotScore: number
  noveltyScore?: number
  businessScore?: number
  localScore?: number
  finalScore?: number
  status: 'PENDING' | 'SCREENED' | 'SCORED' | 'TOP10' | 'ARCHIVED'
  fetchedAt: string
  createdAt: string
  // AI 分析维度（可选，评分后填充）
  concept?: string
  painPoint?: string
  innovation?: string
  techSolution?: string
  acquisition?: string
  differentiation?: string
}

export interface SignalFilters {
  source?: string
  category?: string
  minScore?: number
  sortBy: 'hot' | 'score' | 'newest'
}
