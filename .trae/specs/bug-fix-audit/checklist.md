# Bug Fix Audit - Checklist

## Task 1: Fix dead buttons on signal detail page
- [x] "订阅信号" button has onClick handler showing feedback
- [x] "分享" button has onClick handler showing feedback

## Task 2: Fix dead button on stream page
- [x] "连接 Twitter" button has onClick handler showing feedback

## Task 3: Fix stream page mock data fallback logic
- [x] Real API data is shown when API returns data
- [x] Empty state is shown when API returns empty data (not mock)
- [x] Mock data is shown only when API call fails

## Task 4: Add auth check to subscribe API
- [x] POST returns 401 without auth
- [x] DELETE returns 401 without auth
- [x] GET returns 401 without auth

## Task 5: Build verification
- [x] `npm run build` passes
- [x] Typecheck passes
- [x] Lint passes