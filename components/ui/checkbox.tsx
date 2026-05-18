"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { useReducedMotionSafe } from "@/lib/motion/use-reduced-motion-safe"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  const transition = useReducedMotionSafe({
    duration: 0.18,
    ease: [0.22, 1, 0.36, 1] as const,
  })

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "relative flex size-5 shrink-0 items-center justify-center rounded-[6px] bg-surface-2 outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-white"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
          <motion.path
            d="M2 5L4 7L8 3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={transition}
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
