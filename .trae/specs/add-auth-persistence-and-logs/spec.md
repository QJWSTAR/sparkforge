# 认证持久化与日志发布 Spec

## Why
当前 `ForgeProject`、`CanvasReport`、`LogEntry` 三个模型缺少 `userId` 字段，导致无法关联用户。复刻与画布 API 生成结果后不持久化到数据库。日志 API 缺少 POST 处理器，用户无法发布日志。所有需要认证的 API 均未实现 token 验证。

## What Changes
- **BREAKING**: `prisma/schema.prisma` 中 `ForgeProject`、`CanvasReport`、`LogEntry` 新增 `userId String` 字段；`ForgeProject`、`CanvasReport` 新增 `result Json?` 字段
- 运行 `prisma migrate dev` 生成并应用迁移
- `/api/generate/forge` 和 `/api/generate/canvas` 添加 token 认证 + 结果持久化
- 新增 `GET /api/generate/forge/history` 和 `GET /api/generate/canvas/history` 历史查询接口
- `/api/logs` 添加 POST 处理器，支持用户发布 SYSTEM 类型日志
- 前端 forge/canvas 页面添加认证头，stream 页面添加日志发布表单

## Impact
- Affected specs: 无
- Affected code: `prisma/schema.prisma`, `src/app/api/generate/forge/route.ts`, `src/app/api/generate/canvas/route.ts`, `src/app/api/logs/route.ts`, `src/app/forge/page.tsx`, `src/app/canvas/page.tsx`, `src/app/stream/page.tsx`, 新增 `src/app/api/generate/forge/history/route.ts`, `src/app/api/generate/canvas/history/route.ts`

## ADDED Requirements

### Requirement: 数据库模型添加 userId 和 result 字段
`ForgeProject`、`CanvasReport`、`LogEntry` 模型 SHALL 包含 `userId String` 字段（无 `@relation`），`ForgeProject` 和 `CanvasReport` SHALL 包含 `result Json?` 字段。

#### Scenario: 迁移成功
- **WHEN** 执行 `npx prisma migrate dev`
- **THEN** 数据库表新增 `userId` 和 `result` 列
- **AND** 已有数据不受影响

### Requirement: API 认证采用 token 模式
所有需要用户身份的 API 路由 SHALL 通过 `Authorization: Bearer <token>` 头获取用户 ID，使用 `supabase.auth.getUser(token)` 验证。

#### Scenario: 未认证请求
- **WHEN** 请求缺少 Authorization 头
- **THEN** 返回 401 Unauthorized

#### Scenario: 有效认证
- **WHEN** 请求携带有效 token
- **THEN** 提取 `user.id` 作为 `userId` 继续处理

### Requirement: 复刻结果持久化
`POST /api/generate/forge` SHALL 在生成结果后将完整 AI 响应写入 `ForgeProject` 表，包含 `userId`、`signalId`、`status`、`outputSummary`、`result`。

#### Scenario: 认证后复刻
- **WHEN** 已认证用户发起复刻请求
- **THEN** AI 生成结果存入 `ForgeProject` 表
- **AND** 返回记录 ID 和生成内容

### Requirement: 画布结果持久化
`POST /api/generate/canvas` SHALL 在生成结果后将完整 AI 响应写入 `CanvasReport` 表，包含 `userId`、`signalId`、`result`。

#### Scenario: 认证后生成画布
- **WHEN** 已认证用户发起画布请求
- **THEN** AI 生成结果存入 `CanvasReport` 表
- **AND** 返回给前端的对象结构不变

### Requirement: 历史查询接口
`GET /api/generate/forge/history` SHALL 返回当前用户的复刻历史列表。`GET /api/generate/canvas/history` SHALL 返回当前用户的画布历史列表。

#### Scenario: 查询复刻历史
- **WHEN** 已认证用户请求复刻历史
- **THEN** 返回按时间倒序的 `ForgeProject` 列表

### Requirement: 日志发布功能
`POST /api/logs` SHALL 接收 `{ title, content? }`，强制设定 `type = 'SYSTEM'`，认证后写入 `LogEntry` 表。

#### Scenario: 发布日志
- **WHEN** 已认证用户提交日志标题和内容
- **THEN** 创建 `LogEntry` 记录（type=SYSTEM）
- **AND** 返回新日志

## MODIFIED Requirements

### Requirement: 前端 API 调用添加认证头
`forge/page.tsx` 和 `canvas/page.tsx` 中的 fetch 调用 SHALL 从 `useAuth` 获取 token 并添加 `Authorization` 头。

#### Scenario: 前端发送认证请求
- **WHEN** 用户触发复刻或画布生成
- **THEN** 请求头包含 `Authorization: Bearer <token>`