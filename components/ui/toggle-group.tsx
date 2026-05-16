"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Toggle, toggleVariants } from "@/components/ui/toggle"

type ToggleGroupContextValue = VariantProps<typeof toggleVariants>
const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: "default",
  size: "md",
})

type ToggleGroupProps = ToggleGroupPrimitive.Props & VariantProps<typeof toggleVariants>

function ToggleGroup({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant ?? "default"}
      data-size={size ?? "md"}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-[var(--r-md)] bg-surface-2 p-1 [box-shadow:var(--elev-inset)]",
        "data-vertical:flex-col",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

type ToggleGroupItemProps = React.ComponentProps<typeof Toggle>

function ToggleGroupItem({
  className,
  variant,
  size,
  ...props
}: ToggleGroupItemProps) {
  const ctx = React.useContext(ToggleGroupContext)
  return (
    <Toggle
      data-slot="toggle-group-item"
      variant={variant ?? ctx.variant}
      size={size ?? ctx.size}
      className={cn(
        "bg-transparent data-pressed:bg-surface data-pressed:[box-shadow:var(--elev-1)]",
        className
      )}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
