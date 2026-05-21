import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Flag } from "@/components/ui/flag"

interface CountryRowProps extends React.ComponentProps<"div"> {
  /** ISO 3166-1 alpha-2 code. Preferred over `flag` — renders consistently
   *  across platforms via `flag-icons` CSS. */
  iso?: string
  /** Flag emoji or any flag-icon node. Used when `iso` is not provided. */
  flag?: React.ReactNode
  name: React.ReactNode
  /** Visit / order / revenue count for this country. */
  value: React.ReactNode
  /** Delta percentage, rendered in the right-aligned Badge. */
  delta?: React.ReactNode
  /** Controls Badge tint — `true` (default) = success, `false` = danger. Ignored when `delta` is omitted. */
  deltaUp?: boolean
  /** Override the auto-generated Badge entirely. */
  badge?: React.ReactNode
}

function CountryRow({
  iso,
  flag,
  name,
  value,
  delta,
  deltaUp = true,
  badge,
  className,
  ...props
}: CountryRowProps) {
  return (
    <div
      data-slot="country-row"
      className={cn("flex items-center gap-3 min-w-0", className)}
      {...props}
    >
      {iso ? (
        <Flag iso={iso} size={20} />
      ) : (
        <span aria-hidden className="text-[22px] leading-none flex-none">
          {flag}
        </span>
      )}
      <div className="flex flex-col min-w-0">
        <span className="text-[length:var(--fs-13)] font-medium text-ink truncate">
          {name}
        </span>
        <span className="text-[length:var(--fs-12)] text-ink-3 tabular-nums">
          {value}
        </span>
      </div>
      {(badge || delta) && (
        <div className="ml-auto flex-none">
          {badge ?? (
            <Badge variant={deltaUp ? "success" : "danger"}>{delta}</Badge>
          )}
        </div>
      )}
    </div>
  )
}

export { CountryRow }
