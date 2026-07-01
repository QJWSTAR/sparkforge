# UI 视觉优化与交互体验提升

## Why
当前界面存在视觉呈现问题和美观度不足，需要进行全面优化以达到现代、美观、易用的设计标准。

## What Changes
- 定义统一的容器类 `.container-app` 替换不一致的容器模式
- 添加卡片 hover 微交互（浮起+阴影增强）
- 添加按钮点击微交互（按下缩放）
- 添加筛选标签切换过渡动画
- 优化首页 Hero 区域视觉层次（更大标题、更强渐变）
- 统一颜色方案和间距体系
- 优化各页面的视觉呈现

## Impact
- Affected code: globals.css, page.tsx, radar/page.tsx, radar/[id]/page.tsx, forge/page.tsx, canvas/page.tsx, stream/page.tsx, profile/page.tsx, login/page.tsx, register/page.tsx, components/Navbar.tsx, components/SignalCard.tsx

## ADDED Requirements

### Requirement: Unified Container Class
所有页面应使用统一的容器类，确保布局一致性。

#### Scenario: 浏览任意页面
- **WHEN** 访问任意页面
- **THEN** 内容宽度一致，左右内边距统一

### Requirement: Micro-interactions
所有可交互元素应具有视觉反馈。

#### Scenario: 鼠标悬停在卡片上
- **WHEN** 鼠标悬停在卡片上
- **THEN** 卡片浮起并增强阴影

#### Scenario: 点击按钮
- **WHEN** 点击按钮
- **THEN** 按钮有按下缩放效果

### Requirement: Smooth Transitions
切换筛选、标签等操作应具有平滑过渡动画。

#### Scenario: 切换筛选标签
- **WHEN** 点击筛选标签
- **THEN** 标签样式平滑过渡

## Constraints
- Next.js 15 App Router 架构
- TailwindCSS 4 + CSS 变量设计系统
- 需要兼容 Chrome、Firefox、Safari、Edge 最新版本