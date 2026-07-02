# SparkForge 项目状态诊断与 UI 改进 - 验证清单

## Vercel 构建修复
- [x] `vercel.json` 中 crons 条目不再包含 `method` 属性
- [x] 每个 cron 条目只保留 `path` 和 `schedule`
- [x] `npm run build` 通过

## 功能模块诊断
- [x] 信号雷达：页面渲染正常，API 数据返回，分页/排序/筛选功能正常
- [x] 一键复刻：页面可访问，DeepSeek API 调用成功，结果持久化到 ForgeProject 表
- [x] 商业画布：页面可访问，DeepSeek API 调用成功，结果持久化到 CanvasReport 表
- [x] 公开日志流：页面渲染正常，日志发布功能可用，前缀筛选正常
- [x] 用户认证：注册后 profiles 表自动创建记录，登录/登出正常，token 携带正确
- [x] 历史查询：`/api/generate/forge/history` 和 `/api/generate/canvas/history` 路由存在

## 数据一致性
- [x] Prisma schema 定义完整（Signal、ForgeProject、CanvasReport、LogEntry、UserSetting 模型）
- [x] `profiles` 表通过 Supabase Auth 触发器自动创建
- [x] `ForgeProject.userId` 和 `ForgeProject.result` 字段存在
- [x] `CanvasReport.userId` 和 `CanvasReport.result` 字段存在
- [x] `LogEntry.userId` 字段存在

## API 错误处理
- [x] 所有 API 路由错误返回正确 HTTP 状态码（401/400/500/404/503），不返回 200
- [x] 前端所有 `fetch` 调用均有 `response.ok` 检查
- [x] 全项目无 `/api/` 404 路径引用

## 响应式布局
- [x] 全局容器使用 `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full`
- [x] `.container-app` 定义符合响应式要求（max-width + margin auto + padding）
- [x] 页面使用 grid 响应式布局（grid-cols-1 md:grid-cols-2 lg:grid-cols-3）
- [x] Navbar 移动端有汉堡菜单
- [x] 桌面端内容居中且不过度拉伸

## 按钮与交互
- [x] Button 组件 md 尺寸高度 >= 44px（h-11 + min-h-[44px]）
- [x] Button 组件 lg 尺寸高度 >= 44px（h-12 + min-h-[44px]）
- [x] 所有按钮 hover/focus 状态有视觉反馈（transition-all duration-150）
- [x] 按钮使用 inline-flex items-center justify-center gap-2

## 输入框与表单
- [x] Input 组件有 `min-h-[44px]`
- [x] AuthCard 表单 `<label>` 通过 `htmlFor` 与输入框关联
- [x] Stream 发布表单有 `sr-only` label 关联
- [x] 表单有 `space-y-4` 垂直间距

## 特定页面适配
- [x] 雷达页：移动端筛选面板（bottom sheet）已实现，筛选栏竖排
- [x] 复刻页：使用 grid lg:grid-cols-3 响应式布局，按钮 w-full
- [x] 画布页：使用 grid lg:grid-cols-4 响应式布局，按钮 w-full
- [x] 流页面：发布表单全宽，日志卡片 flex 布局自适应
- [x] 登录/注册：max-w-md 居中，按钮 w-full

## MVP 差距分析
- [x] 差距分析表完整填写（8 个功能块均评估）
- [x] 未完成功能有明确总结（历史查询前端入口、mock 回退、内联 style）

## 构建验证
- [x] `npm run build` 成功
- [x] 无 ESLint 错误
- [x] 无 TypeScript 编译错误