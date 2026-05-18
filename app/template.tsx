"use client"

import { motion } from "framer-motion"

import { tweenBase } from "@/lib/motion/presets"
import { useReducedMotionSafe } from "@/lib/motion/use-reduced-motion-safe"

/**
 * Per-route remount wrapper (Next 16 template.tsx).
 *
 * One motion: fade-up. No per-section stagger at the page level —
 * component-level whileInView calls own that.
 *
 * Note on parallax: this wraps the page above <main>, so the 8px transient
 * y-translate moves all parallax-registered descendants for ~240ms after
 * navigation. In practice this is invisible because the cursor sits on the
 * just-unmounted link at navigation time, so tilt is at gravity baseline
 * and the sub-pixel shadow math has no element in the proximity cone.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const transition = useReducedMotionSafe({ ...tweenBase, duration: 0.24 })
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
