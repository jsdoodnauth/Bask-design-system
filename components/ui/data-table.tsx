"use client"

import * as React from "react"
import { ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

type SortDirection = "asc" | "desc"

export type DataTableColumn<TRow> = {
  /** Unique column id; also used as the sort key. */
  id: string
  /** Header cell content. */
  header: React.ReactNode
  /** Per-row cell renderer. */
  cell: (row: TRow, rowIndex: number) => React.ReactNode
  /** Custom comparator. Defaults to comparing the result of `accessor`. */
  sortValue?: (row: TRow) => string | number | null | undefined
  /** Disable sorting on this column. */
  sortable?: boolean
  /** Extra classes on the <th> and <td>. */
  className?: string
  /** Header-only class override. */
  headerClassName?: string
}

type DataTableProps<TRow> = {
  data: TRow[]
  columns: DataTableColumn<TRow>[]
  /** Function returning a stable key for each row (used for selection). */
  getRowId?: (row: TRow, index: number) => string
  /** Enable a checkbox column for row selection. */
  selectable?: boolean
  selectedIds?: string[]
  onSelectedIdsChange?: (ids: string[]) => void
  /** Initial sort. */
  defaultSort?: { id: string; direction: SortDirection }
  emptyMessage?: React.ReactNode
  className?: string
}

function DataTable<TRow>({
  data,
  columns,
  getRowId = (_row, i) => String(i),
  selectable = false,
  selectedIds,
  onSelectedIdsChange,
  defaultSort,
  emptyMessage = "No results.",
  className,
}: DataTableProps<TRow>) {
  const [sort, setSort] = React.useState(defaultSort)

  const sorted = React.useMemo(() => {
    if (!sort) return data
    const col = columns.find((c) => c.id === sort.id)
    if (!col?.sortValue) return data
    const dir = sort.direction === "asc" ? 1 : -1
    return [...data].sort((a, b) => {
      const av = col.sortValue!(a) ?? ""
      const bv = col.sortValue!(b) ?? ""
      if (av < bv) return -1 * dir
      if (av > bv) return 1 * dir
      return 0
    })
  }, [data, columns, sort])

  const rowIds = sorted.map((r, i) => getRowId(r, i))
  const allSelected = selectable && rowIds.length > 0 && rowIds.every((id) => selectedIds?.includes(id))
  const someSelected = selectable && !allSelected && rowIds.some((id) => selectedIds?.includes(id))

  function toggleAll(checked: boolean) {
    onSelectedIdsChange?.(checked ? rowIds : [])
  }

  function toggleRow(id: string, checked: boolean) {
    const next = new Set(selectedIds ?? [])
    if (checked) next.add(id)
    else next.delete(id)
    onSelectedIdsChange?.([...next])
  }

  function handleSort(col: DataTableColumn<TRow>) {
    if (col.sortable === false || !col.sortValue) return
    setSort((prev) => {
      if (prev?.id !== col.id) return { id: col.id, direction: "asc" }
      if (prev.direction === "asc") return { id: col.id, direction: "desc" }
      return undefined
    })
  }

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {selectable && (
            <TableHead className="w-10">
              <Checkbox
                aria-label="Select all rows"
                checked={allSelected}
                indeterminate={someSelected}
                onCheckedChange={(checked) => toggleAll(checked === true)}
              />
            </TableHead>
          )}
          {columns.map((col) => {
            const isSorted = sort?.id === col.id
            const canSort = col.sortable !== false && !!col.sortValue
            return (
              <TableHead key={col.id} className={cn(col.className, col.headerClassName)}>
                {canSort ? (
                  <button
                    type="button"
                    onClick={() => handleSort(col)}
                    className="inline-flex items-center gap-1 -mx-1 px-1 py-0.5 rounded-[var(--r-xs)] cursor-pointer hover:text-ink outline-none focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]"
                  >
                    {col.header}
                    {isSorted ? (
                      sort?.direction === "asc" ? (
                        <ChevronUpIcon className="size-3.5" />
                      ) : (
                        <ChevronDownIcon className="size-3.5" />
                      )
                    ) : (
                      <ChevronsUpDownIcon className="size-3.5 opacity-50" />
                    )}
                  </button>
                ) : (
                  col.header
                )}
              </TableHead>
            )
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length + (selectable ? 1 : 0)}
              className="h-24 text-center text-ink-3"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          sorted.map((row, rowIndex) => {
            const id = getRowId(row, rowIndex)
            const isSelected = selectable && selectedIds?.includes(id)
            return (
              <TableRow
                key={id}
                data-state={isSelected ? "selected" : undefined}
                className={cn(isSelected && "bg-surface-2")}
              >
                {selectable && (
                  <TableCell className="w-10">
                    <Checkbox
                      aria-label="Select row"
                      checked={!!isSelected}
                      onCheckedChange={(checked) => toggleRow(id, checked === true)}
                    />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.id} className={col.className}>
                    {col.cell(row, rowIndex)}
                  </TableCell>
                ))}
              </TableRow>
            )
          })
        )}
      </TableBody>
    </Table>
  )
}

export { DataTable }
