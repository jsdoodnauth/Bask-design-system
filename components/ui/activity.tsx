import * as React from "react"
import { cn } from "@/lib/utils"

/** Container for a timeline of activity events. Hairlines between items
 *  are handled by the `[data-slot="activity-item"] + ...` rule in globals.css. */
function Activity({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="activity"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

interface ActivityItemProps extends React.ComponentProps<"div"> {
  /** Leading element — typically an Avatar or icon tile. */
  avatar?: React.ReactNode
  /** Relative timestamp, e.g. "2 hours ago". */
  time?: React.ReactNode
}

function ActivityItem({ avatar, time, children, className, ...props }: ActivityItemProps) {
  return (
    <div
      data-slot="activity-item"
      className={cn("flex items-start gap-3 py-3", className)}
      {...props}
    >
      {avatar && <div className="flex-none">{avatar}</div>}
      <div className="flex-1 min-w-0">
        <div className="text-[length:var(--fs-14)] text-ink leading-snug">{children}</div>
        {time && (
          <div className="text-[length:var(--fs-12)] text-ink-3 mt-0.5">{time}</div>
        )}
      </div>
    </div>
  )
}

export { Activity, ActivityItem }
