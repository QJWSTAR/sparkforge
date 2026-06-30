import { getSupabaseAdmin } from './supabase'

export interface RawHNItem {
  objectID: string
  title: string
  url?: string
  author: string
  points: number
  num_comments: number
  created_at: string
  _tags: string[]
  story_text?: string
}

export async function fetchHackerNewsTop(limit: number = 30): Promise<RawHNItem[]> {
  const apiKey = process.env.ALGOLIA_API_KEY
  
  try {
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=${limit}`,
      {
        method: 'GET',
        headers: {
          'X-Algolia-API-Key': apiKey || '',
          'X-Algolia-Application-Id': 'HN_API',
        },
        next: { revalidate: 300 },
      }
    )

    if (!response.ok) {
      throw new Error(`Hacker News API error: ${response.status}`)
    }

    const data = await response.json()
    return data.hits || []
  } catch (error) {
    console.error('Failed to fetch Hacker News:', error)
    return []
  }
}

export async function fetchHNByQuery(query: string, limit: number = 20): Promise<RawHNItem[]> {
  try {
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=${limit}`,
      {
        next: { revalidate: 300 },
      }
    )

    if (!response.ok) {
      throw new Error(`Hacker News API error: ${response.status}`)
    }

    const data = await response.json()
    return data.hits || []
  } catch (error) {
    console.error('Failed to search Hacker News:', error)
    return []
  }
}

export async function saveHNSignals(items: RawHNItem[]): Promise<number> {
  const supabaseAdmin = getSupabaseAdmin()
  if (!supabaseAdmin) {
    return 0
  }

  let savedCount = 0

  for (const item of items) {
    try {
      const hotScore = calculateHotScore(item.points, item.num_comments)
      
      const { data, error } = await supabaseAdmin
        .from('Signal')
        .upsert(
          {
            source: 'hackernews',
            sourceId: item.objectID,
            title: item.title || 'Untitled',
            description: item.story_text?.substring(0, 500) || null,
            url: item.url || `https://news.ycombinator.com/item?id=${item.objectID}`,
            tags: item._tags?.filter(t => !t.startsWith('story_') && !t.startsWith('author_') && t !== 'story') || [],
            author: item.author,
            votesCount: item.points || 0,
            commentsCount: item.num_comments || 0,
            hotScore: hotScore,
            status: 'PENDING',
            rawData: item as any,
          },
          { onConflict: 'source,sourceId' }
        )
        .select()

      if (!error) {
        savedCount++
      }
    } catch (err) {
      console.error(`Failed to save HN item ${item.objectID}:`, err)
    }
  }

  return savedCount
}

function calculateHotScore(points: number, comments: number): number {
  const score = points * 0.7 + comments * 0.3
  return Math.min(100, Math.round(score * 0.5))
}