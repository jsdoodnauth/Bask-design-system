"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface SectionHeadingProps extends Omit<React.ComponentProps<"div">, "title"> {
  /** Primary label (e.g. "Page Views %"). */
  title: React.ReactNode
  /** Optional small meta text on the right (e.g. "Last 30 days"). */
  meta?: React.ReactNode
  /** Optional eyebrow above the title. */
  eyebrow?: React.ReactNode
  /** Render the title as an eyebrow-style uppercase label. Default false. */
  asEyebrow?: boolean
}

function SectionHeading({
  title, meta, eyebrow, asEyebrow = false, className, ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-3",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col min-w-0">
        {eyebrow && (
          <span className="text-[length:var(--fs-12)] font-bold uppercase tracking-[var(--tracking-eyebrow)] text-ink-3">
            {eyebrow}
          </span>
        )}
        <span
          className={cn(
            "min-w-0 truncate",
            asEyebrow
              ? "text-[length:var(--fs-12)] font-bold uppercase tracking-[var(--tracking-eyebrow)] text-ink-3"
              : "text-[length:var(--fs-14)] font-semibold text-ink",
          )}
        >
          {title}
        </span>
      </div>
      {meta != null && (
        <span className="text-[length:var(--fs-12)] text-ink-3 shrink-0">{meta}</span>
      )}
    </div>
  )
}

export { SectionHeading }
