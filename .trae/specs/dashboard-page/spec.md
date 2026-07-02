# SparkForge 仪表盘页面 Spec

## Why
需要为 SparkForge 提供一个集中式的仪表盘页面，展示核心统计指标、创意信号列表和快捷操作入口，作为用户进入系统后的主视图。

## What Changes
- 新增 `src/pages/Dashboard.tsx` 仪表盘页面组件
- 使用已有的 `src/components/ui/` 组件库（Button, Input, DataCard, ContentCard, Badge, Avatar）
- 使用静态 mock 数据展示统计指标和信号列表

## Impact
- Affected specs: 无
- Affected code: `src/pages/Dashboard.tsx`（新建），`src/components/ui/`（引用）

## ADDED Requirements

### Requirement: 页面布局结构
系统 SHALL 提供包含导航栏、侧边栏、主内容区的三区域仪表盘布局。

#### Scenario: 桌面端布局
- **WHEN** 视口宽度 >= 768px
- **THEN** 导航栏固定在顶部（h: 56px, 全宽, bg: #0A0E14, 底部边框 1px #30363D）
- **AND** 侧边栏固定在左侧（w: 240px, bg: #0A0E14, 右侧边框 1px #30363D, padding: 16px）
- **AND** 主内容区偏移（ml: 240px, mt: 56px, padding: 24px 32px）

#### Scenario: 移动端布局
- **WHEN** 视口宽度 < 768px
- **THEN** 侧边栏默认隐藏
- **AND** 提供菜单按钮可切换侧边栏显示/隐藏
- **AND** 主内容区不偏移（ml: 0）

### Requirement: 统计卡片区
系统 SHALL 在页面顶部以 3 列网格展示统计指标卡片。

#### Scenario: 展示统计卡片
- **WHEN** 页面加载
- **THEN** 显示 3 个 DataCard 组件（grid-cols-3, gap: 16px）
- **AND** 每个卡片使用 DataCard 组件的 default 变体
- **AND** 卡片分别展示：创意信号总数、今日活跃度、平均评分

#### Scenario: 移动端适配
- **WHEN** 视口宽度 < 768px
- **THEN** 统计卡片改为单列布局（grid-cols-1）

### Requirement: 信号列表
系统 SHALL 在统计卡片下方展示创意信号列表，每条信号使用 ContentCard 包裹。

#### Scenario: 展示信号列表
- **WHEN** 页面加载
- **THEN** 信号列表以垂直列表形式展示，间距 16px
- **AND** 每条信号使用 ContentCard 组件，hover 时边框变为 #4DA8FF
- **AND** 信号卡内包含：标题、描述、分类标签（Badge 组件）、评分

#### Scenario: 信号卡交互
- **WHEN** 用户悬停信号卡
- **THEN** 卡片边框颜色变为 #4DA8FF
- **WHEN** 用户点击"一键复刻"按钮
- **THEN** 按钮触发 active:scale-[0.97] 缩放反馈

### Requirement: 操作按钮
系统 SHALL 为每条信号提供操作按钮，严格遵守单一主按钮约束。

#### Scenario: 按钮展示
- **WHEN** 信号列表渲染
- **THEN** 每条信号右侧展示一个 Primary 变体 Button（"一键复刻"）
- **AND** 每条信号右侧展示 Ghost 变体 Button（"收藏"、"分享"）
- **AND** 全页仅保留一个 Primary 按钮（一键复刻），其余操作使用 Ghost 变体

### Requirement: 导航栏集成
系统 SHALL 在导航栏右侧展示搜索框和用户头像。

#### Scenario: 导航栏元素
- **WHEN** 页面加载
- **THEN** 导航栏右侧展示 Input 组件（搜索框，placeholder: "搜索信号..."）
- **AND** 导航栏右侧展示 Avatar 组件（size: md, 32px, status: online）

### Requirement: 设计令牌约束
系统 SHALL 严格使用 CSS 变量引用颜色，不硬编码色值。

#### Scenario: 颜色使用
- **WHEN** 组件渲染
- **THEN** 所有颜色通过 Tailwind utility（bg-ui-*, text-ui-*, border-ui-*）或 CSS 变量引用
- **AND** 所有间距为 4px 的倍数

### Requirement: 图标使用
系统 SHALL 使用 lucide-react 图标库。

#### Scenario: 图标展示
- **WHEN** 页面渲染
- **THEN** 搜索框使用 Search 图标
- **AND** 收藏按钮使用 Heart 图标
- **AND** 分享按钮使用 Share2 图标
- **AND** 菜单按钮使用 Menu 图标
- **AND** 统计卡片趋势使用 TrendingUp/TrendingDown 图标