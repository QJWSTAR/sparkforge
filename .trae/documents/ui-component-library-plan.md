# UI Component Library Implementation Plan

## Context

The project needs a reusable UI component library based on a blue-tinted design system. The existing project uses an orange primary (#FF6B35), but the new library must use blue (#4DA8FF) per the spec. The two color systems coexist via separate token namespaces (`--color-*` for existing orange, `--ui-*` for new blue).

## Key Decisions

- **Separate token namespace**: Blue tokens use `--ui-*` prefix to avoid conflicts with the existing orange `--color-*` tokens.
- **Tailwind v4 `@theme` directive**: Colors are registered via `@theme` in `globals.css`, making `bg-ui-primary`, `text-ui-primary`, etc. available as Tailwind utilities — enabling full state variant chaining.
- **All components use `forwardRef`** for maximum flexibility.
- **Icons from lucide-react** (ChevronDown, TrendingUp, TrendingDown, X).

## Implementation Steps

### Step 0: Install lucide-react

```bash
npm install lucide-react
```

### Step 1: Add design tokens to `globals.css`

Add an `@theme` block with `--color-ui-*` tokens after `@import "tailwindcss"`, plus `--ui-*` CSS custom properties in `:root` for non-color tokens (focus ring, overlay, mono font).

### Step 2: Create components (in dependency order)

| # | File | Description |
|---|------|-------------|
| 1 | `button.tsx` | Primary/Secondary/Ghost × md/lg, forwardRef, scale(0.97) active |
| 2 | `input.tsx` | default/focus/error/disabled, focus ring via CSS var |
| 3 | `badge.tsx` | default/success/warning, capsule shape, semi-transparent bg |
| 4 | `toggle.tsx` | off/on/disabled, 40×20px track, ARIA switch role |
| 5 | `avatar.tsx` | sm/md/lg + online/group/offline, 8px green dot |
| 6 | `select.tsx` | native select with ChevronDown icon, same states as Input |
| 7 | `data-card.tsx` | 3px left accent, 32px JetBrains Mono value, trend arrows |
| 8 | `content-card.tsx` | hover border-blue, selected state, onClick support |
| 9 | `modal.tsx` | overlay blur(4px), createPortal, enter/exit animation, Escape key |

### Step 3: Create barrel export `index.ts`

## Files to Modify

- `/Users/quanjiawei/Documents/sparkforge/src/app/globals.css` — Add `@theme` block and `--ui-*` CSS variables
- `/Users/quanjiawei/Documents/sparkforge/src/components/ui/button.tsx` — New
- `/Users/quanjiawei/Documents/sparkforge/src/components/ui/input.tsx` — New
- `/Users/quanjiawei/Documents/sparkforge/src/components/ui/badge.tsx` — New
- `/Users/quanjiawei/Documents/sparkforge/src/components/ui/toggle.tsx` — New
- `/Users/quanjiawei/Documents/sparkforge/src/components/ui/avatar.tsx` — New
- `/Users/quanjiawei/Documents/sparkforge/src/components/ui/select.tsx` — New
- `/Users/quanjiawei/Documents/sparkforge/src/components/ui/data-card.tsx` — New
- `/Users/quanjiawei/Documents/sparkforge/src/components/ui/content-card.tsx` — New
- `/Users/quanjiawei/Documents/sparkforge/src/components/ui/modal.tsx` — New
- `/Users/quanjiawei/Documents/sparkforge/src/components/ui/index.ts` — New

## Verification

1. Run `npm run build` to verify TypeScript compilation passes
2. Run `npm run dev` and visually inspect each component in the browser
3. Test all interactive states (hover, focus, active, disabled) across components
4. Verify dark/light mode compatibility by toggling the theme