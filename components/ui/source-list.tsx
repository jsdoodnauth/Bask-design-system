"use client"

import * as React from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { BrandIcon, type BrandSlug } from "@/components/ui/brand-icon"
import { Flag } from "@/components/ui/flag"
import type { StatTint } from "@/components/ui/stat"

const TINT_BG: Record<StatTint, string> = {
  blue:   "bg-tint-blue",
  green:  "bg-tint-green",
  amber:  "bg-tint-amber",
  red:    "bg-tint-red",
  violet: "bg-tint-violet",
  orange: "bg-tint-orange",
}
const TINT_INK: Record<StatTint, string> = {
  blue:   "text-blue",
  green:  "text-green",
  amber:  "text-amber",
  red:    "text-red",
  violet: "text-violet",
  orange: "text-orange",
}

export interface SourceRow {
  label: string
  /** Right-aligned primary value (e.g. visits, sessions). */
  value: React.ReactNode
  /** Delta string, e.g. "+8.4%". Drives the badge. */
  delta?: string
  deltaUp?: boolean
  /** Brand slug — renders an `@icons-pack/react-simple-icons` glyph in brand color
   *  inside a neutral tile. Takes precedence over `icon` / `initials`. */
  brand?: BrandSlug
  /** ISO 3166-1 alpha-2 country code — renders a country flag in a neutral tile.
   *  Takes precedence over `brand` / `icon` / `initials`. */
  iso?: string
  /** Custom icon node rendered in the tinted tile on the left. */
  icon?: React.ReactNode
  /** Initials shown if no icon / brand is given. */
  initials?: string
  tint?: StatTint
}

interface SourceListProps extends React.ComponentProps<"div"> {
  rows: SourceRow[]
}

function SourceList({ rows, className, ...props }: SourceListProps) {
  return (
    <div data-slot="source-list" className={cn("flex flex-col", className)} {...props}>
      {rows.map((row, i) => {
        const tint: StatTint = row.tint ?? "blue"
        const neutralTile = !!(row.brand || row.iso)
        return (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between gap-3 py-2.5",
              i > 0 && "border-t border-[color:var(--hairline)]"
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                aria-hidden
                className={cn(
                  "size-8 rounded-sm grid place-items-center flex-none font-bold text-[length:var(--fs-12)] overflow-hidden",
                  "[box-shadow:var(--elev-1)]",
                  neutralTile ? "bg-surface-3 text-ink" : cn(TINT_BG[tint], TINT_INK[tint]),
                )}
              >
                {row.iso
                  ? <Flag iso={row.iso} size={18} rounded={false} />
                  : row.brand
                    ? <BrandIcon slug={row.brand} size={16} />
                    : (row.icon ?? row.initials ?? row.label.charAt(0))}
              </div>
              <span className="text-[length:var(--fs-14)] font-medium text-ink truncate">
                {row.label}
              </span>
            </div>
            <div className="flex items-center gap-3 flex-none">
              <span className="text-[length:var(--fs-13)] text-ink-2 tabular-nums font-semibold">
                {row.value}
              </span>
              {row.delta && (
                <Badge variant={row.deltaUp ? "success" : "danger"}>
                  {row.deltaUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {row.delta}
                </Badge>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { SourceList }
