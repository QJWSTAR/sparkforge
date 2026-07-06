'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Search, Sun, Moon, Menu, X, Zap } from 'lucide-react'
import { Button, Input, Avatar } from '@/components/ui'

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/radar', label: '发现创意' },
  { href: '/forge', label: '生成方案' },
  { href: '/canvas', label: '分析画布' },
  { href: '/stream', label: '动态' },
  { href: '/projects', label: '我的项目' },
]

export default function Navbar() {
  const { user, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('sparkforge-theme')
    const prefersDark = saved ? saved === 'dark' : true
    setIsDark(prefersDark)
    document.documentElement.classList.toggle('light', !prefersDark)
    setMounted(true)
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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEsc)
    }
    return () => document.removeEventListener('keydown', handleEsc)
  }, [mobileMenuOpen])

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
    <header className="sticky top-0 z-40 w-full bg-graphite/80 backdrop-blur-md border-b border-border-line" role="banner">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4 lg:px-6">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="SparkForge 首页">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-spark-blue">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-base hidden sm:inline text-ice-white">
            SparkForge
          </span>
        </Link>

        {/* Center: Nav links (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-1" aria-label="主导航">
          {navLinks.map((link) => {
            const isActive = !pathname ? false : link.href === '/'
              ? pathname === '/'
              : pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
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
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
              className="p-2 rounded-lg text-fog hover:text-ice-white hover:bg-graphite transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

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
            aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
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
      {mobileMenuOpen && (
      <div
        className={[
          'md:hidden overflow-hidden border-t border-border-line bg-graphite transition-all duration-200 ease-in-out',
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-t-0',
        ].join(' ')}
      >
        {navLinks.map((link) => {
          const isActive = !pathname ? false : link.href === '/'
            ? pathname === '/'
            : pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setMobileMenuOpen(false)}
              className={[
                'block px-6 py-4 text-sm font-medium transition-colors min-h-[44px]',
                isActive ? 'text-spark-blue' : 'text-fog',
              ].join(' ')}
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
          className="block w-full text-left px-6 py-4 text-sm font-medium text-fog transition-colors min-h-[44px]"
        >
          {mounted ? (isDark ? '切换至亮色模式' : '切换至暗色模式') : '切换至暗色模式'}
        </button>
      </div>
      )}
    </header>
  )
}