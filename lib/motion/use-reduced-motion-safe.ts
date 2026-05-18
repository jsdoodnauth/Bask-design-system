"use client";

import { useReducedMotion, type Transition } from "framer-motion";

const INSTANT: Transition = { duration: 0 };

export function useReducedMotionSafe(transition: Transition): Transition {
  const shouldReduce = useReducedMotion();
  return shouldReduce ? INSTANT : transition;
}
