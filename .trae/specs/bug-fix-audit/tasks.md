# Bug Fix Audit - Tasks

---

## [x] Task 1: Fix dead buttons on signal detail page (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - Edit `/Users/quanjiawei/Documents/sparkforge/src/app/radar/[id]/page.tsx`
  - Add onClick handlers to "订阅信号" (line 391) and "分享" (line 408) buttons
  - On click, show "功能即将上线" feedback (use window.alert or a simple toast)
- **Test Requirements**:
  - `human-judgment` TR-1.1: Clicking "订阅信号" shows feedback
  - `human-judgment` TR-1.2: Clicking "分享" shows feedback
- **Estimate**: 10 min

## [x] Task 2: Fix dead button on stream page (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - Edit `/Users/quanjiawei/Documents/sparkforge/src/app/stream/page.tsx`
  - Add onClick handler to "连接 Twitter" button (line 273)
  - On click, show "功能即将上线" feedback
- **Test Requirements**:
  - `human-judgment` TR-2.1: Clicking "连接 Twitter" shows feedback
- **Estimate**: 5 min

## [x] Task 3: Fix stream page mock data fallback logic (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - Edit `/Users/quanjiawei/Documents/sparkforge/src/app/stream/page.tsx`
  - Current logic at line 105: `const displayLogs = logs.length > 0 ? logs : mockLogs` - this always shows mock when API returns empty
  - Fix: show real data from API when available, only fallback to mock when API call fails (not when it returns empty)
  - Add a `fetchError` state to track API failure
  - Add an empty state message when API returns empty data
- **Test Requirements**:
  - `programmatic` TR-3.1: API success with data → shows real data
  - `programmatic` TR-3.2: API success with empty → shows empty state, not mock
  - `programmatic` TR-3.3: API failure → falls back to mock
- **Estimate**: 15 min

## [x] Task 4: Add auth check to subscribe API (P1)
- **Priority**: P1
- **Depends On**: None
- **Description**:
  - Edit `/Users/quanjiawei/Documents/sparkforge/src/app/api/subscribe/route.ts`
  - POST handler: add auth check using Bearer token (CRON_API_KEY)
  - DELETE handler: same auth check
  - GET handler: add auth check
- **Test Requirements**:
  - `programmatic` TR-4.1: POST without auth returns 401
  - `programmatic` TR-4.2: DELETE without auth returns 401
  - `programmatic` TR-4.3: GET without auth returns 401
- **Estimate**: 20 min

## [x] Task 5: Build verification (P0)
- **Priority**: P0
- **Depends On**: Task 1-4
- **Description**:
  - Run `npm run build`
- **Test Requirements**:
  - `programmatic` TR-5.1: Build passes
- **Estimate**: 5 min

# Task Dependencies

```
Task 1 (parallel)
Task 2 (parallel)
Task 3 (parallel)
Task 4 (parallel)
    └──→ Task 5 (final)
```

Total estimate: ~55 min