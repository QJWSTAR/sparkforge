# SparkForge 开发落地 - Implementation Plan

## [/] Task 1: 项目初始化 + 部署骨架
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 使用 create-next-app 初始化 Next.js 15 + TypeScript 项目
  - 安装 tailwindcss、@tailwindcss/vite 等依赖
  - 配置 Vercel 部署（连接 GitHub 仓库）
  - 配置 ESLint + Prettier
  - 创建基础页面结构和导航
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-1.1: Vercel 部署链接可访问，返回 200 状态码
  - `programmatic` TR-1.2: npm run build 成功，无 TypeScript 错误
  - `human-judgment` TR-1.3: 页面结构清晰，导航可用
- **Notes**: 记录 Session ID 和 Vercel 部署成功截图

## [ ] Task 2: 数据层搭建
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 注册 Supabase 项目
  - 创建数据表：signals、scores、users、forges、stream_events
  - 配置 pgvector 扩展（向量检索）
  - 配置 Redis（Upstash 免费层）
  - 创建 Supabase 客户端封装（src/lib/supabase.ts）
  - 创建数据库类型定义（src/types/db.ts）
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `programmatic` TR-2.1: Supabase 客户端连接测试通过
  - `programmatic` TR-2.2: 能成功插入和查询 signals 表数据
  - `human-judgment` TR-2.3: 表结构完整，符合设计文档
- **Notes**: 记录 Session ID 和数据库截图

## [ ] Task 3: 创意雷达页面 + Mock 数据
- **Priority**: high
- **Depends On**: Task 2
- **Description**: 
  - 创建信号列表页面（src/app/(dashboard)/radar/page.tsx）
  - 创建 Mock 信号数据（src/lib/mock/signals.ts）
  - 实现信号卡片组件（src/components/features/SignalCard.tsx）
  - 实现 4 维评分 mini-bar 组件
  - 实现 KPI 指标展示组件
  - 实现响应式布局
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `programmatic` TR-3.1: 页面路由可访问，返回 200 状态码
  - `human-judgment` TR-3.2: 信号列表显示 10 条 Mock 数据
  - `human-judgment` TR-3.3: 评分 mini-bar 可视化正常
  - `human-judgment` TR-3.4: 移动端布局适配正常
- **Notes**: 记录 Session ID 和页面截图

## [ ] Task 4: 真实信号源接入
- **Priority**: high
- **Depends On**: Task 2
- **Description**: 
  - 对接 Product Hunt API（官方 OAuth）
  - 对接 Hacker News API（Algolia）
  - 创建信号抓取服务（src/lib/crawlers/）
  - 实现去重逻辑（向量相似度 + 标题哈希）
  - 实现信号标准化和写入数据库
  - 创建 API Route：/api/signals/fetch
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `programmatic` TR-4.1: /api/signals/fetch 返回成功，状态码 200
  - `programmatic` TR-4.2: 数据库中新增真实信号数据
  - `programmatic` TR-4.3: 相同信号不会重复入库（去重测试）
  - `human-judgment` TR-4.4: 信号源健康度监控正常
- **Notes**: 记录 Session ID 和抓取日志截图

## [ ] Task 5: LLM 4 维评分系统
- **Priority**: high
- **Depends On**: Task 2, Task 4
- **Description**: 
  - 配置 LLM API（DeepSeek-V4 / MiMo-V2.5）
  - 创建多模型路由（src/lib/llm/router.ts）
  - 实现 4 维评分 Prompt 模板（src/lib/llm/scoring.ts）
  - 实现评分调度（每日 09:00 Vercel Cron）
  - 实现评分结果存储
  - 创建 API Route：/api/signals/score
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `programmatic` TR-5.1: /api/signals/score 返回评分结果，状态码 200
  - `programmatic` TR-5.2: 评分结果包含 4 个维度分数和综合分
  - `programmatic` TR-5.3: Top 10 信号综合分 ≥ 70
  - `human-judgment` TR-5.4: 评分结果展示在信号列表中
- **Notes**: 记录 Session ID 和评分结果截图

