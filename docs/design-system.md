# Bask — Design System

Bask is a depth-and-light design language for warm, cream-substrate UIs. It looks a little like claymorphism at first glance because it leans on soft shadows and inset highlights — but the underlying rules are different, and the difference is what makes it work.

This document is the canonical description of the system. The prototype in `prototype/` is the implementation; this is the explanation.

---

## 1. What Bask is (and isn't)

**Bask is not claymorphism.** Claymorphism produces puffy, extruded, almost edible-looking objects on pastel backgrounds, with heavy multi-axis bevels (light highlight on the top-left, deep shadow on the bottom-right of the *interior* of the shape) and saturated outer shadows. The aesthetic is friendly-toy.

**Bask is not neumorphism.** Neumorphism gives a single monochromatic surface a soft outer shadow on one side and a soft outer highlight on the other — the object looks like it was molded from the page substrate. Bask objects are not molded from the page; they sit on it.

**Bask is not Material.** Material treats elevation as neutral grey shadow tiers with no top-edge treatment. Bask's surfaces have *edges*: a thin top-edge highlight and a faint bottom-edge shade that describe the material's own thickness, independent of the cast.

Bask is closer to **carved or embossed paper-board** under a directional light source — and the light source happens to be the user's cursor. The name evokes the system's signature behavior: surfaces sit quietly in warm light, basking under the cursor when attention arrives.

### What distinguishes Bask from those neighbors

1. **A single soft cast shadow per surface.** Not a multi-layer shadow stack. Not a hard offset rim.
2. **Edge-only insets.** Two thin horizontal lines (top-edge highlight, bottom-edge shade) describe material thickness. No left/right insets. No deep cornered bevel.
3. **The cursor is the light source.** Cast shadows tilt away from the cursor. Not "shadows follow the mouse" — the model is physically grounded: cursor near a surface = surface is lit from that direction, cast shadow falls opposite.
4. **Locality.** Surfaces far from the cursor get no light at all. The page is quiet by default. Only the area under attention has motion.
5. **Size never changes on interaction.** Hover doesn't lift; press doesn't translate. The shadow changes; the object stays put.
6. **Inside/outside grammar.** Every surface has a known elevation tier. Inversion (recessed → elevated) on activation is the system's main interaction language.

---

## 2. Core principles

### 2.1 Carved depth, not stacked layers
Surfaces look molded *into* the page, not pasted *on top of* it. A card has a thin highlight on its top edge (catching light) and a faint shade on its bottom edge (where the material thickness picks up shadow). The body of the card is flush, not extruded. The cast underneath ties it to the page.

### 2.2 The cursor is the light source
Not a metaphor; a literal model. Each elevated surface measures its distance to the cursor and computes:
- A **direction** vector (from the surface center toward the cursor).
- An **influence** factor (1 inside the surface, smoothly falling to 0 past a 380px radius).

The cast shadow's `x` and `y` offsets are driven by `direction × influence`. Cursor on the right side of a card → cast shadow falls to the left, just like a real light source. Cursor far away → no light → cast falls to the default gravity position.

### 2.3 Quiet by default, precise where attention is
A user scanning the page sees a still composition. Surfaces only shift when the cursor approaches them. Most of the page, most of the time, is at gravity.

This is the explicit rejection of hybrid/global parallax: when every elevated element shifts in sync as you move the mouse, the page reads as nervous. Bask localizes the motion to attention.

### 2.4 Inside/outside grammar
Every surface lives at a known tier. The grammar is bidirectional:

| Tier | Meaning | Examples |
|---|---|---|
| **Recessed** | Inside the page — you put things *in*. | Inputs, textareas, switch tracks, well-style placeholders, line-loader fills |
| **Flat** | Flush with parent — no depth signal | Table rows, list items, plain text blocks |
| **Raised** | Sits on the page — addressable, clickable | Cards, badges, buttons, stat tiles, the avatar |
| **Floating** | Above the page — temporarily summoned | Hovered cards, dropdowns, tooltips, modal panels |

Recessed has its own static shadow recipe (`--elev-inset`). Flat has none. Raised and floating have parallax-reactive recipes.

### 2.5 Inversion on activation
Checkboxes, radios, and `.choice` rows are **recessed when empty** and **elevated when activated**. A blank checkbox is a small well in the page; a checked one is a tinted blue tile sitting on top.

