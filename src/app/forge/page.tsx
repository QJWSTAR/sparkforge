'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { mockSignals } from '@/data/mockSignals'
import type { Signal } from '@/types/signal'

export default function ForgePage() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [selectedSignal, setSelectedSignal] = useState<Signal>(mockSignals[0])
  const [targetLanguage, setTargetLanguage] = useState('zh-CN')
  const [customPrompt, setCustomPrompt] = useState('')
  const [isForging, setIsForging] = useState(false)
  const [forgeProgress, setForgeProgress] = useState(0)
  const [forgeComplete, setForgeComplete] = useState(false)
  const [forgeResult, setForgeResult] = useState<any>({
    outputUrl: '',
    outputSummary: '',
    localScore: 85,
  })

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const res = await fetch('/api/signals?limit=20&sortBy=score')
        const data = await res.json()

        if (data.success && data.data?.length > 0) {
          setSignals(data.data)
          setSelectedSignal(data.data[0])
        }
      } catch (error) {
        console.error('Failed to fetch signals:', error)
      }
    }

    fetchSignals()
  }, [])

  const handleStartForge = () => {
    setIsForging(true)
    setForgeProgress(0)
    setForgeComplete(false)

    const steps = [
      { progress: 10, message: '分析信号分析中...' },
      { progress: 25, message: '生成项目结构...' },
      { progress: 45, message: '编写核心代码...' },
      { progress: 65, message: '本地化改造...' },
      { progress: 80, message: '配置部署配置...' },
      { progress: 95, message: '最终检查...' },
      { progress: 100, message: '完成！' },
    ]

    let stepIndex = 0
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
      setForgeProgress(steps[stepIndex].progress)
      stepIndex++
      } else {
      clearInterval(interval)
      setIsForging(false)
      setForgeComplete(true)
      }
    }, 800)
  }

  const languages = [
    { value: 'zh-CN', label: '简体中文' },
    { value: 'zh-TW', label: '繁體中文' },
    { value: 'en-US', label: 'English' },
    { value: 'ja-JP', label: '日本語' },
  ]

  const transformPoints = [
    { id: 1, label: '中文界面适配', checked: true },
    { id: 2, label: '国内支付接入', checked: true },
    { id: 3, label: '微信/QQ 登录', checked: true },
    { id: 4, label: '国内云服务部署', checked: false },
    { id: 5, label: '数据本地化存储', checked: false },
    { id: 6, label: '合规隐私调整', checked: true },
  ]

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            复刻工坊
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            一键调用 TRAE IDE 生成可运行 MVP，支持本地化改造和自定义配置
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              📦 选择信号
            </h2>
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: 'var(--color-bg-hover)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-primary), var(--state-warning))',
                  }}
                >
                  🚀
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--color-text)' }}>
                    {selectedSignal.title}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    {selectedSignal.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSignal.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: 'var(--color-bg-active)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/radar"
                  style={{ color: 'var(--color-text-muted)' }}
                  className="hover:text-white"
                >
                  更换
                </Link>
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
              ⚙️ 复刻配置
            </h2>
            
            <div className="space-y-5">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  目标语言
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => setTargetLanguage(lang.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors`}
                      style={{
                        backgroundColor:
                          targetLanguage === lang.value
                            ? 'var(--color-primary)'
                            : 'var(--color-bg-hover)',
                        color:
                          targetLanguage === lang.value
                            ? 'var(--color-text-inverse)'
                            : 'var(--color-text-secondary)',
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  本地化改造点
                </label>
                <div className="space-y-2">
                  {transformPoints.map((point) => (
                    <label
                      key={point.id}
                      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer"
                      style={{ backgroundColor: 'var(--color-bg-hover)' }}
                    >
                      <input
                        type="checkbox"
                        defaultChecked={point.checked}
                        className="w-4 h-4 rounded"
                        style={{
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-bg-active)',
                          color: 'var(--color-primary)',
                        }}
                      />
                      <span className="text-sm" style={{ color: 'var(--color-text)' }}>
                        {point.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  自定义 Prompt（可选）
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="描述你想要的特殊需求，例如：增加深色模式、支持移动端、使用 Vue 框架..."
                  className="w-full rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none resize-none h-24"
                  style={{
                    backgroundColor: 'var(--color-bg-hover)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>
            </div>
          </div>

          {isForging && (
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                🔨 复刻进度
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    生成中...
                  </span>
                  <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                    {forgeProgress}%
                  </span>
                </div>
                <div
                  className="h-3 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--color-bg-active)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${forgeProgress}%`,
                      background:
                        'linear-gradient(90deg, var(--color-primary), var(--state-warning))',
                    }}
                  />
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {['分析', '结构', '代码', '本地化', '部署', '完成'].map((step, index) => (
                    <div key={step} className="text-center">
                      <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold mb-1`}
                        style={{
                          backgroundColor:
                            forgeProgress >= (index + 1) * 15
                              ? 'var(--color-primary)'
                              : 'var(--color-bg-active)',
                          color:
                            forgeProgress >= (index + 1) * 15
                              ? 'var(--color-text-inverse)'
                              : 'var(--color-text-muted)',
                        }}
                      >
                        {forgeProgress >= (index + 1) * 15 ? '✓' : index + 1}
                      </div>
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {forgeComplete && (
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)' }}
                >
                  ✅
                </div>
                <div>
                  <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                    复刻完成！
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    MVP 已成功生成，快来查看吧
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: 'var(--color-bg-hover)' }}
                >
                  <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    本地化改造度
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: 'var(--state-success)' }}
                  >
                    {forgeResult.localScore}%
                  </div>
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: 'var(--color-bg-hover)' }}
                >
                  <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    生成时长
                  </div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                    28秒
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-4 mb-4"
                style={{ backgroundColor: 'var(--color-bg-active)' }}
              >
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  生成摘要
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                  已完成对 {selectedSignal.title} 的本地化复刻。适配了中文界面、接入微信登录、
                  优化了国内访问速度，并增加了深色模式支持。
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 py-3 rounded-xl font-bold transition-colors"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-text-inverse)',
                  }}
                >
                  查看 Demo
                </button>
                <button
                  className="flex-1 py-3 rounded-xl font-medium transition-colors"
                  style={{
                    backgroundColor: 'var(--color-bg-hover)',
                    color: 'var(--color-text)',
                  }}
                >
                  下载源码
                </button>
              </div>
            </div>
          )}
        </div>

          <div className="space-y-6">
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3 className="font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                🎯 预估效果
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: 'var(--color-text-secondary)' }}>本地化改造度</span>
                    <span style={{ color: 'var(--color-dim-novelty)' }} className="font-medium">
                      85%
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--color-bg-active)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: '85%', backgroundColor: 'var(--color-dim-novelty)' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: 'var(--color-text-secondary)' }}>预计生成时间</span>
                    <span style={{ color: 'var(--state-warning)' }} className="font-medium">
                      30-60 秒
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: 'var(--color-text-secondary)' }}>技术栈</span>
                    <span style={{ color: 'var(--state-info)' }} className="font-medium">
                      Next.js + Tailwind
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3 className="font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                💰 定价
              </h3>
              <div className="space-y-3">
                <div
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--color-bg-hover)' }}
                >
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      单次复刻
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      适合偶尔使用
                    </div>
                  </div>
                  <div className="font-bold" style={{ color: 'var(--color-primary)' }}>
                    ¥9.9
                  </div>
                </div>
                <div
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{
                    backgroundColor: 'var(--color-primary-muted)',
                    border: '1px solid rgba(255, 107, 53, 0.3)',
                  }}
                >
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      Pro 会员
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      无限复刻 + 优先队列
                    </div>
                  </div>
                  <div className="font-bold" style={{ color: 'var(--color-primary)' }}>
                    ¥99/月
                  </div>
                </div>
              </div>
            </div>

            {!isForging && !forgeComplete && (
              <button
                onClick={handleStartForge}
                className="w-full py-4 rounded-xl font-bold text-lg transition-all"
                style={{
                  background:
                    'linear-gradient(90deg, var(--color-primary), var(--state-warning))',
                  color: 'var(--color-text-inverse)',
                }}
              >
                🚀 开始复刻
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}