"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type DeltaVariant = "success" | "danger" | "info" | "warn" | "violet" | "neutral"

interface KPIItem {
  label: React.ReactNode
  value: React.ReactNode
  delta?: React.ReactNode
  deltaVariant?: DeltaVariant
  /** When omitted, falls back to `success` (up) / `danger` (down). */
  deltaUp?: boolean
}

interface KPIStripProps extends Omit<React.ComponentProps<"div">, "children"> {
  items: readonly KPIItem[]
  /** Grid column count. Defaults to items.length. */
  columns?: number
  /** Value font size — `lg` = 22px (default), `md` = 16px (denser). */
  valueSize?: "md" | "lg"
  gap?: number
}

function KPIStrip({
  items,
  columns,
  valueSize = "lg",
  gap = 24,
  className,
  style,
  ...props
}: KPIStripProps) {
  const cols = columns ?? items.length
  const valueClass =
    valueSize === "md"
      ? "text-[length:var(--fs-16)] font-semibold"
      : "text-[length:var(--fs-22)] font-bold leading-tight"

  return (
    <div
      data-slot="kpi-strip"
      className={cn("grid", className)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap, ...style }}
      {...props}
    >
      {items.map((it, i) => {
        const variant: DeltaVariant =
          it.deltaVariant ?? (it.deltaUp === false ? "danger" : "success")
        const badgeVariant = variant === "neutral" ? undefined : variant
        return (
          <div key={i} className="flex flex-col min-w-0">
            <span className="text-[length:var(--fs-12)] text-ink-3 uppercase font-bold tracking-[var(--tracking-eyebrow)]">
              {it.label}
            </span>
            <span className={cn("text-ink tabular-nums", valueClass)}>
              {it.value}
            </span>
            {it.delta !== undefined && it.delta !== null ? (
              <Badge variant={badgeVariant} className="self-start mt-1">
                {it.delta}
              </Badge>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export { KPIStrip }
export type { KPIItem, KPIStripProps }
