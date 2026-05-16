# Bask — Implementation Plan

End-to-end plan for shipping the **Bask design system** as a Next.js 16 + shadcn application. The HTML prototype in `prototype/` is the visual source of truth; the mocks in `docs/mocks/` are the original references.

> **Status**: Prototype (Milestone 0) is substantially complete — the gallery covers all components, forms, overlays, and navigation that the four target pages require. Next.js app has not been scaffolded yet.

---

## 1. Goals

- A **carved** aesthetic on a warm cream palette — soft, directional cast shadows + subtle inset top-edge highlight and bottom-edge shade. Cards read as material molded into the page, not paper stacked on top of it.
- A **single source of design truth** (CSS tokens) that drives both the raw HTML prototype and the eventual shadcn-wrapped React components.
- **Proximity-light parallax**: the cursor is a light source with a falloff radius. Cards near the cursor tilt their cast shadow strongly; cards across the page stay quiet at gravity. Quiet & precise — the page doesn't shimmer when the mouse moves.
- **Press feedback without size change**: buttons collapse their cast shadow on press but do *not* translate or scale. Hover doesn't visibly lift them either. The size stays constant across all states.
- Honor `prefers-reduced-motion` — disable parallax and transitions when set.
- **Inside/outside grammar**: every surface lives at a known tier — recessed (inputs, switch tracks), flat (rows), raised (cards), floating (overlays). Checkboxes/radios/`.choice` invert recessed→elevated when active; that inversion is the system's main interaction language.

---

## 2. Stack

| Layer            | Choice                                  | Why                                                                 |
|------------------|-----------------------------------------|---------------------------------------------------------------------|
| Framework        | Next.js 16 (App Router) + React 19      | Current `create-next-app` default. Server components by default; the motion provider is the only client island. Next 16 has breaking changes vs. training-data Next — consult `node_modules/next/dist/docs/` before writing Next-specific code. |
| Language         | TypeScript (strict)                     | —                                                                   |
| Styling          | Tailwind CSS v4 (CSS-first `@theme inline`) | Lets us paste the prototype's tokens directly — no `tailwind.config.ts`. |
| Components       | shadcn/ui (Radix primitives)            | Visual layer is overridden; behavior/accessibility stays.           |
| Icons            | lucide-react                            | Replaces emoji placeholders during milestone 5.                     |
| Fonts            | Inter (body/UI) + **Fraunces** (h1/h2 display) via `next/font/google` | Self-hosted, no CLS. Fraunces variable font; tight tracking (`-0.02em`) on display. |
| Motion           | Custom rAF loop (no library)            | Proximity-light parallax is a CSS-var write per element per frame — cheaper than any animation library. `motion-framer` skill is installed for the React port if richer transitions become needed later (e.g., page transitions, list reorders). |

---

## 3. Repository layout

```
clay-system/
├─ CLAUDE.md                  # guidance for future Claude Code sessions
├─ docs/
│  ├─ mocks/                  # reference PNGs for the 4 target pages
│  └─ plan.md                 # this file
├─ prototype/                 # static HTML/CSS reference (substantially complete)
│  ├─ tokens.css              # palette, type, @property, --elev-* tokens (static-use only)
│  ├─ components.css          # all components; reactive ones inline their shadow
│  └─ index.html              # gallery + inline JS for motion / tabs / overlays
├─ index.html.html            # legacy claymorphism reference; not part of the system
├─ app/                       # Next.js 16 App Router — scaffolded (Milestone 1 done)
│  ├─ globals.css             # tokens + @theme inline + body grain
│  ├─ layout.tsx              # next/font Inter+Fraunces, BaskMotionProvider mount
│  └─ page.tsx                # smoke test page (replaced in Milestone 6)
├─ lib/
│  ├─ bask-shadow.ts          # 10-key enum + focusRing/inkRing modifiers (Milestone 2)
│  └─ motion/
│     └─ bask-motion-provider.tsx  # client island + useBaskTilt (Milestone 3)
└─ public/                    # static assets
```

---

## 4. Design tokens & the inline-shadow rule

The Tailwind v4 theme will paste `prototype/tokens.css` verbatim and re-expose values via `@theme inline`:

```css
/* src/app/globals.css */
@import "tailwindcss";

@layer base { /* paste prototype/tokens.css contents here */ }

@theme inline {
  --color-bg:         var(--bg);
  --color-surface:    var(--surface);
  --color-surface-2:  var(--surface-2);
  --color-surface-3:  var(--surface-3);
  --color-ink:        var(--ink);
  --color-ink-2:      var(--ink-2);
  --color-ink-3:      var(--ink-3);
  --color-primary:    var(--blue);
  --color-success:    var(--green);
  --color-warning:    var(--amber);
  --color-danger:     var(--red);
  --color-accent:     var(--violet);

  --radius-sm: var(--r-sm);
  --radius-md: var(--r-md);
  --radius-lg: var(--r-lg);
  --radius-xl: var(--r-xl);

  /* STATIC shadows only — see "Inline-shadow rule" below */
  --shadow-bask-inset:   var(--elev-inset);
}
```

