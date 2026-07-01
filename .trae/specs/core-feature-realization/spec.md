# 核心功能真实化 - 将模拟功能连接到 AI 后端

## Overview
- **Summary**: 将复刻工坊和商业画布从模拟实现改造为真实调用 DeepSeek API 的功能，使其能够生成真实的代码方案和商业分析
- **Purpose**: 满足大赛复赛"核心价值验证"的要求，证明产品不是纯概念演示
- **Target Users**: 大赛评委、产品用户

## Goals
- 复刻工坊调用 DeepSeek API 生成真实的项目方案和代码框架
- 商业画布调用 DeepSeek API 生成真实的商业模型分析
- 触发数据抓取和评分，确保雷达页显示真实数据

## Non-Goals (Out of Scope)
- 不实现完整的代码生成和部署流程
- 不添加新的信号源

## Functional Requirements
- **FR-1**: 复刻工坊点击"开始复刻"后调用 DeepSeek API 生成项目方案
- **FR-2**: 商业画布点击"生成商业画布"后调用 DeepSeek API 生成商业分析
- **FR-3**: 数据库中应有真实的信号数据

## Acceptance Criteria

### AC-1: 复刻工坊真实生成
- **Given**: 用户选择信号并点击"开始复刻"
- **When**: 等待 AI 响应
- **Then**: 显示真实的 AI 生成的项目方案
- **Verification**: `human-judgment`

### AC-2: 商业画布真实生成
- **Given**: 用户选择信号并点击"生成商业画布"
- **When**: 等待 AI 响应
- **Then**: 显示真实的 AI 生成的商业分析
- **Verification**: `human-judgment`

### AC-3: 数据库有真实数据
- **Given**: 访问雷达页
- **When**: 页面加载完成
- **Then**: 显示真实的 Hacker News 和 Product Hunt 信号
- **Verification**: `human-judgment`

### AC-4: 构建验证
- **Given**: 运行构建命令
- **When**: 执行 npm run build
- **Then**: 构建成功无错误
- **Verification**: `programmatic`