"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface WorldHotspot {
  /** -180..180 */
  lng: number
  /** -90..90 */
  lat: number
  label?: string
  /** Bask color token, e.g. "blue", "amber". Defaults to "blue". */
  tint?: "blue" | "green" | "amber" | "red" | "violet" | "orange"
  /** Render radius in viewBox units (0..100 wide / 0..50 tall). Default 1.6. */
  r?: number
}

interface WorldMapProps {
  hotspots?: WorldHotspot[]
  className?: string
  /** Background fill for continents. Defaults to current ink-3 at low alpha. */
  landFill?: string
  height?: number | string
}

/** Convert lng/lat (-180..180, -90..90) to viewBox (0..100, 0..50) coords. */
function project(lng: number, lat: number): [number, number] {
  const x = ((lng + 180) / 360) * 100
  const y = ((90 - lat) / 180) * 50
  return [x, y]
}

/** Stylized continent silhouettes — rough hand-tuned ellipses at approximate
 *  geographic positions. Not geographically accurate; this is a Bask-styled
 *  placeholder until react-simple-maps (or topojson data) is wired in. */
const CONTINENT_BLOBS: Array<{ cx: number; cy: number; rx: number; ry: number; rot?: number }> = [
  // North America
  { cx: 22, cy: 16, rx: 9,  ry: 6, rot: -10 },
  { cx: 18, cy: 21, rx: 4,  ry: 4 },
  // South America
  { cx: 30, cy: 34, rx: 4,  ry: 7, rot: 18 },
  // Europe
  { cx: 51, cy: 16, rx: 4,  ry: 3 },
  // Africa
  { cx: 53, cy: 27, rx: 6,  ry: 8 },
  // Asia
  { cx: 67, cy: 17, rx: 12, ry: 7 },
  { cx: 75, cy: 24, rx: 5,  ry: 4 },
  // India
  { cx: 67, cy: 24, rx: 3,  ry: 3 },
  // SE Asia / Indonesia
  { cx: 78, cy: 30, rx: 5,  ry: 2 },
  // Australia
  { cx: 84, cy: 35, rx: 5,  ry: 3 },
]

function WorldMap({
  hotspots = [],
  className,
  landFill,
  height = 220,
}: WorldMapProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-md", className)}
      style={{ height }}
    >
      <svg
        viewBox="0 0 100 50"
        preserveAspectRatio="xMidYMid meet"
        className="block w-full h-full"
        aria-hidden
      >
        {/* land */}
        <g
          fill={landFill ?? "rgba(60, 50, 40, 0.18)"}
        >
          {CONTINENT_BLOBS.map((b, i) => (
            <ellipse
              key={i}
              cx={b.cx}
              cy={b.cy}
              rx={b.rx}
              ry={b.ry}
              transform={b.rot ? `rotate(${b.rot} ${b.cx} ${b.cy})` : undefined}
            />
          ))}
        </g>

        {/* hotspots */}
        <g>
          {hotspots.map((h, i) => {
            const [x, y] = project(h.lng, h.lat)
            const r = h.r ?? 1.4
            const fill = `var(--${h.tint ?? "blue"})`
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={r * 2} fill={fill} opacity={0.18} />
                <circle cx={x} cy={y} r={r}     fill={fill} />
                <circle cx={x} cy={y} r={r * 0.5} fill="white" opacity={0.7} />
                {h.label && (
                  <title>{h.label}</title>
                )}
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

export { WorldMap }
