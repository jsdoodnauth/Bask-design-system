# Plan — Multi-tone theming for Bask

## Context

The Bask prototype currently has two themes (`dusk` warm cream, `night` warm dark) toggled by a 🌙 icon-button in the header. The user wants to expand this into a **two-axis system**: 6 tones × 2 modes = **12 themes**.

- **Tones**: Warm (existing), Daylight (neutral, near-white), Blue, Indigo, Amber, Emerald
- **Modes**: Light, Dark
- **Picker**: A dropdown to the left of `New site` selects the tone; the existing 🌙 toggle continues to flip light↔dark within the selected tone.

This is a natural extension of the existing system since the shadow primitives (`--hi-rgb`/`--lo-rgb`/`--cast-rgb` + scales) and soft-accent overrides (`--*-soft`, badge text in night mode) were already designed to be themed in one block per theme. Each new theme is one CSS block plus a row in the dropdown.

## Architecture

**Attribute model**: composite `data-theme="<tone>-<mode>"` (e.g. `warm-light`, `blue-dark`, `emerald-light`). The existing `[data-theme="night"]` block is renamed to `[data-theme="warm-dark"]`; the implicit default (`:root`) is `warm-light` (no attribute needed).

Why composite over `data-tone` + `data-mode` two attributes: each theme block becomes self-contained — no cascade dependencies between tone overrides and mode overrides. The one universal "all dark themes" override (shadow scales, badge text colors) uses the attribute-ends-with selector `[data-theme$="-dark"]`. Cleaner to reason about and matches the existing pattern.

**State**: two `localStorage` keys — `bask-tone` (`warm` | `daylight` | `blue` | `indigo` | `amber` | `emerald`) and `bask-mode` (`light` | `dark`). The pre-paint init script in `<head>` reads both and sets `data-theme` before first paint, so no flash on load.

## Execution order

1. **First step**: save a copy of this plan to `docs/themes-plan.md` (alongside the existing `docs/plan.md` and `docs/design-system.md`) so the design intent is checked into the repo before code lands.
2. Then proceed with the changes below.

## Files to change

### `prototype/tokens.css`

1. **Refactor universal dark overrides** out of `[data-theme="night"]` into `[data-theme$="-dark"]`:
   - Shadow scales (`--hi-scale`, `--lo-scale`, `--cast-scale`)
   - Tint alphas
   - Soft-accent alphas (`--*-soft`)
   - Grain tokens
   - `--tooltip-cast`, `--modal-backdrop`
   - Badge text color overrides (already in `[data-theme="night"] .badge.is-*` selectors → move to `[data-theme$="-dark"] .badge.is-*`)

   These are mode-driven, not tone-driven, so they belong in the suffix selector.

