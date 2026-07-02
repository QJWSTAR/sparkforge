# Stream 页面日志类型对齐 Spec

## Why
`stream/page.tsx` 中 `typeConfig[log.type]` 在运行时抛出 `Cannot read properties of undefined (reading 'color')`，原因是前端 `LogEntry.type` 使用旧枚举值（`'signal'`、`'forge'`、`'canvas'`、`'deploy'`、`'twitter'`），而 Prisma `LogType` 枚举值为 `SIGNAL_DISCOVERED`、`SIGNAL_SCORED`、`FORGE_COMPLETED` 等。同时前端字段名 `timestamp`/`description` 与 API 返回的 `createdAt`/`content` 不匹配，导致真实数据渲染异常。

## What Changes
- 更新 `LogEntry` 接口：`type` 改为 Prisma `LogType` 枚举字面量，`timestamp` → `createdAt`，`description` → `content`
- 重写 `typeConfig` 对象，使用新枚举值作为键
- 更新 `filters` 数组，筛选逻辑改为 `startsWith` 前缀匹配
- 更新 `mockLogs` 数组，type 改为新枚举值，字段名同步
- 更新 JSX 渲染代码，`log.timestamp` → `log.createdAt`，`log.description` → `log.content`

## Impact
- Affected specs: 无
- Affected code: `src/app/stream/page.tsx`

## MODIFIED Requirements

### Requirement: LogEntry 接口与 Prisma LogType 枚举对齐
`LogEntry` 接口的 `type` 字段 SHALL 使用与 Prisma `LogType` 枚举完全一致的字面量类型。

#### Scenario: 类型定义正确
- **WHEN** 定义 `LogEntry` 接口
- **THEN** `type` 字段为 `'SIGNAL_DISCOVERED' | 'SIGNAL_SCORED' | 'SIGNAL_TOP10' | 'FORGE_STARTED' | 'FORGE_PROGRESS' | 'FORGE_COMPLETED' | 'CANVAS_GENERATED' | 'SYSTEM'`

### Requirement: LogEntry 字段名与 API 返回对齐
`LogEntry` 接口的字段名 SHALL 与 API 返回的数据库字段名一致。

#### Scenario: 字段名对齐
- **WHEN** 定义 `LogEntry` 接口
- **THEN** 使用 `createdAt: string` 而非 `timestamp: string`
- **AND** 使用 `content?: string` 而非 `description: string`

### Requirement: typeConfig 使用新枚举值
`typeConfig` 对象 SHALL 以新 `LogType` 枚举值为键，提供 `color`、`icon`、`label` 属性。

#### Scenario: typeConfig 完整定义
- **WHEN** 渲染日志条目
- **THEN** 所有 8 种 LogType 均有对应的 color、icon、label 配置
- **AND** 不存在旧键（`signal`、`forge`、`canvas`、`deploy`、`twitter`）

### Requirement: 筛选功能使用前缀匹配
`filters` 数组和筛选逻辑 SHALL 使用前缀匹配方式，适配新枚举值命名规范。

#### Scenario: 筛选按钮点击
- **WHEN** 用户点击"信号"筛选按钮
- **THEN** 显示所有 `type` 以 `SIGNAL` 开头的日志条目
- **AND** 点击"全部"显示所有日志

### Requirement: mockLogs 数据与接口一致
`mockLogs` 数组中的所有条目 SHALL 使用新枚举值和字段名。

#### Scenario: mock 数据回退
- **WHEN** API 不可用
- **THEN** mockLogs 数据能正常渲染，无 type 取值错误
- **AND** 不存在的 `deploy`/`twitter` 类型改为 `SYSTEM`

### Requirement: JSX 渲染代码字段名更新
渲染代码中 SHALL 使用 `log.createdAt` 和 `log.content` 替代旧字段名。

#### Scenario: 日志渲染
- **WHEN** 渲染日志条目
- **THEN** 时间显示使用 `log.createdAt`
- **AND** 内容描述使用 `log.content`