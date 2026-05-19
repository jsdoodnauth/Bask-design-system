"use client"

import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

import { cn } from "@/lib/utils"

export interface DonutSlice {
  label: string
  value: number
  /** CSS color, typically `var(--blue)` etc. */
  color: string
}

interface DonutTotalProps {
  data: DonutSlice[]
  /** Big number shown in the center. Defaults to sum of values. */
  total?: React.ReactNode
  /** Smaller label under the total. */
  sublabel?: React.ReactNode
  /** Height of the chart area. */
  size?: number
  className?: string
  /** Hide the legend rows under the chart. */
  hideLegend?: boolean
  /** Optional formatter for legend values (e.g. percent or currency). */
  legendValueFormatter?: (slice: DonutSlice, percent: number) => React.ReactNode
}

function DonutTotal({
  data, total, sublabel, size = 180, className,
  hideLegend, legendValueFormatter,
}: DonutTotalProps) {
  const sum = data.reduce((acc, s) => acc + s.value, 0)
  const computedTotal = total ?? sum.toLocaleString()
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative w-full" style={{ height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius="62%"
              outerRadius="92%"
              paddingAngle={2}
              strokeWidth={0}
              isAnimationActive={false}
            >
              {data.map((s, i) => (
                <Cell key={i} fill={s.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="flex flex-col items-center">
            {sublabel && (
              <span className="text-[length:var(--fs-12)] text-ink-3 uppercase tracking-[var(--tracking-eyebrow)] font-bold">
                {sublabel}
              </span>
            )}
            <span className="text-[length:var(--fs-28)] font-bold text-ink leading-tight tabular-nums">
              {computedTotal}
            </span>
          </div>
        </div>
      </div>

      {!hideLegend && (
        <div className="flex flex-col gap-2">
          {data.map((s) => {
            const pct = sum > 0 ? (s.value / sum) * 100 : 0
            return (
              <div key={s.label} className="flex items-center justify-between text-[length:var(--fs-13)]">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    aria-hidden
                    className="size-2 rounded-full flex-none"
                    style={{ background: s.color }}
                  />
                  <span className="text-ink-2 truncate">{s.label}</span>
                </div>
                <span className="text-ink font-semibold tabular-nums ml-2">
                  {legendValueFormatter
                    ? legendValueFormatter(s, pct)
                    : `${pct.toFixed(1)}%`}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export { DonutTotal }
