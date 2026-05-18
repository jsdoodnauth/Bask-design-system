"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { motion, type HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"
import { useReducedMotionSafe } from "@/lib/motion/use-reduced-motion-safe"

// Track width 46px, thumb size 20px, side inset 3px → travel = 46-20-3-3 = 20px
const THUMB_TRAVEL_PX = 20

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  const transition = useReducedMotionSafe({
    type: "spring",
    stiffness: 500,
    damping: 32,
  })

  const renderThumb = React.useCallback(
    (
      thumbProps: React.HTMLAttributes<HTMLSpanElement>,
      state: { checked: boolean }
    ) => (
      <motion.span
        {...(thumbProps as HTMLMotionProps<"span">)}
        initial={false}
        animate={{ x: state.checked ? THUMB_TRAVEL_PX : 0 }}
        transition={transition}
      />
    ),
    [transition]
  )

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "relative inline-flex h-[26px] w-[46px] shrink-0 items-center rounded-pill bg-surface-2 outline-none cursor-pointer",
        "data-checked:bg-blue",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none absolute size-5 rounded-full bg-surface-3 left-[3px]",
          "data-checked:bg-white"
        )}
        render={renderThumb}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
