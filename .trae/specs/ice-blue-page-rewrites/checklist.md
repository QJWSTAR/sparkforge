# Verification Checklist

### 信号详情页
- [x] 面包屑导航显示：首页 > 创意雷达 > 信号详情
- [x] 左侧主区域占 2/3 宽，右侧边栏占 1/3 宽
- [x] 移动端 <768px 右侧边栏移到主区域下方
- [x] 信号标题 24px 粗体 ice-white + 来源 Badge
- [x] 热度评分 48px font-mono spark-blue
- [x] 7 竖条趋势图（纯 CSS 实现）
- [x] AI 分析摘要使用 ContentCard 包裹，左侧 spark-blue 竖条
- [x] 详细描述 16px fog 行高 1.8
- [x] 标签列表使用 Badge 组件
- [x] 右侧一键复刻按钮（Primary，链接 /forge?signalId=xxx）
- [x] 右侧来源链接（新标签打开）
- [x] 右侧分享按钮（Ghost，复制链接 + Toast 提示）
- [x] 加载中显示 Skeleton 占位
- [x] 加载失败显示错误提示
- [x] 使用 'use client' + fetch('/api/signals/[id]')

### AuthCard 组件
- [x] 居中卡片（bg-graphite, border-border-line, rounded-lg, p-8）
- [x] 顶部 Sparkles 图标 spark-blue
- [x] 登录模式标题"登录"，注册模式标题"创建账号"
- [x] 邮箱 Input + 密码 Input（注册模式多昵称 Input）
- [x] 主按钮全宽，loading 状态显示"登录中..." / "注册中..."
- [x] 错误信息红色文字显示
- [x] 底部切换链接（fog + spark-blue 链接）
- [x] 已登录用户自动跳转 /radar
- [x] login/page.tsx 和 register/page.tsx 正确引用 AuthCard

### SignalCard 组件
- [x] Props 接口不变（SignalCardProps: signal, rank?）
- [x] 使用 ContentCard 作为外壳
- [x] 左侧来源 Badge + 热度分数（font-mono）
- [x] 右侧标题 + 描述截断 2 行 + 底部标签 + 时间
- [x] hover 时边框变 spark-blue + translateY(-2px) + shadow

### 构建验证
- [x] `npm run build` 编译通过，无 TypeScript 错误
- [x] 所有颜色使用 Tailwind utility 或 CSS 变量
- [x] 所有间距为 4px 倍数