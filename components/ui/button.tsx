"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useBaskTilt } from "@/lib/motion/bask-motion-provider"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 appearance-none border-0 cursor-pointer font-semibold text-[length:var(--fs-14)] select-none whitespace-nowrap outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-surface-3 text-ink",
        primary: "[--btn-hi:rgba(255,255,255,0.18)] [--btn-lo:rgba(0,0,0,0.18)] bg-blue text-white",
        success: "[--btn-hi:rgba(255,255,255,0.20)] [--btn-lo:rgba(0,0,0,0.18)] bg-green text-white",
        warning: "[--btn-hi:rgba(255,255,255,0.32)] [--btn-lo:rgba(0,0,0,0.12)] bg-amber text-[#2A1A00]",
        danger:  "[--btn-hi:rgba(255,255,255,0.18)] [--btn-lo:rgba(0,0,0,0.18)] bg-red text-white",
        orange:  "[--btn-hi:rgba(255,255,255,0.22)] [--btn-lo:rgba(0,0,0,0.16)] bg-orange text-white",
        ghost:   "[--btn-hi:rgba(0,0,0,0)] [--btn-lo:rgba(0,0,0,0)] bg-transparent text-ink-2 hover:bg-surface-2",
      },
      size: {
        default: "px-[18px] py-[11px] rounded-md",
        sm:      "px-3 py-[7px] text-[length:var(--fs-13)] rounded-sm",
        lg:      "px-5 py-[13px] rounded-lg",
        icon:    "size-[38px] rounded-sm",
        "icon-sm": "size-8 rounded-xs",
        "icon-lg": "size-11 rounded-md",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>

function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  const tiltRef = useBaskTilt()
  return (
    <ButtonPrimitive
      ref={tiltRef}
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
