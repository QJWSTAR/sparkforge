# Tasks

- [x] Task 1: 创建仪表盘页面布局结构
  - [x] 创建 `src/pages/Dashboard.tsx` 文件
  - [x] 实现导航栏（h: 56px, 全宽, bg-ui-bg, 底部边框 #30363D, padding: 0 32px）
  - [x] 导航栏左侧放置 Logo/标题，右侧放置搜索框（Input + Search 图标）和用户头像（Avatar, md, online）
  - [x] 实现侧边栏（w: 240px, bg-ui-bg, 右侧边框 #30363D, padding: 16px）
  - [x] 侧边栏包含导航链接（首页、创意雷达、复刻工坊、商业画布、公开日志）
  - [x] 实现主内容区（ml: 240px, mt: 56px, padding: 24px 32px, bg-ui-bg）
  - [x] 实现移动端适配：<768px 侧边栏默认隐藏，Menu 按钮切换显示/隐藏

- [x] Task 2: 实现统计卡片区
  - [x] 定义 mock 统计数据（创意信号总数、今日活跃度、平均评分）
  - [x] 使用 DataCard 组件 3 列网格展示（grid-cols-3, gap: 16px）
  - [x] 移动端单列布局（grid-cols-1）

- [x] Task 3: 实现信号列表
  - [x] 定义 mock 信号数据（包含标题、描述、分类、评分、趋势、趋势值）
  - [x] 每条信号使用 ContentCard 包裹，hover 边框变蓝（已由 ContentCard 组件实现）
  - [x] 信号卡内展示：标题、描述、Badge 分类标签、评分
  - [x] 信号卡右侧展示操作按钮：Primary "一键复刻"、Ghost "收藏"（Heart 图标）、Ghost "分享"（Share2 图标）
  - [x] 列表间距 16px，垂直排列

- [x] Task 4: 验证与优化
  - [x] 运行 `npm run build` 确认编译通过
  - [x] 验证所有颜色使用 CSS 变量/ Tailwind utility，无硬编码色值
  - [x] 验证所有间距为 4px 倍数
  - [x] 验证移动端断点 <768px 侧边栏切换正常

# Task Dependencies
- Task 2 依赖 Task 1（需要布局就绪后放置统计卡片）
- Task 3 依赖 Task 1（需要布局就绪后放置信号列表）
- Task 2 和 Task 3 可并行执行
- Task 4 依赖 Task 1, 2, 3 全部完成