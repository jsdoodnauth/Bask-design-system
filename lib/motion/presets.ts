import type { Transition } from "framer-motion";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 38,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 30,
};

export const tweenFast: Transition = {
  duration: 0.14,
  ease: easeOutExpo,
};

export const tweenBase: Transition = {
  duration: 0.22,
  ease: easeOutExpo,
};
