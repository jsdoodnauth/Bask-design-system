"use client"

import * as React from "react"
import { Play, Pause } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface TimerDisplayProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Initial seconds. Default 0. Used when uncontrolled. */
  initialSeconds?: number
  /** Controlled mode — pass current seconds and `onSecondsChange`. */
  seconds?: number
  onSecondsChange?: (next: number) => void
  /** Controlled running state. If omitted, the component manages its own. */
  running?: boolean
  onRunningChange?: (next: boolean) => void
  /** Hide the toggle button. */
  hideToggle?: boolean
  /** Label for the start button. Default "Start tracker". */
  startLabel?: React.ReactNode
  /** Label for the pause button. Default "Pause". */
  pauseLabel?: React.ReactNode
  /** Variant for the toggle button. Default "primary". */
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  /** Custom button size. Default "sm". */
  buttonSize?: React.ComponentProps<typeof Button>["size"]
}

function formatHMS(total: number) {
  const t = Math.max(0, Math.floor(total))
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const s = t % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

function TimerDisplay({
  initialSeconds = 0,
  seconds,
  onSecondsChange,
  running,
  onRunningChange,
  hideToggle = false,
  startLabel = "Start tracker",
  pauseLabel = "Pause",
  buttonVariant = "primary",
  buttonSize = "sm",
  className,
  ...props
}: TimerDisplayProps) {
  const isControlledSeconds = seconds !== undefined
  const [internalSeconds, setInternalSeconds] = React.useState(initialSeconds)
  const currentSeconds = isControlledSeconds ? seconds! : internalSeconds

  const isControlledRunning = running !== undefined
  const [internalRunning, setInternalRunning] = React.useState(false)
  const isRunning = isControlledRunning ? running! : internalRunning

  React.useEffect(() => {
    if (!isRunning) return
    const id = window.setInterval(() => {
      if (isControlledSeconds) {
        onSecondsChange?.((seconds ?? 0) + 1)
      } else {
        setInternalSeconds((v) => v + 1)
      }
    }, 1000)
    return () => window.clearInterval(id)
  }, [isRunning, isControlledSeconds, seconds, onSecondsChange])

  const toggle = () => {
    const next = !isRunning
    if (isControlledRunning) onRunningChange?.(next)
    else setInternalRunning(next)
  }

  return (
    <div
      data-slot="timer-display"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      <span className="font-mono font-bold tabular-nums text-[length:var(--fs-28)] text-ink leading-tight">
        {formatHMS(currentSeconds)}
      </span>
      {!hideToggle && (
        <Button variant={buttonVariant} size={buttonSize} onClick={toggle} className="self-start">
          {isRunning ? <Pause size={14} /> : <Play size={14} />}
          {isRunning ? pauseLabel : startLabel}
        </Button>
      )}
    </div>
  )
}

export { TimerDisplay }
