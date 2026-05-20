"use client"

import * as React from "react"
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts"

import { cn } from "@/lib/utils"

const ARC_ANGLES = {
  half:           { start: 180, end: 0   },  // 180° opening down
  "three-quarter":{ start: 225, end: -45 },  // 270° opening at bottom
  full:           { start: 90,  end: -270 }, // 360° (closed)
} as const

type Arc = keyof typeof ARC_ANGLES

interface GaugeProps {
  /** 0–100 */
  value: number
  /** Fill color of the value arc. Default `var(--blue)`. */
  valueColor?: string
  /** Track (empty) color. Default `var(--surface-2)`. */
  trackColor?: string
  /** Arc extent. Default `half` (180°). */
  arc?: Arc
  /** Chart area height in px. Default 180. */
  size?: number
  /** Inner radius as % of the chart radius. Default 72. Higher = thinner ring. */
  thickness?: number
  /** Center label. Defaults to `${value}%`. Pass `null` to hide. */
  label?: React.ReactNode
  /** Smaller text shown under the main label. */
  sublabel?: React.ReactNode
  className?: string
}

function Gauge({
  value,
  valueColor = "var(--blue)",
  trackColor = "var(--surface-2)",
  arc = "half",
  size = 180,
  thickness = 72,
  label,
  sublabel,
  className,
}: GaugeProps) {
  const pct = Math.max(0, Math.min(100, value))
  const { start, end } = ARC_ANGLES[arc]
  const innerRadius = `${thickness}%`
  const outerRadius = "100%"
  const showLabel = label !== null
  const renderedLabel = label ?? `${Math.round(pct)}%`

  return (
    <div
      data-slot="gauge"
      className={cn("relative w-full", className)}
      style={{ height: size }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={[{ value: pct }]}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={start}
          endAngle={end}
          barSize={1000}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
          <RadialBar
            dataKey="value"
            cornerRadius={999}
            fill={valueColor}
            background={{ fill: trackColor }}
            isAnimationActive={false}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      {showLabel ? (
        <div
          className={cn(
            "absolute inset-0 grid pointer-events-none",
            arc === "half" ? "items-end justify-center pb-2" : "place-items-center"
          )}
        >
          <div className="flex flex-col items-center">
            <span className="text-[length:var(--fs-28)] font-bold text-ink leading-tight tabular-nums">
              {renderedLabel}
            </span>
            {sublabel ? (
              <span className="text-[length:var(--fs-12)] text-ink-3 uppercase tracking-[var(--tracking-eyebrow)] font-bold">
                {sublabel}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export { Gauge }
export type { GaugeProps, Arc as GaugeArc }
