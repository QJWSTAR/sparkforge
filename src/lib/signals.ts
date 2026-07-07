import { getSupabaseAdmin, isDbAvailable, invalidateDbConnection } from './supabase'
import { fetchHackerNewsTop, saveHNSignals } from './hackernews'
import { fetchProductHuntToday, savePHSignals } from './producthunt'
import { fetchV2EXHot, saveV2EXSignals } from './v2ex'
import { fetchJikeHot, type RawJikePost } from './jike'
import { fetchGitHubTrending, saveGHTrendingSignals } from './github-trending'
import { fetchGitHubReleases, saveGHReleaseSignals } from './github-releases'
import { fetchIndieHackers, saveIHSignals } from './indiehackers'
import { batchScoreUnscoredSignals } from './scoring'
import { mockSignals } from '@/data/mockSignals'

export async function saveJikeSignals(posts: RawJikePost[]): Promise<number> {
  const supabaseAdmin = await getSupabaseAdmin()

  if (!supabaseAdmin) {
    console.warn('[Jike] Database unavailable, skipping save')
    return 0
  }

  let savedCount = 0

  for (const post of posts) {
    try {
      const hotScore = Math.round((post.votesCount / 300) * 100)

      const { error } = await supabaseAdmin
        .from('Signal')
        .upsert(
          {
            source: 'jike',
            sourceId: post.id,
            title: post.title,
            description: post.description || '',
            url: post.url,
            imageUrl: null,
            tags: post.tags || [],
            author: post.author || null,
            votesCount: post.votesCount || 0,
            commentsCount: post.commentsCount || 0,
            hotScore: hotScore,
            status: 'PENDING',
          },
          { onConflict: 'source,sourceId' }
        )

      if (!error) {
        savedCount++
      } else {
        console.error('[Jike] Insert failed:', error)
      }
    } catch (err) {
      console.error('[Jike] Unexpected error:', err)
    }
  }

  return savedCount
}

export interface SignalQuery {
  source?: string
  status?: string
  minScore?: number
  sortBy?: 'hot' | 'score' | 'newest'
  limit?: number
  offset?: number
  search?: string
}

function filterMockSignals(mockData: any[], query: SignalQuery): any[] {
  let filtered = [...mockData]

  if (query.source && query.source !== 'all') {
    filtered = filtered.filter(s => s.source === query.source)
  }

  if (query.status) {
    filtered = filtered.filter(s => s.status === query.status)
  }

  if (query.minScore && query.minScore > 0) {
    const minScore = query.minScore
    filtered = filtered.filter(s => s.finalScore >= minScore)
  }

  if (query.search) {
    const searchLower = query.search.toLowerCase()
    filtered = filtered.filter(s => 
      s.title.toLowerCase().includes(searchLower) ||
      (s.description && s.description.toLowerCase().includes(searchLower))
    )
  }

  switch (query.sortBy) {
    case 'hot':
      filtered.sort((a, b) => (b.hotScore || 0) - (a.hotScore || 0))
      break
    case 'score':
      filtered.sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0))
      break
    case 'newest':
      filtered.sort((a, b) => new Date(b.fetchedAt).getTime() - new Date(a.fetchedAt).getTime())
      break
  }

  const offset = query.offset || 0
  const limit = query.limit || 20

  return filtered.slice(offset, offset + limit)
}

