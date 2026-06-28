import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 text-[#FF6B35] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse"></span>
            全网创意信号实时监控
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FFB800] to-[#FF6B35] bg-clip-text text-transparent">
              创意信号雷达
            </span>
            <br />
            <span className="text-white">+</span>
            <br />
            <span className="text-white">TRAE 自动化落地工坊</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            从创意发现到 MVP 交付，一站式完成。7×24 小时抓取全网优质信号，
            AI 评估商业可行性，30 秒生成可运行产品。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-[#FF6B35]/25">
              立即体验 Demo
            </button>
            <button className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-medium transition-colors">
              查看 GitHub
            </button>
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="py-16 px-4 border-y border-white/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#FF6B35] mb-2">9+</div>
              <div className="text-gray-400">信号源</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#FFB800] mb-2">200+</div>
              <div className="text-gray-400">每日新信号</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#3B82F6] mb-2">30s</div>
              <div className="text-gray-400">MVP 生成</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#8B5CF6] mb-2">70%</div>
              <div className="text-gray-400">Top 10 入选率</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            核心功能
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-[#FF6B35]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📡</span>
              </div>
              <h3 className="text-xl font-bold mb-2">创意雷达</h3>
              <p className="text-gray-400 text-sm">
                7×24 小时抓取 Product Hunt、Hacker News 等 9 个信号源，
                AI 自动评分排序，发现下一个爆款创意。
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-[#FFB800]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-xl font-bold mb-2">复刻工坊</h3>
              <p className="text-gray-400 text-sm">
                一键调用 TRAE IDE 生成可运行 MVP。
                配置复刻语言、改造点、自定义 Prompt，30 秒出结果。
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold mb-2">商业画布</h3>
              <p className="text-gray-400 text-sm">
                基于信号生成完整商业画布。一句话定位、用户画像、
                竞品图谱、30 天行动清单，一键导出 Notion。
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-[#8B5CF6]/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📺</span>
              </div>
              <h3 className="text-xl font-bold mb-2">公开日志</h3>
              <p className="text-gray-400 text-sm">
                Build in Public 实时流。记录从信号发现到商业变现的全过程，
                自动生成 Twitter 推文草稿。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signal List Preview */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#FF6B35]/5 to-transparent">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">实时信号</h2>
            <Link href="/radar" className="text-[#FF6B35] hover:underline">
              查看全部 →
            </Link>
          </div>
          
          {/* Mock Signal Cards */}
          <div className="grid gap-4">
            {/* Signal 1 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-[#FF6B35] text-white text-sm font-bold px-3 py-1 rounded">
                  #1
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">AI Code Review Agent</h3>
                    <span className="text-xs bg-[#3B82F6]/20 text-[#3B82F6] px-2 py-0.5 rounded">Hacker News</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    基于 GPT-4 的代码审查工具，支持自动修复和安全漏洞检测
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">热度</span>
                      <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF6B35] rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">商业</span>
                      <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FFB800] rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">创新</span>
                      <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">本地化</span>
                      <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  复刻 →
                </button>
              </div>
            </div>

            {/* Signal 2 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-[#FFB800] text-black text-sm font-bold px-3 py-1 rounded">
                  #2
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">Notion AI Workspace</h3>
                    <span className="text-xs bg-[#FF6B35]/20 text-[#FF6B35] px-2 py-0.5 rounded">Product Hunt</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    将 Notion 变成智能工作空间，自动整理笔记、生成任务、回答问题
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">热度</span>
                      <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF6B35] rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">商业</span>
                      <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FFB800] rounded-full" style={{ width: '81%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">创新</span>
                      <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">本地化</span>
                      <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: '38%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  复刻 →
                </button>
              </div>
            </div>

            {/* Signal 3 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-[#3B82F6] text-white text-sm font-bold px-3 py-1 rounded">
                  #3
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">Micro SaaS Boilerplate</h3>
                    <span className="text-xs bg-[#8B5CF6]/20 text-[#8B5CF6] px-2 py-0.5 rounded">Twitter</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    开源 SaaS 脚手架，集成支付、认证、邮件、Docker 一键部署
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">热度</span>
                      <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF6B35] rounded-full" style={{ width: '71%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">商业</span>
                      <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FFB800] rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">创新</span>
                      <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: '55%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">本地化</span>
                      <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  复刻 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            准备好开始了吗？
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            加入 1000+ 独立开发者，用 AI 发现下一个爆款创意
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-gradient-to-r from-[#FF6B35] to-[#FFB800] hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105">
              免费开始使用
            </button>
            <div className="text-gray-500 text-sm">
              无需信用卡 • 5 分钟上手
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded flex items-center justify-center text-sm font-bold">
              S
            </div>
            <span className="font-bold">SparkForge</span>
            <span className="text-gray-500 text-sm">© 2026</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">服务条款</a>
            <a href="#" className="hover:text-white transition-colors">联系我们</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
