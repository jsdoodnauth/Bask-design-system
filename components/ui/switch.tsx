"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "relative inline-flex h-[26px] w-[46px] shrink-0 items-center rounded-pill bg-surface-2 outline-none cursor-pointer",
        "data-checked:bg-blue",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none absolute size-5 rounded-full bg-surface-3",
          "left-[3px] data-checked:left-[23px]",
          "transition-[left] duration-[var(--dur)] ease-[var(--ease)]",
          "data-checked:bg-white"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
