'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth'

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/radar', label: '创意雷达' },
  { href: '/forge', label: '复刻工坊' },
  { href: '/canvas', label: '商业画布' },
  { href: '/stream', label: '公开日志' },
]

export default function Navbar() {
  const { user, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sparkforge-theme')
    if (saved) {
      setIsDark(saved === 'dark')
      document.documentElement.classList.toggle('light', saved === 'light')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    localStorage.setItem('sparkforge-theme', newDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('light', !newDark)
  }

  return (
    <header
      className="sticky top-0 z-40 w-full border-b transition-all duration-200"
      style={{
        backgroundColor: scrolled ? 'var(--color-bg-elevated)' : 'transparent',
        borderColor: 'var(--color-border)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
      }}
    >
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div
            className="flex items-center justify-center w-8 h-8"
            style={{
              background:
                'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <span
              className="font-bold text-sm"
              style={{ color: 'var(--color-text-inverse)' }}
            >
              S
            </span>
          </div>
          <span
            className="font-semibold text-base hidden sm:inline"
            style={{ color: 'var(--color-text)' }}
          >
            SparkForge
          </span>
        </Link>

        {/* Center: Nav links (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{
                  color: isActive
                    ? 'var(--color-primary)'
                    : 'var(--color-text-secondary)',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
            className="p-2 rounded-md transition-colors btn-press"
            style={{
              backgroundColor: 'var(--color-bg-hover)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Auth */}
          {isAuthenticated ? (
            <Link
              href="/profile"
              className="flex items-center justify-center w-8 h-8 rounded-md text-xs font-semibold transition-colors"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-text-inverse)',
              }}
              aria-label="个人主页"
            >
              {user?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'P'}
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center px-3 h-8 rounded-md text-xs font-semibold transition-colors"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-text-inverse)',
              }}
            >
              登录
            </Link>
          )}

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="打开菜单"
            style={{
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              color: 'var(--color-text)',
            }}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden"
          style={{
            borderTop: `1px solid var(--color-border)`,
            backgroundColor: 'var(--color-bg-elevated)',
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-6 py-3 text-sm font-medium transition-colors"
                style={{
                  color: isActive
                    ? 'var(--color-primary)'
                    : 'var(--color-text-secondary)',
                }}
              >
                {link.label}
              </Link>
            )
          })}
          <button
            onClick={() => {
              toggleTheme()
              setMobileMenuOpen(false)
            }}
            className="block w-full text-left px-6 py-3 text-sm font-medium transition-colors"
            style={{
              color: 'var(--color-text-secondary)',
            }}
          >
            {isDark ? '🌞 亮色模式' : '🌙 暗色模式'}
          </button>
        </nav>
      )}
    </header>
  )
}