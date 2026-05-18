"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

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
}

function UserPill({ name, role, initials, color = "violet", children }: UserPillProps) {
  const tiltRef = useBaskTilt()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        ref={tiltRef}
        data-slot="user-pill"
        className={cn(
          "w-full flex items-center gap-2.5 p-2 px-2.5 rounded-md bg-surface-2 cursor-pointer text-left",
          "transition-[box-shadow] duration-[var(--dur-fast)] ease-[var(--ease)]",
          "outline-none"
        )}
      >
        <Avatar size="sm" color={color}>
          {initials}
        </Avatar>
        <span className="flex flex-col flex-1 min-w-0">
          <span className="text-[length:var(--fs-13)] font-semibold text-ink truncate">{name}</span>
          {role && <span className="text-[11px] text-ink-3 truncate">{role}</span>}
        </span>
        <ChevronDown size={12} className="text-ink-3 flex-none" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="min-w-[var(--anchor-width)]">
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
  SidebarFooter,
  UserPill,
}
