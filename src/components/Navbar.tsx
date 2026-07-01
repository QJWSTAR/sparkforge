'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Sun, Moon, Menu, X, Zap } from 'lucide-react'
import { Button, Input, Avatar } from '@/components/ui'

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
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false)
        setSearchQuery('')
      }
    }
    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [searchOpen])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    localStorage.setItem('sparkforge-theme', newDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('light', !newDark)
  }

  const handleSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/radar?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header
      className={[
        'sticky top-0 z-40 w-full border-b transition-all duration-200',
        scrolled
          ? 'bg-graphite/80 backdrop-blur-md border-border-line'
          : 'bg-transparent border-transparent',
      ].join(' ')}
    >
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-spark-blue">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-base hidden sm:inline text-ice-white">
            SparkForge
          </span>
        </Link>

        {/* Center: Nav links (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'relative px-3 py-2 text-sm font-medium transition-colors rounded-lg',
                  isActive
                    ? 'text-spark-blue'
                    : 'text-fog hover:text-ice-white hover:bg-graphite',
                ].join(' ')}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-spark-blue rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search */}
          <div ref={searchContainerRef} className="relative">
            {searchOpen ? (
              <Input
                ref={searchInputRef}
                placeholder="搜索信号..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                className="w-40 lg:w-52"
              />
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-fog hover:text-ice-white hover:bg-graphite transition-colors"
                aria-label="搜索"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
            className="p-2 rounded-lg text-fog hover:text-ice-white hover:bg-graphite transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Auth */}
          {isAuthenticated ? (
            <Link href="/profile" aria-label="个人主页">
              <Avatar
                size="sm"
                status="online"
                src={user?.avatarUrl || ''}
                alt={user?.name || '用户'}
              />
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="primary" size="md">
                登录
              </Button>
            </Link>
          )}

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden p-2 rounded-lg text-fog hover:text-ice-white hover:bg-graphite transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="打开菜单"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-border-line bg-graphite"
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
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {isDark ? '🌞 亮色模式' : '🌙 暗色模式'}
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}