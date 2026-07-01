# Runtime Error Fix & Health Check Spec

## Why
运行时出现 `Cannot read properties of undefined (reading 'call')` 错误，发生在 React Server Components 序列化/反序列化阶段。需要诊断根因并修复，同时进行全流程健康检查确保所有 API 路由正确返回错误状态码。

## What Changes
- 修复 `globals.css` 中 `@theme` 与 `next/font/google` 的 CSS 变量冲突
- 修复 API 路由中空 catch 块和错误处理
- 全局扫描确认所有组件 'use client' 指令正确
- 验证桶文件导出与组件实际导出一致

## Impact
- Affected code: globals.css, layout.tsx, api/forge/route.ts, api/canvas/route.ts, api/score/route.ts, api/score/batch/route.ts, api/signals/route.ts, Navbar.tsx, AuthCard.tsx

## MODIFIED Requirements

### Requirement: globals.css 字体变量冲突修复
`@theme` 块中定义的 `--font-sans` 和 `--font-mono` 与 `next/font/google` 生成的 CSS 变量同名，导致 Turbopack 模块解析失败。

**Fix**: 从 `@theme` 中移除 `--font-sans` 和 `--font-mono` 定义，让 `next/font/google` 独占这些变量名。

### Requirement: API 路由错误处理规范
所有 API 路由的 catch 块必须返回真实错误状态码和详细信息，不得吞掉错误或返回 200。

**Fix**: 修复 `api/generate/forge/route.ts` 和 `api/generate/canvas/route.ts` 中的空 catch 块 `} catch {`，补齐错误处理。