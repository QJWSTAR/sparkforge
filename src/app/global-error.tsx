'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen w-full antialiased font-sans bg-deep-space text-ice-white">
        <main className="min-h-screen bg-ambient-glow flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl font-mono font-bold text-fog mb-4">500</div>
            <h1 className="text-2xl font-bold text-ice-white mb-4">服务出现异常</h1>
            <p className="text-fog mb-4">
              抱歉，我们的服务遇到了一个意外错误。
            </p>
            <p className="text-sm text-fog mb-8">
              我们已经收到错误报告，正在努力修复中。您可以尝试以下操作：
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="primary" size="lg" onClick={reset}>
                重试
              </Button>
              <Link href="/">
                <Button variant="secondary" size="lg">
                  返回首页
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}