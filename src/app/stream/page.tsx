'use client'

import { useState, useEffect } from 'react'

interface LogEntry {
  id: string
  timestamp: string
  type: 'signal' | 'forge' | 'canvas' | 'deploy' | 'twitter'
  title: string
  description: string
  metadata: {
    score?: number
    signalId?: string
    action?: string
  }
}

export default function StreamPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/logs?limit=50')
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

    fetchLogs()
  }, [])

  const mockLogs: LogEntry[] = [
    {
      id: '1',
      timestamp: '2026-06-30T10:30:00Z',
      type: 'signal',
      title: '发现新信号：AI 代码审查工具',
      description: '来自 Product Hunt，热度 92，综合评分 85',
      metadata: { score: 85, signalId: 'sig-001' },
    },
    {
      id: '2',
      timestamp: '2026-06-30T09:15:00Z',
      type: 'forge',
      title: '复刻完成：AI Code Review MVP',
      description: '基于信号 sig-001 生成，本地化改造度 88%',
      metadata: { action: 'generated' },
    },
    {
      id: '3',
      timestamp: '2026-06-30T08:45:00Z',
      type: 'canvas',
      title: '商业画布已生成',
      description: '完成 SWOT 分析和 30 天行动清单',
      metadata: { action: 'canvas_generated' },
    },
    {
      id: '4',
      timestamp: '2026-06-30T08:00:00Z',
      type: 'twitter',
      title: '推文草稿已生成',
      description: '"Just launched my AI code review tool! 🚀 #buildinpublic"',
      metadata: { action: 'tweet_generated' },
    },
    {
      id: '5',
      timestamp: '2026-06-29T22:00:00Z',
      type: 'signal',
      title: '发现新信号：AI 视频生成',
      description: '来自 Hacker News，热度 120，综合评分 78',
      metadata: { score: 78, signalId: 'sig-002' },
    },
    {
      id: '6',
      timestamp: '2026-06-29T20:30:00Z',
      type: 'deploy',
      title: '部署成功：AI Code Review Demo',
      description: '已部署到 Vercel，访问地址：xxx.vercel.app',
      metadata: { action: 'deployed' },
    },
    {
      id: '7',
      timestamp: '2026-06-29T19:00:00Z',
      type: 'forge',
      title: '复刻失败：资源不足',
      description: '当前队列繁忙，请稍后重试',
      metadata: { action: 'failed' },
    },
    {
      id: '8',
      timestamp: '2026-06-29T18:00:00Z',
      type: 'signal',
      title: '发现新信号：AI 写作助手',
      description: '来自 Product Hunt，热度 85，综合评分 82',
      metadata: { score: 82, signalId: 'sig-003' },
    },
  ]

  const displayLogs = fetchError ? mockLogs : logs

  const filteredLogs = filter === 'all' 
    ? displayLogs 
    : displayLogs.filter(log => log.type === filter)

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

  const typeConfig = {
    signal: { icon: '📡', color: 'var(--color-primary)', label: '信号' },
    forge: { icon: '🔨', color: 'var(--state-warning)', label: '复刻' },
    canvas: { icon: '📋', color: 'var(--state-info)', label: '画布' },
    deploy: { icon: '🚀', color: 'var(--state-success)', label: '部署' },
    twitter: { icon: '🐦', color: '#1DA1F2', label: '推文' },
  }

  const filters = [
    { value: 'all', label: '全部' },
    { value: 'signal', label: '信号' },
    { value: 'forge', label: '复刻' },
    { value: 'canvas', label: '画布' },
    { value: 'deploy', label: '部署' },
  ]

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            公开日志
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Build in Public 实时流，记录从信号发现到商业变现的全过程
          </p>
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
                    {log.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    <span>{formatTime(log.timestamp)}</span>
                    {log.metadata.score && (
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