"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Transition } from "framer-motion";

type RenderState = { open: boolean };
type RenderProps = React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
};

/**
 * Backdrop render prop — opacity-only fade.
 * Pair with `<Portal keepMounted>` so the element stays in the DOM and the
 * exit animation can play.
 */
export function backdropRender(transition: Transition) {
  return (props: RenderProps, state: RenderState) => (
    <motion.div
      {...(props as HTMLMotionProps<"div">)}
      initial={false}
      animate={{ opacity: state.open ? 1 : 0 }}
      transition={transition}
    />
  );
}

type PopupOptions = {
  /** Scale value when closed. Default 0.96. Set to 1 to disable. */
  closedScale?: number;
  /** Pixel y-offset when closed (e.g. 4 for popover lift). Default 0. */
  closedY?: number;
};

/**
 * Popup render prop — fade + optional scale + optional y.
 * Pair with `<Portal keepMounted>`. Origin-aware scale works because Base UI
 * sets `--transform-origin` on the popup and the popup's own className keeps
 * `origin-[var(--transform-origin)]`.
 */
export function popupRender(transition: Transition, options?: PopupOptions) {
  const closedScale = options?.closedScale ?? 0.96;
  const closedY = options?.closedY ?? 0;
  return (props: RenderProps, state: RenderState) => (
    <motion.div
      {...(props as HTMLMotionProps<"div">)}
      initial={false}
      animate={{
        opacity: state.open ? 1 : 0,
        scale: state.open ? 1 : closedScale,
        y: state.open ? 0 : closedY,
      }}
      transition={transition}
    />
  );
}
