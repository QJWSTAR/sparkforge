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
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [hoveredButton, setHoveredButton] = useState(false)
  const [hoveredAltButton, setHoveredAltButton] = useState(false)

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
          <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl mx-auto mb-4" style={{ backgroundImage: 'linear-gradient(to bottom right, var(--color-primary), var(--state-warning))' }}>
            S
          </div>
          <h1 className="text-2xl font-bold">欢迎回来</h1>
          <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>登录 SparkForge 查看你的创意雷达</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="w-full border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-hover)',
                borderColor: focusedField === 'email' ? 'var(--color-border-active)' : 'var(--color-border)',
              }}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              className="w-full border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-hover)',
                borderColor: focusedField === 'password' ? 'var(--color-border-active)' : 'var(--color-border)',
              }}
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
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
            className="w-full text-white py-3 rounded-xl font-medium transition-colors btn-press"
            style={{
              backgroundColor: loading ? 'gray' : hoveredButton ? 'var(--color-primary-hover)' : 'var(--color-primary)',
            }}
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            还没有账号？{' '}
            <Link href="/register" className="hover:underline" style={{ color: 'var(--color-primary)' }}>
              立即注册
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: 'var(--color-border)' }}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-sm" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)' }}>或者</span>
            </div>
          </div>

          <button
            onMouseEnter={() => setHoveredAltButton(true)}
            onMouseLeave={() => setHoveredAltButton(false)}
            className="w-full mt-4 border py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            style={{
              backgroundColor: hoveredAltButton ? 'var(--color-bg-active)' : 'var(--color-bg-hover)',
              borderColor: 'var(--color-border)',
            }}
          >
            <span>🔑</span>
            使用魔法登录（Mock）
          </button>
        </div>
      </div>
    </div>
  )
}