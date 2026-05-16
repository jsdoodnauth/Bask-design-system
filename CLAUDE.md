# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A design-system prototype called **Bask**. The full implementation plan lives in `docs/plan.md`; the design language is documented in `docs/design-system.md`. Plan: prototype the system as plain HTML/CSS/JS, then port to **Next.js 16 + React 19 + Tailwind v4 (`@theme inline`) + shadcn/ui**. The Next.js app is scaffolded (milestones 1–3 complete: tokens, `baskShadow()` helper, `BaskMotionProvider`). The `prototype/` directory remains the visual source of truth for components yet to be ported.

> **Next.js version note**: `create-next-app` installs Next 16, not Next 15 as some older docs may say. Next 16 has breaking changes from training-data Next — read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code.

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

**Aesthetic.** "Carved" — single soft cast + subtle inset top-edge highlight + faint bottom-edge shade. Warm cream is the default tone but the system is multi-tone (see below); modals never use pure black backdrops — each theme sets its own `--modal-backdrop`.

**Typography.** Inter for body/UI, **Fraunces** (variable, serif) for `h1`/`h2`. Display tracking is tight (`-0.02em`).

## Theming

`data-theme="<tone>-<mode>"` on `<html>`. Tones: `warm` (default), `daylight`, `blue`, `indigo`, `amber`, `emerald`. Modes: `light`, `dark`. The default `warm-light` is represented by **absence** of the attribute — `:root` holds it. See `docs/themes-plan.md` for the design rationale.

Structure of `tokens.css`:
1. `:root` — `warm-light` palette + global tokens (radii, type, accents, shadow-primitive defaults, `--elev-*`).
2. `[data-theme$="-dark"]` — universal dark overrides (shadow scales, soft-accent alphas, tints, modal backdrop, tooltip cast). Plus badge text colors via `[data-theme$="-dark"] .badge.is-*`.
3. One block per theme (`[data-theme="warm-dark"]`, `[data-theme="blue-light"]`, etc.) — only the palette deltas for that theme (surfaces, ink, `--cast-rgb` for light variants, `--hi-rgb` for dark variants).
4. `prefers-contrast: more` block — bumps shadow scales + thickens hairline + lifts each theme's `--surface-3` for clearer button/card separation.

**To add a new theme**: write one `[data-theme="<tone>-<mode>"]` block with the palette deltas. Don't touch component CSS — every carved shadow already flows through `--hi-rgb` / `--lo-rgb` / `--cast-rgb` + scales. The same applies if you tweak existing theme values.

**Light-variant gotcha**: no surface tier can be pure `#FFFFFF` — the inset top-edge highlight is white-at-alpha, so it vanishes against pure white. Keep `--surface-3` at most around `#FDFDFC` (or tinted off-white) and leave a visible luminance gap between adjacent tiers. The warm theme's `#FFFDF7` is the canonical reference.

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

## Next.js port (scaffolded — milestones 1–3 complete)

- `app/` — App Router at repo root (no `src/`).
- `app/globals.css` — prototype tokens inlined verbatim, `@property --tilt-x/--tilt-y` kept at **top level** (NOT inside `@layer` — Tailwind v4 will silently break the registrations otherwise). `@theme inline` exposes only static tokens as Tailwind utilities. Body `::before` grain lives here too.
- `app/layout.tsx` — Inter + Fraunces via `next/font/google` (variables `--font-inter` / `--font-fraunces`, consumed by `--font-sans` / `--font-display`). `BaskMotionProvider` wraps `{children}`.
- `lib/bask-shadow.ts` — 10-key enum (`card`, `card-hover`, `badge`, `avatar`, `swatch`, `btn`, `btn-hover`, `btn-pressed`, `switch-thumb`, `tooltip`) + `focusRing` / `inkRing` modifier flags. Returns a CSS string with `var(--tilt-x)` / `var(--tilt-y)` referenced directly.
- `lib/motion/bask-motion-provider.tsx` — Client island. Elements register via `useBaskTilt()` ref-callback (NOT class-name + `MutationObserver`). Provider iterates a `Set<HTMLElement>`. Tunables `AMP=1.0`, `OUTER=380`, `EASE=0.18` match the prototype 1:1.

Constraints to remember:
- The inline-shadow rule still applies in React: reactive shadows must reference `var(--tilt-x)` / `var(--tilt-y)` directly, never indirectly through `--elev-*`. Use `baskShadow()` — either via inline `style={{ boxShadow }}` or (per milestone-0 decision 8) a `cva` recipe that emits a class whose CSS rule contains the same shadow string. Both work; both depend on the `@property` registration.
- Press policy: no `translateY` on `:active`. Shadow-only feedback.
- Hover under inline style: components own both shadow strings and swap via a CSS-module `&:hover { box-shadow: … }` rule (decision 2). Not React state.
- **CSS variable cascade rule**: CSS custom properties that need to be overridden by Tailwind utility classes (e.g. `[--btn-hi:rgba(...)]` on colored button variants) must be declared inside `@layer components` in `globals.css`. Unlayered CSS beats `@layer utilities`, so an unlayered `[data-slot="button"] { --btn-hi: ... }` will silently ignore all per-variant utility overrides. Keep `box-shadow` rules themselves unlayered — only the overridable variable defaults go in the layer.

Open decisions and design rationale captured in `docs/milestone-0.md`. The `motion-framer` skill is installed for richer React-side motion (page transitions, list reorders) if/when those are needed.
