import { supabaseAdmin } from './supabase'
import { fetchHackerNewsTop, saveHNSignals } from './hackernews'
import { fetchProductHuntToday, savePHSignals } from './producthunt'

export interface SignalQuery {
  source?: string
  status?: string
  minScore?: number
  sortBy?: 'hot' | 'score' | 'newest'
  limit?: number
  offset?: number
  search?: string
}

export async function getSignals(query: SignalQuery = {}) {
  if (!supabaseAdmin) {
    return { signals: [], total: 0 }
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
    console.error('Failed to fetch signals:', error)
    return { signals: [], total: 0 }
  }

  return { signals: data || [], total: count || 0 }
}

export async function getSignalById(id: string) {
  if (!supabaseAdmin) {
    return null
  }

  const { data, error } = await supabaseAdmin
    .from('Signal')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Failed to fetch signal:', error)
    return null
  }

  return data
}

export async function crawlAllSources(): Promise<{ hn: number; ph: number; total: number }> {
  if (!supabaseAdmin) {
    return { hn: 0, ph: 0, total: 0 }
  }

  const [hnItems, phPosts] = await Promise.all([
    fetchHackerNewsTop(30),
    fetchProductHuntToday(20),
  ])

  const [hnSaved, phSaved] = await Promise.all([
    saveHNSignals(hnItems),
    savePHSignals(phPosts),
  ])

  const total = hnSaved + phSaved

  if (total > 0) {
    await addLogEntry({
      type: 'SYSTEM',
      title: `信号抓取完成`,
      content: `Hacker News: ${hnSaved} 条 | Product Hunt: ${phSaved} 条 | 总计: ${total} 条新信号`,
    })
  }

  return { hn: hnSaved, ph: phSaved, total }
}

export async function addLogEntry(entry: {
  type: string
  title: string
  content?: string
  signalId?: string
  forgeId?: string
  metadata?: any
}) {
  if (!supabaseAdmin) {
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
      })

    if (error) {
      console.error('Failed to add log entry:', error)
    }
  } catch (err) {
    console.error('Failed to add log entry:', err)
  }
}

export async function getLogs(limit: number = 20, type?: string) {
  if (!supabaseAdmin) {
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
    console.error('Failed to fetch logs:', error)
    return []
  }

  return data || []
}