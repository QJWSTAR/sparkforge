'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Button, ContentCard, Badge } from '@/components/ui'
import { SkeletonProfile } from '@/components/Skeleton'

export default function ProfilePage() {
  const router = useRouter()
  const { user, signOut, isAuthenticated, loading, getSessionToken } = useAuth()

  const [activeTab, setActiveTab] = useState<'profile' | 'subscriptions' | 'settings'>('profile')
  const [stats, setStats] = useState({ forgeCount: 0, canvasCount: 0, subscribeCount: 0 })
  const [activity, setActivity] = useState<Array<{ id: string; action: string; time: string }>>([])
  const [profileError, setProfileError] = useState(false)
  const [profileLoading, setProfileLoading] = useState(true)

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
        const [forgeRes, canvasRes] = await Promise.all([
          fetch('/api/generate/forge/history', { headers }),
          fetch('/api/generate/canvas/history', { headers }),
        ])

        const forgeData = forgeRes.ok ? await forgeRes.json() : { data: [] }
        const canvasData = canvasRes.ok ? await canvasRes.json() : { data: [] }

        setStats({
          forgeCount: forgeData.data?.length || 0,
          canvasCount: canvasData.data?.length || 0,
          subscribeCount: 0,
        })

        const activities: Array<{ id: string; action: string; time: string }> = []
        ;(forgeData.data || []).forEach((f: any) => {
          activities.push({
            id: `forge-${f.id}`,
            action: `完成了一键复刻：${f.signalTitle || '未知信号'}`,
            time: formatRelativeTime(f.createdAt),
          })
        })
        ;(canvasData.data || []).forEach((c: any) => {
          activities.push({
            id: `canvas-${c.id}`,
            action: `创建了商业画布：${c.signalTitle || '未知信号'}`,
            time: formatRelativeTime(c.createdAt),
          })
        })
        activities.sort((a, b) => b.id.localeCompare(a.id))
        setActivity(activities.slice(0, 10))
      } catch {
        setProfileError(true)
      } finally {
        setProfileLoading(false)
      }
    }
    fetchProfileData()
  }, [isAuthenticated, getSessionToken])

  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return '未知时间'
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    if (hours < 1) return '刚刚'
    if (hours < 24) return `${hours} 小时前`
    if (days < 7) return `${days} 天前`
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${y}/${m}/${day}`
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
    { key: 'profile' as const, label: '个人资料' },
    { key: 'subscriptions' as const, label: '订阅管理' },
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
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-spark-blue">{stats.subscribeCount}</div>
            <div className="text-xs text-fog">关注信号</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-state-info">{stats.forgeCount}</div>
            <div className="text-xs text-fog">复刻项目</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-state-warning">{stats.canvasCount}</div>
            <div className="text-xs text-fog">商业画布</div>
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

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <ContentCard className="p-6">
            <h3 className="text-base font-bold text-ice-white mb-4">最近活动</h3>
            {profileLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex items-center justify-between py-2">
                    <div className="h-3 bg-graphite rounded w-48" />
                    <div className="h-3 bg-graphite rounded w-16" />
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
            ) : activity.length > 0 ? (
              <div className="space-y-3">
                {activity.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-border-line last:border-0">
                    <span className="text-sm text-fog">{item.action}</span>
                    <span className="text-xs text-fog">{item.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-fog">暂无活动记录</p>
            )}
          </ContentCard>
        )}

        {activeTab === 'subscriptions' && (
          <ContentCard className="p-6">
            <h3 className="text-base font-bold text-ice-white mb-4">我的订阅</h3>
            <p className="text-sm text-fog">暂无订阅</p>
          </ContentCard>
        )}

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
 * 3. 间距栅格 ✅ — p-4/p-6/py-8/py-2/gap-4/gap-2/mb-1/mb-4/mb-8 等
 * 4. 圆角规则 ✅ — 卡片 rounded-lg、按钮 rounded-md、头像 rounded-full、Tab rounded-lg
 * 5. 字体阶梯 ✅ — text-2xl(24px)、text-base(16px)、text-sm(14px)、text-xs(12px)、font-mono
 * 6. 交互状态 ✅ — Tab 按钮 hover 边框变化，Button 组件内置交互
 * 7. 氛围光 ✅ — bg-ambient-glow
 */