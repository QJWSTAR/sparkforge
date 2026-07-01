# 浏览器适配问题修复 - 任务清单

## [x] Task 1: 添加 color-scheme 和 viewport 配置 (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 在 globals.css 的 `:root` 中添加 `color-scheme: dark`
  - 在 layout.tsx 中添加显式的 viewport 配置
- **Test Requirements**:
  - `human-judgment` TR-1.1: Safari/Firefox 下拉框显示暗色背景
  - `programmatic` TR-1.2: viewport meta 标签包含 device-width 和 initial-scale=1
- **Estimate**: 5 min

## [x] Task 2: 修复雷达页 100vh 问题 (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 修改 radar/page.tsx 中的 `height: calc(100vh - 56px)` 为 `calc(100dvh - 56px)`
- **Test Requirements**:
  - `human-judgment` TR-2.1: 移动端浏览器中页面底部内容可见
  - `human-judgment` TR-2.2: 桌面端显示正常
- **Estimate**: 5 min

## [x] Task 3: 修复首页评分条溢出 (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 修改首页信号卡片中的评分条布局，在小屏幕下改为 2x2 网格
- **Test Requirements**:
  - `human-judgment` TR-3.1: 320px 宽度下评分条不溢出
  - `human-judgment` TR-3.2: 桌面端显示正常
- **Estimate**: 10 min

## [x] Task 4: 设置输入框字体大小防止 iOS 自动缩放 (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 在 globals.css 中添加全局 input/textarea/select 样式，设置字体大小为 16px
- **Test Requirements**:
  - `human-judgment` TR-4.1: iOS 设备上聚焦输入框不自动缩放
- **Estimate**: 5 min

## [x] Task 5: 验证并修复移动端筛选面板 (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 检查 radar/page.tsx 中移动端筛选面板的实现
  - 确认筛选面板已正确实现（第 499-629 行）
- **Test Requirements**:
  - `human-judgment` TR-5.1: 移动端点击筛选按钮显示筛选面板
  - `human-judgment` TR-5.2: 筛选面板可正常关闭
- **Estimate**: 15 min

## [x] Task 6: 构建验证 (P0)
- **Priority**: P0
- **Depends On**: Task 1-5
- **Description**:
  - 运行 `npm run build` 验证构建成功
- **Test Requirements**:
  - `programmatic` TR-6.1: 构建成功
- **Estimate**: 5 min

# Task Dependencies
```
Task 1 (parallel)
Task 2 (parallel)
Task 3 (parallel)
Task 4 (parallel)
Task 5 (parallel)
    └──→ Task 6 (build)
```

Total estimate: ~45 min