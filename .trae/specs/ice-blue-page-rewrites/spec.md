# Ice-Blue Page Rewrites Spec

## Why
完成冰焰蓝设计系统迁移的最后三个关键页面：信号详情页、登录/注册页、SignalCard 组件。这些页面目前仍使用橙色主题，需要统一为新设计系统。

## What Changes
- 重写 `src/app/radar/[id]/page.tsx` — 信号详情页，使用冰焰蓝 + UI 组件库
- 新建 `src/components/AuthCard.tsx` — 共用登录/注册卡片组件
- 重写 `src/app/login/page.tsx` — 引用 AuthCard mode="login"
- 重写 `src/app/register/page.tsx` — 引用 AuthCard mode="register"
- 重写 `src/components/SignalCard.tsx` — 保持 Props 接口不变，使用冰焰蓝 + ContentCard

## Impact
- Affected specs: dashboard-page, ice-blue-page-rewrites
- Affected code: 5 个文件（1 新建 + 4 重写）

## ADDED Requirements

### Requirement: 信号详情页
系统 SHALL 提供信号详情页，展示标题、来源、评分、趋势图、AI 分析、描述、标签和操作按钮。

#### Scenario: 页面布局
- **WHEN** 用户访问 /radar/[id]
- **THEN** 显示面包屑（首页 > 创意雷达 > 信号详情）
- **AND** 左侧主区域占 2/3 宽，右侧边栏占 1/3 宽
- **AND** 移动端（<768px）右侧边栏移到主区域下方

#### Scenario: 数据加载
- **WHEN** 页面加载
- **THEN** 使用 fetch('/api/signals/[id]') 获取数据
- **AND** 加载中显示 Skeleton 占位
- **AND** 加载失败显示错误提示

#### Scenario: 操作按钮
- **WHEN** 页面渲染
- **THEN** 右侧边栏显示 Primary 按钮"一键复刻"（链接 /forge?signalId=xxx）
- **AND** 显示来源链接（新标签打开）
- **AND** 显示 Ghost 按钮"分享"（复制链接到剪贴板，Toast 提示）

### Requirement: AuthCard 共用组件
系统 SHALL 提供 AuthCard 组件，支持登录和注册两种模式。

#### Scenario: 登录模式
- **WHEN** mode="login"
- **THEN** 显示标题"登录"、邮箱 Input、密码 Input、登录按钮、底部"还没有账号？注册"链接

#### Scenario: 注册模式
- **WHEN** mode="register"
- **THEN** 显示标题"创建账号"、邮箱 Input、密码 Input、昵称 Input、注册按钮、底部"已有账号？登录"链接

#### Scenario: 表单状态
- **WHEN** 提交表单
- **THEN** 按钮显示 loading 状态（"登录中..." / "注册中..."）并禁用
- **AND** 错误时显示红色错误信息
- **AND** 已登录用户自动跳转 /radar

### Requirement: SignalCard 组件重写
系统 SHALL 重写 SignalCard 组件，保持 Props 接口不变，使用冰焰蓝设计系统。

#### Scenario: 组件渲染
- **WHEN** 传入 Signal 类型数据
- **THEN** 使用 ContentCard 作为外壳
- **AND** 左侧显示来源 Badge + 热度分数（font-mono）
- **AND** 右侧显示标题 + 描述（截断 2 行）+ 底部标签和时间
- **AND** hover 时边框变 spark-blue、卡片上浮 translateY(-2px) + shadow