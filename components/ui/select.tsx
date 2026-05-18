"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from "lucide-react"
import { tweenFast } from "@/lib/motion/presets"
import { useReducedMotionSafe } from "@/lib/motion/use-reduced-motion-safe"
import { popupRender } from "@/lib/motion/overlay"

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("p-1", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  children,
  ...props
}: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex w-full items-center justify-between gap-2",
        "bg-surface-2 rounded-md border-0 px-[14px] py-[11px]",
        "text-[length:var(--fs-14)] text-ink font-[inherit] cursor-pointer outline-none select-none",
        "data-placeholder:text-ink-3",
        "disabled:cursor-not-allowed disabled:opacity-55",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon render={
        <ChevronDownIcon className="size-4 text-ink-3 pointer-events-none shrink-0" />
      } />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger">) {
  const transition = useReducedMotionSafe(tweenFast)
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "relative isolate z-50 max-h-[var(--available-height)] w-[var(--anchor-width)] min-w-36",
            "bg-surface rounded-md p-1.5 text-ink overflow-x-hidden overflow-y-auto",
            "origin-[var(--transform-origin)]",
            className
          )}
          render={popupRender(transition, { closedScale: 0.95 })}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-2 py-1 text-[length:var(--fs-12)] font-bold tracking-[var(--tracking-eyebrow)] uppercase text-ink-3", className)}
      {...props}
    />
  )
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-sm py-2 pr-8 pl-2.5",
        "text-[length:var(--fs-14)] text-ink outline-none select-none",
        "hover:bg-surface-2 focus:bg-surface-2",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator render={
        <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
      }>
        <CheckIcon className="size-3.5" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-[color:var(--hairline)]", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn("flex w-full cursor-default items-center justify-center bg-surface py-1", className)}
      {...props}
    >
      <ChevronUpIcon className="size-4 text-ink-3" />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn("flex w-full cursor-default items-center justify-center bg-surface py-1", className)}
      {...props}
    >
      <ChevronDownIcon className="size-4 text-ink-3" />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
  SelectScrollDownButton, SelectScrollUpButton, SelectSeparator,
  SelectTrigger, SelectValue,
}
