"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "@/lib/utils"
import { tweenFast } from "@/lib/motion/presets"
import { useReducedMotionSafe } from "@/lib/motion/use-reduced-motion-safe"
import { popupRender } from "@/lib/motion/overlay"

function TooltipProvider({
  delay = 300,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  // ~120ms tween, 2px lift, no scale. Tooltips must feel near-instant.
  const transition = useReducedMotionSafe({ ...tweenFast, duration: 0.12 })
  return (
    <TooltipPrimitive.Portal keepMounted>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "inline-flex w-fit max-w-xs items-center gap-1.5 rounded-sm",
            "bg-ink text-ink-inv px-2.5 py-1.5 text-[length:var(--fs-12)] font-medium whitespace-nowrap",
            "origin-[var(--transform-origin)]",
            className
          )}
          render={popupRender(transition, { closedScale: 1, closedY: 2 })}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-ink data-[side=bottom]:top-1 data-[side=top]:-bottom-2.5 data-[side=left]:-right-1 data-[side=right]:-left-1" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
