# SparkForge UI Fix Implementation - Tasks

---

## [x] Task 1: Fix root layout hardcoded colors (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - Edit `/Users/quanjiawei/Documents/sparkforge/src/app/layout.tsx` line 17
  - Replace `bg-[#0a0a0a] text-white` with CSS variable references
- **Test Requirements**:
  - `programmatic` TR-1.1: Body uses var(--color-bg) and var(--color-text)
  - `programmatic` TR-1.2: Light mode switch works correctly
- **Estimate**: 5 min

## [x] Task 2: Fix homepage gradient syntax (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - Edit `/Users/quanjiawei/Documents/sparkforge/src/app/page.tsx` line 53
  - Add `from-` prefix to gradient-to-r
- **Test Requirements**:
  - `human-judgment` TR-2.1: Title gradient renders correctly
- **Estimate**: 2 min

## [x] Task 3: Add mobile hamburger menu to Navbar (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - Edit `/Users/quanjiawei/Documents/sparkforge/src/components/Navbar.tsx`
  - Add mobileMenuOpen state, hamburger button (md:hidden), dropdown menu
- **Test Requirements**:
  - `human-judgment` TR-3.1: Hamburger icon visible on mobile widths
  - `human-judgment` TR-3.2: Click opens/closes navigation menu
  - `human-judgment` TR-3.3: All nav links work in mobile menu
- **Estimate**: 30 min

## [x] Task 4: Add mobile filter drawer to radar page (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - Edit `/Users/quanjiawei/Documents/sparkforge/src/app/radar/page.tsx`
  - Add filterOpen state, filter button, bottom sheet overlay
- **Test Requirements**:
  - `human-judgment` TR-4.1: Filter button visible on mobile
  - `human-judgment` TR-4.2: Click opens bottom sheet with source list
  - `human-judgment` TR-4.3: Selecting sources works correctly
- **Estimate**: 45 min

## [x] Task 5: Add search debounce hook (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - Create `/Users/quanjiawei/Documents/sparkforge/src/lib/hooks.ts` with useDebounce
  - Apply to search input in radar/page.tsx
- **Test Requirements**:
  - `programmatic` TR-5.1: Search triggers API after 300ms idle
  - `programmatic` TR-5.2: No API call on every keystroke
- **Estimate**: 15 min

## [x] Task 6: Fix canvas page three-column alignment (P0)
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - Edit `/Users/quanjiawei/Documents/sparkforge/src/app/canvas/page.tsx`
  - Add flex-1 and min-height to column cards
- **Test Requirements**:
  - `human-judgment` TR-6.1: Three columns visually aligned at bottom
- **Estimate**: 15 min

## [x] Task 7: Unify login/register/profile pages to design system (P1)
- **Priority**: P1
- **Depends On**: Task 1
- **Description**:
  - Replace all hardcoded Tailwind color classes in:
    - `/Users/quanjiawei/Documents/sparkforge/src/app/login/page.tsx`
    - `/Users/quanjiawei/Documents/sparkforge/src/app/register/page.tsx`
    - `/Users/quanjiawei/Documents/sparkforge/src/app/profile/page.tsx`
  - Map: bg-white/5→var(--color-bg-hover), text-gray-400→var(--color-text-secondary), etc.
- **Test Requirements**:
  - `human-judgment` TR-7.1: All three pages use CSS variables exclusively
  - `human-judgment` TR-7.2: Light mode works on all three pages
- **Estimate**: 90 min

## [x] Task 8: Remove duplicate navbar from profile page (P1)
- **Priority**: P1
- **Depends On**: Task 7
- **Description**:
  - Delete lines 47-66 in profile/page.tsx (duplicate header)
- **Test Requirements**:
  - `human-judgment` TR-8.1: Profile page shows only one navbar
- **Estimate**: 5 min

## [x] Task 9: Apply shadow system to all cards (P1)
- **Priority**: P1
- **Depends On**: Task 1
- **Description**:
  - Add boxShadow: 'var(--shadow-md)' to bg-surface cards in:
    - page.tsx, forge/page.tsx, canvas/page.tsx, stream/page.tsx, SignalCard.tsx
- **Test Requirements**:
  - `human-judgment` TR-9.1: Cards have visible shadow depth
- **Estimate**: 20 min

## [x] Task 10: Fix light mode primary color and text contrast (P1)
- **Priority**: P1
- **Depends On**: None
- **Description**:
  - Edit globals.css: light mode primary to #F0501A, text-muted to #8B95A5
- **Test Requirements**:
  - `human-judgment` TR-10.1: Light mode primary color more vibrant
  - `human-judgment` TR-10.2: Text contrast meets WCAG AA
- **Estimate**: 5 min

## [x] Task 11: Build verification (P0)
- **Priority**: P0
- **Depends On**: Task 1-10
- **Description**:
  - Run npm run build, npm run typecheck, npm run lint
  - Verify no errors
- **Test Requirements**:
  - `programmatic` TR-11.1: Build passes
  - `programmatic` TR-11.2: Typecheck passes
  - `programmatic` TR-11.3: Lint passes
- **Estimate**: 5 min

# Task Dependencies

```
Task 1 ──────┬──→ Task 7 ──→ Task 8
             ├──→ Task 9
Task 2 (parallel)
Task 3 (parallel)
Task 4 (parallel)
Task 5 (parallel)
Task 6 (parallel)
Task 10 (parallel)
             └──→ Task 11 (final)
```

- Tasks 1, 2, 3, 4, 5, 6, 10 can run in parallel
- Task 7 depends on Task 1 (design system must be active first)
- Task 8 depends on Task 7 (profile page)
- Task 9 depends on Task 1 (consistent bg-surface)
- Task 11 depends on all tasks

Total estimate: ~3.5 hours