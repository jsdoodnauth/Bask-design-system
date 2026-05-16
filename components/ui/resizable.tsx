"use client"

import * as React from "react"
import {
  Group as RPGroup,
  Panel as RPPanel,
  Separator as RPSeparator,
  type GroupProps,
  type PanelProps,
  type SeparatorProps,
} from "react-resizable-panels"
import { GripVerticalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function ResizablePanelGroup({
  className,
  orientation = "horizontal",
  ...props
}: GroupProps) {
  return (
    <RPGroup
      data-slot="resizable-panel-group"
      orientation={orientation}
      className={cn(
        "flex h-full w-full",
        orientation === "vertical" && "flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({ className, ...props }: PanelProps) {
  return (
    <RPPanel
      data-slot="resizable-panel"
      className={cn(className)}
      {...props}
    />
  )
}

type ResizableHandleProps = SeparatorProps & { withHandle?: boolean }

function ResizableHandle({
  className,
  withHandle,
  children,
  ...props
}: ResizableHandleProps) {
  return (
    <RPSeparator
      data-slot="resizable-handle"
      className={cn(
        "relative flex items-center justify-center bg-[var(--hairline)] outline-none",
        // horizontal group: handle is a vertical strip
        "data-[orientation=horizontal]:w-px data-[orientation=horizontal]:h-full",
        // vertical group: handle is a horizontal strip
        "data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full",
        "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]",
        className
      )}
      {...props}
    >
      {children}
      {withHandle && (
        <div
          aria-hidden
          className={cn(
            "z-10 flex items-center justify-center rounded-[var(--r-xs)] bg-surface-3 text-ink-3",
            "[box-shadow:var(--elev-1)]",
            "data-[orientation=horizontal]:h-6 data-[orientation=horizontal]:w-3",
            "data-[orientation=vertical]:h-3 data-[orientation=vertical]:w-6 data-[orientation=vertical]:rotate-90"
          )}
        >
          <GripVerticalIcon className="size-3" />
        </div>
      )}
    </RPSeparator>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
