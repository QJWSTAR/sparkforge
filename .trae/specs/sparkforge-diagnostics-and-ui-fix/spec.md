# SparkForge 项目状态诊断与 UI 改进

## Why
Vercel 构建因 `vercel.json` 中 crons 的 `method` 属性报错，且用户反馈页面存在响应式适配不足、按钮尺寸小、点击区域不足等 UI 问题。需要全面诊断项目状态、识别 MVP 差距，并修复所有阻塞问题。

## What Changes
- **BREAKING**: 移除 `vercel.json` 中两个 crons 条目的 `method` 属性（Vercel 不支持）
- 全面扫描功能模块完成度（信号雷达、复刻、画布、日志流、认证、历史查询）
- 检查数据一致性（Prisma 迁移、Supabase 表结构、profiles 触发器）
- 审计所有 API 路由的错误处理与状态码
- 检查前端 fetch 调用和路径引用的正确性
- 输出 MVP 差距分析报告
- 修复全局容器响应式布局
- 统一按钮触摸目标尺寸（最小 44px）
- 增强输入框与表单可用性
- 修复特定页面移动端适配问题

## Impact
- Affected code: `vercel.json`, `src/app/layout.tsx`, `src/app/globals.css`, `src/components/ui/button.tsx`, `src/components/ui/input.tsx`, 各页面 `page.tsx`
- Affected specs: None (new spec)

## ADDED Requirements

### Requirement: Vercel Cron 配置修复
系统 SHALL 在 `vercel.json` 中移除 crons 条目的 `method` 属性，只保留 `path` 和 `schedule`。

#### Scenario: Vercel 构建成功
- **WHEN** 推送代码到 Vercel
- **THEN** 构建过程不报 `Invalid vercel.json - crons[0] should NOT have additional property method` 错误

### Requirement: 功能模块完成度诊断
Agent SHALL 逐项检查信号雷达、一键复刻、商业画布、公开日志流、用户认证、历史查询六个模块的完成状态，并记录结果。

#### Scenario: 模块完成度检查
- **WHEN** Agent 执行诊断
- **THEN** 每个模块的页面渲染、API 数据、核心功能均被验证并记录

### Requirement: 数据一致性检查
Agent SHALL 检查 Prisma 迁移状态、Supabase 关键表结构（profiles、ForgeProject、CanvasReport、LogEntry 的必要字段）以及注册后 profiles 自动创建是否正确。

#### Scenario: 迁移全部应用
- **WHEN** 运行 `npx prisma migrate status`
- **THEN** 所有迁移标记为已应用

### Requirement: API 错误处理审计
系统 SHALL 确保所有 API 路由在错误情况下返回正确的 HTTP 状态码（401/400/500 等），不存在返回 200 但包含错误对象的情况。

#### Scenario: 错误状态码正确
- **WHEN** 任意 API 路由发生错误
- **THEN** 返回对应错误状态码，不返回 200

### Requirement: 全局容器响应式
系统 SHALL 在 `src/app/layout.tsx` 中确保页面主内容区域使用 `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full` 响应式容器，使所有页面内容适应不同宽度。

#### Scenario: 移动端页面正常显示
- **WHEN** 在 375px 宽度设备上打开任意页面
- **THEN** 内容不溢出、无横向滚动条、元素不重叠

### Requirement: 按钮触摸目标尺寸
系统 SHALL 确保所有按钮最小高度为 44px，满足移动端触摸目标标准。

#### Scenario: 按钮尺寸符合触摸标准
- **WHEN** 检查 `Button` 组件的 `md` 和 `lg` 尺寸
- **THEN** 每个尺寸的高度至少为 44px

### Requirement: 输入框与表单增强
系统 SHALL 确保输入框 `min-h-[44px]`，表单中 `<label>` 通过 `htmlFor` 与输入框关联，表单有合理垂直间距。

#### Scenario: 输入框可用性
- **WHEN** 用户在任何表单中输入
- **THEN** 输入框高度足够触摸操作，标签与输入框正确关联

### Requirement: 特定页面响应式修复
系统 SHALL 确保雷达页筛选栏在移动端竖排、复刻/画布页输入框和按钮纵向堆叠、流页面发布表单全宽、登录/注册表单边距合适。

#### Scenario: 各页面移动端正常
- **WHEN** 在移动端设备上访问各功能页面
- **THEN** 页面布局合理，无元素溢出或重叠

## Constraints
- Next.js 15 App Router + TypeScript + Tailwind v4 + Supabase + Prisma
- Vercel Cron Job 仅支持 `path` 和 `schedule` 两个属性
- 评分系统仅使用 DeepSeek API
- 所有提示信息必须使用中文