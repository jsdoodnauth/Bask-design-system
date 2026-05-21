"use client"

import * as React from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
  AreaChart, Area, BarChart, Bar,
} from "recharts"

import { cn } from "@/lib/utils"
import { useBaskTilt } from "@/lib/motion/bask-motion-provider"
import { Badge } from "@/components/ui/badge"
import { MeasuredResponsiveContainer } from "@/components/ui/chart"
import type { StatTint } from "@/components/ui/stat"

const TINT_BG: Record<StatTint, string> = {
  blue:   "bg-tint-blue",
  green:  "bg-tint-green",
  amber:  "bg-tint-amber",
  red:    "bg-tint-red",
  violet: "bg-tint-violet",
  orange: "bg-tint-orange",
}
const TINT_INK: Record<StatTint, string> = {
  blue:   "text-blue",
  green:  "text-green",
  amber:  "text-amber",
  red:    "text-red",
  violet: "text-violet",
  orange: "text-orange",
}

interface MiniStatProps extends Omit<React.ComponentProps<"div">, "title"> {
  label: string
  value: React.ReactNode
  /** e.g. "+8.4%". Sign + numeric used to drive arrow direction. */
  delta?: string
  deltaUp?: boolean
  icon?: React.ReactNode
  tint?: StatTint
  /** Sparkline data — array of numbers. */
  series?: number[]
  /** Spark style — defaults to "area". */
  spark?: "area" | "bar"
  /** Optional sublabel under the value (e.g. "Last 30 Days"). */
  sub?: React.ReactNode
}

function MiniStat({
  label, value, delta, deltaUp, icon, tint = "blue", series, spark = "area",
  sub, className, ...props
}: MiniStatProps) {
  const tiltRef = useBaskTilt()
  const data = (series ?? []).map((v, i) => ({ i, v }))
  const stroke = `var(--${tint})`

  return (
    <div
      ref={tiltRef}
      data-slot="card"
      data-mini-stat=""
      className={cn(
        "bg-surface rounded-lg p-4 flex flex-col gap-3 min-w-0 overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && (
            <div
              className={cn(
                "size-8 rounded-sm grid place-items-center flex-none",
                "[box-shadow:var(--elev-1)]",
                TINT_BG[tint],
                TINT_INK[tint],
              )}
            >
              {icon}
            </div>
          )}
          <span className="text-[length:var(--fs-12)] font-bold uppercase tracking-[var(--tracking-eyebrow)] text-ink-3 truncate">
            {label}
          </span>
        </div>
        {delta && (
          <Badge variant={deltaUp ? "success" : "danger"}>
            {deltaUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {delta}
          </Badge>
        )}
      </div>

      <div className="flex items-end justify-between gap-3 min-w-0">
        <div className="flex flex-col min-w-0">
          <span className="text-[length:var(--fs-22)] font-bold text-ink leading-tight tabular-nums truncate">
            {value}
          </span>
          {sub && (
            <span className="text-[length:var(--fs-12)] text-ink-3 mt-0.5">{sub}</span>
          )}
        </div>
        {data.length > 0 && (
          <div className="w-[88px] h-[40px] flex-none">
            <MeasuredResponsiveContainer className="size-full">
              {spark === "area" ? (
                <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id={`spark-${tint}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"  stopColor={stroke} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={stroke} stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="v"
                    type="monotone"
                    stroke={stroke}
                    strokeWidth={2}
                    fill={`url(#spark-${tint})`}
                    isAnimationActive={false}
                  />
                </AreaChart>
              ) : (
                <BarChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                  <Bar dataKey="v" fill={stroke} radius={[2, 2, 0, 0]} isAnimationActive={false} />
                </BarChart>
              )}
            </MeasuredResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}

export { MiniStat }
