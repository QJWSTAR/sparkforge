'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { mockSignals, sourceLabels } from '@/data/mockSignals'
import type { Signal } from '@/types/signal'

export default function SignalDetailPage() {
  const params = useParams()
  const signalId = params.id as string

  const [signal, setSignal] = useState<Signal | null>(null)
  const [loading, setLoading] = useState(true)

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
        <div className="animate-spin w-8 h-8 border-2 border-[#FF6B35] border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!signal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-400">信号不存在</p>
          <Link href="/radar" className="text-[#FF6B35] hover:underline mt-4 block">
            返回雷达页面
          </Link>
        </div>
      </div>
    )
  }

  const scoreBreakdown = [
    { name: '新颖度', value: signal.noveltyScore, weight: '30%', color: 'from-blue-500 to-cyan-500' },
    { name: '商业潜力', value: signal.businessScore, weight: '35%', color: 'from-green-500 to-emerald-500' },
    { name: '本地化潜力', value: signal.localScore, weight: '35%', color: 'from-orange-500 to-amber-500' },
  ]

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
        <div className="mb-6">
          <Link href="/radar" className="text-gray-400 hover:text-white flex items-center gap-2 mb-4">
            <span>←</span> 返回雷达
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/10 ${
              signal.status === 'TOP10' ? 'text-[#FF6B35] border border-[#FF6B35]/30' :
              signal.status === 'SCORED' ? 'text-green-400 border border-green-400/30' :
              'text-gray-400'
            }`}>
              {signal.status === 'TOP10' ? '🔥 Top 10' :
               signal.status === 'SCORED' ? '✓ 已评分' :
               signal.status === 'SCREENED' ? '⏳ 待评分' : '🆕 新信号'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-400">
              {sourceLabels[signal.source] || signal.source}
            </span>
            <span className="text-sm text-gray-500">
              更新于 {new Date(signal.fetchedAt).toLocaleDateString('zh-CN')}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{signal.title}</h1>
          
          {signal.description && (
            <p className="text-lg text-gray-300 mb-6 max-w-3xl">{signal.description}</p>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span>📊</span> AI 评分详情
              </h2>

              <div className="flex items-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#FFB800] bg-clip-text text-transparent">
                    {signal.finalScore ?? '-'}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">综合评分</div>
                </div>
                
                <div className="flex-1 space-y-4">
                  {scoreBreakdown.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-300">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{item.value ?? '-'}</span>
                          <span className="text-xs text-gray-500">({item.weight})</span>
                        </div>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                          style={{ width: `${item.value ?? 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {signal.noveltyScore && (
                <div className="border-t border-white/10 pt-4">
                  <h3 className="font-medium mb-2">评分分析</h3>
                  <p className="text-sm text-gray-400">
                    该信号在新颖度方面表现{(signal.noveltyScore || 0) >= 70 ? '优秀' : (signal.noveltyScore || 0) >= 50 ? '良好' : '一般'}，
                    商业潜力{(signal.businessScore || 0) >= 70 ? '优秀' : (signal.businessScore || 0) >= 50 ? '良好' : '一般'}，
                    本土化潜力{(signal.localScore || 0) >= 70 ? '优秀' : (signal.localScore || 0) >= 50 ? '良好' : '一般'}。
                    {((signal.finalScore || 0) >= 70) && '建议重点关注，适合快速落地！'}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>🏷️</span> 标签
              </h2>
              <div className="flex flex-wrap gap-2">
                {signal.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-white/10 text-gray-300 rounded-lg text-sm cursor-pointer hover:bg-white/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span>📈</span> 热度数据
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">热度评分</span>
                    <span className="text-white font-bold">{signal.hotScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">投票数</span>
                    <span className="text-white font-bold">{signal.votesCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">评论数</span>
                    <span className="text-white font-bold">{signal.commentsCount}</span>
                  </div>
                  {signal.author && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">作者</span>
                      <span className="text-white">{signal.author}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span>🔗</span> 相关链接
                </h2>
                <div className="space-y-3">
                  {signal.url && (
                    <a
                      href={signal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#FF6B35] hover:underline"
                    >
                      <span>🌐</span>
                      <span className="truncate">{signal.url}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/forge?signalId=${signal.id}`}
                className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
              >
                <span>⚙️</span> 一键复刻
              </Link>
              <Link
                href={`/canvas?signalId=${signal.id}`}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
              >
                <span>📋</span> 生成商业画布
              </Link>
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
                <span>🔔</span> 订阅信号
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
                <span>📤</span> 分享
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#FF6B35]/10 to-[#FFB800]/10 border border-[#FF6B35]/20 rounded-2xl p-5">
              <h3 className="font-bold mb-4">📣 快速操作</h3>
              <div className="space-y-2">
                <Link
                  href={`/forge?signalId=${signal.id}`}
                  className="block w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-left"
                >
                  <div className="font-medium text-sm">一键复刻</div>
                  <div className="text-xs text-gray-400">用 TRAE IDE 自动生成代码</div>
                </Link>
                <Link
                  href={`/canvas?signalId=${signal.id}`}
                  className="block w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-left"
                >
                  <div className="font-medium text-sm">生成商业画布</div>
                  <div className="text-xs text-gray-400">AI 分析市场和竞争</div>
                </Link>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold mb-4">📊 评分分布</h3>
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#FF6B35"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${(signal.finalScore || 0) * 3.52} 352`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{signal.finalScore ?? '-'}</span>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2 text-sm text-gray-500">综合评分</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold mb-4">💡 类似信号</h3>
              <div className="space-y-2">
                {mockSignals.slice(0, 3).map((s) => (
                  <Link
                    key={s.id}
                    href={`/radar/${s.id}`}
                    className="block p-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <div className="text-sm font-medium truncate">{s.title}</div>
                    <div className="text-xs text-gray-500">评分: {s.finalScore}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}