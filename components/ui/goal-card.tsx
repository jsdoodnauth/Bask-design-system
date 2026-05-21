import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Progress,
  ProgressTrack,
  ProgressIndicator,
} from "@/components/ui/progress"

export type GoalTint = "blue" | "green" | "amber" | "red" | "violet" | "orange"

interface GoalCardProps extends Omit<React.ComponentProps<"div">, "title"> {
  icon: React.ReactNode
  tint?: GoalTint
  label: React.ReactNode
  /** Amount saved/progressed (free-form). */
  saved: React.ReactNode
  /** Target/goal value. */
  target: React.ReactNode
  /** Progress percentage 0–100. */
  percent: number
  /** Override the auto-generated "N% complete" badge. */
  badge?: React.ReactNode
}

const TINT_TILE: Record<GoalTint, string> = {
  blue:   "bg-[color:var(--tint-blue)] text-blue",
  green:  "bg-[color:var(--tint-green)] text-green",
  amber:  "bg-[color:var(--tint-amber)] text-amber",
  red:    "bg-[color:var(--tint-red)] text-red",
  violet: "bg-[color:var(--tint-violet)] text-violet",
  orange: "bg-[color:var(--tint-orange)] text-orange",
}

const TINT_FILL: Record<GoalTint, string> = {
  blue:   "var(--blue)",
  green:  "var(--green)",
  amber:  "var(--amber)",
  red:    "var(--red)",
  violet: "var(--violet)",
  orange: "var(--orange)",
}

function GoalCard({
  icon,
  tint = "blue",
  label,
  saved,
  target,
  percent,
  badge,
  className,
  ...props
}: GoalCardProps) {
  const pct = Math.min(100, Math.max(0, percent))
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-surface rounded-md p-4 flex flex-col gap-3",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <div
          aria-hidden
          className={cn(
            "size-10 rounded-sm grid place-items-center flex-none [box-shadow:var(--elev-1)]",
            TINT_TILE[tint]
          )}
        >
          {icon}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[length:var(--fs-14)] font-semibold text-ink truncate">
            {label}
          </span>
          <span className="text-[length:var(--fs-12)] text-ink-3 tabular-nums">
            {saved} of {target}
          </span>
        </div>
      </div>
      <Progress value={pct}>
        <ProgressTrack>
          <ProgressIndicator
            style={{ width: `${pct}%`, background: TINT_FILL[tint] }}
          />
        </ProgressTrack>
      </Progress>
      {badge ?? (
        <Badge variant="success" className="self-start">
          {pct}% complete
        </Badge>
      )}
    </div>
  )
}

export { GoalCard }
