import { getSupabaseAdmin, invalidateDbConnection } from './supabase'

export interface RawV2EXTopic {
  id: number
  title: string
  url: string
  content?: string
  node: {
    name: string
    title: string
  }
  member: {
    username: string
  }
  replies: number
  created: number
  last_modified: number
}

export async function fetchV2EXHot(limit: number = 20): Promise<RawV2EXTopic[]> {
  try {
    const response = await fetch('https://www.v2ex.com/api/topics/hot.json', {
      headers: { 'User-Agent': 'SparkForge/1.0' },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`V2EX API error: ${response.status}`)
    }

    const data = await response.json()
    return (data || []).slice(0, limit)
  } catch (error) {
    console.warn('[V2EX] Failed to fetch hot topics:', error)
    return []
  }
}

export async function saveV2EXSignals(topics: RawV2EXTopic[]): Promise<number> {
  const supabaseAdmin = await getSupabaseAdmin()

  if (!supabaseAdmin) {
    console.warn('[V2EX] Database unavailable, skipping save')
    return 0
  }

  let savedCount = 0

  for (const topic of topics) {
    try {
      const hotScore = calculateV2EXHotScore(topic.replies)
      const tags = topic.node?.name ? [topic.node.name] : []

      const { error } = await supabaseAdmin
        .from('Signal')
        .upsert(
          {
            source: 'v2ex',
            sourceId: String(topic.id),
            title: topic.title || 'Untitled',
            description: topic.content?.substring(0, 500) || null,
            url: topic.url || `https://www.v2ex.com/t/${topic.id}`,
            tags,
            author: topic.member?.username || null,
            votesCount: 0,
            commentsCount: topic.replies || 0,
            hotScore,
            status: 'PENDING',
            rawData: topic as any,
            metrics: { replies: topic.replies },
          },
          { onConflict: 'source,sourceId' }
        )
        .select()

      if (!error) {
        savedCount++
      }
    } catch (err) {
      console.error(`[V2EX] Failed to save topic ${topic.id}:`, err)
      invalidateDbConnection()
    }
  }

  return savedCount
}

function calculateV2EXHotScore(replies: number): number {
  return Math.min(100, Math.round(replies * 2.5))
}