2. **Per-tone palette blocks** — each block declares only the palette deltas (surfaces, ink, hairline, accent hue rgb triplets where it makes sense):
   - `[data-theme="warm-dark"]` — existing night palette (renamed from `[data-theme="night"]`)
   - `[data-theme="daylight-light"]` — near-white neutrals (#FFFFFF surface, neutral gray ink, neutral cast)
   - `[data-theme="daylight-dark"]` — neutral charcoal
   - `[data-theme="blue-light"]` — pale blue-tinted surfaces, navy ink, navy cast
   - `[data-theme="blue-dark"]` — deep navy surfaces, cool-cream highlights
   - `[data-theme="indigo-light"]` — pale lavender surfaces, deep indigo cast
   - `[data-theme="indigo-dark"]` — deep indigo surfaces
   - `[data-theme="amber-light"]` — golden honey (more saturated than dusk's cream)
   - `[data-theme="amber-dark"]` — deep walnut amber
   - `[data-theme="emerald-light"]` — pale mint/sage surfaces, forest cast
   - `[data-theme="emerald-dark"]` — deep forest greens

   Each light variant only needs to override: `--bg`, `--bg-deep`, `--surface`, `--surface-2`, `--surface-3`, `--ink`, `--ink-2`, `--ink-3`, `--hairline`, `--cast-rgb` (the tone's dark color), and `--grain-bottom`.
   Each dark variant additionally overrides: `--hi-rgb` (tone-tinted near-white), tint alphas with tone-appropriate hues, soft-accent alphas. Shadow scales inherit from `[data-theme$="-dark"]`.

3. **`prefers-contrast: more` block** — extend the existing media query to cover every theme. Currently scoped to `:root` and `[data-theme="night"]`. Restructure to:
   - `:root` overrides apply to all light themes (scales, surface-3, ink-3, hairline, ring-color)
   - `[data-theme$="-dark"]` overrides for all dark themes
   - Per-tone fine-tuning only if a specific tone needs it; default to the generic boosts otherwise

### `prototype/components.css`

1. **`.theme-swatch`** — new small circle component (≈14px) showing the surface tone color of a theme. Used inside the tone dropdown trigger and menu items. CSS:
   ```css
   .theme-swatch {
     width: 14px; height: 14px; border-radius: 50%;
     display: inline-block; flex-shrink: 0;
     box-shadow: inset 0 0 0 1px var(--hairline);
   }
   .theme-swatch[data-tone="warm"]     { background: #FBF6EB; }
   .theme-swatch[data-tone="daylight"] { background: #FFFFFF; }
   .theme-swatch[data-tone="blue"]     { background: #DDE7F4; }
   .theme-swatch[data-tone="indigo"]   { background: #E1DCF3; }
   .theme-swatch[data-tone="amber"]    { background: #FBE6BE; }
   .theme-swatch[data-tone="emerald"]  { background: #D4ECDB; }
   ```
   Note: swatch backgrounds are hardcoded (theme-independent) — they always show that tone's *light* surface, so users see the underlying hue regardless of current mode.

2. **`.menu-item.is-active`** — small visual state for the currently selected tone in the menu. A check icon, or a subtle inset shadow. Probably reuse the existing menu-item styling and add a checkmark span shown via `[data-active]`.

### `prototype/index.html`

1. **Pre-paint script in `<head>`** — replace the existing one. Reads `bask-tone` + `bask-mode`, sets `data-theme` accordingly.

2. **Header markup** — left of `<button class="btn btn-primary">New site</button>`:
   - New `<details class="dropdown">` with summary using `.btn` and a swatch + tone name + chevron
   - Existing `🌙` icon-btn stays — its label/tooltip becomes "Switch to dark/light" based on current mode
   - Wraps tightly: dropdown, then icon-btn, then `New site`

3. **JS** — replace existing theme-toggle IIFE with one that handles both controls:
   - Reads current state from `data-theme` attribute (split on `-`)
   - Dropdown menu-item click: set tone, recompute `data-theme`, sync UI (update trigger swatch + label, mark active item)
   - Icon-btn click: flip mode, recompute `data-theme`, sync UI (swap 🌙/☀ icon and tooltip)
   - Both write to localStorage on every change
   - Reuses the existing dropdown outside-click and ESC behavior — no new event listeners

4. **Theme radio group in the Forms section** — currently shows Dusk / Night / System. Update to reflect the new system, OR remove (the in-header picker is now the canonical UX). Recommendation: replace with a radio group that mirrors the in-header picker (tone radios), wired to the same JS — gives users a second discoverable surface. Keep "System" radio as a stretch (auto-follow `prefers-color-scheme`) or drop it.

### `CLAUDE.md`

Update the theming references — currently CLAUDE.md doesn't mention themes (it pre-dates the dusk/night work), but the section on the visual model talks about "warm cream palette". Add a short subsection under "Visual model" noting:
- Theme attribute model (`data-theme="<tone>-<mode>"`)
- Where palette tokens live (`:root` for default, per-theme blocks below)
- That shadow primitives are theme-driven via `--hi-rgb`/`--lo-rgb`/`--cast-rgb` + scales, so new themes only override palette tokens, never component CSS

## Reusing existing patterns

- `data-theme` attribute model is established — extending the value space, not adding a new mechanism.
- Pre-paint init script pattern in `<head>` already exists — modify the script body.
- `.dropdown` (native `<details>` + `<summary>`) + `.dropdown-menu` + `.menu-item` exist and handle outside-click close, ESC close, click-item close — the tone picker uses these directly with no new component CSS for the dropdown shell itself.
- Soft-accent override pattern (`--*-soft` alpha values) and badge text overrides already exist for night — move them to `[data-theme$="-dark"]` so they apply to every dark theme automatically.
- `prefers-contrast: more` media query exists and is structured around theme blocks — extend the pattern.

## Palette design notes (not final values — tune in the prototype)

**Critical rule for every light variant**: no surface tier may be pure `#FFFFFF` (or close enough that the inset top-edge highlight — which is white-at-alpha — blends into the surface and vanishes). The carved rim depends on the highlight being visibly *brighter* than the surface beneath it. Keep `--surface-3` (the highest tier, used for buttons) at most around `#FDFDFC` or lighter-tinted-but-not-pure-white, and `--surface` distinctly below that. The page `--bg` sits below `--surface` so the card cast has somewhere to land. Concretely: aim for ~5–10% luminance gap between adjacent tiers in every light theme, including daylight.

For **daylight** specifically: use very-subtly-warm or neutral off-whites, not pure white. Suggested starting values:
- `--bg`: `#EFEFEC` (clearly off-white page)
- `--bg-deep`: `#E2E2DE`
- `--surface`: `#F8F8F6`
- `--surface-2`: `#F2F2EF`
- `--surface-3`: `#FCFCFB` (button face — below pure white so the white inset highlight reads)

Apply the same principle to **blue-light**, **indigo-light**, **amber-light**, **emerald-light**: their lightest tier (`--surface-3`) is a near-white tinted in the tone's direction, never pure white. The warm theme already follows this rule (`--surface-3: #FFFDF7`) — match its luminance gap.

For each tone, the **light** variant follows the warm pattern: light surface tier, slightly lighter `--surface-3` for buttons, dark cast in the tone's dark color. The **dark** variant follows night's pattern: dark surface tier, very low-alpha tone-tinted highlight, pure-black cast.

Approximate cast RGBs per tone (drives the carve color):
- Warm: `60 40 10` (existing)
- Daylight: `30 30 28` (neutral)
- Blue: `20 40 80`
- Indigo: `45 25 110`
- Amber: `80 55 10`
- Emerald: `10 50 25`

For dark variants, cast becomes `0 0 0` universally (a colored cast disappears into a dark page) and the *highlight* picks up the tone:
- Warm dark: `255 240 210` (existing)
- Daylight dark: `255 255 250`
- Blue dark: `220 230 250`
- Indigo dark: `230 220 255`
- Amber dark: `255 235 190`
- Emerald dark: `220 245 230`

## Verification

1. **Visual sweep** — open `prototype/index.html`, cycle through all 12 themes via the dropdown + toggle. For each:
   - Cards, buttons, badges, inputs, switches all render with carved depth
   - Soft-accent badges in dark variants show alpha-tinted bgs (not opaque pastels)
   - Badge text colors read on every dark variant
   - The 🌙 toggle icon and tooltip update correctly when switching tone
   - Theme persists on hard reload (no flash, no reversion)
2. **High-contrast** — DevTools → Rendering → emulate `prefers-contrast: more`. Outline borders appear on every flat surface and control across every theme; no theme regresses.
3. **Reduced motion** — emulate `prefers-reduced-motion: reduce`. Cursor parallax stays at gravity; theme switching still works.
4. **Cross-theme parallax** — move cursor across cards in several themes. The carved shadow tilts correctly (no theme breaks the proximity-light model).
5. **Form Theme radio** (if kept/updated) — clicking a tone radio in the Forms section updates the in-header picker too, and vice versa.

## Open considerations (flag before implementing)

- **Naming retirement of "Dusk" / "Night"**: under the new model, these become `warm-light` / `warm-dark`. Their evocative names disappear from the UI in favor of "Warm" + light/dark. If you want to keep the names, the dropdown trigger could show "Dusk" / "Night" specifically when tone=warm, or we keep "Warm" as the tone label everywhere. Default to the latter for consistency.
- **System theme option**: currently the Theme radio group has a "System" choice that doesn't function. If you want it to work (follow OS `prefers-color-scheme` for mode while letting users pick tone), it's a small JS addition — listen for the media query, override only the mode axis. Easy to add but defer unless requested.
- **Accent saturation per tone**: the accent palette (`--blue`, `--green`, etc.) currently stays the same across all themes. In some tones (e.g. blue-light), `--blue: #3C5BFF` as a button bg may look fine; in emerald-light it might feel out of place. v1: keep accents global; v2: consider per-tone accent shifts if a tone reads visually off.
