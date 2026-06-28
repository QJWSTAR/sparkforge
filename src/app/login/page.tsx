'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const { signIn, isAuthenticated } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    router.push('/')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn(email, password)

    if (result.success) {
      router.push('/')
    } else {
      setError(result.error || '登录失败')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-xl flex items-center justify-center font-bold text-2xl mx-auto mb-4">
            S
          </div>
          <h1 className="text-2xl font-bold">欢迎回来</h1>
          <p className="text-gray-400 mt-2">登录 SparkForge 查看你的创意雷达</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6B35] hover:bg-[#FF5722] disabled:bg-gray-600 text-white py-3 rounded-xl font-medium transition-colors"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            还没有账号？{' '}
            <Link href="/register" className="text-[#FF6B35] hover:underline">
              立即注册
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0a0a0a] text-gray-500">或者</span>
            </div>
          </div>

          <button className="w-full mt-4 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
            <span>🔑</span>
            使用魔法登录（Mock）
          </button>
        </div>
      </div>
    </div>
  )
}