# SparkForge UI 重构 - Implementation Plan

## [x] Task 1: 首页设计系统适配
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 将首页 page.tsx 中的硬编码颜色替换为 CSS 变量
  - 使用 var(--color-bg)、var(--color-primary) 等设计系统变量
  - 移除内联样式中使用的具体颜色值
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgment` TR-1.1: 首页视觉效果与设计系统一致
  - `human-judgment` TR-1.2: 无硬编码颜色值
- **Notes**: 参考 globals.css 中的 CSS 变量定义

## [x] Task 2: forge 页面导航栏统一和设计系统适配
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 移除 forge/page.tsx 中的自定义导航栏
  - 使用共享 Navbar 组件
  - 将硬编码颜色替换为 CSS 变量
  - 添加响应式布局支持
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4
- **Test Requirements**:
  - `human-judgment` TR-2.1: 导航栏与其他页面统一
  - `human-judgment` TR-2.2: 使用设计系统变量
  - `human-judgment` TR-2.3: 小屏幕正常显示
- **Notes**: 保留页面特有功能按钮

## [x] Task 3: canvas 页面导航栏统一和设计系统适配
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 移除 canvas/page.tsx 中的自定义导航栏
  - 使用共享 Navbar 组件
  - 将硬编码颜色替换为 CSS 变量
  - 添加响应式布局支持
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4
- **Test Requirements**:
  - `human-judgment` TR-3.1: 导航栏与其他页面统一
  - `human-judgment` TR-3.2: 使用设计系统变量
  - `human-judgment` TR-3.3: 小屏幕正常显示
- **Notes**: 保留页面特有功能按钮

## [x] Task 4: stream 页面导航栏统一和设计系统适配
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 移除 stream/page.tsx 中的自定义导航栏
  - 使用共享 Navbar 组件
  - 将硬编码颜色替换为 CSS 变量
  - 添加响应式布局支持
- **Acceptance Criteria Addressed**: AC-2, AC-3, AC-4
- **Test Requirements**:
  - `human-judgment` TR-4.1: 导航栏与其他页面统一
  - `human-judgment` TR-4.2: 使用设计系统变量
  - `human-judgment` TR-4.3: 小屏幕正常显示
- **Notes**: 保留页面特有功能按钮

## [x] Task 5: 更新 Vercel Cron Job 配置
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 更新 vercel.json 中的 Cron Job 配置
  - 将 /api/crawl 和 /api/score/batch 改为每天执行一次
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `programmatic` TR-5.1: vercel.json 配置正确
  - `programmatic` TR-5.2: 构建验证通过
- **Notes**: Vercel 免费账户只支持每天一次的 Cron Job

## [x] Task 6: 构建验证和 bug 扫描
- **Priority**: high
- **Depends On**: Task 1-5
- **Description**: 
  - 运行 npm run build 验证构建
  - 运行 npm run typecheck 验证类型
  - 运行 npm run lint 验证代码质量
  - 修复发现的所有问题
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `programmatic` TR-6.1: npm run build 成功
  - `programmatic` TR-6.2: npm run typecheck 成功
  - `programmatic` TR-6.3: npm run lint 成功
- **Notes**: 修复任何发现的错误

## [/] Task 7: 提交 commit
- **Priority**: medium
- **Depends On**: Task 1-6
- **Description**: 
  - 添加所有修改的文件
  - 提交 commit，包含清晰的变更描述
- **Acceptance Criteria Addressed**: 所有
- **Test Requirements**:
  - `programmatic` TR-7.1: commit 成功
  - `programmatic` TR-7.2: 所有文件已提交
- **Notes**: 使用规范的 commit message