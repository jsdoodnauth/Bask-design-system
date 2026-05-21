"use client"

import * as React from "react"
import { Search, LayoutGrid, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

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

interface TopNavMegaProps {
  /** Label rendered next to the grid icon. Defaults to "Apps". */
  label?: React.ReactNode
  className?: string
  /** Panel width — defaults to 520px. */
  panelWidth?: number | string
  /** Pass mega-menu sections / items as children. When omitted, the trigger
   *  behaves like a plain button (back-compat with the original `TopNavMega`). */
  children?: React.ReactNode
}

function TopNavMega({
  label = "Apps",
  className,
  panelWidth = 520,
  children,
}: TopNavMegaProps) {
  const trigger = (
    <button
      type="button"
      data-slot="top-nav-mega"
      className={cn(
        "group/mega inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm",
        "text-[length:var(--fs-13)] text-ink-2 font-medium",
        "hover:bg-surface-2 hover:text-ink cursor-pointer outline-none",
        "transition-[background,color] duration-[var(--dur-fast)] ease-[var(--ease)]",
        "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]",
        "data-[popup-open]:bg-surface-2 data-[popup-open]:text-ink",
        className
      )}
    >
      <LayoutGrid size={14} aria-hidden />
      <span>{label}</span>
      {children && (
        <ChevronDown
          size={12}
          aria-hidden
          className="text-ink-3 transition-transform duration-[var(--dur-fast)] ease-[var(--ease)] group-data-[popup-open]/mega:rotate-180"
        />
      )}
    </button>
  )

  if (!children) return trigger

  return (
    <Popover>
      <PopoverTrigger render={trigger} />
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={10}
        className={cn(
          "p-3 bg-surface text-ink rounded-md [box-shadow:var(--elev-3)]"
        )}
        style={{ width: panelWidth }}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}

function TopNavMegaSection({
  title,
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & { title?: React.ReactNode }) {
  return (
    <section
      data-slot="top-nav-mega-section"
      className={cn("flex flex-col gap-1.5 first:mt-0 mt-3", className)}
      {...props}
    >
      {title && (
        <div className="px-1 text-[length:var(--fs-12)] tracking-[var(--tracking-eyebrow)] uppercase text-ink-3 font-bold">
          {title}
        </div>
      )}
      <div className="grid grid-cols-3 gap-1">{children}</div>
    </section>
  )
}

interface TopNavMegaItemProps extends Omit<React.ComponentProps<"a">, "title"> {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** Tint for the icon tile. */
  tint?: "blue" | "green" | "amber" | "red" | "violet" | "orange"
}

function TopNavMegaItem({
  icon,
  title,
  description,
  tint,
  className,
  href,
  ...props
}: TopNavMegaItemProps) {
  return (
    <a
      data-slot="top-nav-mega-item"
      href={href}
      className={cn(
        "group flex items-start gap-2.5 p-2.5 rounded-sm cursor-pointer no-underline",
        "hover:bg-surface-2 transition-[background] duration-[var(--dur-fast)] ease-[var(--ease)]",
        className
      )}
      {...props}
    >
      {icon && (
        <span
          aria-hidden
          className={cn(
            "flex-none grid place-items-center size-8 rounded-sm text-ink-2 [box-shadow:var(--elev-1)]",
            tint === "blue"   && "bg-[color:var(--tint-blue)] text-blue",
            tint === "green"  && "bg-[color:var(--tint-green)] text-green",
            tint === "amber"  && "bg-[color:var(--tint-amber)] text-amber",
            tint === "red"    && "bg-[color:var(--tint-red)] text-red",
            tint === "violet" && "bg-[color:var(--tint-violet)] text-violet",
            tint === "orange" && "bg-[color:var(--tint-orange)] text-orange",
            !tint && "bg-surface-3"
          )}
        >
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[length:var(--fs-13)] font-semibold text-ink truncate">
          {title}
        </div>
        {description && (
          <div className="text-[length:var(--fs-12)] text-ink-3 truncate">
            {description}
          </div>
        )}
      </div>
    </a>
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
  TopNavMegaSection,
  TopNavMegaItem,
  TopNavSpacer,
  TopNavActions,
  TopNavIconButton,
}
