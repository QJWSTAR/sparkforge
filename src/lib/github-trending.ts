import { getSupabaseAdmin, invalidateDbConnection } from './supabase'

export interface RawGHTrendingRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  topics: string[]
  owner: {
    login: string
    avatar_url: string
  }
  created_at: string
  updated_at: string
  pushed_at: string
}

/**
 * 通过 GitHub Search API 获取近期热门仓库（模拟 Trending 页面）。
 * 无认证限速 60 次/小时，每次请求消耗 1 次配额。
 */
export async function fetchGitHubTrending(limit: number = 20): Promise<RawGHTrendingRepo[]> {
  try {
    // 查询最近 7 天创建、stars > 100 的仓库，按 stars 降序
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const dateStr = since.toISOString().split('T')[0]
    const query = `created:>${dateStr} stars:>100`
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${limit}`

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'SparkForge/1.0',
      },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      console.warn(`[GitHub Trending] API returned ${response.status}`)
      return []
    }

    const data = await response.json()
    return (data.items || []) as RawGHTrendingRepo[]
  } catch (error) {
    console.warn('[GitHub Trending] Failed to fetch:', error)
    return []
  }
}

export async function saveGHTrendingSignals(repos: RawGHTrendingRepo[]): Promise<number> {
  const supabaseAdmin = await getSupabaseAdmin()

  if (!supabaseAdmin) {
    console.warn('[GitHub Trending] Database unavailable, skipping save')
    return 0
  }

  let savedCount = 0

  for (const repo of repos) {
    try {
      const hotScore = calculateGHTrendingScore(repo.stargazers_count, repo.forks_count)

      const { error } = await supabaseAdmin
        .from('Signal')
        .upsert(
          {
            source: 'github-trending',
            sourceId: String(repo.id),
            title: repo.full_name,
            description: repo.description?.substring(0, 500) || null,
            url: repo.html_url,
            tags: repo.topics || [],
            author: repo.owner?.login || null,
            votesCount: repo.stargazers_count || 0,
            commentsCount: repo.open_issues_count || 0,
            hotScore,
            status: 'PENDING',
            rawData: repo as any,
            metrics: {
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              language: repo.language,
            },
          },
          { onConflict: 'source,sourceId' }
        )
        .select()

      if (!error) {
        savedCount++
      }
    } catch (err) {
      console.error(`[GitHub Trending] Failed to save repo ${repo.id}:`, err)
      invalidateDbConnection()
    }
  }

  return savedCount
}

function calculateGHTrendingScore(stars: number, forks: number): number {
  const score = stars * 0.6 + forks * 0.4
  return Math.min(100, Math.round(Math.log10(score + 1) * 20))
}