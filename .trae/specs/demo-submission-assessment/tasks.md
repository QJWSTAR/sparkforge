# SparkForge Demo 提交评估与修复 - 任务清单

## [ ] Task 1: 修复客户端订阅API的Bearer token问题 (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 编辑 `src/app/radar/[id]/page.tsx`，修改"订阅信号"按钮的onClick处理逻辑
  - 从Supabase session获取access_token，并在调用subscribe API时携带Authorization头
  - 更新 `src/lib/auth.ts` 或添加工具函数以获取当前session token
- **Test Requirements**:
  - `programmatic` TR-1.1: 订阅请求包含 Authorization: Bearer <token> 头
  - `programmatic` TR-1.2: 未登录时点击订阅返回401（符合预期）
  - `human-judgment` TR-1.3: 登录后点击订阅能正常调用API
- **Estimate**: 20 min

## [ ] Task 2: 优化按钮交互体验 (P1)
- **Priority**: P1
- **Depends On**: None
- **Description**:
  - 将"分享"和"连接Twitter"按钮的 alert 改为更优雅的提示（如禁用状态+title属性）
  - 或者添加简单的 toast 组件替代 alert
- **Test Requirements**:
  - `human-judgment` TR-2.1: 按钮提示方式不打断用户流程
  - `human-judgment` TR-2.2: 提示信息清晰友好
- **Estimate**: 10 min

## [ ] Task 3: 推送代码到GitHub (P0)
- **Priority**: P0
- **Depends On**: Task 1-2
- **Description**:
  - 执行 `git push` 将所有6个未推送的commit推送到origin/main
  - 等待Vercel自动部署完成
- **Test Requirements**:
  - `programmatic` TR-3.1: 所有commit成功推送
  - `programmatic` TR-3.2: Vercel部署成功完成
- **Estimate**: 5 min

## [ ] Task 4: 更新Demo帖子截图 (P0)
- **Priority**: P0
- **Depends On**: Task 3
- **Description**:
  - 访问部署后的网站，截取首页、雷达页、信号详情页的截图
  - 更新 `demo-post.md` 中的图片引用为真实截图路径
- **Test Requirements**:
  - `human-judgment` TR-4.1: 所有图片引用指向真实文件
  - `human-judgment` TR-4.2: 截图清晰展示核心功能
- **Estimate**: 15 min

## [ ] Task 5: 端到端验证 (P0)
- **Priority**: P0
- **Depends On**: Task 3-4
- **Description**:
  - 验证登录流程正常
  - 验证浏览信号和查看详情正常
  - 验证订阅功能正常（登录状态下）
- **Test Requirements**:
  - `human-judgment` TR-5.1: 完整体验路径无报错
  - `human-judgment` TR-5.2: 核心功能可用
- **Estimate**: 10 min

# Task Dependencies
```
Task 1 (parallel)
Task 2 (parallel)
    └──→ Task 3 (push)
        ├──→ Task 4 (update screenshots)
        └──→ Task 5 (end-to-end verification)
```

Total estimate: ~60 min