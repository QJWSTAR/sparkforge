'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-ambient-glow flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-graphite flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold text-ice-white mb-4">页面出现错误</h1>
            <p className="text-base text-fog mb-4">
              页面渲染过程中遇到了意外错误，请尝试刷新页面。
            </p>
            <p className="text-sm text-fog mb-8">
              {this.state.error?.message || '未知错误'}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="primary" onClick={this.handleReset}>
                重试
              </Button>
              <Button variant="secondary" onClick={() => window.location.reload()}>
                刷新页面
              </Button>
              <Link href="/">
                <Button variant="ghost">
                  返回首页
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}