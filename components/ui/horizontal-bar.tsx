"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type Tint = "blue" | "green" | "amber" | "red" | "violet" | "orange" | "ink-3"

interface HorizontalBarRowProps extends Omit<React.ComponentProps<"div">, "children"> {
  label: React.ReactNode
  /** 0–100 */
  value: number
  tint?: Tint | string
  /** Right-aligned trailing text (e.g. count, `used/total`). */
  tail?: React.ReactNode
  labelWidth?: number | string
  tailWidth?: number | string
  /** Track height in px. Default 28. */
  height?: number
}

function HorizontalBarRow({
  label,
  value,
  tint = "blue",
  tail,
  labelWidth = 92,
  tailWidth = 56,
  height = 28,
  className,
  ...props
}: HorizontalBarRowProps) {
  const pct = Math.max(0, Math.min(100, value))
  const fill =
    tint === "ink-3"
      ? "var(--ink-3)"
      : tint.startsWith("var(")
      ? tint
      : `var(--${tint})`

  return (
    <div
      data-slot="horizontal-bar-row"
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      <span
        className="text-[length:var(--fs-13)] text-ink-2 flex-none font-medium truncate"
        style={{ width: labelWidth }}
      >
        {label}
      </span>
      <div
        data-slot="bar-track"
        className="flex-1 rounded-sm bg-surface-2 [box-shadow:var(--elev-inset)] overflow-hidden"
        style={{ height }}
      >
        <div
          data-slot="bar-fill"
          className="h-full rounded-sm [box-shadow:inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(0,0,0,0.08)] transition-all"
          style={{ width: `${pct}%`, background: fill }}
        />
      </div>
      {tail !== undefined && tail !== null ? (
        <span
          className="text-[length:var(--fs-13)] text-ink font-semibold tabular-nums flex-none text-right"
          style={{ width: tailWidth }}
        >
          {tail}
        </span>
      ) : null}
    </div>
  )
}

export { HorizontalBarRow }
export type { HorizontalBarRowProps }
