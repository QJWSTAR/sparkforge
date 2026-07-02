# SparkForge 项目状态诊断与 UI 改进 - 任务清单

## [x] Task 1: 修复 Vercel 构建错误（P0）
- **Priority**: P0
- **Depends On**: None
- **Description**: 在 `vercel.json` 中移除两个 crons 条目的 `method` 属性，只保留 `path` 和 `schedule`。
  - 当前配置：`"method": "POST"` 在两个 cron 条目中
  - 修改后：每个 cron 条目只保留 `path` 和 `schedule`
- **Test Requirements**:
  - `programmatic` TR-1.1: `vercel.json` 中不再包含 `method` 属性
  - `programmatic` TR-1.2: `npm run build` 通过
- **Estimate**: 5 min

## [x] Task 2: 功能模块完成度诊断（P0）
- **Priority**: P0
- **Depends On**: None
- **Description**: 逐项检查六个核心模块的完成状态，记录结果。
  - 信号雷达：检查页面渲染、API 数据返回、分页/排序/筛选功能
  - 一键复刻：检查页面可用、DeepSeek API 调用、ForgeProject 表持久化
  - 商业画布：检查页面可用、DeepSeek API 调用、CanvasReport 表持久化
  - 公开日志流：检查页面渲染、日志发布、前缀筛选、API 读写
  - 用户认证：检查注册 profile 写入、登录/登出、token 携带
  - 历史查询：检查 `/api/generate/forge/history` 和 `/api/generate/canvas/history` 路由
  - 输出诊断报告
- **Test Requirements**:
  - `human-judgment` TR-2.1: 每个模块的检查结果已记录
- **Estimate**: 20 min

## [x] Task 3: 数据一致性检查（P0）
- **Priority**: P0
- **Depends On**: None
- **Description**: 检查 Prisma 迁移状态和 Supabase 表结构完整性。
  - 运行 `npx prisma migrate status` 确认迁移全部应用
  - 检查 `profiles` 表存在
  - 检查 `ForgeProject.userId` 和 `ForgeProject.result` 字段
  - 检查 `CanvasReport.userId` 和 `CanvasReport.result` 字段
  - 检查 `LogEntry.userId` 字段
- **Test Requirements**:
  - `programmatic` TR-3.1: Prisma 迁移状态显示全部已应用
  - `programmatic` TR-3.2: 关键表字段存在
- **Estimate**: 10 min

## [x] Task 4: API 错误处理与路径审计（P0）
- **Priority**: P0
- **Depends On**: None
- **Description**: 审计所有 API 路由的错误处理状态码和前端路径引用。
  - 遍历 `src/app/api/**/*.ts` 所有路由文件
  - 确认无返回 200 但包含错误对象的情况
  - 检查前端所有 `fetch` 调用都有 `response.ok` 检查
  - 全项目搜索 `/api/` 字符串，确保无 404 路径
- **Test Requirements**:
  - `programmatic` TR-4.1: 所有 API 路由错误返回正确状态码
  - `programmatic` TR-4.2: 前端 fetch 调用均有 ok 检查
  - `programmatic` TR-4.3: 无 404 路径引用
- **Estimate**: 15 min

## [x] Task 5: 修复全局容器响应式布局（P0）
- **Priority**: P0
- **Depends On**: None
- **Description**: 在 `src/app/layout.tsx` 中确保页面主内容区域使用标准响应式容器。
  - 将 `<div className="w-full">{children}</div>` 改为 `<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">{children}</main>`
  - 检查并更新 `globals.css` 中 `.container-app` 定义，确保 `max-width` 和 `padding` 符合响应式要求
- **Test Requirements**:
  - `human-judgment` TR-5.1: 桌面端页面内容居中且不过度拉伸
  - `human-judgment` TR-5.2: 移动端页面内容有合适的内边距
- **Estimate**: 10 min

## [x] Task 6: 统一按钮触摸目标尺寸（P0）
- **Priority**: P0
- **Depends On**: None
- **Description**: 更新 `src/components/ui/button.tsx`，确保按钮尺寸满足移动端触摸目标。
  - `md` 尺寸从 `h-9` 改为 `h-11`（44px），添加 `min-h-[44px]`
  - `lg` 尺寸从 `h-11` 改为 `h-12`（48px），添加 `min-h-[44px]`
