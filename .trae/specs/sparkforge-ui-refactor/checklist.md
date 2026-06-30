# SparkForge UI 重构 - Verification Checklist

## 首页设计系统适配

- [ ] 首页使用 CSS 变量替代硬编码颜色
- [ ] Hero 区域颜色一致
- [ ] KPI 区域颜色一致
- [ ] Features 区域颜色一致
- [ ] 信号预览区域颜色一致
- [ ] CTA 和 Footer 区域颜色一致

## 页面导航栏统一

- [ ] forge 页面使用共享 Navbar 组件
- [ ] canvas 页面使用共享 Navbar 组件
- [ ] stream 页面使用共享 Navbar 组件
- [ ] 所有页面导航栏样式统一

## 设计系统变量使用

- [ ] forge 页面使用 CSS 变量
- [ ] canvas 页面使用 CSS 变量
- [ ] stream 页面使用 CSS 变量
- [ ] 无硬编码颜色值（除特殊场景）

## 响应式布局

- [ ] 320px 宽度正常显示
- [ ] 768px 宽度正常显示
- [ ] 1200px 宽度正常显示
- [ ] 1920px 宽度正常显示
- [ ] 移动端导航栏适配

## Cron Job 配置

- [ ] vercel.json 已更新为每天执行一次
- [ ] /api/crawl 每天执行一次
- [ ] /api/score/batch 每天执行一次

## 构建验证

- [ ] npm run build 成功
- [ ] npm run typecheck 成功
- [ ] npm run lint 成功

## Bug 扫描

- [ ] 无视觉不一致问题
- [ ] 无响应式布局问题
- [ ] 无交互元素功能问题
- [ ] 无 TypeScript 错误