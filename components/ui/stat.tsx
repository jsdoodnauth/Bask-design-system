"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useBaskTilt } from "@/lib/motion/bask-motion-provider"

type StatTint = "blue" | "green" | "amber" | "red" | "violet" | "orange"

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

interface StatProps extends React.ComponentProps<"div"> {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
  tint?: StatTint
}

function Stat({ label, value, icon, tint, className, ...props }: StatProps) {
  const tiltRef = useBaskTilt()
  return (
    <div
      ref={tiltRef}
      data-slot="stat"
      className={cn("bg-surface rounded-md py-[14px] px-4 flex items-center gap-3", className)}
      {...props}
    >
      {icon !== undefined && (
        <div
          data-slot="stat-icon"
          className={cn(
            "w-[38px] h-[38px] rounded-sm grid place-items-center flex-none bg-surface-3",
            "[box-shadow:var(--elev-1)]",
            tint && TINT_BG[tint],
            tint && TINT_INK[tint],
          )}
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col min-w-0">
        <span className="text-[length:var(--fs-12)] font-bold uppercase tracking-[var(--tracking-eyebrow)] text-ink-3">
          {label}
        </span>
        <span className="text-[length:var(--fs-22)] font-bold text-ink leading-tight">
          {value}
        </span>
      </div>
    </div>
  )
}

export { Stat }
export type { StatTint }
