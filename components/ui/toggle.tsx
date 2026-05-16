"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer outline-none",
    "text-ink-2 transition-[color,background-color,box-shadow] duration-[var(--dur-fast)]",
    "hover:text-ink data-pressed:text-ink",
    "disabled:pointer-events-none disabled:opacity-55",
    "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]",
    "[&_svg]:size-4 [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        default: "bg-transparent data-pressed:bg-surface-2",
        outline: "bg-transparent border border-[var(--hairline)] data-pressed:bg-surface-2",
      },
      size: {
        sm: "h-8 px-2 rounded-[var(--r-sm)] text-[length:var(--fs-13)]",
        md: "h-9 px-3 rounded-[var(--r-md)] text-[length:var(--fs-14)] font-medium",
        lg: "h-10 px-4 rounded-[var(--r-md)] text-[length:var(--fs-15)] font-medium",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
)

type ToggleProps = TogglePrimitive.Props & VariantProps<typeof toggleVariants>

function Toggle({ className, variant, size, ...props }: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
