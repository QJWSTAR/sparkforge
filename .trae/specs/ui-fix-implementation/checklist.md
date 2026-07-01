# SparkForge UI Fix Implementation - Checklist

## Design System Foundation
- [x] layout.tsx body uses CSS variables (not hardcoded #0a0a0a/text-white)
- [x] Light mode switch works globally
- [x] Homepage title gradient renders correctly (from-...via-...to-...)

## Mobile Experience
- [x] Navbar shows hamburger menu on mobile widths
- [x] Hamburger opens/closes navigation dropdown
- [x] All navigation links work in mobile menu
- [x] Radar page shows filter button on mobile
- [x] Mobile filter bottom sheet opens with source list
- [x] Source selection works in mobile drawer

## Radar Page
- [x] Search debounce hook created and applied
- [x] API requests only fire after 300ms idle

## Auth & Profile Pages
- [x] Login page uses CSS variables exclusively
- [x] Register page uses CSS variables exclusively
- [x] Profile page uses CSS variables exclusively
- [x] Profile page has no duplicate navbar
- [x] Light mode works on login/register/profile pages

## Canvas & Layout
- [x] Canvas three-column cards visually aligned
- [x] Canvas cards have equal minimum height

## Visual Polish
- [x] All bg-surface cards have shadow-md applied
- [x] Light mode primary color is more vibrant (#F0501A)
- [x] Text contrast meets WCAG AA in both modes

## Build Verification
- [x] npm run build passes (17/17 static pages, 0 errors)
- [x] npm run typecheck passes (0 errors)
- [x] npm run lint passes (0 warnings, 0 errors)