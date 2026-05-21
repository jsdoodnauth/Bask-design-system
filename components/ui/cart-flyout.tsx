"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Popover, PopoverTrigger, PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface CartFlyoutProps {
  trigger: React.ReactElement
  title?: string
  subtotalLabel?: string
  /** Formatted subtotal string, e.g. "$248.40". */
  subtotal: React.ReactNode
  checkoutHref?: string
  onCheckout?: () => void
  checkoutLabel?: string
  /** Secondary label under the checkout button (e.g. "Free shipping on orders over $50"). */
  meta?: React.ReactNode
  align?: "start" | "center" | "end"
  side?: "top" | "bottom" | "left" | "right"
  sideOffset?: number
  className?: string
  children?: React.ReactNode
}

function CartFlyout({
  trigger,
  title = "Cart",
  subtotalLabel = "Subtotal",
  subtotal,
  checkoutHref,
  onCheckout,
  checkoutLabel = "Go to checkout",
  meta,
  align = "end",
  side = "bottom",
  sideOffset = 10,
  className,
  children,
}: CartFlyoutProps) {
  return (
    <Popover>
      <PopoverTrigger render={trigger} />
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "w-[360px] p-0 overflow-hidden bg-surface text-ink rounded-md",
          "[box-shadow:var(--elev-3)]",
          className,
        )}
      >
        <header
          data-slot="cart-flyout-header"
          className="flex items-center justify-between gap-2 px-4 py-3 border-b border-[color:var(--hairline)]"
        >
          <span className="text-[length:var(--fs-14)] font-semibold text-ink">{title}</span>
        </header>

        <div data-slot="cart-flyout-list" className="max-h-[300px] overflow-y-auto">
          {children}
        </div>

        <footer
          data-slot="cart-flyout-footer"
          className="px-4 py-3 border-t border-[color:var(--hairline)] flex flex-col gap-2.5 bg-surface-2"
        >
          <div className="flex items-baseline justify-between">
            <span className="text-[length:var(--fs-13)] text-ink-3">{subtotalLabel}</span>
            <span className="text-[length:var(--fs-16)] font-bold text-ink tabular-nums">{subtotal}</span>
          </div>
          {checkoutHref ? (
            <Button
              variant="primary"
              size="sm"
              nativeButton={false}
              render={<a href={checkoutHref} />}
            >
              {checkoutLabel}
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={onCheckout}>
              {checkoutLabel}
            </Button>
          )}
          {meta && <span className="text-[length:var(--fs-12)] text-ink-3 text-center">{meta}</span>}
        </footer>
      </PopoverContent>
    </Popover>
  )
}

interface CartLineProps extends Omit<React.ComponentProps<"div">, "children" | "title"> {
  /** Optional thumbnail. */
  image?: React.ReactNode
  title: React.ReactNode
  /** Sub-line, typically variant/size. */
  variant?: React.ReactNode
  /** Per-unit price, formatted. */
  price: React.ReactNode
  quantity?: number
  onRemove?: () => void
}

function CartLine({
  image, title, variant, price, quantity = 1, onRemove,
  className, ...props
}: CartLineProps) {
  return (
    <div
      data-slot="cart-line"
      className={cn(
        "relative flex items-start gap-3 px-4 py-3",
        "border-b border-[color:var(--hairline)] last:border-b-0",
        className,
      )}
      {...props}
    >
      {image && (
        <div className="size-12 rounded-sm overflow-hidden bg-surface-2 [box-shadow:var(--elev-1)] flex-none grid place-items-center text-ink-3">
          {image}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[length:var(--fs-13)] font-semibold text-ink leading-snug truncate">{title}</div>
        {variant && (
          <div className="text-[length:var(--fs-12)] text-ink-3 leading-snug mt-0.5 truncate">{variant}</div>
        )}
        <div className="text-[length:var(--fs-12)] text-ink-2 mt-1">
          <span className="tabular-nums font-semibold text-ink">{price}</span>
          {quantity > 0 && <span className="text-ink-3"> · qty {quantity}</span>}
        </div>
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove from cart"
          className="text-ink-3 hover:text-ink p-0.5 rounded-xs outline-none focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)] cursor-pointer"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

export { CartFlyout, CartLine }
