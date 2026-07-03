// Jike (即刻) has no public API. This module returns demo data
// for demonstration purposes.

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
  const demoPosts: RawJikePost[] = [
    {
      id: 'jike-001',
      title: '独立开发者出海：一个人如何从零到月入 $5,000',
      description: '分享一个独立开发者在半年内通过 AI 工具实现月入 5000 美元的完整经历，从产品构思、技术选型到营销推广的全流程复盘。',
      url: 'https://web.okjike.com/post/example-001',
      author: '李自然',
      votesCount: 1820,
      commentsCount: 356,
      tags: ['AI', '独立开发', '出海'],
    },
    {
      id: 'jike-002',
      title: '用 AI 生成产品 MVP 的 7 个最佳实践',
      description: '总结了使用 AI 工具快速生成产品 MVP 的 7 个实践经验，包括 Prompt 设计、代码质量控制、本地化改造等关键环节。',
      url: 'https://web.okjike.com/post/example-002',
      author: '产品经理老王',
      votesCount: 1450,
      commentsCount: 278,
      tags: ['AI', 'MVP', '产品'],
    },
    {
      id: 'jike-003',
      title: '从 Product Hunt 精选 10 个值得复刻的创意',
      description: '每周精选 Product Hunt 上 10 个最具潜力的产品创意，分析其商业模式、技术实现和本地化可能性。',
      url: 'https://web.okjike.com/post/example-003',
      author: '创意猎人',
      votesCount: 2100,
      commentsCount: 432,
      tags: ['Product Hunt', '创意', '复刻'],
    },
    {
      id: 'jike-004',
      title: '2024 年独立开发者技术栈推荐：Next.js + Supabase + AI',
      description: '全面对比各类技术栈，推荐最适合独立开发者的组合方案，包含成本分析、开发效率、运维难度等维度。',
      url: 'https://web.okjike.com/post/example-004',
      author: '全栈技术人',
      votesCount: 980,
      commentsCount: 156,
      tags: ['技术栈', 'Next.js', 'Supabase'],
    },
    {
      id: 'jike-005',
      title: '如何用 AI 做竞品分析：从数据采集到策略生成',
      description: '详细介绍如何利用 AI 工具自动化完成竞品分析的全流程，包括数据采集、特征提取、对比分析和策略建议生成。',
      url: 'https://web.okjike.com/post/example-005',
      author: '数据分析师小张',
      votesCount: 760,
      commentsCount: 98,
      tags: ['AI', '竞品分析', '数据'],
    },
  ]

  return demoPosts.slice(0, limit)
}