## [ ] Task 6: 一键复刻功能
- **Priority**: medium
- **Depends On**: Task 3, Task 5
- **Description**: 
  - 创建复刻配置面板组件（src/components/features/ForgeModal.tsx）
  - 实现本地化改造度计算
  - 实现 TRAE IDE 调用（vibe coding）
  - 创建复刻任务队列（BullMQ + Redis）
  - 创建 API Route：/api/forges/create
  - 实现复刻进度展示
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `programmatic` TR-6.1: /api/forges/create 返回任务 ID，状态码 200
  - `human-judgment` TR-6.2: 复刻面板显示本地化改造度
  - `human-judgment` TR-6.3: 复刻配置选项完整（语言、改造点、自定义 prompt）
  - `human-judgment` TR-6.4: 复刻进度 6 步管线可视化
- **Notes**: 记录 Session ID 和复刻面板截图

## [ ] Task 7: 公开日志流页面
- **Priority**: medium
- **Depends On**: Task 2
- **Description**: 
  - 创建公开日志页面（src/app/(dashboard)/stream/page.tsx）
  - 实现事件类型分类（signal/score/forge/deploy/money）
  - 实现实时时间轴展示
  - 创建事件卡片组件
  - 创建 API Route：/api/stream
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `programmatic` TR-7.1: /api/stream 返回事件列表，状态码 200
  - `human-judgment` TR-7.2: 日志流页面显示事件时间轴
  - `human-judgment` TR-7.3: 不同事件类型显示不同颜色标签
  - `human-judgment` TR-7.4: 支持分页加载
- **Notes**: 记录 Session ID 和日志页面截图

## [ ] Task 8: 商业画布生成器
- **Priority**: medium
- **Depends On**: Task 5
- **Description**: 
  - 创建商业画布页面（src/app/(dashboard)/canvas/page.tsx）
  - 实现一句话定位生成
  - 实现目标用户画像生成
  - 实现竞品图谱分析
  - 实现 30 天行动清单生成
  - 创建 API Route：/api/canvas/generate
- **Acceptance Criteria Addressed**: AC-5 (部分)
- **Test Requirements**:
  - `programmatic` TR-8.1: /api/canvas/generate 返回画布数据，状态码 200
  - `human-judgment` TR-8.2: 画布包含 4 个模块
  - `human-judgment` TR-8.3: 支持导出 Markdown
- **Notes**: 记录 Session ID 和画布页面截图

## [ ] Task 9: 前端页面整合
- **Priority**: medium
- **Depends On**: Task 3, Task 6, Task 7, Task 8
- **Description**: 
  - 创建布局组件（src/components/layout/）
  - 创建导航组件（顶部导航 + 侧边栏）
  - 创建用户认证组件（登录/注册）
  - 整合所有页面到统一布局
  - 实现页面间跳转
- **Acceptance Criteria Addressed**: AC-3, AC-6, AC-7, AC-8
- **Test Requirements**:
  - `human-judgment` TR-9.1: 导航正常工作，页面跳转流畅
  - `human-judgment` TR-9.2: 布局美观，符合设计风格
  - `human-judgment` TR-9.3: 响应式设计完整
- **Notes**: 记录 Session ID 和完整界面截图

## [ ] Task 10: 初赛提交材料准备
- **Priority**: high
- **Depends On**: Task 1-9
- **Description**: 
  - 验证所有页面可访问
  - 验证核心功能跑通
  - 收集所有开发截图（≥3 张）
  - 收集所有 Session ID（≥3 个）
  - 按模板撰写 Demo 帖
  - 发布到初赛专区
- **Acceptance Criteria Addressed**: AC-8
- **Test Requirements**:
  - `human-judgment` TR-10.1: 体验链接可访问，功能完整
  - `human-judgment` TR-10.2: 收集 ≥3 张开发截图
  - `human-judgment` TR-10.3: 收集 ≥3 个 Session ID
  - `human-judgment` TR-10.4: Demo 帖结构完整（4 个部分）
- **Notes**: 发布到初赛专区并记录链接
