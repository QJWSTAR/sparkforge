# Checklist

- [x] `ForgeProject` 模型包含 `userId String` 和 `result Json?` 字段
- [x] `CanvasReport` 模型包含 `userId String` 和 `result Json?` 字段
- [x] `LogEntry` 模型包含 `userId String` 字段
- [x] Prisma Schema 已更新（迁移需 DATABASE_URL 环境变量）
- [x] `/api/generate/forge` 有 token 认证，无效 token 返回 401
- [x] `/api/generate/forge` 生成后将结果写入 `ForgeProject` 表
- [x] `/api/generate/canvas` 有 token 认证，无效 token 返回 401
- [x] `/api/generate/canvas` 生成后将结果写入 `CanvasReport` 表
- [x] `GET /api/generate/forge/history` 返回当前用户的复刻历史
- [x] `GET /api/generate/canvas/history` 返回当前用户的画布历史
- [x] `forge/page.tsx` 的 fetch 请求包含 `Authorization` 头和 `signalId`
- [x] `canvas/page.tsx` 的 fetch 请求包含 `Authorization` 头和 `signalId`
- [x] `POST /api/logs` 有 token 认证，强制 `type = 'SYSTEM'`
- [x] `stream/page.tsx` 有日志发布表单，提交后刷新列表
- [x] `npm run build` 通过，无 TypeScript 错误