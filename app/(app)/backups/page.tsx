"use client"

import { Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge, BadgeDot } from "@/components/ui/badge"
import {
  PageHeader, PageHeaderTitle, PageHeaderMeta, PageHeaderActions,
} from "@/components/ui/app-shell"

type Status = "upcoming" | "complete" | "failed"
const backups: { when: string; detail: string; status: Status }[] = [
  { when: "Tonight, 02:00 AM",       detail: "Scheduled · daily",                       status: "upcoming" },
  { when: "Today, 02:00 AM",         detail: "Full snapshot · 412 MB",                  status: "complete" },
  { when: "Yesterday, 02:00 AM",     detail: "Full snapshot · 408 MB",                  status: "complete" },
  { when: "2 days ago, 02:00 AM",    detail: "Connection timed out after 5 minutes",    status: "failed"   },
  { when: "3 days ago, 02:00 AM",    detail: "Full snapshot · 405 MB",                  status: "complete" },
  { when: "4 days ago, 02:00 AM",    detail: "Full snapshot · 402 MB",                  status: "complete" },
]

const statusMap: Record<Status, { variant: "info" | "success" | "danger"; dot: string; label: string }> = {
  upcoming: { variant: "info",    dot: "bg-blue",  label: "Upcoming" },
  complete: { variant: "success", dot: "bg-green", label: "Complete" },
  failed:   { variant: "danger",  dot: "bg-red",   label: "Failed"   },
}

export default function BackupsPage() {
  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Backups</PageHeaderTitle>
          <PageHeaderMeta>
            <Badge variant="success"><BadgeDot className="bg-green" />Daily schedule active</Badge>
            Next run in 6 hours
          </PageHeaderMeta>
        </div>
        <PageHeaderActions>
          <Button variant="default">Configure schedule</Button>
          <Button variant="primary"><Database size={14} />Run backup now</Button>
        </PageHeaderActions>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {backups.map((b, i) => {
              const s = statusMap[b.status]
              return (
                <div
                  key={b.when}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 0",
                    borderTop: i === 0 ? "none" : "1px solid var(--hairline)",
                    gap: 16,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                    <strong>{b.when}</strong>
                    <span className="muted" style={{ fontSize: "var(--fs-12)" }}>{b.detail}</span>
                  </div>
                  <Badge variant={s.variant}>
                    <BadgeDot className={s.dot} />
                    {s.label}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
