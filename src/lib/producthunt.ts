import { getSupabaseAdmin } from './supabase'

export interface RawPHPost {
  id: string
  name: string
  tagline: string
  description?: string
  url: string
  website?: string
  votesCount: number
  commentsCount: number
  thumbnail?: {
    url: string
  }
  topics?: {
    edges: Array<{
      node: {
        name: string
      }
    }>
  }
  user?: {
    name: string
  }
  createdAt: string
}

const PRODUCTHUNT_API = 'https://api.producthunt.com/v2/api/graphql'

export async function fetchProductHuntToday(limit: number = 20): Promise<RawPHPost[]> {
  const token = process.env.PRODUCTHUNT_ACCESS_TOKEN
  
  if (!token) {
    console.warn('Product Hunt API token not configured')
    return []
  }

  const query = `
    query {
      posts(first: ${limit}, order: VOTES) {
        edges {
          node {
            id
            name
            tagline
            description
            url
            website
            votesCount
            commentsCount
            thumbnail {
              url
            }
            topics(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
            user {
              name
            }
            createdAt
          }
        }
      }
    }
  `

  try {
    const response = await fetch(PRODUCTHUNT_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`Product Hunt API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.errors) {
      console.error('Product Hunt GraphQL errors:', data.errors)
      return []
    }

    const edges = data?.data?.posts?.edges || []
    return edges.map((edge: any) => edge.node as RawPHPost)
  } catch (error) {
    console.error('Failed to fetch Product Hunt:', error)
    return []
  }
}

export async function savePHSignals(posts: RawPHPost[]): Promise<number> {
  const supabaseAdmin = getSupabaseAdmin()
  if (!supabaseAdmin) {
    return 0
  }

  let savedCount = 0

  for (const post of posts) {
    try {
      const hotScore = calculatePHHotScore(post.votesCount, post.commentsCount)
      const tags = post.topics?.edges?.map((e: any) => e.node.name) || []
      
      const { error } = await supabaseAdmin
        .from('Signal')
        .upsert(
          {
            source: 'producthunt',
            sourceId: post.id,
            title: post.name,
            description: post.tagline || post.description || '',
            url: post.url,
            imageUrl: post.thumbnail?.url || null,
            tags: tags,
            author: post.user?.name || null,
            votesCount: post.votesCount || 0,
            commentsCount: post.commentsCount || 0,
            hotScore: hotScore,
            status: 'PENDING',
            rawData: post as any,
          },
          { onConflict: 'source,sourceId' }
        )
        .select()

      if (!error) {
        savedCount++
      }
    } catch (err) {
      console.error(`Failed to save PH post ${post.id}:`, err)
    }
  }

  return savedCount
}

function calculatePHHotScore(votes: number, comments: number): number {
  const score = votes * 0.8 + comments * 0.2
  return Math.min(100, Math.round(score * 0.3))
}