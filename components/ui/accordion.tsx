"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { motion, type HTMLMotionProps } from "framer-motion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { tweenBase } from "@/lib/motion/presets"
import { useReducedMotionSafe } from "@/lib/motion/use-reduced-motion-safe"

function Accordion({ ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-[var(--hairline)] last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-3 py-4 text-left text-[length:var(--fs-15)] font-medium text-ink",
          "outline-none cursor-pointer",
          "transition-colors hover:text-ink-2",
          "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)] focus-visible:rounded-[var(--r-xs)]",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="size-4 shrink-0 text-ink-3 transition-transform duration-200 group-data-[panel-open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionPanel({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  const transition = useReducedMotionSafe(tweenBase)

  const render = React.useCallback(
    (renderProps: React.HTMLAttributes<HTMLDivElement>, state: { open: boolean }) => (
      <motion.div
        {...(renderProps as HTMLMotionProps<"div">)}
        initial={false}
        animate={{
          height: state.open ? "auto" : 0,
          opacity: state.open ? 1 : 0,
        }}
        transition={transition}
        style={{ overflow: "hidden" }}
      />
    ),
    [transition]
  )

  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn(
        "text-[length:var(--fs-14)] text-ink-2 leading-[var(--lh-body)]",
        className
      )}
      render={render}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionPanel }
