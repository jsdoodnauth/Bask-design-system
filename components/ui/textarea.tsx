import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full min-w-0 min-h-[88px] rounded-md bg-surface-2 border-0 px-[14px] py-[11px] text-[length:var(--fs-14)] text-ink font-[inherit] leading-[var(--lh-body)] placeholder:text-ink-3 outline-none resize-y",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
