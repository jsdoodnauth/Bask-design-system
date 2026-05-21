"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Popover, PopoverTrigger, PopoverContent,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"

interface InboxFlyoutProps {
  trigger: React.ReactElement
  title?: string
  badge?: number | string
  onMarkAllRead?: () => void
  showMarkAllRead?: boolean
  viewAllHref?: string
  viewAllLabel?: string
  align?: "start" | "center" | "end"
  side?: "top" | "bottom" | "left" | "right"
  sideOffset?: number
  className?: string
  children?: React.ReactNode
}

function InboxFlyout({
  trigger,
  title = "Inbox",
  badge,
  onMarkAllRead,
  showMarkAllRead = true,
  viewAllHref,
  viewAllLabel = "Open inbox",
  align = "end",
  side = "bottom",
  sideOffset = 10,
  className,
  children,
}: InboxFlyoutProps) {
  return (
    <Popover>
      <PopoverTrigger render={trigger} />
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "w-[380px] p-0 overflow-hidden bg-surface text-ink rounded-md",
          "[box-shadow:var(--elev-3)]",
          className,
        )}
      >
        <header
          data-slot="inbox-flyout-header"
          className="flex items-center justify-between gap-2 px-4 py-3 border-b border-[color:var(--hairline)]"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[length:var(--fs-14)] font-semibold text-ink truncate">{title}</span>
            {badge !== undefined && (
              <Badge variant="info" className="px-2 py-0.5 text-[11px]">{badge}</Badge>
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
                "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]",
              )}
            >
              <Check size={12} aria-hidden />
              Mark all read
            </button>
          )}
        </header>

        <div data-slot="inbox-flyout-list" className="max-h-[400px] overflow-y-auto">
          {children}
        </div>

        {viewAllHref && (
          <footer
            data-slot="inbox-flyout-footer"
            className="border-t border-[color:var(--hairline)] bg-surface-2"
          >
            <a
              href={viewAllHref}
              className={cn(
                "block w-full text-center px-4 py-2.5",
                "text-[length:var(--fs-13)] font-semibold text-ink-2 hover:text-ink",
                "transition-[color] duration-[var(--dur-fast)] ease-[var(--ease)]",
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

interface InboxThreadProps extends Omit<React.ComponentProps<"a">, "title"> {
  avatar?: React.ReactNode
  /** Avatar fallback used when `avatar` isn't passed. */
  initials?: string
  avatarColor?: React.ComponentProps<typeof Avatar>["color"]
  from: React.ReactNode
  subject: React.ReactNode
  preview?: React.ReactNode
  time?: React.ReactNode
  unread?: boolean
  /** Number of messages in the thread (chip on the right). */
  count?: number
}

function InboxThread({
  avatar, initials, avatarColor = "blue",
  from, subject, preview, time, unread, count,
  className, href, ...props
}: InboxThreadProps) {
  const sharedClass = cn(
    "relative flex items-start gap-3 px-4 py-3 cursor-pointer no-underline",
    "border-b border-[color:var(--hairline)] last:border-b-0",
    "hover:bg-surface-2 transition-[background] duration-[var(--dur-fast)] ease-[var(--ease)]",
    className,
  )
  const content = (
    <>
      {unread && (
        <span
          aria-hidden
          className="absolute left-1.5 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-blue"
        />
      )}
      <div className="flex-none">
        {avatar ?? <Avatar size="default" color={avatarColor}>{initials ?? "?"}</Avatar>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[length:var(--fs-13)] font-semibold text-ink truncate">{from}</span>
          {time && <span className="text-[11px] text-ink-3 shrink-0">{time}</span>}
        </div>
        <div className="text-[length:var(--fs-13)] text-ink-2 leading-snug truncate">{subject}</div>
        {preview && (
          <div className="text-[length:var(--fs-12)] text-ink-3 leading-snug mt-0.5 line-clamp-2">
            {preview}
          </div>
        )}
      </div>
      {count !== undefined && count > 1 && (
        <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-pill bg-surface-2 text-ink-3 self-start">
          {count}
        </span>
      )}
    </>
  )
  if (href) {
    return (
      <a
        data-slot="inbox-thread"
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
      data-slot="inbox-thread"
      data-unread={unread ? "" : undefined}
      className={sharedClass}
      {...(rest as React.ComponentProps<"div">)}
    >
      {content}
    </div>
  )
}

export { InboxFlyout, InboxThread }
