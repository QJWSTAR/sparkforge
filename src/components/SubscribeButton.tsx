'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth'

interface SubscribeButtonProps {
  signalId: string
  initialSubscribed?: boolean
}

export default function SubscribeButton({ signalId, initialSubscribed = false }: SubscribeButtonProps) {
  const { user, isAuthenticated } = useAuth()
  const [subscribed, setSubscribed] = useState(initialSubscribed)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (!isAuthenticated || !user) {
      window.location.href = '/login'
      return
    }

    setLoading(true)

    try {
      const url = `/api/subscribe${subscribed ? '' : ''}`
      const method = subscribed ? 'DELETE' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, signalId }),
      })

      const data = await res.json()

      if (data.success) {
        setSubscribed(!subscribed)
      }
    } catch (error) {
      console.error('Subscribe error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors btn-press"
      style={{
        backgroundColor: subscribed ? 'var(--color-primary)' : 'var(--color-bg-hover)',
        color: subscribed ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
      }}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
      ) : (
        <>
          <span>{subscribed ? '🔔' : '🔕'}</span>
          <span>{subscribed ? '已订阅' : '订阅'}</span>
        </>
      )}
    </button>
  )
}