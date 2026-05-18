# Bask — Motion / Framer Motion Component Plan

A staged plan to weave Framer Motion (`framer-motion`, already installed and used in `tabs.tsx`) through the rest of the component library without breaking Bask's two load-bearing motion rules.

## Non-negotiable constraints (read first)

These come from the existing system; nothing in this plan may violate them.

1. **Shadow-only press feedback.** No `translateY` / `scale` on `:active` for buttons, cards, stats, badges, icon-buttons, lock-cards, user-pills. Press collapses the cast shadow only. (CLAUDE.md "Press feedback policy".)
2. **No hover scale/translate on reactive elements.** The proximity-light parallax already drives cursor-aware shadow tilt on `.card, .stat, .btn, .icon-btn, .badge, .lockcard, .user-pill`. Adding `whileHover={{ scale }}` to those will fight the tilt math and produce sub-pixel shimmer. Hover stays as shadow lift via the existing `[data-slot]:hover` CSS rules in `globals.css`.
3. **Don't break the `--tilt-x / --tilt-y` invalidation chain.** Reactive shadows must reference `var(--tilt-x)` directly, never through an intermediate `--elev-*`. Framer Motion may animate other properties on those elements, but must not take over `box-shadow`.
4. **Reduced motion.** Every framer-motion addition must respect `useReducedMotion()` and fall back to either no animation or `duration: 0`. The provider already bails; component-level work must do the same.
5. **`@property --tilt-x / --tilt-y` registrations** in `globals.css` stay top-level (not inside `@layer`). Untouched by this plan.

---

## Where motion buys us something

The components below were surveyed (`components/ui/*.tsx`). Each is categorized: **add** = clear win, **keep** = the existing CSS animation is already good enough, **skip** = motion would hurt.

### Tier A — Overlays & transient surfaces (high payoff)

These currently use shadcn's `data-open:animate-in` CSS keyframes via tailwindcss-animate. They work, but they have no spring physics, no orchestrated stagger, and exit animations are fragile when state changes mid-animation. AnimatePresence solves all three.

| Component | Current | Proposed |
|---|---|---|
| `dialog.tsx` | `data-open:fade-in zoom-in-[0.96]` CSS | `AnimatePresence` + spring scale (0.96 → 1) + opacity. Backdrop fades separately. |
| `alert-dialog.tsx` | same | same as dialog |
| `sheet.tsx` | side-slide via CSS | `AnimatePresence` + spring `x`/`y` from edge; backdrop fade |
| `drawer.tsx` | similar to sheet | `AnimatePresence` + spring `y` from bottom |
| `popover.tsx` / `hover-card.tsx` | fade | fade + 4px lift, fast tween (180ms) — no spring (popovers feel sluggish with springs) |
| `dropdown-menu.tsx` | fade-in + scale-95 | fade + origin-aware scale-95 → 1, 140ms easeOut |
| `tooltip.tsx` | fade | fade + 2px lift, 120ms — must be near-instant |
| `toast.tsx` | enter/exit | `AnimatePresence` stack with `layout` for reorder; spring entrance from edge, fade-slide exit |
| `combobox.tsx` listbox | fade | same as dropdown-menu |
| `select.tsx` listbox | fade | same as dropdown-menu |
| `date-picker.tsx` calendar | fade | fade + small scale; calendar grid optional whileInView stagger on month change |

**Pattern.** Each gets a thin `motion.div` wrapper inside the existing Base UI `Popup` / `Backdrop`, gated by `AnimatePresence` keyed on `state.open`. The CSS `data-open:animate-in` classes get removed in the same pass to avoid double-animation.

### Tier B — State toggles (medium payoff, mind the shadow rule)

