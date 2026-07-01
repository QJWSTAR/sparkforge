# SparkForge Demo 提交评估与修复

## Why
根据顾问评估，当前项目存在多个影响 Demo 提交质量的关键问题，需要修复后才能达到提交标准。

## What Changes
- 修复客户端调用 subscribe API 时未携带 Authorization Bearer token 的问题
- 推送所有未提交的代码到 GitHub，确保 Vercel 部署最新版本
- 替换 demo-post.md 中的占位图片引用为实际截图
- 优化"功能即将上线"按钮的用户体验（使用禁用状态+tooltip替代alert）

## Impact
- Affected code: radar/[id]/page.tsx, stream/page.tsx, lib/auth.ts
- Affected docs: .trae/specs/prerequisite-gap-analysis/demo-post.md

## ADDED Requirements

### Requirement: Client Auth Token Handling
客户端调用 subscribe API 时必须携带有效的 Bearer token。

#### Scenario: 用户订阅信号
- **WHEN** 用户点击"订阅信号"按钮
- **THEN** 请求携带 Authorization: Bearer <supabase-token> 头

### Requirement: Demo Post Complete
Demo 帖子必须包含真实截图而非占位符。

#### Scenario: 查看 Demo 帖子
- **WHEN** 用户查看 Demo 帖子
- **THEN** 所有图片引用指向真实截图

## MODIFIED Requirements

### Requirement: Button UX
按钮应提供更优雅的交互反馈，而非简单的 alert。

#### Scenario: 点击未实现功能按钮
- **WHEN** 点击尚未实现的功能按钮
- **THEN** 显示禁用状态或 tooltip，而非 alert 弹窗

## Constraints
- Vercel Hobby 账户限制：Cron Job 每天执行一次
- DeepSeek API 仅作为主评分系统，启发式评分作为后备