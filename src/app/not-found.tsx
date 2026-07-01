import Link from 'next/link'
import { Button } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-mono font-bold text-fog mb-4">404</div>
        <h1 className="text-2xl font-bold text-ice-white mb-4">页面未找到</h1>
        <p className="text-fog mb-8">
          抱歉，您访问的页面不存在或已被移动。
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            返回首页
          </Button>
        </Link>
      </div>
    </div>
  )
}