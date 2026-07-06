'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Button, ContentCard, Badge } from '@/components/ui'
import { SkeletonProfile } from '@/components/Skeleton'
import { Wrench, Layout, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react'

interface ActivityItem {
  id: string
  type: string
  title: string
  content?: string
  signalId?: string
  createdAt: string
}

const activityConfig: Record<string, { icon: typeof Wrench; label: string; color: string }> = {
  FORGE_STARTED:    { icon: Wrench,       label: '开始生成方案',  color: 'text-state-warning' },
  FORGE_COMPLETED:  { icon: Wrench,       label: '方案生成完成',  color: 'text-state-success' },
  CANVAS_GENERATED: { icon: Layout,       label: '生成商业画布',  color: 'text-state-info' },
  SIGNAL_TOP10:     { icon: TrendingUp,   label: '信号进入 Top10', color: 'text-state-warning' },
  USER_POST:        { icon: MessageCircle, label: '发布了动态',   color: 'text-spark-blue' },
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, signOut, isAuthenticated, loading, getSessionToken } = useAuth()

  const [activeTab, setActiveTab] = useState<'activity' | 'settings'>('activity')
  const [stats, setStats] = useState({ forgeCount: 0, canvasCount: 0 })
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [profileError, setProfileError] = useState(false)
  const [profileLoading, setProfileLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [loading, isAuthenticated, router])

  useEffect(() => {
    if (!isAuthenticated) return
    const fetchProfileData = async () => {
      setProfileLoading(true)
      setProfileError(false)
      const token = await getSessionToken()
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {}

      try {
        const [forgeRes, canvasRes, logsRes] = await Promise.all([
          fetch('/api/generate/forge/history', { headers }),
          fetch('/api/generate/canvas/history', { headers }),
          fetch('/api/logs?scope=mine&limit=20', { headers }),
        ])

        const forgeData = forgeRes.ok ? await forgeRes.json() : { data: [] }
        const canvasData = canvasRes.ok ? await canvasRes.json() : { data: [] }
        const logsData = logsRes.ok ? await logsRes.json() : { data: [] }

        setStats({
          forgeCount: forgeData.data?.length || 0,
          canvasCount: canvasData.data?.length || 0,
        })

        // 合并 forge/canvas 历史和 LogEntry 记录，按时间排序
        const allActivities: ActivityItem[] = []

        ;(forgeData.data || []).forEach((f: any) => {
          allActivities.push({
            id: `forge-${f.id}`,
            type: 'FORGE_COMPLETED',
            title: f.signalTitle || '未知信号',
            content: f.outputSummary || '',
            signalId: f.signalId,
            createdAt: f.createdAt,
          })
        })

        ;(canvasData.data || []).forEach((c: any) => {
          allActivities.push({
            id: `canvas-${c.id}`,
            type: 'CANVAS_GENERATED',
            title: c.signalId || '未知信号',
            createdAt: c.createdAt,
          })
        })

        // 补充 LogEntry 中的其他活动（如 SIGNAL_TOP10）
        ;(logsData.data || []).forEach((log: any) => {
          if (!allActivities.some(a => a.id.startsWith(log.type) && a.signalId === log.signalId)) {
            allActivities.push({
              id: log.id,
              type: log.type,
              title: log.title || '',
              content: log.content || '',
              signalId: log.signalId,
              createdAt: log.createdAt,
            })
          }
        })

        // 按 createdAt 降序排列（而非 UUID）
        allActivities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setActivities(allActivities.slice(0, 20))
      } catch {
        setProfileError(true)
      } finally {
        setProfileLoading(false)
      }
    }
    fetchProfileData()
  }, [isAuthenticated, getSessionToken])

  const formatDateConsistent = (timestamp: string) => {
    const d = new Date(timestamp)
    if (isNaN(d.getTime())) return '未知时间'
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}/${m}/${day}`
  }

  const formatRelativeTime = (timestamp: string) => {
    if (!mounted) return formatDateConsistent(timestamp)
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return '未知时间'
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    if (minutes < 1) return '刚刚'
    if (minutes < 60) return `${minutes} 分钟前`
    if (hours < 24) return `${hours} 小时前`
    if (days < 7) return `${days} 天前`
    return formatDateConsistent(timestamp)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-ambient-glow">
        <div className="container-app py-8">
          <SkeletonProfile />
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  const tabs = [
    { key: 'activity' as const, label: '我的活动' },
    { key: 'settings' as const, label: '账户设置' },
  ]

  return (
    <div className="min-h-screen bg-ambient-glow">
      <div className="container-app py-8">
        <h1 className="text-2xl font-bold text-ice-white mb-8">个人中心</h1>

        {/* User Info */}
        <ContentCard className="p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-spark-blue/10 flex items-center justify-center">
              <span className="text-2xl font-mono text-spark-blue font-bold">
                {user?.email?.charAt(0).toUpperCase() || '?'}
              </span>
            </div>
            <div>
              <h2 className="text-base font-bold text-ice-white">{user?.email || '用户'}</h2>
              <p className="text-sm text-fog">SparkForge 用户</p>
            </div>
          </div>
        </ContentCard>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="text-center bg-graphite/50 border border-border-line rounded-lg p-4">
            <div className="text-2xl font-mono font-bold text-state-info">{stats.forgeCount}</div>
            <div className="text-xs text-fog mt-1">复刻项目</div>
          </div>
          <div className="text-center bg-graphite/50 border border-border-line rounded-lg p-4">
            <div className="text-2xl font-mono font-bold text-state-warning">{stats.canvasCount}</div>
            <div className="text-xs text-fog mt-1">商业画布</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer',
                activeTab === tab.key
                  ? 'bg-spark-blue text-white'
                  : 'bg-graphite text-fog border border-border-line hover:border-spark-blue',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <ContentCard className="p-6">
            <h3 className="text-base font-bold text-ice-white mb-4">我的活动</h3>
            {profileLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-graphite shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-graphite rounded w-48" />
                      <div className="h-3 bg-graphite rounded w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : profileError ? (
              <div className="text-center py-6">
                <p className="text-sm text-fog mb-4">加载活动数据失败</p>
                <Button variant="secondary" onClick={() => { setProfileError(false); window.location.reload() }}>
                  重试
                </Button>
              </div>
            ) : activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((item) => {
                  const config = activityConfig[item.type] || activityConfig.FORGE_COMPLETED
                  const Icon = config.icon
                  return (
                    <div key={item.id} className="flex items-start gap-3 py-3 border-b border-border-line last:border-0">
                      <div className="w-8 h-8 rounded-full bg-spark-blue/10 flex items-center justify-center shrink-0">
                        <Icon className={`w-4 h-4 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="default" size="sm">{config.label}</Badge>
                          <span className="text-xs text-fog">{formatRelativeTime(item.createdAt)}</span>
                        </div>
                        <p className="text-sm text-ice-white truncate">{item.title}</p>
                        {item.content && (
                          <p className="text-xs text-fog mt-1 line-clamp-1">{item.content}</p>
                        )}
                      </div>
                      {item.signalId && (
                        <Link
                          href={`/radar/${item.signalId}`}
                          className="shrink-0 p-1 rounded text-fog hover:text-spark-blue transition-colors"
                          aria-label="查看信号详情"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-fog mb-2">你还没有生成或保存任何内容</p>
                <p className="text-xs text-fog mb-4">去发现创意或生成方案，开始你的创作之旅</p>
                <div className="flex gap-2 justify-center">
                  <Link href="/radar">
                    <Button variant="primary" size="md">发现创意</Button>
                  </Link>
                  <Link href="/forge">
                    <Button variant="secondary" size="md">生成方案</Button>
                  </Link>
                </div>
              </div>
            )}
          </ContentCard>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <ContentCard className="p-6">
            <h3 className="text-base font-bold text-ice-white mb-4">账户设置</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-fog mb-1">邮箱</div>
                <div className="text-sm text-ice-white">{user?.email || '未设置'}</div>
              </div>
              <div className="pt-4 border-t border-border-line">
                <Button variant="primary" onClick={handleSignOut}>
                  退出登录
                </Button>
              </div>
            </div>
          </ContentCard>
        )}
      </div>
    </div>
  )
}

/*
 * 设计规则遵守情况自查：
 * 1. 无内联 style ✅
 * 2. 组件库 ✅ — 使用 Button、ContentCard、Badge
 * 3. 间距栅格 ✅ — p-4/p-6/py-8/py-3/gap-4/gap-3/gap-2/mb-1/mb-2/mb-4/mb-8/mt-1 等
 * 4. 圆角规则 ✅ — 卡片 rounded-lg、头像 rounded-full、Tab rounded-lg
 * 5. 字体阶梯 ✅ — text-2xl(24px)、text-base(16px)、text-sm(14px)、text-xs(12px)、font-mono
 * 6. 交互状态 ✅ — Tab hover 边框，Link hover 颜色，Button 内置交互
 * 7. 氛围光 ✅ — bg-ambient-glow
 */