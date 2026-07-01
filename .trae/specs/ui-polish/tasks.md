# UI 视觉优化与交互体验提升 - 任务清单

## [ ] Task 1: 添加统一容器类和微交互样式 (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 在 globals.css 中添加 `.container-app` 类（统一宽度、内边距）
  - 添加 `.card-hover` 类（hover 浮起+阴影增强）
  - 添加 `.btn-active` 类（点击缩放效果）
  - 添加过渡动画变量
- **Test Requirements**:
  - `human-judgment` TR-1.1: 容器宽度一致
  - `human-judgment` TR-1.2: 卡片 hover 有浮起效果
- **Estimate**: 10 min

## [ ] Task 2: 优化首页视觉效果 (P0)
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 使用 `.container-app` 替换不一致的容器
  - 增大 Hero 标题字号
  - 优化渐变文字效果
  - 添加卡片 hover 效果
- **Test Requirements**:
  - `human-judgment` TR-2.1: Hero 区域视觉层次明显提升
  - `human-judgment` TR-2.2: 卡片 hover 有微交互
- **Estimate**: 15 min

## [ ] Task 3: 优化雷达页视觉效果 (P0)
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 使用 `.container-app` 替换容器
  - 添加 SignalCard hover 效果
  - 优化筛选标签过渡动画
- **Test Requirements**:
  - `human-judgment` TR-3.1: 信号卡片有 hover 效果
  - `human-judgment` TR-3.2: 筛选切换有平滑过渡
- **Estimate**: 10 min

## [ ] Task 4: 优化信号详情页视觉效果 (P0)
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 使用 `.container-app` 替换容器
  - 添加卡片 hover 效果
  - 优化按钮交互
- **Test Requirements**:
  - `human-judgment` TR-4.1: 页面布局统一
  - `human-judgment` TR-4.2: 按钮有点击反馈
- **Estimate**: 10 min

## [ ] Task 5: 优化其他页面视觉效果 (P1)
- **Priority**: P1
- **Depends On**: Task 1
- **Description**:
  - forge/page.tsx: 使用 `.container-app`，添加卡片 hover
  - canvas/page.tsx: 使用 `.container-app`，添加卡片 hover
  - stream/page.tsx: 使用 `.container-app`，添加卡片 hover
  - profile/page.tsx: 使用 `.container-app`，优化交互
- **Test Requirements**:
  - `human-judgment` TR-5.1: 所有页面布局统一
  - `human-judgment` TR-5.2: 卡片和按钮有交互反馈
- **Estimate**: 20 min

## [ ] Task 6: 优化登录/注册页视觉效果 (P1)
- **Priority**: P1
- **Depends On**: Task 1
- **Description**:
  - 优化登录/注册表单样式
  - 添加按钮点击效果
  - 优化输入框聚焦效果
- **Test Requirements**:
  - `human-judgment` TR-6.1: 表单视觉效果提升
  - `human-judgment` TR-6.2: 按钮和输入框有交互反馈
- **Estimate**: 10 min

## [ ] Task 7: 构建验证 (P0)
- **Priority**: P0
- **Depends On**: Task 1-6
- **Description**:
  - 运行 `npm run build` 验证构建成功
- **Test Requirements**:
  - `programmatic` TR-7.1: 构建成功
- **Estimate**: 5 min

# Task Dependencies
```
Task 1
    ├──→ Task 2
    ├──→ Task 3
    ├──→ Task 4
    ├──→ Task 5
    └──→ Task 6
            └──→ Task 7 (build)
```

Total estimate: ~80 min