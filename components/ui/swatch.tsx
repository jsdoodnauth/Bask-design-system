"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useBaskTilt } from "@/lib/motion/bask-motion-provider"

interface SwatchProps extends React.ComponentProps<"button"> {
  color: string
  active?: boolean
}

function Swatch({ color, active = false, className, style, ...props }: SwatchProps) {
  const tiltRef = useBaskTilt()
  return (
    <button
      ref={tiltRef}
      type="button"
      data-slot="swatch"
      data-active={active || undefined}
      aria-pressed={active}
      className={cn("w-8 h-8 rounded-full cursor-pointer border-0 p-0 flex-none", className)}
      style={{ backgroundColor: color, ...style }}
      {...props}
    />
  )
}

export { Swatch }
