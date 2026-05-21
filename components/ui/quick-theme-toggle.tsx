"use client"

import * as React from "react"
import { Sun, Moon } from "lucide-react"

import { cn } from "@/lib/utils"

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
  if (tone === "warm" && mode === "light") {
    document.documentElement.removeAttribute("data-theme")
  } else {
    document.documentElement.setAttribute("data-theme", `${tone}-${mode}`)
  }
  try {
    localStorage.setItem("bask-tone", tone)
    localStorage.setItem("bask-mode", mode)
  } catch {
    // Storage may be blocked — fail silent.
  }
}

/** Compact one-row tone-swatch + light/dark toggle, for use inside the
 *  user-pill dropdown. Reads the same data-theme/localStorage as ThemePicker. */
function QuickThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false)
  const [theme, setTheme] = React.useState<{ tone: Tone; mode: Mode }>({ tone: "warm", mode: "light" })

  React.useEffect(() => {
    setTheme(readFromDom())
    setMounted(true)
  }, [])

  const update = (next: Partial<{ tone: Tone; mode: Mode }>) => {
    setTheme((prev) => {
      const merged = { ...prev, ...next }
      apply(merged)
      return merged
    })
  }

  return (
    <div
      data-slot="quick-theme-toggle"
      className={cn(
        "flex items-center gap-1 px-2 py-1.5",
        !mounted && "invisible",
        className,
      )}
    >
      {TONES.map((t) => {
        const active = t.value === theme.tone
        return (
          <button
            key={t.value}
            type="button"
            aria-label={`${t.label} tone`}
            aria-pressed={active}
            onClick={() => update({ tone: t.value })}
            className={cn(
              "size-5 rounded-full cursor-pointer outline-none",
              "[box-shadow:inset_0_0_0_1px_var(--hairline)]",
              active && "[box-shadow:inset_0_0_0_1px_var(--hairline),0_0_0_2px_var(--ring-color)]",
              "transition-[box-shadow,transform] duration-[var(--dur-fast)] ease-[var(--ease)]",
              "hover:scale-110",
              "focus-visible:[box-shadow:inset_0_0_0_1px_var(--hairline),0_0_0_3px_var(--ring-color)]",
            )}
            style={{ background: t.swatch }}
          />
        )
      })}
      <button
        type="button"
        aria-label={theme.mode === "dark" ? "Switch to light" : "Switch to dark"}
        onClick={() => update({ mode: theme.mode === "dark" ? "light" : "dark" })}
        className={cn(
          "ml-auto size-6 grid place-items-center rounded-sm bg-surface-2 text-ink-2 cursor-pointer outline-none",
          "hover:bg-surface-3 hover:text-ink",
          "transition-[background,color] duration-[var(--dur-fast)] ease-[var(--ease)]",
          "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]",
        )}
      >
        {theme.mode === "dark" ? <Sun size={12} /> : <Moon size={12} />}
      </button>
    </div>
  )
}

export { QuickThemeToggle }
