'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CanvasPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState(true)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setGenerated(true)
    }, 2000)
  }

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
            <Link href="/canvas" className="text-[#FF6B35] font-medium">商业画布</Link>
            <Link href="/stream" className="text-gray-400 hover:text-white transition-colors">公开日志</Link>
          </nav>
          <button className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
            生成画布
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">商业画布</h1>
          <p className="text-gray-400">
            基于信号生成完整商业画布，一句话定位、用户画像、竞品图谱、行动清单
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">📋 商业模型画布</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    导出 Notion
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    重新生成
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-4">
                  <div className="bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-xl p-4">
                    <h3 className="font-bold text-[#FF6B35] mb-2">🎯 一句话定位</h3>
                    <p className="text-sm text-gray-300">
                      AI Code Review Agent 是一个基于 GPT-4 的智能代码审查工具，
                      帮助开发团队自动发现代码缺陷、安全漏洞和性能问题。
                    </p>
                  </div>
                  <div className="bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-xl p-4">
                    <h3 className="font-bold text-[#3B82F6] mb-2">👥 用户画像</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• 中小型开发团队 Tech Lead</li>
                      <li>• 独立开发者 / 自由职业者</li>
                      <li>• 开源项目维护者</li>
                      <li>• 技术教育机构</li>
                    </ul>
                  </div>
                  <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-xl p-4">
                    <h3 className="font-bold text-[#8B5CF6] mb-2">💰 收入来源</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• SaaS 订阅：$19/月/开发者</li>
                      <li>• 团队版：$49/月/开发者</li>
                      <li>• 企业版：定制报价</li>
                      <li>• Open Source 赞助</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#FFB800]/10 border border-[#FFB800]/20 rounded-xl p-4">
                    <h3 className="font-bold text-[#FFB800] mb-2">🔥 核心价值</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• 节省 60% 代码审查时间</li>
                      <li>• 提前发现 80% 安全漏洞</li>
                      <li>• 统一团队代码规范</li>
                      <li>• 降低线上 Bug 率</li>
                    </ul>
                  </div>
                  <div className="bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl p-4 col-span-2">
                    <h3 className="font-bold text-[#10B981] mb-2">⚡ 核心竞争力</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• 支持多语言：JS/TS/Python/Go/Rust</li>
                      <li>• 自定义审查规则，灵活配置</li>
                      <li>• GitHub/GitLab/Bitbucket 全集成</li>
                      <li>• 本地化部署，数据安全</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl p-4">
                    <h3 className="font-bold text-[#EF4444] mb-2">⚠️ 竞品图谱</h3>
                    <div className="space-y-2">
                      <div className="text-xs">
                        <div className="flex justify-between text-gray-400">
                          <span>SonarQube</span>
                          <span>传统静态分析</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full mt-1">
                          <div className="h-full bg-gray-500 rounded-full" style={{ width: '70%' }} />
                        </div>
                      </div>
                      <div className="text-xs">
                        <div className="flex justify-between text-gray-400">
                          <span>CodeGuru</span>
                          <span>AWS 生态</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full mt-1">
                          <div className="h-full bg-gray-500 rounded-full" style={{ width: '55%' }} />
                        </div>
                      </div>
                      <div className="text-xs">
                        <div className="flex justify-between text-gray-400">
                          <span>DeepCode</span>
                          <span>AI 新秀</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full mt-1">
                          <div className="h-full bg-gray-500 rounded-full" style={{ width: '45%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4">
                    <h3 className="font-bold text-pink-400 mb-2">📅 30 天行动清单</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Day 1-7: MVP 开发与内测</li>
                      <li>• Day 8-14: Product Hunt 发布</li>
                      <li>• Day 15-21: 种子用户获取</li>
                      <li>• Day 22-30: 付费转化验证</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">📊 SWOT 分析</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                  <h3 className="font-bold text-green-400 mb-2">💪 优势 (Strengths)</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• AI 驱动，准确率高于传统工具</li>
                    <li>• 多语言支持，覆盖面广</li>
                    <li>• 开箱即用，集成简单</li>
                  </ul>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                  <h3 className="font-bold text-yellow-400 mb-2">⚠️ 劣势 (Weaknesses)</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• LLM 成本较高</li>
                    <li>• 误报率需要持续优化</li>
                    <li>• 品牌认知度低</li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <h3 className="font-bold text-blue-400 mb-2">🚀 机会 (Opportunities)</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• AI 代码工具赛道火热</li>
                    <li>• 远程办公增加代码审查需求</li>
                    <li>• 开源社区生态红利</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <h3 className="font-bold text-red-400 mb-2">🔥 威胁 (Threats)</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• 大厂可能入局</li>
                    <li>• LLM 价格战风险</li>
                    <li>• 数据安全合规风险</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold mb-4">🎯 当前信号</h3>
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="font-semibold mb-2">AI Code Review Agent</h4>
                <p className="text-sm text-gray-400 mb-3">基于 GPT-4 的代码审查工具</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#FF6B35] font-bold">综合评分 78</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-500">Hacker News</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FFB800] hover:opacity-90 disabled:opacity-50 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#FF6B35]/25"
            >
              {isGenerating ? '生成中...' : '✨ 生成商业画布'}
            </button>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold mb-4">💡 小贴士</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• 画布基于 AI 生成，仅供参考</li>
                <li>• 建议结合实际市场调研验证</li>
                <li>• 可以导出 Notion 进一步完善</li>
                <li>• 支持多次生成，择优选择</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
