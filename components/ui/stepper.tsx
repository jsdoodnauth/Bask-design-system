"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepperProps {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  className?: string
}

function Stepper({ value = 1, onChange, min = 1, max = 99, className }: StepperProps) {
  return (
    <div
      data-slot="stepper"
      className={cn("inline-flex items-stretch h-11 bg-surface-3 rounded-md overflow-hidden", className)}
      style={{ boxShadow: "var(--elev-2)" }}
    >
      <button
        type="button"
        aria-label={`Decrease quantity, currently ${value}`}
        onClick={() => onChange?.(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-11 border-0 bg-transparent cursor-pointer text-ink-2 grid place-items-center hover:bg-surface-2 active:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none"
      >
        <Minus size={16} strokeWidth={2.5} />
      </button>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="px-[14px] grid place-items-center font-bold text-[length:var(--fs-14)] border-x border-x-[color:var(--hairline)]"
      >
        {value}
      </div>
      <button
        type="button"
        aria-label={`Increase quantity, currently ${value}`}
        onClick={() => onChange?.(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-11 border-0 bg-transparent cursor-pointer text-ink-2 grid place-items-center hover:bg-surface-2 active:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none"
      >
        <Plus size={16} strokeWidth={2.5} />
      </button>
    </div>
  )
}

export { Stepper }
