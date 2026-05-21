import * as React from "react"

import { cn } from "@/lib/utils"

interface CreditCardVisualProps extends Omit<React.ComponentProps<"div">, "style"> {
  /** Top-left eyebrow (e.g. "Bask Visa Debit"). */
  productLabel?: React.ReactNode
  /** Top-right brand mark. Renders in display font. */
  brand?: React.ReactNode
  /** Masked card number, free-form (e.g. "4929 •••• •••• 1894"). */
  number: React.ReactNode
  holder: React.ReactNode
  expiry: React.ReactNode
  /** Background — accepts any CSS background value. Defaults to a violet→blue diagonal. */
  background?: string
  /** Minimum height of the card visual; default 180. */
  minHeight?: number | string
  /** Override style (merged with `background` + `minHeight`). */
  style?: React.CSSProperties
}

const DEFAULT_BG = "linear-gradient(135deg, var(--violet), var(--blue))"

function CreditCardVisual({
  productLabel = "Bask Visa Debit",
  brand = "Bask",
  number,
  holder,
  expiry,
  background = DEFAULT_BG,
  minHeight = 180,
  className,
  style,
  ...props
}: CreditCardVisualProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "relative rounded-lg p-5 text-white overflow-hidden",
        className
      )}
      style={{ background, minHeight, ...style }}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-[length:var(--fs-12)] uppercase tracking-[var(--tracking-eyebrow)] font-bold opacity-80">
          {productLabel}
        </span>
        <span className="font-display text-[length:var(--fs-18)] font-bold tracking-[var(--tracking-display)]">
          {brand}
        </span>
      </div>
      <div className="mt-8">
        <span className="block text-[length:var(--fs-12)] uppercase tracking-[var(--tracking-eyebrow)] font-bold opacity-70">
          Card number
        </span>
        <span className="block text-[length:var(--fs-18)] font-mono tabular-nums tracking-wider">
          {number}
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <span className="block text-[length:var(--fs-12)] uppercase tracking-[var(--tracking-eyebrow)] font-bold opacity-70">
            Holder
          </span>
          <span className="block text-[length:var(--fs-14)] font-semibold">
            {holder}
          </span>
        </div>
        <div>
          <span className="block text-[length:var(--fs-12)] uppercase tracking-[var(--tracking-eyebrow)] font-bold opacity-70 text-right">
            Expires
          </span>
          <span className="block text-[length:var(--fs-14)] font-semibold">
            {expiry}
          </span>
        </div>
      </div>
    </div>
  )
}

export { CreditCardVisual }
