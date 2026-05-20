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
  /** Marker radius in px. Default 6. */
  r?: number
}

interface WorldMapProps {
  hotspots?: WorldHotspot[]
  /** ISO2 (e.g. "US", "IN") → numeric value. Drives region heatmap fill. */
  data?: Record<string, number>
  /** Min/max colors for the heatmap scale. Defaults to soft-blue → blue. */
  scale?: [string, string]
  className?: string
  height?: number | string
  /** Map topology key. Default `world_merc`. */
  map?: "world_merc" | "world"
}

const TINT_VAR: Record<NonNullable<WorldHotspot["tint"]>, string> = {
  blue:   "var(--blue)",
  green:  "var(--green)",
  amber:  "var(--amber)",
  red:    "var(--red)",
  violet: "var(--violet)",
  orange: "var(--orange)",
}

function WorldMap({
  hotspots = [],
  data,
  scale,
  className,
  height = 220,
  map = "world_merc",
}: WorldMapProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const host = ref.current
    if (!host) return
    let instance: { destroy: () => void } | null = null
    let cancelled = false

    ;(async () => {
      // Order matters: the map data file (world-merc.js) references the global
      // `jsVectorMap` set by the main module, so jsvectormap must evaluate first.
      const { default: VectorMap } = await import("jsvectormap")
      if (map === "world_merc") await import("jsvectormap/dist/maps/world-merc")
      else await import("jsvectormap/dist/maps/world")
      if (cancelled || !host.isConnected) return

      const markers = hotspots.map((h) => ({
        name: h.label ?? "",
        coords: [h.lat, h.lng] as [number, number],
        style: {
          initial: {
            fill: TINT_VAR[h.tint ?? "blue"],
            stroke: "var(--surface)",
            strokeWidth: 1.5,
            r: h.r ?? 6,
          },
          hover: { fillOpacity: 0.9 },
        },
      }))

      instance = new VectorMap({
        selector: host,
        map,
        backgroundColor: "transparent",
        zoomOnScroll: false,
        zoomButtons: false,
        showTooltip: true,
        regionStyle: {
          initial: {
            fill: "var(--ink-3)",
            fillOpacity: 0.22,
            stroke: "var(--hairline)",
            strokeWidth: 0.5,
          },
          hover: { fill: "var(--ink-3)", fillOpacity: 0.45 },
        },
        markers,
        series: data
          ? {
              regions: [
                {
                  attribute: "fill",
                  values: data,
                  scale: scale ?? ["var(--blue-soft)", "var(--blue)"],
                  normalizeFunction: "polynomial",
                },
              ],
            }
          : undefined,
      })
    })()

    return () => {
      cancelled = true
      try {
        instance?.destroy()
      } catch {
        /* noop on unmount race */
      }
      while (host.firstChild) host.removeChild(host.firstChild)
    }
  }, [hotspots, data, scale, map])

  return (
    <div
      ref={ref}
      data-slot="world-map"
      className={cn("relative w-full overflow-hidden rounded-md", className)}
      style={{ height }}
    />
  )
}

export { WorldMap }
