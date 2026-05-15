# Milestone 0 — Open issues before the Next.js port

Things to resolve (or consciously defer) before scaffolding `app/`. Most of these bake into the `baskShadow()` helper, component API, or motion-provider contract, so they're cheap to decide now and painful to retrofit. We'll work through them one at a time.

---

## 1. Catalog every distinct shadow before deciding `baskShadow()` API

The plan implies a small enum (`baskShadow('e2')`), but the prototype actually has many tuned-per-component shadows that *look* like `e2` but use different offsets, blur, spread, or alpha:

- `.card` default
- `.card.is-hover-lift:hover` (heavier cast, brighter top inset)
- `.stat` (same as card default, duplicated)
- `.stat:hover` (same as card hover, duplicated)
- `.btn` default
- `.btn:hover` (slightly larger cast)
- `.btn:active` / `.is-pressed` (collapsed cast, dimmer inset)
- `.btn:focus-visible` (default cast + ring)
- `.icon-btn` default / hover / active / focus-visible (mirrors `.btn` but its own copy)
- `.badge` (smaller cast, lighter alpha)
- `.avatar` (darker inset shade `rgba(0,0,0,0.18)`, stronger cast `0.30`)
- `.swatch` (strong inset top, dark inset bottom, dark cast)
- `.swatch.is-active` (adds a 2px ink ring on top of the swatch shadow)
- `.lockcard` (same as card default, duplicated)
- `.user-pill:hover` (same as `.badge`, duplicated)
- `.switch-thumb` (small cast, no `(0.55 - …)` gravity term — uses a smaller multiplier)
- `[data-tooltip]::after` cast (no inset highlights, dark color)

**Decision needed.** Three options:

- **(a) Rich enum:** `baskShadow('card' | 'card-hover' | 'btn' | 'btn-hover' | 'btn-pressed' | 'btn-focus' | 'badge' | 'avatar' | 'swatch' | 'swatch-active' | 'switch-thumb' | 'tooltip' | …)`. Easy to read at the call site; the helper is one big switch.
- **(b) Parameterized builder:** `baskShadow({ tier: 2, hi, lo, cast: { x: 8, y: 14, blur: 12, alpha: 0.2 } })`. Flexible but verbose and easy to drift from canonical values.
- **(c) Hybrid:** small enum for the canonical tiers + an `override` arg for the per-component tunings.

Also: are the duplicates (`.stat` ≡ `.card`, `.lockcard` ≡ `.card`, `.user-pill:hover` ≡ `.badge`) intentional, or did they drift? If intentional → keep separate enum keys. If accidental → consolidate now.

---

## 2. Hover variants under inline `style={{ boxShadow }}`

In CSS, `.card.is-hover-lift:hover` swaps to a heavier cast. In React with inline `style`, `:hover` can't reach into the inline shadow string — you'd need a className that overrides it, or JS to swap the value.

Affected: `.card.is-hover-lift:hover`, `.stat:hover`, `.btn:hover`, `.icon-btn:hover`, `.user-pill:hover`.

**Options:**

- **(a)** Keep `:hover` declarations as a *class-based* extra rule that re-inlines a different shadow (still inline, but applied via `&:hover { box-shadow: … }` in a CSS module / global). The component owns both strings and writes the hover one via CSS, not React state.
- **(b)** Have the motion provider track which element is hovered and feed a `--hover` factor; components blend it in their inline shadow. Pure JS, no CSS hover.
- **(c)** Use Tailwind's `hover:` variants pointing at static utilities, accept that hover doesn't get parallax during hover (cast becomes static).

(a) is the smallest behavior change vs. the prototype. Worth confirming before writing any component.

---

## 3. Motion provider: how do elements opt in?

Prototype hard-codes `'.card, .stat, .btn, .icon-btn, .badge, .lockcard, .user-pill'` in the rAF loop and refreshes with a `MutationObserver` on `document.body`.

In React this is fragile: any component without the magic className silently doesn't tilt, and the body-wide observer fires on every list re-render.

**Decision needed.** Pick one:

- **(a) `data-bask-tilt` attribute** — opt-in via attribute, provider still queries the DOM but on a stable selector. Minimal change.
- **(b) Ref registration via context** — `useBaskTiltRegistration(ref)` inside reactive components; provider keeps a `Set<HTMLElement>`. No DOM querying, no observer. More boilerplate per component.
- **(c) Keep classNames as the contract** — `.bask-tilt` utility, applied by component CSS. Compromise between (a) and the prototype.

