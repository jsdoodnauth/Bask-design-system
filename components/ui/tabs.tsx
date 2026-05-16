"use client"

import { createContext, useContext, useId } from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { motion, LayoutGroup } from "framer-motion"

import { cn } from "@/lib/utils"

const TabsVariantContext = createContext<"pill" | "line">("pill")

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
  const layoutId = useId()
  return (
    <TabsVariantContext.Provider value={variant}>
      <LayoutGroup id={layoutId}>
        <TabsPrimitive.List
          data-slot="tabs-list"
          data-variant={variant}
          className={cn(
            variant === "pill"
              ? "inline-flex items-center gap-0.5 rounded-md bg-surface-2 p-1"
              : "flex items-center border-b border-[color:var(--hairline)]",
            className
          )}
          {...props}
        />
      </LayoutGroup>
    </TabsVariantContext.Provider>
  )
}

function TabsTrigger({ className, children, ...props }: TabsPrimitive.Tab.Props) {
  const variant = useContext(TabsVariantContext)
  const isLine = variant === "line"

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      render={(htmlProps, state) => (
        <button
          {...htmlProps}
          className={cn(
            "relative inline-flex cursor-pointer items-center justify-center border-0 outline-none",
            "text-ink-3 transition-[color] duration-[var(--dur-fast)]",
            "hover:text-ink-2 disabled:pointer-events-none disabled:opacity-50",
            !isLine && [
              "rounded-[calc(var(--r-md)-2px)] bg-transparent px-4 py-2",
              "text-[length:var(--fs-13)] font-semibold",
              "data-active:text-ink",
            ],
            isLine && [
              "rounded-[var(--r-sm)_var(--r-sm)_0_0] bg-transparent px-5 py-[10px]",
              "text-[length:var(--fs-14)] font-medium",
              // hairline-overlap trick: active tab bleeds 1px into the border so it hides it
              "data-active:text-ink data-active:font-semibold data-active:-mb-px data-active:pb-[11px]",
            ],
            className
          )}
        >
          {!isLine && state.active && (
            <motion.span
              layoutId="pill-bg"
              aria-hidden
              className="absolute inset-0 rounded-[calc(var(--r-md)-2px)] bg-surface shadow-[var(--elev-1)]"
              transition={{ type: "spring", stiffness: 380, damping: 35 }}
            />
          )}
          {isLine && state.active && (
            <motion.span
              layoutId="groove-bg"
              aria-hidden
              className="absolute inset-0 rounded-[var(--r-sm)_var(--r-sm)_0_0] bg-surface-2 shadow-[var(--elev-inset)]"
              transition={{ type: "spring", stiffness: 380, damping: 35 }}
            />
          )}
          <span className="relative z-10">{children}</span>
        </button>
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
