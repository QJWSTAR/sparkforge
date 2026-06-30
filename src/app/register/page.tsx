'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'

export default function RegisterPage() {
  const router = useRouter()
  const { signUp, isAuthenticated } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [hoveredButton, setHoveredButton] = useState(false)

  if (isAuthenticated) {
    router.push('/')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('两次密码输入不一致')
      return
    }

    if (password.length < 6) {
      setError('密码至少需要6个字符')
      return
    }

    setLoading(true)

    const result = await signUp(email, password, name)

    if (result.success) {
      router.push('/')
    } else {
      setError(result.error || '注册失败')
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
          <h1 className="text-2xl font-bold">创建账号</h1>
          <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>加入 SparkForge，发现下一个爆款创意</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>用户名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              className="w-full border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-hover)',
                borderColor: focusedField === 'name' ? 'var(--color-border-active)' : 'var(--color-border)',
              }}
              placeholder="你的名字"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>确认密码</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => setFocusedField(null)}
              className="w-full border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-hover)',
                borderColor: focusedField === 'confirmPassword' ? 'var(--color-border-active)' : 'var(--color-border)',
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
            className="w-full text-white py-3 rounded-xl font-medium transition-colors"
            style={{
              backgroundColor: loading ? 'gray' : hoveredButton ? 'var(--color-primary-hover)' : 'var(--color-primary)',
            }}
          >
            {loading ? '注册中...' : '注册'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            已有账号？{' '}
            <Link href="/login" className="hover:underline" style={{ color: 'var(--color-primary)' }}>
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}