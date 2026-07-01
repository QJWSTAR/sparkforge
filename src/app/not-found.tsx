import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div
          className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--state-warning))',
          }}
        >
          🤔
        </div>
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: 'var(--color-text)' }}
        >
          页面未找到
        </h1>
        <p
          className="text-lg mb-8"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          抱歉，您访问的页面不存在或已被移动。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 btn-press"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text-inverse)',
            }}
          >
            返回首页
          </Link>
          <Link
            href="/radar"
            className="px-6 py-3 rounded-xl font-medium transition-colors btn-press"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            浏览创意雷达
          </Link>
        </div>
        <div
          className="mt-12 p-4 rounded-xl"
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            常见页面：
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
            <Link href="/" className="text-sm hover:underline" style={{ color: 'var(--color-primary)' }}>
              首页
            </Link>
            <span style={{ color: 'var(--color-text-muted)' }}>|</span>
            <Link href="/radar" className="text-sm hover:underline" style={{ color: 'var(--color-primary)' }}>
              创意雷达
            </Link>
            <span style={{ color: 'var(--color-text-muted)' }}>|</span>
            <Link href="/forge" className="text-sm hover:underline" style={{ color: 'var(--color-primary)' }}>
              复刻工坊
            </Link>
            <span style={{ color: 'var(--color-text-muted)' }}>|</span>
            <Link href="/canvas" className="text-sm hover:underline" style={{ color: 'var(--color-primary)' }}>
              商业画布
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}