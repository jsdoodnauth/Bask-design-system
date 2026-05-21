"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface HeatmapCell {
  /** ISO date string (YYYY-MM-DD). */
  date: string
  /** Raw value used for color scaling. */
  value: number
}

interface HeatmapCalendarProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Sparse cells, keyed by date. Missing dates render as the empty tier. */
  cells: HeatmapCell[]
  /** First day of the rendered window. Defaults to (today − 52 weeks). */
  startDate?: Date
  /** Inclusive end date. Defaults to today. */
  endDate?: Date
  /** Base CSS color, typically var(--green) / var(--blue). Default var(--green). */
  color?: string
  /** Override the 0-tier color. Default var(--surface-3). */
  emptyColor?: string
  /** Pixel size of one cell. Default 12. */
  cellSize?: number
  /** Pixel gap between cells. Default 3. */
  cellGap?: number
  /** Custom tooltip text per cell. Defaults to `${value} on ${date}`. */
  formatTooltip?: (cell: HeatmapCell | { date: string; value: 0 }) => string
}

const DAY_MS = 24 * 60 * 60 * 1000

function toIso(d: Date) {
  // Local date YYYY-MM-DD (avoids TZ drift from toISOString)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function HeatmapCalendar({
  cells,
  startDate,
  endDate,
  color = "var(--green)",
  emptyColor = "var(--surface-3)",
  cellSize = 12,
  cellGap = 3,
  formatTooltip,
  className,
  ...props
}: HeatmapCalendarProps) {
  const end = endDate ?? new Date()
  const start = startDate ?? new Date(end.getTime() - 52 * 7 * DAY_MS)

  // Walk the window in week columns starting on Sunday.
  const startSunday = new Date(start)
  startSunday.setDate(startSunday.getDate() - startSunday.getDay())

  const map = React.useMemo(() => {
    const m = new Map<string, number>()
    for (const c of cells) m.set(c.date, c.value)
    return m
  }, [cells])

  const max = React.useMemo(() => {
    let v = 0
    for (const c of cells) if (c.value > v) v = c.value
    return v
  }, [cells])

  const tier = (value: number) => {
    if (value <= 0 || max === 0) return 0
    const ratio = value / max
    if (ratio >= 0.75) return 4
    if (ratio >= 0.5) return 3
    if (ratio >= 0.25) return 2
    return 1
  }

  // Tier → alpha for the base color. 0 uses emptyColor.
  const tierAlpha = [0, 0.22, 0.42, 0.64, 1]

  const weeks: { date: Date; iso: string; inRange: boolean }[][] = []
  let cursor = new Date(startSunday)
  while (cursor <= end) {
    const week: typeof weeks[number] = []
    for (let i = 0; i < 7; i++) {
      const inRange = cursor >= start && cursor <= end
      week.push({ date: new Date(cursor), iso: toIso(cursor), inRange })
      cursor = new Date(cursor.getTime() + DAY_MS)
    }
    weeks.push(week)
  }

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""]

  return (
    <div
      data-slot="heatmap-calendar"
      className={cn("inline-flex flex-col gap-1.5 text-[length:var(--fs-12)] text-ink-3", className)}
      {...props}
    >
      <div className="flex gap-1.5">
        <div className="flex flex-col" style={{ gap: cellGap, paddingTop: 0 }}>
          {dayLabels.map((label, i) => (
            <span
              key={i}
              className="leading-none"
              style={{ height: cellSize, lineHeight: `${cellSize}px` }}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="flex" style={{ gap: cellGap }}>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col" style={{ gap: cellGap }}>
              {week.map((day, di) => {
                if (!day.inRange) {
                  return <span key={di} style={{ width: cellSize, height: cellSize }} />
                }
                const v = map.get(day.iso) ?? 0
                const t = tier(v)
                const bg = t === 0
                  ? emptyColor
                  : `color-mix(in oklch, ${color} ${Math.round(tierAlpha[t] * 100)}%, transparent)`
                const tip = formatTooltip
                  ? formatTooltip({ date: day.iso, value: v } as HeatmapCell)
                  : `${v} on ${day.iso}`
                return (
                  <span
                    key={di}
                    title={tip}
                    aria-label={tip}
                    className="rounded-[2px]"
                    style={{ width: cellSize, height: cellSize, background: bg }}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 self-end">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((t) => (
          <span
            key={t}
            className="rounded-[2px]"
            style={{
              width: cellSize,
              height: cellSize,
              background: t === 0
                ? emptyColor
                : `color-mix(in oklch, ${color} ${Math.round(tierAlpha[t] * 100)}%, transparent)`,
            }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}

export { HeatmapCalendar }
