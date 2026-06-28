'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import SignalCard from '@/components/SignalCard'
import { mockSignals, categories, sourceLabels } from '@/data/mockSignals'
import type { Signal } from '@/types/signal'

export default function RadarPage() {
  const [selectedSource, setSelectedSource] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const [sortBy, setSortBy] = useState<'hot' | 'score' | 'newest'>('score')
  const [minScore, setMinScore] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)

  const sources = ['all', 'producthunt', 'hackernews', 'twitter', 'github', 'indiehackers', 'v2ex', 'xiaohongshu', 'juejin', 'medium']

  useEffect(() => {
    const fetchSignals = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          sortBy,
          limit: '50',
        })
        if (selectedSource !== 'all') params.set('source', selectedSource)
        if (minScore > 0) params.set('minScore', String(minScore))
        if (searchQuery) params.set('search', searchQuery)

        const res = await fetch(`/api/signals?${params}`)
        const data = await res.json()

        if (data.success && data.data?.length > 0) {
          setSignals(data.data)
        } else {
          setSignals(mockSignals)
        }
      } catch (error) {
        console.error('Failed to fetch signals:', error)
        setSignals(mockSignals)
      } finally {
        setLoading(false)
      }
    }

    fetchSignals()
  }, [selectedSource, sortBy, minScore, searchQuery])

  const filteredSignals = useMemo(() => {
    let result = [...signals]

    if (selectedCategory !== '全部') {
      result = result.filter(s => s.tags?.some(t => t.includes(selectedCategory) || selectedCategory.includes(t)))
    }

    return result
  }, [signals, selectedCategory])

  const top10Signals = filteredSignals
    .filter(s => s.status === 'TOP10' || (s.finalScore && s.finalScore >= 70))
    .slice(0, 10)

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 sticky top-0 z-10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-lg flex items-center justify-center font-bold">
              S
            </div>
            <span className="text-xl font-bold">SparkForge</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">首页</Link>
            <Link href="/radar" className="text-[#FF6B35] font-medium">创意雷达</Link>
            <Link href="/forge" className="text-gray-400 hover:text-white transition-colors">复刻工坊</Link>
            <Link href="/canvas" className="text-gray-400 hover:text-white transition-colors">商业画布</Link>
            <Link href="/stream" className="text-gray-400 hover:text-white transition-colors">公开日志</Link>
          </nav>
          <button className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
            订阅 Top 10
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">创意信号雷达</h1>
              <p className="text-gray-400">
                实时监控 9 大信号源，AI 智能评分，发现下一个爆款创意
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>实时更新中</span>
              </div>
              <div>
                共 <span className="text-white font-medium">{filteredSignals.length}</span> 条信号
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="搜索信号、标签、描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                ⌘K
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'hot' | 'score' | 'newest')}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6B35]/50"
              >
                <option value="score">按综合评分</option>
                <option value="hot">按热度</option>
                <option value="newest">按时间</option>
              </select>

              <select
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6B35]/50"
              >
                <option value={0}>全部分数</option>
                <option value={60}>60+ 分</option>
                <option value={70}>70+ 分</option>
                <option value={80}>80+ 分</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {sources.map((source) => (
              <button
                key={source}
                onClick={() => setSelectedSource(source)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedSource === source
                    ? 'bg-[#FF6B35] text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {source === 'all' ? '全部源' : sourceLabels[source] || source}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                全部信号
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredSignals.length} 条)
                </span>
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-16 text-gray-500">
                <div className="animate-spin w-8 h-8 border-2 border-[#FF6B35] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p>加载中...</p>
              </div>
            ) : filteredSignals.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-4xl mb-4">🔍</div>
                <p>没有找到匹配的信号</p>
                <p className="text-sm">试试调整筛选条件</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSignals.map((signal, index) => (
                  <SignalCard
                    key={signal.id}
                    signal={signal}
                    rank={sortBy === 'score' ? index + 1 : undefined}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#FF6B35]/10 to-[#FFB800]/10 border border-[#FF6B35]/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🏆</span>
                <h3 className="font-bold text-lg">今日 Top 10</h3>
              </div>
              <div className="space-y-2">
                {top10Signals.slice(0, 5).map((signal, index) => (
                  <div
                    key={signal.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      index === 0 ? 'bg-[#FF6B35] text-white' :
                      index === 1 ? 'bg-[#FFB800] text-black' :
                      index === 2 ? 'bg-[#3B82F6] text-white' :
                      'bg-white/10 text-gray-400'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{signal.title}</div>
                      <div className="text-xs text-gray-500">{sourceLabels[signal.source] || signal.source}</div>
                    </div>
                    <span className="text-[#FF6B35] font-bold text-sm">{signal.finalScore ?? '-'}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-sm text-[#FF6B35] hover:underline">
                查看完整 Top 10 →
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold mb-4">🔥 热门标签</h3>
              <div className="flex flex-wrap gap-2">
                {['AI', 'SaaS', '开发者工具', '生产力', '开源', 'NoCode'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white/10 text-gray-300 px-2.5 py-1 rounded-full cursor-pointer hover:bg-white/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold mb-4">📊 信号源分布</h3>
              <div className="space-y-3">
                {Object.entries(sourceLabels).map(([key, label]) => {
                  const count = signals.filter(s => s.source === key).length
                  const percentage = signals.length > 0 ? (count / signals.length) * 100 : 0
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">{label}</span>
                        <span className="text-gray-500">{count}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FFB800] rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