(b) is cleanest for React; (a) is the smallest port.

---

## 4. `MutationObserver` cost in a real app

`subtree: true` on `document.body` re-runs `collectElements` on every list re-render, route transition, and shadcn portal mount. Cheap in the static gallery, potentially measurable in production.

Tied to issue 3 — solving 3(b) eliminates this. If we stay on a selector-based model, switch the observer to throttled or scope it tighter.

---

## 5. Focus ring composition

`.btn:focus-visible` re-declares the *entire* shadow including the parallax cast so focus doesn't kill the tilt. In React the helper needs to compose: `baskShadow('btn') + ', ' + ringShadow`. Easy to forget. A focused button that goes flat is the symptom.

**Decision needed.** Either:

- Bake focus-ring composition into `baskShadow()` (e.g. `baskShadow('btn', { focus: true })`), or
- Always-on helper at the component layer (`focusable(baskShadow('btn'))`).

Same problem for `.input:focus`, `.checkbox input:focus-visible ~ .checkbox-box`, `.switch input:focus-visible ~ .switch-track` — though those use static `--elev-inset`, so simpler.

---

## 6. `@property` placement under Tailwind v4

`@property --tilt-x` / `--tilt-y` must be at top-level (not inside `@layer base`). Tailwind v4's `@import "tailwindcss"` orders layers, and pasting tokens.css inside `@layer base { … }` will quietly break the registrations — the cast invalidation bug returns and nobody knows why.

**Action:** when pasting `tokens.css` into `globals.css`, keep `@property` declarations *outside* any `@layer`. Document it inline in `globals.css`.

---

## 7. Native `<details>` / `<dialog>` → Radix port

Prototype uses native primitives with custom JS for outside-click, escape, backdrop. Radix DropdownMenu and Dialog have their own portal/focus-trap/escape behavior — good, but the visual contract must be replicated:

- **Dropdown menu:** floating panel at `--elev-3`, 6px padding, `min-width: 200px`, animated open with `transform: translateY(-6px) scale(.98)` → identity. Radix's `data-state="open"` animations need to match.
- **Modal backdrop:** `rgba(50, 38, 16, 0.42)` + `backdrop-filter: blur(8px) saturate(130%)`. Radix's `<Dialog.Overlay>` accepts a className — confirm the blur survives the portal layer.
- **Tooltip:** prototype uses dark pill (`var(--ink)` bg, light text) with an arrow `::before`. Radix Tooltip's `<Arrow>` component needs equivalent styling.
- **Dropdown direction:** `.dropdown-up` (sidebar user-pill) opens upward. Radix handles this via `side="top"` — just make sure the animation origin flips with it.

---

## 8. Reactive shadow on shadcn primitives

shadcn components ship with their own `className` defaults and use `cva`/`tv` patterns. Overriding the shadow means either:

- Passing `style={{ boxShadow }}` on every render (works, but every consumer of `<Button>` could accidentally override it via `style` prop)
- A custom `cva` recipe that emits a `class` whose CSS rule contains the inline-shadow declaration

The second is cleaner but means the shadow lives in CSS — and per issue 6, we know that path requires the parallax vars to be referenced *directly* in the rule (not through `--elev-*`). Worth a tiny spike to confirm Tailwind v4 + a CSS module rule with `var(--tilt-x)` in `box-shadow` still invalidates correctly. The `@property` registration should make it work; verify.

---

## 9. Missing primitives the four target pages will need

Not in the prototype but implied by the mocks:

- **Combobox / search-with-filter** for the customers page header
- **Image gallery / thumbnail row** for the product page
- **Toast / notification surface** (the `🔔` icon-button implies one)
- **Bulk-action toolbar** for multi-select on the customers table
- **Pagination** for the customers table (5 rows now; real data needs paging)
- **Empty states** — no zero-data treatment exists yet
- **Skeleton/loading state** beyond the `.line` placeholder used inside the lockcard

**Decision needed.** Which of these are in scope for v1 vs. deferred? The plan says "form components beyond the gallery" are deferred, but doesn't address these.

---

## 10. Press feedback policy: how is `is-pressed` triggered in React?

CSS `:active` is the prototype trigger. For keyboard activation (`Space`/`Enter` on a button), `:active` fires in most browsers but not consistently. Radix's `Button` doesn't manage this. If we want consistent press feedback on keyboard, we need a small `data-pressed` state managed in JS.

