"use client"

import * as React from "react"
import {
  Area, AreaChart, CartesianGrid, XAxis, YAxis,
} from "recharts"

import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"

interface SeriesDef {
  /** Key in each data row. */
  key: string
  /** Display name (also fed into the shared chart config). */
  label?: React.ReactNode
  /** CSS color (e.g. `var(--blue)`). Falls back to the chart config color if omitted. */
  color?: string
}

interface StackedAreaChartProps {
  /** Row data passed straight to `<AreaChart>`. */
  data: ReadonlyArray<Record<string, unknown>>
  /** Series painted as stacked, filled areas (rendered in order, bottom→top). */
  series: SeriesDef[]
  /** Key in each row used as the X axis. */
  xKey: string
  /** Sized via `className`/style on the underlying `ChartContainer`. */
  className?: string
  height?: number | string
  /** When true, each area also gets a gradient fill (top-down opacity). Default true. */
  gradient?: boolean
  /** Override chart margin. */
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
}

function StackedAreaChart({
  data,
  series,
  xKey,
  className,
  height,
  gradient = true,
  margin = { top: 8, right: 8, bottom: 0, left: -16 },
}: StackedAreaChartProps) {
  const config = React.useMemo<ChartConfig>(() => {
    return Object.fromEntries(
      series.map((s) => [s.key, { label: s.label ?? s.key, color: s.color }])
    )
  }, [series])

  // Stable gradient ids per render — using React.useId for uniqueness on the page.
  const id = React.useId().replace(/[:]/g, "")

  return (
    <ChartContainer
      config={config}
      className={className}
      style={height !== undefined ? { height } : undefined}
    >
      <AreaChart data={data as Record<string, unknown>[]} margin={margin}>
        {gradient && (
          <defs>
            {series.map((s) => {
              const color = s.color ?? `var(--color-${s.key})`
              return (
                <linearGradient key={s.key} id={`sac-${id}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"  stopColor={color} stopOpacity={0.32} />
                  <stop offset="100%" stopColor={color} stopOpacity={0}    />
                </linearGradient>
              )
            })}
          </defs>
        )}
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {series.map((s) => {
          const color = s.color ?? `var(--color-${s.key})`
          return (
            <Area
              key={s.key}
              dataKey={s.key}
              type="monotone"
              stackId="stack"
              stroke={color}
              strokeWidth={2}
              fill={gradient ? `url(#sac-${id}-${s.key})` : color}
              fillOpacity={gradient ? 1 : 0.16}
            />
          )
        })}
      </AreaChart>
    </ChartContainer>
  )
}

export { StackedAreaChart }
