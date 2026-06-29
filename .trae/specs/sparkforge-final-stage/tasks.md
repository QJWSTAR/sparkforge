# SparkForge 最终阶段 - Implementation Plan

## [ ] Task 1: 创建 Supabase 建表 SQL 脚本
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 根据 prisma/schema.prisma 创建 SQL 建表脚本
  - 创建 Signal、ForgeProject、CanvasReport、LogEntry、UserSetting 五张表
  - 创建索引和约束
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `programmatic` TR-1.1: 在 Supabase SQL 编辑器执行脚本无错误
  - `programmatic` TR-1.2: 五张表全部创建成功
  - `human-judgment` TR-1.3: 表结构与 schema.prisma 一致
- **Notes**: 用户需要在 Supabase 控制台执行此脚本

## [ ] Task 2: 修复 subscribe API 字段错误
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - UserSetting 表没有 subscribedSignals 字段，需要修复
  - 使用正确的字段名或调整逻辑
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `programmatic` TR-2.1: POST /api/subscribe 返回 200 状态码
  - `programmatic` TR-2.2: GET /api/subscribe 返回订阅列表
  - `programmatic` TR-2.3: DELETE /api/subscribe 返回 200 状态码
- **Notes**: 需要确认 UserSetting 的正确字段结构

## [ ] Task 3: 页面数据对接真实 API
- **Priority**: high
- **Depends On**: Task 1, Task 2
- **Description**: 
  - 更新 stream/page.tsx 使用真实 API 数据
  - 更新 forge/page.tsx 使用真实信号数据
  - 更新 canvas/page.tsx 使用真实信号数据
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgment` TR-3.1: 日志流页面显示真实数据
  - `human-judgment` TR-3.2: 复刻工坊显示真实信号
  - `human-judgment` TR-3.3: 商业画布显示真实信号
- **Notes**: 保留 Mock 数据作为 fallback

## [ ] Task 4: 创建 .env.local 配置模板
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 创建 .env.local 文件，包含所有必要环境变量
  - 用户需要填入真实值
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgment` TR-4.1: .env.local 文件创建成功
  - `human-judgment` TR-4.2: 所有必要变量都有占位符
- **Notes**: 用户需要提供真实的 API Key

## [ ] Task 5: 验证构建和类型检查
- **Priority**: high
- **Depends On**: Task 1-4
- **Description**: 
  - 运行 npm run build 验证构建
  - 运行 npm run typecheck 验证类型
  - 运行 npm run lint 验证代码质量
- **Acceptance Criteria Addressed**: AC-6
- **Test Requirements**:
  - `programmatic` TR-5.1: npm run build 成功，无错误
  - `programmatic` TR-5.2: npm run typecheck 成功，无类型错误
  - `programmatic` TR-5.3: npm run lint 成功，无 ESLint 错误
- **Notes**: 修复任何发现的错误

## [ ] Task 6: 配置 Vercel Cron Job
- **Priority**: medium
- **Depends On**: Task 5
- **Description**: 
  - 在 Vercel 配置定时任务
  - /api/crawl: 每小时执行一次
  - /api/score/batch: 每天执行一次
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `human-judgment` TR-6.1: Vercel Cron Job 配置完成
  - `programmatic` TR-6.2: 定时任务执行后信号数据更新
- **Notes**: 用户需要在 Vercel 控制台配置

## [ ] Task 7: 验证完整闭环
- **Priority**: high
- **Depends On**: Task 1-6
- **Description**: 
  - 调用 /api/crawl 抓取信号
  - 调用 /api/score/batch 评分信号
  - 验证首页和雷达页面显示真实数据
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4
- **Test Requirements**:
  - `programmatic` TR-7.1: POST /api/crawl 返回成功，状态码 200
  - `programmatic` TR-7.2: POST /api/score/batch 返回成功，状态码 200
  - `human-judgment` TR-7.3: 首页显示真实信号数据
  - `human-judgment` TR-7.4: 雷达页面显示评分后的信号
- **Notes**: 需要环境变量全部配置正确