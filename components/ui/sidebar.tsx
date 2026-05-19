"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight as ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useBaskTilt } from "@/lib/motion/bask-motion-provider"
import { Avatar } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"

function Sidebar({ className, ...props }: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="sidebar"
      className={cn(
        "bg-surface rounded-lg p-4 px-3 flex flex-col gap-1 sticky top-6",
        className
      )}
      {...props}
    />
  )
}

function SidebarBrand({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-brand"
      className={cn(
        "font-display text-[length:var(--fs-22)] font-bold tracking-[var(--tracking-display)] px-3 pt-1.5 pb-4 text-ink",
        className
      )}
      {...props}
    />
  )
}

function SidebarSection({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-section"
      className={cn("mt-2 flex flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function SidebarSectionLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-section-label"
      className={cn(
        "px-3 pt-2 pb-1 text-[length:var(--fs-12)] tracking-[var(--tracking-eyebrow)] uppercase text-ink-3 font-bold",
        className
      )}
      {...props}
    />
  )
}

type NavItemProps = {
  /** Explicit override; when omitted, active is derived from pathname vs. href. */
  active?: boolean
  icon?: React.ReactNode
  count?: React.ReactNode
  /** Route to navigate to. If provided, renders as next/link and auto-derives active. */
  href?: string
  className?: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler
}

function NavItem({
  className,
  active,
  icon,
  count,
  href,
  children,
  ...props
}: NavItemProps) {
  const pathname = usePathname()
  const isActive =
    active ??
    (href
      ? href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(href + "/")
      : false)

  const classes = cn(
    "flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-ink-2 text-[length:var(--fs-14)] font-medium no-underline cursor-pointer",
    "hover:bg-surface-2 hover:text-ink",
    "transition-[background,color,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease)]",
    "data-[active]:bg-surface-3 data-[active]:text-ink data-[active]:font-semibold",
    className
  )
  const sharedAttrs = {
    "data-slot": "nav-item" as const,
    "data-active": isActive ? "" : undefined,
    className: classes,
  }
  const content = (
    <>
      {icon && (
        <span className="w-5 grid place-items-center text-[14px] flex-none" aria-hidden>
          {icon}
        </span>
      )}
      <span className="flex-1 min-w-0 truncate">{children}</span>
      {count !== undefined && (
        <span
          data-slot="nav-count"
          className={cn(
            "ml-auto text-[11px] font-bold px-[7px] py-0.5 rounded-pill",
            isActive
              ? "bg-blue-soft text-blue"
              : "bg-surface-2 text-ink-3"
          )}
        >
          {count}
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} {...sharedAttrs} {...props}>
        {content}
      </Link>
    )
  }
  return (
    <a {...sharedAttrs} {...props}>
      {content}
    </a>
  )
}

/** Collapsible nav group — parent label + child NavItems. Auto-opens when any
 *  child route is active. The parent itself never navigates. */
interface NavItemGroupProps {
  icon?: React.ReactNode
  label: React.ReactNode
  /** When provided, group is considered active when current path starts with it. */
  basePath?: string
  defaultOpen?: boolean
  className?: string
  children?: React.ReactNode
}

function NavItemGroup({
  icon, label, basePath, defaultOpen, className, children,
}: NavItemGroupProps) {
  const pathname = usePathname()
  const childActive = basePath
    ? pathname === basePath || pathname.startsWith(basePath + "/")
    : false
  const [open, setOpen] = React.useState<boolean>(defaultOpen ?? childActive)

  React.useEffect(() => {
    if (childActive) setOpen(true)
  }, [childActive])

  return (
    <div data-slot="nav-item-group" data-open={open ? "" : undefined} className={cn("flex flex-col", className)}>
      <button
        type="button"
        data-slot="nav-item"
        data-active={childActive ? "" : undefined}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          "flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-ink-2 text-[length:var(--fs-14)] font-medium cursor-pointer text-left",
          "hover:bg-surface-2 hover:text-ink",
          "transition-[background,color,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease)]",
          "data-[active]:bg-surface-3 data-[active]:text-ink data-[active]:font-semibold",
        )}
      >
        {icon && (
          <span className="w-5 grid place-items-center text-[14px] flex-none" aria-hidden>
            {icon}
          </span>
        )}
        <span className="flex-1 min-w-0 truncate">{label}</span>
        <ChevronRightIcon
          size={14}
          aria-hidden
          className={cn(
            "text-ink-3 flex-none transition-transform duration-[var(--dur-fast)] ease-[var(--ease)]",
            open && "rotate-90"
          )}
        />
      </button>
      {open && (
        <div data-slot="nav-item-children" className="flex flex-col gap-0.5 pl-6 pt-0.5">
          {children}
        </div>
      )}
    </div>
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("mt-4", className)}
      {...props}
    />
  )
}

interface UserPillProps {
  name: string
  role?: string
  initials: string
  color?: React.ComponentProps<typeof Avatar>["color"]
  children?: React.ReactNode
  /** Compact rendering used in the top nav: no surface tile, no chevron, name/role
   *  to the *right* of the avatar with text-right alignment to match the v2 mock. */
  compact?: boolean
  /** Side the dropdown opens on. Defaults to "top" (sidebar) or "bottom" (compact). */
  side?: "top" | "bottom" | "left" | "right"
  /** Dropdown alignment. */
  align?: "start" | "center" | "end"
}

function UserPill({
  name, role, initials, color = "violet", children,
  compact = false, side, align,
}: UserPillProps) {
  const tiltRef = useBaskTilt()
  const dropdownSide = side ?? (compact ? "bottom" : "top")
  const dropdownAlign = align ?? (compact ? "end" : "start")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        ref={tiltRef}
        data-slot="user-pill"
        data-compact={compact ? "" : undefined}
        className={cn(
          "flex items-center gap-2.5 cursor-pointer text-left outline-none",
          "transition-[box-shadow,background] duration-[var(--dur-fast)] ease-[var(--ease)]",
          compact
            ? "p-1 pl-2 pr-1 rounded-pill hover:bg-surface-2"
            : "w-full p-2 px-2.5 rounded-md bg-surface-2"
        )}
      >
        {compact ? (
          <>
            <span className="flex flex-col items-end min-w-0">
              <span className="text-[length:var(--fs-13)] font-semibold text-ink truncate leading-tight">{name}</span>
              {role && <span className="text-[11px] text-ink-3 truncate leading-tight">{role}</span>}
            </span>
            <Avatar size="default" color={color}>
              {initials}
            </Avatar>
          </>
        ) : (
          <>
            <Avatar size="sm" color={color}>
              {initials}
            </Avatar>
            <span className="flex flex-col flex-1 min-w-0">
              <span className="text-[length:var(--fs-13)] font-semibold text-ink truncate">{name}</span>
              {role && <span className="text-[11px] text-ink-3 truncate">{role}</span>}
            </span>
            <ChevronDown size={12} className="text-ink-3 flex-none" aria-hidden />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent side={dropdownSide} align={dropdownAlign} className="min-w-[180px]">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export {
  Sidebar,
  SidebarBrand,
  SidebarSection,
  SidebarSectionLabel,
  NavItem,
  NavItemGroup,
  SidebarFooter,
  UserPill,
}
