import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ToastProvider } from '@/components/ToastProvider'

export const metadata: Metadata = {
  title: 'SparkForge - 创意信号雷达 + TRAE 自动化落地工坊',
  description: '全网创意信号雷达 + TRAE 自动化落地工坊，帮助独立开发者从创意到 MVP 一站式完成',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen w-full antialiased"
        style={{
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
        }}
      >
        <ToastProvider>
          <Navbar />
          <div className="w-full">
            {children}
          </div>
        </ToastProvider>
      </body>
    </html>
  )
}
