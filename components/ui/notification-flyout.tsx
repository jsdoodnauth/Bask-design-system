"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface NotificationFlyoutProps {
  /** Trigger element — usually a `<TopNavIconButton>`. Rendered via Base UI's
   *  `render` prop so the popover wires refs + a11y onto the existing button. */
  trigger: React.ReactElement
  title?: string
  /** Count shown next to the title. */
  badge?: number | string
  onMarkAllRead?: () => void
  /** Whether to render the "Mark all read" header button. Default true. */
  showMarkAllRead?: boolean
  viewAllHref?: string
  viewAllLabel?: string
  align?: "start" | "center" | "end"
  side?: "top" | "bottom" | "left" | "right"
  sideOffset?: number
  className?: string
  children?: React.ReactNode
}

function NotificationFlyout({
  trigger,
  title = "Notifications",
  badge,
  onMarkAllRead,
  showMarkAllRead = true,
  viewAllHref,
  viewAllLabel = "View all",
  align = "end",
  side = "bottom",
  sideOffset = 10,
  className,
  children,
}: NotificationFlyoutProps) {
  return (
    <Popover>
      <PopoverTrigger render={trigger} />
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "w-[360px] p-0 overflow-hidden bg-surface text-ink rounded-md",
          "[box-shadow:var(--elev-3)]",
          className
        )}
      >
        <header
          data-slot="notification-flyout-header"
          className="flex items-center justify-between gap-2 px-4 py-3 border-b border-[color:var(--hairline)]"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[length:var(--fs-14)] font-semibold text-ink truncate">
              {title}
            </span>
            {badge !== undefined && (
              <Badge variant="danger" className="px-2 py-0.5 text-[11px]">
                {badge}
              </Badge>
            )}
          </div>
          {showMarkAllRead && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className={cn(
                "inline-flex items-center gap-1 text-[length:var(--fs-12)] font-medium",
                "text-ink-3 hover:text-ink cursor-pointer outline-none rounded-xs px-1 py-0.5",
                "transition-[color] duration-[var(--dur-fast)] ease-[var(--ease)]",
                "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]"
              )}
            >
              <Check size={12} aria-hidden />
              Mark all read
            </button>
          )}
        </header>

        <div
          data-slot="notification-flyout-list"
          className="max-h-[360px] overflow-y-auto"
        >
          {children}
        </div>

        {viewAllHref && (
          <footer
            data-slot="notification-flyout-footer"
            className="border-t border-[color:var(--hairline)] bg-surface-2"
          >
            <a
              href={viewAllHref}
              className={cn(
                "block w-full text-center px-4 py-2.5",
                "text-[length:var(--fs-13)] font-semibold text-ink-2 hover:text-ink",
                "transition-[color] duration-[var(--dur-fast)] ease-[var(--ease)]"
              )}
            >
              {viewAllLabel}
            </a>
          </footer>
        )}
      </PopoverContent>
    </Popover>
  )
}

interface NotificationItemProps extends Omit<React.ComponentProps<"a">, "title"> {
  icon?: React.ReactNode
  title: React.ReactNode
  body?: React.ReactNode
  time?: React.ReactNode
  /** Unread accent dot on the left edge. */
  unread?: boolean
}

function NotificationItem({
  icon,
  title,
  body,
  time,
  unread,
  className,
  href,
  ...props
}: NotificationItemProps) {
  const sharedClass = cn(
    "relative flex items-start gap-3 px-4 py-3 cursor-pointer no-underline",
    "border-b border-[color:var(--hairline)] last:border-b-0",
    "hover:bg-surface-2 transition-[background] duration-[var(--dur-fast)] ease-[var(--ease)]",
    className
  )
  const content = (
    <>
      {unread && (
        <span
          aria-hidden
          className="absolute left-1.5 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-blue"
        />
      )}
      {icon && (
        <span
          aria-hidden
          className="flex-none grid place-items-center size-9 rounded-sm bg-surface-2 text-ink-2 [box-shadow:var(--elev-1)]"
        >
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-[length:var(--fs-13)] font-semibold text-ink leading-snug">
          {title}
        </div>
        {body && (
          <div className="text-[length:var(--fs-12)] text-ink-3 leading-snug mt-0.5 line-clamp-2">
            {body}
          </div>
        )}
        {time && (
          <div className="text-[11px] text-ink-3 mt-1">{time}</div>
        )}
      </div>
    </>
  )
  if (href) {
    return (
      <a
        data-slot="notification-item"
        data-unread={unread ? "" : undefined}
        href={href}
        className={sharedClass}
        {...props}
      >
        {content}
      </a>
    )
  }
  const { target, rel, download, ping, referrerPolicy, ...rest } = props
  void target; void rel; void download; void ping; void referrerPolicy
  return (
    <div
      data-slot="notification-item"
      data-unread={unread ? "" : undefined}
      className={sharedClass}
      {...(rest as React.ComponentProps<"div">)}
    >
      {content}
    </div>
  )
}

function NotificationEmpty({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="notification-empty"
      className={cn(
        "px-4 py-10 text-center text-[length:var(--fs-13)] text-ink-3",
        className
      )}
      {...props}
    >
      {children ?? "You're all caught up."}
    </div>
  )
}

export { NotificationFlyout, NotificationItem, NotificationEmpty }
