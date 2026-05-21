"use client"

import * as React from "react"
import { Search, Plus, Download, Trash2, Mail, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge, BadgeDot } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select"
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  SortableTableHead, TableBulkToolbar, TableEmpty,
  type SortDirection,
} from "@/components/ui/table"
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PageSizeSelector,
} from "@/components/ui/pagination"
import {
  PageHeader, PageHeaderTitle, PageHeaderMeta, PageHeaderActions,
} from "@/components/ui/app-shell"

type Plan = "Gold" | "Team" | "Silver" | "Bronze"
type Status = "Active" | "Trial" | "Cancelling"

type Customer = {
  id: string
  name: string
  initials: string
  color: "blue" | "green" | "violet" | "amber" | "red" | "brown"
  plan: Plan
  status: Status
}

const customers: Customer[] = [
  { id: "c-1",  name: "Elena Marquez",   initials: "EM", color: "violet", plan: "Gold",   status: "Active"     },
  { id: "c-2",  name: "Daniel Torres",   initials: "DT", color: "brown",  plan: "Team",   status: "Active"     },
  { id: "c-3",  name: "Riley Park",      initials: "RP", color: "green",  plan: "Silver", status: "Trial"      },
  { id: "c-4",  name: "Sarah Miller",    initials: "SM", color: "violet", plan: "Gold",   status: "Active"     },
  { id: "c-5",  name: "Alex Taylor",     initials: "AT", color: "amber",  plan: "Bronze", status: "Cancelling" },
  { id: "c-6",  name: "Maya Nakamura",   initials: "MN", color: "blue",   plan: "Team",   status: "Active"     },
  { id: "c-7",  name: "Devon Pratt",     initials: "DP", color: "red",    plan: "Gold",   status: "Active"     },
  { id: "c-8",  name: "Aria Chen",       initials: "AC", color: "blue",   plan: "Silver", status: "Trial"      },
  { id: "c-9",  name: "Léa Bernard",     initials: "LB", color: "green",  plan: "Team",   status: "Active"     },
  { id: "c-10", name: "Marcus Hale",     initials: "MH", color: "violet", plan: "Bronze", status: "Cancelling" },
  { id: "c-11", name: "Penelope Walker", initials: "PW", color: "amber",  plan: "Gold",   status: "Active"     },
  { id: "c-12", name: "Sophia Tang",     initials: "ST", color: "brown",  plan: "Team",   status: "Trial"      },
]

const planVariant: Record<Plan, "warn" | "info" | "neutral" | "danger"> = {
  Gold:   "warn",
  Team:   "info",
  Silver: "neutral",
  Bronze: "danger",
}
const planDot: Record<Plan, string> = {
  Gold:   "bg-amber",
  Team:   "bg-blue",
  Silver: "bg-ink-3",
  Bronze: "bg-red",
}
const statusVariant: Record<Status, "success" | "warn" | "danger"> = {
  Active:     "success",
  Trial:      "warn",
  Cancelling: "danger",
}
const statusDot: Record<Status, string> = {
  Active:     "bg-green",
  Trial:      "bg-amber",
  Cancelling: "bg-red",
}

type SortKey = "name" | "plan" | "status"

