import * as React from "react"
import { cn } from "@/lib/utils"

interface ChoiceProps extends React.ComponentProps<"label"> {
  children: React.ReactNode
}

function Choice({ className, children, ...props }: ChoiceProps) {
  return (
    <label
      data-slot="choice"
      className={cn(
        "flex items-center gap-3 px-[14px] py-3 rounded-md bg-surface cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  )
}

export { Choice }
