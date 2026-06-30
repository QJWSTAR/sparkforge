# SparkForge Bug Fix & Code Quality Spec

## Why
代码审计发现多处无功能按钮、mock数据默认回退、认证缺失等实际问题，需修复以确保Demo可正常展示。

## What Changes
- 修复信号详情页"订阅信号"和"分享"按钮无功能
- 修复公开日志页"连接Twitter"按钮无功能
- 修复公开日志页默认使用mock数据回退（应优先展示真实数据）
- 修复subscribe API的userId认证缺失
- 修复crawl API在开发环境跳过认证（生产环境安全）

## Impact
- Affected code: radar/[id]/page.tsx, stream/page.tsx, subscribe/route.ts, crawl/route.ts

## ADDED Requirements
### Requirement: Dead Buttons Fixed
所有页面上的按钮必须有实际功能或明确的"即将上线"反馈。

#### Scenario: 信号详情页按钮
- **WHEN** 点击"订阅信号"或"分享"按钮
- **THEN** 显示"功能即将上线"提示

#### Scenario: 公开日志页按钮
- **WHEN** 点击"连接Twitter"按钮
- **THEN** 显示"功能即将上线"提示

### Requirement: Stream Page Real Data Priority
公开日志页应优先展示API真实数据，仅在API完全失败时才使用mock。

#### Scenario: API返回空数据
- **WHEN** API返回成功但数据为空
- **THEN** 显示空状态提示，不自动回退到mock

### Requirement: Subscribe API Auth
subscribe API的POST/DELETE应从认证session获取userId。

#### Scenario: 未认证用户订阅
- **WHEN** 未登录用户调用subscribe API
- **THEN** 返回401 Unauthorized