- **Test Requirements**:
  - `programmatic` TR-6.1: Button 组件 md 尺寸高度 >= 44px
  - `programmatic` TR-6.2: Button 组件 lg 尺寸高度 >= 44px
- **Estimate**: 5 min

## [x] Task 7: 增强输入框与表单可用性（P1）
- **Priority**: P1
- **Depends On**: None
- **Description**: 更新 `src/components/ui/input.tsx` 并检查所有表单。
  - 在 Input 组件中添加 `min-h-[44px]`
  - 检查各页面表单：确保 `<label>` 通过 `htmlFor` 与输入框关联
  - 确保表单有 `space-y-2` 或等价的垂直间距
- **Test Requirements**:
  - `programmatic` TR-7.1: Input 组件有 min-h-[44px]
  - `human-judgment` TR-7.2: 表单标签与输入框正确关联
- **Estimate**: 10 min

## [x] Task 8: 修复特定页面移动端适配（P1）
- **Priority**: P1
- **Depends On**: Task 5
- **Description**: 修复各页面的移动端布局问题。
  - 雷达页：筛选栏在移动端竖排显示，每个筛选项 `w-full`
  - 复刻/画布页：输入框和生成按钮纵向堆叠，按钮 `w-full sm:w-auto`
  - 流页面：发布表单在移动端全宽，日志列表卡片宽度自适应
  - 登录/注册：表单在移动端保持合适边距，按钮全宽
- **Test Requirements**:
  - `human-judgment` TR-8.1: 375px 宽度下各页面无布局问题
  - `human-judgment` TR-8.2: 768px 宽度下各页面布局正常
- **Estimate**: 20 min

## [x] Task 9: 输出 MVP 差距分析报告（P1）
- **Priority**: P1
- **Depends On**: Task 2, Task 3, Task 4
- **Description**: 基于 Task 2-4 的诊断结果，填写 MVP 差距分析表，总结未完成的功能。
  - 信号抓取与存储：完成 - Vercel Cron 每天执行 /api/crawl，crawlAllSources 抓取 9+ 源
  - 信号评分：完成 - /api/score/batch Cron 每天执行，DeepSeek API 评分
  - 复刻生成：完成 - DeepSeek API 调用成功，持久化到 ForgeProject 表
  - 画布分析：完成 - DeepSeek API 调用成功，持久化到 CanvasReport 表
  - 公开日志：完成 - 发布/读取 API 完整，前缀筛选正确
  - 认证：完成 - Supabase Auth + /api/auth/profile 自动创建 profiles
  - UI/UX：已修复 - 全局容器响应式、按钮 44px 触摸目标、表单 label 关联
  - 部署：已修复 - vercel.json crons 移除 method 属性，构建通过
  - 未完成：历史查询 API 路由存在但前端无导航入口；stream/radar 页面有 mock 回退；部分内联 style 未迁移
- **Test Requirements**:
  - `human-judgment` TR-9.1: 差距分析表完整填写 ✓
  - `human-judgment` TR-9.2: 未完成功能有明确总结 ✓
- **Estimate**: 10 min

## [x] Task 10: 构建验证与收尾（P0）
- **Priority**: P0
- **Depends On**: Task 1, Task 5, Task 6, Task 7, Task 8
- **Description**: 执行最终构建验证。
  - 运行 `npm run build` 确保无错误
  - 确认所有修改不引入新问题
- **Test Requirements**:
  - `programmatic` TR-10.1: `npm run build` 成功
  - `programmatic` TR-10.2: 无 ESLint 错误
- **Estimate**: 5 min

# Task Dependencies
```
Task 1 (vercel.json fix)  ──────────────────────┐
Task 2 (功能诊断)        ──┐                      │
Task 3 (数据一致性)       ──┼──→ Task 9 (差距分析) │
Task 4 (API 审计)         ──┘                      │
Task 5 (容器响应式)       ────────────────────────┤
Task 6 (按钮尺寸)         ────────────────────────┼──→ Task 10 (构建验证)
Task 7 (输入框增强)       ────────────────────────┤
Task 8 (页面适配)         ── depends on Task 5 ───┘
```

Total estimate: ~110 min