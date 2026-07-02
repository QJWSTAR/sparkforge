'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ChevronRight, ExternalLink, Share2, TrendingUp } from 'lucide-react'
import { Button, Badge, ContentCard } from '@/components/ui'
import { Skeleton } from '@/components/Skeleton'
import { sourceLabels } from '@/data/mockSignals'
import { useToast } from '@/components/ToastProvider'
import type { Signal } from '@/types/signal'

const sourceBadgeVariant: Record<string, 'default' | 'success' | 'warning'> = {
  producthunt: 'success',
  hackernews: 'warning',
  twitter: 'default',
  github: 'default',
  indiehackers: 'success',
  v2ex: 'default',
  xiaohongshu: 'warning',
  juejin: 'default',
  medium: 'default',
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const trendHeights = ['h-8', 'h-12', 'h-10', 'h-16', 'h-10', 'h-14', 'h-10']

function buildAISummary(signal: Signal): string | null {
  const parts = [
    signal.concept,
    signal.painPoint,
    signal.innovation,
    signal.techSolution,
    signal.acquisition,
    signal.differentiation,
  ].filter(Boolean) as string[]
  return parts.length > 0 ? parts.join('\n\n') : null
}

export default function SignalDetailPage() {
  const params = useParams()
  const { showSuccess, showError } = useToast()
  const [signal, setSignal] = useState<Signal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const signalId = params?.id as string

  useEffect(() => {
    if (!signalId) return

    let cancelled = false

    const fetchSignal = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/signals/${signalId}`)
        if (!res.ok) {
          if (!cancelled) {
            setError(res.status === 404 ? '信号不存在' : '加载失败，请稍后重试')
            setLoading(false)
          }
          return
        }
        const data = await res.json()

        if (!cancelled) {
          if (data.success && data.data) {
            setSignal(data.data)
          } else {
            setError(data.error || '信号不存在')
          }
        }
      } catch {
        if (!cancelled) {
          setError('加载失败，请稍后重试')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchSignal()

    return () => {
      cancelled = true
    }
  }, [signalId])

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      showSuccess('链接已复制到剪贴板')
    } catch {
      showError('复制失败，请重试')
    }
  }

  if (!signalId) return null

  if (loading) {
    return (
      <main className="bg-deep-space min-h-screen">
        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left skeleton */}
            <div className="lg:w-2/3 space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-8 w-3/4" />
              </div>

              <div className="flex items-center gap-8">
                <div className="space-y-3">
                  <Skeleton className="h-12 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-end gap-2">
                  {trendHeights.map((_, i) => (
                    <Skeleton key={i} className="w-4 h-12 rounded-sm" />
                  ))}
                </div>
              </div>

              <div>
                <Skeleton className="h-4 w-16 mb-4" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-5/6 mb-3" />
                <Skeleton className="h-4 w-4/6" />
              </div>

              <div>
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </div>

            {/* Right skeleton */}
            <aside className="lg:w-1/3 space-y-4">
              <Skeleton className="h-11 w-full rounded-md" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-11 w-full rounded-md" />
            </aside>
          </div>
        </div>
      </main>
    )
  }

  if (error || !signal) {
    return (
      <main className="bg-deep-space min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-ui-error text-lg mb-4">{error || '信号不存在'}</p>
          <Link
            href="/radar"
            className="text-spark-blue hover:underline"
          >
            返回创意雷达
          </Link>
        </div>
      </main>
    )
  }

  const sourceLabel = sourceLabels[signal.source] || signal.source
  const badgeVariant = sourceBadgeVariant[signal.source] || 'default'
  const aiSummary = buildAISummary(signal)

  return (
    <main className="bg-deep-space min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-fog mb-8">
          <Link href="/" className="hover:text-ice-white transition-colors">
            首页
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/radar" className="hover:text-ice-white transition-colors">
            创意雷达
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-ice-white">信号详情</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Left Main Area ── */}
          <div className="lg:w-2/3 space-y-8">
            {/* Title + Source Badge */}
            <section className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant={badgeVariant} size="sm">
                  {sourceLabel}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-ice-white">
                {signal.title}
              </h1>
            </section>

            {/* Hot Score + Trend Chart */}
            <section className="flex items-center gap-8">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-spark-blue" />
                  <span className="text-sm text-fog">热度</span>
                </div>
                <span className="text-5xl font-mono font-bold text-spark-blue tabular-nums">
                  {signal.hotScore}
                </span>
              </div>
              <div className="flex items-end gap-2">
                {trendHeights.map((h, i) => (
                  <div
                    key={i}
                    className={`w-4 ${h} bg-spark-blue/60 rounded-sm`}
                  />
                ))}
              </div>
            </section>

            {/* AI Analysis Summary */}
            {aiSummary && (
              <section>
                <ContentCard className="border-l-[3px] border-l-spark-blue !rounded-l-none">
                  <h3 className="text-sm font-semibold text-spark-blue mb-4">
                    AI 分析
                  </h3>
                  <p className="text-base text-fog leading-relaxed whitespace-pre-line">
                    {aiSummary}
                  </p>
                </ContentCard>
              </section>
            )}

            {/* Full Description */}
            {signal.description && (
              <section>
                <p className="text-base text-fog leading-relaxed">
                  {signal.description}
                </p>
              </section>
            )}

            {/* Tags */}
            {signal.tags.length > 0 && (
              <section>
                <div className="flex flex-wrap gap-2">
                  {signal.tags.map((tag) => (
                    <Badge key={tag} variant="default" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-fog">
              <span>更新于 {formatDate(signal.fetchedAt)}</span>
              <span className="text-border-line">|</span>
              <span>投票 {signal.votesCount}</span>
              <span className="text-border-line">|</span>
              <span>评论 {signal.commentsCount}</span>
            </div>
          </div>

          {/* ── Right Sidebar ── */}
          <aside className="lg:w-1/3">
            <div className="bg-graphite border border-border-line rounded-lg p-4 space-y-4">
              {/* 一键复刻 */}
              <Link href={`/forge?signalId=${signal.id}`} className="block">
                <Button variant="primary" size="lg" className="w-full">
                  一键复刻
                </Button>
              </Link>

              {/* Source Link */}
              {signal.url && (
                <a
                  href={signal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-spark-blue hover:underline text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>查看来源</span>
                </a>
              )}

              {/* 分享 */}
              <Button
                variant="ghost"
                size="lg"
                className="w-full"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
                <span>分享</span>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}