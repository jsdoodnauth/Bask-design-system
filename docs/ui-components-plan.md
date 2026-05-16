# Bask UI Components — Build Plan

Tracking the build-out of the full component library. All components use `@base-ui/react` primitives (not Radix), Tailwind v4 `@theme inline` tokens, and the Bask carved shadow language.

Excluded by design: Command, Context Menu, Direction Provider, Input OTP, Menubar.
Toast: using `@base-ui/react/toast` (not the external `sonner` library).
Combobox: using `@base-ui/react/combobox` directly — no Command dependency.

---

## Already built

| Component | File | Notes |
|---|---|---|
| Avatar | `avatar.tsx` | |
| Badge | `badge.tsx` | |
| Breadcrumb | `breadcrumbs.tsx` | |
| Button | `button.tsx` | |
| Card | `card.tsx` | |
| Checkbox | `checkbox.tsx` | |
| Dialog | `dialog.tsx` | |
| Dropdown Menu | `dropdown-menu.tsx` | |
| Input | `input.tsx` | |
| Navigation Menu | `navigation-menu.tsx` | |
| Radio Group | `radio-group.tsx` | |
| Select | `select.tsx` | |
| Separator | `separator.tsx` | |
| Switch | `switch.tsx` | |
| Table | `table.tsx` | |
| Tabs | `tabs.tsx` | Pill + Groove variants, Framer Motion shared layout |
| Textarea | `textarea.tsx` | |
| Tooltip | `tooltip.tsx` | |

---

## Built in this round

All Waves 1–4 are complete. Demo page at `/components`.

### Wave 1 — No primitive, pure CSS/markup

| Status | Component | File | Primitive | Notes |
|---|---|---|---|---|
| [x] | Label | `label.tsx` | native `<label>` | Built as standalone styled label; Form uses `Field.Label` via `render` |
| [x] | Alert | `alert.tsx` | — | `default \| info \| success \| warn \| danger` variants; reuses badge soft-color tokens |
| [x] | Aspect Ratio | `aspect-ratio.tsx` | — | CSS `aspect-ratio`; defaults to 1 |
| [x] | Skeleton | `skeleton.tsx` | — | Recessed `--elev-inset` + `animate-pulse`, respects `motion-reduce` |

### Wave 2 — Base UI primitives

| Status | Component | File | Primitive | Notes |
|---|---|---|---|---|
| [x] | Accordion | `accordion.tsx` | `@base-ui/react/accordion` | Chevron rotates on open; height transitions via `--accordion-panel-height` |
| [x] | Collapsible | `collapsible.tsx` | `@base-ui/react/collapsible` | |
| [x] | Progress | `progress.tsx` | `@base-ui/react/progress` | Track uses `--elev-inset`, indicator is `--blue` |
| [x] | Slider | `slider.tsx` | `@base-ui/react/slider` | Recessed track + raised thumb with focus ring `--elev-1` |
| [x] | Toggle | `toggle.tsx` | `@base-ui/react/toggle` | `data-pressed` styling, three sizes |
| [x] | Toggle Group | `toggle-group.tsx` | `@base-ui/react/toggle-group` | Recessed track + raised active item; framer-motion layoutId not yet applied (CSS-only) |
| [x] | Scroll Area | `scroll-area.tsx` | `@base-ui/react/scroll-area` | Pill-shaped thumb at `bg-ink-3/40` |
| [x] | Alert Dialog | `alert-dialog.tsx` | `@base-ui/react/alert-dialog` | `Action` defaults to `danger` button, `Cancel` to `ghost` |
| [x] | Drawer | `drawer.tsx` | `@base-ui/react/drawer` | Exports `swipeForSide` helper to convert side → `swipeDirection` |
| [x] | Sheet | `sheet.tsx` | `@base-ui/react/dialog` | `side="top|right|bottom|left"` with slide animations |
| [x] | Toast | `toast.tsx` | `@base-ui/react/toast` | Re-exports `useToastManager`; `<Toaster />` convenience renderer |
| [x] | Pagination | `pagination.tsx` | — | Button-based; uses `ghost`/`default` variants |

### Wave 3 — Composite

| Status | Component | File | Primitive | Depends on |
|---|---|---|---|---|
| [x] | Popover | `popover.tsx` | `@base-ui/react/popover` | — |
| [x] | Hover Card | `hover-card.tsx` | `@base-ui/react/preview-card` | — |
| [x] | Combobox | `combobox.tsx` | `@base-ui/react/combobox` | Popover, Input; preserves `<Value>` generic on root |
| [x] | Form | `form.tsx` | `@base-ui/react/form` + `react-hook-form` | Label; exports `FormField` (RHF Controller), `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField()` |
| [x] | Data Table | `data-table.tsx` | — | Table, Checkbox, Pagination; typed `DataTable<TRow>` with click-to-sort headers, tri-state select-all, empty state. No `@tanstack/react-table` dep |

### Wave 4 — External library

| Status | Component | File | Package | Notes |
|---|---|---|---|---|
| [x] | Calendar | `calendar.tsx` | `react-day-picker@10` | Custom Chevron renderer; styled to Bask tokens |
| [x] | Date Picker | `date-picker.tsx` | `react-day-picker@10` | Popover-wrapped Calendar with Button trigger |
| [x] | Carousel | `carousel.tsx` | — | CSS scroll-snap + native `scrollBy`; horizontal & vertical |
| [x] | Chart | `chart.tsx` | `recharts@3` | `ChartContainer` with config-driven `--color-{key}` vars + `ChartTooltipContent` / `ChartLegendContent` |
| [x] | Resizable | `resizable.tsx` | `react-resizable-panels@4` | v4 API (`Group`/`Panel`/`Separator`); optional `withHandle` grip |

### globals.css updates

- Backdrop rule extended to cover `alert-dialog-overlay`, `sheet-overlay`, `drawer-overlay`.
- `--elev-3` applied to `alert-dialog-content`, `sheet-content`, `drawer-content`, `toast`.
- `prefers-contrast: more` outline list extended with the new slot family (alert, progress-track, slider-track, toggle-group, overlay popups).

---

## Design notes

**Shadow rules (from CLAUDE.md)**
- Inset/recessed surfaces (Slider track, Progress track, Scroll Area): `--elev-inset`
- Raised controls (Slider thumb, Toggle active): `--elev-1`
- Overlays (Toast, Drawer, Sheet, Popover, Hover Card): `--elev-3`
- Reactive elements that need parallax shadow: inline the shadow with `var(--tilt-x)` / `var(--tilt-y)` directly

**Framer Motion**
Already installed (`framer-motion ^12`). Use shared layout (`layoutId`) for Toggle Group active indicator, same pattern as Tabs. Consider `AnimatePresence` for Toast enter/exit and Sheet/Drawer slide-in.

**Form**
`react-hook-form` is the pairing for Form. Check if it's already in `package.json` before installing.

**Progress**
Wave 2 includes `@base-ui/react/meter` which is a sibling to Progress (semantically different — meter shows a value within a known range). Can be added as a variant or separate file.

---

## Status legend

- [ ] Not started
- [~] In progress
- [x] Done
