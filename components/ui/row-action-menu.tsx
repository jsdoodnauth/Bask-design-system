"use client"

import * as React from "react"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"

interface RowActionMenuProps {
  /** Trigger button accessible label. Default "Row actions". */
  label?: string
  /** Trigger icon size in px. Default 14. */
  iconSize?: number
  /** Menu placement side. Default "bottom". */
  side?: "top" | "right" | "bottom" | "left"
  /** Menu alignment. Default "end" (right-justifies to the trigger). */
  align?: "start" | "center" | "end"
  /** Min-width override for the popup. Default uses DropdownMenuContent's default. */
  className?: string
  /** `DropdownMenuItem`s / `DropdownMenuSeparator`s. */
  children: React.ReactNode
}

/** Row-action `⋯` dropdown — wraps DropdownMenu with a ghost icon-button trigger.
 *  Drop into the right-aligned actions cell of a table row. */
function RowActionMenu({
  label = "Row actions",
  iconSize = 14,
  side = "bottom",
  align = "end",
  className,
  children,
}: RowActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label={label}>
            <MoreHorizontal size={iconSize} />
          </Button>
        }
      />
      <DropdownMenuContent side={side} align={align} className={className}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { RowActionMenu }
