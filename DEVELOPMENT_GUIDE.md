# SparkForge 开发指南

> **项目名称**：SparkForge（火花工坊）
> **赛道**：学习工作（主）/ 硬件交互（次）
> **目标**：晋级 TRAE AI 创造力大赛复赛
> **版本**：v1.0
> **更新日期**：2026-06-28

---

## 目录

1. [大赛硬性要求清单](#1-大赛硬性要求清单)
2. [项目当前状态](#2-项目当前状态)
3. [关键路径规划（必做）](#3-关键路径规划必做)
4. [阶段二扩展（进阶）](#4-阶段二扩展进阶)
5. [阶段三打磨（冲刺）](#5-阶段三打磨冲刺)
6. [TRAE 证据收集协议](#6-trae-证据收集协议)
7. [初赛 Demo 帖模板](#7-初赛-demo-帖模板)
8. [技术栈与环境配置](#8-技术栈与环境配置)
9. [每日时间预算](#9-每日时间预算)

---

## 1. 大赛硬性要求清单

### 初赛晋级必备（缺一不可）

| 要求 | 说明 | 状态 |
|------|------|------|
| ✅ 报名审核通过 | 先确保报名帖通过审核 | 待确认 |
| ✅ 可体验 Demo | 部署链接 / HTML 打包 / 视频（三选一） | ❌ 未完成 |
| ✅ ≥3 张开发截图 | 关键步骤截图 | ❌ 未开始 |
| ✅ ≥3 个 Session ID | TRAE 对话标识 | ❌ 未开始 |
| ✅ 作品帖结构完整 | 按模板填写 4 个部分 | ❌ 未开始 |
| ✅ 体验链接可用 | 提交前自行验证 | ❌ 未开始 |

### 专业评审评分维度（4 个维度）

| 维度 | 权重 | 关注重点 | 得分策略 |
|------|------|----------|----------|
| 创意价值 | 30% | 真实痛点、市场潜力 | 突出本地化改造度评分差异化 |
| 技术实现 | 25% | 核心功能跑通、工程深度 | 至少跑通信号→评分→展示闭环 |
| TRAE 实践过程 | 25% | 开发过程清晰、Session ID | **重点！** 记录每一步 |
| 作品完整性 | 20% | 体验链接、文档完整 | 部署到 Vercel 可访问 |

### 抖音人气通道（额外 50 名额）

| 要求 | 说明 |
|------|------|
| 点赞 ≥ 500 | 单条内容最低门槛 |
| 话题标签 | `#vibecoding大赏 #traeai创造力大赛` |
| @账号 | @TRAE @抖音科技 |
| 飞书问卷 | 填写获取流量扶持 |

---

## 2. 项目当前状态

### 现有资源

| 资源 | 路径 | 状态 | 可用度 |
|------|------|------|--------|
| 产品方案 | [product-spec.html](file:///Users/quanjiawei/Documents/sparkforge/sparkforge/product-spec.html) | ✅ 完整 | 可直接引用 |
| 技术架构图 | [architecture-diagram.html](file:///Users/quanjiawei/Documents/sparkforge/sparkforge/architecture-diagram.html) | ✅ 完整 | 可直接引用 |
| MVP 交互 Demo | [sparkforge-mvp.html](file:///Users/quanjiawei/Documents/sparkforge/sparkforge-mvp/sparkforge-mvp.html) | ✅ 高保真 | 可截图展示 |
| 30 天计划 | [sparkforge-30day.html](file:///Users/quanjiawei/Documents/sparkforge/sparkforge-30day/sparkforge-30day.html) | ✅ 完整 | 可参考 |
| Code Wiki | [CODE_WIKI.md](file:///Users/quanjiawei/Documents/sparkforge/CODE_WIKI.md) | ✅ 完整 | 开发蓝图 |

### 核心差距

```
当前状态：文档阶段（6个HTML + 1个Wiki）
目标状态：可部署的完整Demo

差距：
├─ ❌ 无实际代码
├─ ❌ 无数据库
├─ ❌ 无部署链接
├─ ❌ 无开发过程记录
└─ ❌ 无Session ID
```

---

## 3. 关键路径规划（必做）

> **目标**：从文档阶段到第一个可部署 Demo，形成最小闭环

### Step 1：项目初始化 + 部署骨架（D1-D2）

**任务清单**：
- [ ] 使用 `create-next-app` 初始化项目
- [ ] 安装依赖：`next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `@tailwindcss/vite`
- [ ] 配置 Vercel 部署
- [ ] 配置 ESLint + Prettier
- [ ] 创建基础页面结构

**交付物**：
- ✅ Vercel 部署链接（可访问首页）
- ✅ 项目代码仓库
- ✅ CI/CD 流程配置

**证据收集**：
- 📸 截图：Vercel 部署成功页面
- 📸 截图：项目初始化完成
- 🔑 Session ID：项目初始化任务

### Step 2：数据层搭建（D3-D4）

**任务清单**：
- [ ] 注册 Supabase 项目
- [ ] 创建数据表：`signals`, `scores`, `users`, `forges`
- [ ] 配置 pgvector（向量检索）
- [ ] 配置 Redis（Upstash 免费层）
- [ ] 创建 Supabase 客户端封装

**交付物**：
- ✅ 数据库连接配置完成
- ✅ 表结构创建完成
- ✅ 客户端 SDK 可用

**证据收集**：
- 📸 截图：Supabase 数据库概览
- 📸 截图：表结构设计
- 🔑 Session ID：数据库配置任务

### Step 3：创意雷达页面 + Mock 数据（D5-D6）

**任务清单**：
- [ ] 创建信号列表页面（Radar）
- [ ] 创建 Mock 信号数据（10 条示例）
- [ ] 实现信号卡片展示（排名、标题、来源、评分）
- [ ] 实现 4 维评分 mini-bar
- [ ] 实现 KPI 指标展示

**交付物**：
- ✅ 可交互的信号雷达页面
- ✅ Mock 数据展示完整
- ✅ 响应式布局

**证据收集**：
- 📸 截图：信号列表页面
- 📸 截图：评分组件
- 🔑 Session ID：前端页面开发任务

### Step 4：真实信号源接入（D7-D8）

**任务清单**：
- [ ] 对接 Product Hunt API（官方 OAuth）
- [ ] 对接 Hacker News API（Algolia）
- [ ] 实现信号抓取调度器
- [ ] 实现去重逻辑（向量相似度 + 标题哈希）
- [ ] 写入数据库

**交付物**：
- ✅ 2 个真实信号源在线
- ✅ 每日自动抓取
- ✅ 去重机制生效

**证据收集**：
- 📸 截图：信号抓取日志
- 📸 截图：数据库中真实数据
- 🔑 Session ID：API 对接任务

### Step 5：LLM 评分系统（D9-D10）

**任务清单**：
- [ ] 配置 LLM API（DeepSeek / MiMo）
- [ ] 实现 4 维评分 Prompt 模板
- [ ] 实现评分调度（每日 09:00）
- [ ] 实现评分结果存储
- [ ] 前端展示评分结果

**交付物**：
- ✅ 信号自动评分
- ✅ Top 10 自动推送
- ✅ 评分结果展示

**证据收集**：
- 📸 截图：评分系统运行
- 📸 截图：Top 10 推送
- 🔑 Session ID：评分系统开发任务

### Step 6：一键复刻功能（D11-D12）

**任务清单**：
- [ ] 创建复刻配置面板
- [ ] 实现本地化改造度计算
- [ ] 实现 TRAE IDE 调用（vibe coding）
- [ ] 实现任务队列（BullMQ）

**交付物**：
- ✅ "一键复刻"按钮可用
- ✅ 本地化改造度显示
- ✅ TRAE 调用管道

**证据收集**：
- 📸 截图：复刻面板
- 📸 截图：TRAE 调用中
- 🔑 Session ID：复刻功能开发任务

### Step 7：公开日志流（D13）

**任务清单**：
- [ ] 创建公开日志页面（Stream）
- [ ] 实现事件类型分类（signal/score/forge/deploy/money）
- [ ] 实现实时时间轴展示
- [ ] 实现自动推文模板

**交付物**：
- ✅ 公开日志页面
- ✅ 事件分类展示
- ✅ 时间轴动画

**证据收集**：
- 📸 截图：日志流页面
- 🔑 Session ID：日志功能开发任务

### Step 8：部署验证 + 初赛提交（D14-D15）

**任务清单**：
- [ ] 验证所有页面可访问
- [ ] 验证核心功能跑通
- [ ] 收集所有截图（≥3 张）
- [ ] 收集所有 Session ID（≥3 个）
- [ ] 按模板撰写 Demo 帖
- [ ] 发布到初赛专区

**交付物**：
- ✅ 最终部署链接（可用）
- ✅ 完整 Demo 帖
- ✅ 所有证据材料

---

## 4. 阶段二扩展（进阶）

> **目标**：完善核心功能，提升评审竞争力

### 4.1 信号源扩展到 9 个

| 信号源 | 优先级 | 实现方式 |
|--------|--------|----------|
| Product Hunt | ✅ 已做 | 官方 API |
| Hacker News | ✅ 已做 | Algolia API |
| V2EX | 高 | 代理池爬虫 |
| 即刻 | 高 | 代理池爬虫 |
| GitHub Trending | 中 | 官方 API |
| 小红书 | 中 | 代理池爬虫 |
| 微博 | 中 | 代理池爬虫 |
| Reddit | 低 | 代理池爬虫 |
| X (Twitter) | 低 | 代理池爬虫 |

### 4.2 评分系统优化

- [ ] 多模型路由策略（粗筛 MiMo + 精排 GPT/Claude）
- [ ] 评分结果缓存（相同信号不重复评分）
- [ ] 成本预算监控
- [ ] 评分模型迭代（基于收入数据反哺）

### 4.3 复刻工坊完善

- [ ] Vercel 自动部署
- [ ] Stripe 支付嵌入
- [ ] GitHub 仓库自动创建
- [ ] 支付闭环

### 4.4 商业画布生成

- [ ] 一句话定位
- [ ] 目标用户画像
- [ ] 竞品图谱分析
- [ ] 30 天行动清单
- [ ] 导出 Markdown / Notion 模板

---

## 5. 阶段三打磨（冲刺）

> **目标**：准备初赛提交，提升晋级概率

### 5.1 公测与反馈收集

- [ ] 邀请 5-10 个 Beta 用户
- [ ] 收集反馈（记录不优化）
- [ ] 修复 Top 3 核心 Bug

### 5.2 差异化亮点

- [ ] "30 秒回放"功能
- [ ] 本地化改造度可视化雷达图
- [ ] 订阅赛道智能推荐

### 5.3 初赛答辩准备

- [ ] 10 页 PPT（痛点 + Demo + 数据 + 商业 + 路线图）
- [ ] 3 分钟 Demo 视频（OBS 录制）
- [ ] 预审（找 3 个内部人员）

### 5.4 抖音人气通道

- [ ] 制作 3 分钟 Demo 视频
- [ ] 发布到抖音（带话题）
- [ ] 填写飞书问卷
- [ ] 争取官方流量扶持

---

## 6. TRAE 证据收集协议

### 6.1 截图收集规范

**何时截图**：
- [ ] 项目初始化完成后
- [ ] 每个核心功能开发完成后
- [ ] 部署成功后
- [ ] 关键 Bug 修复后
- [ ] 每个里程碑完成后

**截图要求**：
- ✅ 清晰展示 TRAE IDE 界面
- ✅ 包含代码编辑区域
- ✅ 包含运行结果
- ✅ 不少于 3 张

**存储位置**：
```
sparkforge/
└── screenshots/
    ├── d1-project-init.png
    ├── d3-database.png
    ├── d5-radar-page.png
    ├── d7-api-connect.png
    ├── d9-scoring.png
    └── ...
```

### 6.2 Session ID 收集规范

**如何获取**：
- 双击 TRAE 对话即可复制 Session ID

**收集时机**：
- [ ] 项目初始化任务
- [ ] 数据库配置任务
- [ ] 前端页面开发任务
- [ ] API 对接任务
- [ ] 评分系统开发任务
- [ ] 复刻功能开发任务

**记录表格**：

| Session ID | 任务描述 | 日期 | 截图 |
|------------|----------|------|------|
| `xxx-xxx` | 项目初始化 | 2026-06-xx | ✅ |
| `xxx-xxx` | 数据库配置 | 2026-06-xx | ✅ |
| `xxx-xxx` | 信号雷达页面开发 | 2026-06-xx | ✅ |
| `xxx-xxx` | Product Hunt API 对接 | 2026-06-xx | ✅ |
| `xxx-xxx` | LLM 评分系统开发 | 2026-06-xx | ✅ |

### 6.3 证据清单

| 证据类型 | 数量要求 | 当前状态 |
|----------|----------|----------|
| 开发截图 | ≥3 张 | ❌ |
| Session ID | ≥3 个 | ❌ |
| 部署链接 | 1 个 | ❌ |
| 代码仓库 | 1 个 | ❌ |
| 体验视频 | 可选 | ❌ |

---

## 7. 初赛 Demo 帖模板

### 【标签】
`学习工作`

### 【标题】
学习工作 · SparkForge - 全网创意信号雷达 + TRAE 自动化落地工坊

### 【正文】

#### 1. Demo 简介

**是什么**：SparkForge 是一个端到端 SaaS 平台，把"想法"变成"可运行产品"，覆盖信号捕获 → AI 商业可行性评估 → 24 小时 MVP 交付 → 公开构建日志 → 支付闭环全链路。

**面向谁**：独立开发者、小团队、大厂产品团队、创业孵化器、TRAE 大赛参赛者

**主要功能**：
- 📡 **创意雷达**：7×24 小时抓取 9 个信号源，自动评分排序
- 🔥 **复刻工坊**：一键调用 TRAE IDE 生成可运行 MVP
- 📋 **商业画布**：自动生成 30 天行动清单
- 📺 **公开日志**：Build in Public 实时流

**产品截图**：
- ![信号雷达](screenshots/d5-radar-page.png)
- ![评分系统](screenshots/d9-scoring.png)
- ![复刻面板](screenshots/d11-forge.png)

#### 2. Demo 创作思路

**灵感来源**：TRAE 大赛 300+ 报名项目中，80% 是"想不出新点子"或"撞车严重"，独立开发者急需一个创意发现 + 落地工具。

**想解决的问题**：
- 痛点 1：全网创意分散，难以发现优质信号
- 痛点 2：创意评估依赖主观判断，缺乏量化标准
- 痛点 3：从创意到 MVP 的落地成本高、周期长

**为什么做这个方向**：
- 信号密度达到历史最高（2026 年）
- AI 落地成本降到历史最低（MiMo-V2.5 缓存命中 0.025 元/百万 token）
- Build in Public 模式被反复验证（Marc Lou / Danny Postma 月收入 $5k+）

#### 3. Demo 体验地址

**部署链接**：https://sparkforge.vercel.app

（或上传 HTML 文件打包）

#### 4. TRAE 实践过程

**开发流程**：

1. **项目初始化**（Session ID: `xxx-xxx`）
   - 使用 TRAE Work 初始化 Next.js 项目
   - 配置 Vercel 部署
   - 截图：[项目初始化](screenshots/d1-project-init.png)

2. **数据层搭建**（Session ID: `xxx-xxx`）
   - 创建 Supabase 数据库
   - 设计表结构（signals / scores / users / forges）
   - 截图：[数据库设计](screenshots/d3-database.png)

3. **信号雷达页面开发**（Session ID: `xxx-xxx`）
   - 创建信号列表组件
   - 实现 4 维评分展示
   - 截图：[信号雷达](screenshots/d5-radar-page.png)

4. **真实信号源对接**（Session ID: `xxx-xxx`）
   - 对接 Product Hunt API
   - 对接 Hacker News API
   - 实现去重与标准化
   - 截图：[API 对接](screenshots/d7-api-connect.png)

5. **LLM 评分系统**（Session ID: `xxx-xxx`）
   - 设计 4 维评分 Prompt
   - 实现多模型路由
   - 每日 09:00 自动推送
   - 截图：[评分系统](screenshots/d9-scoring.png)

**开发心得**：
- TRAE Work 的 vibe coding 能力大幅提升了开发效率
- 多模型路由策略有效控制了 LLM 成本
- 本地化改造度评分是核心差异化优势

---

**报名帖链接**：[SparkForge 报名帖](https://forum.trae.cn/t/topic/xxx)

---

## 8. 技术栈与环境配置

### 8.1 技术栈

| 层 | 技术 | 版本 |
|----|------|------|
| 前端 | Next.js | 15 |
| 前端 | React | 19 |
| 前端 | TypeScript | 最新 |
| 前端 | TailwindCSS | 最新 |
| 后端 | Hono | 最新 |
| 数据库 | Supabase (PostgreSQL) | 最新 |
| 向量检索 | pgvector | 最新 |
| 缓存 | Redis (Upstash) | 最新 |
| LLM | DeepSeek-V4 / MiMo-V2.5 | - |
| 部署 | Vercel | - |
| 支付 | Stripe | - |

### 8.2 环境变量

```env
# 数据库
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# LLM API Keys
OPENAI_API_KEY=
DEEPSEEK_API_KEY=
MIMO_API_KEY=

# TRAE IDE
TRAE_API_KEY=
TRAE_API_ENDPOINT=

# 部署
VERCEL_TOKEN=

# 监控
SENTRY_DSN=
POSTHOG_KEY=
```

### 8.3 项目结构

```
sparkforge-app/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/              # 营销页面
│   │   │   ├── page.tsx
│   │   │   └── pricing/
│   │   ├── (dashboard)/              # 用户仪表盘
│   │   │   ├── radar/                # 创意雷达
│   │   │   ├── forge/                # 复刻工坊
│   │   │   ├── canvas/               # 商业画布
│   │   │   └── stream/               # 公开日志
│   │   └── api/                      # API Routes
│   │       ├── signals/
│   │       ├── forges/
│   │       ├── stream/
│   │       └── webhooks/
│   ├── components/                   # 通用组件
│   │   ├── ui/                       # 基础 UI 组件
│   │   ├── layout/                   # 布局组件
│   │   └── features/                 # 业务组件
│   ├── lib/                          # 工具库
│   │   ├── supabase.ts              # Supabase 客户端
│   │   ├── llm/                     # LLM 相关
│   │   │   ├── router.ts            # 多模型路由
│   │   │   ├── scoring.ts           # 评分 prompt
│   │   │   └── canvas.ts            # 画布生成
│   │   ├── crawlers/                # 爬虫
│   │   │   ├── producthunt.ts
│   │   │   ├── hackernews.ts
│   │   │   └── ...
│   │   ├── trae/                    # TRAE IDE 集成
│   │   │   └── forge-pipeline.ts    # 复刻管线
│   │   └── utils.ts
│   ├── types/                       # TypeScript 类型定义
│   └── styles/                      # 全局样式
├── supabase/                        # 数据库迁移
│   └── migrations/
├── screenshots/                     # 开发截图
├── public/                          # 静态资源
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── .env.example
```

### 8.4 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 类型检查
npm run typecheck

# 运行测试
npm run test
```

---

## 9. 每日时间预算

| 时段 | 工作内容 | 工具 | 时间 |
|------|----------|------|------|
| 09:00 - 10:00 | 扫当日信号 + 评分 + 选 1 个今日复刻 | SparkForge Radar | 1h |
| 10:00 - 12:00 | 核心功能开发（按关键路径推进） | TRAE IDE | 2h |
| 12:00 - 13:00 | 午饭 + 复盘 + 记录开发过程 | Notion | 1h |
| 13:00 - 15:00 | Bug 修复 + 反馈整理 + 优化 | TRAE IDE | 2h |
| 15:00 - 16:00 | 证据收集（截图 + Session ID） | 截图工具 | 1h |
| 16:00 - 18:00 | 下一个功能模块开发 | TRAE IDE | 2h |

---

## 附录：关键决策与风险

### 已做决策

| 决策 | 选择 | 理由 |
|------|------|------|
| D1 · 命名 | SparkForge | 品牌延展性强，中英文双语境友好 |
| D3 · 商业模式 | 先只开 Pro 99/月 | 避免决策疲劳，聚焦单一档位验证 |
| D13 · 信号源策略 | 先 4 源再扩 9 源 | 降低反爬风险，快速迭代 |
| D17 · 合规策略 | 强制 30% 本地化改造度 | 规避法律和品牌风险，建立护城河 |

### 核心风险

| 风险 | 等级 | 对策 |
|------|------|------|
| API 成本失控 | 高 | 分级配额 + 缓存 + 本地小模型粗筛 |
| 被原平台反爬 | 高 | 官方 API 优先；灰色源用代理池 |
| 抄袭法律风险 | 高 | 本地化改造度 ≥ 30% 强制门槛 |
| 爆款信号延迟 | 中 | 多源交叉验证 + LLM 趋势预判 |

---

## 成功指标

| 指标 | D10 | D20 | D30 |
|------|-----|-----|-----|
| 信号源在线数 | 2 | 6 | 9 |
| 每日新信号 | 50 | 150 | 200 |
| Top 10 入选率 | — | 70% | 85% |
| 累计复刻 MVP | — | 5 | 15 |
| 注册用户 | 0 | 20 | 80 |
| Pro 订阅 | 0 | 0 | 10 |
| MRR | $0 | $0 | $700 |
| 公开日志 | 0 | 0 | 8 |
| X 关注者 | 50 | 200 | 500 |

---

*本指南基于 TRAE AI 创造力大赛初赛要求编写，持续更新*
