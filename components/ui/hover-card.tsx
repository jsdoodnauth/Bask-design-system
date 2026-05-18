"use client"

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"

import { cn } from "@/lib/utils"
import { tweenBase } from "@/lib/motion/presets"
import { useReducedMotionSafe } from "@/lib/motion/use-reduced-motion-safe"
import { popupRender } from "@/lib/motion/overlay"

function HoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
  return <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
}

type HoverCardContentProps = PreviewCardPrimitive.Popup.Props & {
  side?: PreviewCardPrimitive.Positioner.Props["side"]
  align?: PreviewCardPrimitive.Positioner.Props["align"]
  sideOffset?: number
  alignOffset?: number
}

function HoverCardContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset = 0,
  children,
  ...props
}: HoverCardContentProps) {
  // 160ms fade + small scale, no spring — same vocabulary as popover.
  const transition = useReducedMotionSafe({ ...tweenBase, duration: 0.16 })
  return (
    <PreviewCardPrimitive.Portal keepMounted>
      <PreviewCardPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            "z-50 w-64 rounded-[var(--r-md)] bg-surface text-ink p-4 outline-none",
            "origin-[var(--transform-origin)]",
            className
          )}
          render={popupRender(transition, { closedScale: 0.96 })}
          {...props}
        >
          {children}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
