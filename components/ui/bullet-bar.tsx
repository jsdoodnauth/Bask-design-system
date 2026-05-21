import * as React from "react"

import { cn } from "@/lib/utils"

export type BulletTint = "blue" | "green" | "amber" | "red" | "violet" | "orange"

interface BulletBarProps extends React.ComponentProps<"div"> {
  /** Current value. */
  value: number
  /** Target/goal value — rendered as a vertical tick. Omit to hide the marker. */
  target?: number
  /** Scale max. Defaults to `Math.max(value, target)` rounded to nearest nice number. */
  max?: number
  tint?: BulletTint
  /** Bar height in px. Default 10. */
  height?: number
  /** Show value / target text under the bar. Default true. */
  showCaption?: boolean
  /** Render-fn for the caption text. Receives `{ value, target, max }`. */
  formatCaption?: (ctx: { value: number; target?: number; max: number }) => React.ReactNode
}

const TINT_VAR: Record<BulletTint, string> = {
  blue:   "var(--blue)",
  green:  "var(--green)",
  amber:  "var(--amber)",
  red:    "var(--red)",
  violet: "var(--violet)",
  orange: "var(--orange)",
}

function BulletBar({
  value,
  target,
  max: maxProp,
  tint = "blue",
  height = 10,
  showCaption = true,
  formatCaption,
  className,
  ...props
}: BulletBarProps) {
  const max = maxProp ?? Math.max(value, target ?? 0, 1)
  const fillPct = Math.min(100, Math.max(0, (value / max) * 100))
  const targetPct =
    target !== undefined
      ? Math.min(100, Math.max(0, (target / max) * 100))
      : null

  const caption = formatCaption
    ? formatCaption({ value, target, max })
    : target !== undefined
      ? <>
          <span className="text-ink tabular-nums font-semibold">{value}</span>
          <span className="text-ink-3"> / {target}</span>
        </>
      : <span className="text-ink tabular-nums font-semibold">{value}</span>

  return (
    <div
      data-slot="bullet-bar"
      className={cn("flex flex-col gap-1.5 w-full", className)}
      {...props}
    >
      <div
        className="relative w-full rounded-pill bg-surface-2 [box-shadow:var(--elev-inset)]"
        style={{ height }}
      >
        <div
          aria-hidden
          className="absolute left-0 top-0 h-full rounded-pill [box-shadow:inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(0,0,0,0.08)]"
          style={{ width: `${fillPct}%`, background: TINT_VAR[tint] }}
        />
        {targetPct !== null && (
          <div
            aria-hidden
            className="absolute top-[-3px] bottom-[-3px] w-[2px] bg-ink rounded-pill"
            style={{ left: `calc(${targetPct}% - 1px)` }}
            title={`Target: ${target}`}
          />
        )}
      </div>
      {showCaption && (
        <div className="text-[length:var(--fs-12)]">{caption}</div>
      )}
    </div>
  )
}

export { BulletBar }
