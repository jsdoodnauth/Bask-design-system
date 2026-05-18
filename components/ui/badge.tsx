"use client"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useBaskTilt } from "@/lib/motion/bask-motion-provider"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-[11px] py-[5px] rounded-pill text-[length:var(--fs-13)] font-semibold whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "bg-surface-3 text-ink-2",
        success: "[--badge-hi:rgba(255,255,255,0.32)] [--badge-lo:rgba(0,0,0,0.04)] bg-green-soft text-[#1F6F47]",
        warn:    "[--badge-hi:rgba(255,255,255,0.36)] [--badge-lo:rgba(0,0,0,0.04)] bg-amber-soft text-[#8A5B0F]",
        danger:  "[--badge-hi:rgba(255,255,255,0.32)] [--badge-lo:rgba(0,0,0,0.04)] bg-red-soft text-[#8E2426]",
        info:    "[--badge-hi:rgba(255,255,255,0.32)] [--badge-lo:rgba(0,0,0,0.04)] bg-blue-soft text-[#2238B5]",
        violet:  "[--badge-hi:rgba(255,255,255,0.32)] [--badge-lo:rgba(0,0,0,0.04)] bg-violet-soft text-[#4A38B5]",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
)

type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & {
  /** Frosted-transparent variant for use over imagery / color surfaces.
   *  Combine with a state variant (success/warn/etc.) — the badge keeps the
   *  frost shell + white text, dot keeps its state color via BadgeDot's className. */
  glass?: boolean
}

function Badge({ className, variant = "neutral", glass = false, ...props }: BadgeProps) {
  const tiltRef = useBaskTilt()
  return (
    <span
      ref={tiltRef}
      data-slot="badge"
      data-variant={variant ?? "neutral"}
      data-glass={glass ? "" : undefined}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

function BadgeDot({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "size-2 rounded-full bg-ink-3 [box-shadow:inset_0_-1px_0_rgba(0,0,0,0.15)]",
        className
      )}
      {...props}
    />
  )
}

export { Badge, BadgeDot, badgeVariants }
