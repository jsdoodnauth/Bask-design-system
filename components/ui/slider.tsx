"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

function Slider({ className, ...props }: SliderPrimitive.Root.Props) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn("relative flex w-full touch-none select-none items-center data-disabled:opacity-55", className)}
      {...props}
    />
  )
}

function SliderControl({ className, children, ...props }: SliderPrimitive.Control.Props) {
  return (
    <SliderPrimitive.Control
      data-slot="slider-control"
      className={cn("relative flex w-full grow items-center py-2", className)}
      {...props}
    >
      {children}
    </SliderPrimitive.Control>
  )
}

function SliderTrack({ className, children, ...props }: SliderPrimitive.Track.Props) {
  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      className={cn(
        "relative h-2 w-full grow overflow-hidden rounded-pill bg-surface-2",
        "[box-shadow:var(--elev-inset)]",
        className
      )}
      {...props}
    >
      {children}
    </SliderPrimitive.Track>
  )
}

function SliderIndicator({ className, ...props }: SliderPrimitive.Indicator.Props) {
  return (
    <SliderPrimitive.Indicator
      data-slot="slider-indicator"
      className={cn(
        "absolute h-full bg-[var(--blue)] rounded-pill",
        "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(0,0,0,0.08)]",
        className
      )}
      {...props}
    />
  )
}

function SliderThumb({ className, ...props }: SliderPrimitive.Thumb.Props) {
  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        "block size-5 shrink-0 rounded-full bg-surface-3",
        "outline-none cursor-grab active:cursor-grabbing",
        "transition-[box-shadow] duration-100",
        "focus-visible:[box-shadow:var(--elev-1),0_0_0_3px_var(--ring-color)]",
        className
      )}
      {...props}
    />
  )
}

function SliderValue({ className, ...props }: SliderPrimitive.Value.Props) {
  return (
    <SliderPrimitive.Value
      data-slot="slider-value"
      className={cn("text-[length:var(--fs-13)] tabular-nums text-ink-2", className)}
      {...props}
    />
  )
}

function SliderLabel({ className, ...props }: SliderPrimitive.Label.Props) {
  return (
    <SliderPrimitive.Label
      data-slot="slider-label"
      className={cn("text-[length:var(--fs-13)] font-medium text-ink-2", className)}
      {...props}
    />
  )
}

export {
  Slider, SliderControl, SliderTrack, SliderIndicator,
  SliderThumb, SliderValue, SliderLabel,
}
