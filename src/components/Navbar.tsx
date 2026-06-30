'use client'

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
    </header>
  )
}
