import Link from 'next/link'
import { Button, ContentCard, Badge } from '@/components/ui'
import { ArrowRight, ExternalLink, Mail, Radio, Flame, ClipboardList, Tv, Zap, Globe, Database, Cloud, Rocket } from 'lucide-react'

const techStack = [
  {
    name: 'Next.js',
    icon: <Globe className="w-6 h-6 text-ice-white" />,
    description: '基于 App Router 和 Server Components 的全栈 React 框架，支持边缘运行时',
    features: ['App Router', 'Server Components', 'Edge Functions', 'SSG/ISR'],
  },
  {
    name: 'Supabase',
    icon: <Database className="w-6 h-6 text-ice-white" />,
    description: '开源 Firebase 替代方案，提供 PostgreSQL 数据库、认证和实时订阅',
    features: ['PostgreSQL', 'Auth', 'Real-time', 'Storage'],
  },
  {
    name: 'Cloudflare',
    icon: <Cloud className="w-6 h-6 text-ice-white" />,
    description: '全球边缘网络，300+ 数据中心提供 CDN、缓存和无服务器函数',
    features: ['CDN', 'Workers', 'KV Store', 'Zero Trust'],
  },
  {
    name: 'Vercel',
    icon: <Rocket className="w-6 h-6 text-ice-white" />,
    description: '前端云平台，支持自动部署、预览环境和边缘网络',
    features: ['Git 集成', '预览部署', 'Edge Network', 'Analytics'],
  },
]

const features = [
  {
    icon: <Radio className="w-6 h-6 text-spark-blue" />,
    title: '发现创意',
    description: '7×24 小时监控 7 个灵感源，覆盖 Product Hunt、Hacker News、GitHub 等平台',
  },
  {
    icon: <Flame className="w-6 h-6 text-spark-blue" />,
    title: 'AI 评分',
    description: '多维度自动评分：新颖度、商业潜力、本地化潜力，智能排序优先展示',
  },
  {
    icon: <ClipboardList className="w-6 h-6 text-spark-blue" />,
    title: '生成方案',
    description: '基于 DeepSeek AI 生成技术方案，含技术栈推荐、核心功能拆解和本地化建议',
  },
  {
    icon: <Tv className="w-6 h-6 text-spark-blue" />,
    title: '商业画布',
    description: '自动生成商业模型分析，帮助评估创意商业化可行性',
  },
]

const howItWorks = [
  {
    step: '01',
    title: '发现信号',
    description: '创意雷达持续扫描 7 个灵感源，每日自动抓取最新创意信号',
  },
  {
    step: '02',
    title: 'AI 评分',
    description: 'DeepSeek AI 多维度评分：新颖度、商业潜力、本地化潜力',
  },
  {
    step: '03',
    title: '生成方案',
    description: '选择信号，AI 自动生成技术方案和本地化改造建议',
  },
  {
    step: '04',
    title: '商业分析',
    description: '生成商业画布，评估创意的商业化可行性和市场机会',
  },
]

const projectHistory = [
  { date: '2026 Q2', event: '项目启动，Next.js + Supabase 技术栈搭建' },
  { date: '2026 Q3', event: '核心功能开发：信号抓取、AI 评分、方案生成' },
  { date: '2026 Q3 末', event: '7 个信号源接入，DeepSeek AI 评分流水线上线' },
  { date: '2026 Q4', event: '正式发布，社区功能与用户增长' },
]

