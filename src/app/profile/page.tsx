'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'

export default function ProfilePage() {
  const router = useRouter()
  const { user, signOut, isAuthenticated, loading } = useAuth()

  const [activeTab, setActiveTab] = useState<'profile' | 'subscriptions' | 'settings'>('profile')
  const [focusedField, setFocusedField] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [hoveredSaveButton, setHoveredSaveButton] = useState(false)
  const [hoveredUpgradeButton, setHoveredUpgradeButton] = useState(false)
  const [hoveredNavButton, setHoveredNavButton] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-t-transparent rounded-full" style={{ borderColor: 'var(--color-primary)' }}></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  const subscriptions = [
    { id: '1', name: 'AI 创意信号', frequency: '每日', lastDelivered: '今天', enabled: true },
    { id: '2', name: 'Top 10 推送', frequency: '每周', lastDelivered: '3天前', enabled: true },
    { id: '3', name: '复刻工坊通知', frequency: '实时', lastDelivered: '1周前', enabled: false },
  ]

  const activity = [
    { id: '1', action: '订阅了 AI 创意信号', time: '2小时前' },
    { id: '2', action: '查看了信号详情', time: '5小时前' },
    { id: '3', action: '创建了商业画布', time: '1天前' },
    { id: '4', action: '完成了一键复刻', time: '2天前' },
  ]

  return (
    <div className="min-h-screen">

      <main className="container-app py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="border rounded-2xl p-6" style={{ backgroundColor: 'var(--color-bg-hover)', borderColor: 'var(--color-border)' }}>
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl mb-4" style={{ backgroundImage: 'linear-gradient(to bottom right, var(--color-primary), var(--state-warning))' }}>
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
                <h2 className="text-xl font-bold">{user?.name || '用户'}</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>{user?.email}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  onMouseEnter={() => setHoveredTab('profile')}
                  onMouseLeave={() => setHoveredTab(null)}
                  className="w-full text-left px-4 py-3 rounded-xl transition-colors"
                  style={{
                    backgroundColor: activeTab === 'profile' ? 'var(--color-primary-muted)' : hoveredTab === 'profile' ? 'var(--color-bg-active)' : 'transparent',
                    color: activeTab === 'profile' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span>👤</span> 个人资料
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('subscriptions')}
                  onMouseEnter={() => setHoveredTab('subscriptions')}
                  onMouseLeave={() => setHoveredTab(null)}
                  className="w-full text-left px-4 py-3 rounded-xl transition-colors"
                  style={{
                    backgroundColor: activeTab === 'subscriptions' ? 'var(--color-primary-muted)' : hoveredTab === 'subscriptions' ? 'var(--color-bg-active)' : 'transparent',
                    color: activeTab === 'subscriptions' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span>🔔</span> 订阅管理
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  onMouseEnter={() => setHoveredTab('settings')}
                  onMouseLeave={() => setHoveredTab(null)}
                  className="w-full text-left px-4 py-3 rounded-xl transition-colors"
                  style={{
                    backgroundColor: activeTab === 'settings' ? 'var(--color-primary-muted)' : hoveredTab === 'settings' ? 'var(--color-bg-active)' : 'transparent',
                    color: activeTab === 'settings' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span>⚙️</span> 设置
                  </span>
                </button>
              </div>

              <button
                onClick={handleSignOut}
                className="w-full mt-6 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-3 rounded-xl font-medium transition-colors"
              >
                退出登录
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="border rounded-2xl p-6" style={{ backgroundColor: 'var(--color-bg-hover)', borderColor: 'var(--color-border)' }}>
                  <h3 className="text-lg font-bold mb-4">📊 数据统计</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>12</div>
                      <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>关注信号</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: 'var(--state-info)' }}>5</div>
                      <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>复刻项目</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: 'var(--state-warning)' }}>3</div>
                      <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>商业画布</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#8B5CF6]">14天</div>
                      <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>使用时长</div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-2xl p-6" style={{ backgroundColor: 'var(--color-bg-hover)', borderColor: 'var(--color-border)' }}>
                  <h3 className="text-lg font-bold mb-4">📋 最近活动</h3>
                  <div className="space-y-3">
                    {activity.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: 'var(--color-border)' }}>
                        <span style={{ color: 'var(--color-text)' }}>{item.action}</span>
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-2xl p-6" style={{ backgroundImage: 'linear-gradient(to bottom right, var(--color-primary-subtle), var(--state-warning))', borderColor: 'var(--color-primary-muted)' }}>
                  <h3 className="text-lg font-bold mb-4">🚀 升级到 Pro</h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>解锁更多功能，包括：无限信号订阅、高级筛选、优先复刻等</p>
                  <button
                    onMouseEnter={() => setHoveredUpgradeButton(true)}
                    onMouseLeave={() => setHoveredUpgradeButton(false)}
                    className="text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    style={{
                      backgroundColor: hoveredUpgradeButton ? 'var(--color-primary-hover)' : 'var(--color-primary)',
                    }}
                  >
                    立即升级
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'subscriptions' && (
              <div className="space-y-6">
                <div className="border rounded-2xl p-6" style={{ backgroundColor: 'var(--color-bg-hover)', borderColor: 'var(--color-border)' }}>
                  <h3 className="text-lg font-bold mb-4">🔔 订阅列表</h3>
                  <div className="space-y-4">
                    {subscriptions.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg-hover)' }}>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.frequency} · 上次推送：{item.lastDelivered}</div>
                        </div>
                        <button
                          className="relative w-12 h-6 rounded-full transition-colors"
                          style={{
                            backgroundColor: item.enabled ? 'var(--color-primary)' : 'gray',
                          }}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              item.enabled ? 'left-7' : 'left-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-2xl p-6" style={{ backgroundColor: 'var(--color-bg-hover)', borderColor: 'var(--color-border)' }}>
                  <h3 className="text-lg font-bold mb-4">📬 订阅管理</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" checked className="w-4 h-4 rounded" style={{ accentColor: 'var(--color-primary)' }} />
                      <span style={{ color: 'var(--color-text)' }}>邮件通知</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" checked className="w-4 h-4 rounded" style={{ accentColor: 'var(--color-primary)' }} />
                      <span style={{ color: 'var(--color-text)' }}>浏览器通知</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 rounded" style={{ accentColor: 'var(--color-primary)' }} />
                      <span style={{ color: 'var(--color-text)' }}>微信推送</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="border rounded-2xl p-6" style={{ backgroundColor: 'var(--color-bg-hover)', borderColor: 'var(--color-border)' }}>
                  <h3 className="text-lg font-bold mb-4">👤 个人信息</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>用户名</label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        onFocus={() => setFocusedField(true)}
                        onBlur={() => setFocusedField(false)}
                        className="w-full border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
                        style={{
                          backgroundColor: 'var(--color-bg-hover)',
                          borderColor: focusedField ? 'var(--color-border-active)' : 'var(--color-border)',
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>邮箱</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        disabled
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none"
                        style={{
                          backgroundColor: 'var(--color-bg-hover)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-muted)',
                        }}
                      />
                    </div>
                    <button
                      onMouseEnter={() => setHoveredSaveButton(true)}
                      onMouseLeave={() => setHoveredSaveButton(false)}
                      className="px-4 py-2 rounded-lg font-medium transition-colors"
                      style={{
                        backgroundColor: hoveredSaveButton ? 'var(--color-primary-muted)' : 'var(--color-primary-subtle)',
                        color: 'var(--color-primary)',
                      }}
                    >
                      保存修改
                    </button>
                  </div>
                </div>

                <div className="border rounded-2xl p-6" style={{ backgroundColor: 'var(--color-bg-hover)', borderColor: 'var(--color-border)' }}>
                  <h3 className="text-lg font-bold mb-4">🔒 安全设置</h3>
                  <div className="space-y-4">
                    <button className="w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center justify-between" style={{ backgroundColor: 'var(--color-bg-hover)' }}>
                      <span>修改密码</span>
                      <span style={{ color: 'var(--color-text-muted)' }}>→</span>
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center justify-between" style={{ backgroundColor: 'var(--color-bg-hover)' }}>
                      <span>双因素认证</span>
                      <span style={{ color: 'var(--color-text-muted)' }}>未启用 →</span>
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center justify-between" style={{ backgroundColor: 'var(--color-bg-hover)' }}>
                      <span>登录设备管理</span>
                      <span style={{ color: 'var(--color-text-muted)' }}>→</span>
                    </button>
                  </div>
                </div>

                <div className="border rounded-2xl p-6" style={{ backgroundColor: 'var(--color-bg-hover)', borderColor: 'var(--color-border)' }}>
                  <h3 className="text-lg font-bold mb-4">🗑️ 删除账号</h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>删除账号后，所有数据将永久清除，此操作不可撤销。</p>
                  <button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg font-medium transition-colors">
                    永久删除账号
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}