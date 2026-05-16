"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-[var(--r-md)] px-4 py-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 items-start text-[length:var(--fs-14)] leading-[var(--lh-body)] [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:row-span-2",
  {
    variants: {
      variant: {
        default: "bg-surface-2 text-ink [--alert-accent:var(--ink-3)]",
        info:    "bg-blue-soft text-[#2238B5] [--alert-accent:#2238B5]",
        success: "bg-green-soft text-[#1F6F47] [--alert-accent:#1F6F47]",
        warn:    "bg-amber-soft text-[#8A5B0F] [--alert-accent:#8A5B0F]",
        danger:  "bg-red-soft text-[#8E2426] [--alert-accent:#8E2426]",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

type AlertProps = React.ComponentProps<"div"> & VariantProps<typeof alertVariants>

function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      data-slot="alert"
      data-variant={variant ?? "default"}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("col-start-2 text-[length:var(--fs-13)] opacity-90", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
