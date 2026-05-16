"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs flex gap-2 data-horizontal:flex-col", className)}
      {...props}
    />
  )
}

/** Pill-style segmented control (default). Pass variant="line" for groove tabs. */
function TabsList({
  className,
  variant = "pill",
  ...props
}: TabsPrimitive.List.Props & { variant?: "pill" | "line" }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        variant === "pill"
          ? "inline-flex items-center gap-0.5 p-1 rounded-md bg-surface-2"
          : "flex items-center border-b border-[color:var(--hairline)] bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        // Pill variant base
        "relative inline-flex items-center justify-center px-4 py-2 rounded-[calc(var(--r-md)-2px)]",
        "text-[length:var(--fs-13)] font-semibold cursor-pointer border-0 bg-transparent outline-none",
        "text-ink-3 transition-[background,color,box-shadow] duration-[var(--dur-fast)]",
        "hover:text-ink-2",
        // Active pill
        "data-active:bg-surface data-active:text-ink",
        // Line (groove) variant base
        "in-[[data-variant=line]]:rounded-[var(--r-sm)_var(--r-sm)_0_0] in-[[data-variant=line]]:px-5 in-[[data-variant=line]]:py-[10px]",
        "in-[[data-variant=line]]:text-[length:var(--fs-14)] in-[[data-variant=line]]:font-medium",
        // Line active: inset shadow, background, overlap the hairline
        "in-[[data-variant=line]]:data-active:bg-surface-2 in-[[data-variant=line]]:data-active:text-ink in-[[data-variant=line]]:data-active:font-semibold",
        "in-[[data-variant=line]]:data-active:shadow-[var(--elev-inset)] in-[[data-variant=line]]:data-active:-mb-px in-[[data-variant=line]]:data-active:pb-[11px]",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
