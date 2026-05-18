"use client"

import { CreditCard, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge, BadgeDot } from "@/components/ui/badge"
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table"
import {
  PageHeader, PageHeaderTitle, PageHeaderMeta, PageHeaderActions,
} from "@/components/ui/app-shell"

const invoices: { id: string; date: string; amount: string; status: "paid" | "upcoming" | "failed" }[] = [
  { id: "INV-1042", date: "May 1, 2026",  amount: "$19.00", status: "upcoming" },
  { id: "INV-1041", date: "Apr 1, 2026",  amount: "$19.00", status: "paid"     },
  { id: "INV-1040", date: "Mar 1, 2026",  amount: "$19.00", status: "paid"     },
  { id: "INV-1039", date: "Feb 1, 2026",  amount: "$19.00", status: "paid"     },
  { id: "INV-1038", date: "Jan 1, 2026",  amount: "$19.00", status: "failed"   },
  { id: "INV-1037", date: "Dec 1, 2025",  amount: "$19.00", status: "paid"     },
]

const statusMap = {
  paid:     { variant: "success" as const, dot: "bg-green", label: "Paid"     },
  upcoming: { variant: "info"    as const, dot: "bg-blue",  label: "Upcoming" },
  failed:   { variant: "danger"  as const, dot: "bg-red",   label: "Failed"   },
}

export default function BillingPage() {
  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Billing</PageHeaderTitle>
          <PageHeaderMeta>Plan, payment method, and invoices</PageHeaderMeta>
        </div>
        <PageHeaderActions>
          <Button variant="default">Manage payment method</Button>
        </PageHeaderActions>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: "var(--fs-22)", fontWeight: 700 }}>Pro</span>
                <Badge variant="info"><BadgeDot className="bg-blue" />Monthly</Badge>
              </div>
              <p style={{ color: "var(--ink-2)", margin: 0, fontSize: "var(--fs-13)" }}>
                $19/mo · renews May 1, 2026 · 4 sites, 248 customers
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Button variant="default">Change plan</Button>
              <Button variant="primary">Upgrade to Team</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment method</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 44, height: 32, borderRadius: "var(--r-xs)",
                background: "var(--surface-3)", boxShadow: "var(--elev-1)",
                display: "grid", placeItems: "center",
              }}>
                <CreditCard size={16} style={{ color: "var(--ink-2)" }} />
              </div>
              <div>
                <strong>Visa ending in 4242</strong>
                <div style={{ fontSize: "var(--fs-13)", color: "var(--ink-3)" }}>Expires 09/28</div>
              </div>
            </div>
            <Button variant="default">Replace</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead style={{ textAlign: "right" }}>Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => {
                const s = statusMap[inv.status]
                return (
                  <TableRow key={inv.id}>
                    <TableCell><strong>{inv.id}</strong></TableCell>
                    <TableCell style={{ color: "var(--ink-2)" }}>{inv.date}</TableCell>
                    <TableCell style={{ color: "var(--ink-2)" }}>{inv.amount}</TableCell>
                    <TableCell>
                      <Badge variant={s.variant}><BadgeDot className={s.dot} />{s.label}</Badge>
                    </TableCell>
                    <TableCell style={{ textAlign: "right" }}>
                      <Button variant="ghost" size="sm" disabled={inv.status !== "paid"}>
                        <Download size={13} />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
