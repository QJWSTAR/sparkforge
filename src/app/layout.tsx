import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ToastProvider } from '@/components/ToastProvider'
import CookieConsent from '@/components/CookieConsent'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

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
    <html lang="zh-CN" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body
        className="min-h-screen w-full antialiased font-sans"
        style={{
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
        }}
      >
        <ToastProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">{children}</main>
          <CookieConsent />
        </ToastProvider>
      </body>
    </html>
  )
}
