'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, Radar, Hammer, Layout, Radio, ArrowRight } from 'lucide-react'
import { Button, DataCard, ContentCard, Badge } from '@/components/ui'
import { Skeleton, SkeletonCard } from '@/components/Skeleton'
import { sourceLabels } from '@/data/mockSignals'
import type { Signal } from '@/types/signal'

/* ── Hero Section ── */

function Hero() {
  return (
    <section className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        {/* Sparkle graphic */}
        <div className="mb-8 inline-flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-2xl bg-spark-blue/10" />
            <Sparkles className="w-16 h-16 text-spark-blue relative z-10" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-ice-white mb-4 leading-tight">
          From spark to shipped, in 24 hours.
        </h1>

        <p className="text-base text-fog max-w-2xl mx-auto mb-8">
          SparkForge 为你监控全网 9+ 灵感源，一键生成 MVP。从灵感到上线，只需 24 小时。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button variant="primary" size="lg">
              免费开始
            </Button>
          </Link>
          <Link href="/radar">
            <Button variant="secondary" size="lg">
              查看演示
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Trust Signals ── */

function TrustSignals() {
  return (
    <section className="px-4 py-16 border-y border-border-line">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DataCard title="信号源" value="9+" />
          <DataCard title="每日信号" value="200+" />
          <DataCard title="MVP 生成" value="30s" />
          <DataCard title="Top10 入选率" value="70%" />
        </div>
      </div>
    </section>
  )
}

/* ── Core Features ── */

const features = [
  {
    icon: Radar,
    title: '创意雷达',
    description:
      '7×24 小时抓取 Product Hunt、Hacker News 等 9 个信号源，AI 自动评分排序，发现下一个爆款创意。',
    href: '/radar',
  },
  {
    icon: Hammer,
    title: '复刻工坊',
    description:
      '一键调用 TRAE IDE 生成可运行 MVP。配置复刻语言、改造点、自定义 Prompt，30 秒出结果。',
    href: '/forge',
  },
  {
    icon: Layout,
    title: '商业画布',
    description:
      '基于信号生成完整商业画布。一句话定位、用户画像、竞品图谱、30 天行动清单，一键导出。',
    href: '/canvas',
  },
  {
    icon: Radio,
    title: '公开日志',
    description:
      'Build in Public 实时流。记录从信号发现到商业变现的全过程，自动生成分享文案。',
    href: '/stream',
  },
]

function CoreFeatures() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-ice-white text-center mb-12">
          核心功能
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <ContentCard key={f.title} className="p-6">
              <div className="flex flex-col h-full">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-spark-blue/10">
                  <f.icon className="w-5 h-5 text-spark-blue" />
                </div>
                <h3 className="text-lg font-semibold text-ice-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-fog leading-relaxed flex-1 mb-4">
                  {f.description}
                </p>
                <Link
                  href={f.href}
                  className="inline-flex items-center gap-1 text-sm text-spark-blue hover:text-spark-blue-hover transition-colors"
                >
                  了解更多
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ContentCard>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Real-time Signal Preview ── */

function SignalPreview() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchSignals() {
      try {
        const res = await fetch('/api/signals?limit=6')
        const data = await res.json()
        if (!cancelled && data.success && data.data) {
          setSignals(data.data.slice(0, 6))
        }
      } catch {
        // silent fallback
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchSignals()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-ice-white">
            实时信号
          </h2>
          <Link
            href="/radar"
            className="inline-flex items-center gap-1 text-sm text-spark-blue hover:text-spark-blue-hover transition-colors"
          >
            查看全部
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : signals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {signals.map((signal) => (
              <ContentCard key={signal.id} className="p-4 flex flex-col">
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
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border-line">
                  <span className="text-sm font-mono text-spark-blue font-bold tabular-nums">
                    {signal.finalScore ?? signal.hotScore ?? 0}
                  </span>
                  <Link href={`/radar/${signal.id}`}>
                    <Button variant="ghost" size="md">
                      查看详情
                    </Button>
                  </Link>
                </div>
              </ContentCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-fog">
            <p className="text-base">暂无信号数据</p>
            <p className="text-sm mt-2">调用 /api/crawl 抓取信号后即可显示</p>
          </div>
        )}
      </div>
    </section>
  )
}

/* ── CTA Section ── */

function CTASection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-ice-white mb-4">
          准备好点燃你的下一个灵感了吗？
        </h2>
        <p className="text-fog mb-8">
          加入 1000+ 独立开发者，用 AI 发现下一个爆款创意
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link href="/register">
            <Button variant="primary" size="lg">
              免费开始 SparkForge
            </Button>
          </Link>
          <span className="text-sm text-fog">无需信用卡 · 5 分钟上手</span>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ── */

function Footer() {
  return (
    <footer className="px-4 py-8 border-t border-border-line">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-spark-blue" />
            <span className="font-bold text-ice-white">SparkForge</span>
            <span className="text-sm text-fog">© 2026</span>
          </div>
          <span className="text-xs text-fog">Hosted on Cloudflare · Vercel</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-fog">
          <Link href="/privacy" className="hover:text-spark-blue transition-colors">
            隐私政策
          </Link>
          <Link href="/terms" className="hover:text-spark-blue transition-colors">
            服务条款
          </Link>
          <Link href="/about" className="hover:text-spark-blue transition-colors">
            关于我们
          </Link>
          <a
            href="https://github.com/QJWSTAR/sparkforge/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-spark-blue transition-colors"
          >
            联系我们
          </a>
        </div>
      </div>
    </footer>
  )
}

/* ── Page ── */

export default function Home() {
  return (
    <main className="min-h-screen bg-deep-space relative">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(600px at 50% 30%, rgba(77,168,255,0.04), transparent)',
        }}
      />

      <div className="relative z-10">
        <Hero />
        <TrustSignals />
        <CoreFeatures />
        <SignalPreview />
        <CTASection />
        <Footer />
      </div>
    </main>
  )
}