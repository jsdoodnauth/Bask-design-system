"use client"

import * as React from "react"
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface TableProps extends React.ComponentProps<"table"> {
  /** Cap the container height in px or any CSS length to enable vertical scroll.
   *  Pair with `<TableHeader sticky>` to keep the header pinned. */
  maxHeight?: number | string
  /** Override the scroll container's className (e.g. to add a rounded shell). */
  containerClassName?: string
}

function Table({ className, maxHeight, containerClassName, ...props }: TableProps) {
  const containerStyle =
    maxHeight !== undefined
      ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }
      : undefined
  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-x-auto",
        maxHeight !== undefined && "overflow-y-auto",
        containerClassName,
      )}
      style={containerStyle}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-[length:var(--fs-14)]", className)}
        {...props}
      />
    </div>
  )
}

interface TableHeaderProps extends React.ComponentProps<"thead"> {
  /** Pin the header during vertical scroll. Requires the parent <Table> to
   *  have a `maxHeight` (or otherwise be a vertical scroll container). */
  sticky?: boolean
}

function TableHeader({ className, sticky, ...props }: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      data-sticky={sticky ? "" : undefined}
      className={cn(
        sticky && "[&_th]:sticky [&_th]:top-0 [&_th]:bg-surface [&_th]:z-10",
        className,
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t border-[color:var(--hairline)] font-medium", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-[color:var(--hairline)] transition-colors hover:bg-surface-2 hover:rounded-md",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-3 text-left align-middle text-[length:var(--fs-12)] font-bold tracking-[var(--tracking-eyebrow)] uppercase text-ink-3 whitespace-nowrap",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn("px-3 py-3 align-middle whitespace-nowrap", className)}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-[length:var(--fs-13)] text-ink-3", className)}
      {...props}
    />
  )
}

export type SortDirection = "asc" | "desc" | null

interface SortableTableHeadProps extends Omit<React.ComponentProps<"th">, "onClick"> {
  /** Current sort direction for this column. `null` = unsorted. */
  direction?: SortDirection
  /** Fired with the next direction when the header is activated. Cycles
   *  unsorted → asc → desc → unsorted. */
  onSort?: (next: SortDirection) => void
  /** Align the chevron and click target right (for numeric columns). */
  align?: "left" | "right"
}

function SortableTableHead({
  direction = null,
  onSort,
  align = "left",
  className,
  children,
  ...props
}: SortableTableHeadProps) {
  const next: SortDirection =
    direction === null ? "asc" : direction === "asc" ? "desc" : null
  const ariaSort: React.AriaAttributes["aria-sort"] =
    direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"

  return (
    <th
      data-slot="table-head"
      data-sortable=""
      data-direction={direction ?? undefined}
      aria-sort={ariaSort}
      className={cn(
        "h-10 px-3 align-middle text-[length:var(--fs-12)] font-bold tracking-[var(--tracking-eyebrow)] uppercase text-ink-3 whitespace-nowrap",
        align === "right" ? "text-right" : "text-left",
        className
      )}
      {...props}
    >
      <button
        type="button"
        onClick={() => onSort?.(next)}
        className={cn(
          "inline-flex items-center gap-1 cursor-pointer outline-none rounded-xs px-1 -mx-1",
          "hover:text-ink data-[direction]:text-ink",
          "transition-[color] duration-[var(--dur-fast)] ease-[var(--ease)]",
          "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]",
          align === "right" && "flex-row-reverse"
        )}
        data-direction={direction ?? undefined}
        aria-label={
          typeof children === "string"
            ? `Sort by ${children}${direction === "asc" ? ", currently ascending" : direction === "desc" ? ", currently descending" : ""}`
            : undefined
        }
      >
        <span>{children}</span>
        {direction === "asc" ? (
          <ChevronUp size={12} aria-hidden />
        ) : direction === "desc" ? (
          <ChevronDown size={12} aria-hidden />
        ) : (
          <ChevronsUpDown size={12} aria-hidden className="opacity-50" />
        )}
      </button>
    </th>
  )
}

