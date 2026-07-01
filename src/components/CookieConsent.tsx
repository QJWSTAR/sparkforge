'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setShowBanner(true)
      setTimeout(() => setIsAnimating(true), 100)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setIsAnimating(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'false')
    setIsAnimating(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  if (!showBanner) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${
        isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
      }`}
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        borderTop: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-float)',
      }}
    >
      <div className="container-app flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          我们使用 Cookie 来改善您的浏览体验、分析网站流量并优化功能。
          点击「接受」即表示您同意我们的 Cookie 政策。
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReject}
            className="text-sm font-medium px-4 py-2 rounded-md btn-press transition-colors"
            style={{
              backgroundColor: 'var(--color-bg-hover)',
              color: 'var(--color-text-secondary)',
            }}
          >
            拒绝
          </button>
          <button
            onClick={handleAccept}
            className="text-sm font-semibold px-4 py-2 rounded-md btn-press transition-colors"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text-inverse)',
            }}
          >
            接受
          </button>
        </div>
      </div>
    </div>
  )
}