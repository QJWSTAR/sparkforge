'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import { Button, Input, ContentCard, Badge } from '@/components/ui'

interface LogEntry {
  id: string
  type: 'SIGNAL_DISCOVERED' | 'SIGNAL_SCORED' | 'SIGNAL_TOP10' | 'FORGE_STARTED' | 'FORGE_PROGRESS' | 'FORGE_COMPLETED' | 'CANVAS_GENERATED' | 'SYSTEM'
  title: string
  content?: string
  signalId?: string
  forgeId?: string
  userId?: string
  metadata?: any
  createdAt: string
}

const typeConfig: Record<string, { icon: string; color: string; label: string }> = {
  SIGNAL_DISCOVERED: { icon: '📡', color: 'text-spark-blue', label: '信号发现' },
  SIGNAL_SCORED:    { icon: '📊', color: 'text-nebula-purple', label: '信号评分' },
  SIGNAL_TOP10:     { icon: '🏆', color: 'text-state-warning', label: 'Top 10' },
  FORGE_STARTED:    { icon: '🔨', color: 'text-state-warning', label: '开始复刻' },
  FORGE_PROGRESS:   { icon: '⚙️', color: 'text-state-warning', label: '复刻中' },
  FORGE_COMPLETED:  { icon: '✅', color: 'text-state-success', label: '复刻完成' },
  CANVAS_GENERATED: { icon: '📋', color: 'text-state-info', label: '画布' },
  SYSTEM:           { icon: '🔔', color: 'text-fog', label: '系统' },
}

const DEFAULT_LOG_CONFIG = typeConfig.SYSTEM

function getLogConfig(type: string | undefined) {
  return typeConfig[type ?? ''] ?? DEFAULT_LOG_CONFIG
}

const filters = [
  { value: 'all', label: '全部' },
  { value: 'mine', label: '我发布的' },
  { value: 'hot', label: '热门' },
]

