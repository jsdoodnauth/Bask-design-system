"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type Tint = "blue" | "green" | "amber" | "red" | "violet" | "orange" | "ink"

const TINT_CLASS: Record<Tint, string> = {
  blue:   "bg-tint-blue text-blue",
  green:  "bg-tint-green text-green",
  amber:  "bg-tint-amber text-amber",
  red:    "bg-tint-red text-red",
  violet: "bg-tint-violet text-violet",
  orange: "bg-tint-orange text-orange",
  ink:    "bg-surface-3 text-ink-2",
}

const tileVariants = cva(
  "flex items-start gap-3 min-w-0",
  {
    variants: {
      variant: {
        inline: "",
        inset:  "rounded-md bg-surface-2 p-4 [box-shadow:var(--elev-inset)]",
      },
    },
    defaultVariants: { variant: "inline" },
  }
)

const iconVariants = cva(
  "rounded-sm grid place-items-center flex-none [box-shadow:var(--elev-1)]",
  {
    variants: {
      iconSize: {
        sm: "size-9",
        md: "size-10",
        lg: "size-14",
      },
    },
    defaultVariants: { iconSize: "md" },
  }
)

interface MetricTileProps
  extends Omit<React.ComponentProps<"div">, "children">,
    VariantProps<typeof tileVariants>,
    VariantProps<typeof iconVariants> {
  icon: React.ReactNode
  tint?: Tint
  label: React.ReactNode
  value: React.ReactNode
  sub?: React.ReactNode
  badge?: React.ReactNode
}

function MetricTile({
  icon,
  tint = "blue",
  label,
  value,
  sub,
  badge,
  variant,
  iconSize,
  className,
  ...props
}: MetricTileProps) {
  return (
    <div
      data-slot="metric-tile"
      className={cn(tileVariants({ variant }), className)}
      {...props}
    >
      <div className={cn(iconVariants({ iconSize }), TINT_CLASS[tint])}>
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[length:var(--fs-12)] text-ink-3 uppercase font-bold tracking-[var(--tracking-eyebrow)]">
          {label}
        </span>
        <span className="text-[length:var(--fs-22)] font-bold text-ink leading-tight tabular-nums">
          {value}
        </span>
        {badge ? <div className="self-start mt-1">{badge}</div> : null}
        {sub ? (
          <span className="text-[length:var(--fs-12)] text-ink-3 mt-0.5">
            {sub}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export { MetricTile }
export type { MetricTileProps, Tint as MetricTileTint }