**Decision needed.** Accept CSS-only `:active` (mouse-only feedback) or add a keyboard pressed-state controller? The plan says "Buttons do not use translateY for press" — but doesn't address keyboard parity.

---

## 11. Tinted icon backgrounds vs. shadcn variant API

`.stat-icon.is-blue/green/amber/red/violet/orange` carries a tint background. shadcn convention is variants via `cva`. Straightforward to map, but: are these tints actually distinct from the badge tints (`--blue-soft` vs `--tint-blue` — and they *are* different values in `tokens.css`)? If the "soft" / "tint" naming is doing two jobs, document the split before wiring `cva`.

Spot-check from `tokens.css`:
- `--blue-soft: #DCE2FF` (badge bg) vs `--tint-blue: #E6EEFA` (icon-tile bg) — different.

**Action:** confirm intent. If two scales are real, they need separate `cva` variants and clear naming.

---

## 12. `is-hover-lift` semantics

Three cards in the gallery use `.is-hover-lift`; others don't. The rule isn't documented — when does a card opt in?

**Decision needed.** Either:

- Make hover-lift the default for clickable cards (`<Card asChild><a>…</a></Card>` gets it automatically), or
- Keep it explicit via a `hoverable` / `interactive` prop on `<Card>`.

---

## 13. Body background grain is a `body::before` fixed pseudo-element