This inversion is more than a visual flourish — it teaches the user what "activated" means in Bask. Whenever you see a recessed thing become elevated, something has been turned on.

### 2.6 Size never changes on interaction
A button at rest, on hover, and during a press occupies the exact same pixels. Hover nudges the cast shadow slightly tighter and darker; press collapses the cast to a 4–6px shadow. No `translate`, no `scale`. The element stays planted.

This is the explicit rejection of the "button physically depresses into the page" affordance. That motion reads as bouncy; it fights the carved aesthetic. Shadow-only feedback is sufficient and stays consistent with the principle that surfaces are carved *into* the page, not floating above it on springs.

### 2.7 Warm cream substrate
The background is `#EFE7D8` — a warm, low-saturation cream. Not white. Not grey. Not pastel. This is the constraint that anchors everything else: every shadow alpha, every accent saturation, every inset opacity is tuned against this background. Replacing the background changes the entire system.

---

## 3. Visual language

### 3.1 Palette

```
Surface ladder (page → highest-elevation face)
  --bg            #EFE7D8   page
  --bg-deep       #E4D9C5   recessed-area baseline / shadow rim
  --surface       #FBF6EB   raised card face
  --surface-2     #F5EEDE   nested card face / table row
  --surface-3     #FFFDF7   highest face (e.g., button-on-card)

Ink
  --ink           #1E1A14   primary text
  --ink-2         #4A4234   secondary text
  --ink-3         #847A66   tertiary / placeholders / hairlines

Accents (each has a saturated and a soft tint)
  --blue   / --blue-soft     primary
  --green  / --green-soft    success
  --amber  / --amber-soft    warning
  --red    / --red-soft      danger
  --violet / --violet-soft   accent
  --orange / --orange-soft   "add to cart" / commerce

Tinted surfaces (for icon tiles, stat backgrounds)
  --tint-blue / --tint-green / --tint-amber / --tint-red / --tint-violet / --tint-orange
```

The cream surface ladder is what gives Bask its warmth. The five tones are within ~10 LCH points of each other — close enough that they read as the same material at slightly different elevations, not as different colors.

### 3.2 Typography

- **Body / UI**: Inter, 14px base, line-height 1.45.
- **Display (`h1`, `h2`)**: **Fraunces**, weight 600, tracking `-0.02em`, line-height 1.05. A modern serif that warms up the page; pairs naturally with the cream substrate.
- **Eyebrow**: 12px Inter, weight 700, letter-spacing `0.12em`, uppercase. Used for section labels and small contextual markers ("Members · Playbook", "Core updates").

### 3.3 Radii

```
--r-xs   6px    badges' inner pills, breadcrumb hover chips
--r-sm  10px    icon tiles, small interactive blocks
--r-md  14px    buttons, inputs, table containers
--r-lg  20px    cards
--r-xl  28px    large cards, dialogs
--r-pill         9999px / fully rounded — badges, switch tracks
```

### 3.4 The Bask shadow recipe

Every reactive elevated surface has the same three-line shadow shape. Only the magnitudes change between tiers.

```
inset 0  Npx 0 var(--surface-highlight),                    /* top-edge highlight  */
inset 0 -Npx 0 var(--surface-shade),                        /* bottom-edge shade   */
calc(var(--tilt-x) * -Xpx)                                  /* cast x (cursor-aware) */
  calc(Ypx + (0.55 - var(--tilt-y)) * Zpx)                  /* cast y (gravity + cursor) */
  Bpx Spx rgba(60, 40, 10, A);                              /* cast blur, spread, color */
```

| Token | Magnitudes |
|---|---|
| Recessed (`--elev-inset`) | Static; `inset 0 2px 4px rgba(60,40,10,.15)` + faint white highlight |
| `--elev-1` (badges, stat-icon tiles) | top-highlight 1.5px, bottom-shade 1.5px, cast x ±4px, y 8px + bias, blur 14px |
| `--elev-2` (cards, buttons, stats) | top 2px, bottom 2px, cast x ±8px, y 14px + bias, blur 12px |
| `--elev-3` (hovered cards, dropdowns, modals) | top 2.5px, bottom 2px, cast x ±14px, y 22px + bias, blur 34px |
| `--elev-pressed` (button :active) | top 1px, bottom 1px, cast x ±2px, y 4px + bias, blur 6px |

