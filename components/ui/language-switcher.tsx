"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Popover, PopoverTrigger, PopoverContent,
} from "@/components/ui/popover"
import { Flag } from "@/components/ui/flag"

export interface LanguageOption {
  /** Locale code, e.g. "en-US". */
  code: string
  /** Display label, e.g. "English (US)". */
  label: string
  /** ISO 3166-1 alpha-2 for the flag rendering. */
  iso: string
}

interface LanguageSwitcherProps {
  trigger: React.ReactElement
  options: LanguageOption[]
  /** Currently selected locale code. */
  value?: string
  onChange?: (code: string) => void
  align?: "start" | "center" | "end"
  side?: "top" | "bottom" | "left" | "right"
  sideOffset?: number
  className?: string
}

function LanguageSwitcher({
  trigger,
  options,
  value,
  onChange,
  align = "end",
  side = "bottom",
  sideOffset = 10,
  className,
}: LanguageSwitcherProps) {
  return (
    <Popover>
      <PopoverTrigger render={trigger} />
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "min-w-[200px] p-1 bg-surface text-ink rounded-md",
          "[box-shadow:var(--elev-3)]",
          className,
        )}
      >
        {options.map((opt) => {
          const active = opt.code === value
          return (
            <button
              key={opt.code}
              type="button"
              onClick={() => onChange?.(opt.code)}
              className={cn(
                "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-sm text-left cursor-pointer outline-none",
                "text-[length:var(--fs-13)]",
                "hover:bg-surface-2 transition-[background] duration-[var(--dur-fast)] ease-[var(--ease)]",
                "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]",
                active ? "text-ink font-semibold" : "text-ink-2",
              )}
            >
              <Flag iso={opt.iso} size={14} aria-label={opt.label} />
              <span className="flex-1 min-w-0 truncate">{opt.label}</span>
              {active && <Check size={14} className="text-ink-3" />}
            </button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}

export { LanguageSwitcher }
