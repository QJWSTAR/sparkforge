# Tasks

- [x] Task 1: 数据库模型补全（Prisma 迁移）
  - [x] 编辑 `prisma/schema.prisma`，在 `ForgeProject` 中添加 `userId String` 和 `result Json?`
  - [x] 在 `CanvasReport` 中添加 `userId String` 和 `result Json?`
  - [x] 在 `LogEntry` 中添加 `userId String`
  - [x] Prisma Schema 已更新（迁移需 DATABASE_URL 环境变量，待部署时执行）

- [x] Task 2: 复刻 API 认证 + 持久化
  - [x] 在 `src/app/api/generate/forge/route.ts` 中导入 `getSupabaseAdmin`
  - [x] 添加 token 认证逻辑（提取 userId）
  - [x] 生成结果后使用 `supabaseAdmin.from('ForgeProject').insert(...)` 持久化
  - [x] 返回记录 ID 及生成内容

- [x] Task 3: 画布 API 认证 + 持久化
  - [x] 在 `src/app/api/generate/canvas/route.ts` 中导入 `getSupabaseAdmin`
  - [x] 添加 token 认证逻辑（提取 userId）
  - [x] 生成结果后使用 `supabaseAdmin.from('CanvasReport').insert(...)` 持久化
  - [x] 返回给前端的对象结构不变

- [x] Task 4: 历史查询接口
  - [x] 创建 `src/app/api/generate/forge/history/route.ts`，实现 GET 认证 + 查询
  - [x] 创建 `src/app/api/generate/canvas/history/route.ts`，实现 GET 认证 + 查询

- [x] Task 5: 前端添加认证头
  - [x] 修改 `forge/page.tsx`：从 `useAuth` 获取 token，添加 `Authorization` 头，传递 `signalId`
  - [x] 修改 `canvas/page.tsx`：从 `useAuth` 获取 token，添加 `Authorization` 头，传递 `signalId`

- [x] Task 6: 日志 POST 接口
  - [x] 在 `src/app/api/logs/route.ts` 中导入 `getSupabaseAdmin`，添加 POST 处理器
  - [x] 实现 token 认证，强制 `type = 'SYSTEM'`
  - [x] 使用 `supabaseAdmin.from('LogEntry').insert(...)` 写入

- [x] Task 7: 前端日志发布表单
  - [x] 在 `stream/page.tsx` 中添加发布表单组件（标题 + 内容输入框 + 提交按钮）
  - [x] 获取 token，调用 `POST /api/logs`，成功后刷新日志列表

- [x] Task 8: 构建验证
  - [x] 执行 `npm run build`，通过，无 TypeScript 错误

# Task Dependencies
- Task 2、3 依赖 Task 1（数据库迁移完成）
- Task 4 依赖 Task 1
- Task 5 依赖 Task 2、3（API 认证完成）
- Task 6 依赖 Task 1
- Task 7 依赖 Task 6（POST 接口完成）
- Task 8 依赖所有前序任务完成