The `0.55` constant in the y-offset is the **gravity bias**: when `--tilt-y` is 0 (no cursor nearby), the cast still falls slightly downward, like a real light coming from above-the-screen.

---

## 4. The proximity-light motion model

### 4.1 The two CSS variables

`--tilt-x` and `--tilt-y`, each ∈ [-1, 1], represent the direction (and weighted intensity) of the cursor relative to that specific element. They're registered via `@property` for invalidation reliability:

```css
@property --tilt-x { syntax: "<number>"; initial-value: 0; inherits: true; }
@property --tilt-y { syntax: "<number>"; initial-value: 0; inherits: true; }
```

A single JS loop writes them on each elevated element per frame. CSS does the rest.

### 4.2 The per-element formula

For each reactive surface:

```
cursor offset       v   = cursor - elementCenter
edge distance       d   = distance(cursor, nearest edge of element rect)   // 0 if cursor inside

influence           inf = 1 - smoothstep(0, 380px, d)                       // 1 inside, smooth falloff outside

if cursor inside (|v| ≤ halfSize):
    direction       (dirX, dirY) = (v.x / halfSize, v.y / halfSize)         // linear; ±1 at half-extent
else:
    direction       (dirX, dirY) = (v.x / |v|, v.y / |v|)                   // unit vector

write --tilt-x = dirX × inf × AMP
write --tilt-y = dirY × inf × AMP
```

`AMP = 1.0` (max swing). `OUTER = 380px` (falloff radius). `EASE = 0.18` (cursor smoothing).

### 4.3 What this produces

| Cursor position | Behavior |
|---|---|
| At rest in dead space | Every element at `--tilt = 0`, cast falls straight down via gravity bias |
| Approaching a card | That card's cast starts tilting away; others nearby get a faint tilt; far ones unchanged |
| Centered inside a card | That card's cast offset proportional to which half the cursor is in |
| At the top-right of a card | Cast falls to the bottom-left at full magnitude |
| Leaves the document | All `--tilt`s ease back to 0; gravity restores |

### 4.4 Why this model

Three rejected alternatives, recorded so we don't relitigate:

