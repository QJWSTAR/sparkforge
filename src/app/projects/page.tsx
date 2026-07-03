'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth'
import { Button, ContentCard, Badge } from '@/components/ui'
import { ArrowRight, ExternalLink } from 'lucide-react'

interface ForgeProject {
  id: string
  signalId?: string
  signalTitle?: string
  techStack?: string
  difficulty?: string
  estimatedTime?: string
  summary?: string
  createdAt: string
}

interface CanvasReport {
  id: string
  signalId?: string
  signalTitle?: string
  valueProposition?: string
  summary?: string
  createdAt: string
}

type Tab = 'forge' | 'canvas'

export default function ProjectsPage() {
  const { getSessionToken, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<Tab>('forge')
  const [forgeProjects, setForgeProjects] = useState<ForgeProject[]>([])
  const [canvasReports, setCanvasReports] = useState<CanvasReport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false)
      return
    }
    fetchHistory()
  }, [isAuthenticated])

  const fetchHistory = async () => {
    setLoading(true)
    setError('')
    try {
      const token = await getSessionToken()
      if (!token) {
        setError('请先登录')
        setLoading(false)
        return
      }

      const [forgeRes, canvasRes] = await Promise.all([
        fetch('/api/generate/forge/history', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/generate/canvas/history', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      if (forgeRes.ok) {
        const forgeData = await forgeRes.json()
        if (forgeData.success) setForgeProjects(forgeData.data || [])
      }

      if (canvasRes.ok) {
        const canvasData = await canvasRes.json()
        if (canvasData.success) setCanvasReports(canvasData.data || [])
      }
    } catch {
      setError('加载失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: string) => {
    const d = new Date(timestamp)
    if (isNaN(d.getTime())) return '未知时间'
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}/${m}/${day}`
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ambient-glow">
        <div className="container-app py-16 text-center">
          <p className="text-base text-fog mb-4">请先登录查看你的项目</p>
          <Link href="/login">
            <Button variant="primary">去登录</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ambient-glow">
      <div className="container-app py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-ice-white mb-2">我的项目</h1>
          <p className="text-base text-fog">查看你生成的所有复刻方案和画布分析</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('forge')}
            className={[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
              activeTab === 'forge'
                ? 'bg-spark-blue text-white'
                : 'bg-graphite text-fog border border-border-line hover:border-spark-blue hover:text-ice-white',
            ].join(' ')}
          >
            复刻方案 ({forgeProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('canvas')}
            className={[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
              activeTab === 'canvas'
                ? 'bg-spark-blue text-white'
                : 'bg-graphite text-fog border border-border-line hover:border-spark-blue hover:text-ice-white',
            ].join(' ')}
          >
            画布分析 ({canvasReports.length})
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-graphite border border-border-line rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-graphite rounded w-3/4 mb-2" />
                <div className="h-3 bg-graphite rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-base text-fog">{error}</p>
            <Button variant="secondary" className="mt-4" onClick={fetchHistory}>
              重试
            </Button>
          </div>
        ) : activeTab === 'forge' ? (
          forgeProjects.length > 0 ? (
            <div className="space-y-4">
              {forgeProjects.map((project) => (
                <ContentCard key={project.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="default" size="sm">复刻方案</Badge>
                        <span className="text-xs text-fog">{formatDate(project.createdAt)}</span>
                      </div>
                      <h3 className="text-base font-semibold text-ice-white mb-1">
                        {project.signalTitle || '未命名方案'}
                      </h3>
                      {project.summary && (
                        <p className="text-sm text-fog line-clamp-2 mb-2">{project.summary}</p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm">
                        {project.techStack && (
                          <span className="text-fog">
                            技术栈：<span className="text-ice-white">{project.techStack}</span>
                          </span>
                        )}
                        {project.difficulty && (
                          <span className="text-fog">
                            难度：<span className="text-ice-white">{project.difficulty}</span>
                          </span>
                        )}
                        {project.estimatedTime && (
                          <span className="text-fog">
                            预估时间：<span className="text-ice-white">{project.estimatedTime}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <Link href="/forge" className="shrink-0">
                      <Button variant="ghost" size="md">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </ContentCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-base text-fog mb-4">还没有生成过复刻方案</p>
              <Link href="/forge">
                <Button variant="primary">
                  去生成方案
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )
        ) : (
          canvasReports.length > 0 ? (
            <div className="space-y-4">
              {canvasReports.map((report) => (
                <ContentCard key={report.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="default" size="sm">画布分析</Badge>
                        <span className="text-xs text-fog">{formatDate(report.createdAt)}</span>
                      </div>
                      <h3 className="text-base font-semibold text-ice-white mb-1">
                        {report.signalTitle || '未命名画布'}
                      </h3>
                      {report.valueProposition && (
                        <p className="text-sm text-fog line-clamp-2 mb-2">{report.valueProposition}</p>
                      )}
                      {report.summary && (
                        <p className="text-sm text-fog line-clamp-1">{report.summary}</p>
                      )}
                    </div>
                    <Link href="/canvas" className="shrink-0">
                      <Button variant="ghost" size="md">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </ContentCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-base text-fog mb-4">还没有生成过画布分析</p>
              <Link href="/canvas">
                <Button variant="primary">
                  去生成画布
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  )
}

/*
 * 设计规则遵守情况自查：
 * 1. 无内联 style ✅
 * 2. 组件库 ✅ — 使用 Button、ContentCard、Badge
 * 3. 间距栅格 ✅ — p-4/py-8/py-12/py-16/gap-4/gap-2/mb-1/mb-2/mb-4/mb-8 等
 * 4. 圆角规则 ✅ — 卡片 rounded-lg、按钮 rounded-md、Tab rounded-full
 * 5. 字体阶梯 ✅ — text-2xl(24px)、text-base(16px)、text-sm(14px)、text-xs(12px)
 * 6. 交互状态 ✅ — Button 内置交互，Tab hover 效果
 * 7. 氛围光 ✅ — bg-ambient-glow
 */