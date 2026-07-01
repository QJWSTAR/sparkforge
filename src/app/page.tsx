import Link from 'next/link'
import { sourceLabels } from '@/data/mockSignals'
import type { Signal } from '@/types/signal'
import { getSupabaseAdmin } from '@/lib/supabase'

async function getSignals(): Promise<Signal[]> {
  const supabaseAdmin = getSupabaseAdmin()
  if (!supabaseAdmin) {
    return []
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('Signal')
      .select('*')
      .order('finalScore', { ascending: false, nullsFirst: false })
      .limit(3)

    if (error) {
      console.error('Failed to fetch signals:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Failed to fetch signals:', error)
    return []
  }
}

export default async function Home() {
  const signals = await getSignals()

  return (
    <main className="min-h-screen">
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              backgroundColor: 'var(--color-primary-muted)',
              color: 'var(--color-primary)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--color-primary)' }}
            ></span>
            全网创意信号实时监控
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span
              className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--state-warning)] to-[var(--color-primary)] bg-clip-text text-transparent"
            >
              创意信号雷达
            </span>
            <br />
            <span style={{ color: 'var(--color-text)' }}>+</span>
            <br />
            <span style={{ color: 'var(--color-text)' }}>TRAE 自动化落地工坊</span>
          </h1>
          <p
            className="text-xl max-w-2xl mx-auto mb-10"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            从创意发现到 MVP 交付，一站式完成。7×24 小时抓取全网优质信号，
            AI 评估商业可行性，30 秒生成可运行产品。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/radar"
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text-inverse)',
                boxShadow: '0 10px 30px var(--color-primary-muted)',
              }}
            >
              立即体验 Demo
            </Link>
            <a
              href="https://github.com/QJWSTAR/sparkforge"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl font-medium transition-colors"
              style={{
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              查看 GitHub
            </a>
          </div>
        </div>
      </section>

      <section
        className="py-16 px-4 border-y"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: 'var(--color-primary)' }}
              >
                9+
              </div>
              <div style={{ color: 'var(--color-text-secondary)' }}>信号源</div>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: 'var(--state-warning)' }}
              >
                200+
              </div>
              <div style={{ color: 'var(--color-text-secondary)' }}>每日新信号</div>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: 'var(--state-info)' }}
              >
                30s
              </div>
              <div style={{ color: 'var(--color-text-secondary)' }}>MVP 生成</div>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: 'var(--color-dim-novelty)' }}
              >
                70%
              </div>
              <div style={{ color: 'var(--color-text-secondary)' }}>Top 10 入选率</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ color: 'var(--color-text)' }}
          >
            核心功能
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className="rounded-2xl p-6 transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: 'var(--color-primary-muted)' }}
              >
                <span className="text-2xl">📡</span>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                创意雷达
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                7×24 小时抓取 Product Hunt、Hacker News 等 9 个信号源，
                AI 自动评分排序，发现下一个爆款创意。
              </p>
            </div>

            <div
              className="rounded-2xl p-6 transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: 'rgba(251, 191, 36, 0.12)' }}
              >
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                复刻工坊
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                一键调用 TRAE IDE 生成可运行 MVP。
                配置复刻语言、改造点、自定义 Prompt，30 秒出结果。
              </p>
            </div>

            <div
              className="rounded-2xl p-6 transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.12)' }}
              >
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                商业画布
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                基于信号生成完整商业画布。一句话定位、用户画像、
                竞品图谱、30 天行动清单，一键导出 Notion。
              </p>
            </div>

            <div
              className="rounded-2xl p-6 transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: 'rgba(139, 92, 246, 0.12)' }}
              >
                <span className="text-2xl">📺</span>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                公开日志
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Build in Public 实时流。记录从信号发现到商业变现的全过程，
                自动生成 Twitter 推文草稿。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
              实时信号
            </h2>
            <Link
              href="/radar"
              style={{ color: 'var(--color-primary)' }}
              className="hover:underline"
            >
              查看全部 →
            </Link>
          </div>

          {signals.length > 0 ? (
            <div className="grid gap-4">
              {signals.map((signal, index) => (
                <div
                  key={signal.id}
                  className="rounded-xl p-4 transition-colors"
                  style={{
                    backgroundColor: 'var(--color-bg-surface)',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="text-sm font-bold px-3 py-1 rounded"
                      style={{
                        backgroundColor:
                          index === 0
                            ? 'var(--color-primary)'
                            : index === 1
                              ? 'var(--state-warning)'
                              : 'var(--state-info)',
                        color:
                          index === 1 ? 'var(--color-text-inverse)' : 'var(--color-text-inverse)',
                      }}
                    >
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
                          {signal.title}
                        </h3>
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{
                            backgroundColor:
                              signal.source === 'producthunt'
                                ? 'var(--color-primary-muted)'
                                : signal.source === 'hackernews'
                                  ? 'rgba(59, 130, 246, 0.12)'
                                  : 'var(--color-bg-hover)',
                            color:
                              signal.source === 'producthunt'
                                ? 'var(--color-primary)'
                                : signal.source === 'hackernews'
                                  ? 'var(--state-info)'
                                  : 'var(--color-text-secondary)',
                          }}
                        >
                          {sourceLabels[signal.source] || signal.source}
                        </span>
                      </div>
                      <p
                        className="text-sm mb-3 line-clamp-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {signal.description || '无描述'}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span style={{ color: 'var(--color-text-muted)' }}>热度</span>
                          <div
                            className="flex-1 h-2 rounded-full overflow-hidden"
                            style={{ backgroundColor: 'var(--color-bg-active)' }}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${signal.hotScore || 0}%`,
                                backgroundColor: 'var(--color-dim-hot)',
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span style={{ color: 'var(--color-text-muted)' }}>商业</span>
                          <div
                            className="flex-1 h-2 rounded-full overflow-hidden"
                            style={{ backgroundColor: 'var(--color-bg-active)' }}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${signal.businessScore || 0}%`,
                                backgroundColor: 'var(--color-dim-business)',
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span style={{ color: 'var(--color-text-muted)' }}>创新</span>
                          <div
                            className="flex-1 h-2 rounded-full overflow-hidden"
                            style={{ backgroundColor: 'var(--color-bg-active)' }}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${signal.noveltyScore || 0}%`,
                                backgroundColor: 'var(--color-dim-novelty)',
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span style={{ color: 'var(--color-text-muted)' }}>本地化</span>
                          <div
                            className="flex-1 h-2 rounded-full overflow-hidden"
                            style={{ backgroundColor: 'var(--color-bg-active)' }}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${signal.localScore || 0}%`,
                                backgroundColor: 'var(--color-dim-local)',
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/radar/${signal.id}`}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      style={{
                        backgroundColor: 'var(--color-bg-hover)',
                        color: 'var(--color-text)',
                      }}
                    >
                      详情 →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="text-center py-12"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <p>暂无信号数据</p>
              <p className="text-sm mt-2">调用 /api/crawl 抓取信号后即可显示</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: 'var(--color-text)' }}
          >
            准备好开始了吗？
          </h2>
          <p
            className="mb-10 max-w-xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            加入 1000+ 独立开发者，用 AI 发现下一个爆款创意
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/radar"
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(90deg, var(--color-primary), var(--state-warning))',
                color: 'var(--color-text-inverse)',
              }}
            >
              免费开始使用
            </Link>
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              无需信用卡 • 5 分钟上手
            </div>
          </div>
        </div>
      </section>

      <footer
        className="py-8 px-4 border-t"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-sm font-bold"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-primary), var(--state-warning))',
                color: 'var(--color-text-inverse)',
              }}
            >
              S
            </div>
            <span className="font-bold" style={{ color: 'var(--color-text)' }}>
              SparkForge
            </span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              © 2026
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            <a href="#" className="hover:text-white transition-colors">
              隐私政策
            </a>
            <a href="#" className="hover:text-white transition-colors">
              服务条款
            </a>
            <a href="#" className="hover:text-white transition-colors">
              联系我们
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}