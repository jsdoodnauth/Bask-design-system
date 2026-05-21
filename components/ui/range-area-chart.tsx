"use client"

import * as React from "react"
import {
  Area, Line, ComposedChart, CartesianGrid, XAxis, YAxis,
} from "recharts"

import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"

interface RangeAreaChartProps {
  data: ReadonlyArray<Record<string, unknown>>
  /** Row key for the X axis. */
  xKey: string
  /** Row key for the lower bound. */
  lowKey: string
  /** Row key for the upper bound. */
  highKey: string
  /** Optional row key for a center line (e.g. mean/median). */
  centerKey?: string
  /** CSS color for the band (defaults to var(--blue)). */
  color?: string
  /** Band fill opacity. Default 0.18. */
  fillOpacity?: number
  /** Show a stronger stroke around the band edges. Default false. */
  strokeBand?: boolean
  /** Labels used in the tooltip / legend config. */
  labels?: { low?: string; high?: string; center?: string; band?: string }
  className?: string
  height?: number | string
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
}

function RangeAreaChart({
  data, xKey, lowKey, highKey, centerKey,
  color = "var(--blue)", fillOpacity = 0.18, strokeBand = false,
  labels, className, height,
  margin = { top: 8, right: 8, bottom: 0, left: -16 },
}: RangeAreaChartProps) {
  const config = React.useMemo<ChartConfig>(() => ({
    [`${lowKey}__band`]: { label: labels?.band ?? "Range", color },
    ...(centerKey ? { [centerKey]: { label: labels?.center ?? centerKey, color } } : {}),
  }), [lowKey, centerKey, labels, color])

  // Recharts Area supports dataKey returning a [low, high] tuple for ranges.
  const rangeGetter = React.useCallback(
    (d: Record<string, unknown>) => [d[lowKey] as number, d[highKey] as number] as [number, number],
    [lowKey, highKey],
  )

  return (
    <ChartContainer
      config={config}
      className={className}
      style={height !== undefined ? { height } : undefined}
    >
      <ComposedChart data={data as Record<string, unknown>[]} margin={margin}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey={rangeGetter as unknown as string}
          name={labels?.band ?? "Range"}
          stroke={strokeBand ? color : "transparent"}
          strokeWidth={strokeBand ? 1.5 : 0}
          fill={color}
          fillOpacity={fillOpacity}
          isAnimationActive={false}
          type="monotone"
        />
        {centerKey && (
          <Line
            dataKey={centerKey}
            type="monotone"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        )}
      </ComposedChart>
    </ChartContainer>
  )
}

export { RangeAreaChart }
