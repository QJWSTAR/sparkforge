'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { getErrorMessage } from '@/lib/errorMessages'
import { Button, Input } from '@/components/ui'
import { Sparkles, Eye, EyeOff } from 'lucide-react'

interface AuthCardProps {
  mode: 'login' | 'register'
}

export default function AuthCard({ mode }: AuthCardProps) {
  const router = useRouter()
  const { signIn, signUp, isAuthenticated } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)

  const emailError = emailTouched && email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? '请输入有效的邮箱地址'
    : ''

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/radar')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (emailError) {
      setError(emailError)
      return
    }

    setLoading(true)

    const result =
      mode === 'login'
        ? await signIn(email, password)
        : await signUp(email, password, name)

    if (result.success) {
      router.push('/radar')
    } else {
      setError(getErrorMessage(result.error) || '操作失败')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-ambient-glow flex items-center justify-center py-16">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-graphite border border-border-line rounded-lg p-8">
          <Sparkles className="w-8 h-8 text-spark-blue mx-auto mb-4" />

          <h1 className="text-2xl font-bold text-ice-white text-center mb-8">
            {mode === 'login' ? '登录' : '创建账号'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="auth-email" className="block text-fog text-sm mb-1">邮箱地址</label>
              <Input
                id="auth-email"
                type="email"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                error={!!emailError}
                required
              />
              {emailError && (
                <p className="text-ui-error text-xs mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <label htmlFor="auth-password" className="block text-fog text-sm mb-1">密码</label>
              <div className="relative">
                <Input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-fog hover:text-ice-white transition-colors"
                  aria-label={showPassword ? '隐藏密码' : '显示密码'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label htmlFor="auth-name" className="block text-fog text-sm mb-1">昵称</label>
                <Input
                  id="auth-name"
                  placeholder="你的昵称"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            {error && (
              <div className="text-ui-error text-sm mb-4">{error}</div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              isLoading={loading}
            >
              {loading
                ? mode === 'login'
                  ? '登录中...'
                  : '注册中...'
                : mode === 'login'
                  ? '登录'
                  : '注册'}
            </Button>
          </form>
        </div>

        <div className="text-fog text-sm text-center mt-4">
          {mode === 'login' ? (
            <>
              还没有账号？
              <Link
                href="/register"
                className="text-spark-blue hover:text-spark-blue-hover"
              >
                注册
              </Link>
            </>
          ) : (
            <>
              已有账号？
              <Link
                href="/login"
                className="text-spark-blue hover:text-spark-blue-hover"
              >
                登录
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}