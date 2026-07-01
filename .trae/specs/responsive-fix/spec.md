# 浏览器适配问题修复

## Why
当前项目在移动端和桌面端浏览器中存在多个适配问题，导致显示异常和交互体验差。

## What Changes
- 修复雷达页 `100vh` 在移动端浏览器中不兼容地址栏的问题
- 修复首页信号卡片评分条在小屏幕下的溢出问题
- 修复 Safari/Firefox 原生下拉框样式不匹配暗色主题的问题
- 添加显式的 viewport 配置防止 iOS 自动缩放
- 设置输入框字体大小为 16px 防止 iOS 自动缩放
- 验证移动端筛选面板是否正确渲染

## Impact
- Affected code: globals.css, layout.tsx, page.tsx, radar/page.tsx, login/page.tsx, register/page.tsx

## ADDED Requirements

### Requirement: Mobile Viewport Compatibility
页面在移动端浏览器中应正确显示，不受地址栏影响。

#### Scenario: 在移动端浏览器打开页面
- **WHEN** 在 iPhone Safari 或 Android Chrome 中打开页面
- **THEN** 页面内容完整可见，底部内容不被地址栏遮挡

### Requirement: Form Controls Dark Mode
原生表单控件应适配暗色主题。

#### Scenario: 使用下拉框筛选
- **WHEN** 在 Safari/Firefox 中点击下拉框
- **THEN** 下拉选项显示暗色背景和亮色文字

### Requirement: iOS Input Auto-Zoom Prevention
输入框聚焦时不应触发 iOS 自动缩放。

#### Scenario: 在 iOS 上聚焦输入框
- **WHEN** 在 iOS 设备上点击输入框
- **THEN** 页面不自动缩放

## Constraints
- Next.js 15 App Router 架构
- TailwindCSS 4 + CSS 变量设计系统
- 需要兼容 Chrome、Firefox、Safari、Edge 最新版本