interface TableBulkToolbarProps extends React.ComponentProps<"div"> {
  /** Number of selected rows. Toolbar renders nothing when 0. */
  selectedCount: number
  /** Singular/plural label override. Defaults to "row" / "rows". */
  itemLabel?: { singular: string; plural: string }
  /** Optional "Clear selection" handler — adds a clear button when provided. */
  onClear?: () => void
}

function TableBulkToolbar({
  selectedCount,
  itemLabel = { singular: "row", plural: "rows" },
  onClear,
  className,
  children,
  ...props
}: TableBulkToolbarProps) {
  if (selectedCount <= 0) return null
  const noun = selectedCount === 1 ? itemLabel.singular : itemLabel.plural
  return (
    <div
      data-slot="table-bulk-toolbar"
      role="toolbar"
      aria-label={`${selectedCount} ${noun} selected`}
      className={cn(
        "flex items-center justify-between gap-3 px-3 py-2 mb-3 rounded-md",
        "bg-surface-2 [box-shadow:var(--elev-1)]",
        "text-[length:var(--fs-13)]",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="font-semibold text-ink tabular-nums">
          {selectedCount} {noun} selected
        </span>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className={cn(
              "text-ink-3 hover:text-ink underline-offset-2 hover:underline cursor-pointer outline-none rounded-xs",
              "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]"
            )}
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 flex-none">{children}</div>
    </div>
  )
}

interface TableEmptyProps extends Omit<React.ComponentProps<"tr">, "title"> {
  /** Number of columns to span. */
  colSpan: number
  /** Optional icon shown above the message. */
  icon?: React.ReactNode
  /** Primary message. */
  title?: React.ReactNode
  /** Optional secondary description. */
  description?: React.ReactNode
  /** Optional CTA placed below the message (button, link, etc.). */
  action?: React.ReactNode
}

function TableEmpty({
  colSpan,
  icon,
  title = "No results",
  description,
  action,
  className,
  children,
  ...props
}: TableEmptyProps) {
  return (
    <tr data-slot="table-empty" {...props}>
      <td
        colSpan={colSpan}
        className={cn("px-3 py-10 text-center align-middle", className)}
      >
        {children ?? (
          <div className="flex flex-col items-center gap-2">
            {icon && (
              <div className="text-ink-3 mb-1" aria-hidden>{icon}</div>
            )}
            <div className="text-[length:var(--fs-14)] font-semibold text-ink">
              {title}
            </div>
            {description && (
              <div className="text-[length:var(--fs-13)] text-ink-3 max-w-xs">
                {description}
              </div>
            )}
            {action && <div className="mt-2">{action}</div>}
          </div>
        )}
      </td>
    </tr>
  )
}

interface TableSkeletonProps {
  /** Number of placeholder rows to render. Default 5. */
  rows?: number
  /** Number of cells per row. Required so widths align with the real header. */
  columns: number
  /** Per-column class names. Use to widen/narrow individual placeholder cells. */
  cellClassName?: string | (string | undefined)[]
}

function TableSkeleton({ rows = 5, columns, cellClassName }: TableSkeletonProps) {
  const cellClassAt = (i: number): string | undefined =>
    Array.isArray(cellClassName) ? cellClassName[i] : cellClassName

  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr
          key={r}
          data-slot="table-skeleton-row"
          className="border-b border-[color:var(--hairline)]"
        >
          {Array.from({ length: columns }).map((_, c) => (
            <td key={c} className={cn("px-3 py-3 align-middle", cellClassAt(c))}>
              <Skeleton className="h-3 w-full max-w-[180px] rounded-pill" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export {
  Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption,
  SortableTableHead, TableBulkToolbar, TableEmpty, TableSkeleton,
}
