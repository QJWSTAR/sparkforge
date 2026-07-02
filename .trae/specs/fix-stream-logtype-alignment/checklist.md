# Checklist

- [x] LogEntry 接口 `type` 字段使用 Prisma LogType 枚举字面量（8 种）
- [x] LogEntry 接口使用 `createdAt` 替代 `timestamp`
- [x] LogEntry 接口使用 `content?: string` 替代 `description`
- [x] typeConfig 对象以新枚举值为键，包含 8 种类型的配置
- [x] typeConfig 中不存在旧键（`signal`、`forge`、`canvas`、`deploy`、`twitter`）
- [x] filters 数组 value 使用 `'SIGNAL'`、`'FORGE'`、`'CANVAS'`、`'SYSTEM'` 前缀
- [x] 筛选逻辑使用 `log.type.startsWith(filter)` 前缀匹配
- [x] mockLogs 中所有 type 使用新枚举值
- [x] mockLogs 中 `deploy`/`twitter` 类型改为 `SYSTEM`
- [x] mockLogs 中字段名改为 `createdAt` 和 `content`
- [x] JSX 渲染代码使用 `log.createdAt` 和 `log.content`
- [x] `npm run build` 通过，无 TypeScript 错误