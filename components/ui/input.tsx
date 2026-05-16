import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 rounded-md bg-surface-2 border-0 px-[14px] py-[11px] text-[length:var(--fs-14)] text-ink font-[inherit] placeholder:text-ink-3 outline-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }
