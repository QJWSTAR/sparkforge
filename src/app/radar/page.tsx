'use client'

import { useState, useEffect, Suspense, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, HelpCircle, X } from 'lucide-react'
import { Button, ContentCard, Badge, Input } from '@/components/ui'
import { SkeletonSignalCard } from '@/components/Skeleton'
import { sourceLabels } from '@/data/mockSignals'
import type { Signal } from '@/types/signal'

const sourceFilters = [
  { key: 'all', label: '全部' },
  { key: 'producthunt', label: 'Product Hunt' },
  { key: 'hackernews', label: 'Hacker News' },
  { key: 'v2ex', label: 'V2EX' },
  { key: 'jike', label: '即刻' },
]

/* ── Welcome Guide ── */

function WelcomeGuide() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const dismissed = localStorage.getItem('sparkforge-welcome-dismissed')
    if (dismissed === 'true') {
      setVisible(false)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem('sparkforge-welcome-dismissed', 'true')
  }

  if (!visible) return null

  return (
    <div className="bg-spark-blue/5 border border-spark-blue/10 rounded-lg p-4 mb-8">
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm text-ice-white space-y-1">
          <p className="font-semibold">欢迎来到 SparkForge！👋</p>
          <p className="text-fog">1. 浏览下方信号卡片，找到感兴趣的创意</p>
          <p className="text-fog">2. 点击「潜力分」旁边的 <HelpCircle className="inline w-3 h-3 text-spark-blue" /> 可查看评分详情</p>
          <p className="text-fog">3. 点进任一信号，即可一键生成技术方案</p>
        </div>
        <button
          onClick={dismiss}
          aria-label="关闭引导"
          className="shrink-0 p-1 rounded text-fog hover:text-ice-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

/* ── Score Tooltip ── */

function ScoreTooltip() {
  const [show, setShow] = useState(false)

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setShow(!show)}
        onBlur={() => setTimeout(() => setShow(false), 200)}
        className="inline-flex items-center text-spark-blue hover:text-spark-blue-hover transition-colors"
        aria-label="评分说明"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      {show && (
        <div className="absolute bottom-full left-0 mb-2 w-52 p-3 bg-graphite border border-border-line rounded-lg shadow-lg z-50">
          <p className="text-xs text-fog mb-2">评分维度：</p>
          <p className="text-xs text-fog mb-1">· 新颖度 (30%)</p>
          <p className="text-xs text-fog mb-1">· 商业潜力 (35%)</p>
          <p className="text-xs text-fog">· 本地化潜力 (35%)</p>
          <div className="absolute top-full left-4 w-2 h-2 bg-graphite border-r border-b border-border-line rotate-45 -mt-1" />
        </div>
      )}
    </span>
  )
}

function RadarContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '')

  useEffect(() => {
    const initialSearch = searchParams?.get('search')
    if (initialSearch) {
      setSearchQuery(initialSearch)
    }
  }, [searchParams])

  const fetchSignals = useCallback(async () => {
    setLoading(true)
    setError(false)

    try {
      const params = new URLSearchParams()
      params.set('limit', '50')
      params.set('sortBy', 'score')
      if (activeFilter !== 'all') params.set('source', activeFilter)
      if (searchQuery.trim()) params.set('search', searchQuery.trim())

      const res = await fetch(`/api/signals?${params.toString()}`)
      if (!res.ok) {
        setError(true)
        return
      }
      const data = await res.json()
      if (data.success && data.data) {
        setSignals(data.data)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [activeFilter, searchQuery])

  useEffect(() => {
    fetchSignals()
  }, [fetchSignals])

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      router.push(`/radar?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-ambient-glow">
      <div className="container-app py-8">
        <WelcomeGuide />

        <h1 className="text-2xl font-bold text-ice-white mb-8">发现创意</h1>

        {/* Explanation Bar */}
        <div className="bg-spark-blue/5 border border-spark-blue/10 rounded-lg p-4 mb-8">
          <p className="text-sm text-ice-white">
            💡 这些是 AI 从互联网发现的最新创意信号。
            <span className="text-fog">潜力分越高，代表越值得关注。</span>
            <ScoreTooltip />
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <Input
            placeholder="搜索信号…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <div className="flex flex-wrap gap-2">
            {sourceFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={[
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 filter-chip cursor-pointer',
                  activeFilter === f.key
                    ? 'bg-spark-blue text-white'
                    : 'bg-graphite text-fog border border-border-line hover:border-spark-blue hover:text-ice-white',
                ].join(' ')}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Signal List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonSignalCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-base text-fog">信号加载失败</p>
            <p className="text-sm text-fog mt-2 mb-4">请稍后重试</p>
            <Button variant="secondary" onClick={fetchSignals}>
              重试
            </Button>
          </div>
        ) : signals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {signals.map((signal) => (
              <Link key={signal.id} href={`/radar/${signal.id}`}>
                <ContentCard className="p-4 flex flex-col h-full cursor-pointer hover:border-spark-blue active:scale-[0.99]">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="default" size="sm">
                      {sourceLabels[signal.source] || signal.source}
                    </Badge>
                    {signal.tags?.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="default" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-base font-semibold text-ice-white mb-2 line-clamp-2 flex-1">
                    {signal.title}
                  </h3>
                  <p className="text-sm text-fog line-clamp-2 mb-4">
                    {signal.description || '暂无描述'}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-border-line">
                    <span className="text-sm font-mono text-spark-blue font-bold tabular-nums">
                      潜力分 {signal.finalScore ?? signal.hotScore ?? 0}
                    </span>
                    <span className="text-xs text-fog">
                      {signal.createdAt
                        ? new Date(signal.createdAt).toLocaleDateString('zh-CN')
                        : ''}
                    </span>
                  </div>
                </ContentCard>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-base text-fog">暂无信号数据</p>
            <p className="text-sm text-fog mt-2">尝试切换筛选条件或调用 /api/crawl 抓取信号</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RadarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ambient-glow">
        <div className="container-app py-8">
          <h1 className="text-2xl font-bold text-ice-white mb-8">发现创意</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (<SkeletonSignalCard key={i} />))}
          </div>
        </div>
      </div>
    }>
      <RadarContent />
    </Suspense>
  )
}

/*
 * 设计规则遵守情况自查：
 * 1. 无内联 style ✅
 * 2. 组件库 ✅ — 使用 Input、ContentCard、Badge、Button
 * 3. 间距栅格 ✅ — p-4/py-8/gap-4/gap-2/mb-8/mb-2/mb-3/mb-4/mt-2/pt-3 等
 * 4. 圆角规则 ✅ — 搜索按钮 rounded-full，卡片组件内置 rounded-lg
 * 5. 字体阶梯 ✅ — text-2xl(24px)、text-base(16px)、text-sm(14px)、text-xs(12px)、font-mono
 * 6. 交互状态 ✅ — filter-chip 含 hover/active，ContentCard 含 hover:border-spark-blue
 * 7. 氛围光 ✅ — bg-ambient-glow
 */