- **Global hybrid** (`--mx/--my` on `:root` + per-element hover amp). Page-wide synchronized tilt felt nervous; the page shimmered as the mouse moved.
- **Per-element-only pointer** (each card's hover writes its own `--tilt`). Felt sparse — the cursor was clearly somewhere on the page but no card acknowledged it until you hovered exactly inside.
- **Per-element with eased leave**. Improved the snap but didn't solve the "nothing reacts until I hover precisely" problem.

Proximity light gives both: the card under the cursor responds fully, nearby cards respond partially, and far cards stay still. Quiet *and* precise.

### 4.5 Cursor inertia

The cursor position is smoothed frame-to-frame (`EASE = 0.18`, ~80ms to target). Without smoothing, fast mouse moves cause visible jitter in the cast as pixel-level cursor noise translates to full shadow recalculation. With smoothing, the light feels like it has weight — a soft heliographic delay between mouse motion and shadow tilt.

### 4.6 The gated rAF loop

The loop sleeps when the cursor has settled and there's no scroll/resize. A `MutationObserver` re-collects the element list when modals/dropdowns mount. This keeps CPU at zero when the page is idle.

### 4.7 Accessibility

`prefers-reduced-motion: reduce` skips the whole subscription. Everything falls back to gravity-only shadows. CSS transitions are also suppressed under reduced motion.

### 4.8 No mobile parallax

Touch devices have no hover, and we explicitly dropped `DeviceOrientation` after trying it — phone-tilt feels disconnected from intent. Mobile users get clean gravity shadows; this is acceptable rather than a defect.

---

## 5. Interaction policy

### 5.1 Hover

- Cast becomes slightly tighter and darker (`--elev-2 → --elev-3`-like, but with a tuned middle magnitude on buttons).
- Cursor-driven tilt becomes more pronounced (full proximity influence).
- **No `translate`. No `scale`.** Size is constant.

### 5.2 Press (`:active`)

- Cast collapses to a tight 4–6px shadow (`--elev-pressed`).
- Top-edge highlight dims.
- **No `translate`. No `scale`.** Size is constant.

The element stays in the exact same pixel position before, during, and after a press. The shadow change alone provides the affordance.

### 5.3 Focus

- A 2-step ring: 2px gap of `--surface` color, then 3px of `--ring-color` (blue 40% alpha).
- Composed with the resting cast — focus ring sits *outside* the element edge, doesn't replace the shadow.
- Inset focus is used inside menus and dropdowns where outer rings would clip.

### 5.4 Selected / checked

Inversion. The recessed well becomes an elevated colored tile. The check mark or dot scales in from 0.

### 5.5 Disabled

Opacity drops to ~55%. Cursor changes to `not-allowed`. Shadows stay in their default (rest) state — disabled doesn't mean recessed; it means inert.

---

## 6. Component anatomy

The prototype's gallery is the canonical implementation. Highlights worth calling out:

**Card.** Surface at `--elev-2`. The most common container. Padding `20px` (or `28px` for `.card-xl`). Border radius `--r-lg`.

**Stat tile.** A `--surface` rectangle at `--elev-2` containing a tinted icon-tile at `--elev-1` plus label + value. The tinted tile is the only place the soft accent tints (`--tint-blue` etc.) appear — they're carriers for an emoji or lucide icon, never standalone surfaces.

**Badge.** Pill (`--r-pill`) at `--elev-1`. Soft accent fill for status (`is-success`, `is-warn`, etc.) with a darker dot to the left. The dot has a tiny inset shadow of its own (`inset 0 -1px 0 rgba(0,0,0,0.15)`) — a single pixel that gives it weight on the pill.

**Button.** `--elev-2` with `--btn-bg` / `--btn-ink` / `--btn-hi` / `--btn-lo` CSS vars. Colored variants override the inset colors to low-opacity values because a strong white inset highlight on a saturated background reads as a hard band, not a light catch.

**Table.** A `--elev-2` surface (no separate row backgrounds at rest). Rows are flat; only the container is elevated. Hairline borders between rows; hovered row gets a `--surface-2` background.

**Checkbox / Radio / Choice.** The inversion components. Recessed well by default (`--elev-inset`), elevated colored tile when checked (`--elev-1` with accent background). The check-mark or radio-dot scales in via CSS transform.

**Switch.** Recessed pill track (`--elev-inset`) with an elevated thumb. The thumb's cast shadow has its own `--tilt-x` reading, so as the switch sits on the page the thumb's shadow direction tracks the cursor — a small but tactile detail.

**Input / Textarea / Select.** Recessed wells. Focus state lifts the background from `--surface-2` to `--surface-3` and adds a blue glow ring outside the well; error state swaps the ring red.

**Tooltip.** The *only* dark surface in the system: `var(--ink)` background with `var(--ink-inv)` text. Dark-on-cream gives the contrast tooltips need at small sizes without inventing a new color or border.

**Dropdown menu.** Native `<details>` element + a styled menu list at `--elev-3`. Menu items are flat in the menu surface and get a `--surface-2` background on hover.

**Modal.** Native `<dialog>` + `--elev-3` panel. The backdrop is **not** black — it's `rgba(50, 38, 16, 0.42)` with `backdrop-filter: blur(8px) saturate(130%)`. Black-50% reads as "different room"; the warm-tinted blur reads as "page de-emphasized."

**Sidebar.** A `--elev-2` card column with flat `.nav-item`s. Active item gets `--surface-3` background + `--elev-1` shadow — it pops slightly out of the sidebar, signaling "this is where you are."

**Tabs.** Two flavors. **Pill tabs**: a recessed track (`--elev-inset`) containing an elevated active pill (`--elev-1`) — the inversion language applied to navigation. **Underline tabs**: a thin blue rule under the active tab, used when tabs sit at the top of a card rather than as standalone control.

---

## 7. Tokens reference (quick lookup)

### Surfaces
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#EFE7D8` | Page background |
| `--bg-deep` | `#E4D9C5` | Recessed baseline / shadow rim |
| `--surface` | `#FBF6EB` | Standard raised face |
| `--surface-2` | `#F5EEDE` | Nested raised face |
| `--surface-3` | `#FFFDF7` | Highest raised face |

### Ink
| Token | Hex | Role |
|---|---|---|
| `--ink` | `#1E1A14` | Primary text |
| `--ink-2` | `#4A4234` | Secondary text |
| `--ink-3` | `#847A66` | Tertiary / placeholder |
| `--ink-inv` | `#FBF6EB` | Inverse (text on dark, e.g., tooltips) |

### Accents (saturated / soft / tint)
| Sat | Soft | Tint | Role |
|---|---|---|---|
| `--blue` `#3C5BFF` | `--blue-soft` | `--tint-blue` | Primary action / info |
| `--green` `#2EA86A` | `--green-soft` | `--tint-green` | Success |
| `--amber` `#E8A93B` | `--amber-soft` | `--tint-amber` | Warning |
| `--red` `#D7484A` | `--red-soft` | `--tint-red` | Danger |
| `--violet` `#7A5BFF` | `--violet-soft` | `--tint-violet` | Accent / membership |
| `--orange` `#F08A3C` | `--orange-soft` | `--tint-orange` | Commerce |

### Type
| Token | Role |
|---|---|
| `--font-sans` | Inter |
| `--font-display` | Fraunces |
| `--fs-12 … --fs-36` | Font size scale |
| `--tracking-eyebrow` | `0.12em` |
| `--tracking-display` | `-0.02em` |
| `--lh-display` / `--lh-body` | `1.05` / `1.5` |

### Radii
`--r-xs` `--r-sm` `--r-md` `--r-lg` `--r-xl` `--r-pill` — 6 / 10 / 14 / 20 / 28 / 9999

### Motion
| Token | Role |
|---|---|
| `--tilt-x` / `--tilt-y` | Per-element light direction (registered `<number>`) |
| `--ease` | `cubic-bezier(.2, .8, .2, 1)` |
| `--dur-fast` / `--dur` | `120ms` / `220ms` |

### Elevations (static-use only — see CLAUDE.md for the inline-shadow rule)
`--elev-1` `--elev-2` `--elev-3` `--elev-pressed` `--elev-inset`

### Focus
| Token | Role |
|---|---|
| `--ring-color` | `rgba(60, 91, 255, 0.40)` |
| `--ring` | 2px surface gap + 3px glow, composed alongside the resting shadow |

### Hairlines
| Token | Value |
|---|---|
| `--hairline` | `rgba(60, 40, 10, 0.08)` — table row dividers, separators |

---

## 8. Anti-patterns (what Bask rejects)

Recorded so we don't relitigate decisions when the system grows.

- **Hard offset rims** (`0 6px 0 -1px <color>`). The "stacked paper" recipe. Reads as harsh; fights the carved aesthetic. Tried and rejected.
- **Multi-axis bevels** (insets on all four sides). The "molded clay" recipe. Reads as plastic toy. Tried and rejected.
- **Global synchronized parallax.** Hybrid mode where every card tilts in sync as the mouse moves. Reads as nervous. Tried and rejected.
- **TranslateY on press.** Felt bouncy; mismatched the carved aesthetic. Tried and rejected.
- **Black modal backdrops.** Fight the warm palette. Use a brown-tinted blur instead.
- **Hard outline focus rings.** Cut into the carved feel. Use the composed glow ring on top of the resting shadow.
- **Photo-realistic textures.** Skeuomorphism is a different system. Bask stays stylized.
- **Pastel rainbow backgrounds.** Claymorphism territory. Bask's substrate is one specific cream.
- **Spring-based motion.** Bounce and overshoot fight "carved." If a motion needs character, it gets *quiet character* — confident easing, no overshoot, short durations.
- **Per-element listeners on every node.** A single global loop is cheaper and produces the right model.

---

## 9. Where the system goes next

The prototype proves the system at component-level. Open questions for the production port:

- **Dark mode.** Not in any mock yet. Tokens are organized so a `[data-theme="dark"]` override is feasible later; deferred until needed.
- **Beyond-gallery form controls.** Combobox, date picker, file upload, multi-step wizards — designed when real forms land.
- **Iconography.** Prototype uses emoji as placeholders. Production will use `lucide-react` at a single stroke weight (default 2px is well-matched).
- **Production mobile motion.** Phone-tilt was rejected; consider whether *anything* on touch should be motion-aware, or whether static is the right answer for mobile.

See `docs/plan.md` for the eight-milestone implementation roadmap.
