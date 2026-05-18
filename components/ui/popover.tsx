"use client"

import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"
import { tweenBase } from "@/lib/motion/presets"
import { useReducedMotionSafe } from "@/lib/motion/use-reduced-motion-safe"
import { popupRender } from "@/lib/motion/overlay"

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverAnchor({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-anchor" render={<span />} {...props} />
}

type PopoverContentProps = PopoverPrimitive.Popup.Props & {
  side?: PopoverPrimitive.Positioner.Props["side"]
  align?: PopoverPrimitive.Positioner.Props["align"]
  sideOffset?: number
  alignOffset?: number
}

function PopoverContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset = 0,
  children,
  ...props
}: PopoverContentProps) {
  // 180ms fade + 4px lift, no spring (popovers feel sluggish with springs).
  const transition = useReducedMotionSafe({ ...tweenBase, duration: 0.18 })
  return (
    <PopoverPrimitive.Portal keepMounted>
      <PopoverPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "z-50 min-w-[8rem] rounded-[var(--r-md)] bg-surface text-ink p-4 outline-none",
            className
          )}
          render={popupRender(transition, { closedScale: 1, closedY: 4 })}
          {...props}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverClose({ ...props }: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />
}

export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent, PopoverClose }
