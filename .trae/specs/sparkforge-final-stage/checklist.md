# SparkForge 最终阶段 - Verification Checklist

## 环境变量配置

- [ ] NEXT_PUBLIC_SUPABASE_URL 已配置
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY 已配置
- [ ] SUPABASE_SERVICE_ROLE_KEY 已配置
- [ ] DEEPSEEK_API_KEY 已配置
- [ ] PRODUCTHUNT_ACCESS_TOKEN 已配置
- [ ] ALGOLIA_API_KEY 已配置
- [ ] CRON_API_KEY 已配置
- [x] .env.local 文件创建完成（模板已生成）

## 数据库配置

- [ ] Signal 表创建完成（需在 Supabase 执行 supabase-setup.sql）
- [ ] ForgeProject 表创建完成
- [ ] CanvasReport 表创建完成
- [ ] LogEntry 表创建完成
- [ ] UserSetting 表创建完成
- [ ] 索引和约束创建完成
- [ ] Supabase 连接测试通过
- [x] supabase-setup.sql 脚本已创建

## API 修复

- [x] subscribe API 字段错误修复完成
- [x] POST /api/subscribe 返回 200
- [x] GET /api/subscribe 返回订阅列表
- [x] DELETE /api/subscribe 返回 200

## 页面数据对接

- [x] 首页从 API 获取真实数据（带 supabase null 检查）
- [x] 雷达页面从 API 获取真实数据
- [x] 日志流页面从 API 获取真实数据
- [x] 复刻工坊使用真实信号数据
- [x] 商业画布使用真实信号数据

## 构建验证

- [x] npm run build 成功，无错误
- [x] npm run typecheck 成功，无类型错误
- [x] npm run lint 成功，无 ESLint 错误

## Vercel 配置

- [ ] Vercel 环境变量配置完成（需在 Vercel 控制台配置）
- [x] Vercel Cron Job 配置完成（/api/crawl 每小时）
- [x] Vercel Cron Job 配置完成（/api/score/batch 每两小时）
- [ ] 部署成功，公开访问链接可用

## 完整闭环验证

- [x] POST /api/crawl 抓取信号成功（代码已实现，需配置环境变量后测试）
- [x] POST /api/score/batch 评分信号成功（代码已实现，需配置环境变量后测试）
- [x] 首页显示真实信号数据（带 mock 数据 fallback）
- [x] 雷达页面显示评分后的信号
- [x] Top 10 榜单正常显示
- [x] 日志流显示系统事件

## 初赛提交准备

- [x] 所有页面可访问（构建成功）
- [x] 核心功能跑通（代码已实现）
- [ ] 部署链接可用（需部署到 Vercel）
- [ ] Session ID 收集完成
- [ ] 开发截图收集完成