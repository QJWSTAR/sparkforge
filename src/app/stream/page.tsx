'use client'

import { useState } from 'react'
import Link from 'next/link'

const mockLogs = [
  {
    id: 1,
    type: 'SIGNAL_DISCOVERED',
    title: '发现新信号：AI Code Review Agent',
    content: '在 Hacker News 发现一个高热度 AI 代码审查项目，当前热度 85 分。',
    time: '2 分钟前',
    source: 'Hacker News',
  },
  {
    id: 2,
    type: 'SIGNAL_SCORED',
    title: 'AI 评分完成：综合 78 分',
    content: '热度 85 | 创新 72 | 商业 78 | 本地化 45',
    time: '5 分钟前',
    source: 'DeepSeek',
  },
  {
    id: 3,
    type: 'SIGNAL_TOP10',
    title: '入选今日 Top 10',
    content: 'AI Code Review Agent 以 78 分入选今日 Top 10 榜单，排名第 1。',
    time: '8 分钟前',
    source: 'SparkForge',
  },
  {
    id: 4,
    type: 'FORGE_STARTED',
    title: '开始复刻：Notion AI Workspace',
    content: '用户发起复刻任务，目标语言：简体中文，预计耗时 30-60 秒。',
    time: '12 分钟前',
    source: 'TRAE IDE',
  },
  {
    id: 5,
    type: 'FORGE_PROGRESS',
    title: '复刻进度 45%',
    content: '正在编写核心代码...',
    time: '15 分钟前',
    source: 'TRAE IDE',
  },
  {
    id: 6,
    type: 'FORGE_COMPLETED',
    title: '复刻完成！',
    content: 'Notion AI Workspace 本地版已生成，本地化改造度 85%，耗时 47 秒。',
    time: '18 分钟前',
    source: 'TRAE IDE',
  },
  {
    id: 7,
    type: 'CANVAS_GENERATED',
    title: '商业画布生成完成',
    content: '已为 Micro SaaS Boilerplate 生成完整商业画布，包含 SWOT 分析和 30 天行动清单。',
    time: '25 分钟前',
    source: 'GPT-4',
  },
  {
    id: 8,
    type: 'SYSTEM',
    title: '每日抓取完成',
    content: '今日共抓取 247 条新信号，其中 12 条通过粗筛进入评分队列。',
    time: '1 小时前',
    source: '系统',
  },
]

export default function StreamPage() {
  const [filter, setFilter] = useState('all')

  const typeIcons: Record<string, string> = {
    SIGNAL_DISCOVERED: '📡',
    SIGNAL_SCORED: '🔍',
    SIGNAL_TOP10: '🏆',
    FORGE_STARTED: '🔨',
    FORGE_PROGRESS: '⚙️',
    FORGE_COMPLETED: '✅',
    CANVAS_GENERATED: '📋',
    SYSTEM: '🤖',
  }

  const typeColors: Record<string, string> = {
    SIGNAL_DISCOVERED: 'border-blue-500/30 bg-blue-500/5',
    SIGNAL_SCORED: 'border-purple-500/30 bg-purple-500/5',
    SIGNAL_TOP10: 'border-yellow-500/30 bg-yellow-500/5',
    FORGE_STARTED: 'border-orange-500/30 bg-orange-500/5',
    FORGE_PROGRESS: 'border-orange-500/30 bg-orange-500/5',
    FORGE_COMPLETED: 'border-green-500/30 bg-green-500/5',
    CANVAS_GENERATED: 'border-pink-500/30 bg-pink-500/5',
    SYSTEM: 'border-gray-500/30 bg-gray-500/5',
  }

  const filters = [
    { value: 'all', label: '全部' },
    { value: 'SIGNAL', label: '信号发现' },
    { value: 'FORGE', label: '复刻记录' },
    { value: 'CANVAS', label: '画布生成' },
    { value: 'SYSTEM', label: '系统消息' },
  ]

  const filteredLogs = mockLogs.filter(log => {
    if (filter === 'all') return true
    return log.type.startsWith(filter)
  })

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
            <Link href="/forge" className="text-gray-400 hover:text-white transition-colors">复刻工坊</Link>
            <Link href="/canvas" className="text-gray-400 hover:text-white transition-colors">商业画布</Link>
            <Link href="/stream" className="text-[#FF6B35] font-medium">公开日志</Link>
          </nav>
          <button className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
            关注我们
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">公开日志</h1>
            <span className="flex items-center gap-1.5 text-sm text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              实时更新
            </span>
          </div>
          <p className="text-gray-400">
            Build in Public — 记录 SparkForge 从 0 到 1 的全过程
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f.value
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="relative pl-16">
                <div className="absolute left-0 top-4 w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-white/10 flex items-center justify-center text-xl z-10">
                  {typeIcons[log.type]}
                </div>

                <div className={`border rounded-xl p-4 ${typeColors[log.type] || 'border-white/10 bg-white/5'}`}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold">{log.title}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">{log.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{log.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">来源：{log.source}</span>
                    <button className="text-xs text-[#FF6B35] hover:underline">
                      分享 →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="w-10 h-10 bg-[#1DA1F2]/20 rounded-full flex items-center justify-center text-xl">
              𝕏
            </div>
            <div className="text-left">
              <div className="font-bold">关注 Twitter 获取实时更新</div>
              <div className="text-sm text-gray-400">@sparkforge_ai</div>
            </div>
            <button className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              关注
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
