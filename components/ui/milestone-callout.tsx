import * as React from "react"

import { cn } from "@/lib/utils"

export type MilestoneTint = "blue" | "green" | "amber" | "red" | "violet" | "orange"

interface MilestoneCalloutProps extends React.ComponentProps<"div"> {
  icon: React.ReactNode
  tint?: MilestoneTint
  /** Body copy explaining the milestone. */
  message: React.ReactNode
  /** The numeric headline (e.g. "29.4k"). */
  value: React.ReactNode
  /** Eyebrow label rendered next to the value (e.g. "Subscribers"). */
  unit?: React.ReactNode
  /** Optional CTA placed below the value. */
  action?: React.ReactNode
  /** Icon-tile dimension in px. Defaults to 56. */
  iconSize?: number
}

const TINT_CLASSES: Record<MilestoneTint, string> = {
  blue:   "bg-[color:var(--tint-blue)] text-blue",
  green:  "bg-[color:var(--tint-green)] text-green",
  amber:  "bg-[color:var(--tint-amber)] text-amber",
  red:    "bg-[color:var(--tint-red)] text-red",
  violet: "bg-[color:var(--tint-violet)] text-violet",
  orange: "bg-[color:var(--tint-orange)] text-orange",
}

function MilestoneCallout({
  icon,
  tint = "amber",
  message,
  value,
  unit,
  action,
  iconSize = 56,
  className,
  ...props
}: MilestoneCalloutProps) {
  return (
    <div
      data-slot="milestone-callout"
      className={cn("flex items-start gap-4", className)}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          "rounded-md grid place-items-center flex-none [box-shadow:var(--elev-1)]",
          TINT_CLASSES[tint]
        )}
        style={{ width: iconSize, height: iconSize }}
      >
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[length:var(--fs-13)] text-ink-2 leading-snug mb-2">
          {message}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-[length:var(--fs-28)] font-bold text-ink tabular-nums leading-none">
            {value}
          </span>
          {unit && (
            <span className="text-[length:var(--fs-12)] text-ink-3 uppercase font-bold tracking-[var(--tracking-eyebrow)]">
              {unit}
            </span>
          )}
        </div>
        {action && <div className="mt-3 flex">{action}</div>}
      </div>
    </div>
  )
}

export { MilestoneCallout }
