"use client"

import * as React from "react"
import { ArrowUpRight, ArrowDownRight, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "flat"

interface TrendArrowProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** Numeric delta, e.g. 8.4 or -2.1. Sign drives direction unless `direction` is set. */
  value: number
  /** Force a direction. Overrides the sign of `value`. */
  direction?: Direction
  /** Override the unit shown after the number. Default "%". Pass "" to hide. */
  unit?: string
  /** Whether an upward arrow is "good". Default true (up = success, down = danger). */
  upIsGood?: boolean
  /** Show a sign prefix on the value (+ / -). Default true. */
  showSign?: boolean
  /** Icon size in px. Default 12. */
  iconSize?: number
}

function TrendArrow({
  value,
  direction,
  unit = "%",
  upIsGood = true,
  showSign = true,
  iconSize = 12,
  className,
  ...props
}: TrendArrowProps) {
  const dir: Direction = direction ?? (value > 0 ? "up" : value < 0 ? "down" : "flat")
  const positive = dir === "up" ? upIsGood : dir === "down" ? !upIsGood : null
  const tone =
    positive === true ? "text-green"
      : positive === false ? "text-red"
      : "text-ink-3"

  const Icon = dir === "up" ? ArrowUpRight : dir === "down" ? ArrowDownRight : ArrowRight
  const abs = Math.abs(value)
  const sign = showSign && dir !== "flat" ? (dir === "up" ? "+" : "−") : ""

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-[length:var(--fs-12)] font-semibold tabular-nums",
        tone,
        className,
      )}
      {...props}
    >
      <Icon size={iconSize} aria-hidden />
      {sign}{abs}{unit}
    </span>
  )
}

export { TrendArrow }
