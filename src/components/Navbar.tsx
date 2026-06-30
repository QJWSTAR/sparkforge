'use client'

import { useState } from 'react'
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

  return (
    <header
      className="sticky top-0 z-40 w-full border-b"
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        borderColor: 'var(--color-border)',
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

        {/* Right: Auth */}
        <div className="flex items-center gap-2 shrink-0">
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
        </nav>
      )}
    </header>
  )
}
