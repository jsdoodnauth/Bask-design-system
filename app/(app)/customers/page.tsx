"use client"

import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge, BadgeDot } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select"
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table"
import {
  PageHeader, PageHeaderTitle, PageHeaderMeta, PageHeaderActions,
} from "@/components/ui/app-shell"

type Plan = "Gold" | "Team" | "Silver" | "Bronze"
type Status = "Active" | "Trial" | "Cancelling"

const customers: { name: string; initials: string; color: "blue" | "green" | "violet" | "amber" | "red" | "brown"; plan: Plan; status: Status }[] = [
  { name: "Elena Marquez",   initials: "EM", color: "violet", plan: "Gold",   status: "Active"     },
  { name: "Daniel Torres",   initials: "DT", color: "brown",  plan: "Team",   status: "Active"     },
  { name: "Riley Park",      initials: "RP", color: "green",  plan: "Silver", status: "Trial"      },
  { name: "Sarah Miller",    initials: "SM", color: "violet", plan: "Gold",   status: "Active"     },
  { name: "Alex Taylor",     initials: "AT", color: "amber",  plan: "Bronze", status: "Cancelling" },
  { name: "Maya Nakamura",   initials: "MN", color: "blue",   plan: "Team",   status: "Active"     },
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

export default function CustomersPage() {
  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Customers</PageHeaderTitle>
          <PageHeaderMeta>248 total · 12 new this week</PageHeaderMeta>
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
          <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
              <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-3)" }} />
              <Input placeholder="Search customers…" style={{ paddingLeft: 34 }} />
            </div>
            <Select defaultValue="all">
              <SelectTrigger style={{ width: 140 }}>
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

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((c) => (
                <TableRow key={c.name}>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