### Inline-shadow rule (critical, non-obvious)

Browsers do **not** reliably invalidate `box-shadow` when a nested `var(--tilt-x)` inside a `--elev-*` token changes. The dependency chain `box-shadow → --elev-2 → --tilt-x` does not trigger paint; the chain `box-shadow → --tilt-x` does. This was discovered during prototype iteration and confirmed by inspecting computed styles.

**Consequence for the Tailwind theme**:
- `shadow-bask-inset` can be a Tailwind utility (static, no parallax).
- `shadow-bask-1` / `2` / `3` / `pressed` **cannot** be Tailwind utilities pointing at `--elev-*`. Reactive elements must inline their shadow declaration referencing `var(--tilt-x)` / `var(--tilt-y)` directly.

In the React port, the canonical form is a one-line `clsx` of utilities for the static styling plus an inline `style={{ boxShadow: baskShadow('e2') }}` where `baskShadow()` is a helper that returns the shadow string with `var(--tilt-x)` / `var(--tilt-y)` in the cast offsets. The prototype's reactive classes (`.card`, `.stat`, `.btn`, `.icon-btn`, `.badge`, `.lockcard`, `.user-pill`) all follow this inline pattern — copy from them.

`--tilt-x` and `--tilt-y` are registered via `@property` in `tokens.css` to help with invalidation. Keep those registrations.

---

## 5. Motion architecture

### 5.1 `BaskMotionProvider`

A single client component mounted in the root layout. Owns:
- One `pointermove` listener on `window`.
- One eased cursor position (`mxTarget` / `myTarget` → `mxCurr` / `myCurr` via fixed factor ~0.18).
- One rAF loop, gated — sleeps when the cursor is settled and there's no scroll/resize.
- A list of elevated elements (refreshed via `MutationObserver` so dynamically added modals/dropdowns join in).

Per frame, for each elevated element:
1. Read `getBoundingClientRect()`.
2. Compute distance from cursor to nearest element edge.
3. Smoothstep that distance through `[0, OUTER]` (default `OUTER = 380px`) → `influence` ∈ [0, 1].
4. Compute direction:
   - **Inside** the element (cursor inside its rect, vector magnitude ≤ `halfSize`): linear scale — `dirX = vx / halfSize`, `dirY = vy / halfSize`. Reaches `±1` at half-extent.
   - **Outside**: unit vector from element center toward cursor.
5. Write `--tilt-x = dirX * influence * AMP` and `--tilt-y = dirY * influence * AMP` on the element.

`AMP = 1.0`, `EASE = 0.18`, `OUTER = 380`. All three are tunable constants at the top of the implementation.

Reduced motion: `matchMedia('(prefers-reduced-motion: reduce)')` — bail before subscribing.

No mobile DeviceOrientation. Touch events are skipped (no hover semantics). The model is desktop-first; mobile gets static gravity shadows.

### 5.2 `useBaskTilt()` is a ref-registration hook, not an amplifier

Per milestone-0 decision 3(b), `useBaskTilt()` returns a ref callback that registers the element with the provider's `Set<HTMLElement>`. The provider iterates that set each frame — no DOM querying, no `MutationObserver`. The proximity model already computes per-element response from one global cursor position, so the hook does no per-element math.

```tsx
function Card(props) {
  const tiltRef = useBaskTilt();
  return <div ref={tiltRef} style={{ boxShadow: baskShadow('card') }} {...props} />;
}
```

### 5.3 Press state

Buttons swap their cast shadow to a collapsed variant on `:active`. **No `translateY`, no `scale`** — size stays constant. The transition is fast (80ms). The cast collapse alone is enough perceptual feedback; growing the inset bottom-edge slightly reinforces "pushed in".

Hover similarly does *not* lift the element. It only nudges the cast a little tighter and darker — perceptually the cursor "lights" the card more, not that the card rises.

### 5.4 Per-variant button insets

Buttons expose `--btn-hi` (top-edge inset highlight color) and `--btn-lo` (bottom-edge inset shade). The default white-ish button uses `rgba(255,255,255,0.8)` and `rgba(0,0,0,0.04)`. Colored variants override both because a strong white highlight reads as a hard band on saturated backgrounds. See `.btn-primary` etc. in `components.css` for the tuned values.

### 5.5 Performance budget

