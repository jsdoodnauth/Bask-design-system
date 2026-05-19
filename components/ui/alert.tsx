"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-[var(--r-md)] px-4 py-3 " +
    "grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-1 items-start " +
    "text-[length:var(--fs-14)] leading-[var(--lh-body)] " +
    "[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:row-span-2 " +
    "[&>[data-slot=alert-icon]]:row-span-2 [&>[data-slot=alert-icon]]:self-start " +
    "[&>[data-slot=alert-actions]]:row-span-2 [&>[data-slot=alert-actions]]:col-start-3 [&>[data-slot=alert-actions]]:self-center",
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

type AlertTint = "blue" | "green" | "amber" | "red" | "violet" | "orange" | "ink"
const TINT_CLASS: Record<AlertTint, string> = {
  blue:   "bg-tint-blue text-blue",
  green:  "bg-tint-green text-green",
  amber:  "bg-tint-amber text-amber",
  red:    "bg-tint-red text-red",
  violet: "bg-tint-violet text-violet",
  orange: "bg-tint-orange text-orange",
  ink:    "bg-surface-3 text-ink-2",
}

interface AlertIconProps extends React.ComponentProps<"div"> {
  tint?: AlertTint
  size?: "sm" | "md" | "lg"
}

function AlertIcon({
  className,
  tint = "amber",
  size = "md",
  children,
  ...props
}: AlertIconProps) {
  const sizeClass = size === "sm" ? "size-9" : size === "lg" ? "size-14" : "size-10"
  return (
    <div
      data-slot="alert-icon"
      className={cn(
        "rounded-sm grid place-items-center flex-none [box-shadow:var(--elev-1)]",
        sizeClass,
        TINT_CLASS[tint],
        className
      )}
      {...props}
    >
      {children}
    </div>
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

function AlertActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

export {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertActions,
  alertVariants,
}
