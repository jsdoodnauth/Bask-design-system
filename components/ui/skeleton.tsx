"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        "rounded-[var(--r-xs)] bg-surface-2 animate-pulse motion-reduce:animate-none",
        "[box-shadow:var(--elev-inset)]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
