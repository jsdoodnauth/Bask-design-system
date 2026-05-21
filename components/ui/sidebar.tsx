"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight as ChevronRightIcon, PanelLeftClose, PanelLeftOpen } from "lucide-react"

import { cn } from "@/lib/utils"
import { useBaskTilt } from "@/lib/motion/bask-motion-provider"
import { Avatar } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"

interface SidebarContextValue {
  collapsible: boolean
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  /** Suppress the in-progress hover-expand until the pointer leaves the rail.
   *  Called by the collapse toggle so clicking it doesn't keep the rail open. */
  suppressHover: () => void
  /** Lowercased filter query — drives NavItem/NavItemGroup show/hide. */
  searchQuery: string
  setSearchQuery: (v: string) => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebarContext() {
  return React.useContext(SidebarContext)
}

/** Read-only hook for callers that need to react to the pinned collapse state.
 *  Returns `false` when used outside a collapsible Sidebar. */
function useSidebarCollapsed(): boolean {
  return useSidebarContext()?.collapsed ?? false
}

interface SidebarProps extends Omit<React.ComponentProps<"aside">, "onChange"> {
  /** When true, the sidebar can collapse to a 56px icon-only rail. */
  collapsible?: boolean
  /** Controlled collapsed state. */
  collapsed?: boolean
  /** Default for uncontrolled mode. */
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

function Sidebar({
  className,
  collapsible = false,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  onPointerEnter,
  onPointerLeave,
  ...props
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed)
  const controlled = collapsedProp !== undefined
  const collapsed = controlled ? collapsedProp! : internalCollapsed
  const setCollapsed = React.useCallback(
    (v: boolean) => {
      if (!controlled) setInternalCollapsed(v)
      onCollapsedChange?.(v)
    },
    [controlled, onCollapsedChange]
  )

  // JS-tracked hover instead of CSS `:hover`. CSS can't tell us when to *stop*
  // honoring the current hover (e.g. after the user clicks the in-rail
  // toggle), but JS can — we just zero the state and ignore further pointer
  // events until the cursor leaves.
  const [hovered, setHovered] = React.useState(false)
  const suppressedRef = React.useRef(false)

  const handlePointerEnter: React.PointerEventHandler<HTMLElement> = (e) => {
    if (!suppressedRef.current) setHovered(true)
    onPointerEnter?.(e)
  }
  const handlePointerLeave: React.PointerEventHandler<HTMLElement> = (e) => {
    suppressedRef.current = false
    setHovered(false)
    onPointerLeave?.(e)
  }
  const suppressHover = React.useCallback(() => {
    suppressedRef.current = true
    setHovered(false)
  }, [])

  const [searchQuery, setSearchQueryRaw] = React.useState("")
  const setSearchQuery = React.useCallback(
    (v: string) => setSearchQueryRaw(v.trim().toLowerCase()),
    [],
  )

  const value = React.useMemo<SidebarContextValue>(
    () => ({ collapsible, collapsed, setCollapsed, suppressHover, searchQuery, setSearchQuery }),
    [collapsible, collapsed, setCollapsed, suppressHover, searchQuery, setSearchQuery]
  )

  const railExpanded = collapsible && collapsed && hovered

  return (
    <SidebarContext.Provider value={value}>
      <aside
        data-slot="sidebar"
        data-collapsible={collapsible ? "" : undefined}
        data-collapsed={collapsible && collapsed ? "" : undefined}
        data-rail-expanded={railExpanded ? "" : undefined}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={cn(
          "bg-surface rounded-lg p-4 px-3 flex flex-col gap-1 sticky top-6",
          className
        )}
        {...props}
      />
    </SidebarContext.Provider>
  )
}

interface SidebarBrandProps extends React.ComponentProps<"div"> {
  /** Glyph shown in collapsed-rail mode. Defaults to the first character of `children`. */
  collapsedGlyph?: React.ReactNode
}

function SidebarBrand({ className, children, collapsedGlyph, ...props }: SidebarBrandProps) {
  const glyph =
    collapsedGlyph ??
    (typeof children === "string" ? children.charAt(0) : null)
  return (
    <div
      data-slot="sidebar-brand"
      className={cn(
        "font-display text-[length:var(--fs-22)] font-bold tracking-[var(--tracking-display)] px-3 pt-1.5 pb-4 text-ink",
        className
      )}
      {...props}
    >
      <span data-sb-collapse-hide="">{children}</span>
      {glyph !== null && (
        <span data-sb-collapse-only="" aria-hidden>
          {glyph}
        </span>
      )}
    </div>
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
      data-sb-collapse-hide=""
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
  /** Override the text matched against SidebarSearch. Defaults to string children. */
  searchText?: string
  className?: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler
}

function navItemLabel(node: React.ReactNode): string {
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  return ""
}

function NavItem({
  className,
  active,
  icon,
  count,
  href,
  searchText,
  children,
  ...props
}: NavItemProps) {
  const sb = useSidebarContext()
  const label = searchText ?? navItemLabel(children)
  const filtered =
    !!sb?.searchQuery && label !== "" && !label.toLowerCase().includes(sb.searchQuery)
  if (filtered) return null
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
      <span data-sb-collapse-hide="" className="flex-1 min-w-0 truncate">{children}</span>
      {count !== undefined && (
        <span
          data-slot="nav-count"
          data-sb-collapse-hide=""
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
  const sb = useSidebarContext()
  const childActive = basePath
    ? pathname === basePath || pathname.startsWith(basePath + "/")
    : false
  const [open, setOpen] = React.useState<boolean>(defaultOpen ?? childActive)

  React.useEffect(() => {
    if (childActive) setOpen(true)
  }, [childActive])

  let forceOpenForSearch = false
  if (sb?.searchQuery) {
    const labelText = navItemLabel(label).toLowerCase()
    const labelMatches = labelText.includes(sb.searchQuery)
    const anyChildMatches = React.Children.toArray(children).some((child) => {
      if (!React.isValidElement<NavItemProps>(child)) return false
      const t = child.props.searchText ?? navItemLabel(child.props.children)
      return t.toLowerCase().includes(sb.searchQuery)
    })
    if (!labelMatches && !anyChildMatches) return null
    // Auto-expand the group while a search is active so matches are visible.
    forceOpenForSearch = true
  }
  const effectiveOpen = open || forceOpenForSearch

  return (
    <div data-slot="nav-item-group" data-open={effectiveOpen ? "" : undefined} className={cn("flex flex-col", className)}>
      <button
        type="button"
        data-slot="nav-item"
        data-active={childActive ? "" : undefined}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={effectiveOpen}
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
        <span data-sb-collapse-hide="" className="flex-1 min-w-0 truncate">{label}</span>
        <ChevronRightIcon
          size={14}
          aria-hidden
          data-sb-collapse-hide=""
          className={cn(
            "text-ink-3 flex-none transition-transform duration-[var(--dur-fast)] ease-[var(--ease)]",
            effectiveOpen && "rotate-90"
          )}
        />
      </button>
      {effectiveOpen && (
        <div data-slot="nav-item-children" data-sb-collapse-hide="" className="flex flex-col gap-0.5 pl-6 pt-0.5">
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
            <span data-sb-collapse-hide="" className="flex flex-col flex-1 min-w-0">
              <span className="text-[length:var(--fs-13)] font-semibold text-ink truncate">{name}</span>
              {role && <span className="text-[11px] text-ink-3 truncate">{role}</span>}
            </span>
            <ChevronDown data-sb-collapse-hide="" size={12} className="text-ink-3 flex-none" aria-hidden />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent side={dropdownSide} align={dropdownAlign} className="min-w-[180px]">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** Pin/unpin button — toggles the collapsed-rail state of the parent Sidebar.
 *  No-ops (renders nothing) when used outside a `collapsible` Sidebar. */
function SidebarCollapseToggle({
  className,
  expandedLabel = "Collapse sidebar",
  collapsedLabel = "Expand sidebar",
  ...props
}: Omit<React.ComponentProps<"button">, "onClick" | "children"> & {
  expandedLabel?: string
  collapsedLabel?: string
}) {
  const ctx = useSidebarContext()
  if (!ctx?.collapsible) return null
  const { collapsed, setCollapsed, suppressHover } = ctx
  const label = collapsed ? collapsedLabel : expandedLabel
  return (
    <button
      type="button"
      data-slot="sidebar-collapse-toggle"
      aria-label={label}
      aria-pressed={collapsed}
      title={label}
      onClick={(e) => {
        setCollapsed(!collapsed)
        // Toggle lives inside the rail, so both the in-progress hover state
        // and our own focus would keep it expanded. Drop focus + suppress
        // the current hover so the rail visibly snaps to its new state.
        suppressHover()
        e.currentTarget.blur()
      }}
      className={cn(
        "inline-flex items-center gap-2.5 px-3 py-2 rounded-sm w-full text-left",
        "text-ink-2 text-[length:var(--fs-13)] font-medium cursor-pointer outline-none",
        "hover:bg-surface-2 hover:text-ink",
        "transition-[background,color] duration-[var(--dur-fast)] ease-[var(--ease)]",
        "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]",
        className
      )}
      {...props}
    >
      <span className="w-5 grid place-items-center text-[14px] flex-none" aria-hidden>
        {collapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
      </span>
      <span data-sb-collapse-hide="" className="flex-1 min-w-0 truncate">{label}</span>
    </button>
  )
}

/** Type-to-filter input for NavItems. Reads/writes the sidebar's search query.
 *  No-op outside a Sidebar. */
function SidebarSearch({
  placeholder = "Filter…",
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "onChange" | "type">) {
  const ctx = useSidebarContext()
  if (!ctx) return null
  return (
    <div data-slot="sidebar-search" data-sb-collapse-hide="" className={cn("px-2 py-1", className)}>
      <input
        type="search"
        placeholder={placeholder}
        onChange={(e) => ctx.setSearchQuery(e.target.value)}
        className={cn(
          "w-full px-3 py-2 rounded-sm text-[length:var(--fs-13)] text-ink bg-surface-2",
          "placeholder:text-ink-3 outline-none",
          "[box-shadow:var(--elev-inset)]",
          "focus-visible:[box-shadow:var(--elev-inset),0_0_0_3px_var(--ring-color)]",
        )}
        {...props}
      />
    </div>
  )
}

/** 1px hairline divider for visually separating sidebar sections. */
function SidebarDivider({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-divider"
      data-sb-collapse-hide=""
      role="separator"
      aria-orientation="horizontal"
      className={cn("h-px bg-[color:var(--hairline)] my-2 mx-2", className)}
      {...props}
    />
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
  SidebarCollapseToggle,
  SidebarSearch,
  SidebarDivider,
  UserPill,
  useSidebarCollapsed,
}
