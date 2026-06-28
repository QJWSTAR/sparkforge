import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SparkForge - 创意信号雷达 + TRAE 自动化落地工坊',
  description: '全网创意信号雷达 + TRAE 自动化落地工坊，帮助独立开发者从创意到 MVP 一站式完成',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
