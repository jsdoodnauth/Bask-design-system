"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"

export interface Recipient {
  name: string
  initials: string
  color?: string
  /** Optional click handler — receives the recipient. */
  onSelect?: () => void
}

interface RecipientStackProps extends Omit<React.ComponentProps<"div">, "children"> {
  recipients: Recipient[]
  /** Truncated display name max chars. Default 8. */
  maxNameLength?: number
  /** Hide the trailing "+ add" button. */
  hideAdd?: boolean
  /** Click handler for the "+ add" button. */
  onAdd?: () => void
  /** A11y label for the add button. Default "Add recipient". */
  addLabel?: string
}

function RecipientStack({
  recipients,
  hideAdd = false,
  onAdd,
  addLabel = "Add recipient",
  className,
  ...props
}: RecipientStackProps) {
  return (
    <div
      data-slot="recipient-stack"
      className={cn("flex items-center gap-2 flex-wrap", className)}
      {...props}
    >
      {recipients.map((r) => (
        <button
          key={r.name}
          type="button"
          onClick={r.onSelect}
          className="flex flex-col items-center gap-1 rounded-md p-1 hover:bg-surface-2 cursor-pointer outline-none focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]"
          aria-label={`Send to ${r.name}`}
        >
          <Avatar size="default" color={r.color ?? "blue"}>{r.initials}</Avatar>
          <span className="text-[length:var(--fs-12)] text-ink-2 truncate max-w-[64px]">
            {r.name}
          </span>
        </button>
      ))}
      {!hideAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="size-9 rounded-full grid place-items-center bg-surface-2 text-ink-2 [box-shadow:var(--elev-inset)] hover:bg-surface-3 cursor-pointer outline-none focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]"
          aria-label={addLabel}
        >
          <Plus size={16} />
        </button>
      )}
    </div>
  )
}

export { RecipientStack }
