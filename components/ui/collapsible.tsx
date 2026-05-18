"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { motion, type HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"
import { tweenBase } from "@/lib/motion/presets"
import { useReducedMotionSafe } from "@/lib/motion/use-reduced-motion-safe"

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
  return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
}

function CollapsiblePanel({
  className,
  children,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
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
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-panel"
      className={cn(className)}
      render={render}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Panel>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsiblePanel }
