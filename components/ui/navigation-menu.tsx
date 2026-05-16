import { cn } from "@/lib/utils"

/**
 * Bask NavigationMenu — sidebar-style nav items.
 * The Base UI NavigationMenu is a horizontal/dropdown component that doesn't
 * match Bask's sidebar-nav pattern. These components implement the sidebar
 * nav items directly, matching the .nav-item / .nav-item.is-active prototype styles.
 */

function NavShell({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="nav-shell"
      className={cn("grid gap-6 [grid-template-columns:240px_1fr] items-start", className)}
      {...props}
    />
  )
}

function Sidebar({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="sidebar"
      className={cn(
        "flex flex-col gap-1 p-3 rounded-lg bg-surface sticky top-6",
        "[box-shadow:var(--elev-2)]",
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
        "font-display text-[length:var(--fs-22)] font-bold tracking-[var(--tracking-display)] px-3 pb-4 pt-1.5 text-ink",
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
      className={cn("flex flex-col gap-0.5 mt-2", className)}
      {...props}
    />
  )
}

function SidebarSectionLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-section-label"
      className={cn(
        "px-3 py-2 text-[length:var(--fs-12)] font-bold tracking-[var(--tracking-eyebrow)] uppercase text-ink-3",
        className
      )}
      {...props}
    />
  )
}

function NavItem({
  className,
  active = false,
  ...props
}: React.ComponentProps<"a"> & { active?: boolean }) {
  return (
    <a
      data-slot="nav-item"
      data-active={active || undefined}
      className={cn(
        "flex items-center gap-2.5 px-3 py-[9px] rounded-sm",
        "text-[length:var(--fs-14)] font-medium text-ink-2 no-underline cursor-pointer",
        "transition-[background,color,box-shadow] duration-[var(--dur-fast)]",
        "hover:bg-surface-2 hover:text-ink",
        active
          ? "bg-surface-3 text-ink font-semibold [box-shadow:var(--elev-1)]"
          : "",
        className
      )}
      {...props}
    />
  )
}

function NavItemIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="nav-item-icon"
      className={cn("w-5 grid place-items-center text-[14px]", className)}
      {...props}
    />
  )
}

function NavItemCount({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="nav-item-count"
      className={cn(
        "ml-auto text-[11px] font-bold px-[7px] py-[2px] rounded-pill bg-surface-2 text-ink-3",
        className
      )}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("mt-4 pt-2 border-t border-[color:var(--hairline)]", className)}
      {...props}
    />
  )
}

export {
  NavShell, Sidebar, SidebarBrand, SidebarSection, SidebarSectionLabel,
  NavItem, NavItemIcon, NavItemCount, SidebarFooter,
}
