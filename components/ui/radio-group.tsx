"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { useReducedMotionSafe } from "@/lib/motion/use-reduced-motion-safe"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  const transition = useReducedMotionSafe({
    type: "spring",
    visualDuration: 0.18,
    bounce: 0.3,
  })

  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "relative flex aspect-square size-5 shrink-0 rounded-full bg-surface-2 outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-full items-center justify-center"
      >
        <motion.span
          className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={transition}
        />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
