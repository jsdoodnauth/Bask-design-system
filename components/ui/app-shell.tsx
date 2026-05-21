import * as React from "react"
import { cn } from "@/lib/utils"

/** Page shell — sidebar (sticky, 240px) + main (1fr) grid. Collapses to single
 *  column under 880px. Compose with <Sidebar> + <AppMain>. */
function AppShell({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="app-shell"
      className={cn(
        "grid gap-6 items-start grid-cols-[240px_1fr] max-[880px]:grid-cols-1",
        className
      )}
      {...props}
    />
  )
}

function AppMain({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="app-main"
      className={cn("flex flex-col gap-[18px] min-w-0", className)}
      {...props}
    />
  )
}

/** Top-of-page header: title block + actions. Wraps gracefully on small screens. */
function PageHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="page-header"
      className={cn("flex justify-between items-end gap-4 flex-wrap", className)}
      {...props}
    />
  )
}

function PageHeaderTitle({ className, style, ...props }: React.ComponentProps<"h2">) {
  // Margin-bottom set via inline style: the unlayered global `h2` resets in
  // globals.css were overriding Tailwind `mb-*` utilities. Inline style wins
  // the cascade without needing !important or restructuring the global resets.
  return (
    <h2
      className={cn("text-[length:var(--fs-28)]", className)}
      style={{ marginBottom: 10, ...style }}
      {...props}
    />
  )
}

function PageHeaderMeta({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-ink-3 text-[length:var(--fs-13)] m-0 flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function PageHeaderActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-2.5", className)} {...props} />
  )
}

/** Title-on-left, breadcrumbs-on-right shorthand. Wraps the four <PageHeader*>
 *  parts so dashboards don't have to re-spell the layout. Pass `meta` for the
 *  status line under the title and `breadcrumbs` for the right rail. */
function PageHeaderWithCrumbs({
  title,
  meta,
  breadcrumbs,
  actions,
  className,
  ...props
}: Omit<React.ComponentProps<"header">, "title"> & {
  title: React.ReactNode
  meta?: React.ReactNode
  breadcrumbs?: React.ReactNode
  /** Extra actions rendered after the breadcrumbs. */
  actions?: React.ReactNode
}) {
  return (
    <PageHeader className={className} {...props}>
      <div>
        <PageHeaderTitle>{title}</PageHeaderTitle>
        {meta && <PageHeaderMeta>{meta}</PageHeaderMeta>}
      </div>
      {(breadcrumbs || actions) && (
        <PageHeaderActions>
          {breadcrumbs}
          {actions}
        </PageHeaderActions>
      )}
    </PageHeader>
  )
}

export {
  AppShell,
  AppMain,
  PageHeader,
  PageHeaderTitle,
  PageHeaderMeta,
  PageHeaderActions,
  PageHeaderWithCrumbs,
}
