'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth'

export default function Navbar() {
  const { user, isAuthenticated } = useAuth()

  return (
    <header className="border-b border-white/10 sticky top-0 z-10 bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-lg flex items-center justify-center font-bold">
            S
          </div>
          <span className="text-xl font-bold">SparkForge</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">首页</Link>
          <Link href="/radar" className="text-gray-400 hover:text-white transition-colors">创意雷达</Link>
          <Link href="/forge" className="text-gray-400 hover:text-white transition-colors">复刻工坊</Link>
          <Link href="/canvas" className="text-gray-400 hover:text-white transition-colors">商业画布</Link>
          <Link href="/stream" className="text-gray-400 hover:text-white transition-colors">公开日志</Link>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Link href="/profile" className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
              {user?.name?.charAt(0) || 'P'}
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-gray-400 hover:text-white transition-colors text-sm">
                登录
              </Link>
              <Link href="/register" className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                注册
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}