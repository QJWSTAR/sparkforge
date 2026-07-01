# Tasks

- [x] Task 1: 修复 globals.css `@theme` 字体变量冲突
  - [x] 从 `@theme` 块中移除 `--font-sans` 和 `--font-mono` 定义
  - [x] 验证 `next/font/google` 的 `variable` 参数仍正确工作

- [x] Task 2: 修复 API 路由空 catch 块
  - [x] 验证 `api/generate/forge/route.ts` — 空 catch 是 JSON.parse 回退，外层 catch 返回 500
  - [x] 验证 `api/generate/canvas/route.ts` — 同上
  - [x] 验证 `api/score/route.ts` — 正确错误处理
  - [x] 验证 `api/score/batch/route.ts` — 内层跳过单个信号失败，外层返回 500

- [x] Task 3: 验证所有组件和页面的 'use client' 指令
  - [x] 扫描所有使用 hooks 的组件文件 — 17 个全部正确声明
  - [x] 确认所有需要 'use client' 的文件已正确声明

- [x] Task 4: 构建验证
  - [x] 运行 `npm run build` 确认编译通过 — 0 错误 0 警告
  - [x] 确认无新增错误或警告

# Task Dependencies
- Task 1, 2, 3 相互独立，可并行执行
- Task 4 依赖 Task 1, 2, 3 全部完成