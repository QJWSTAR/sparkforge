# 核心功能真实化 - 任务清单

## [x] Task 1: 创建 AI 生成项目方案的 API (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 创建 `/api/generate/forge` API 端点
  - 调用 DeepSeek API 生成项目方案（技术栈选择、项目结构、核心功能清单）
- **Test Requirements**:
  - `human-judgment` TR-1.1: API 返回真实的项目方案
- **Estimate**: 15 min

## [x] Task 2: 创建 AI 生成商业画布的 API (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 创建 `/api/generate/canvas` API 端点
  - 调用 DeepSeek API 生成商业模型分析（商业模式、用户画像、竞品分析、SWOT）
- **Test Requirements**:
  - `human-judgment` TR-2.1: API 返回真实的商业分析
- **Estimate**: 15 min

## [x] Task 3: 改造复刻工坊页面调用真实 API (P0)
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 替换模拟进度动画为真实 API 调用
  - 显示 AI 生成的项目方案
- **Test Requirements**:
  - `human-judgment` TR-3.1: 点击"开始复刻"显示真实 AI 输出
- **Estimate**: 15 min

## [x] Task 4: 改造商业画布页面调用真实 API (P0)
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  - 替换模板内容为真实 API 调用
  - 显示 AI 生成的商业分析
- **Test Requirements**:
  - `human-judgment` TR-4.1: 点击"生成商业画布"显示真实 AI 输出
- **Estimate**: 15 min

## [x] Task 5: 触发数据抓取和评分 (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 调用 `/api/crawl` 抓取真实信号数据
  - 调用 `/api/score/batch` 为新信号评分
- **Test Requirements**:
  - `human-judgment` TR-5.1: 雷达页显示真实信号数据
- **Estimate**: 10 min

## [x] Task 6: 构建验证 (P0)
- **Priority**: P0
- **Depends On**: Task 1-4
- **Description**:
  - 运行 `npm run build` 验证构建成功
- **Test Requirements**:
  - `programmatic` TR-6.1: 构建成功
- **Estimate**: 5 min

# Task Dependencies
```
Task 1 ───→ Task 3
Task 2 ───→ Task 4
Task 5
    └──→ Task 6 (build)
```

Total estimate: ~75 min