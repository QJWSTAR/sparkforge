# SparkForge 开发落地 - Product Requirement Document

## Overview
- **Summary**: 将 SparkForge 从文档阶段推进到可部署的完整 Demo，满足 TRAE AI 创造力大赛初赛晋级要求
- **Purpose**: 实现最小闭环（信号抓取 → LLM 评分 → 展示 → 一键复刻），获取可访问的部署链接，收集完整开发证据（截图 + Session ID），成功晋级复赛
- **Target Users**: TRAE AI 创造力大赛评审团、独立开发者、创业团队

## Goals
- [ ] 完成项目初始化与部署骨架，获取 Vercel 公开访问链接
- [ ] 实现创意雷达页面，支持 Mock 数据和真实信号源展示
- [ ] 实现 LLM 4 维评分系统，每日自动推送 Top 10 信号
- [ ] 实现一键复刻功能，对接 TRAE IDE 自动化管线
- [ ] 收集 ≥3 张开发截图和 ≥3 个 Session ID
- [ ] 发布完整的初赛 Demo 帖，成功晋级复赛

## Non-Goals (Out of Scope)
- [ ] 企业版 API 接入
- [ ] 抖音直播每日 MVP
- [ ] 飞书插件开发
- [ ] 开源评分模型
- [ ] "创意投资币"功能

## Background & Context
- 项目当前处于文档阶段，拥有完整的产品方案、技术架构图、MVP 交互 Demo 和 30 天计划
- 根据 TRAE 大赛初赛指南，必须提供可体验的 Demo、开发截图和 Session ID 才能晋级
- 评审关注四个维度：创意价值、技术实现、TRAE 实践过程、作品完整性
- 抖音人气通道提供额外 50 个复赛名额

## Functional Requirements
- **FR-1**: 项目初始化与 CI/CD 配置
- **FR-2**: 数据层搭建（Supabase + Redis）
- **FR-3**: 创意雷达页面（信号列表 + 评分展示）
- **FR-4**: 真实信号源接入（Product Hunt + Hacker News）
- **FR-5**: LLM 4 维评分系统
- **FR-6**: 一键复刻功能（TRAE IDE 集成）
- **FR-7**: 公开日志流页面
- **FR-8**: 初赛提交材料准备

## Non-Functional Requirements
- **NFR-1**: 部署链接可随时公开访问
- **NFR-2**: 核心功能响应时间 < 3s
- **NFR-3**: LLM 调用成本控制在 ¥0.23/MVP 以内
- **NFR-4**: 响应式设计，支持移动端访问
- **NFR-5**: 代码符合 TypeScript 类型安全要求

## Constraints
- **Technical**: Next.js 15 + TypeScript + TailwindCSS + Supabase
- **Business**: 7 月 15 日初赛截止，需在此前完成所有开发和提交
- **Dependencies**: TRAE IDE API、LLM API（DeepSeek/MiMo）、Vercel、Supabase

## Assumptions
- [ ] 报名帖已通过审核
- [ ] 具备必要的 API Key（Supabase、LLM、TRAE）
- [ ] TRAE IDE 能正常调用和返回结果
- [ ] Vercel 部署免费额度足够

## Acceptance Criteria

### AC-1: 项目初始化完成
- **Given**: 空项目目录
- **When**: 使用 create-next-app 初始化项目并配置 Vercel
- **Then**: 获取可访问的 Vercel 部署链接，CI/CD 流程正常工作
- **Verification**: `programmatic`
- **Notes**: 记录 Session ID 和部署成功截图

### AC-2: 数据层搭建完成
- **Given**: Supabase 项目已创建
- **When**: 创建数据表并配置 pgvector 和 Redis
- **Then**: 数据库连接正常，表结构完整，客户端 SDK 可用
- **Verification**: `programmatic`
- **Notes**: 记录 Session ID 和数据库截图

### AC-3: 创意雷达页面可体验
- **Given**: Mock 数据已准备
- **When**: 访问信号雷达页面
- **Then**: 显示信号列表、4 维评分 mini-bar、KPI 指标，页面响应式布局正常
- **Verification**: `human-judgment`
- **Notes**: 记录 Session ID 和页面截图

### AC-4: 真实信号源接入
- **Given**: Product Hunt 和 Hacker News API 已配置
- **When**: 运行信号抓取任务
- **Then**: 数据库中存储真实信号数据，去重机制生效
- **Verification**: `programmatic`
- **Notes**: 记录 Session ID 和抓取日志截图

### AC-5: LLM 评分系统运行
- **Given**: LLM API 已配置
- **When**: 触发评分任务
- **Then**: 每个信号获得 4 维评分和综合分，Top 10 自动推送
- **Verification**: `programmatic`
- **Notes**: 记录 Session ID 和评分结果截图

### AC-6: 一键复刻功能可用
- **Given**: TRAE IDE API 已配置
- **When**: 点击"一键复刻"按钮
- **Then**: 显示本地化改造度，可配置复刻选项，TRAE 调用成功
- **Verification**: `human-judgment`
- **Notes**: 记录 Session ID 和复刻面板截图

### AC-7: 公开日志流展示
- **Given**: 系统运行中
- **When**: 访问日志流页面
- **Then**: 显示实时事件时间轴，支持事件类型分类
- **Verification**: `human-judgment`
- **Notes**: 记录 Session ID 和日志页面截图

### AC-8: 初赛提交材料完整
- **Given**: 所有功能已完成
- **When**: 收集证据并发布 Demo 帖
- **Then**: 包含 ≥3 张截图、≥3 个 Session ID、可访问的体验链接、完整的帖结构
- **Verification**: `human-judgment`
- **Notes**: 发布到初赛专区并记录链接

## Open Questions
- [ ] 报名帖审核状态确认
- [ ] TRAE IDE API 调用方式确认
- [ ] LLM API Key 获取方式
- [ ] Vercel 部署域名配置
