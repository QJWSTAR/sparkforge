'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockSignals } from '@/data/mockSignals'

export default function ForgePage() {
  const [selectedSignal, setSelectedSignal] = useState(mockSignals[0])
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
      <header className="border-b border-white/10 sticky top-0 z-10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-lg flex items-center justify-center font-bold">
              S
            </div>
            <span className="text-xl font-bold">SparkForge</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">首页</Link>
            <Link href="/radar" className="text-gray-400 hover:text-white transition-colors">创意雷达</Link>
            <Link href="/forge" className="text-[#FF6B35] font-medium">复刻工坊</Link>
            <Link href="/canvas" className="text-gray-400 hover:text-white transition-colors">商业画布</Link>
            <Link href="/stream" className="text-gray-400 hover:text-white transition-colors">公开日志</Link>
          </nav>
          <button className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
            开始复刻
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">复刻工坊</h1>
          <p className="text-gray-400">
            一键调用 TRAE IDE 生成可运行 MVP，支持本地化改造和自定义配置
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">📦 选择信号</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  🚀
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{selectedSignal.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{selectedSignal.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSignal.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="text-gray-500 hover:text-white">
                  更换
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">⚙️ 复刻配置</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">目标语言</label>
                <div className="grid grid-cols-4 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => setTargetLanguage(lang.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        targetLanguage === lang.value
                          ? 'bg-[#FF6B35] text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">本地化改造点</label>
                <div className="space-y-2">
                  {transformPoints.map((point) => (
                    <label key={point.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={point.checked}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#FF6B35] focus:ring-[#FF6B35] focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-300">{point.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">自定义 Prompt（可选）</label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="描述你想要的特殊需求，例如：增加深色模式、支持移动端、使用 Vue 框架..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B35]/50 transition-colors resize-none h-24 text-sm"
                />
              </div>
            </div>
          </div>

          {isForging && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">🔨 复刻进度</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">生成中...</span>
                  <span className="text-sm font-bold text-[#FF6B35]">{forgeProgress}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FFB800] rounded-full transition-all duration-500"
                    style={{ width: `${forgeProgress}%` }}
                  />
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {['分析', '结构', '代码', '本地化', '部署', '完成'].map((step, index) => (
                    <div key={step} className="text-center">
                      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                        forgeProgress >= (index + 1) * 15
                          ? 'bg-[#FF6B35] text-white'
                          : 'bg-white/10 text-gray-500'
                      }`}>
                        {forgeProgress >= (index + 1) * 15 ? '✓' : index + 1}
                      </div>
                      <span className="text-xs text-gray-500">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {forgeComplete && (
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-2xl">
                  ✅
                </div>
                <div>
                  <h2 className="text-lg font-bold">复刻完成！</h2>
                  <p className="text-gray-400 text-sm">MVP 已成功生成，快来查看吧</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">本地化改造度</div>
                  <div className="text-2xl font-bold text-green-400">{forgeResult.localScore}%</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-sm text-gray-500 mb-1">生成时长</div>
                  <div className="text-2xl font-bold text-[#FF6B35]">28秒</div>
                </div>
              </div>

              <div className="bg-black/30 rounded-xl p-4 mb-4">
                <div className="text-sm text-gray-400 mb-2">生成摘要</div>
                <p className="text-sm text-gray-300">
                  已完成对 {selectedSignal.title} 的本地化复刻。适配了中文界面、接入微信登录、
                  优化了国内访问速度，并增加了深色模式支持。
                </p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-[#FF6B35] hover:bg-[#FF5722] text-white py-3 rounded-xl font-bold transition-colors">
                  查看 Demo
                </button>
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-colors">
                  下载源码
                </button>
              </div>
            </div>
          )}
        </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold mb-4">🎯 预估效果</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">本地化改造度</span>
                    <span className="text-[#8B5CF6] font-medium">85%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">预计生成时间</span>
                    <span className="text-[#FFB800] font-medium">30-60 秒</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">技术栈</span>
                    <span className="text-[#3B82F6] font-medium">Next.js + Tailwind</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold mb-4">💰 定价</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-sm font-medium">单次复刻</div>
                    <div className="text-xs text-gray-500">适合偶尔使用</div>
                  </div>
                  <div className="text-[#FF6B35] font-bold">¥9.9</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-lg">
                  <div>
                    <div className="text-sm font-medium">Pro 会员</div>
                    <div className="text-xs text-gray-500">无限复刻 + 优先队列</div>
                  </div>
                  <div className="text-[#FF6B35] font-bold">¥99/月</div>
                </div>
              </div>
            </div>

            {!isForging && !forgeComplete && (
              <button
                onClick={handleStartForge}
                className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FFB800] hover:opacity-90 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] shadow-lg shadow-[#FF6B35]/25"
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