- One rAF loop, gated.
- One `getBoundingClientRect` per elevated element per frame (~50 nodes). Reads batched (no interleaved writes that affect layout — custom-property writes don't reflow).
- Two `style.setProperty` writes per element per frame.
- Elements register themselves via `useBaskTilt()` — provider iterates a `Set<HTMLElement>`. No `MutationObserver`, no DOM querying.
- No React state for motion; provider mounts the listener and stays out of the render loop.

---

## 6. Component port

Each shadcn primitive is installed via `npx shadcn add`, then **the visual layer is overridden** — Radix behavior and a11y stay. The `bask-design-system/` folder holds composites that don't have a shadcn analogue.

| shadcn primitive | Bask override                                                                 | In prototype |
|------------------|-------------------------------------------------------------------------------|--------------|
| `Button`         | `--btn-bg` / `--btn-ink` / `--btn-hi` / `--btn-lo` vars; inline shadow with `var(--tilt-x)` cast; shadow-only press feedback (no `translateY`) | ✓ |
| `Card`           | `bg-surface rounded-lg` + inline shadow; optional `.is-hover-lift` for hovered-card elevation | ✓ |
| `Badge`          | Pill with tinted bg, inline shadow at the lowest tier                          | ✓ |
| `Table`          | Wrapped in a card-elevation surface; rows use hairline borders                 | ✓ |
| `Avatar`         | Solid color circle with inner highlight + inner shade + cast                   | ✓ |
| `Checkbox`       | **Inverts** on check — recessed well → elevated colored tile                   | ✓ |
| `RadioGroup`     | Same inversion pattern as checkbox, circular                                   | ✓ |
| `Switch`         | Recessed pill track + raised thumb; thumb's cast follows `--tilt-x` so parallax pulls on it | ✓ |
| `Input`          | Recessed well (`--elev-inset` is static; safe to use the token)                | ✓ |
| `Textarea`       | Same as input, taller                                                          | ✓ |
| `Select`         | Native `<select>` styled to match input + inlined chevron SVG via `background-image` | ✓ |
| `Tooltip`        | Pure-CSS `[data-tooltip]::after` on prototype; in React, use Radix Tooltip with the same dark-pill visual | ✓ |
| `DropdownMenu`   | Prototype uses native `<details>`; React port uses Radix DropdownMenu with the same menu-item styling | ✓ |
| `Dialog`         | Native `<dialog>` on prototype; in React, Radix Dialog with warm-tinted blur backdrop (`rgba(50,38,16,.42)` + `blur(8px) saturate(130%)`) | ✓ |
| `Tabs`           | Two flavors: **pill tabs** (recessed track + elevated active pill) and **underline tabs** | ✓ |
| `NavigationMenu` | Sidebar nav-items: flat by default, elevation bump on `.is-active`              | ✓ |
| `Separator`      | `var(--hairline)` 1px                                                          | ✓ |

Bask-only composites (no shadcn equivalent):
- `<Stat icon label value tint />` — dashboard stat tile with tinted icon-tile background.
- `<Stepper value onChange />` — qty stepper used on product page.
- `<Swatch color active />` — color picker chip with inner highlight.
- `<LockCard />` — "Members only" CTA card from the article mock.
- `<AvatarInitials initials color />` — derives initials + color from a name.
- `<Breadcrumbs />` — chevron-separated path with hover pills on intermediate links.
- `<Choice />` — surface that wraps a radio/checkbox + label; lifts (elev-1 → elev-2) when its input is checked via `:has()`.

---

## 7. Sample pages

All four pages live under the same `<BaskMotionProvider>` mounted in the root layout.

### 7.1 `/dashboard` — Sites
- Header row: title + `IconButton` cluster + primary `Button`.
- `grid-cols-4` of `<Stat>` tiles (tinted icon backgrounds matching the mock).
- Site list as a `<Card>` containing rows with `<AvatarInitials>` and status `<Badge>`.
- Mirrors mock `Screenshot 2026-05-14 095803.png`.

### 7.2 `/customers` — CRM table
- Page header with search `Input` (recessed well) and filter `IconButton`s.
- `<Table>` of customers — `Checkbox` + avatar + name, plan `<Badge>`, status `<Badge>`. Header has a select-all checkbox.
- Bulk-action toolbar (multi-select) — empty/hidden by default.
- Mirrors mock `Screenshot 2026-05-14 143157.png`.

### 7.3 `/article` — Members-only article
- Two-column on desktop, stacked on mobile.
- Article header (eyebrow, h1 in Fraunces, author row), placeholder paragraphs.
- `<LockCard>` mid-content with primary CTA `Button`.
- Mirrors mock `Screenshot 2026-05-14 095941.png`.

### 7.4 `/product` — Product detail
- Image gallery on the left (large `<Card>` with thumbnail row).
- Product info on the right: title, rating `<Badge>`, price block, `<Swatch>` row, `<Stepper>` + orange primary `Button`.
- Mirrors mock `Screenshot 2026-05-14 143252.png`.

---

## 8. Milestones

| # | Milestone                          | Status | Deliverable                                                                            |
|---|------------------------------------|--------|----------------------------------------------------------------------------------------|
| 0 | Prototype                          | **Done** | `prototype/` — gallery covering cards, stats, badges, buttons, table, forms (input/textarea/select/switch/checkbox/radio), overlays (tooltip/dropdown/modal), navigation (sidebar/breadcrumbs/tabs). Motion model finalized (proximity light). Press policy finalized (no translate). |
| 1 | Scaffold app                       | **Done** | Next 16.2.6 / React 19.2.4 / TS / Tailwind v4 / App Router under `app/` at repo root. |
| 2 | Tokens → Tailwind theme            | **Done** | `globals.css` inlines prototype tokens, exposes static ones via `@theme inline`. `baskShadow()` helper in `lib/bask-shadow.ts` with 10-key enum + `focusRing`/`inkRing` modifiers (per milestone-0 decision 1). |
| 3 | Motion provider                    | **Done** | `BaskMotionProvider` in `lib/motion/bask-motion-provider.tsx` with `useBaskTilt()` ref-registration (decision 3b — no `MutationObserver`). Reduced-motion guard. |
| 4 | shadcn install + overrides         | **Done** | shadcn 4.7 (Base UI primitives). All 17 components installed + Bask visual overrides. Shadows in globals.css via `[data-slot]` selectors so hover/active work natively. Reactive elements (Button/Card/Badge/Avatar) register with `useBaskTilt()`. Note: Base UI uses `render` prop instead of `asChild` for trigger composition. |
| 5 | Bask composites                    | **Done** | `Stat`, `Stepper`, `Swatch`, `LockCard`, `AvatarInitials`, `Breadcrumbs`, `Choice`. Emoji replaced with `lucide-react`. Shadows in globals.css via `[data-slot]` selectors. |
| 6 | Sample pages                       |        | Dashboard, customers, article, product. Each verified against its mock.                |
| 7 | Polish                             | **Done** | Focus rings on all interactive elements (button, checkbox, radio, switch, tabs, nav-item, swatch, stepper, select, breadcrumb links). `--ring` token fixed (was shadcn gray, now `0 0 0 3px var(--ring-color)`). Skip-to-main link in layout. `aria-label` on icon-only buttons. Motion provider live-responds to `prefers-reduced-motion` changes. |
| 8 | A11y + perf pass                   | **Done** | BadgeDot aria-hidden; AvatarInitials aria-label={name} + aria-hidden on initials text; Stepper aria-live + richer button labels; customers search aria-label + select-all indeterminate prop; article blurred paywall aria-hidden + `<article>` element; StarRating role="img" + aria-label + aria-hidden on stars; resize listener passive. Build clean, no TS errors. |

Each milestone ends with a screenshot review against `docs/mocks/`.

---

## 9. Open questions

- **Dark mode?** Not in the mocks. Tokens are structured to support a `[data-theme="dark"]` override later; out of scope for v1.
- **Form components beyond the gallery.** The prototype has the core form controls. Things like file upload, combobox, date picker, and multi-step forms haven't been designed yet — they'll need their own pass when a real form lands.
- **Iconography.** Prototype uses emoji as placeholders throughout. Replace with `lucide-react` during milestone 5; pick a single stroke weight that matches the carved aesthetic (likely the default 2px).
- **Asset pipeline.** Product page needs real imagery — placeholder service vs. shipping bundled assets is a v1 call.
- **Mobile motion.** Proximity light is desktop-first; touch devices get static gravity. Acceptable for v1; revisit if mobile usage is a significant share of traffic.
- **Reactive shadow helper.** Tailwind v4 plugins can register utilities at build time, but the inline-shadow rule (Section 4) means a runtime helper (`baskShadow()`) returning a CSS string is the simplest path. Decide whether to also expose a Tailwind `arbitrary` selector for one-off cases.

---

## 10. Acceptance criteria

A milestone is "done" when, side-by-side with the matching mock:
1. Background, surface, ink, and accent colors match within a couple of LCH points.
2. Card corner radii and padding visually match.
3. Shadows read as **soft and directional** — single wide cast with subtle inset top-edge highlight and bottom-edge shade. Not blurry-everywhere; not hard-edged.
4. Buttons give shadow-only press feedback. No translate, no scale, no perceived size change across default / hover / active.
5. Moving the cursor across the page tilts shadows on nearby elevated surfaces and leaves distant ones alone. Pure-page-static (no cursor) reads as a quiet, gravity-only scene.
6. With `prefers-reduced-motion: reduce`, parallax stops and all transitions are disabled.
7. Lighthouse a11y ≥ 95; no contrast failures on text or badges.
8. Inputs/switch tracks/recessed wells read clearly as *inside* the surface; cards/badges/buttons read clearly as *on top of* it. The inversion on check (checkbox/radio/choice → elevated colored) is visible.
