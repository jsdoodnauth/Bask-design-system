import * as React from "react"
import { cn } from "@/lib/utils"

interface FieldRowProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Primary label shown on the left. */
  label: React.ReactNode
  /** Secondary hint below the label. */
  hint?: React.ReactNode
  /** The control on the right (typically a Switch, Button, or Select). */
  children: React.ReactNode
}

/** Label-on-left, control-on-right row for settings panels. Consecutive
 *  FieldRow siblings render a hairline between them via the
 *  `[data-slot="field-row"] + ...` rule in globals.css. */
function FieldRow({ label, hint, children, className, ...props }: FieldRowProps) {
  return (
    <div
      data-slot="field-row"
      className={cn("flex items-center justify-between gap-4 py-3.5", className)}
      {...props}
    >
      <div className="flex flex-col min-w-0">
        <div className="text-[length:var(--fs-14)] font-semibold text-ink-2">{label}</div>
        {hint && (
          <div className="text-[length:var(--fs-13)] text-ink-3 mt-0.5">{hint}</div>
        )}
      </div>
      <div className="flex-none">{children}</div>
    </div>
  )
}

export { FieldRow }
