'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, BellOff } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { useToast } from '@/components/ToastProvider'

interface SubscribeButtonProps {
  signalId: string
  initialSubscribed?: boolean
}

export default function SubscribeButton({ signalId, initialSubscribed = false }: SubscribeButtonProps) {
  const router = useRouter()
  const { user, isAuthenticated, getSessionToken } = useAuth()
  const { showSuccess, showError } = useToast()
  const [subscribed, setSubscribed] = useState(initialSubscribed)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (!isAuthenticated || !user) {
      router.push('/login')
      return
    }

    setLoading(true)

    try {
      const token = await getSessionToken()
      const method = subscribed ? 'DELETE' : 'POST'

      const res = await fetch('/api/subscribe', {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ userId: user.id, signalId }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        showError(errorData.error || '操作失败，请稍后重试')
        return
      }

      const data = await res.json()

      if (data.success) {
        setSubscribed(!subscribed)
        showSuccess(subscribed ? '已取消订阅' : '订阅成功')
      }
    } catch (error) {
      showError('网络错误，请稍后重试')
      console.error('Subscribe error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={[
        'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors',
        subscribed
          ? 'bg-spark-blue text-white'
          : 'bg-graphite text-fog border border-border-line hover:border-spark-blue hover:text-ice-white',
      ].join(' ')}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {subscribed ? (
            <Bell className="w-4 h-4" />
          ) : (
            <BellOff className="w-4 h-4" />
          )}
          <span>{subscribed ? '已订阅' : '订阅'}</span>
        </>
      )}
    </button>
  )
}