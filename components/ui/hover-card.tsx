"use client"

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"

import { cn } from "@/lib/utils"

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
  return (
    <PreviewCardPrimitive.Portal>
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
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-[0.96] data-open:[animation-duration:160ms]",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-[0.96] data-closed:[animation-duration:120ms]",
            className
          )}
          {...props}
        >
          {children}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
