'use client'

import { useState } from 'react'
import { Heart, Share2 } from 'lucide-react'
import { Button, DataCard, ContentCard, Badge } from '@/components/ui'

const mockStats = [
  {
    title: '创意信号总数',
    value: 128,
    trend: 'up' as const,
    trendValue: '+12%',
  },
  {
    title: '今日活跃度',
    value: '87%',
    trend: 'up' as const,
    trendValue: '+5%',
  },
  {
    title: '平均评分',
    value: 8.5,
    trend: 'up' as const,
    trendValue: '+0.3',
  },
]

const mockSignals = [
  {
    id: 1,
    title: 'AI 驱动的个性化学习助手',
    description: '基于大语言模型的自适应学习系统，根据学生知识图谱实时调整教学内容和难度。',
    category: 'AI',
    score: 92,
  },
  {
    id: 2,
    title: '去中心化内容创作平台',
    description: '通过区块链技术实现创作者收益透明分配，支持 NFT 化的数字资产交易。',
    category: 'Web3',
    score: 88,
  },
  {
    id: 3,
    title: '智能健康监测可穿戴设备',
    description: '集成多模态传感器的健康手环，实现无创血糖监测和疾病早期预警。',
    category: '硬件',
    score: 85,
  },
  {
    id: 4,
    title: '可持续农业无人机解决方案',
    description: '利用计算机视觉和 IoT 技术的精准农业平台，提升作物产量 30%。',
    category: '农业',
    score: 79,
  },
  {
    id: 5,
    title: '企业级低代码 AI 工作流引擎',
    description: '拖拽式 AI 工作流构建器，支持多模型编排和自动化业务流程部署。',
    category: 'SaaS',
    score: 91,
  },
]

const categoryVariantMap: Record<string, 'default' | 'success' | 'warning'> = {
  AI: 'default',
  Web3: 'warning',
  硬件: 'success',
  农业: 'success',
  SaaS: 'default',
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-deep-space relative">
      {/* Radial ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(600px at 50% 30%, rgba(77,168,255,0.04), transparent)',
        }}
      />

      {/* Main Content — navbar is provided by layout.tsx */}
      <main className="relative z-10 px-8 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockStats.map((stat) => (
            <DataCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              trendValue={stat.trendValue}
            />
          ))}
        </div>

        {/* Signal List */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-ice-white mb-4">创意信号</h2>
          <div className="flex flex-col gap-4">
            {mockSignals.map((signal) => (
              <ContentCard key={signal.id} className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-base font-semibold text-ice-white truncate">
                        {signal.title}
                      </h3>
                      <Badge variant={categoryVariantMap[signal.category]}>
                        {signal.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-fog leading-relaxed">
                      {signal.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-2xl font-bold tabular-nums text-spark-blue font-mono">
                      {signal.score}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button variant="primary" size="md">
                        一键复刻
                      </Button>
                      <Button variant="ghost" size="md" aria-label="收藏">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="md" aria-label="分享">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </ContentCard>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}