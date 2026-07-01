'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Button, Input } from '@/components/ui'
import { Sparkles } from 'lucide-react'

interface AuthCardProps {
  mode: 'login' | 'register'
}

export default function AuthCard({ mode }: AuthCardProps) {
  const router = useRouter()
  const { signIn, signUp, isAuthenticated } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/radar')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result =
      mode === 'login'
        ? await signIn(email, password)
        : await signUp(email, password, name)

    if (result.success) {
      router.push('/radar')
    } else {
      setError(result.error || '操作失败')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center py-16">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-graphite border border-border-line rounded-lg p-8">
          <Sparkles className="w-8 h-8 text-spark-blue mx-auto mb-4" />

          <h1 className="text-2xl font-bold text-ice-white text-center mb-8">
            {mode === 'login' ? '登录' : '创建账号'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-fog text-sm mb-1">邮箱地址</label>
              <Input
                type="email"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-fog text-sm mb-1">密码</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-fog text-sm mb-1">昵称</label>
                <Input
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
              disabled={loading}
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