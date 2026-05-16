/**
 * baskShadow — the 10 canonical reactive shadow signatures, by key.
 *
 * Why this exists: browsers do not reliably invalidate `box-shadow` when a
 * nested `var(--tilt-x)` inside an `--elev-*` token changes. The dependency
 * chain `box-shadow → --elev-2 → --tilt-x` does not trigger paint; the
 * chain `box-shadow → --tilt-x` does. So reactive shadows must reference
 * `var(--tilt-x)` / `var(--tilt-y)` directly. See CLAUDE.md "inline-shadow rule".
 *
 * The 10 signatures here are derived 1:1 from prototype/components.css after
 * the milestone-0 audit collapsed the apparent ~16 hand-tuned shadows down to
 * 10 canonical ones (the rest were byte-for-byte duplicates).
 */

export type BaskShadowKey =
  | "card"
  | "card-hover"
  | "badge"
  | "avatar"
  | "swatch"
  | "btn"
  | "btn-hover"
  | "btn-pressed"
  | "switch-thumb"
  | "tooltip";

export interface BaskShadowOptions {
  /** Append the focus ring (used by `.btn:focus-visible`, `.icon-btn:focus-visible`). */
  focusRing?: boolean;
  /** Prepend a 2px ink ring (only used by `.swatch.is-active`). */
  inkRing?: boolean;
}

const SHADOWS: Record<BaskShadowKey, string> = {
  card: [
    "inset 0 2px 0 rgb(var(--hi-rgb) / calc(0.8 * var(--hi-scale)))",
    "inset 0 -2px 0 rgb(var(--lo-rgb) / calc(0.04 * var(--lo-scale)))",
    "calc(var(--tilt-x) * -8px) calc(14px + (0.55 - var(--tilt-y)) * 6px) 12px -8px rgb(var(--cast-rgb) / calc(0.20 * var(--cast-scale)))",
  ].join(", "),

  "card-hover": [
    "inset 0 2.5px 0 rgb(var(--hi-rgb) / calc(0.9 * var(--hi-scale)))",
    "inset 0 -2px 0 rgb(var(--lo-rgb) / calc(0.05 * var(--lo-scale)))",
    "calc(var(--tilt-x) * -14px) calc(22px + (0.55 - var(--tilt-y)) * 10px) 34px -10px rgb(var(--cast-rgb) / calc(0.25 * var(--cast-scale)))",
  ].join(", "),

  badge: [
    "inset 0 1.5px 0 rgb(var(--hi-rgb) / calc(0.7 * var(--hi-scale)))",
    "inset 0 -1.5px 0 rgb(var(--lo-rgb) / calc(0.03 * var(--lo-scale)))",
    "calc(var(--tilt-x) * -4px) calc(8px + (0.55 - var(--tilt-y)) * 4px) 14px -6px rgb(var(--cast-rgb) / calc(0.18 * var(--cast-scale)))",
  ].join(", "),

  // Hardcoded white/black-α insets because avatars sit on saturated color backgrounds
  // where `rgb(var(--hi-rgb))` would read as a hard band.
  avatar: [
    "inset 0 2px 0 rgba(255,255,255,0.28)",
    "inset 0 -2px 0 rgba(0,0,0,0.18)",
    "calc(var(--tilt-x) * -5px) calc(8px + (0.55 - var(--tilt-y)) * 4px) 14px -4px rgb(var(--cast-rgb) / calc(0.30 * var(--cast-scale)))",
  ].join(", "),

  swatch: [
    "inset 0 2px 0 rgba(255,255,255,0.32)",
    "inset 0 -2px 0 rgba(0,0,0,0.15)",
    "calc(var(--tilt-x) * -4px) calc(6px + (0.55 - var(--tilt-y)) * 3px) 12px -4px rgb(var(--cast-rgb) / calc(0.28 * var(--cast-scale)))",
  ].join(", "),

  // Per-variant insets via `--btn-hi` / `--btn-lo` — colored variants override these.
  btn: [
    "inset 0 2px 0 var(--btn-hi)",
    "inset 0 -2px 0 var(--btn-lo)",
    "calc(var(--tilt-x) * -8px) calc(14px + (0.55 - var(--tilt-y)) * 6px) 12px -8px rgb(var(--cast-rgb) / calc(0.28 * var(--cast-scale)))",
  ].join(", "),

  "btn-hover": [
    "inset 0 2px 0 var(--btn-hi)",
    "inset 0 -2px 0 var(--btn-lo)",
    "calc(var(--tilt-x) * -10px) calc(17px + (0.55 - var(--tilt-y)) * 7px) 16px -8px rgb(var(--cast-rgb) / calc(0.34 * var(--cast-scale)))",
  ].join(", "),

  "btn-pressed": [
    "inset 0 1px 0 var(--btn-hi)",
    "inset 0 -1px 0 var(--btn-lo)",
    "calc(var(--tilt-x) * -2px) calc(4px + (0.55 - var(--tilt-y)) * 1px) 6px -2px rgb(var(--cast-rgb) / calc(0.22 * var(--cast-scale)))",
  ].join(", "),

  // No spread term — the thumb is small enough that spread would erase the cast.
  "switch-thumb": [
    "inset 0 1.5px 0 rgb(var(--hi-rgb) / calc(0.9 * var(--hi-scale)))",
    "inset 0 -1px 0 rgb(var(--lo-rgb) / calc(0.10 * var(--lo-scale)))",
    "calc(var(--tilt-x) * -3px) calc(3px + (0.55 - var(--tilt-y)) * 2px) 5px rgb(var(--cast-rgb) / calc(0.28 * var(--cast-scale)))",
  ].join(", "),

  // No insets, dark cast only.
  tooltip:
    "calc(var(--tilt-x) * -4px) calc(6px + (0.55 - var(--tilt-y)) * 3px) 12px -2px var(--tooltip-cast)",
};

const INK_RING = "0 0 0 2px var(--ink)";
const FOCUS_RING = "var(--ring)";

export function baskShadow(
  key: BaskShadowKey,
  options: BaskShadowOptions = {},
): string {
  const base = SHADOWS[key];
  const parts: string[] = [];
  if (options.inkRing) parts.push(INK_RING);
  parts.push(base);
  if (options.focusRing) parts.push(FOCUS_RING);
  return parts.join(", ");
}
