"use client"

import { Globe, BarChart3, Database, Shield, GitPullRequest, KeyRound, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge, BadgeDot } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Stat } from "@/components/ui/stat"
import { Activity, ActivityItem } from "@/components/ui/activity"
import {
  PageHeader, PageHeaderTitle, PageHeaderMeta, PageHeaderActions,
} from "@/components/ui/app-shell"

const sites = [
  { name: "bloom-studio.com",  initials: "🌸", color: "green",  status: "success", label: "Live"           },
  { name: "villamore.com",     initials: "🏘", color: "blue",   status: "info",    label: "In progress"    },
  { name: "atlas-mag.com",     initials: "☀", color: "amber",  status: "warn",    label: "7 hours stale"  },
  { name: "noir-quarterly.com",initials: "📕", color: "red",    status: "danger",  label: "Failed backup"  },
] as const

const dotByStatus: Record<typeof sites[number]["status"], string> = {
  success: "bg-green",
  info:    "bg-blue",
  warn:    "bg-amber",
  danger:  "bg-red",
}

export default function DashboardPage() {
  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Dashboard</PageHeaderTitle>
          <PageHeaderMeta>
            <Badge variant="success"><BadgeDot className="bg-green" />4 sites operational</Badge>
            Last refresh just now
          </PageHeaderMeta>
        </div>
        <PageHeaderActions>
          <Button variant="default">Invite teammate</Button>
          <Button variant="primary"><Plus size={14} />New site</Button>
        </PageHeaderActions>
      </PageHeader>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <Stat label="Uptime · 30d" value="99.98%" icon={<BarChart3 size={16} />} tint="green" />
        <Stat label="Requests · 24h" value="14.2k" icon={<Globe size={16} />} tint="blue" />
        <Stat label="Avg latency" value="142ms" icon={<Database size={16} />} tint="amber" />
        <Stat label="Open alerts" value="3" icon={<Shield size={16} />} tint="red" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
        <Card>
          <CardHeader>
            <CardTitle>Sites</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {sites.map((s, i) => (
                <div
                  key={s.name}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 0",
                    borderTop: i === 0 ? "none" : "1px solid var(--hairline)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar size="sm" color={s.color === "amber" ? "amber" : s.color === "red" ? "red" : s.color === "blue" ? "blue" : "green"}>
                      <span style={{ fontSize: 13 }}>{s.initials}</span>
                    </Avatar>
                    <strong>{s.name}</strong>
                  </div>
                  <Badge variant={s.status as "success" | "info" | "warn" | "danger"}>
                    <BadgeDot className={dotByStatus[s.status]} />
                    {s.label}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Activity>
              <ActivityItem
                avatar={<Avatar size="sm" color="green">EM</Avatar>}
                time="2 hours ago"
              >
                <strong>Elena Marquez</strong> deployed <code>v2.4.1</code>
              </ActivityItem>
              <ActivityItem
                avatar={<Avatar size="sm" color="violet">SM</Avatar>}
                time="Yesterday at 4:32 PM"
              >
                <strong>Sarah Miller</strong> opened PR <code>#412</code>
              </ActivityItem>
              <ActivityItem
                avatar={<Avatar size="sm" color="brown">DT</Avatar>}
                time="2 days ago"
              >
                <strong>Daniel Torres</strong> rotated the API key
              </ActivityItem>
              <ActivityItem
                avatar={<Avatar size="sm" color="amber">AT</Avatar>}
                time="3 days ago"
              >
                <strong>Alex Taylor</strong> resolved 3 vulnerability alerts
              </ActivityItem>
            </Activity>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
