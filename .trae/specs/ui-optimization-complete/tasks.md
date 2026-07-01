# SparkForge - UI设计优化与功能完整性检查实现计划

## [x] Task 1: 创建Toast通知组件系统
- **Priority**: high
- **Depends On**: None
- **Description**: 创建Toast组件和ToastProvider，支持success、error、info、warning四种类型的通知，提供显示/隐藏动画
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `programmatic` TR-1.1: Toast组件能正确显示和自动消失
  - `programmatic` TR-1.2: Toast组件支持四种通知类型并有不同颜色
  - `human-judgment` TR-1.3: Toast通知样式美观，动画流畅

## [x] Task 2: 修复SignalCard嵌套交互元素问题
- **Priority**: high
- **Depends On**: None
- **Description**: 移除SignalCard中包裹整个卡片的Link，将卡片改为普通div，"复刻"和"画布"按钮使用独立的router.push导航
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgment` TR-2.1: 点击"复刻"按钮正确跳转到forge页面
  - `human-judgment` TR-2.2: 点击"画布"按钮正确跳转到canvas页面
  - `human-judgment` TR-2.3: 点击卡片其他区域不触发导航

## [x] Task 3: 修复复刻工坊复选框状态同步
- **Priority**: high
- **Depends On**: None
- **Description**: 将复刻工坊页面的复选框从defaultChecked改为受控组件，使用useState管理选中状态，并在API请求中传递正确的状态
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `programmatic` TR-3.1: 复选框状态能正确更新
  - `programmatic` TR-3.2: API请求中包含正确的transformPoints状态

## [x] Task 4: 创建404页面
- **Priority**: medium
- **Depends On**: None
- **Description**: 创建自定义404页面，显示友好的错误提示和返回首页链接
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `human-judgment` TR-4.1: 访问不存在的路由显示404页面
  - `human-judgment` TR-4.2: 404页面包含返回首页链接

## [x] Task 5: 添加暗色/亮色模式切换功能
- **Priority**: medium
- **Depends On**: None
- **Description**: 在Navbar中添加模式切换按钮，使用Tailwind的dark模式类和localStorage持久化用户偏好
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `human-judgment` TR-5.1: 点击切换按钮能切换暗色/亮色模式
  - `human-judgment` TR-5.2: 刷新页面后保持用户选择的模式

## [x] Task 6: 修复亮色模式样式问题
- **Priority**: medium
- **Depends On**: Task 5
- **Description**: 修复login、register页面输入框硬编码text-white的问题，修复canvas页面中使用raw rgba值的问题，确保亮色模式下所有元素正常显示
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `human-judgment` TR-6.1: 亮色模式下登录/注册页面输入框文字可见
  - `human-judgment` TR-6.2: 亮色模式下所有页面元素对比度正常

## [x] Task 7: 用Toast通知替换alert()调用
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 在radar/detail、login、register、profile等页面中，用Toast通知替换所有alert()调用
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgment` TR-7.1: 登录失败显示Toast而非alert
  - `human-judgment` TR-7.2: 订阅成功/失败显示Toast而非alert
  - `human-judgment` TR-7.3: 注册验证错误显示Toast而非alert

## [x] Task 8: 添加页面加载骨架屏
- **Priority**: medium
- **Depends On**: None
- **Description**: 为radar、forge、canvas等数据加载页面添加骨架屏组件，提升用户体验
- **Acceptance Criteria Addressed**: AC-8
- **Test Requirements**:
  - `human-judgment` TR-8.1: 页面加载时显示骨架屏
  - `human-judgment` TR-8.2: 数据加载完成后骨架屏消失

## [x] Task 9: 优化Navbar和全局布局
- **Priority**: medium
- **Depends On**: Task 5
- **Description**: 优化Navbar的响应式布局，添加面包屑导航，统一全局布局结构
- **Acceptance Criteria Addressed**: AC-7
- **Test Requirements**:
  - `human-judgment` TR-9.1: 移动端导航菜单正常工作
  - `human-judgment` TR-9.2: 面包屑导航显示正确

## [x] Task 10: 统一卡片样式和按钮效果
- **Priority**: low
- **Depends On**: None
- **Description**: 统一所有页面的卡片样式、阴影效果、按钮hover效果，提升视觉一致性
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgment` TR-10.1: 所有卡片使用统一的样式
  - `human-judgment` TR-10.2: 所有按钮hover效果一致