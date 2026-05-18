"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useBaskTilt } from "@/lib/motion/bask-motion-provider"

function Card({
  className,
  hoverLift = false,
  glass = false,
  glassLight = false,
  ref,
  ...props
}: React.ComponentProps<"div"> & {
  hoverLift?: boolean
  /** Frosted-transparent variant for use over imagery / color surfaces. */
  glass?: boolean
  /** When combined with `glass`, brightens the frost for pale backdrops. */
  glassLight?: boolean
}) {
  const tiltRef = useBaskTilt()
  return (
    <div
      ref={(el) => {
        tiltRef(el)
        if (typeof ref === "function") ref(el)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el
      }}
      data-slot="card"
      data-glass={glass ? "" : undefined}
      data-glass-light={glass && glassLight ? "" : undefined}
      className={cn(
        "rounded-lg p-5 overflow-hidden",
        !glass && "bg-surface text-ink",
        hoverLift && "hover-lift",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex justify-between items-center mb-3.5", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-[length:var(--fs-16)] font-semibold tracking-[-0.01em]", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-[length:var(--fs-13)] text-ink-2", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("ml-auto", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center pt-4 mt-4 border-t border-[color:var(--hairline)]", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
