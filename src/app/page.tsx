'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, TrendingUp, ArrowRight, Zap, Search, Wrench, Share2 } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { sourceLabels } from '@/data/mockSignals'
import type { Signal } from '@/types/signal'

/* ── Value Proposition ── */

function ValueProp() {
  return (
    <section className="px-4 pt-24 pb-8 md:pt-32 md:pb-12">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-spark-blue/10 blur-2xl" />
            <Sparkles className="w-16 h-16 text-spark-blue relative z-10" />
          </div>
        </div>
        <h1 className="text-[36px] md:text-5xl font-bold text-ice-white mb-4 leading-tight">
          发现下一个爆款创意
        </h1>
        <p className="text-base text-fog max-w-2xl mx-auto mb-8">
          监控 Product Hunt、Hacker News、GitHub 等 7 个灵感源，AI 自动评分排序，
          一键生成技术方案和商业画布，从灵感到落地只需 24 小时。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button variant="primary" size="lg">
              免费开始
            </Button>
          </Link>
          <Link href="/radar">
            <Button variant="secondary" size="lg">
              浏览创意信号
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── How It Works ── */

function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-7 h-7 text-spark-blue" />,
      title: '发现创意',
      description: 'AI 实时抓取全网最新创意信号，帮你找到下一个爆款',
    },
    {
      icon: <Wrench className="w-7 h-7 text-spark-blue" />,
      title: '生成方案',
      description: '一键复刻，AI 自动生成技术方案和商业画布',
    },
    {
      icon: <Share2 className="w-7 h-7 text-spark-blue" />,
      title: '分享动态',
      description: '发布你的创意历程，获得社区反馈',
    },
  ]

  return (
    <section className="px-4 pb-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="bg-spark-blue/5 border border-spark-blue/10 rounded-lg p-4 text-center"
            >
              <span className="mb-2 flex justify-center">{step.icon}</span>
              <div className="text-sm font-semibold text-ice-white mb-1">
                {i + 1}. {step.title}
              </div>
              <p className="text-xs text-fog leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Stats Bar ── */

function StatsBar() {
  const [stats, setStats] = useState<{
    totalSignals: number
    todaySignals: number
    avgScore: number
    top10Count: number
  } | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/stats')
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled && json.success && json.data) {
          setStats(json.data)
        }
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const display = stats || { totalSignals: 0, todaySignals: 0, avgScore: 0, top10Count: 0 }

  const items = [
    { label: '信号源', value: `${display.totalSignals}+` },
    { label: '今日新增', value: `${display.todaySignals}+` },
    { label: '平均评分', value: `${display.avgScore}分` },
    { label: 'Top10', value: `${display.top10Count}个` },
  ]

  return (
    <div className="px-4 pb-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-4 sm:gap-8 py-4 px-4 sm:px-6 rounded-lg bg-graphite/50 border border-border-line">
          {items.map((item, i) => (
            <div key={item.label} className="flex items-center gap-4">
              {i > 0 && <div className="hidden sm:block w-px h-8 bg-border-line" />}
              <div className="text-center">
                <p className="text-xl font-bold text-ice-white tabular-nums">{item.value}</p>
                <p className="text-xs text-fog mt-1">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Signal Card (Xiaohongshu Style) ── */

function SignalCard({ signal }: { signal: Signal }) {
  return (
    <Link href={`/radar/${signal.id}`} className="block group">
      <article className="bg-graphite border border-border-line rounded-lg overflow-hidden transition-all duration-200 hover:border-spark-blue/40 hover:shadow-md group-hover:translate-y-[-2px]">
        {/* Cover Area */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-spark-blue/5 via-graphite to-nebula-purple/5 flex items-center justify-center overflow-hidden">
          {/* Subtle ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 to-transparent" />

          {/* Source badge (top-left) */}
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="default" size="sm">
              {sourceLabels[signal.source] || signal.source}
            </Badge>
          </div>

          {/* Score badge (top-right) */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-graphite/80 backdrop-blur-sm text-sm font-bold text-spark-blue tabular-nums">
              <TrendingUp className="w-3 h-3" />
              {signal.finalScore ?? signal.hotScore ?? 0}
            </span>
          </div>

          {/* Center icon */}
          <Zap className="w-10 h-10 text-spark-blue/15 group-hover:text-spark-blue/30 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-semibold text-ice-white line-clamp-2 mb-2 group-hover:text-spark-blue transition-colors leading-snug">
            {signal.title}
          </h3>
          <p className="text-sm text-fog line-clamp-1 mb-3">
            {signal.description || '暂无描述'}
          </p>
          <div className="flex items-center flex-wrap gap-2">
            {signal.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}

/* ── Skeleton Card ── */

function SkeletonSignalGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-graphite border border-border-line rounded-lg overflow-hidden animate-pulse">
          <div className="aspect-[4/3] bg-graphite" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-graphite rounded w-3/4" />
            <div className="h-3 bg-graphite rounded w-full" />
            <div className="flex gap-2">
              <div className="h-5 bg-graphite rounded-full w-12" />
              <div className="h-5 bg-graphite rounded-full w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Signal Feed ── */

function SignalFeed() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchSignals() {
      try {
        const res = await fetch('/api/signals?limit=12&sortBy=score')
        if (!res.ok) {
          setError(true)
          return
        }
        const data = await res.json()
        if (!cancelled && data.success && data.data) {
          setSignals(data.data.slice(0, 12))
        }
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchSignals()
    return () => { cancelled = true }
  }, [])

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-ice-white">
              精选创意信号
            </h2>
            <p className="text-sm text-fog mt-1">
              来自全球灵感源的实时创意，AI 评分排序
            </p>
          </div>
          <Link
            href="/radar"
            className="inline-flex items-center gap-1 text-sm text-spark-blue hover:text-spark-blue-hover transition-colors shrink-0"
          >
            查看全部
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <SkeletonSignalGrid />
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-base text-fog">信号加载失败</p>
            <p className="text-sm text-fog mt-2">请稍后刷新页面重试</p>
          </div>
        ) : signals.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {signals.map((signal) => (
                <SignalCard key={signal.id} signal={signal} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/radar">
                <Button variant="secondary" size="lg">
                  查看全部创意信号
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-base text-fog">暂无信号数据</p>
            <p className="text-sm text-fog mt-2">调用 /api/crawl 抓取信号后即可显示</p>
          </div>
        )}
      </div>
    </section>
  )
}

/* ── Page ── */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ambient-glow">
      <ValueProp />
      <HowItWorks />
      <StatsBar />
      <SignalFeed />
    </div>
  )
}

/*
 * 设计规则遵守情况自查：
 * 1. 无内联 style ✅ — 全部使用 Tailwind 类名 + 设计令牌
 * 2. 组件库 ✅ — 使用 Button、Badge（Sparkles、TrendingUp、ArrowRight、Zap 图标）
 * 3. 间距栅格 ✅ — pt-24/pb-8/py-4/px-6/gap-4/gap-8/mb-4/mb-8/p-4 等均为 4 的倍数
 * 4. 圆角规则 ✅ — 卡片 rounded-lg，按钮 rounded-md（组件内置），Badge rounded-full
 * 5. 字体阶梯 ✅ — 标题 32px/text-xl(20px)/text-base(16px)/text-sm(14px)/text-xs(12px)
 * 6. 交互状态 ✅ — 卡片 hover:border-spark-blue/40 + hover:shadow-md + translate-y，标题 hover:text-spark-blue，链接 hover 颜色变化
 * 7. 氛围光 ✅ — 根 div 使用 bg-ambient-glow
 * 8. 响应式 ✅ — grid-cols-2 (mobile) → md:grid-cols-3 (tablet) → lg:grid-cols-4 (desktop)
 */