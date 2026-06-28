# SparkForge Code Wiki

> **项目名称**：SparkForge（中文：火花工坊）
> **Slogan**：From spark to shipped, in 24 hours.
> **赛道**：学习工作（主） / 硬件交互（次）
> **版本**：v1.0
> **更新日期**：2026-06-23

---

## 目录

1. [项目概述](#1-项目概述)
2. [系统架构](#2-系统架构)
3. [核心模块详解](#3-核心模块详解)
4. [技术选型](#4-技术选型)
5. [数据流设计](#5-数据流设计)
6. [数据库设计](#6-数据库设计)
7. [API 设计](#7-api-设计)
8. [依赖关系](#8-依赖关系)
9. [项目结构](#9-项目结构)
10. [运行方式](#10-运行方式)
11. [部署指南](#11-部署指南)
12. [开发路线图](#12-开发路线图)
13. [关键决策与风险](#13-关键决策与风险)

---

## 1. 项目概述

### 1.1 项目定位

SparkForge 是一个**全网创意信号雷达 + TRAE 自动化落地工坊**的端到端 SaaS 平台。它把"想法"变成"可运行产品"的全链路自动化，覆盖：

- 信号捕获 → AI 商业可行性评估 → 24 小时 MVP 交付 → 公开构建日志 → 支付闭环

### 1.2 核心价值

| 维度 | 描述 |
|------|------|
| **对订阅者** | 每天早上 9 点推送 10 个新信号 + 商业可行性评分 + 一键 TRAE 自动生成 MVP |
| **对公众** | AI 时代最透明的 Build in Public 日志流，SparkForge 内部每天跑 1 个公开 MVP |
| **对企业** | 竞品深度监控、API 接入、定制信号源 |

### 1.3 目标用户

| 用户层 | 占比目标 | 使用场景 | 付费意愿 |
|--------|----------|----------|----------|
| 独立开发者 / 小团队 | 40% | 每天扫信号、找下一个 SaaS 灵感、复刻爆款 | 99-299/月 |
| 大厂产品 / 增长团队 | 25% | 竞品监控、市场信号聚合、新方向探索 | 999-4999/月 |
| 创业孵化器 / 投资机构 | 20% | Deal sourcing、赛道扫描、趋势报告 | 4999+/月 |
| TRAE 大赛参赛者 | 15% | 扫撞车、找差异化、抢首发 | 免费 → 99/月 |

### 1.4 商业模式

四层订阅制 + 一次性自动化额度：

| 层级 | 价格 | 权益 | 目标用户 |
|------|------|------|----------|
| Free 探针版 | 0 | 每日 5 个信号、AI 评分、公开日志阅读 | TRAE 大赛参赛者 / 注册用户 |
| Pro 创客版 | 99/月 | 无限信号、每日 3 个 TRAE 自动 MVP、公开日志露出 | 独立开发者 |
| Studio 工作室版 | 499/月 | 无限 MVP、多账号协作、私有创意池 | 小团队 / 工作室 |
| Enterprise 企业版 | 定制 5k+/月 | 竞品深度监控、API 接入、定制信号源 | 大厂 / 投资机构 |

---

## 2. 系统架构

### 2.1 五层架构总览

SparkForge 采用**五层架构**设计，自上而下分别为：

```
┌─────────────────────────────────────────────────────────┐
│  用户层 (User Layer)                                     │
│  订阅者 · 公众 · 企业客户 · TRAE 1V1 辅导               │
├─────────────────────────────────────────────────────────┤
│  应用层 (App Layer)                                      │
│  ① 创意雷达  ② 复刻工坊  ③ 商业画布  ④ 公开日志        │
├─────────────────────────────────────────────────────────┤
│  核心层 (Core Layer)  —  SparkForge Brain                │
│  信号聚合引擎 · LLM商业评分 · TRAE自动化 · 内容生成     │
├─────────────────────────────────────────────────────────┤
│  数据层 (Data Layer)                                     │
│  PostgreSQL · Redis · pgvector · OSS/R2                  │
├─────────────────────────────────────────────────────────┤
│  基础设施层 (Infra Layer)                                │
│  Cloudflare · Vercel · 火山引擎 · Stripe/Creem          │
└─────────────────────────────────────────────────────────┘
```

### 2.2 各层职责

| 层级 | 核心职责 | 关键技术 |
|------|----------|----------|
| **用户层** | 多角色入口、权限控制、交互界面 | Next.js、TailwindCSS |
| **应用层** | 四大产品模块的业务逻辑编排 | Hono、Serverless Functions |
| **核心层** | AI 智能管线、信号处理、评分引擎、自动化 | LLM Router、TRAE IDE API |
| **数据层** | 结构化存储、缓存、向量检索、文件存储 | Supabase、Redis、pgvector |
| **基础设施层** | CDN、部署、算力、支付、监控 | Cloudflare、Vercel、火山引擎 |

---

## 3. 核心模块详解

### 3.1 创意雷达（Radar）

**文件位置**：应用层核心模块

**职责**：7×24 小时抓取全网创意信号，去重、标准化后推送。

**核心功能**：
- 多源信号抓取（9 个信号源）
- 跨源去重与标准化
- 本地化改造度评分
- 每日 Top 10 自动推送

**信号源配置**：

| 信号源 | 抓取方式 | 频率 | 本地化改造度基线 |
|--------|----------|------|------------------|
| Product Hunt | 官方 API（OAuth） | 每 30 分钟 | 0% |
| Hacker News | Algolia API（免费） | 每 15 分钟 | 0% |
| V2EX | 代理池爬虫 | 每 1 小时 | +30-50% |
| 即刻 | 代理池爬虫 | 每 1 小时 | +30-50% |
| 小红书 | 代理池爬虫 | 每 1 小时 | +30-50% |
| 微博 | 代理池爬虫 | 每 1 小时 | +30-50% |
| Reddit | 代理池爬虫 | 每 1 小时 | +30-50% |
| X (Twitter) | 代理池爬虫 | 每 1 小时 | +30-50% |
| GitHub Trending | 官方 API | 每 2 小时 | +20% |

**关键工程要点**：
- 反爬策略：住宅代理池（Bright Data）+ IP 轮换
- 频率调度：错峰抓取，避免触发限流
- 去重算法：向量相似度（pgvector）+ 标题哈希

---

### 3.2 LLM 商业评分引擎（Scoring Engine）

**文件位置**：核心层 SparkForge Brain

**职责**：对每个创意信号进行四维商业可行性评分。

**评分维度**：

| 维度 | 权重 | 说明 |
|------|------|------|
| 市场规模 | 0.35 | 目标用户基数、TAM/SAM/SOM 估算 |
| 付费意愿 | 0.35 | 用户付费能力、竞品定价、支付习惯 |
| 工程难度 | 0.15 | 技术复杂度、依赖系统、团队能力匹配 |
| TRAE 落地时间 | 0.15 | 用 TRAE IDE 实现 MVP 所需时间 |

**综合得分公式**：
```
综合分 = 市场规模 × 0.35 + 付费意愿 × 0.35 + 工程难度 × 0.15 + 落地时间 × 0.15
```

**入选门槛**：综合分 ≥ 70 分自动进入"今日 Top 10"

**多模型路由策略**：
- 粗筛：MiMo-V2.5（低成本，缓存命中 0.025 元/百万 token）
- 精排：GPT-5 / Claude 4.5（高质量评分）
- 中文场景：DeepSeek-V4（中文理解更好）
- Fallback 机制：主模型失败自动降级到备选

---

### 3.3 复刻工坊（Forge）

**文件位置**：应用层 + 核心层

**职责**：基于创意信号自动调用 TRAE IDE 生成可运行的 MVP。

**自动化管线（6 步）**：

```
Step 1: 创意 + 评分 + 本地化要求
    ↓
Step 2: Prompt 工程模板生成
    ↓
Step 3: TRAE IDE 调用（vibe coding）
    ↓
Step 4: Vercel 自动部署
    ↓
Step 5: 支付系统嵌入（Stripe）
    ↓
Step 6: 公开日志发布
```

**关键约束**：
- 本地化改造度 ≥ 30% 强制门槛（合规护城河）
- 24 小时内交付可访问、可部署、可支付的 MVP
- 成本预估：约 ¥0.23 / MVP（LLM ¥0.18 + TRAE ¥0.05 + Vercel 免费）

**本地化改造点示例**：
- 微信小程序版
- 小红书发布适配
- 公众号月报
- 飞书机器人
- 中文 UX 适配
- 地理相关性加权

---

### 3.4 商业画布（Canvas）

**文件位置**：应用层

**职责**：为每个上榜创意自动生成完整的商业分析框架。

**生成内容**：
- 一句话定位
- 目标用户画像
- 商业模式设计
- 竞品图谱分析
- 30 天行动清单

**导出格式**：Markdown / Notion 模板

---

### 3.5 公开日志（Stream）

**文件位置**：应用层

**职责**：Build in Public 实时流，所有 SparkForge 内部产出的 MVP 自动公开构建日志。

**事件类型**：

| 事件标签 | 颜色 | 说明 |
|----------|------|------|
| signal | 蓝色 | 信号捕捉、上榜、推送 |
| score | 橙色 | 评分完成、排名变动 |
| forge | 金色 | 复刻任务启动、进度更新 |
| deploy | 绿色 | 部署完成、上线通知 |
| money | 紫色 | 新订阅、收入数据 |

**分发渠道**：X / 抖音 / 小红书 / V2EX / 邮件订阅

---

## 4. 技术选型

### 4.1 前端技术栈

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|----------|
| Next.js | 15 | 全栈框架 | Vercel 零配置部署，TRAE IDE 原生支持 |
| React | 19 | UI 库 | 生态成熟，TRAE vibe coding 最佳实践 |
| TypeScript | 最新 | 类型系统 | 类型安全，大型项目可维护 |
| TailwindCSS | 最新 | CSS 框架 | 原子化 CSS，快速构建 UI |

### 4.2 后端技术栈

| 技术 | 用途 | 选型理由 |
|------|------|----------|
| Node.js | 运行时 | JavaScript 全栈统一 |
| Hono | Web 框架 | Serverless 友好，轻量高性能 |
| Vercel Serverless Functions | 函数计算 | 按需计费，自动扩缩容 |

### 4.3 数据存储

| 技术 | 用途 | 选型理由 |
|------|------|----------|
| Supabase (PostgreSQL) | 主数据库 | 一站式 BaaS，含 RLS、Auth |
| pgvector | 向量检索 | 创意相似度计算、RAG 检索 |
| Redis (Upstash) | 缓存 | 热点信号缓存、LLM 调用去重 |
| Cloudflare R2 / OSS | 对象存储 | 截图、视频、公开构建产物 |

### 4.4 AI / LLM

| 模型 | 用途 | 场景 |
|------|------|------|
| GPT-5 | 精排评分 | 高质量商业分析 |
| Claude 4.5 | 长文本处理 | 深度竞品分析 |
| DeepSeek-V4 | 中文场景 | 中文信号理解 |
| MiMo-V2.5 | 粗筛 / 批量 | 低成本批量评分 |
| TRAE IDE | 代码生成 | MVP 自动化构建 |

### 4.5 基础设施

| 服务 | 用途 |
|------|------|
| Cloudflare | CDN、Workers、D1 边缘数据库 |
| Vercel | 前端部署、Serverless Functions、MVP 自动部署 |
| 火山引擎 | TRAE 算力对接、V-START 代金券 |
| Stripe | 海外支付 |
| Creem | 中国支付 |

### 4.6 监控与分析

| 工具 | 用途 |
|------|------|
| Sentry | 错误监控 |
| PostHog | 产品分析 |
| Cloudflare Analytics | 流量分析 |

### 4.7 爬虫工具

| 工具 | 用途 |
|------|------|
| Playwright | 浏览器自动化爬取 |
| Bright Data | 住宅代理池（反爬） |

---

## 5. 数据流设计

### 5.1 七阶段数据流

```
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ 1. 9 源  │──▶│ 2. 去重  │──▶│ 3. LLM   │──▶│ 4. Top   │
│ 信号抓取 │   │ +本地化分│   │ 4维评分  │   │ 10 推送  │
└──────────┘   └──────────┘   └──────────┘   └────┬─────┘
                                                    │
┌──────────┐   ┌──────────┐   ┌──────────┐         │
│ 7. 收入  │◀──│ 6. 公开  │◀──│ 5. TRAE  │◀────────┘
│ 闭环     │   │ 日志     │   │ 24h MVP  │
└────┬─────┘   └──────────┘   └──────────┘
     │
     └─────── 收入数据反哺信号质量评分 ────────┐
                                              ▼
                                       数据飞轮闭环
```

### 5.2 数据飞轮

收入数据反哺信号评分模型，形成正向循环：
1. 每个公开 MVP 的"上线 → 流量 → 收入 → 评分"形成闭环
2. 3 个月后拥有独家"全网爆款 → 真实收入"数据集
3. 评分模型持续优化，竞品无法复刻

---

## 6. 数据库设计

### 6.1 核心表结构

#### signals（信号表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| title | VARCHAR(500) | 信号标题 |
| description | TEXT | 信号描述 |
| source | VARCHAR(50) | 来源（ph/hn/v2ex/jike/xhs/...） |
| source_url | VARCHAR(1000) | 原始链接 |
| source_id | VARCHAR(200) | 源平台唯一 ID |
| localization_score | INTEGER | 本地化改造度（0-100） |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

#### scores（评分表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| signal_id | UUID | 关联信号 ID |
| market_score | INTEGER | 市场规模（0-100） |
| payment_score | INTEGER | 付费意愿（0-100） |
| engineering_score | INTEGER | 工程难度（0-100） |
| time_score | INTEGER | 落地时间（0-100） |
| total_score | INTEGER | 综合得分 |
| model_used | VARCHAR(50) | 使用的模型 |
| scored_at | TIMESTAMP | 评分时间 |

#### users（用户表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| email | VARCHAR(255) | 邮箱 |
| plan | VARCHAR(50) | 订阅计划（free/pro/studio/enterprise） |
| stripe_customer_id | VARCHAR(255) | Stripe 客户 ID |
| created_at | TIMESTAMP | 创建时间 |

#### forges（复刻任务表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| signal_id | UUID | 关联信号 ID |
| user_id | UUID | 发起用户 ID |
| status | VARCHAR(50) | 状态（pending/running/deployed/failed） |
| localization_config | JSON | 本地化配置 |
| deployment_url | VARCHAR(1000) | 部署 URL |
| github_repo | VARCHAR(500) | GitHub 仓库 |
| started_at | TIMESTAMP | 开始时间 |
| completed_at | TIMESTAMP | 完成时间 |

#### stream_events（公开日志事件表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| type | VARCHAR(50) | 事件类型（signal/score/forge/deploy/money） |
| title | VARCHAR(500) | 事件标题 |
| content | TEXT | 事件内容 |
| metadata | JSON | 元数据 |
| created_at | TIMESTAMP | 创建时间 |

#### user_subscriptions（用户赛道订阅表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| user_id | UUID | 用户 ID |
| category | VARCHAR(100) | 赛道分类 |
| created_at | TIMESTAMP | 订阅时间 |

### 6.2 索引设计

- `signals(source, source_id)` — 唯一索引，去重
- `signals(created_at)` — 时间索引
- `scores(signal_id)` — 外键索引
- `scores(total_score)` — 排序索引
- `forges(user_id)` — 用户任务查询
- `stream_events(created_at)` — 时间轴查询

---

## 7. API 设计

### 7.1 信号相关 API

#### GET /api/signals/today
获取今日 Top 10 信号

**响应示例**：
```json
{
  "date": "2026-06-23",
  "signals": [
    {
      "id": "uuid",
      "rank": 1,
      "title": "VoiceMood · 语音转情绪日记",
      "source": "ph",
      "total_score": 90,
      "market_score": 92,
      "payment_score": 88,
      "engineering_score": 35,
      "time_score": 25,
      "localization_score": 38
    }
  ]
}
```

#### GET /api/signals/:id
获取信号详情 + 商业画布

#### POST /api/signals/:id/forge
发起一键复刻

**请求体**：
```json
{
  "language": "zh-CN",
  "localization_points": ["wechat_miniprogram", "xiaohongshu"],
  "custom_prompt": "把情绪曲线改成中国风水墨风格"
}
```

### 7.2 用户相关 API

#### POST /api/auth/signup
用户注册

#### POST /api/auth/login
用户登录

#### GET /api/user/subscriptions
获取用户订阅赛道

#### POST /api/user/subscriptions
新增订阅赛道

### 7.3 复刻工坊 API

#### GET /api/forges
获取用户复刻任务列表

#### GET /api/forges/:id
获取复刻任务详情 + 进度

### 7.4 公开日志 API

#### GET /api/stream
获取公开日志流（支持分页）

#### GET /api/stream/:id
获取单条日志详情

### 7.5 企业版 API

#### GET /api/enterprise/signals/feed
企业版信号流 API（高并发）

#### POST /api/enterprise/score
批量评分 API

#### POST /api/enterprise/forge
企业版复刻 API（高配额）

---

## 8. 依赖关系

### 8.1 外部服务依赖

| 服务 | 依赖类型 | 关键程度 | 备选方案 |
|------|----------|----------|----------|
| TRAE IDE API | 核心依赖 | P0 | 人工兜底 |
| Supabase | 基础设施 | P0 | Neon + pgvector |
| Vercel | 部署平台 | P0 | Netlify / Cloudflare Pages |
| Stripe | 支付 | P1 | LemonSqueezy / Paddle |
| Creem | 国内支付 | P1 | 微信支付 / 支付宝 |
| Bright Data | 代理池 | P2 | 其他代理服务商 |
| PostHog | 分析 | P2 | Mixpanel / Amplitude |
| Sentry | 错误监控 | P2 | Bugsnag |

### 8.2 模块间依赖

```
创意雷达 (Radar)
    ↓ 输入信号
LLM 评分引擎 (Scoring)
    ↓ 评分结果
    ├─────────────→ 商业画布 (Canvas)
    ↓ 入选 Top 10
复刻工坊 (Forge)
    ↓ MVP 产出
    ├─────────────→ 公开日志 (Stream)
    └─────────────→ 支付系统 (Stripe)
```

### 8.3 核心依赖方向

- **应用层 → 核心层**：业务逻辑调用 AI 能力
- **核心层 → 数据层**：读写持久化存储
- **全栈 → 基础设施层**：部署、CDN、支付

---

## 9. 项目结构

### 9.1 当前文档结构

```
sparkforge/
├── sparkforge/                          # 主项目文档
│   ├── product-spec.html               # 产品方案文档
│   ├── architecture-diagram.html       # 技术架构图
│   ├── signup-post.html                # 大赛报名帖
│   └── naming-options.html             # 命名方案对比
├── sparkforge-mvp/                      # MVP 交互 Demo
│   └── sparkforge-mvp.html             # 高保真交互原型
└── sparkforge-30day/                    # 30天执行计划
    └── sparkforge-30day.html           # 30天执行清单
```

### 9.2 预期代码结构（MVP 阶段）

```
sparkforge-app/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (marketing)/               # 营销页面
│   │   │   ├── page.tsx              # 首页
│   │   │   └── pricing/              # 定价页
│   │   ├── (dashboard)/               # 用户仪表盘
│   │   │   ├── radar/                 # 创意雷达
│   │   │   ├── forge/                 # 复刻工坊
│   │   │   ├── canvas/                # 商业画布
│   │   │   └── stream/                # 公开日志
│   │   └── api/                       # API Routes
│   │       ├── signals/
│   │       ├── forges/
│   │       ├── stream/
│   │       └── webhooks/
│   ├── components/                    # 通用组件
│   │   ├── ui/                        # 基础 UI 组件
│   │   ├── layout/                    # 布局组件
│   │   └── features/                  # 业务组件
│   ├── lib/                           # 工具库
│   │   ├── supabase.ts               # Supabase 客户端
│   │   ├── llm/                      # LLM 相关
│   │   │   ├── router.ts             # 多模型路由
│   │   │   ├── scoring.ts            # 评分 prompt
│   │   │   └── canvas.ts             # 画布生成
│   │   ├── crawlers/                  # 爬虫
│   │   │   ├── producthunt.ts
│   │   │   ├── hackernews.ts
│   │   │   └── ...
│   │   ├── trae/                      # TRAE IDE 集成
│   │   │   └── forge-pipeline.ts     # 复刻管线
│   │   └── utils.ts
│   ├── types/                         # TypeScript 类型定义
│   └── styles/                        # 全局样式
├── supabase/                          # 数据库迁移
│   └── migrations/
├── public/                            # 静态资源
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── .env.example
```

---

## 10. 运行方式

### 10.1 查看现有文档

项目当前为**产品方案阶段**，包含多个 HTML 静态文档。直接在浏览器中打开即可查看：

```bash
# 查看产品方案
open sparkforge/product-spec.html

# 查看技术架构图
open sparkforge/architecture-diagram.html

# 查看 MVP 交互 Demo
open sparkforge-mvp/sparkforge-mvp.html

# 查看 30 天执行计划
open sparkforge-30day/sparkforge-30day.html
```

### 10.2 环境变量（MVP 开发时需要）

```env
# 数据库
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# LLM API Keys
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
DEEPSEEK_API_KEY=
MIMO_API_KEY=

# TRAE IDE
TRAE_API_KEY=
TRAE_API_ENDPOINT=

# 支付
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# 部署
VERCEL_TOKEN=

# 爬虫代理
PROXY_POOL_URL=

# 监控
SENTRY_DSN=
POSTHOG_KEY=
```

### 10.3 本地开发（MVP 阶段）

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入各 API Key

# 3. 启动数据库（使用 Supabase 本地开发）
npx supabase start

# 4. 运行数据库迁移
npx supabase db push

# 5. 启动开发服务器
npm run dev
# 访问 http://localhost:3000
```

### 10.4 常用命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 代码检查
npm run typecheck    # 类型检查
npm run test         # 运行测试
```

---

## 11. 部署指南

### 11.1 一键部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 点击 Deploy

### 11.2 Supabase 设置

1. 在 [supabase.com](https://supabase.com) 创建项目
2. 运行数据库迁移：`npx supabase db push`
3. 配置 Auth（邮箱登录）
4. 配置 RLS 策略

### 11.3 Cloudflare 配置

1. 域名 DNS 托管到 Cloudflare
2. 配置 CDN 缓存规则
3. 配置 Workers（可选，用于边缘计算）

---

## 12. 开发路线图

### 12.1 MVP 阶段（M1-M2，30天）

| 阶段 | 时间 | 里程碑 | 交付物 |
|------|------|--------|--------|
| 阶段一 | D1-D10 | 报名 + 基建 | 可部署骨架、数据层 ready、5 个模板 |
| 阶段二 | D11-D20 | 核心功能 MVP | 9 源全在线、评分引擎、24h 交付链路 |
| 阶段三 | D21-D30 | 公测 + 提交 | 10 个 Pro 用户、$700 MRR、初赛提交 |

### 12.2 增长阶段（M3-M6）

- 扩到 9 个信号源（含小红书、微博、Reddit、X）
- 本地化改造评分系统 v2
- 企业版 API 接入
- 启动"每日 MVP"公开直播

### 12.3 平台阶段（M6+）

- 开源"商业可行性评分模型"吸引社区共建
- 推出"创意投资币"——订阅者对上榜创意众筹
- 对接字节系飞书 / 抖音生态

### 12.4 30 天成功指标（KPI）

| 指标 | D10 | D20 | D30 | 目标 |
|------|-----|-----|-----|------|
| 信号源在线数 | 4 | 9 | 9 | 9/9 |
| 每日新信号 | 50 | 150 | 200 | 200+ |
| Top 10 入选率 | — | 70% | 85% | ≥80% |
| 累计复刻 MVP | — | 8 | 15 | 15+ |
| 注册用户 | 0 | 20 | 80 | 80+ |
| Pro 订阅 | 0 | 0 | 10 | 10+ |
| MRR | $0 | $0 | $700 | $700+ |
| 公开日志 | 0 | 0 | 8 | 8+ |
| X 关注者 | 50 | 200 | 500 | 500+ |
| GitHub stars | 5 | 30 | 100 | 100+ |

---

## 13. 关键决策与风险

### 13.1 已做出的关键决策

| 决策 | 选择 | 理由 |
|------|------|------|
| D1 · 命名 | SparkForge | 品牌延展性强，中英文双语境友好 |
| D3 · 商业模式 | 先只开 Pro 99/月 | 避免决策疲劳，聚焦单一档位验证 |
| D13 · 信号源策略 | 先 4 源再扩 9 源 | 降低反爬风险，快速迭代 |
| D17 · 合规策略 | 强制 30% 本地化改造度 | 规避法律和品牌风险，建立护城河 |

### 13.2 核心风险与应对

| 风险 | 等级 | 对策 |
|------|------|------|
| API 成本失控 | 高 | 分级配额 + 缓存 + 本地小模型粗筛，大模型精排 |
| 被原平台反爬 | 高 | 官方 API 优先；灰色源用代理池；终极 fallback 人工日报 |
| 抄袭法律风险 | 高 | 本地化改造度 ≥ 30% 强制门槛 + 法务免责声明 + 用户协议 |
| 爆款信号延迟 | 中 | 多源交叉验证 + LLM 趋势预判 |
| 字节官方下场 | 机遇 | 提前 6 个月跑出 $50k MRR，被收编=退出；做细分生态位 |

### 13.3 护城河

1. **数据飞轮**：每个公开 MVP 的"上线 → 流量 → 收入 → 评分"形成闭环
2. **TRAE 工程耦合**：TRAE 自动化调用 API 是核心壁垒
3. **Build in Public 品牌**：每天 1 个公开 MVP → 100 天后自然积累 10w+ 关注
4. **网络效应**：用户越多 → 信号越多 → AI 评分越准 → 更多用户订阅

---

## 附录

### A. 相关文档索引

| 文档 | 路径 | 说明 |
|------|------|------|
| 产品方案 | [product-spec.html](file:///Users/quanjiawei/Documents/sparkforge/sparkforge/product-spec.html) | 完整产品需求文档 |
| 技术架构图 | [architecture-diagram.html](file:///Users/quanjiawei/Documents/sparkforge/sparkforge/architecture-diagram.html) | 5 层架构 + 数据流 SVG |
| 报名帖 | [signup-post.html](file:///Users/quanjiawei/Documents/sparkforge/sparkforge/signup-post.html) | TRAE 大赛报名帖 |
| 命名方案 | [naming-options.html](file:///Users/quanjiawei/Documents/sparkforge/sparkforge/naming-options.html) | 12 个候选名对比 |
| MVP Demo | [sparkforge-mvp.html](file:///Users/quanjiawei/Documents/sparkforge/sparkforge-mvp/sparkforge-mvp.html) | 高保真交互原型 |
| 30天计划 | [sparkforge-30day.html](file:///Users/quanjiawei/Documents/sparkforge/sparkforge-30day/sparkforge-30day.html) | 30 天执行清单 |

### B. 联系方式

- 项目名：SparkForge（火花工坊）
- Slogan：From spark to shipped, in 24 hours.
- 赛道：学习工作（主） / 硬件交互（次）
- 团队：1 人 + TRAE 全程辅助
- 成本：约 ¥1,500/月（API + 服务器）

---

*本 Wiki 由项目文档自动生成，随项目进展持续更新*