export async function getSignals(query: SignalQuery = {}) {
  const dbAvailable = isDbAvailable()

  try {
    const supabaseAdmin = await getSupabaseAdmin()

    if (!supabaseAdmin) {
      console.warn('[Signals] Database unavailable, returning mock data')
      const filtered = filterMockSignals(mockSignals, query)
      return { 
        signals: filtered, 
        total: mockSignals.length,
        fromCache: true,
        dbAvailable: false
      }
    }

    const {
      source,
      status,
      minScore = 0,
      sortBy = 'score',
      limit = 20,
      offset = 0,
      search,
    } = query

    let dbQuery = supabaseAdmin
      .from('Signal')
      .select('*', { count: 'exact' })

    if (source && source !== 'all') {
      dbQuery = dbQuery.eq('source', source)
    }

    if (status) {
      dbQuery = dbQuery.eq('status', status)
    }

    if (minScore > 0) {
      dbQuery = dbQuery.gte('finalScore', minScore)
    }

    if (search) {
      dbQuery = dbQuery.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    switch (sortBy) {
      case 'hot':
        dbQuery = dbQuery.order('hotScore', { ascending: false })
        break
      case 'score':
        dbQuery = dbQuery.order('finalScore', { ascending: false, nullsFirst: false })
        break
      case 'newest':
        dbQuery = dbQuery.order('fetchedAt', { ascending: false })
        break
    }

    dbQuery = dbQuery.range(offset, offset + limit - 1)

    const { data, count, error } = await dbQuery

    if (error) {
      console.error('[Signals] Failed to fetch signals from database:', error)
      
      if (error.code === 'PGRST001' || error.message?.includes('connection')) {
        invalidateDbConnection()
      }

      const filtered = filterMockSignals(mockSignals, query)
      return { 
        signals: filtered, 
        total: mockSignals.length,
        fromCache: true,
        dbAvailable: false,
        error: error.message
      }
    }

    return { 
      signals: data || [], 
      total: count || 0,
      fromCache: false,
      dbAvailable: true
    }

  } catch (error) {
    console.error('[Signals] Unexpected error fetching signals:', error)
    invalidateDbConnection()
    
    const filtered = filterMockSignals(mockSignals, query)
    return { 
      signals: filtered, 
      total: mockSignals.length,
      fromCache: true,
      dbAvailable: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function getSignalById(id: string) {
  try {
    const supabaseAdmin = await getSupabaseAdmin()

    if (!supabaseAdmin) {
      console.warn('[Signals] Database unavailable, searching mock data for signal:', id)
      const signal = mockSignals.find(s => s.id === id) || null
      return { signal, dbAvailable: false }
    }

    const { data, error } = await supabaseAdmin
      .from('Signal')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('[Signals] Failed to fetch signal from database:', error)
      
      if (error.code === 'PGRST001' || error.message?.includes('connection')) {
        invalidateDbConnection()
      }

      const signal = mockSignals.find(s => s.id === id) || null
      return { signal, dbAvailable: false }
    }

    return { signal: data, dbAvailable: true }

  } catch (error) {
    console.error('[Signals] Unexpected error fetching signal:', error)
    invalidateDbConnection()
    const signal = mockSignals.find(s => s.id === id) || null
    return { signal, dbAvailable: false }
  }
}

export async function crawlAllSources(): Promise<{ hn: number; ph: number; v2ex: number; jike: number; ghTrending: number; ghRelease: number; ih: number; total: number; dbAvailable: boolean }> {
  const supabaseAdmin = await getSupabaseAdmin()
  
  if (!supabaseAdmin) {
    console.warn('[Signals] Database unavailable, skipping crawl')
    return { hn: 0, ph: 0, v2ex: 0, jike: 0, ghTrending: 0, ghRelease: 0, ih: 0, total: 0, dbAvailable: false }
  }

  try {
    const [hnItems, phPosts, v2exTopics, jikePosts, ghTrendingRepos, ghReleases, ihProducts] = await Promise.all([
      fetchHackerNewsTop(30),
      fetchProductHuntToday(20),
      fetchV2EXHot(20),
      fetchJikeHot(10),
      fetchGitHubTrending(20),
      fetchGitHubReleases(10),
      fetchIndieHackers(10),
    ])

    const [hnSaved, phSaved, v2exSaved, jikeSaved, ghTrendingSaved, ghReleaseSaved, ihSaved] = await Promise.all([
      saveHNSignals(hnItems),
      savePHSignals(phPosts),
      saveV2EXSignals(v2exTopics),
      saveJikeSignals(jikePosts),
      saveGHTrendingSignals(ghTrendingRepos),
      saveGHReleaseSignals(ghReleases),
      saveIHSignals(ihProducts),
    ])

    const total = hnSaved + phSaved + v2exSaved + jikeSaved + ghTrendingSaved + ghReleaseSaved + ihSaved

    if (total > 0) {
      await addLogEntry({
        type: 'SYSTEM',
        title: `信号抓取完成`,
        content: `Hacker News: ${hnSaved} | Product Hunt: ${phSaved} | V2EX: ${v2exSaved} | 即刻: ${jikeSaved} | GitHub Trending: ${ghTrendingSaved} | GitHub Releases: ${ghReleaseSaved} | Indie Hackers: ${ihSaved} | 总计: ${total} 条新信号`,
      })

      const scored = await batchScoreUnscoredSignals(50)
      if (scored > 0) {
        await addLogEntry({
          type: 'SIGNAL_SCORED',
          title: `自动评分完成`,
          content: `对新抓取的信号进行了评分，共评分 ${scored} 条`,
        })
      }
    }

    return { hn: hnSaved, ph: phSaved, v2ex: v2exSaved, jike: jikeSaved, ghTrending: ghTrendingSaved, ghRelease: ghReleaseSaved, ih: ihSaved, total, dbAvailable: true }

  } catch (error) {
    console.error('[Signals] Unexpected error during crawl:', error)
    invalidateDbConnection()
    return { hn: 0, ph: 0, v2ex: 0, jike: 0, ghTrending: 0, ghRelease: 0, ih: 0, total: 0, dbAvailable: false }
  }
}

export async function addLogEntry(entry: {
  type: string
  title: string
  content?: string
  signalId?: string
  forgeId?: string
  metadata?: any
  userId?: string
}) {
  const supabaseAdmin = await getSupabaseAdmin()

  if (!supabaseAdmin) {
    console.warn('[Signals] Database unavailable, skipping log entry')
    return
  }

  try {
    const { error } = await supabaseAdmin
      .from('LogEntry')
      .insert({
        type: entry.type,
        title: entry.title,
        content: entry.content,
        signalId: entry.signalId,
        forgeId: entry.forgeId,
        metadata: entry.metadata,
        userId: entry.userId,
        updatedAt: new Date().toISOString(),
      })

    if (error) {
      console.error('[Signals] Failed to add log entry:', error)
      if (error.code === 'PGRST001' || error.message?.includes('connection')) {
        invalidateDbConnection()
      }
    }
  } catch (err) {
    console.error('[Signals] Unexpected error adding log entry:', err)
    invalidateDbConnection()
  }
}

export async function getLogs(limit: number = 20, type?: string) {
  const dbAvailable = isDbAvailable()

  try {
    const supabaseAdmin = await getSupabaseAdmin()

    if (!supabaseAdmin) {
      console.warn('[Signals] Database unavailable, returning empty logs')
      return []
    }

    let query = supabaseAdmin
      .from('LogEntry')
      .select('*')
      .order('createdAt', { ascending: false })
      .limit(limit)

    if (type) {
      query = query.eq('type', type)
    }

    const { data, error } = await query

    if (error) {
      console.error('[Signals] Failed to fetch logs from database:', error)
      
      if (error.code === 'PGRST001' || error.message?.includes('connection')) {
        invalidateDbConnection()
      }

      return []
    }

    return data || []

  } catch (error) {
    console.error('[Signals] Unexpected error fetching logs:', error)
    invalidateDbConnection()
    return []
  }
}