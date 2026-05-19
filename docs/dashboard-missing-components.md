# Dashboard Missing Components & Widget Plan

Audit of the four v2 dashboards (`/dashboards/{analytics,crm,ecommerce,finance,projects}`) against the [Coderthemes Paces reference](https://coderthemes.com/paces/bootstrap/index.html), plus a survey of [shadcn/ui charts](https://ui.shadcn.com/charts).

**Format per item:** *what it is · where it'd land · priority · effort*

- **Priority:** P0 = blocker for visual parity, P1 = noticeable gap, P2 = nice-to-have polish
- **Effort:** S = ~½ day, M = ~1–2 days, L = ~3+ days

---

## 1 · Vector world map (jsvectormap)

Today: `components/ui/world-map.tsx` is a stylized SVG with hand-tuned continent ellipses — usable as a placeholder, but not geographically accurate and not interactive.

| Item | Description | Where used | Priority | Effort |
| --- | --- | --- | --- | --- |
| `WorldMap` rebuild on jsvectormap | Replace ellipse silhouette with a real vector world topology. Keep the existing `hotspots` prop, add region heatmaps and tooltips. | Analytics (User Geography), eCommerce (Revenue by Locations), CRM (Location By Session) | **P0** | **M** |
| Region tooltip + hover heat | Hover a country → tooltip with hot-spot value; gradient fill by metric. | Same as above | P1 | S |
| Per-theme map palette | Land fill / hairline / hot-spot colors driven by `--bg`, `--hairline`, `--ink-3` so the map respects every theme tone. | Global | P1 | S |

### Library decision

- **Library:** [`jsvectormap`](https://github.com/themustafaomar/jsvectormap) (vanilla — no React binding required).
- **Why vanilla over `react-jvectormap`:** React wrappers historically lag the vanilla lib and tend to break peer-dep with React 19. Vanilla + a thin wrapper is the path of least surprise.
- **Topology:** ship `world-merc` JSON from `jsvectormap/dist/maps/`. Lazy-load it to keep the initial JS bundle small (maps total ~140 KB minified).
- **Wrapper sketch:**

```tsx
// components/ui/world-map.tsx
"use client"
import * as React from "react"

interface WorldMapProps {
  data?: Record<string, number>          // ISO2 → value, drives heat
  hotspots?: { lng: number; lat: number; tint?: BaskTint; label?: string }[]
  height?: number | string
  className?: string
}

export function WorldMap({ data, hotspots, height = 320, className }: WorldMapProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    let map: import("jsvectormap").default | null = null
    let cancelled = false
    ;(async () => {
      const [{ default: VectorMap }] = await Promise.all([
        import("jsvectormap"),
        import("jsvectormap/dist/maps/world-merc"),
      ])
      if (cancelled || !ref.current) return
      map = new VectorMap({
        selector: ref.current,
        map: "world_merc",
        backgroundColor: "transparent",
        regionStyle: {
          initial: { fill: "var(--surface-3)", stroke: "var(--hairline)", strokeWidth: 0.5 },
          hover:   { fill: "var(--ink-3)" },
        },
        markers: hotspots?.map((h) => ({
          name: h.label, coords: [h.lat, h.lng],
        })),
        series: data ? {
          regions: [{
            attribute: "fill",
            values: data,
            scale: ["var(--blue-soft)", "var(--blue)"],
            normalizeFunction: "polynomial",
          }],
        } : undefined,
      })
    })()
    return () => { cancelled = true; map?.destroy() }
  }, [data, hotspots])
  return <div ref={ref} className={className} style={{ height }} />
}
```

- **Theme integration:** map options accept CSS strings, so `var(--surface-3)` etc. resolve at paint. SSR-safe because the import + init runs inside `useEffect`.

---

## 2 · Missing chart variants

Today: `lib/recharts` wired up; we ship Area, Bar (vertical + horizontal + stacked-pairs), Line, Pie/Donut (`DonutTotal`), and sparklines (`MiniStat`). Tooltip is shadcn-style.

### 2A — Used by Paces, missing from Bask

| Chart | Description | Paces usage | Priority | Effort |
| --- | --- | --- | --- | --- |
| **Radial / half-arc gauge** | 270° or 180° arc with a center label — % to target. | Paces uses on Analytics "Audience" segments and Goals progress; eCommerce "Conv Rate". | **P0** | **M** |
| **Stacked bar with rounded segments** | Bars where each segment has its own rounded ends (not just the top). Reference uses for Deal Status / Status Breakdown distribution. | CRM, Projects | P1 | S |
| **Bullet bar (target marker)** | Horizontal bar with a vertical tick marking the goal. We currently fake this inline in eCommerce Weekly Insights. | eCommerce, Projects | P1 | S |
| **Stacked area** | Multi-series area filled as a stack rather than overlaid. Reference uses on Sales Report. | eCommerce, Analytics | P1 | S |
| **Range / candlestick area** | Min/max band with a center line. Reference uses on Performance Insights. | Projects, Finance | P2 | M |
| **Heatmap calendar** | Github-style activity grid. Reference uses on Productivity. | Projects | P2 | M |

### 2B — In shadcn catalog, not yet in Bask (nice-to-haves)

| Chart | Description | Likely use | Priority | Effort |
| --- | --- | --- | --- | --- |
| **Pie with label callouts** | Pie slices with external labels + leader lines. | Analytics, CRM | P2 | S |
| **Radar** | Multi-axis comparison polygon. | Analytics audience profile, Projects capacity | P2 | M |
| **Mixed (bar + line)** | Two y-axes — bars + overlay line. | Finance overview | P2 | S |
| **Step line** | Step-staircase line for thresholds / SLA. | Finance, eCommerce | P2 | S |
| **Tooltip variants** | Compact / glass / per-series swatches. We have one variant — shadcn ships ~6. | Global | P2 | M |
| **Skeleton chart placeholder** | Loading-state shimmer in chart shape. We have `Skeleton` but no chart wrapper. | Global | P1 | S |

**Implementation note:** all chart variants can be modeled as thin wrappers around `recharts` primitives inside `<ChartContainer>` (already in place). The carved aesthetic comes from container shadow + tooltip; the chart itself stays neutral.

---

## 3 · Brand / channel icons

Today: `SourceList`, `TopNavIconButton`, and Quick-Transfer recipients use initials in tinted tiles because lucide-react doesn't ship brand logos (Google, Instagram, GitHub, etc.).

| Item | Description | Where used | Priority | Effort |
| --- | --- | --- | --- | --- |
| Brand-icon adapter | Thin component over [`simple-icons`](https://github.com/simple-icons/simple-icons) or `@icons-pack/react-simple-icons` mapping `"google" \| "instagram" \| ... \| "github"` to a sized SVG with brand color. | Analytics traffic sources, eCommerce payment methods, top-nav (GitHub), Finance Quick Transfer | **P0** | S |
| Country flag set | The flag emojis we use today don't render uniformly across OS (Windows shows ISO codes). Ship as small SVG / `unicode-flag` polyfill or move to `flag-icons` CSS. | Analytics Geography, CRM Location, eCommerce Locations | P1 | S |

---

## 4 · Top-nav add-ons

Today: `TopNav` is structural — search input, mega trigger, icon buttons with dot badges, compact UserPill. Each notification surface is a static `<button>` with no flyout.

| Item | Description | Priority | Effort |
| --- | --- | --- | --- |
| Command-palette search dropdown | `⌘K` opens a Base-UI Dialog with grouped results (Pages / Customers / Actions). Use the existing `Combobox` primitive. | **P0** | M |
| Notification flyout | Popover triggered by `Bell` — list of items with avatar / title / time + "Mark all read" footer. | P1 | M |
| Inbox flyout | Same shape as notifications but threads + preview. | P2 | M |
| Cart flyout | Mini-cart line items + subtotal + "Go to checkout". | P2 | M |
| Mega menu panel | Replace static `Apps` button with `NavigationMenu` (already in `components/ui`) hosting an apps grid. | P1 | M |
| Language switcher | Replace static `Languages` icon with a Popover listing locales with flag + label. | P2 | S |
| Quick theme toggle | Compact light/dark + tone swatch row in the user-pill dropdown for one-click switching. | P2 | S |

---

## 5 · Sidebar add-ons

| Item | Description | Priority | Effort |
| --- | --- | --- | --- |
| Collapsed-rail mode | A 56px mini-rail showing only icons; expands on hover or pin. Token-aware. | P1 | M |
| Sidebar search filter | Type-to-filter NavItems (helpful when nesting grows). | P2 | S |
| Section divider | Visual separator between sections beyond `SidebarSectionLabel` — matches Paces' subtle 1px hairline groupings. | P2 | XS |

---

## 6 · Inline-built widgets — extract to `components/ui/*`

Patterns we hand-rolled across the five dashboards. Lifting these into components removes duplication and locks in the Bask styling once.

| Candidate | Where it lives today | Suggested home | Priority | Effort |
| --- | --- | --- | --- | --- |
| **`Alert`-style banner card** (icon + title + body + action button) | eCommerce "Poor Sales", Finance "Account needs review", CRM Overview server-error | `components/ui/alert.tsx` already exists — extend with `<Alert>/<AlertIcon>/<AlertTitle>/<AlertDescription>/<AlertActions>` compound | **P0** | S |
| **`KPIStrip`** — horizontal row of label + value + delta badge cells | Analytics Sessions Overview, eCommerce Sales Report, CRM Overview, Projects Performance, Finance Financial Overview | `components/ui/kpi-strip.tsx` | **P0** | S |
| **`MetricTile`** — inset block with tinted icon tile + label + big value + delta | Finance Financial Overview, Projects Status Breakdown, Analytics Marketing Sources, Analytics Device Split | `components/ui/metric-tile.tsx` | **P0** | S |
| **`MilestoneCallout`** — congrats icon + body + big number + CTA | Analytics Subscriber Milestone, eCommerce Revenue Locations header | `components/ui/milestone-callout.tsx` | P1 | S |
| **`CreditCardVisual`** — gradient card surface with holder + masked number + expiry | Finance Total Balance | `components/ui/credit-card.tsx` | P1 | S |
| **`GoalCard`** — icon + title + progress bar + saved/target | Finance My Targets & Goals | `components/ui/goal-card.tsx` | P1 | S |
| **`ScheduleItem`** — time block + tint dot + title/who | Projects Today's Schedule | `components/ui/schedule-item.tsx` | P1 | S |
| **`TimerDisplay`** — monospace HH:MM:SS with Start/Stop control | Projects Today's Hours | `components/ui/timer-display.tsx` | P2 | S |
| **`HorizontalBarRow`** — label + inset progress track with colored fill + numeric tail | CRM Deal Status, Projects Resource Allocation, Analytics Goals Progress | `components/ui/horizontal-bar.tsx` (compound with `BarTrack`/`BarFill`) | **P0** | S |
| **`RecipientStack`** — row of avatars + "+ add" button | Finance Quick Transfer | `components/ui/recipient-stack.tsx` | P2 | S |
| **`AvatarGroup`** — overlapping avatar stack with `+N` overflow | Projects Ongoing Projects, Projects Tasks | `components/ui/avatar-group.tsx` | **P0** | S |
| **`CountryRow`** — flag + name + visits + delta badge (the 2-col grid in Analytics Geography) | Analytics, CRM, eCommerce | `components/ui/country-row.tsx` (or extend `SourceList` with a `country` variant) | P1 | S |
| **`PageHeaderBreadcrumb`** layout helper | Every dashboard repeats the title-on-left, breadcrumb-on-right pattern | Promote the pattern to a `PageHeaderWithCrumbs` shorthand | P2 | XS |

---

## 7 · Table / list polish

| Item | Description | Priority | Effort |
| --- | --- | --- | --- |
| Per-row action menu (`⋯` dropdown) | We currently render 3 inline icon buttons; reference uses a single `⋯` opening a DropdownMenu. | **P0** | S |
| Bulk selection toolbar | Checkbox header + "n selected" toolbar above table rows. | P1 | S |
| Page size selector | "Rows per page" + 5/10/15/20/50 — pairs with the existing `Pagination` component. | P1 | S |
| Column sort indicator | Up/down chevron on sortable headers + ARIA `aria-sort`. | P1 | M |
| Sticky header inside scroll | When tables overflow vertically, header stays. | P2 | S |
| Empty / loading states | `<TableEmpty>` and `<TableSkeleton>` slots for missing data. | P1 | S |

---

## 8 · Misc UI gaps

| Item | Description | Priority | Effort |
| --- | --- | --- | --- |
| **Form-row in card** | Inline label + control combos (Quick Transfer, search controls in headers) — reuse `FieldRow` more consistently. | P2 | XS |
| **Section heading + meta** | Sub-header inside a card body (e.g. "Page Views %" under the donut) — small shared component would tidy these. | P2 | XS |
| **Status dot legend** | Inline legend of color dots used across pipeline / status / source widgets. | P2 | S |
| **Image-less product row** | We use initials; the reference shows product thumbnails. Need a 40×40 image slot in `SourceList` / product tables. | P1 | S |
| **Trend arrow inline** | Inline ↑/↓ + delta without the Badge shell, for compact KPIs. | P2 | XS |
| **Empty-state illustration** | A reusable empty-state card with a small SVG illustration slot (no widgets yet — but the v2 mocks show "0 records" patterns). | P2 | M |
| **Toast notifications** | `Toast` primitive exists but isn't wired to any dashboard flow (Refresh, Export, etc.). | P2 | S |

---

## 9 · Suggested rollout order

Bundling by what unblocks the most pages at once:

### Wave 1 — visual parity (P0)
1. `jsvectormap` swap-in for `WorldMap` (#1)
2. Brand-icon adapter via `@icons-pack/react-simple-icons` (#3)
3. Extract `Alert` compound, `KPIStrip`, `MetricTile`, `HorizontalBarRow`, `AvatarGroup` (#6)
4. Row-action `⋯` menu pattern in tables (#7)
5. Radial / half-arc gauge chart (#2A)

### Wave 2 — interaction depth (P1)
6. Command-palette search + Notification flyout (#4)
7. Stacked bar w/ rounded segments + Bullet bar + Stacked area chart variants (#2A)
8. Country flag set fix (#3)
9. Extract `MilestoneCallout` / `GoalCard` / `ScheduleItem` / `CountryRow` (#6)
10. Table polish: page-size selector, column sort, empty states (#7)

### Wave 3 — polish (P2)
11. Collapsed sidebar rail + sidebar search (#5)
12. Remaining nice-to-have charts: radar, mixed, step line, pie callouts (#2B)
13. Inline trend arrow, status-dot legend, empty illustrations (#8)
14. Toast wiring on dashboard actions (#8)

---

## 10 · Cross-cutting notes

- **Carved shadow rule still applies.** Every new card-shaped component must declare `data-slot="card"` (or its own `[data-slot="…"]` rule in `globals.css` referencing `var(--tilt-x)`/`var(--tilt-y)` directly). Going through `--elev-*` will silently lose the parallax repaint.
- **Theme-tone safety.** New widgets should source colors from `var(--blue|green|amber|red|violet|orange)` and their `*-soft` / `tint-*` siblings — no hard-coded hex. The Paces reference uses fixed brand hues; we deliberately remap to the active Bask tone.
- **No backwards compat needed.** Inline widgets that get lifted into components should be replaced at the call sites in the same change — we don't need shims.
- **Bundle hygiene.** `jsvectormap` + map data should be `dynamic()` imported. Brand-icon library should tree-shake at the named-import level (avoid the barrel).
