"use client"

import * as React from "react"
import { motion, LayoutGroup } from "framer-motion"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const PaginationLayoutContext = React.createContext<string | null>(null)

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  const layoutId = React.useId()
  return (
    <PaginationLayoutContext.Provider value={layoutId}>
      <LayoutGroup id={layoutId}>
        <ul
          data-slot="pagination-content"
          className={cn("flex flex-row items-center gap-1", className)}
          {...props}
        />
      </LayoutGroup>
    </PaginationLayoutContext.Provider>
  )
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" className={cn("", className)} {...props} />
}

type PaginationLinkProps = React.ComponentProps<typeof Button> & {
  isActive?: boolean
}

function PaginationLink({
  className,
  isActive,
  size = "icon-sm",
  variant,
  children,
  ...props
}: PaginationLinkProps) {
  const layoutId = React.useContext(PaginationLayoutContext)
  // When active, render an FM-animated pill underneath via layoutId. Force the
  // button itself to be "ghost" so its own background doesn't mask the slide.
  const resolvedVariant = variant ?? (isActive ? "ghost" : "ghost")
  return (
    <Button
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive ? "" : undefined}
      variant={resolvedVariant}
      size={size}
      className={cn("relative", className)}
      {...props}
    >
      {isActive && layoutId && (
        <motion.span
          layoutId="pagination-active"
          aria-hidden
          className="absolute inset-0 rounded-[var(--r-sm)] bg-surface-2 shadow-[var(--elev-inset)]"
          transition={{ type: "spring", stiffness: 380, damping: 35 }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-1">
        {children}
      </span>
    </Button>
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="sm"
      variant="ghost"
      className={cn("gap-1 px-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon className="size-4" />
      <span>Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="sm"
      variant="ghost"
      className={cn("gap-1 px-2.5", className)}
      {...props}
    >
      <span>Next</span>
      <ChevronRightIcon className="size-4" />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-8 items-center justify-center text-ink-3", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
}
