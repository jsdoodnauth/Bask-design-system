"use client"

import * as React from "react"
import { PieChart, Pie, Cell } from "recharts"

import { cn } from "@/lib/utils"
import { MeasuredResponsiveContainer } from "@/components/ui/chart"

export interface PieCalloutSlice {
  label: string
  value: number
  /** CSS color, typically `var(--blue)` etc. */
  color: string
}

interface PieCalloutsChartProps {
  data: PieCalloutSlice[]
  /** Pixel height of the chart area. */
  size?: number
  className?: string
  /** Format the value shown inside the callout. Defaults to `${pct}%`. */
  valueFormatter?: (slice: PieCalloutSlice, percent: number) => React.ReactNode
}

const RAD = Math.PI / 180

type LabelArgs = {
  cx: number
  cy: number
  midAngle: number
  outerRadius: number
  index: number
  payload: PieCalloutSlice
  percent: number
}

function PieCalloutsChart({ data, size = 240, className, valueFormatter }: PieCalloutsChartProps) {
  const sum = data.reduce((acc, s) => acc + s.value, 0)

  const renderLabel = React.useCallback((args: LabelArgs) => {
    const { cx, cy, midAngle, outerRadius, payload, percent } = args
    const cos = Math.cos(-midAngle * RAD)
    const sin = Math.sin(-midAngle * RAD)
    const ax = cx + (outerRadius + 6) * cos
    const ay = cy + (outerRadius + 6) * sin
    const bx = cx + (outerRadius + 22) * cos
    const by = cy + (outerRadius + 22) * sin
    const isRight = cos >= 0
    const tx = bx + (isRight ? 6 : -6)
    const textAnchor = isRight ? "start" : "end"
    const pct = (percent ?? 0) * 100
    const valueNode = valueFormatter
      ? valueFormatter(payload, pct)
      : `${pct.toFixed(1)}%`

    return (
      <g>
        <path
          d={`M${ax},${ay}L${bx},${by}L${tx},${by}`}
          stroke="var(--hairline)"
          fill="none"
        />
        <circle cx={ax} cy={ay} r={2} fill={payload.color} />
        <text
          x={tx}
          y={by - 4}
          textAnchor={textAnchor}
          fill="var(--ink-2)"
          fontSize={12}
        >
          {payload.label}
        </text>
        <text
          x={tx}
          y={by + 10}
          textAnchor={textAnchor}
          fill="var(--ink)"
          fontSize={12}
          fontWeight={600}
        >
          {valueNode}
        </text>
      </g>
    )
  }, [valueFormatter])

  return (
    <div className={cn("relative w-full", className)} style={{ height: size }}>
      <MeasuredResponsiveContainer className="size-full">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius="0%"
            outerRadius="62%"
            paddingAngle={1}
            strokeWidth={0}
            isAnimationActive={false}
            labelLine={false}
            label={renderLabel as unknown as undefined}
          >
            {data.map((s, i) => (
              <Cell key={i} fill={s.color} />
            ))}
          </Pie>
        </PieChart>
      </MeasuredResponsiveContainer>
      <span className="sr-only">
        {data.map((s) => `${s.label}: ${((s.value / (sum || 1)) * 100).toFixed(1)}%`).join(", ")}
      </span>
    </div>
  )
}

export { PieCalloutsChart }
