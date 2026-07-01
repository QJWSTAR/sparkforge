# SparkForge（火花工坊）

**From spark to shipped, in 24 hours.**

AI 驱动的创意信号雷达 + TRAE 自动化落地工坊，帮助独立开发者从创意到 MVP 一站式完成。

## 设计系统

**冰焰（Icy Flame）** — 淡蓝色思维火花，主色 `#4DA8FF`，暗色背景 `#0A0E14`。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS v4
- **语言**: TypeScript
- **数据库**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **动画**: Framer Motion
- **图标**: Lucide React
- **AI**: DeepSeek API

## 本地运行

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，填入 Supabase 密钥和 DeepSeek API Key

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 环境变量

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务角色密钥 |
| `DEEPSEEK_API_KEY` | DeepSeek API 密钥 |
| `CRON_API_KEY` | Cron Job 鉴权密钥 |

## 部署

部署于 Vercel：https://sparkforge-blush.vercel.app

```bash
# 推送代码自动触发 Vercel 部署
git push origin main
```

## 目录结构

```
sparkforge/
├── src/
│   ├── app/               # App Router 页面
│   │   ├── page.tsx       # 首页
│   │   ├── radar/         # 创意雷达
│   │   ├── forge/         # 复刻工坊
│   │   ├── canvas/        # 商业画布
│   │   ├── stream/        # 公开日志
│   │   ├── login/         # 登录
│   │   ├── register/      # 注册
│   │   ├── profile/       # 用户中心
│   │   └── api/           # API 路由
│   ├── components/
│   │   ├── ui/            # UI 组件库
│   │   ├── Navbar.tsx     # 导航栏
│   │   ├── SignalCard.tsx # 信号卡片
│   │   └── ...
│   ├── lib/               # 工具函数
│   ├── types/             # TypeScript 类型
│   └── data/              # Mock 数据
├── prisma/                # 数据库 Schema
└── .trae/                 # 规格文档
```