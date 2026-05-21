"use client"

import * as React from "react"
import {
  Bar, Line, ComposedChart, CartesianGrid, XAxis, YAxis,
} from "recharts"

import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"

interface BarSeriesDef {
  key: string
  label?: React.ReactNode
  color?: string
  /** Stack id — set the same value across series to stack them. */
  stackId?: string
}

interface LineSeriesDef {
  key: string
  label?: React.ReactNode
  color?: string
  /** Draw line on left ("left") or right ("right") y-axis. Default "right". */
  yAxis?: "left" | "right"
}

interface MixedBarLineChartProps {
  data: ReadonlyArray<Record<string, unknown>>
  bars: BarSeriesDef[]
  lines: LineSeriesDef[]
  xKey: string
  className?: string
  height?: number | string
  /** Show the secondary y-axis on the right. Default true when any line uses it. */
  showRightAxis?: boolean
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
}

function MixedBarLineChart({
  data, bars, lines, xKey, className, height,
  showRightAxis,
  margin = { top: 8, right: 8, bottom: 0, left: -16 },
}: MixedBarLineChartProps) {
  const config = React.useMemo<ChartConfig>(() => (
    Object.fromEntries(
      [...bars, ...lines].map((s) => [s.key, { label: s.label ?? s.key, color: s.color }])
    )
  ), [bars, lines])

  const needsRight = showRightAxis ?? lines.some((l) => (l.yAxis ?? "right") === "right")

  return (
    <ChartContainer
      config={config}
      className={className}
      style={height !== undefined ? { height } : undefined}
    >
      <ComposedChart data={data as Record<string, unknown>[]} margin={margin}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} />
        <YAxis yAxisId="left" tickLine={false} axisLine={false} />
        {needsRight && (
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
          />
        )}
        <ChartTooltip content={<ChartTooltipContent />} />
        {bars.map((s) => {
          const color = s.color ?? `var(--color-${s.key})`
          return (
            <Bar
              key={s.key}
              dataKey={s.key}
              yAxisId="left"
              fill={color}
              stackId={s.stackId}
              radius={[4, 4, 0, 0]}
            />
          )
        })}
        {lines.map((s) => {
          const color = s.color ?? `var(--color-${s.key})`
          return (
            <Line
              key={s.key}
              dataKey={s.key}
              yAxisId={(s.yAxis ?? "right") === "right" && needsRight ? "right" : "left"}
              type="monotone"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          )
        })}
      </ComposedChart>
    </ChartContainer>
  )
}

export { MixedBarLineChart }
