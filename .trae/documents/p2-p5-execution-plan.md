# P2-P5 执行计划

## 扫描结果：提示词与实际代码的差异

| 阶段 | 提示词要求 | 实际状态 | 是否需修改 |
|------|-----------|---------|-----------|
| **P2** | 创建 Signal 模型 | 已存在（字段更丰富，有 hotScore/noveltyScore/businessScore/localScore/finalScore 而非单一 score） | 无需修改 |
| **P2** | 创建 v2ex.ts, jike.ts | 已存在 | 无需修改 |
| **P2** | 创建 crawler.ts | 不存在，但 crawlAllSources() 在 signals.ts 中，且**未调用 v2ex 和 jike** | **需修复** |
| **P2** | crawl API 用 Authorization: CRON_SECRET | 实际用 x-api-key: CRON_API_KEY | 保持现状（与环境变量一致） |
| **P2** | signals API 用真实 DB | 已实现，支持分页/排序/过滤 | 无需修改 |
| **P2** | radar 页面用真实数据 | 已从 /api/signals 获取，有 Skeleton 加载态 | 无需修改 |
| **P2** | SignalCard 用冰焰蓝 | 已重写 | 无需修改 |
| **P3** | 实现 calculateScore | 已实现（DeepSeek API + 启发式回退） | 无需修改 |
| **P3** | score/batch API | 已实现 | 无需修改 |
| **P3** | crawl 后自动评分 | **未实现** — crawlAllSources() 不调用评分 | **需修复** |
| **P3** | 前端热度展示 | 部分实现（SignalCard 显示 finalScore） | 无需修改 |
| **P4** | 创建 ForgeProject/CanvasReport 模型 | 已存在 | 无需修改 |
| **P4** | forge/canvas API | 已实现（调用 DeepSeek API） | 无需修改 |
| **P4** | forge/canvas 页面 | 已存在 | 无需修改 |
| **P5** | 创建 LogEntry 模型 | 已存在 | 无需修改 |
| **P5** | logs API | 已实现 | 无需修改 |
| **P5** | stream 页面 | 已存在 | 无需修改 |
| **P5** | 定时任务设置 | 需在 Vercel 中配置 Cron Job | 输出说明 |

## 结论：提示词大部分正确，仅需修复 3 处

---

## 实际需要执行的修改

### P2 修复：crawlAllSources 补充 v2ex + jike

**文件：** `src/lib/signals.ts`

**修改：** `crawlAllSources()` 函数目前只调用 HN 和 PH，需增加 v2ex 和 jike 的并行抓取。

```typescript
// 当前（第 208-211 行）：
const [hnItems, phPosts] = await Promise.all([
  fetchHackerNewsTop(30),
  fetchProductHuntToday(20),
])

// 改为：
const [hnItems, phPosts, v2exTopics, jikePosts] = await Promise.all([
  fetchHackerNewsTop(30),
  fetchProductHuntToday(20),
  fetchV2EXHot(20),
  fetchJikeHot(10),
])
```

并在保存结果中增加 v2ex/jike 的计数，日志中体现 4 个源。

### P3 修复：crawlAllSources 后自动评分

**文件：** `src/lib/signals.ts`

**修改：** 在 `crawlAllSources()` 函数末尾，如果有新信号，自动调用评分逻辑。

**文件：** `src/lib/scoring.ts`

**新增导出：** `batchScoreSignals(signalIds?: string[])` 函数，用于批量评分并更新数据库。

### P5 补充：定时任务配置说明

输出 Vercel Cron Job 配置说明（vercel.json 中已配置的 cron 路由）。

---

## 执行顺序

1. **P2 修复** — 修改 `crawlAllSources` 补充 v2ex + jike
2. **P3 修复** — 修改 `crawlAllSources` 添加自动评分
3. **P4 验证** — 确认 forge/canvas API 和页面正常工作
4. **P5 验证** — 确认 logs/stream 正常工作 + 输出 Cron Job 说明
5. **构建验证** — `npm run build` 确认 0 错误
6. **Git 提交推送**

---

## 验证步骤

```bash
# 1. 构建
npm run build

# 2. 启动
npm run dev

# 3. 测试抓取（包含 v2ex）
curl -X POST http://localhost:3000/api/crawl -H "x-api-key: your-cron-key"

# 4. 检查信号列表
curl http://localhost:3000/api/signals?limit=5

# 5. 检查热门信号（应已有 score）
# 打开 http://localhost:3000/radar

# 6. 测试复刻
# 打开 http://localhost:3000/radar → 点击信号 → 点击"一键复刻"

# 7. 测试商业画布
# 同上 → 点击"生成商业画布"

# 8. 检查公开日志
# 打开 http://localhost:3000/stream
```