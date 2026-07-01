# UI/UX 全面检查与功能优化 - 任务清单

## [ ] Task 1: 修复首页 Footer 容器和按钮交互 (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - Footer 使用 `.container-app` 替换 `container mx-auto`
  - "免费开始使用"按钮添加 `btn-press` 类
- **Test Requirements**:
  - `human-judgment` TR-1.1: Footer 布局一致
  - `human-judgment` TR-1.2: 按钮有点击反馈
- **Estimate**: 5 min

## [ ] Task 2: 修复 SignalCard 嵌套 Link 问题 (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - SignalCard 外层是 Link，内层"复刻"和"画布"按钮也使用了 Link，导致嵌套 Link 问题
  - 将内层按钮改为普通按钮，添加 onClick 跳转逻辑
- **Test Requirements**:
  - `human-judgment` TR-2.1: 点击卡片跳转到详情页
  - `human-judgment` TR-2.2: 点击按钮跳转到对应页面
- **Estimate**: 10 min

## [ ] Task 3: 修复复刻工坊页面按钮交互 (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - "开始复刻"按钮添加 `btn-press` 类
  - "查看 Demo"和"下载源码"按钮添加 `btn-press` 类
  - 卡片添加 `card-hover` 类
- **Test Requirements**:
  - `human-judgment` TR-3.1: 所有按钮有点击反馈
  - `human-judgment` TR-3.2: 卡片有 hover 效果
- **Estimate**: 10 min

## [ ] Task 4: 修复商业画布页面按钮交互 (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - "生成商业画布"按钮添加 `btn-press` 类
  - "导出 Notion"和"重新生成"按钮添加 `btn-press` 类
  - 卡片添加 `card-hover` 类
- **Test Requirements**:
  - `human-judgment` TR-4.1: 所有按钮有点击反馈
  - `human-judgment` TR-4.2: 卡片有 hover 效果
- **Estimate**: 10 min

## [ ] Task 5: 修复信号详情页按钮交互 (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 所有操作按钮添加 `btn-press` 类
- **Test Requirements**:
  - `human-judgment` TR-5.1: 所有按钮有点击反馈
- **Estimate**: 5 min

## [ ] Task 6: 构建验证 (P0)
- **Priority**: P0
- **Depends On**: Task 1-5
- **Description**:
  - 运行 `npm run build` 验证构建成功
- **Test Requirements**:
  - `programmatic` TR-6.1: 构建成功
- **Estimate**: 5 min

# Task Dependencies
```
Task 1
Task 2
Task 3
Task 4
Task 5
    └──→ Task 6 (build)
```

Total estimate: ~45 min