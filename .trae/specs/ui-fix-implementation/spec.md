# SparkForge UI Fix Implementation Spec

## Why
基于评审评估报告发现的UI问题，执行P0和P1优先级的代码修复，解决设计系统不一致、移动端体验缺失、交互缺陷等核心问题。

## What Changes
- 修复 layout.tsx 硬编码颜色，打通设计系统
- 修复首页标题渐变语法错误
- 实现移动端汉堡菜单导航
- 实现雷达页移动端筛选面板
- 添加搜索防抖 hook
- 修复商业画布三列对齐
- 统一登录/注册/个人中心页设计系统引用
- 删除 profile 页重复导航栏
- 为所有卡片添加阴影系统
- 修复亮色模式主色和文字对比度

## Impact
- Affected specs: sparkforge-evaluation-and-optimization
- Affected code: layout.tsx, globals.css, Navbar.tsx, page.tsx, radar/page.tsx, forge/page.tsx, canvas/page.tsx, login/page.tsx, register/page.tsx, profile/page.tsx, SignalCard.tsx, stream/page.tsx
- New files: src/lib/hooks.ts

## ADDED Requirements
### Requirement: Design System Consistency
All pages MUST use CSS variables from globals.css instead of hardcoded color values.

#### Scenario: Layout root uses design system
- **WHEN** page renders
- **THEN** body background and text color come from var(--color-bg) and var(--color-text)

#### Scenario: Auth pages use design system
- **WHEN** visiting login/register/profile pages
- **THEN** all colors reference CSS variables, not hardcoded Tailwind classes

### Requirement: Mobile Navigation
Mobile users MUST be able to navigate between all pages.

#### Scenario: Mobile hamburger menu
- **WHEN** viewing on mobile (<768px)
- **THEN** hamburger menu button is visible, clicking it shows navigation links

### Requirement: Mobile Signal Filtering
Mobile users MUST be able to filter signals on radar page.

#### Scenario: Mobile filter drawer
- **WHEN** viewing radar page on mobile
- **THEN** filter button is visible, clicking opens bottom sheet with source filters

### Requirement: Search Debounce
Search input on radar page MUST debounce API requests.

#### Scenario: Debounced search
- **WHEN** user types in search box
- **THEN** API request fires only after 300ms of inactivity