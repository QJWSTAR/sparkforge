# 浏览器适配问题修复 - 检查清单

## 移动端兼容性
- [x] 雷达页使用 100dvh 替代 100vh，底部内容在移动端浏览器可见
- [x] 首页信号评分条在 320px 宽度下不溢出（改为 2x2 网格）
- [x] iOS 输入框聚焦时不自动缩放（font-size: 16px）
- [x] viewport 配置正确（device-width, initial-scale=1）

## 跨浏览器兼容性
- [x] Safari/Firefox 下拉框显示暗色主题（color-scheme: dark）
- [x] color-scheme: dark 已添加到 :root
- [x] 输入框字体大小为 16px

## 移动端筛选面板
- [x] 移动端筛选按钮可点击
- [x] 筛选面板正确渲染（已验证，第 499-629 行）
- [x] 筛选面板可关闭

## 构建验证
- [x] npm run build 成功