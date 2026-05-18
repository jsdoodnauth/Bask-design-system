"use client"

import { Plus, Globe, BarChart3, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge, BadgeDot } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Stat } from "@/components/ui/stat"
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table"
import {
  PageHeader, PageHeaderTitle, PageHeaderMeta, PageHeaderActions,
} from "@/components/ui/app-shell"

const sites = [
  { name: "bloom-studio.com",  avatar: "🌸", color: "green",  status: "success", label: "Live",          requests: "8.4k",  latency: "118ms" },
  { name: "villamore.com",     avatar: "🏘", color: "blue",   status: "info",    label: "In progress",   requests: "—",     latency: "—"     },
  { name: "atlas-mag.com",     avatar: "☀", color: "amber",  status: "warn",    label: "7h stale",      requests: "3.1k",  latency: "203ms" },
  { name: "noir-quarterly.com",avatar: "📕", color: "red",    status: "danger",  label: "Failed backup", requests: "2.7k",  latency: "165ms" },
] as const

const dotByStatus = {
  success: "bg-green",
  info:    "bg-blue",
  warn:    "bg-amber",
  danger:  "bg-red",
} as const

export default function SitesPage() {
  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Sites</PageHeaderTitle>
          <PageHeaderMeta>4 sites · 1 needs attention</PageHeaderMeta>
        </div>
        <PageHeaderActions>
          <Button variant="primary"><Plus size={14} />New site</Button>
        </PageHeaderActions>
      </PageHeader>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <Stat label="Live" value="2" icon={<Globe size={16} />} tint="green" />
        <Stat label="Requests · 24h" value="14.2k" icon={<BarChart3 size={16} />} tint="blue" />
        <Stat label="Failed backups" value="1" icon={<Database size={16} />} tint="red" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All sites</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Site</TableHead>
                <TableHead>Status</TableHead>
                <TableHead style={{ textAlign: "right" }}>Requests · 24h</TableHead>
                <TableHead style={{ textAlign: "right" }}>Avg latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sites.map((s) => (
                <TableRow key={s.name}>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar size="sm" color={s.color === "amber" ? "amber" : s.color === "red" ? "red" : s.color === "blue" ? "blue" : "green"}>
                        <span style={{ fontSize: 13 }}>{s.avatar}</span>
                      </Avatar>
                      <strong>{s.name}</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={s.status as "success" | "info" | "warn" | "danger"}>
                      <BadgeDot className={dotByStatus[s.status]} />
                      {s.label}
                    </Badge>
                  </TableCell>
                  <TableCell style={{ textAlign: "right", color: "var(--ink-2)" }}>{s.requests}</TableCell>
                  <TableCell style={{ textAlign: "right", color: "var(--ink-2)" }}>{s.latency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
