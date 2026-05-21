"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface StatusDotLegendItem {
  label: React.ReactNode
  /** CSS color, typically `var(--blue)`, `var(--green)`, etc. */
  color: string
  /** Optional value shown after the label (e.g. count). */
  value?: React.ReactNode
}

interface StatusDotLegendProps extends Omit<React.ComponentProps<"div">, "children"> {
  items: StatusDotLegendItem[]
  /** Layout direction. Default "row". */
  orientation?: "row" | "column"
  /** Dot shape. Default "dot". */
  shape?: "dot" | "square" | "line"
  /** Pixel size of the indicator. Default 8. */
  size?: number
}

function StatusDotLegend({
  items, orientation = "row", shape = "dot", size = 8,
  className, ...props
}: StatusDotLegendProps) {
  return (
    <div
      className={cn(
        "flex text-[length:var(--fs-12)] text-ink-2",
        orientation === "row" ? "flex-row flex-wrap items-center gap-x-4 gap-y-1.5" : "flex-col gap-1.5",
        className,
      )}
      {...props}
    >
      {items.map((item, i) => (
        <div key={i} className="inline-flex items-center gap-1.5 min-w-0">
          <span
            aria-hidden
            className={cn(
              "shrink-0",
              shape === "dot" && "rounded-full",
              shape === "square" && "rounded-[2px]",
            )}
            style={{
              background: item.color,
              width: shape === "line" ? size * 1.5 : size,
              height: shape === "line" ? 2 : size,
              borderRadius: shape === "line" ? 2 : undefined,
            }}
          />
          <span className="truncate">{item.label}</span>
          {item.value != null && (
            <span className="ml-auto text-ink font-semibold tabular-nums">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  )
}

export { StatusDotLegend }
