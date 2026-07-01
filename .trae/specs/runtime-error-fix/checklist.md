# Verification Checklist

### globals.css
- [x] `@theme` 块中不再包含 `--font-sans` 和 `--font-mono` 定义
- [x] `next/font/google` 的 variable 参数正确传递到 html.className

### API 路由
- [x] forge/route.ts 的空 catch 块已验证 — 是 JSON.parse 回退，非错误吞没
- [x] canvas/route.ts 的空 catch 块已验证 — 同上
- [x] 所有 API 错误返回适当的状态码（4xx/5xx）

### 组件扫描
- [x] 所有使用 hooks 的组件文件首行声明 'use client'（17 个文件）
- [x] 所有使用 hooks 的页面文件首行声明 'use client'（9 个文件）

### 构建验证
- [x] `npm run build` 编译通过，无 TypeScript 错误
- [x] 无新增 ESLint 警告（0 errors, 0 warnings）