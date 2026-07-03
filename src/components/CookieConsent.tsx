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
      role="dialog"
      aria-label="Cookie 同意提示"
      className={`fixed bottom-0 left-0 right-0 z-50 px-4 py-4 bg-graphite border-t border-border-line shadow-float transition-all duration-300 ${
        isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
      }`}
    >
      <div className="max-w-[var(--content-max-width)] mx-auto px-6 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-fog leading-relaxed">
          我们使用 Cookie 来改善您的浏览体验、分析网站流量并优化功能。
          点击「接受」即表示您同意我们的 Cookie 政策。
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleReject}
            aria-label="拒绝 Cookie"
            className="text-sm font-medium px-4 py-2 min-h-[44px] rounded-md bg-graphite/50 text-fog hover:bg-graphite border border-border-line transition-colors active:scale-[0.98]"
          >
            拒绝
          </button>
          <button
            onClick={handleAccept}
            aria-label="接受 Cookie"
            className="text-sm font-semibold px-4 py-2 min-h-[44px] rounded-md bg-spark-blue text-white hover:bg-spark-blue-hover transition-colors active:scale-[0.98]"
          >
            接受
          </button>
        </div>
      </div>
    </div>
  )
}