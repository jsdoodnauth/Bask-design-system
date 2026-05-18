"use client"

import * as React from "react"
import { Sun, Moon, ChevronDown, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

type Tone = "warm" | "daylight" | "blue" | "indigo" | "amber" | "emerald"
type Mode = "light" | "dark"

const TONES: { value: Tone; label: string; swatch: string }[] = [
  { value: "warm",     label: "Warm",     swatch: "#EFE7D8" },
  { value: "daylight", label: "Daylight", swatch: "#EFEFEC" },
  { value: "blue",     label: "Blue",     swatch: "#E4ECF6" },
  { value: "indigo",   label: "Indigo",   swatch: "#E7E2F4" },
  { value: "amber",    label: "Amber",    swatch: "#F4E7C5" },
  { value: "emerald",  label: "Emerald",  swatch: "#DEEAE0" },
]

function readFromDom(): { tone: Tone; mode: Mode } {
  if (typeof document === "undefined") return { tone: "warm", mode: "light" }
  const attr = document.documentElement.getAttribute("data-theme")
  if (!attr) return { tone: "warm", mode: "light" }
  const [tone, mode] = attr.split("-") as [Tone, Mode]
  return { tone, mode }
}

function apply({ tone, mode }: { tone: Tone; mode: Mode }) {
  // warm-light is the implicit default — represented by the absence of the attr.
  if (tone === "warm" && mode === "light") {
    document.documentElement.removeAttribute("data-theme")
  } else {
    document.documentElement.setAttribute("data-theme", `${tone}-${mode}`)
  }
  try {
    localStorage.setItem("bask-tone", tone)
    localStorage.setItem("bask-mode", mode)
  } catch {
    // Storage may be blocked (private mode etc.) — fail silent.
  }
}

/** Theme picker — tone dropdown + light/dark toggle.
 *  Pre-paint script in app/layout.tsx already sets `data-theme` from
 *  localStorage to avoid FOUC; this just reads/writes that same state. */
function ThemePicker({ className }: { className?: string }) {
  // Don't read DOM during SSR/initial render — would mismatch the server output
  // when the user has a non-default theme persisted. Render a hidden shell
  // until mount, then sync from the DOM.
  const [mounted, setMounted] = React.useState(false)
  const [theme, setTheme] = React.useState<{ tone: Tone; mode: Mode }>({ tone: "warm", mode: "light" })

  React.useEffect(() => {
    setTheme(readFromDom())
    setMounted(true)
  }, [])

  const update = React.useCallback((next: Partial<{ tone: Tone; mode: Mode }>) => {
    setTheme((prev) => {
      const merged = { ...prev, ...next }
      apply(merged)
      return merged
    })
  }, [])

  const currentTone = TONES.find((t) => t.value === theme.tone) ?? TONES[0]
  const nextModeLabel = theme.mode === "dark" ? "Switch to light" : "Switch to dark"

  return (
    <div
      data-slot="theme-picker"
      className={cn("flex items-center gap-2", !mounted && "invisible", className)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="default" size="sm" className="flex-1 justify-start gap-2" />}
        >
          <span
            aria-hidden
            className="size-3.5 rounded-full flex-none [box-shadow:inset_0_0_0_1px_var(--hairline)]"
            style={{ background: currentTone.swatch }}
          />
          <span className="flex-1 text-left">{currentTone.label}</span>
          <ChevronDown size={12} className="text-ink-3 flex-none" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[var(--anchor-width)]">
          {TONES.map((t) => {
            const isActive = t.value === theme.tone
            return (
              <DropdownMenuItem key={t.value} onClick={() => update({ tone: t.value })}>
                <span
                  aria-hidden
                  className="size-3.5 rounded-full flex-none [box-shadow:inset_0_0_0_1px_var(--hairline)]"
                  style={{ background: t.swatch }}
                />
                <span className="flex-1">{t.label}</span>
                {isActive && <Check size={12} className="text-ink-3" />}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="default"
        size="icon-sm"
        aria-label={nextModeLabel}
        onClick={() => update({ mode: theme.mode === "dark" ? "light" : "dark" })}
      >
        {theme.mode === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      </Button>
    </div>
  )
}

export { ThemePicker }
