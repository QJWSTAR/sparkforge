'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { mockSignals } from '@/data/mockSignals'
import type { Signal } from '@/types/signal'

export default function CanvasPage() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [selectedSignal, setSelectedSignal] = useState<Signal>(mockSignals[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState(true)

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const res = await fetch('/api/signals?limit=20&sortBy=score')
        const data = await res.json()

        if (data.success && data.data?.length > 0) {
          setSignals(data.data)
          setSelectedSignal(data.data[0])
        }
      } catch (error) {
        console.error('Failed to fetch signals:', error)
      }
    }

    fetchSignals()
  }, [])

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setGenerated(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            商业画布
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            基于信号生成完整商业画布，一句话定位、用户画像、竞品图谱、行动清单
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                  📋 商业模型画布
                </h2>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1.5 text-sm transition-colors"
                    style={{
                      backgroundColor: 'var(--color-bg-hover)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    导出 Notion
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="px-3 py-1.5 text-sm transition-colors"
                    style={{
                      backgroundColor: 'var(--color-bg-hover)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    重新生成
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                <div className="space-y-4 flex flex-col">
                  <div
                    className="rounded-xl p-4 flex-1"
                    style={{
                      backgroundColor: 'var(--color-primary-muted)',
                      border: '1px solid rgba(255, 107, 53, 0.2)',
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                      🎯 一句话定位
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                      {selectedSignal.title} 是一个{selectedSignal.description || '创新的产品'}，
                      帮助目标用户解决特定问题，提供独特价值。
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-4 flex-1"
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.08)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: 'var(--state-info)' }}>
                      👥 用户画像
                    </h3>
                    <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                      <li>• 中小型开发团队 Tech Lead</li>
                      <li>• 独立开发者 / 自由职业者</li>
                      <li>• 开源项目维护者</li>
                      <li>• 技术教育机构</li>
                    </ul>
                  </div>
                  <div
                    className="rounded-xl p-4 flex-1"
                    style={{
                      backgroundColor: 'rgba(139, 92, 246, 0.08)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: 'var(--color-dim-novelty)' }}>
                      💰 收入来源
                    </h3>
                    <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                      <li>• SaaS 订阅：$19/月/开发者</li>
                      <li>• 团队版：$49/月/开发者</li>
                      <li>• 企业版：定制报价</li>
                      <li>• Open Source 赞助</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4 flex flex-col">
                  <div
                    className="rounded-xl p-4 flex-1"
                    style={{
                      backgroundColor: 'rgba(251, 191, 36, 0.08)',
                      border: '1px solid rgba(251, 191, 36, 0.2)',
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: 'var(--state-warning)' }}>
                      🔥 核心价值
                    </h3>
                    <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                      <li>• 节省 60% 代码审查时间</li>
                      <li>• 提前发现 80% 安全漏洞</li>
                      <li>• 统一团队代码规范</li>
                      <li>• 降低线上 Bug 率</li>
                    </ul>
                  </div>
                  <div
                    className="rounded-xl p-4 flex-1"
                    style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: 'var(--state-success)' }}>
                      ⚡ 核心竞争力
                    </h3>
                    <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                      <li>• 支持多语言：JS/TS/Python/Go/Rust</li>
                      <li>• 自定义审查规则，灵活配置</li>
                      <li>• GitHub/GitLab/Bitbucket 全集成</li>
                      <li>• 本地化部署，数据安全</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4 flex flex-col">
                  <div
                    className="rounded-xl p-4 flex-1"
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: 'var(--state-error)' }}>
                      ⚠️ 竞品图谱
                    </h3>
                    <div className="space-y-2">
                      <div className="text-xs">
                        <div
                          className="flex justify-between"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <span>SonarQube</span>
                          <span>传统静态分析</span>
                        </div>
                        <div
                          className="h-1.5 rounded-full mt-1"
                          style={{ backgroundColor: 'var(--color-bg-active)' }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{ width: '70%', backgroundColor: 'var(--color-text-muted)' }}
                          />
                        </div>
                      </div>
                      <div className="text-xs">
                        <div
                          className="flex justify-between"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <span>CodeGuru</span>
                          <span>AWS 生态</span>
                        </div>
                        <div
                          className="h-1.5 rounded-full mt-1"
                          style={{ backgroundColor: 'var(--color-bg-active)' }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{ width: '55%', backgroundColor: 'var(--color-text-muted)' }}
                          />
                        </div>
                      </div>
                      <div className="text-xs">
                        <div
                          className="flex justify-between"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <span>DeepCode</span>
                          <span>AI 新秀</span>
                        </div>
                        <div
                          className="h-1.5 rounded-full mt-1"
                          style={{ backgroundColor: 'var(--color-bg-active)' }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{ width: '45%', backgroundColor: 'var(--color-text-muted)' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-xl p-4 flex-1"
                    style={{
                      backgroundColor: 'rgba(236, 72, 153, 0.08)',
                      border: '1px solid rgba(236, 72, 153, 0.2)',
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: '#EC4899' }}>
                      📅 30 天行动清单
                    </h3>
                    <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                      <li>• Day 1-7: MVP 开发与内测</li>
                      <li>• Day 8-14: Product Hunt 发布</li>
                      <li>• Day 15-21: 种子用户获取</li>
                      <li>• Day 22-30: 付费转化验证</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                📊 SWOT 分析
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                  }}
                >
                  <h3 className="font-bold mb-2" style={{ color: 'var(--state-success)' }}>
                    💪 优势 (Strengths)
                  </h3>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                    <li>• AI 驱动，准确率高于传统工具</li>
                    <li>• 多语言支持，覆盖面广</li>
                    <li>• 开箱即用，集成简单</li>
                  </ul>
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: 'rgba(251, 191, 36, 0.08)',
                    border: '1px solid rgba(251, 191, 36, 0.2)',
                  }}
                >
                  <h3 className="font-bold mb-2" style={{ color: 'var(--state-warning)' }}>
                    ⚠️ 劣势 (Weaknesses)
                  </h3>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                    <li>• LLM 成本较高</li>
                    <li>• 误报率需要持续优化</li>
                    <li>• 品牌认知度低</li>
                  </ul>
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.08)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                  }}
                >
                  <h3 className="font-bold mb-2" style={{ color: 'var(--state-info)' }}>
                    🚀 机会 (Opportunities)
                  </h3>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                    <li>• AI 代码工具赛道火热</li>
                    <li>• 远程办公增加代码审查需求</li>
                    <li>• 开源社区生态红利</li>
                  </ul>
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                  }}
                >
                  <h3 className="font-bold mb-2" style={{ color: 'var(--state-error)' }}>
                    🔥 威胁 (Threats)
                  </h3>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                    <li>• 大厂可能入局</li>
                    <li>• LLM 价格战风险</li>
                    <li>• 数据安全合规风险</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3 className="font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                🎯 当前信号
              </h3>
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: 'var(--color-bg-hover)' }}
              >
                <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                  {selectedSignal.title}
                </h4>
                <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                  {selectedSignal.description || '暂无描述'}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
                    综合评分 {selectedSignal.finalScore || '-'}
                  </span>
                  <span style={{ color: 'var(--color-text-muted)' }}>|</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>
                    {selectedSignal.source?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-primary), var(--state-warning))',
                color: 'var(--color-text-inverse)',
              }}
            >
              {isGenerating ? '生成中...' : '✨ 生成商业画布'}
            </button>

            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3 className="font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                💡 小贴士
              </h3>
              <ul className="text-sm space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>• 画布基于 AI 生成，仅供参考</li>
                <li>• 建议结合实际市场调研验证</li>
                <li>• 可以导出 Notion 进一步完善</li>
                <li>• 支持多次生成，择优选择</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}