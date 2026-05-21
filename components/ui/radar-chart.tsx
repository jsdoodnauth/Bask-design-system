"use client"

import * as React from "react"
import {
  Radar, RadarChart as RcRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts"

import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"

interface SeriesDef {
  key: string
  label?: React.ReactNode
  color?: string
}

interface RadarCompareChartProps {
  data: ReadonlyArray<Record<string, unknown>>
  series: SeriesDef[]
  /** Row key used as the angular axis (e.g. dimension name). */
  axisKey: string
  className?: string
  height?: number | string
  /** Show the concentric radius grid + numeric ticks. Default true. */
  showRadiusAxis?: boolean
  /** Fill opacity for each polygon. Default 0.22. */
  fillOpacity?: number
}

function RadarCompareChart({
  data, series, axisKey, className, height,
  showRadiusAxis = false, fillOpacity = 0.22,
}: RadarCompareChartProps) {
  const config = React.useMemo<ChartConfig>(() => (
    Object.fromEntries(series.map((s) => [s.key, { label: s.label ?? s.key, color: s.color }]))
  ), [series])

  return (
    <ChartContainer
      config={config}
      className={className}
      style={height !== undefined ? { height } : undefined}
    >
      <RcRadarChart data={data as Record<string, unknown>[]} outerRadius="78%">
        <PolarGrid stroke="var(--hairline)" />
        <PolarAngleAxis
          dataKey={axisKey}
          tick={{ fill: "var(--ink-3)", fontSize: 12 }}
        />
        {showRadiusAxis && (
          <PolarRadiusAxis
            tick={{ fill: "var(--ink-3)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
        )}
        <ChartTooltip content={<ChartTooltipContent />} />
        {series.map((s) => {
          const color = s.color ?? `var(--color-${s.key})`
          return (
            <Radar
              key={s.key}
              dataKey={s.key}
              stroke={color}
              fill={color}
              fillOpacity={fillOpacity}
              strokeWidth={2}
            />
          )
        })}
      </RcRadarChart>
    </ChartContainer>
  )
}

export { RadarCompareChart }
