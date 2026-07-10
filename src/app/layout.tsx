import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ToastProvider } from '@/components/ToastProvider'
import CookieConsent from '@/components/CookieConsent'
import { ErrorBoundary } from '@/components/ErrorBoundary'

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
  title: {
    default: 'SparkForge - AI 驱动的创意信号雷达与一键复刻工坊',
    template: '%s | SparkForge',
  },
  description:
    '全网创意信号雷达 + AI 自动化落地工坊。7×24 小时监控 7 个灵感源，AI 评分排序，一键生成技术方案，帮助独立开发者从灵感到落地只需 24 小时。',
  keywords: ['SparkForge', '创意信号', 'AI 开发', '独立开发者', '方案生成', 'Next.js'],
  authors: [{ name: 'SparkForge Team' }],
  creator: 'SparkForge',
  publisher: 'SparkForge',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sparkforge-blush.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SparkForge - AI 驱动的创意信号雷达与一键复刻工坊',
    description:
      '全网创意信号雷达 + AI 自动化落地工坊。从灵感到落地，只需 24 小时。',
    url: '/',
    siteName: 'SparkForge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SparkForge - From spark to shipped, in 24 hours.',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SparkForge - AI 驱动的创意信号雷达与一键复刻工坊',
    description:
      '全网创意信号雷达 + AI 自动化落地工坊。从灵感到落地，只需 24 小时。',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A1628',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'SparkForge',
              description:
                'AI 驱动的创意信号发现与方案生成平台。7×24 小时监控全球灵感源，AI 评分排序，一键生成技术方案。',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sparkforge-blush.vercel.app',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              author: {
                '@type': 'Organization',
                name: 'SparkForge Team',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen w-full antialiased font-sans bg-deep-space text-ice-white" suppressHydrationWarning>
        <ErrorBoundary>
          <ToastProvider>
            <Navbar />
            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">{children}</main>
            <CookieConsent />
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
