'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'

export default function ProfilePage() {
  const router = useRouter()
  const { user, signOut, isAuthenticated, loading } = useAuth()

  const [activeTab, setActiveTab] = useState<'profile' | 'subscriptions' | 'settings'>('profile')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#FF6B35] border-t-transparent rounded-full"></div>
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
      <header className="border-b border-white/10 sticky top-0 z-10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-lg flex items-center justify-center font-bold">
              S
            </div>
            <span className="text-xl font-bold">SparkForge</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">首页</Link>
            <Link href="/radar" className="text-gray-400 hover:text-white transition-colors">创意雷达</Link>
            <Link href="/forge" className="text-gray-400 hover:text-white transition-colors">复刻工坊</Link>
            <Link href="/canvas" className="text-gray-400 hover:text-white transition-colors">商业画布</Link>
            <Link href="/stream" className="text-gray-400 hover:text-white transition-colors">公开日志</Link>
          </nav>
          <Link href="/profile" className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
            个人中心
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-full flex items-center justify-center font-bold text-2xl mb-4">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
                <h2 className="text-xl font-bold">{user?.name || '用户'}</h2>
                <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-[#FF6B35]/20 text-[#FF6B35]'
                      : 'text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>👤</span> 个人资料
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('subscriptions')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'subscriptions'
                      ? 'bg-[#FF6B35]/20 text-[#FF6B35]'
                      : 'text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🔔</span> 订阅管理
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-[#FF6B35]/20 text-[#FF6B35]'
                      : 'text-gray-400 hover:bg-white/10'
                  }`}
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
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">📊 数据统计</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#FF6B35]">12</div>
                      <div className="text-xs text-gray-500">关注信号</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#3B82F6]">5</div>
                      <div className="text-xs text-gray-500">复刻项目</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#FFB800]">3</div>
                      <div className="text-xs text-gray-500">商业画布</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#8B5CF6]">14天</div>
                      <div className="text-xs text-gray-500">使用时长</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">📋 最近活动</h3>
                  <div className="space-y-3">
                    {activity.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <span className="text-gray-300">{item.action}</span>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#FF6B35]/10 to-[#FFB800]/10 border border-[#FF6B35]/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">🚀 升级到 Pro</h3>
                  <p className="text-gray-400 text-sm mb-4">解锁更多功能，包括：无限信号订阅、高级筛选、优先复刻等</p>
                  <button className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    立即升级
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'subscriptions' && (
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">🔔 订阅列表</h3>
                  <div className="space-y-4">
                    {subscriptions.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.frequency} · 上次推送：{item.lastDelivered}</div>
                        </div>
                        <button
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            item.enabled ? 'bg-[#FF6B35]' : 'bg-gray-600'
                          }`}
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

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">📬 订阅管理</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" checked className="w-4 h-4 rounded bg-white/10 border-white/20 text-[#FF6B35]" />
                      <span className="text-gray-300">邮件通知</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" checked className="w-4 h-4 rounded bg-white/10 border-white/20 text-[#FF6B35]" />
                      <span className="text-gray-300">浏览器通知</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border-white/20 text-[#FF6B35]" />
                      <span className="text-gray-300">微信推送</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">👤 个人信息</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">用户名</label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">邮箱</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        disabled
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-500 focus:outline-none"
                      />
                    </div>
                    <button className="bg-[#FF6B35]/20 hover:bg-[#FF6B35]/30 text-[#FF6B35] px-4 py-2 rounded-lg font-medium transition-colors">
                      保存修改
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">🔒 安全设置</h3>
                  <div className="space-y-4">
                    <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center justify-between">
                      <span>修改密码</span>
                      <span className="text-gray-500">→</span>
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center justify-between">
                      <span>双因素认证</span>
                      <span className="text-gray-500">未启用 →</span>
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center justify-between">
                      <span>登录设备管理</span>
                      <span className="text-gray-500">→</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">🗑️ 删除账号</h3>
                  <p className="text-gray-400 text-sm mb-4">删除账号后，所有数据将永久清除，此操作不可撤销。</p>
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