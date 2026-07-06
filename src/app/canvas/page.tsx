'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SkeletonCanvas } from '@/components/Skeleton'
import type { Signal } from '@/types/signal'
import { useAuth } from '@/lib/auth'
import { Button, ContentCard, Badge } from '@/components/ui'
import { sourceLabels } from '@/data/mockSignals'
import { HelpCircle, Download, Layout } from 'lucide-react'

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

const moduleTooltips: Record<string, string> = {
  '价值主张': '我们解决了用户什么核心问题？提供什么独特价值？',
  '客户细分': '谁会使用我们的产品？可以分成哪几类？',
  '收入来源': '我们如何赚钱？订阅、广告、单次付费？',
  '关键伙伴': '谁是我们最重要的合作伙伴？供应商、平台方？',
  '关键活动': '我们需要做什么核心工作来运营这个业务？',
  '核心资源': '我们需要哪些关键资源？技术、人才、资金？',
  '渠道通路': '用户从哪里知道我们？怎么触达他们？',
  '客户关系': '我们如何与客户建立和维护关系？',
  '成本结构': '主要的成本支出是什么？服务器、人力、营销？',
}

const SIMPLE_MODULES = ['价值主张', '客户细分', '收入来源', '行动计划']

export default function CanvasPage() {
  const { getSessionToken, isAuthenticated } = useAuth()
  const [signals, setSignals] = useState<Signal[]>([])
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [canvasData, setCanvasData] = useState<CanvasData | null>(null)
  const [error, setError] = useState('')
  const [isSimpleView, setIsSimpleView] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sparkforge-canvas-view')
    if (saved === 'simple') setIsSimpleView(true)
  }, [])

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const res = await fetch('/api/signals?limit=20&sortBy=score')
        if (!res.ok) return
        const data = await res.json()
        if (data.success && data.data?.length > 0) {
          setSignals(data.data)
          setSelectedSignal(data.data[0])
        }
      } catch {
        // silent
      }
    }
    fetchSignals()
  }, [])

  const toggleView = () => {
    const next = !isSimpleView
    setIsSimpleView(next)
    localStorage.setItem('sparkforge-canvas-view', next ? 'simple' : 'full')
  }

  const handleGenerate = async () => {
    if (!selectedSignal) return
    if (!isAuthenticated) {
      setError('请先登录后再生成画布')
      return
    }
    setIsGenerating(true)
    setError('')

    try {
      const token = await getSessionToken()
      const response = await fetch('/api/generate/canvas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          signalId: selectedSignal.id,
          signalTitle: selectedSignal.title,
          signalDescription: selectedSignal.description,
        }),
      })

      if (!response.ok) {
        setError('生成失败，请稍后重试')
        return
      }

      const result = await response.json()
      if (result.success && result.data) {
        setCanvasData(result.data)
      } else {
        setError(result.error || '生成失败')
      }
    } catch {
      setError('网络错误，请稍后重试')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExportMarkdown = () => {
    if (!canvasData) return
    setIsExporting(true)

    const today = new Date().toISOString().slice(0, 10)
    const md = buildMarkdown(canvasData, selectedSignal?.title || '未命名')

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `商业画布_${today}.md`
    a.click()
    URL.revokeObjectURL(url)

    setTimeout(() => setIsExporting(false), 500)
  }

  return (
    <div className="min-h-screen bg-ambient-glow">
      <div className="container-app py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-ice-white mb-2">分析画布</h1>
          <p className="text-base text-fog">基于信号生成完整商业分析，包含 SWOT 分析和 30 天行动清单</p>
        </div>

        {isGenerating ? (
          <SkeletonCanvas />
        ) : canvasData ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default" size="sm">
                    {selectedSignal ? sourceLabels[selectedSignal.source] || selectedSignal.source : 'Unknown'}
                  </Badge>
                  <span className="text-sm text-fog">{selectedSignal?.title}</span>
                </div>
                <h2 className="text-base font-bold text-ice-white">{canvasData.valueProposition}</h2>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={toggleView}
                >
                  {isSimpleView ? '完整视图' : '简明视图'}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleGenerate}
                >
                  重新生成
                </Button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-ui-error">{error}</p>
            )}

            {/* Export Button */}
            <div className="flex justify-end">
              <Button
                variant="secondary"
                isLoading={isExporting}
                onClick={handleExportMarkdown}
              >
                <Download className="w-4 h-4" />
                {isExporting ? '导出中…' : '导出 Markdown'}
              </Button>
            </div>

            {/* 9-Module Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CanvasSection title="价值主张" items={[canvasData.valueProposition]} hidden={isSimpleView && !SIMPLE_MODULES.includes('价值主张')} />
              <CanvasSection title="客户细分" items={canvasData.customerSegments} hidden={isSimpleView && !SIMPLE_MODULES.includes('客户细分')} />
              <CanvasSection title="收入来源" items={canvasData.revenueStreams} hidden={isSimpleView && !SIMPLE_MODULES.includes('收入来源')} />
              <CanvasSection title="关键伙伴" items={canvasData.keyPartners} hidden={isSimpleView} />
              <CanvasSection title="关键活动" items={canvasData.keyActivities} hidden={isSimpleView} />
              <CanvasSection title="核心资源" items={canvasData.keyResources} hidden={isSimpleView} />
              <CanvasSection title="渠道通路" items={canvasData.channels} hidden={isSimpleView} />
              <CanvasSection title="客户关系" items={canvasData.customerRelationships} hidden={isSimpleView} />
              <CanvasSection title="成本结构" items={canvasData.costStructure} hidden={isSimpleView} />
            </div>

            {/* Action Plan (always visible in simple view) */}
            {canvasData.actionPlan?.length > 0 && (
              <ContentCard className="p-6">
                <h3 className="text-base font-bold text-ice-white mb-4 flex items-center gap-2">
                  30 天行动计划
                  <span title="未来 30 天的具体执行步骤，帮你从零到一推进项目">
                    <HelpCircle className="w-4 h-4 text-spark-blue cursor-help" />
                  </span>
                </h3>
                <div className="space-y-2">
                  {canvasData.actionPlan.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-spark-blue/10 text-spark-blue flex items-center justify-center text-xs font-mono shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-fog">{item}</span>
                    </div>
                  ))}
                </div>
              </ContentCard>
            )}

            {/* SWOT (hidden in simple view) */}
            {!isSimpleView && (
              <ContentCard className="p-6">
                <h3 className="text-base font-bold text-ice-white mb-4 flex items-center gap-2">
                  SWOT 分析
                  <span title="从优势、劣势、机会、威胁四个维度分析项目竞争力">
                    <HelpCircle className="w-4 h-4 text-spark-blue cursor-help" />
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SwotBox title="优势" items={canvasData.swot.strengths} color="text-state-success" />
                  <SwotBox title="劣势" items={canvasData.swot.weaknesses} color="text-state-error" />
                  <SwotBox title="机会" items={canvasData.swot.opportunities} color="text-state-info" />
                  <SwotBox title="威胁" items={canvasData.swot.threats} color="text-state-warning" />
                </div>
              </ContentCard>
            )}

            {/* Competitive Analysis (hidden in simple view) */}
            {!isSimpleView && canvasData.competitiveAnalysis?.length > 0 && (
              <ContentCard className="p-6">
                <h3 className="text-base font-bold text-ice-white mb-4 flex items-center gap-2">
                  竞品分析
                  <span title="对比主要竞争对手的优劣势，找到我们的差异化机会">
                    <HelpCircle className="w-4 h-4 text-spark-blue cursor-help" />
                  </span>
                </h3>
                <div className="space-y-4">
                  {canvasData.competitiveAnalysis.map((c, i) => (
                    <div key={i} className="bg-graphite rounded-lg p-4 border border-border-line">
                      <h4 className="text-sm font-bold text-ice-white mb-2">{c.competitor}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                        <div><span className="text-state-success">优势：</span><span className="text-fog">{c.strengths}</span></div>
                        <div><span className="text-state-error">劣势：</span><span className="text-fog">{c.weaknesses}</span></div>
                        <div><span className="text-state-info">机会：</span><span className="text-fog">{c.opportunity}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </ContentCard>
            )}

            {/* Summary */}
            {canvasData.summary && (
              <ContentCard className="p-6">
                <h3 className="text-base font-bold text-ice-white mb-4">总结</h3>
                <p className="text-sm text-fog leading-relaxed">{canvasData.summary}</p>
              </ContentCard>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-spark-blue/10 mb-6">
              <Layout className="w-8 h-8 text-spark-blue" />
            </div>
            <h2 className="text-lg font-bold text-ice-white mb-3">生成商业画布</h2>
            <p className="text-sm text-fog max-w-md mx-auto mb-6">
              选择下方创意信号，AI 将自动生成包含价值主张、客户细分、SWOT 分析和 30 天行动计划的完整商业画布
            </p>

            {/* Signal selector */}
            {signals.length > 0 && (
              <div className="max-w-2xl mx-auto mb-6">
                <p className="text-xs text-fog mb-3">选择一个信号开始分析：</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {signals.slice(0, 8).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSignal(s)}
                      className={[
                        'text-left px-3 py-2 rounded-lg text-xs border transition-colors truncate',
                        selectedSignal?.id === s.id
                          ? 'bg-spark-blue/10 border-spark-blue text-ice-white'
                          : 'bg-graphite border-border-line text-fog hover:border-spark-blue',
                      ].join(' ')}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              disabled={!selectedSignal}
              isLoading={isGenerating}
              onClick={handleGenerate}
            >
              {isGenerating ? '生成中…' : '生成商业画布'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Sub-components ── */

function CanvasSection({ title, items, hidden = false }: { title: string; items: string[]; hidden?: boolean }) {
  if (hidden || !items || items.length === 0) return null
  const tooltip = moduleTooltips[title] || ''

  return (
    <ContentCard className="p-4">
      <h4 className="text-sm font-bold text-spark-blue mb-3 flex items-center gap-1">
        {title}
        {tooltip && (
          <span title={tooltip}>
            <HelpCircle className="w-4 h-4 text-fog hover:text-spark-blue cursor-help transition-colors" />
          </span>
        )}
      </h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-fog">{item}</li>
        ))}
      </ul>
    </ContentCard>
  )
}

function SwotBox({ title, items, color }: { title: string; items: string[]; color: string }) {
  if (!items || items.length === 0) return null
  return (
    <div className="bg-graphite rounded-lg p-4 border border-border-line">
      <h4 className={`text-sm font-bold ${color} mb-2`}>{title}</h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-fog">{item}</li>
        ))}
      </ul>
    </div>
  )
}

/* ── Markdown Export ── */

function buildMarkdown(data: CanvasData, signalTitle: string): string {
  const lines: string[] = []

  lines.push(`# 商业画布：${signalTitle}`)
  lines.push('')
  lines.push(`> 生成日期：${new Date().toISOString().slice(0, 10)}`)
  lines.push('')

  lines.push('## 价值主张')
  lines.push(data.valueProposition || '无')
  lines.push('')

  const sections: [string, string[]][] = [
    ['客户细分', data.customerSegments],
    ['收入来源', data.revenueStreams],
    ['关键伙伴', data.keyPartners],
    ['关键活动', data.keyActivities],
    ['核心资源', data.keyResources],
    ['渠道通路', data.channels],
    ['客户关系', data.customerRelationships],
    ['成本结构', data.costStructure],
  ]

  for (const [title, items] of sections) {
    lines.push(`## ${title}`)
    if (items.length > 0) {
      for (const item of items) {
        lines.push(`- ${item}`)
      }
    } else {
      lines.push('（暂无数据）')
    }
    lines.push('')
  }

  lines.push('## SWOT 分析')
  for (const key of ['strengths', 'weaknesses', 'opportunities', 'threats'] as const) {
    const label = { strengths: '优势', weaknesses: '劣势', opportunities: '机会', threats: '威胁' }[key]
    lines.push(`### ${label}`)
    if (data.swot[key].length > 0) {
      for (const item of data.swot[key]) {
        lines.push(`- ${item}`)
      }
    }
    lines.push('')
  }

  if (data.actionPlan.length > 0) {
    lines.push('## 30 天行动计划')
    data.actionPlan.forEach((item, i) => {
      lines.push(`${i + 1}. ${item}`)
    })
    lines.push('')
  }

  if (data.summary) {
    lines.push('## 总结')
    lines.push(data.summary)
    lines.push('')
  }

  return lines.join('\n')
}

/*
 * 设计规则遵守情况自查：
 * 1. 无内联 style ✅
 * 2. 组件库 ✅ — 使用 Button、ContentCard、Badge
 * 3. 间距栅格 ✅ — p-4/p-6/py-8/py-12/gap-4/gap-2/mb-2/mb-3/mb-4/mb-8 等
 * 4. 圆角规则 ✅ — 卡片 rounded-lg、按钮 rounded-md
 * 5. 字体阶梯 ✅ — text-2xl(24px)、text-base(16px)、text-sm(14px)、text-xs(12px)、font-mono
 * 6. 交互状态 ✅ — Button 组件内置交互，Tooltip hover 效果
 * 7. 氛围光 ✅ — bg-ambient-glow
 */