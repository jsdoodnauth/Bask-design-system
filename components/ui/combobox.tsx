"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Combobox<Value, Multiple extends boolean | undefined = false>(
  props: ComboboxPrimitive.Root.Props<Value, Multiple>
) {
  return <ComboboxPrimitive.Root {...props} />
}

function ComboboxInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="input"
      className={cn(
        "h-9 w-full rounded-[var(--r-sm)] bg-surface-2 px-3 text-[length:var(--fs-14)] text-ink outline-none placeholder:text-ink-3",
        className
      )}
      {...props}
    />
  )
}

function ComboboxInputGroup({
  className,
  ...props
}: ComboboxPrimitive.InputGroup.Props) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="combobox-input-group"
      className={cn(
        "relative flex items-center gap-1 rounded-[var(--r-sm)] bg-surface-2 pr-2",
        "[box-shadow:var(--elev-inset)]",
        "has-[input:focus]:bg-surface-3 has-[input:focus]:[box-shadow:var(--elev-inset),0_0_0_3px_var(--ring-color)]",
        className
      )}
      {...props}
    />
  )
}

function ComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-[var(--r-xs)] text-ink-3",
        "hover:text-ink hover:bg-surface-3 transition-colors cursor-pointer outline-none",
        "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]",
        className
      )}
      {...props}
    >
      {children ?? <ChevronDownIcon className="size-4" />}
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, children, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-[var(--r-xs)] text-ink-3",
        "hover:text-ink hover:bg-surface-3 transition-colors cursor-pointer outline-none",
        className
      )}
      {...props}
    >
      {children ?? <XIcon className="size-4" />}
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

type ComboboxContentProps = ComboboxPrimitive.Popup.Props & {
  side?: ComboboxPrimitive.Positioner.Props["side"]
  align?: ComboboxPrimitive.Positioner.Props["align"]
  sideOffset?: number
}

function ComboboxContent({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 6,
  children,
  ...props
}: ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn(
            "min-w-[var(--anchor-width)] max-h-[min(var(--available-height),320px)] overflow-hidden rounded-[var(--r-md)] bg-surface text-ink outline-none",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-[0.98] data-open:[animation-duration:140ms]",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:[animation-duration:100ms]",
            className
          )}
          {...props}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn("max-h-[300px] overflow-y-auto p-1", className)}
      {...props}
    />
  )
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn("py-6 text-center text-[length:var(--fs-13)] text-ink-3", className)}
      {...props}
    />
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn("py-1", className)}
      {...props}
    />
  )
}

function ComboboxGroupLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-group-label"
      className={cn("px-2 py-1.5 text-[length:var(--fs-12)] font-semibold uppercase tracking-wide text-ink-3", className)}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-[var(--r-xs)] px-2 py-1.5 text-[length:var(--fs-14)] text-ink outline-none",
        "data-highlighted:bg-surface-2 data-disabled:opacity-55 data-disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      <ComboboxPrimitive.ItemIndicator
        data-slot="combobox-item-indicator"
        className="flex size-4 items-center justify-center text-[var(--blue)]"
      >
        <CheckIcon className="size-4" />
      </ComboboxPrimitive.ItemIndicator>
      <span className="flex-1">{children}</span>
    </ComboboxPrimitive.Item>
  )
}

export {
  Combobox,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxValue,
  ComboboxContent,
  ComboboxList,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxItem,
}