const roadmap = [
  {
    phase: '已完成',
    title: '信号源扩展',
    items: ['7 个灵感源接入', '高级筛选与搜索', 'AI 自动评分'],
    inProgress: false,
  },
  {
    phase: '进行中',
    title: 'AI 能力增强',
    items: ['商业画布分析', 'SWOT 分析', '技术方案优化'],
    inProgress: true,
  },
  {
    phase: '即将推出',
    title: '社区功能',
    items: ['信号分享与讨论', '协作生成', '排行榜'],
    inProgress: false,
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ambient-glow">
      {/* Hero */}
      <section className="py-16 md:py-24 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-spark-blue/10 border border-spark-blue/20 text-sm font-medium text-spark-blue mb-8">
            <span className="w-2 h-2 rounded-full bg-spark-blue animate-pulse" />
            关于 SparkForge
          </div>
          <h1 className="text-[32px] md:text-5xl font-bold text-ice-white mb-8 leading-tight">
            构建创意发现的
            <br />
            <span className="bg-gradient-to-r from-spark-blue via-state-warning to-spark-blue bg-clip-text text-transparent">
              下一代平台
            </span>
          </h1>
          <p className="text-base text-fog max-w-2xl mx-auto mb-8">
            SparkForge 是一个连接创意发现与方案落地的综合平台。
            我们的使命是帮助独立开发者以前所未有的速度将创意变为现实。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button variant="primary" size="lg">
                免费开始
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/radar">
              <Button variant="secondary" size="lg">
                浏览创意信号
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 bg-graphite/30 border-y border-border-line">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-ice-white text-center mb-12">
            技术栈
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <ContentCard key={tech.name} className="p-6">
                <div className="w-12 h-12 rounded-xl bg-spark-blue/10 flex items-center justify-center mb-4 text-2xl">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-bold text-ice-white mb-2">{tech.name}</h3>
                <p className="text-sm text-fog mb-4">{tech.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tech.features.map((f) => (
                    <Badge key={f} variant="default" size="sm">{f}</Badge>
                  ))}
                </div>
              </ContentCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-ice-white text-center mb-12">
            功能概览
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <ContentCard key={f.title} className="p-6">
                <div className="w-12 h-12 rounded-xl bg-spark-blue/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">{f.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-ice-white mb-2">{f.title}</h3>
                <p className="text-sm text-fog">{f.description}</p>
              </ContentCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-graphite/30 border-y border-border-line">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-ice-white text-center mb-12">
            使用流程
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {howItWorks.map((item) => (
              <ContentCard key={item.step} className="p-6 relative">
                <div className="text-4xl font-bold text-spark-blue/20 mb-4 font-mono">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-ice-white mb-2">{item.title}</h3>
                <p className="text-sm text-fog">{item.description}</p>
              </ContentCard>
            ))}
          </div>
        </div>
      </section>

      {/* Project History */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-ice-white text-center mb-12">
            项目历程
          </h2>
          <div className="space-y-4">
            {projectHistory.map((item, i) => (
              <div key={item.date} className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-spark-blue flex items-center justify-center text-xs font-bold text-white">
                  {i + 1}
                </div>
                <ContentCard className="flex-1 p-4">
                  <h3 className="text-sm font-bold text-spark-blue mb-1">{item.date}</h3>
                  <p className="text-sm text-fog">{item.event}</p>
                </ContentCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 px-4 bg-graphite/30 border-y border-border-line">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-ice-white text-center mb-12">
            路线图
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roadmap.map((item) => (
              <ContentCard key={item.phase} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={item.inProgress ? 'default' : 'default'} size="sm">
                    {item.inProgress ? '进行中' : '即将推出'}
                  </Badge>
                  <span className="text-xs text-fog">{item.phase}</span>
                </div>
                <h3 className="text-lg font-bold text-ice-white mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((li) => (
                    <li key={li} className="flex items-start gap-2 text-sm text-fog">
                      <span className="shrink-0 w-4 h-4 rounded-full bg-spark-blue/20 flex items-center justify-center text-[10px] text-spark-blue mt-0.5">
                        {item.inProgress ? '✓' : '○'}
                      </span>
                      {li}
                    </li>
                  ))}
                </ul>
              </ContentCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-ice-white text-center mb-12">
            联系我们
          </h2>
          <ContentCard className="p-8 text-center">
            <p className="text-base text-fog mb-8">
              有问题、建议或想合作？欢迎随时联系我们
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:hello@sparkforge.dev">
                <Button variant="primary">
                  <Mail className="w-4 h-4" />
                  发送邮件
                </Button>
              </a>
              <a
                href="https://github.com/QJWSTAR/sparkforge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary">
                  <ExternalLink className="w-4 h-4" />
                  GitHub
                </Button>
              </a>
            </div>
          </ContentCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border-line">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-spark-blue">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
            <span className="font-bold text-ice-white">SparkForge</span>
            <span className="text-sm text-fog">© 2026</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-fog">
            <Link href="/privacy" className="hover:text-ice-white transition-colors">
              隐私政策
            </Link>
            <Link href="/terms" className="hover:text-ice-white transition-colors">
              服务条款
            </Link>
            <a
              href="https://github.com/QJWSTAR/sparkforge/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ice-white transition-colors"
            >
              联系我们
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}