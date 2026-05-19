"use client"

import * as React from "react"
import { Search, LayoutGrid } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

/** TopNav — sticky horizontal header that spans the full viewport above the
 *  sidebar+content grid. Composes a search field, a mega-menu trigger, a row
 *  of notification icon-buttons (with dot badges), and the user pill. */
function TopNav({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="top-nav"
      className={cn(
        "sticky top-3 z-30 bg-surface rounded-lg",
        "flex items-center gap-3 px-4 py-2",
        className
      )}
      {...props}
    />
  )
}

function TopNavSearch({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <div
      data-slot="top-nav-search"
      className={cn(
        "relative flex-1 max-w-[420px]",
        className
      )}
    >
      <Search
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3 pointer-events-none"
        aria-hidden
      />
      <Input
        type="search"
        placeholder="Search (Ctrl+/)…"
        className="pl-9 py-2 text-[length:var(--fs-13)] bg-surface-2 [box-shadow:var(--elev-inset)]"
        {...props}
      />
      <kbd
        aria-hidden
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2",
          "text-[11px] text-ink-3 px-1.5 py-0.5 rounded-xs bg-surface-3",
          "[box-shadow:var(--elev-1)] font-mono"
        )}
      >
        ⌘K
      </kbd>
    </div>
  )
}

function TopNavMega({ className, children, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="top-nav-mega"
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm",
        "text-[length:var(--fs-13)] text-ink-2 font-medium",
        "hover:bg-surface-2 hover:text-ink cursor-pointer",
        "transition-[background,color] duration-[var(--dur-fast)] ease-[var(--ease)]",
        className
      )}
      {...props}
    >
      <LayoutGrid size={14} />
      {children ?? "Apps"}
    </button>
  )
}

function TopNavSpacer() {
  return <div className="flex-1" aria-hidden />
}

function TopNavActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="top-nav-actions"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

interface TopNavIconButtonProps extends React.ComponentProps<"button"> {
  /** Optional dot indicator shown top-right. */
  dotTint?: "blue" | "green" | "amber" | "red" | "violet"
  /** Optional count badge shown top-right. */
  count?: number
  label: string
}

function TopNavIconButton({
  className, dotTint, count, label, children, ...props
}: TopNavIconButtonProps) {
  return (
    <button
      data-slot="top-nav-icon"
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-grid place-items-center size-8 rounded-sm",
        "text-ink-2 hover:text-ink hover:bg-surface-2 cursor-pointer outline-none",
        "transition-[background,color] duration-[var(--dur-fast)] ease-[var(--ease)]",
        "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]",
        className
      )}
      {...props}
    >
      {children}
      {(dotTint || count !== undefined) && (
        <span
          aria-hidden
          className={cn(
            "absolute top-1 right-1 min-w-[8px] h-[8px] rounded-full",
            count !== undefined && "px-1 h-[14px] min-w-[14px] text-[10px] font-bold text-white grid place-items-center",
            dotTint === "blue"   && "bg-blue",
            dotTint === "green"  && "bg-green",
            dotTint === "amber"  && "bg-amber",
            dotTint === "red"    && "bg-red",
            dotTint === "violet" && "bg-violet",
            !dotTint && "bg-red"
          )}
        >
          {count !== undefined ? count : null}
        </span>
      )}
    </button>
  )
}

export {
  TopNav,
  TopNavSearch,
  TopNavMega,
  TopNavSpacer,
  TopNavActions,
  TopNavIconButton,
}