| Component | Proposed |
|---|---|
| `switch.tsx` | Spring on the thumb's `x` translate (track inversion stays CSS). `stiffness: 500, damping: 32`. The thumb already lives inside the track shadow context; only its `transform` animates. |
| `checkbox.tsx` | Animated checkmark path-draw on tick using `motion.path` with `pathLength` 0→1 (180ms easeOut). The recess↔raise inversion of the box itself stays CSS — that's the system's primary visual language and shouldn't be reinterpreted by FM. |
| `radio-group.tsx` | Spring scale on the inner dot 0→1 (`visualDuration: 0.18, bounce: 0.3`). Outer ring stays CSS. |
| `choice.tsx` | Same as radio — inner indicator scale-in; carved inversion stays CSS. |
| `toggle.tsx` / `toggle-group.tsx` | No FM. Press/hover policy says shadows only; toggle already inverts via CSS. |
| `accordion.tsx` | Replace `transition-[height]` with `motion.div` `animate={{ height: 'auto' }}` + content fade-in 60ms behind it. Base UI exposes `--accordion-panel-height`, but FM gives better mid-flight interruption. Chevron rotation stays CSS (already correct). |
| `collapsible.tsx` | Same treatment as accordion panel. |
| `progress.tsx` | Spring on the bar's `scaleX` instead of CSS transition — better for indeterminate→determinate handoff. |
| `slider.tsx` | No FM. Native input. |
| `stepper.tsx` | `layoutId="stepper-active"` on the active step indicator so it slides between steps. Connector fill animates via CSS. |

### Tier C — Lists, tables, layout (ambitious, per user choice)

| Component | Proposed |
|---|---|
| `data-table.tsx` | Row enter/exit via `AnimatePresence` keyed on row id. Row `layout` prop for sort/filter reorders. Cap at ~50 rows visible — `layout` on large lists is expensive. |
| `pagination.tsx` | Active page indicator with `layoutId="pagination-active"` (same trick as tabs). |
| `breadcrumbs.tsx` | Crumb enter on push, fade-out on pop. |
| `navigation-menu.tsx` | Submenu viewport: `AnimatePresence` + spring height between submenus (the classic Radix nav-menu move). |
| `tabs.tsx` | **Already done** — `layoutId="pill-bg"` / `"groove-bg"`. Reference implementation. |
| `carousel.tsx` | Slide spring on track translate. Drag already framer-motion-friendly. |
| `card.tsx`, `stat.tsx`, `lock-card.tsx` | **No entrance scale/translate.** Per rule 2 these are reactive shadow elements. Limit to opacity fade-in on first viewport entry (`whileInView opacity` only, `once: true`). Even that is optional; flag any visible flicker against the parallax shadows and remove. |
| `badge.tsx` | No FM. Reactive shadow element. |
| `skeleton.tsx` | Replace any CSS shimmer with `motion.div` `animate={{ backgroundPosition }}` only if current CSS shimmer feels janky; otherwise leave. |
| `swatch.tsx`, `avatar.tsx`, `avatar-initials.tsx` | No FM. Reactive shadow elements. |
| `alert.tsx` | `AnimatePresence` for dismissible alerts: collapse height + fade on dismiss. |
| `chart.tsx` | Bars/lines animate-in on mount via the chart library's own API (Recharts has built-in). Don't double-wrap. |

### Tier D — Skip entirely

`aspect-ratio`, `separator`, `label`, `input`, `textarea`, `form`, `table` (raw markup), `scroll-area`, `resizable`, `calendar` (cells), `hover-card` (covered above), `chart` — either structural-only, native inputs, or owned by another lib.

---

## Page transitions (global)

A subtle route-change fade-up, gated by `useReducedMotion`.

- Add `app/template.tsx` (Next 16 supports `template.tsx` for per-route remount-on-nav):
  - `<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>`
- **Risk:** the parallax shadow recomputes on layout; an 8px transient `y` translate will offset the cursor-distance math for ~240ms after navigation. Mitigation: ease the fade-up on the **first child wrapper inside `<main>`**, not on the page root, so the parallax element bounding boxes stabilize within ~16ms of mount.
- Keep it ONE motion: a single fade-up, no per-section stagger at the page level. Per-section stagger lives in component-level `whileInView` calls.