Two large radial gradients painted on `body::before` with `position: fixed`. In Next.js this needs to live in `globals.css` and survive route transitions. Trivial, but worth noting because it affects perceived shadow quality (the plan acceptance criteria #3 mentions "soft and directional" — the grain is what makes them read that way).

---

## 14. Reduced-motion: transitions are killed globally

`@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }` is broad. In React with shadcn, some Radix animations (dialog enter, dropdown enter) come through `data-state` + CSS transitions and the `* { transition: none }` will kill them too. Acceptable? Or do we want a more surgical kill that only nukes parallax and decorative motion, keeping enter/exit transitions?

**Decision needed.** Probably acceptable for v1 — reduced-motion users typically *want* enter/exit transitions disabled too. Worth confirming.

---

## 15. Tab system: panel visibility via `hidden` attribute

Prototype uses `data-panel` + `hidden`. Radix Tabs uses `data-state="active"`. The pill-tab visual (recessed track + elevated active pill) and the underline-tab visual both need to work as Radix overrides — confirm the active-tab elevation bump survives the `cva` translation.

---

## 16. `:has()` browser support

`.choice:has(input:checked)` is the only `:has()` use in the prototype. Safari 15 and below don't support it. If we care about those, the choice-row state needs `data-checked` driven by React. If we don't, document the floor.

**Decision needed.** What's the browser-support floor? `:has()` is in all modern evergreens but the FF version is recent (FF 121, Dec 2023).

---

## Working order suggestion

1. Issue 1 (shadow catalog + helper API) — informs 2, 5, 8
2. Issue 3 (motion opt-in mechanism) — informs 4
3. Issue 2 (hover handling) — depends on 1
4. Issue 5 (focus composition) — depends on 1
5. Issue 8 (shadcn integration mechanics) — small spike
6. Issue 6 (`@property` placement) — verify, document
7. Issues 7, 14, 15 (Radix port specifics) — together
8. Issue 9 (missing primitives) — scope decision
9. Issues 10, 11, 12, 13, 16 — quick decisions

---

## Decisions (2026-05-15)

The shadow catalog audit found that the "many tuned-per-component shadows" reduce to **10 distinct reactive signatures** — the rest are byte-for-byte duplicates from copy-paste (no helper existed). Consolidated keys:

| Key | Used by |
|---|---|
| `card` | `.card`, `.stat`, `.lockcard` |
| `card-hover` | `.card.is-hover-lift:hover`, `.stat:hover` |
| `badge` | `.badge`, `.user-pill:hover` |
| `avatar` | `.avatar` (hardcoded white/black α insets) |
| `btn` | `.btn`, `.icon-btn` (default + focus base) |
| `btn-hover` | `.btn:hover`, `.icon-btn:hover` |
| `btn-pressed` | `.btn:active`, `.icon-btn:active` |
| `swatch` | `.swatch` (hardcoded insets) |
| `switch-thumb` | `.switch-thumb` (no spread) |
| `tooltip` | `[data-tooltip]::after` (cast-only, no insets) |

**1. `baskShadow()` API** — Option (a) rich enum, with two composition flags:
```ts
type ShadowKey = 'card' | 'card-hover' | 'badge' | 'avatar' | 'swatch'
              | 'btn' | 'btn-hover' | 'btn-pressed'
              | 'switch-thumb' | 'tooltip';
baskShadow(key: ShadowKey, opts?: { focusRing?: boolean; inkRing?: boolean }): string
```
`focusRing: true` appends `var(--ring)`; `inkRing: true` prepends `0 0 0 2px var(--ink)` (only `swatch.is-active` uses this). `avatar` and `swatch` are kept split — structurally similar but cast geometry differs enough that merging hurts readability.

**2. Hover handling** — Option (a): component owns both shadow strings; hover swap happens via a CSS-module `&:hover { box-shadow: … }` rule that re-inlines `baskShadow('card-hover')`. No React hover state needed.

**3. Motion provider opt-in** — Option (b): ref registration via context. `useBaskTilt(ref)` inside reactive components; provider keeps a `Set<HTMLElement>`. No DOM querying, no `MutationObserver`.

**4. `MutationObserver` cost** — Resolved by 3(b). No observer needed.

**5. Focus ring composition** — Baked into `baskShadow()` via `focusRing` option (see issue 1). Single API, can't forget. Same modifier handles `inkRing` for swatch.

**6. `@property` placement** — When porting `tokens.css` into `globals.css`, keep `@property --tilt-x` / `@property --tilt-y` declarations **outside** any `@layer` block. Tailwind v4's layer ordering will silently break the registrations otherwise. Add an inline `/* DO NOT MOVE INTO @layer */` comment in `globals.css` at the registrations.

**7. Radix port visual contract** — Replicate per the issue:
- DropdownMenu: panel at `--elev-3`, 6px padding, `min-width: 200px`, open animation `translateY(-6px) scale(.98)` → identity, keyed off `data-state="open"`.
- Dialog: overlay `rgba(50,38,16,0.42)` + `backdrop-filter: blur(8px) saturate(130%)` — confirm blur survives the portal layer during the milestone-1 spike.
- Tooltip: dark pill (`var(--ink)` bg, light text), `<Tooltip.Arrow>` styled to match prototype's `::before`.
- Sidebar user-pill: `side="top"` for upward open; animation origin flips with it.

**8. shadcn shadow integration** — `cva` recipe path: emit a `class` whose CSS rule contains the parallax-bearing `box-shadow` directly (referencing `var(--tilt-x)` in the rule, not via `--elev-*`). Avoids the inline-`style` override footgun. Verify in a milestone-1 spike that Tailwind v4 + CSS-module rule with `var(--tilt-x)` invalidates correctly — the `@property` registration is what makes this work.

**9. Missing primitives — in scope for v1:**
- Combobox / search-with-filter (customers page header)
- Toast / notification surface (for the `🔔` icon-button)
- Bulk-action toolbar (multi-select on customers table)
- Pagination (customers table)
- Empty states (zero-data treatment)
- Skeleton / loading state (beyond the `.line` placeholder)

Deferred: image gallery / thumbnail row (product page can ship with a static lead image first).

**10. Press feedback** — Keep CSS `:active` only. Mouse-only press feedback is acceptable; no JS-managed `data-pressed` state.

**11. Tinted icon backgrounds vs. badges** — Intent is genuinely different. `--*-soft` (badge bg) and `--tint-*` (icon-tile bg) become two separate `cva` variant scales with distinct names. Document the split.

**12. `is-hover-lift` semantics** — Make hover-lift the **default for clickable cards**. `<Card>` with an `onClick` / `asChild` to `<a>` / `<button>` gets `card-hover` automatically. Non-interactive cards stay at `card`.

**13. Body background grain** — Place the `body::before` fixed pseudo-element in `globals.css`. It survives route transitions automatically since `globals.css` is loaded once at the root layout. No further action needed.

**14. Reduced-motion** — Keep the global `* { transition: none !important }` kill for v1. Acceptable that Radix enter/exit transitions are also killed — reduced-motion users typically want this.

**15. Tab system under Radix** — Confirmed compatible. `.tab.is-active` uses static `var(--elev-1)` (no parallax), so the cva translation is mechanical: swap `.is-active` → `[data-state="active"]` selector. Recessed track (`var(--elev-inset)`) is also static. No reactive-shadow concerns.

**16. `:has()` browser support** — Modern evergreens only. No fallback needed. Document the floor as Safari 15.4+, Firefox 121+, Chrome/Edge 105+.
