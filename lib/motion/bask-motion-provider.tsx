"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

/**
 * BaskMotionProvider — proximity-light parallax, ported from prototype/index.html.
 *
 * Decision 3(b): elements opt in via `useBaskTilt()` ref-registration through
 * context, NOT by class-name + MutationObserver. The provider holds a
 * Set<HTMLElement> and iterates it directly each frame.
 *
 * Decision 14: reduced-motion bails before subscribing.
 *
 * The math is identical to the prototype — see prototype/index.html for the
 * canonical reference. Tunables (AMP, OUTER, EASE) match.
 */

// ---- Tunables ----
const AMP = 1.0;
const OUTER = 380;
const EASE = 0.18;

type Register = (el: HTMLElement) => () => void;

const BaskMotionContext = createContext<Register | null>(null);

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function BaskMotionProvider({ children }: { children: ReactNode }) {
  const elementsRef = useRef<Set<HTMLElement>>(new Set());

  // Stable register API — never changes across renders, so consumers' ref
  // callbacks stay stable too.
  const register = useCallback<Register>((el) => {
    elementsRef.current.add(el);
    return () => {
      elementsRef.current.delete(el);
      el.style.removeProperty("--tilt-x");
      el.style.removeProperty("--tilt-y");
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let mxTarget = -99999;
    let myTarget = -99999;
    let mxCurr = -99999;
    let myCurr = -99999;
    let dirty = false;
    let rafHandle: number | null = null;

    const update = () => {
      const dx = mxTarget - mxCurr;
      const dy = myTarget - myCurr;
      const cursorSettled = Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5;

      if (cursorSettled && !dirty) {
        rafHandle = null;
        return;
      }

      mxCurr += dx * EASE;
      myCurr += dy * EASE;

      for (const el of elementsRef.current) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;

        const ecx = (r.left + r.right) * 0.5;
        const ecy = (r.top + r.bottom) * 0.5;
        const vx = mxCurr - ecx;
        const vy = myCurr - ecy;
        const vmag = Math.hypot(vx, vy) || 1;

        const halfSize = Math.min(r.width, r.height) * 0.5;

        let dirX: number;
        let dirY: number;
        if (vmag <= halfSize) {
          dirX = vx / halfSize;
          dirY = vy / halfSize;
        } else {
          dirX = vx / vmag;
          dirY = vy / vmag;
        }

        const edgeDx = Math.max(r.left - mxCurr, 0, mxCurr - r.right);
        const edgeDy = Math.max(r.top - myCurr, 0, myCurr - r.bottom);
        const edgeDist = Math.hypot(edgeDx, edgeDy);
        const influence = 1 - smoothstep(0, OUTER, edgeDist);

        const tiltX = dirX * influence * AMP;
        const tiltY = dirY * influence * AMP;

        el.style.setProperty("--tilt-x", tiltX.toFixed(3));
        el.style.setProperty("--tilt-y", tiltY.toFixed(3));
      }

      dirty = false;
      rafHandle = requestAnimationFrame(update);
    };

    const wake = () => {
      if (rafHandle == null) rafHandle = requestAnimationFrame(update);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      mxTarget = e.clientX;
      myTarget = e.clientY;
      dirty = true;
      wake();
    };

    const onPointerLeave = () => {
      mxTarget = -99999;
      myTarget = -99999;
      dirty = true;
      wake();
    };

    const onScrollOrResize = () => {
      dirty = true;
      wake();
    };

    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      if (!e.matches) return;
      if (rafHandle != null) {
        cancelAnimationFrame(rafHandle);
        rafHandle = null;
      }
      for (const el of elementsRef.current) {
        el.style.setProperty("--tilt-x", "0");
        el.style.setProperty("--tilt-y", "0");
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    mediaQuery.addEventListener("change", onReducedMotionChange);

    return () => {
      if (rafHandle != null) cancelAnimationFrame(rafHandle);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      mediaQuery.removeEventListener("change", onReducedMotionChange);
    };
  }, []);

  return (
    <BaskMotionContext.Provider value={register}>
      {children}
    </BaskMotionContext.Provider>
  );
}

/**
 * Attach to a reactive element to opt it into proximity-light parallax.
 *
 * @example
 * function Card(props) {
 *   const tiltRef = useBaskTilt();
 *   return <div ref={tiltRef} style={{ boxShadow: baskShadow('card') }} {...props} />;
 * }
 */
export function useBaskTilt() {
  const register = useContext(BaskMotionContext);
  return useCallback(
    (el: HTMLElement | null) => {
      if (!el || !register) return;
      return register(el);
    },
    [register],
  );
}
