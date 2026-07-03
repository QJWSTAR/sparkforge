# SparkForge（火花工坊）

**From spark to shipped, in 24 hours.**

AI 驱动的创意信号雷达 + TRAE 自动化落地工坊，帮助独立开发者从创意到 MVP 一站式完成。

## 设计系统

**冰焰（Icy Flame）** — 淡蓝色思维火花，主色 `#4DA8FF`，暗色背景 `#0A0E14`。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS v4
- **语言**: TypeScript
- **数据库**: Supabase (PostgreSQL)
- **图标**: Lucide React
- **AI**: DeepSeek API
- **部署**: Vercel

## 环境变量

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务角色密钥 |
| `DEEPSEEK_API_KEY` | DeepSeek API 密钥 |
| `ALGOLIA_API_KEY` | Algolia 搜索密钥 |
| `PRODUCTHUNT_ACCESS_TOKEN` | Product Hunt API 令牌 |
| `CRON_API_KEY` | Cron Job 鉴权密钥 |

## 部署

### Vercel 一键部署

部署于 Vercel：https://sparkforge-blush.vercel.app

```bash
# 推送代码自动触发 Vercel 部署
git push origin main
```

### Cron Job 配置

Vercel Cron Job 每天执行一次信号抓取和评分：

```json
{
  "crons": [
    { "path": "/api/crawl?key=${CRON_API_KEY}", "schedule": "0 0 * * *" },
    { "path": "/api/score/batch?key=${CRON_API_KEY}", "schedule": "0 1 * * *" }
  ]
}
```

## 目录结构

```
sparkforge/
├── src/
│   ├── app/               # App Router 页面
│   │   ├── page.tsx       # 首页
│   │   ├── radar/         # 创意雷达（发现创意）
│   │   ├── forge/         # 一键复刻（生成方案）
│   │   ├── canvas/        # 商业画布（分析画布）
│   │   ├── stream/        # 公开动态
│   │   ├── projects/      # 我的项目
│   │   ├── login/         # 登录
│   │   ├── register/      # 注册
│   │   ├── profile/       # 用户中心
│   │   ├── privacy/       # 隐私政策
│   │   ├── terms/         # 服务条款
│   │   ├── about/         # 关于我们
│   │   └── api/           # API 路由
│   ├── components/
│   │   ├── ui/            # UI 组件库（Button, Input, Modal, Badge, etc.）
│   │   ├── Navbar.tsx     # 导航栏
│   │   ├── AuthCard.tsx   # 登录/注册表单
│   │   ├── SignalCard.tsx # 信号卡片
│   │   └── ...
│   ├── lib/               # 工具函数（AI, 认证, 数据库, API）
│   ├── types/             # TypeScript 类型
│   └── data/              # Mock 数据
├── public/                # 静态资源
├── supabase-setup.sql     # 数据库建表脚本
└── vercel.json            # Vercel 部署配置
```