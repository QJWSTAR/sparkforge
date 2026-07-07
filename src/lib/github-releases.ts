import { getSupabaseAdmin, invalidateDbConnection } from './supabase'

export interface RawGHRelease {
  id: number
  tag_name: string
  name: string
  body: string | null
  html_url: string
  created_at: string
  published_at: string
  author: {
    login: string
  }
  // 从父仓库携带的字段
  repo_full_name: string
  repo_description: string | null
  repo_stars: number
  repo_language: string | null
  repo_topics: string[]
}

interface GHSearchRepo {
  id: number
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  topics: string[]
}

/**
 * 通过 GitHub Search API 查找近期有活跃 Release 的仓库。
 * 先搜索近期推送的仓库，再逐个检查是否有 Release。
 */
export async function fetchGitHubReleases(limit: number = 10): Promise<RawGHRelease[]> {
  try {
    // 搜索最近 3 天有推送、stars > 50 的仓库
    const since = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    const dateStr = since.toISOString().split('T')[0]
    const query = `pushed:>${dateStr} stars:>50`
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=updated&order=desc&per_page=${limit}`

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'SparkForge/1.0',
      },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      console.warn(`[GitHub Releases] Search API returned ${response.status}`)
      return []
    }

    const data = await response.json()
    const repos: GHSearchRepo[] = data.items || []

    // 对每个仓库检查是否有 Release
    const releases: RawGHRelease[] = []
    for (const repo of repos) {
      try {
        const releaseUrl = `https://api.github.com/repos/${repo.full_name}/releases?per_page=1`
        const releaseRes = await fetch(releaseUrl, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'SparkForge/1.0',
          },
        })

        if (!releaseRes.ok) continue

        const releaseData = await releaseRes.json()
        if (!Array.isArray(releaseData) || releaseData.length === 0) continue

        const latest = releaseData[0]
        releases.push({
          id: latest.id,
          tag_name: latest.tag_name,
          name: latest.name || latest.tag_name,
          body: latest.body?.substring(0, 1000) || null,
          html_url: latest.html_url,
          created_at: latest.created_at,
          published_at: latest.published_at,
          author: latest.author || { login: 'unknown' },
          repo_full_name: repo.full_name,
          repo_description: repo.description,
          repo_stars: repo.stargazers_count,
          repo_language: repo.language,
          repo_topics: repo.topics || [],
        })
      } catch {
        // 单个仓库 Release 查询失败，跳过
        continue
      }
    }

    return releases
  } catch (error) {
    console.warn('[GitHub Releases] Failed to fetch:', error)
    return []
  }
}

export async function saveGHReleaseSignals(releases: RawGHRelease[]): Promise<number> {
  const supabaseAdmin = await getSupabaseAdmin()

  if (!supabaseAdmin) {
    console.warn('[GitHub Releases] Database unavailable, skipping save')
    return 0
  }

  let savedCount = 0

  for (const release of releases) {
    try {
      const hotScore = calculateGHReleaseScore(release.repo_stars)

      const { error } = await supabaseAdmin
        .from('Signal')
        .upsert(
          {
            source: 'github-releases',
            sourceId: String(release.id),
            title: `${release.repo_full_name} ${release.tag_name}`,
            description: release.body?.substring(0, 500) || release.repo_description?.substring(0, 500) || null,
            url: release.html_url,
            tags: release.repo_topics || [],
            author: release.author?.login || null,
            votesCount: release.repo_stars || 0,
            commentsCount: 0,
            hotScore,
            status: 'PENDING',
            rawData: release as any,
            metrics: {
              repo: release.repo_full_name,
              tag: release.tag_name,
              stars: release.repo_stars,
              language: release.repo_language,
            },
          },
          { onConflict: 'source,sourceId' }
        )
        .select()

      if (!error) {
        savedCount++
      }
    } catch (err) {
      console.error(`[GitHub Releases] Failed to save release ${release.id}:`, err)
      invalidateDbConnection()
    }
  }

  return savedCount
}

function calculateGHReleaseScore(stars: number): number {
  return Math.min(100, Math.round(Math.log10(stars + 1) * 25))
}