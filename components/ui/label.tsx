"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "inline-flex items-center gap-2 text-[length:var(--fs-13)] font-medium text-ink-2 leading-none select-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-55",
        "has-[+input:disabled]:opacity-55 has-[+input:disabled]:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

export { Label }
