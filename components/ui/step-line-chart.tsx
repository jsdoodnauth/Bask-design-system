"use client"

import * as React from "react"
import {
  Line, LineChart, CartesianGrid, XAxis, YAxis, ReferenceLine,
} from "recharts"

import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"

interface SeriesDef {
  key: string
  label?: React.ReactNode
  color?: string
}

interface ThresholdDef {
  value: number
  label?: string
  color?: string
}

interface StepLineChartProps {
  data: ReadonlyArray<Record<string, unknown>>
  series: SeriesDef[]
  xKey: string
  className?: string
  height?: number | string
  /** "step", "stepBefore", or "stepAfter". Default "step". */
  variant?: "step" | "stepBefore" | "stepAfter"
  /** Optional horizontal threshold lines (e.g. SLA / target). */
  thresholds?: ThresholdDef[]
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
}

const VARIANT_MAP = {
  step: "step",
  stepBefore: "stepBefore",
  stepAfter: "stepAfter",
} as const

function StepLineChart({
  data, series, xKey, className, height,
  variant = "step", thresholds,
  margin = { top: 8, right: 8, bottom: 0, left: -16 },
}: StepLineChartProps) {
  const config = React.useMemo<ChartConfig>(() => (
    Object.fromEntries(series.map((s) => [s.key, { label: s.label ?? s.key, color: s.color }]))
  ), [series])

  return (
    <ChartContainer
      config={config}
      className={className}
      style={height !== undefined ? { height } : undefined}
    >
      <LineChart data={data as Record<string, unknown>[]} margin={margin}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {thresholds?.map((t, i) => (
          <ReferenceLine
            key={i}
            y={t.value}
            stroke={t.color ?? "var(--ink-3)"}
            strokeDasharray="3 3"
            label={t.label ? { value: t.label, position: "right", fill: "var(--ink-3)", fontSize: 11 } : undefined}
          />
        ))}
        {series.map((s) => {
          const color = s.color ?? `var(--color-${s.key})`
          return (
            <Line
              key={s.key}
              dataKey={s.key}
              type={VARIANT_MAP[variant]}
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          )
        })}
      </LineChart>
    </ChartContainer>
  )
}

export { StepLineChart }
