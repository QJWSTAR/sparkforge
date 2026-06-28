# SparkForge

全网创意信号雷达 + TRAE 自动化落地工坊

## 项目简介

SparkForge 是一个帮助独立开发者从创意发现到 MVP 交付的一站式平台。

## 技术栈

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS 4
- Supabase (PostgreSQL + pgvector)
- DeepSeek + MiMo (LLM)

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 环境变量

复制 `.env.example` 为 `.env.local` 并填写相关配置。

## 目录结构

```
sparkforge-app/
├── src/
│   ├── app/          # App Router 页面
│   ├── components/   # 组件
│   └── lib/          # 工具函数
├── public/           # 静态资源
└── package.json
```
