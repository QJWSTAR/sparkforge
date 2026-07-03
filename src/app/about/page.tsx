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
    description: '7×24 小时实时监控 9+ 灵感源，覆盖 Product Hunt、Hacker News、即刻等平台',
  },
  {
    icon: <Flame className="w-6 h-6 text-spark-blue" />,
    title: '生成方案',
    description: '一键调用 TRAE IDE 生成 MVP，配置技术栈、自定义提示词，30 秒出结果',
  },
  {
    icon: <ClipboardList className="w-6 h-6 text-spark-blue" />,
    title: '分析画布',
    description: '基于信号生成完整商业模型，含 SWOT 分析、竞品分析和 30 天行动清单',
  },
  {
    icon: <Tv className="w-6 h-6 text-spark-blue" />,
    title: '动态广场',
    description: '公开记录你的创意开发历程，从信号发现到商业化的完整旅程',
  },
]

const howItWorks = [
  {
    step: '01',
    title: '发现信号',
    description: '创意雷达持续扫描全网，捕捉新兴创意和热门产品',
  },
  {
    step: '02',
    title: 'AI 评分',
    description: '多维度自动评分：热度、新颖度、商业潜力、本地化潜力',
  },
  {
    step: '03',
    title: '生成 MVP',
    description: '选择信号，使用 TRAE IDE 一键生成可运行的原型',
  },
  {
    step: '04',
    title: '上线迭代',
    description: '部署到生产环境，基于真实用户反馈持续迭代',
  },
]

const projectHistory = [
  { date: '2026 Q1', event: '项目启动，创意信号检测技术调研' },
  { date: '2026 Q2', event: 'MVP 开发，Next.js + Supabase 技术栈集成' },
  { date: '2026 Q3', event: 'TRAE IDE 集成，实现自动化 MVP 生成' },
  { date: '2026 Q4', event: '正式发布，社区建设与用户增长' },
]

const roadmap = [
  {
    phase: '第一阶段',
    title: '信号源扩展',
    items: ['新增 5+ 灵感源', '高级筛选与搜索', '自定义告警规则'],
    inProgress: true,
  },
  {
    phase: '第二阶段',
    title: 'AI 能力增强',
    items: ['趋势预测分析', '自动化竞品研究', '市场规模估算'],
    inProgress: false,
  },
  {
    phase: '第三阶段',
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
            SparkForge 是一个连接创意发现与 MVP 落地的综合平台。
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