export default function CustomersPage() {
  const [planFilter, setPlanFilter] = React.useState<string>("all")
  const [search, setSearch] = React.useState("")
  const [sort, setSort] = React.useState<{ key: SortKey; dir: SortDirection }>({ key: "name", dir: "asc" })
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [pageSize, setPageSize] = React.useState(5)
  const [page, setPage] = React.useState(1)

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    return customers.filter((c) => {
      if (planFilter !== "all" && c.plan.toLowerCase() !== planFilter) return false
      if (q && !c.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [planFilter, search])

  const sorted = React.useMemo(() => {
    if (!sort.dir) return filtered
    const dir = sort.dir === "asc" ? 1 : -1
    return [...filtered].sort((a, b) =>
      a[sort.key].localeCompare(b[sort.key]) * dir
    )
  }, [filtered, sort])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paged = sorted.slice((safePage - 1) * pageSize, safePage * pageSize)

  const allOnPageSelected = paged.length > 0 && paged.every((c) => selected.has(c.id))
  const someOnPageSelected = paged.some((c) => selected.has(c.id))

  function toggleAllOnPage(checked: boolean) {
    const next = new Set(selected)
    paged.forEach((c) => (checked ? next.add(c.id) : next.delete(c.id)))
    setSelected(next)
  }

  function toggleRow(id: string, checked: boolean) {
    const next = new Set(selected)
    if (checked) next.add(id)
    else next.delete(id)
    setSelected(next)
  }

  function handleSort(key: SortKey, dir: SortDirection) {
    setSort({ key, dir })
  }

  function directionFor(key: SortKey): SortDirection {
    return sort.key === key ? sort.dir : null
  }

  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Customers</PageHeaderTitle>
          <PageHeaderMeta>{customers.length} total · 12 new this week</PageHeaderMeta>
        </div>
        <PageHeaderActions>
          <Button variant="primary"><Plus size={14} />Add customer</Button>
        </PageHeaderActions>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>All customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="relative flex-1 max-w-[360px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" aria-hidden />
              <Input
                placeholder="Search customers…"
                className="pl-8"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              />
            </div>
            <Select value={planFilter} onValueChange={(v) => { if (v) { setPlanFilter(v); setPage(1) } }}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All plans</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TableBulkToolbar
            selectedCount={selected.size}
            itemLabel={{ singular: "customer", plural: "customers" }}
            onClear={() => setSelected(new Set())}
          >
            <Button variant="default" size="sm"><Mail size={14} />Email</Button>
            <Button variant="default" size="sm"><Download size={14} />Export</Button>
            <Button variant="default" size="sm" className="text-red"><Trash2 size={14} />Delete</Button>
          </TableBulkToolbar>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    aria-label="Select all on this page"
                    checked={allOnPageSelected}
                    indeterminate={someOnPageSelected && !allOnPageSelected}
                    onCheckedChange={(v) => toggleAllOnPage(!!v)}
                  />
                </TableHead>
                <SortableTableHead
                  direction={directionFor("name")}
                  onSort={(d) => handleSort("name", d)}
                >
                  Customer
                </SortableTableHead>
                <SortableTableHead
                  direction={directionFor("plan")}
                  onSort={(d) => handleSort("plan", d)}
                >
                  Plan
                </SortableTableHead>
                <SortableTableHead
                  direction={directionFor("status")}
                  onSort={(d) => handleSort("status", d)}
                >
                  Status
                </SortableTableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.length === 0 ? (
                <TableEmpty
                  colSpan={4}
                  icon={<Users size={28} />}
                  title="No matching customers"
                  description="Try clearing the search or selecting a different plan filter."
                  action={
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => { setSearch(""); setPlanFilter("all") }}
                    >
                      Reset filters
                    </Button>
                  }
                />
              ) : (
                paged.map((c) => (
                  <TableRow key={c.id} data-state={selected.has(c.id) ? "selected" : undefined}>
                    <TableCell>
                      <Checkbox
                        aria-label={`Select ${c.name}`}
                        checked={selected.has(c.id)}
                        onCheckedChange={(v) => toggleRow(c.id, !!v)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar size="sm" color={c.color}>{c.initials}</Avatar>
                        <strong>{c.name}</strong>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={planVariant[c.plan]}>
                        <BadgeDot className={planDot[c.plan]} />
                        {c.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[c.status]}>
                        <BadgeDot className={statusDot[c.status]} />
                        {c.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between gap-3 mt-4 flex-wrap">
            <PageSizeSelector
              value={pageSize}
              onValueChange={(n) => { setPageSize(n); setPage(1) }}
              options={[5, 10, 15, 20, 50]}
            />
            <span className="text-[length:var(--fs-13)] text-ink-3 tabular-nums">
              {sorted.length === 0
                ? "0 results"
                : `${(safePage - 1) * pageSize + 1}–${Math.min(safePage * pageSize, sorted.length)} of ${sorted.length}`}
            </span>
            <Pagination className="mx-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    aria-disabled={safePage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={safePage === i + 1}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    aria-disabled={safePage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
