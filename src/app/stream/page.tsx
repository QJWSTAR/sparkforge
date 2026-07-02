'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'

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

export default function StreamPage() {
  const { getSessionToken } = useAuth()
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [fetchError, setFetchError] = useState(false)
  const [publishTitle, setPublishTitle] = useState('')
  const [publishContent, setPublishContent] = useState('')
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState('')

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs?limit=50')
      if (!res.ok) {
        console.error('Failed to fetch logs:', res.status)
        setFetchError(true)
        return
      }
      const data = await res.json()
      setFetchError(false)
      if (data.success && data.data?.length > 0) {
        setLogs(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error)
      setFetchError(true)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const mockLogs: LogEntry[] = [
    {
      id: '1',
      createdAt: '2026-06-30T10:30:00Z',
      type: 'SIGNAL_DISCOVERED',
      title: '发现新信号：AI 代码审查工具',
      content: '来自 Product Hunt，热度 92，综合评分 85',
      metadata: { score: 85, signalId: 'sig-001' },
    },
    {
      id: '2',
      createdAt: '2026-06-30T09:15:00Z',
      type: 'FORGE_COMPLETED',
      title: '复刻完成：AI Code Review MVP',
      content: '基于信号 sig-001 生成，本地化改造度 88%',
      metadata: { action: 'generated' },
    },
    {
      id: '3',
      createdAt: '2026-06-30T08:45:00Z',
      type: 'CANVAS_GENERATED',
      title: '商业画布已生成',
      content: '完成 SWOT 分析和 30 天行动清单',
      metadata: { action: 'canvas_generated' },
    },
    {
      id: '4',
      createdAt: '2026-06-30T08:00:00Z',
      type: 'SYSTEM',
      title: '推文草稿已生成',
      content: '"Just launched my AI code review tool! 🚀 #buildinpublic"',
      metadata: { action: 'tweet_generated' },
    },
    {
      id: '5',
      createdAt: '2026-06-29T22:00:00Z',
      type: 'SIGNAL_DISCOVERED',
      title: '发现新信号：AI 视频生成',
      content: '来自 Hacker News，热度 120，综合评分 78',
      metadata: { score: 78, signalId: 'sig-002' },
    },
    {
      id: '6',
      createdAt: '2026-06-29T20:30:00Z',
      type: 'SYSTEM',
      title: '部署成功：AI Code Review Demo',
      content: '已部署到 Vercel，访问地址：xxx.vercel.app',
      metadata: { action: 'deployed' },
    },
    {
      id: '7',
      createdAt: '2026-06-29T19:00:00Z',
      type: 'FORGE_COMPLETED',
      title: '复刻失败：资源不足',
      content: '当前队列繁忙，请稍后重试',
      metadata: { action: 'failed' },
    },
    {
      id: '8',
      createdAt: '2026-06-29T18:00:00Z',
      type: 'SIGNAL_DISCOVERED',
      title: '发现新信号：AI 写作助手',
      content: '来自 Product Hunt，热度 85，综合评分 82',
      metadata: { score: 82, signalId: 'sig-003' },
    },
  ]

  const displayLogs = fetchError ? mockLogs : logs

  const filteredLogs = filter === 'all' 
    ? displayLogs 
    : displayLogs.filter(log => log.type.startsWith(filter))

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return '刚刚'
    if (hours < 24) return `${hours} 小时前`
    if (days < 7) return `${days} 天前`
    return date.toLocaleDateString('zh-CN')
  }

  const handlePublish = async () => {
    if (!publishTitle.trim()) return
    setPublishing(true)
    setPublishError('')
    try {
      const token = await getSessionToken()
      const res = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: publishTitle.trim(),
          content: publishContent.trim() || undefined,
        }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        setPublishError(errData.error || '发布失败')
        return
      }
      setPublishTitle('')
      setPublishContent('')
      // 刷新日志列表
      fetchLogs()
    } catch (err) {
      setPublishError('网络错误，请稍后重试')
    } finally {
      setPublishing(false)
    }
  }

  const typeConfig: Record<LogEntry['type'], { icon: string; color: string; label: string }> = {
    SIGNAL_DISCOVERED: { icon: '📡', color: 'var(--color-primary)', label: '信号发现' },
    SIGNAL_SCORED:    { icon: '📊', color: '#7B61FF', label: '信号评分' },
    SIGNAL_TOP10:     { icon: '🏆', color: '#FFB800', label: 'Top 10' },
    FORGE_STARTED:    { icon: '🔨', color: 'var(--state-warning)', label: '开始复刻' },
    FORGE_PROGRESS:   { icon: '⚙️', color: 'var(--state-warning)', label: '复刻中' },
    FORGE_COMPLETED:  { icon: '✅', color: 'var(--state-success)', label: '复刻完成' },
    CANVAS_GENERATED: { icon: '📋', color: 'var(--state-info)', label: '画布' },
    SYSTEM:           { icon: '🔔', color: '#A0A0A0', label: '系统' },
  }

  const filters = [
    { value: 'all', label: '全部' },
    { value: 'SIGNAL', label: '信号' },
    { value: 'FORGE', label: '复刻' },
    { value: 'CANVAS', label: '画布' },
    { value: 'SYSTEM', label: '系统' },
  ]

  return (
    <div className="min-h-screen">
      <main className="container-app py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            公开日志
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Build in Public 实时流，记录从信号发现到商业变现的全过程
          </p>
        </div>

        {/* 发布日志表单 */}
        <div className="mb-8 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
          <h3 className="font-semibold mb-3" style={{ color: 'var(--color-text)' }}>发布日志</h3>
          <div className="flex flex-col gap-3">
            <label htmlFor="publish-title" className="sr-only">日志标题</label>
            <input
              id="publish-title"
              type="text"
              placeholder="日志标题"
              value={publishTitle}
              onChange={(e) => setPublishTitle(e.target.value)}
              className="px-4 py-2 rounded-lg text-sm border"
              style={{
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                borderColor: 'var(--color-border)',
              }}
            />
            <label htmlFor="publish-content" className="sr-only">日志内容</label>
            <textarea
              id="publish-content"
              value={publishContent}
              onChange={(e) => setPublishContent(e.target.value)}
              rows={2}
              className="px-4 py-2 rounded-lg text-sm border resize-none"
              style={{
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                borderColor: 'var(--color-border)',
              }}
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handlePublish}
                disabled={publishing || !publishTitle.trim()}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  backgroundColor: publishing || !publishTitle.trim() ? 'var(--color-text-muted)' : 'var(--color-primary)',
                  color: '#fff',
                  cursor: publishing || !publishTitle.trim() ? 'not-allowed' : 'pointer',
                }}
              >
                {publishing ? '发布中...' : '发布'}
              </button>
              {publishError && (
                <span className="text-sm" style={{ color: 'var(--state-error)' }}>{publishError}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
              style={{
                backgroundColor:
                  filter === f.value
                    ? 'var(--color-primary)'
                    : 'var(--color-bg-surface)',
                color:
                  filter === f.value
                    ? 'var(--color-text-inverse)'
                    : 'var(--color-text-secondary)',
                border: filter === f.value ? 'none' : '1px solid var(--color-border)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="rounded-xl p-4 transition-colors hover:bg-bg-hover"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: `${typeConfig[log.type].color}15` }}
                >
                  {typeConfig[log.type].icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>
                      {log.title}
                    </h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${typeConfig[log.type].color}20`,
                        color: typeConfig[log.type].color,
                      }}
                    >
                      {typeConfig[log.type].label}
                    </span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    {log.content}
                  </p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    <span>{formatTime(log.createdAt)}</span>
                    {log.metadata?.score && (
                      <span>评分: {log.metadata.score}</span>
                    )}
                  </div>
                </div>
                <button
                  className="text-sm px-3 py-1.5 rounded-lg transition-colors"
                  style={{
                    backgroundColor: 'var(--color-bg-hover)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  查看详情
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div
            className="text-center py-16"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <div className="text-4xl mb-4">📭</div>
            <p>暂无日志</p>
            <p className="text-sm mt-2">开始使用 SparkForge 后，日志将在这里显示</p>
          </div>
        )}

        <div className="mt-8">
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: 'var(--color-primary-muted)',
              border: '1px solid rgba(255, 107, 53, 0.2)',
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: 'rgba(255, 107, 53, 0.15)' }}
              >
                🐦
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                  自动生成 Twitter 推文
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  每次信号发现、复刻完成或部署成功，自动生成推文草稿，一键发布
                </p>
              </div>
              <button
                disabled
                title="功能即将上线"
                className="px-4 py-2 rounded-lg font-medium"
                style={{
                  backgroundColor: 'var(--color-text-muted)',
                  color: 'var(--color-text-inverse)',
                  cursor: 'not-allowed',
                  opacity: 0.6,
                }}
              >
                连接 Twitter
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}