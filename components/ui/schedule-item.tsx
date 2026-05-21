import * as React from "react"

import { cn } from "@/lib/utils"

export type ScheduleTint = "blue" | "green" | "amber" | "red" | "violet" | "orange"

interface ScheduleItemProps extends Omit<React.ComponentProps<"div">, "title"> {
  start: React.ReactNode
  /** Optional end time, rendered subtly under `start`. */
  end?: React.ReactNode
  tint?: ScheduleTint
  title: React.ReactNode
  /** Attendees / owner / description line. */
  who?: React.ReactNode
  /** Override the time-block width in px. Defaults to 80. */
  timeWidth?: number
}

const TINT_DOT: Record<ScheduleTint, string> = {
  blue:   "bg-blue",
  green:  "bg-green",
  amber:  "bg-amber",
  red:    "bg-red",
  violet: "bg-violet",
  orange: "bg-orange",
}

function ScheduleItem({
  start,
  end,
  tint = "blue",
  title,
  who,
  timeWidth = 80,
  className,
  style,
  ...props
}: ScheduleItemProps) {
  return (
    <div
      data-slot="schedule-item"
      className={cn(
        "grid gap-3 items-center py-3 grid-cols-[var(--si-time)_auto_1fr]",
        className
      )}
      style={{ ["--si-time" as never]: `${timeWidth}px`, ...style }}
      {...props}
    >
      <div className="font-mono text-[length:var(--fs-13)] text-ink-2 tabular-nums">
        <div>{start}</div>
        {end && <div className="text-ink-3 text-[11px]">{end}</div>}
      </div>
      <span
        aria-hidden
        className={cn("size-2 rounded-full flex-none", TINT_DOT[tint])}
      />
      <div className="flex flex-col min-w-0">
        <strong className="text-[length:var(--fs-14)] truncate">{title}</strong>
        {who && (
          <span className="text-[length:var(--fs-12)] text-ink-3 truncate">
            {who}
          </span>
        )}
      </div>
    </div>
  )
}

export { ScheduleItem }