---

## Shared building blocks to add

Three small additions to `lib/motion/`:

1. **`lib/motion/presets.ts`** — exported spring/tween constants so every component uses the same vocabulary:
   - `springSnappy` `{ type: 'spring', stiffness: 500, damping: 38 }` — toggles, indicators
   - `springSoft` `{ type: 'spring', stiffness: 280, damping: 30 }` — overlays, modals
   - `tweenFast` `{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }` — tooltips, popovers
   - `tweenBase` `{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }` — page transition, sheets

2. **`lib/motion/use-reduced-motion-safe.ts`** — wrapper that returns the preset OR `{ duration: 0 }`. Components call this once and pass the result; no per-component `if (shouldReduce)` branching.

3. **`lib/motion/overlay.tsx`** — a `<MotionOverlay>` and `<MotionBackdrop>` pair encapsulating the AnimatePresence + variants used by dialog/sheet/drawer/popover/dropdown/select/combobox. Avoids 8 copies of the same scaffolding.

---

## Rollout (suggested milestones)

| # | Scope | Risk |
|---|---|---|
| M-A | Add presets + overlay helpers. Migrate `dialog`, `alert-dialog`, `popover`, `tooltip`, `dropdown-menu`, `select`, `combobox`. Remove their `data-open:animate-in` classes. | Low. Visible win. |
| M-B | `sheet`, `drawer`, `hover-card`, `toast`, `alert` dismiss, `accordion`, `collapsible`. | Low–medium. Toast stack needs a careful `layout` decision. |
| M-C | `switch` thumb, `radio-group`/`choice` dot, `checkbox` path-draw, `progress` bar, `stepper` indicator, `pagination` indicator. | Low. Tightly scoped to non-reactive sub-elements. |
| M-D | `data-table` row enter/exit + layout, `carousel`, `navigation-menu` viewport, optional `whileInView` first-mount fade on cards. | Medium–high. Profile on the customers page (largest table). Roll back any tier-C item that visibly fights the parallax shadows. |
| M-E | Global page transition via `app/template.tsx`. | Low if scoped to inner wrapper. |

Each milestone is independently shippable.

---

## Decisions deferred to implementation time

- **Dialog backdrop fade duration vs. content scale:** stagger or simultaneous? Try simultaneous first; stagger reads as slow on this aesthetic.
- **Toast `layout` prop on the stack:** required for reorder smoothness, but every toast becomes a layout-animated element. If profile shows jank at 5+ toasts, drop `layout` and use absolute positioning + spring `y`.
- **Accordion panel:** Base UI's `--accordion-panel-height` vs. FM `animate={{ height: 'auto' }}` — Base UI's value already accounts for content size; check whether wrapping the panel in `motion.div` causes a double-measure. If so, animate FM on the panel's inner wrapper and let Base UI continue setting the outer height.
- **`once: true` viewport behavior** on cards: if the user scrolls back up, do cards re-fade? Default `once: true`. Revisit if it feels stale.

---

## What this plan deliberately does NOT do

- **No hover scale on buttons, cards, stats, badges, lock-cards, user-pills, swatches, avatars.** Rule 2.
- **No press translate anywhere.** Rule 1.
- **No replacement of the proximity-light parallax with FM motion values.** The current rAF + CSS-var-write approach is more efficient than `useMotionValue` per element across 50+ tiles, and works without React re-renders. Don't port.
- **No animation on `input`, `textarea`, `label`, `separator`, `aspect-ratio`.** Structural / native.
- **No "list item slides in from the side on every render"** — those visual tics conflict with the carved, settled aesthetic Bask is going for. Entrance motion is reserved for genuinely-mounted-once content (page-level fade-up, modal contents, accordion expand).
