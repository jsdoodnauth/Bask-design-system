# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A design-system prototype called **Bask**. The full implementation plan lives in `docs/plan.md`; the design language is documented in `docs/design-system.md`. Plan: prototype the system as plain HTML/CSS/JS, then port to **Next.js 15 + Tailwind v4 (`@theme inline`) + shadcn/ui**. The Next.js app does not exist yet — everything in `prototype/` is the visual source of truth that will be ported.

Note: the repo directory is still named `clay-system/` (filesystem rename not done yet) but the design system itself is **Bask**. References to the directory name will be updated when the repo is renamed.

## Running the prototype

No build step. Open `prototype/index.html` directly in a browser. Hard-reload (Ctrl+F5) after CSS/JS edits.

Reference mocks live in `docs/mocks/` (PNG screenshots). The loose `index.html.html` at repo root is an older claymorphism reference — not part of the system.

## Visual model (read before touching `tokens.css` or `components.css`)

**Inside / outside grammar.** Every surface lives at a known tier:
- Recessed (inputs, well-style controls, switch tracks) → `--elev-inset`
- Flat (flush with parent card)
- Raised one tier (cards, badges, buttons) → was `--elev-2`, now inlined
- Floating two tiers (overlays, hovered cards) → was `--elev-3`, now inlined

Checkboxes/radios/`.choice` invert when active — recessed → elevated. That inversion is the system's main interaction language.

**Aesthetic.** "Carved" — single soft cast + subtle inset top-edge highlight + faint bottom-edge shade. Warm cream palette (no black backdrops; the modal uses a brown-tinted blur).

**Typography.** Inter for body/UI, **Fraunces** (variable, serif) for `h1`/`h2`. Display tracking is tight (`-0.02em`).

## Motion model: **proximity-light parallax** (the critical, non-obvious part)

`prototype/index.html`'s inline script implements it. The cursor is a light source with a 380px falloff radius. Each elevated element measures its own distance to the cursor and writes `--tilt-x` / `--tilt-y` on **itself**, scaled by an influence factor. Cards near the cursor tilt their cast shadow strongly; cards across the page stay quiet at gravity. Cursor coords are eased frame-to-frame; the rAF loop sleeps when nothing's moving.

Tunables at the top of the script: `SELECTOR`, `AMP`, `OUTER`, `EASE`.

### Critical CSS gotcha — DO NOT use `--elev-*` tokens on reactive elements

There are `--elev-1/2/3/pressed` tokens defined in `tokens.css`, but **browsers do not reliably invalidate `box-shadow` when a nested `var(--tilt-x)` inside `--elev-*` changes**. The dependency chain `box-shadow → --elev-2 → --tilt-x` does not trigger paint; the chain `box-shadow → --tilt-x` does.

Rule:
- **Reactive elements** (anything in the script's `SELECTOR` — currently `.card, .stat, .btn, .icon-btn, .badge, .lockcard, .user-pill`) must have the shadow **inlined** directly in their class declaration, referencing `var(--tilt-x)` and `var(--tilt-y)` directly. Look at `.card`, `.stat`, `.btn` etc. for the canonical form.
- **Static elements** (inputs, recessed wells, sidebar, modal, dropdown-menu, etc.) may keep `box-shadow: var(--elev-*)`. They won't parallax, which is intended.

`--tilt-x` and `--tilt-y` are registered via `@property` in `tokens.css`. Don't remove those — they help invalidation.

The shadow formula for the inlined version always follows this shape:

```
inset 0 Npx 0 var(--btn-hi),                  /* top-edge highlight  */
inset 0 -Npx 0 var(--btn-lo),                 /* bottom-edge shade   */
calc(var(--tilt-x) * -Xpx)                    /* cast x = cursor-aware */
  calc(Ypx + (0.55 - var(--tilt-y)) * Zpx)   /* cast y = gravity 0.55 + cursor */
  Bpx Spx rgba(60,40,10,A);                  /* blur, spread, color */
```

The `0.55` is the gravity bias — keeps a default cast even when `--tilt-y = 0`.

### Buttons: per-variant inset colors

`.btn` exposes `--btn-hi` / `--btn-lo` (CSS vars for the inset highlight / shade colors). Colored variants (`.btn-primary`, `.btn-success`, etc.) override these because a strong white highlight reads as a hard band on saturated backgrounds. Tune those vars, not the inset values themselves.

### Press feedback policy

Buttons do **not** use `translateY` for press. Size stays constant across all states; feedback is shadow-only (cast collapses to a tight 4–6px). The user verified this is the desired behavior.

## File map (only the non-obvious bits)

- `prototype/tokens.css` — palette, radii, type, `@property` registrations, `--elev-*` tokens (for static use only), motion durations.
- `prototype/components.css` — all components. Reactive ones inline their shadow; static ones use `--elev-*`.
- `prototype/index.html` — the gallery + inline JS for proximity-light parallax, tab switching, dropdown outside-click close, modal open/close.
- `docs/plan.md` — eight-milestone roadmap from prototype → Next.js port. Updates here when decisions change.
- `docs/mocks/` — original PNG references for the four target pages (dashboard, customers table, article/paywall, product).

## When porting to Next.js (planned, not yet started)

Per `docs/plan.md`: `app/` directory at repo root, Next.js 15 + TS + Tailwind v4 `@theme inline` (CSS-first, no `tailwind.config.ts`). The plan reflects the current decisions — read it before scaffolding.

Key constraints that carry into the React port:
- The inline-shadow rule applies: reactive shadows can't be Tailwind utilities pointing at `--elev-*`. Use a `baskShadow()` helper that returns a string with `var(--tilt-x)` / `var(--tilt-y)` in the cast offsets, applied via inline `style`.
- `BaskMotionProvider` is the only client island. There is no `useBaskTilt()` hook — the proximity model handles per-element response from one global cursor; components just need to be in the provider's SELECTOR.
- Press policy: no `translateY` on `:active`. Shadow-only feedback.

`motion-framer` skill is installed for richer React-side motion (page transitions, list reorders) if/when those are needed.