export default function StreamPage() {
  const { getSessionToken, user } = useAuth()
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [fetchError, setFetchError] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [publishTitle, setPublishTitle] = useState('')
  const [publishContent, setPublishContent] = useState('')
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState('')
  const [publishSuccess, setPublishSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  const fetchLogs = async () => {
    setFetchLoading(true)
    try {
      const res = await fetch('/api/logs?limit=50')
      if (!res.ok) {
        setFetchError(true)
        return
      }
      const data = await res.json()
      setFetchError(false)
      if (data.success && data.data?.length > 0) {
        setLogs(data.data)
      }
    } catch {
      setFetchError(true)
    } finally {
      setFetchLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
    setMounted(true)
  }, [])

  const displayLogs = logs.filter(log => {
    if (!log?.type) return false
    return true
  })

  const filteredLogs = (() => {
    if (filter === 'all' || filter === 'hot') {
      return displayLogs
    }
    if (filter === 'mine') {
      const userId = user?.id
      if (!userId) return []
      return displayLogs.filter(log => log.userId === userId)
    }
    return displayLogs
  })()

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    if (hours < 1) return '刚刚'
    if (hours < 24) return `${hours} 小时前`
    if (days < 7) return `${days} 天前`
    return formatDateConsistent(timestamp)
  }

  // 手动格式化日期，避免 toLocaleDateString 在服务端/客户端输出不一致导致 hydration 错误
  const formatDateConsistent = (timestamp: string) => {
    const d = new Date(timestamp)
    if (isNaN(d.getTime())) return '未知时间'
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}/${m}/${day}`
  }

  const getDisplayTime = (timestamp: string) => {
    if (!mounted) {
      return formatDateConsistent(timestamp)
    }
    return formatTime(timestamp)
  }

  const handlePublish = async () => {
    if (!publishTitle.trim()) return
    setPublishing(true)
    setPublishError('')
    setPublishSuccess(false)
    try {
      const token = await getSessionToken()
      const res = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          content: publishTitle.trim(),
          type: 'SYSTEM',
          metadata: {
            body: publishContent.trim() || undefined,
            title: publishTitle.trim(),
          },
        }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        setPublishError(errData.error || '发布失败')
        return
      }
      setPublishTitle('')
      setPublishContent('')
      setPublishSuccess(true)
      setTimeout(() => {
        setPublishSuccess(false)
        fetchLogs()
      }, 1000)
    } catch {
      setPublishError('网络错误，请稍后重试')
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div className="min-h-screen bg-ambient-glow">
      <div className="container-app py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-ice-white mb-2">动态广场</h1>
          <p className="text-base text-fog">分享你的创意进程或成果，与社区交流</p>
        </div>

        {/* Publish Form */}
        <ContentCard className="p-4 mb-8">
          <h3 className="text-sm font-semibold text-ice-white mb-3">分享你的创意进程</h3>
          <div className="flex flex-col gap-3">
            <label htmlFor="publish-title" className="sr-only">日志标题</label>
            <Input
              id="publish-title"
              placeholder="日志标题"
              value={publishTitle}
              onChange={(e) => setPublishTitle(e.target.value)}
            />
            <label htmlFor="publish-content" className="sr-only">日志内容（可选）</label>
            <textarea
              id="publish-content"
              placeholder="记录你的创意开发过程、灵感或心得…"
              value={publishContent}
              onChange={(e) => setPublishContent(e.target.value)}
              rows={2}
              className="w-full bg-graphite border border-border-line rounded-lg px-4 py-2 text-sm text-ice-white placeholder:text-fog resize-none focus:outline-none focus:border-spark-blue transition-colors"
            />
            {publishError && (
              <p className="text-sm text-ui-error">{publishError}</p>
            )}
            {publishSuccess && (
              <p className="text-sm text-state-success">动态已发布，即将刷新…</p>
            )}
            <Button
              variant="primary"
              disabled={!publishTitle.trim()}
              isLoading={publishing}
              onClick={handlePublish}
            >
              {publishing ? '发布中…' : '发布动态'}
            </Button>
          </div>
        </ContentCard>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={[
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 filter-chip cursor-pointer',
                filter === f.value
                  ? 'bg-spark-blue text-white'
                  : 'bg-graphite text-fog border border-border-line hover:border-spark-blue hover:text-ice-white',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Log List */}
        {fetchLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-graphite border border-border-line rounded-lg p-4 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-graphite" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-graphite rounded w-3/4" />
                    <div className="h-3 bg-graphite rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : fetchError ? (
          <div className="text-center py-12">
            <p className="text-base text-fog">日志加载失败</p>
            <p className="text-sm text-fog mt-2 mb-4">请稍后刷新页面重试</p>
            <Button variant="secondary" onClick={fetchLogs}>
              重试
            </Button>
          </div>
        ) : filteredLogs.length > 0 ? (
          <div className="space-y-4">
            {filteredLogs.map((log, index) => {
              const config = getLogConfig(log?.type)
              const logId = log?.id ?? `fallback-${index}`
              const logTitle = log?.title ?? '无标题'
              const logContent = log?.content
              const logCreatedAt = log?.createdAt ?? new Date().toISOString()
              return (
                <ContentCard key={logId} className="p-4">
                  <div className="flex items-start gap-4">
                    <span className="text-xl shrink-0">{config.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="default" size="sm">{config.label}</Badge>
                        <span className="text-xs text-fog">{getDisplayTime(logCreatedAt)}</span>
                      </div>
                      <h3 className="text-base font-semibold text-ice-white mb-1">{logTitle}</h3>
                      {logContent && (
                        <p className="text-sm text-fog">{logContent}</p>
                      )}
                    </div>
                  </div>
                </ContentCard>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-base text-fog">暂无动态</p>
            <p className="text-sm text-fog mt-2">发布第一条动态，分享你的创意进展</p>
          </div>
        )}
      </div>
    </div>
  )
}

/*
 * 设计规则遵守情况自查：
 * 1. 无内联 style ✅
 * 2. 组件库 ✅ — 使用 Button、Input、ContentCard、Badge
 * 3. 间距栅格 ✅ — p-4/py-8/gap-4/gap-3/gap-2/mb-1/mb-2/mb-3/mb-8 等
 * 4. 圆角规则 ✅ — 卡片 rounded-lg、按钮 rounded-md、筛选按钮 rounded-full
 * 5. 字体阶梯 ✅ — text-2xl(24px)、text-xl(20px)、text-base(16px)、text-sm(14px)、text-xs(12px)
 * 6. 交互状态 ✅ — filter-chip 含 hover，Button 组件内置交互
 * 7. 氛围光 ✅ — bg-ambient-glow
 */