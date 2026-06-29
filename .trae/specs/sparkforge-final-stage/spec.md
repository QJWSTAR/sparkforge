# SparkForge 最终阶段 - Product Requirement Document

## Overview
- **Summary**: 将 SparkForge 推进到可完整运行的最终阶段，完成所有配置、修复和验证，确保项目能够正常部署和运行
- **Purpose**: 完成环境配置、数据库同步、API 功能验证、页面数据对接，确保项目可以作为完整的初赛作品提交
- **Target Users**: TRAE AI 创造力大赛评审团、独立开发者

## Goals
- [ ] 完成所有环境变量配置（本地 + Vercel）
- [ ] 同步 Supabase 数据库表结构
- [ ] 修复所有 API 和页面的 Mock 数据依赖
- [ ] 验证信号抓取、评分、展示完整闭环
- [ ] 配置 Vercel Cron Job 定时任务
- [ ] 确保构建成功，无 TypeScript 错误

## Non-Goals (Out of Scope)
- [ ] 新增功能开发
- [ ] 抖音人气通道视频制作
- [ ] 企业级功能扩展
- [ ] 性能优化（超出核心功能范围）

## Background & Context
- 项目已完成基础代码开发，包含完整的页面和 API 结构
- 已删除多余的 API Key（GEMINI_API_KEY, GROQ_API_KEY, MIMO_API_KEY）
- 评分系统仅保留 DeepSeek API，有启发式评分作为后备
- 需要配置的环境变量已精简到核心 7+ 个

## Functional Requirements
- **FR-1**: 环境变量配置完成（本地 .env.local + Vercel）
- **FR-2**: Supabase 数据库表结构同步
- **FR-3**: 修复 subscribe API 字段错误
- **FR-4**: 页面数据对接真实 API
- **FR-5**: 配置 Vercel Cron Job
- **FR-6**: 构建验证和测试

## Non-Functional Requirements
- **NFR-1**: 构建成功，无 TypeScript 错误
- **NFR-2**: 所有 API 端点返回 200 状态码
- **NFR-3**: 信号抓取 → 评分 → 展示闭环完整
- **NFR-4**: 响应式设计，支持移动端

## Constraints
- **Technical**: Next.js 15 + TypeScript + TailwindCSS + Supabase
- **Business**: 需尽快完成配置以提交初赛作品
- **Dependencies**: DeepSeek API、Product Hunt API、Supabase

## Assumptions
- [ ] 用户已拥有 Supabase 项目
- [ ] 用户已拥有 DeepSeek API Key
- [ ] 用户已拥有 Product Hunt Access Token
- [ ] Vercel 项目已创建并连接 GitHub 仓库

## Acceptance Criteria

### AC-1: 环境变量配置完成
- **Given**: 项目根目录
- **When**: 创建 .env.local 文件并配置所有必要变量
- **Then**: 本地开发服务器可以正常启动，数据库连接成功
- **Verification**: `programmatic`

### AC-2: 数据库表结构同步
- **Given**: Supabase 项目已创建
- **When**: 在 Supabase SQL 编辑器执行建表脚本
- **Then**: 所有表（Signal、ForgeProject、CanvasReport、LogEntry、UserSetting）创建成功
- **Verification**: `programmatic`

### AC-3: subscribe API 修复
- **Given**: UserSetting 表结构已知
- **When**: 修复 subscribe/route.ts 中的字段引用错误
- **Then**: POST/DELETE/GET 订阅 API 正常工作
- **Verification**: `programmatic`

### AC-4: 页面数据对接真实 API
- **Given**: API 端点已配置
- **When**: 更新页面组件使用真实 API 数据
- **Then**: 所有页面显示真实数据（fallback 到 Mock 仅在 API 不可用时）
- **Verification**: `human-judgment`

### AC-5: Vercel Cron Job 配置
- **Given**: Vercel 项目已部署
- **When**: 配置定时任务（每小时抓取、每天评分）
- **Then**: 定时任务正常执行，信号自动更新
- **Verification**: `programmatic`

### AC-6: 构建验证通过
- **Given**: 所有代码修改完成
- **When**: 运行 npm run build
- **Then**: 构建成功，无 TypeScript 错误，无 ESLint 错误
- **Verification**: `programmatic`

## Open Questions
- [ ] 用户是否已创建 Supabase 项目并获取连接信息？
- [ ] 用户是否已获取 DeepSeek API Key？
- [ ] 用户是否已获取 TRAE API Key？
- [ ] Vercel 项目是否已正确配置并连接？