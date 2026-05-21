"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface EmptyStateProps extends Omit<React.ComponentProps<"div">, "title"> {
  /** Inline illustration / icon. A small SVG or lucide icon works well at ~64–96px. */
  illustration?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** Action row — typically a primary `<Button>` plus optional secondary. */
  actions?: React.ReactNode
}

function EmptyState({
  illustration, title, description, actions, className, ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center gap-3 py-8 px-6",
        className,
      )}
      {...props}
    >
      {illustration && (
        <div className="text-ink-3 [&_svg]:size-16 mb-1">{illustration}</div>
      )}
      <div className="flex flex-col gap-1 max-w-sm">
        <h3 className="text-[length:var(--fs-15)] font-semibold text-ink">{title}</h3>
        {description && (
          <p className="text-[length:var(--fs-13)] text-ink-3">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 mt-1">{actions}</div>}
    </div>
  )
}

export { EmptyState }
