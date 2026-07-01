'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { mockSignals } from '@/data/mockSignals'
import { SkeletonCanvas } from '@/components/Skeleton'
import type { Signal } from '@/types/signal'

interface CanvasData {
  valueProposition: string
  customerSegments: string[]
  revenueStreams: string[]
  keyPartners: string[]
  keyActivities: string[]
  keyResources: string[]
  channels: string[]
  customerRelationships: string[]
  costStructure: string[]
  competitiveAnalysis: Array<{
    competitor: string
    strengths: string
    weaknesses: string
    opportunity: string
  }>
  swot: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
  actionPlan: string[]
  summary: string
}

export default function CanvasPage() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [selectedSignal, setSelectedSignal] = useState<Signal>(mockSignals[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [canvasData, setCanvasData] = useState<CanvasData | null>(null)

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

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate/canvas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signalTitle: selectedSignal.title,
          signalDescription: selectedSignal.description,
        }),
      })

      const result = await response.json()
      if (result.success && result.data) {
        setCanvasData(result.data)
      } else {
        setCanvasData(result.data || null)
      }
    } catch (error) {
      console.error('Canvas generation failed:', error)
      setCanvasData({
        valueProposition: selectedSignal.title,
        customerSegments: ['目标用户群体'],
        revenueStreams: ['订阅收入'],
        keyPartners: [],
        keyActivities: ['产品开发', '市场营销'],
        keyResources: ['技术团队', '资金'],
        channels: ['社交媒体', '内容营销'],
        customerRelationships: ['社区运营'],
        costStructure: ['人力成本', '服务器成本'],
        competitiveAnalysis: [],
        swot: {
          strengths: ['创新的产品理念'],
          weaknesses: ['品牌认知度低'],
          opportunities: ['市场增长潜力大'],
          threats: ['竞争激烈'],
        },
        actionPlan: ['Day 1-7: MVP开发', 'Day 8-14: 用户获取'],
        summary: 'AI 服务暂时不可用，使用默认模板',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const displayData = canvasData || {
    valueProposition: `${selectedSignal.title} 是一个创新产品，帮助用户解决特定问题。`,
    customerSegments: ['中小型开发团队', '独立开发者', '技术爱好者'],
    revenueStreams: ['SaaS 订阅', '团队版', '企业定制'],
    keyPartners: [],
    keyActivities: ['产品开发', '市场营销'],
    keyResources: ['技术团队', '资金'],
    channels: ['社交媒体', '内容营销'],
    customerRelationships: ['社区运营'],
    costStructure: ['人力成本', '服务器成本'],
    competitiveAnalysis: [],
    swot: {
      strengths: ['创新的产品理念'],
      weaknesses: ['品牌认知度低'],
      opportunities: ['市场增长潜力大'],
      threats: ['竞争激烈'],
    },
    actionPlan: ['Day 1-7: MVP开发', 'Day 8-14: 用户获取'],
    summary: '',
  }

  return (
    <div className="min-h-screen">
      <main className="container-app py-8">
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
              className="rounded-2xl p-6 card-hover"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                  📋 商业模型画布
                  {canvasData && (
                    <span
                      className="ml-2 text-xs px-2 py-0.5 rounded"
                      style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: 'var(--state-success)' }}
                    >
                      AI 生成
                    </span>
                  )}
                </h2>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1.5 text-sm transition-colors btn-press"
                    style={{
                      backgroundColor: 'var(--color-bg-hover)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    导出 Notion
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="px-3 py-1.5 text-sm transition-colors btn-press"
                    style={{
                      backgroundColor: 'var(--color-bg-hover)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {isGenerating ? '生成中...' : '重新生成'}
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
                      {displayData.valueProposition}
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
                      {displayData.customerSegments.map((segment, idx) => (
                        <li key={idx}>• {segment}</li>
                      ))}
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
                      {displayData.revenueStreams.map((stream, idx) => (
                        <li key={idx}>• {stream}</li>
                      ))}
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
                      🔥 核心活动
                    </h3>
                    <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                      {displayData.keyActivities.map((activity, idx) => (
                        <li key={idx}>• {activity}</li>
                      ))}
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
                      ⚡ 关键资源
                    </h3>
                    <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                      {displayData.keyResources.map((resource, idx) => (
                        <li key={idx}>• {resource}</li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="rounded-xl p-4 flex-1"
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: 'var(--state-error)' }}>
                      🔗 合作方
                    </h3>
                    <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                      {displayData.keyPartners.length > 0 ? (
                        displayData.keyPartners.map((partner, idx) => (
                          <li key={idx}>• {partner}</li>
                        ))
                      ) : (
                        <li style={{ color: 'var(--color-text-muted)' }}>• 暂无</li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4 flex flex-col">
                  <div
                    className="rounded-xl p-4 flex-1"
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.08)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: 'var(--state-info)' }}>
                      📢 渠道
                    </h3>
                    <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                      {displayData.channels.map((channel, idx) => (
                        <li key={idx}>• {channel}</li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="rounded-xl p-4 flex-1"
                    style={{
                      backgroundColor: 'rgba(236, 72, 153, 0.08)',
                      border: '1px solid rgba(236, 72, 153, 0.2)',
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: '#EC4899' }}>
                      🤝 客户关系
                    </h3>
                    <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                      {displayData.customerRelationships.map((relation, idx) => (
                        <li key={idx}>• {relation}</li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="rounded-xl p-4 flex-1"
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: 'var(--state-error)' }}>
                      💰 成本结构
                    </h3>
                    <ul className="text-sm space-y-1" style={{ color: 'var(--color-text)' }}>
                      {displayData.costStructure.map((cost, idx) => (
                        <li key={idx}>• {cost}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {(displayData.competitiveAnalysis || []).length > 0 && (
              <div
                className="rounded-2xl p-6 card-hover"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                  📊 竞品分析
                </h2>
                <div className="space-y-4">
                  {displayData.competitiveAnalysis.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl p-4"
                      style={{ backgroundColor: 'var(--color-bg-hover)' }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold" style={{ color: 'var(--color-primary)' }}>
                          {item.competitor}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-medium mb-1" style={{ color: 'var(--state-success)' }}>
                            优势
                          </div>
                          <div style={{ color: 'var(--color-text)' }}>{item.strengths}</div>
                        </div>
                        <div>
                          <div className="font-medium mb-1" style={{ color: 'var(--state-warning)' }}>
                            劣势
                          </div>
                          <div style={{ color: 'var(--color-text)' }}>{item.weaknesses}</div>
                        </div>
                        <div>
                          <div className="font-medium mb-1" style={{ color: 'var(--state-info)' }}>
                            机会
                          </div>
                          <div style={{ color: 'var(--color-text)' }}>{item.opportunity}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              className="rounded-2xl p-6 card-hover"
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
                    {displayData.swot.strengths.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
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
                    {displayData.swot.weaknesses.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
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
                    {displayData.swot.opportunities.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
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
                    {displayData.swot.threats.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {(displayData.actionPlan || []).length > 0 && (
              <div
                className="rounded-2xl p-6 card-hover"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                  📅 行动清单
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {displayData.actionPlan.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg p-3 text-sm"
                      style={{ backgroundColor: 'var(--color-bg-hover)' }}
                    >
                      <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
                        阶段 {idx + 1}:
                      </span>
                      <span style={{ color: 'var(--color-text)' }}> {item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              className="w-full py-4 rounded-xl font-bold text-lg transition-all btn-press"
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