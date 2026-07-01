'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { mockSignals, sourceLabels } from '@/data/mockSignals'
import type { Signal } from '@/types/signal'
import { useAuth } from '@/lib/auth'
import { useToast } from '@/components/ToastProvider'

const sourceColorMap: Record<string, string> = {
  producthunt: 'var(--color-primary)',
  hackernews: 'var(--state-warning)',
  twitter: 'var(--state-info)',
  github: 'var(--color-text-secondary)',
  indiehackers: 'var(--state-success)',
  v2ex: 'var(--color-dim-novelty)',
  xiaohongshu: 'var(--state-error)',
  juejin: 'var(--state-info)',
  medium: 'var(--color-text-muted)',
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function SignalDetailPage() {
  const params = useParams()
  const signalId = params.id as string

  const { user, isAuthenticated, getSessionToken } = useAuth()
  const { showError, showSuccess } = useToast()
  const [signal, setSignal] = useState<Signal | null>(null)
  const [loading, setLoading] = useState(true)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const fetchSignal = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/signals/${signalId}`)
        const data = await res.json()

        if (data.success && data.data) {
          setSignal(data.data)
        } else {
          const mock = mockSignals.find(s => s.id === signalId)
          if (mock) {
            setSignal(mock)
          }
        }
      } catch (error) {
        const mock = mockSignals.find(s => s.id === signalId)
        if (mock) {
          setSignal(mock)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchSignal()
  }, [signalId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="animate-spin rounded-full"
          style={{
            width: '32px',
            height: '32px',
            border: '2px solid var(--color-primary)',
            borderTopColor: 'transparent',
          }}
        ></div>
      </div>
    )
  }

  if (!signal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p style={{ color: 'var(--color-text-secondary)' }}>信号不存在</p>
          <Link
            href="/radar"
            className="mt-4 inline-block hover:underline"
            style={{ color: 'var(--color-primary)' }}
          >
            返回雷达页面
          </Link>
        </div>
      </div>
    )
  }

  const sourceColor = sourceColorMap[signal.source] || 'var(--color-text-secondary)'
  const sourceLabel = sourceLabels[signal.source] || signal.source

  const scoreBars = [
    { label: '热度', value: signal.hotScore, color: 'var(--color-dim-hot)' },
    { label: '创新', value: signal.noveltyScore, color: 'var(--color-dim-novelty)' },
    { label: '商业', value: signal.businessScore, color: 'var(--color-dim-business)' },
    { label: '本地化', value: signal.localScore, color: 'var(--color-dim-local)' },
  ]

  const analysisSections: { title: string; content: string; borderColor: string }[] = []
  if (signal.concept || signal.description) {
    analysisSections.push({
      title: '创意概念',
      content: (signal.concept || signal.description) as string,
      borderColor: 'var(--color-dim-novelty)',
    })
  }
  if (signal.painPoint) {
    analysisSections.push({ title: '市场痛点', content: signal.painPoint, borderColor: 'var(--color-primary)' })
  }
  if (signal.innovation) {
    analysisSections.push({ title: '核心创新', content: signal.innovation, borderColor: 'var(--state-info)' })
  }
  if (signal.techSolution) {
    analysisSections.push({ title: '技术方案', content: signal.techSolution, borderColor: 'var(--state-success)' })
  }
  if (signal.acquisition) {
    analysisSections.push({ title: '获客策略', content: signal.acquisition, borderColor: 'var(--state-warning)' })
  }
  if (signal.differentiation) {
    analysisSections.push({ title: '竞品差异', content: signal.differentiation, borderColor: 'var(--state-info)' })
  }

  const similarSignals = mockSignals.filter(s => s.id !== signal.id).slice(0, 3)

  const statusTag =
    signal.status === 'TOP10'
      ? { text: 'TOP 10', color: 'var(--color-primary)', bg: 'var(--color-primary-muted)' }
      : signal.status === 'SCORED'
        ? { text: '已评分', color: 'var(--state-success)', bg: 'color-mix(in srgb, var(--state-success) 12%, transparent)' }
        : signal.status === 'SCREENED'
          ? { text: '待评分', color: 'var(--state-warning)', bg: 'color-mix(in srgb, var(--state-warning) 12%, transparent)' }
          : { text: '新信号', color: 'var(--color-text-secondary)', bg: 'var(--color-bg-hover)' }

  return (
    <main className="mx-auto px-4 py-8" style={{ maxWidth: '900px' }}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ─── Left Column (~65%) ─── */}
        <div className="flex-1 min-w-0" style={{ flexBasis: '65%' }}>
          {/* 1. Signal Header */}
          <section className="mb-6">
            {/* Tags row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                style={{
                  background: `color-mix(in srgb, ${sourceColor} 12%, transparent)`,
                  color: sourceColor,
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  padding: '3px 10px',
                }}
              >
                {sourceLabel}
              </span>
              <span
                style={{
                  background: statusTag.bg,
                  color: statusTag.color,
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  padding: '3px 10px',
                }}
              >
                {statusTag.text}
              </span>
            </div>
            {/* Title */}
            <h1
              className="mb-2"
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 600,
                color: 'var(--color-text)',
                lineHeight: 'var(--leading-tight)',
              }}
            >
              {signal.title}
            </h1>
            {/* Description */}
            {signal.description && (
              <p
                className="mb-3"
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                {signal.description}
              </p>
            )}
            {/* Metadata */}
            <div
              className="flex flex-wrap items-center gap-3"
              style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}
            >
              <span>更新于 {formatDate(signal.fetchedAt)}</span>
              <span style={{ color: 'var(--color-border)' }}>|</span>
              <span>投票 {signal.votesCount}</span>
              <span style={{ color: 'var(--color-border)' }}>|</span>
              <span>评论 {signal.commentsCount}</span>
            </div>
          </section>

          {/* 2. Score Overview */}
          <section
            className="mb-6"
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
            }}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Circular score */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    border: '5px solid var(--color-primary)',
                    background: 'var(--color-bg-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '32px',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                      fontVariantNumeric: 'tabular-nums',
                      lineHeight: 1,
                    }}
                  >
                    {signal.finalScore ?? '-'}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                    marginTop: 'var(--space-2)',
                  }}
                >
                  综合评分
                </span>
              </div>
              {/* Score bars */}
              <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
                {scoreBars.map((bar) => (
                  <div key={bar.label} className="flex flex-col gap-1">
                    <div
                      className="flex items-center justify-between"
                      style={{ fontSize: 'var(--text-sm)' }}
                    >
                      <span style={{ color: 'var(--color-text-secondary)' }}>{bar.label}</span>
                      <span
                        style={{
                          color: 'var(--color-text)',
                          fontWeight: 500,
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {bar.value ?? '-'}
                      </span>
                    </div>
                    <div
                      style={{
                        height: '6px',
                        background: 'var(--color-bg-hover)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${bar.value ?? 0}%`,
                          height: '100%',
                          background: bar.color,
                          borderRadius: 'var(--radius-full)',
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Analysis Sections */}
          <div className="flex flex-col gap-4 mb-6">
            {analysisSections.map((section) => (
              <section
                key={section.title}
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-5)',
                  borderLeft: `3px solid ${section.borderColor}`,
                }}
              >
                <h3
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {section.title}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          {/* 4. Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/forge?signalId=${signal.id}`}
              className="btn-press"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-text-inverse)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                padding: '10px 20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              一键复刻
            </Link>
            <Link
              href={`/canvas?signalId=${signal.id}`}
              className="btn-press"
              style={{
                background: 'transparent',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                padding: '10px 20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              生成商业画布
            </Link>
            <button
              onClick={async () => {
                if (!isAuthenticated) {
                  showError('请先登录')
                  return
                }
                const sessionToken = await getSessionToken()
                if (!sessionToken) {
                  showError('会话无效，请重新登录')
                  return
                }
                try {
                  const res = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${sessionToken}`,
                    },
                    body: JSON.stringify({ userId: user!.id, signalId: signal!.id }),
                  })
                  const data = await res.json()
                  if (data.success) {
                    setSubscribed(true)
                    showSuccess('订阅成功')
                  } else {
                    showError(data.error || '订阅失败')
                  }
                } catch (error) {
                  showError('订阅失败，请重试')
                }
              }}
              className="btn-press"
              style={{
                background: subscribed ? 'var(--color-primary-muted)' : 'transparent',
                color: subscribed ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                border: subscribed ? '1px solid var(--color-primary)' : 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                padding: '10px 20px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              {subscribed ? '已订阅' : '订阅信号'}
            </button>
            <button
              disabled
              title="功能即将上线"
              style={{
                background: 'transparent',
                color: 'var(--color-text-muted)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                padding: '10px 20px',
                cursor: 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                opacity: 0.6,
              }}
            >
              分享
            </button>
          </div>
        </div>

        {/* ─── Right Column (sidebar ~35%) ─── */}
        <aside className="shrink-0 w-full lg:w-auto" style={{ flexBasis: '35%' }}>
          <div className="flex flex-col gap-4">
            {/* Quick Actions Card */}
            <section
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                快速操作
              </h3>
              <div className="flex flex-col gap-1">
                <Link
                  href={`/forge?signalId=${signal.id}`}
                  className="hover:bg-[var(--color-bg-hover)]"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    padding: 'var(--space-2)',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-primary)',
                      fontWeight: 500,
                    }}
                  >
                    一键复刻
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                    用 TRAE IDE 自动生成代码
                  </span>
                </Link>
                <Link
                  href={`/canvas?signalId=${signal.id}`}
                  className="hover:bg-[var(--color-bg-hover)]"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    padding: 'var(--space-2)',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-primary)',
                      fontWeight: 500,
                    }}
                  >
                    生成商业画布
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                    AI 分析市场和竞争
                  </span>
                </Link>
              </div>
            </section>

            {/* Related Tags Card */}
            <section
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                相关标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {signal.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: 'var(--color-bg-hover)',
                      color: 'var(--color-text-secondary)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      padding: '3px 10px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Similar Signals Card */}
            <section
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                相似信号
              </h3>
              <div className="flex flex-col gap-1">
                {similarSignals.map((s) => (
                  <Link
                    key={s.id}
                    href={`/radar/${s.id}`}
                    className="hover:bg-[var(--color-bg-hover)]"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 'var(--space-2)',
                      padding: 'var(--space-2)',
                      borderRadius: 'var(--radius-sm)',
                      textDecoration: 'none',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text)',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {s.title}
                    </span>
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-primary)',
                        fontWeight: 600,
                        fontVariantNumeric: 'tabular-nums',
                        flexShrink: 0,
                      }}
                    >
                      {s.finalScore ?? '-'}分
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </aside>
      </div>
    </main>
  )
}
