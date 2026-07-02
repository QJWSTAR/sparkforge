# Tasks

- [x] Task 1: 重写信号详情页 `src/app/radar/[id]/page.tsx`
  - [x] 使用 'use client'，fetch('/api/signals/[id]') 获取数据
  - [x] 实现面包屑导航（首页 > 创意雷达 > 信号详情）
  - [x] 左侧主区域（2/3 宽）：标题 + 来源 Badge、热度评分（48px font-mono spark-blue）、7 竖条趋势图、AI 分析摘要（ContentCard + 左侧竖条）、详细描述、标签列表
  - [x] 右侧边栏（1/3 宽）：一键复刻 Button primary、来源链接、分享按钮（Ghost + 复制链接 + Toast）
  - [x] 加载中显示 Skeleton，错误时显示错误提示
  - [x] 移动端 <768px 右侧边栏移到主区域下方

- [x] Task 2: 创建 AuthCard 组件 + 重写登录/注册页
  - [x] 新建 `src/components/AuthCard.tsx`（mode: 'login' | 'register'）
  - [x] 实现居中卡片（bg-graphite, border-border-line, rounded-lg, p-8）
  - [x] 顶部 Sparkles 图标 + 标题（登录/创建账号）
  - [x] 邮箱 Input + 密码 Input（注册模式多昵称 Input）
  - [x] 主按钮全宽（loading 状态 + 禁用 + 错误信息）
  - [x] 底部切换链接（fog + spark-blue 链接）
  - [x] 重写 `src/app/login/page.tsx`（引用 AuthCard mode="login"）
  - [x] 重写 `src/app/register/page.tsx`（引用 AuthCard mode="register"）

- [x] Task 3: 重写 SignalCard 组件 `src/components/SignalCard.tsx`
  - [x] 保持 Props 接口不变（SignalCardProps: signal, rank?）
  - [x] 使用 ContentCard 作为外壳
  - [x] 左侧：来源 Badge + 热度分数（font-mono）
  - [x] 右侧：标题 + 描述截断 2 行 + 底部标签 + 时间
  - [x] hover 时边框变 spark-blue + translateY(-2px) + shadow

- [x] Task 4: 验证与构建
  - [x] 运行 `npm run build` 确认编译通过
  - [x] 验证所有颜色使用 CSS 变量/ Tailwind utility
  - [x] 验证所有间距为 4px 倍数

# Task Dependencies
- Task 1, 2, 3 相互独立，可并行执行
- Task 4 依赖 Task 1, 2, 3 全部完成