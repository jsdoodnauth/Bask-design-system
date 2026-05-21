import * as React from "react"

import { cn } from "@/lib/utils"

export type SegmentTint = "blue" | "green" | "amber" | "red" | "violet" | "orange"

export interface BarSegment {
  label: React.ReactNode
  value: number
  tint?: SegmentTint
  /** Override the segment color directly (CSS value). Wins over `tint`. */
  color?: string
}

interface StackedSegmentBarProps extends React.ComponentProps<"div"> {
  segments: BarSegment[]
  /** Bar height in px. Default 12. */
  height?: number
  /** Render the label + value legend under the bar. Default true. */
  showLegend?: boolean
  /** Format `value` as a fraction of total instead of raw number in the legend. */
  legendAsPercent?: boolean
}

const TINT_VAR: Record<SegmentTint, string> = {
  blue:   "var(--blue)",
  green:  "var(--green)",
  amber:  "var(--amber)",
  red:    "var(--red)",
  violet: "var(--violet)",
  orange: "var(--orange)",
}

const TINT_DOT: Record<SegmentTint, string> = {
  blue:   "bg-blue",
  green:  "bg-green",
  amber:  "bg-amber",
  red:    "bg-red",
  violet: "bg-violet",
  orange: "bg-orange",
}

function segmentColor(s: BarSegment): string {
  return s.color ?? TINT_VAR[s.tint ?? "blue"]
}

function StackedSegmentBar({
  segments,
  height = 12,
  showLegend = true,
  legendAsPercent = false,
  className,
  ...props
}: StackedSegmentBarProps) {
  const total = segments.reduce((sum, s) => sum + (s.value || 0), 0) || 1
  return (
    <div
      data-slot="stacked-segment-bar"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      <div
        className="flex w-full rounded-pill overflow-hidden bg-surface-2 [box-shadow:var(--elev-inset)]"
        style={{ height }}
      >
        {segments.map((s, i) => (
          <div
            key={i}
            role="presentation"
            className="h-full"
            style={{ flex: Math.max(s.value, 0), background: segmentColor(s) }}
            title={typeof s.label === "string" ? `${s.label}: ${s.value}` : undefined}
          />
        ))}
      </div>
      {showLegend && (
        <ul className="flex flex-wrap gap-x-5 gap-y-1 m-0 p-0 list-none">
          {segments.map((s, i) => (
            <li key={i} className="flex items-center gap-2 text-[length:var(--fs-12)] text-ink-2">
              <span
                aria-hidden
                className={cn(
                  "size-2 rounded-full flex-none",
                  !s.color && TINT_DOT[s.tint ?? "blue"]
                )}
                style={s.color ? { background: s.color } : undefined}
              />
              <span className="text-ink-2">{s.label}</span>
              <span className="text-ink-3 tabular-nums">
                {legendAsPercent
                  ? `${((s.value / total) * 100).toFixed(1)}%`
                  : s.value}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { StackedSegmentBar }
