"use client"

import {
  FolderKanban, ListChecks, DollarSign, Activity as ActIcon,
  Play, Clock, MoreHorizontal, Search, Filter, Download,
  Eye, Edit, Archive, CheckCircle2, CircleDot, CircleOff, CircleAlert,
} from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card"
import { Badge, BadgeDot } from "@/components/ui/badge"
import { Avatar, AvatarGroup } from "@/components/ui/avatar"
import { MiniStat } from "@/components/ui/mini-stat"
import { MetricTile } from "@/components/ui/metric-tile"
import { KPIStrip } from "@/components/ui/kpi-strip"
import { HorizontalBarRow } from "@/components/ui/horizontal-bar"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Input } from "@/components/ui/input"
import {
  PageHeader, PageHeaderTitle, PageHeaderMeta, PageHeaderActions,
} from "@/components/ui/app-shell"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table"

const sparkProjects = [22, 28, 25, 31, 27, 38, 34, 42, 39, 48]
const sparkTasks    = [42, 48, 45, 52, 50, 58, 56, 64, 62, 70]
const sparkEarn     = [16, 22, 19, 26, 24, 32, 28, 36, 33, 41]
const sparkProd     = [78, 76, 80, 78, 82, 80, 84, 82, 86, 84]

const performanceData = [
  { m: "Jan", projects: 18, revenue: 24 },
  { m: "Feb", projects: 22, revenue: 28 },
  { m: "Mar", projects: 28, revenue: 32 },
  { m: "Apr", projects: 24, revenue: 30 },
  { m: "May", projects: 32, revenue: 38 },
  { m: "Jun", projects: 38, revenue: 44 },
  { m: "Jul", projects: 42, revenue: 48 },
  { m: "Aug", projects: 46, revenue: 52 },
  { m: "Sep", projects: 50, revenue: 56 },
  { m: "Oct", projects: 54, revenue: 60 },
  { m: "Nov", projects: 58, revenue: 64 },
  { m: "Dec", projects: 62, revenue: 70 },
]

const statusBreakdown = [
  { label: "Completed",    count: 965, tint: "green"  as const, icon: <CheckCircle2 size={16} /> },
  { label: "In Progress",  count: 75,  tint: "blue"   as const, icon: <CircleDot size={16} />    },
  { label: "Yet to Start", count: 102, tint: "amber"  as const, icon: <CircleAlert size={16} /> },
  { label: "Cancelled",    count: 96,  tint: "red"    as const, icon: <CircleOff size={16} />   },
]

const schedule = [
  { start: "08:00", end: "09:30", title: "Daily standup",           who: "Eng + Design",      tint: "violet" as const },
  { start: "10:00", end: "11:15", title: "Acme Manufacturing demo", who: "Adam, David, Cara", tint: "blue"   as const },
  { start: "16:00", end: "17:30", title: "Q1 planning workshop",    who: "Leadership team",   tint: "amber"  as const },
]

const projects = [
  { name: "Atlas Magazine site",  company: "Atlas Media",       init: "AM", color: "amber"  as const, deadline: "12-Jan-2025", budget: "$48,200", team: ["AN","DL","CB"],         lead: { name: "Adam Newcombe",  init: "AN", color: "violet" as const }, status: "info"    as const, label: "In Progress" },
  { name: "Villamore redesign",   company: "Villamore Group",   init: "VG", color: "blue"   as const, deadline: "20-Jan-2025", budget: "$32,800", team: ["DL","HW","EM"],         lead: { name: "David Lee",      init: "DL", color: "blue"   as const }, status: "warn"    as const, label: "At risk"     },
  { name: "Bloom Studio launch",  company: "Bloom Studio",      init: "BS", color: "green"  as const, deadline: "02-Feb-2025", budget: "$58,400", team: ["LW","CB","DT","AN"],    lead: { name: "Lauren Wickham", init: "LW", color: "amber"  as const }, status: "info"    as const, label: "In Progress" },
  { name: "Noir Quarterly CMS",   company: "Noir Quarterly",    init: "NQ", color: "red"    as const, deadline: "18-Feb-2025", budget: "$18,200", team: ["EM","DT"],              lead: { name: "Elena Marquez",  init: "EM", color: "green"  as const }, status: "success" as const, label: "On track"    },
  { name: "Coderthemes refactor", company: "Coderthemes",       init: "CT", color: "violet" as const, deadline: "25-Feb-2025", budget: "$96,800", team: ["DL","CB","HW","DT","EM"],lead: { name: "David Lee",      init: "DL", color: "blue"   as const }, status: "info"    as const, label: "In Progress" },
  { name: "Atelier brand system", company: "Atelier Co.",       init: "AC", color: "brown"  as const, deadline: "06-Mar-2025", budget: "$24,600", team: ["CB","AN"],              lead: { name: "Cara Banks",     init: "CB", color: "green"  as const }, status: "danger"  as const, label: "Blocked"     },
]

const tasks = [
  { title: "Wire payment gateway sandbox",          due: "Tomorrow",    assignees: ["AN","DL"],      status: "info"    as const, label: "In review", time: "4h 20m"  },
  { title: "Migrate Atlas posts to new schema",     due: "Fri 10 Jan",  assignees: ["EM"],           status: "info"    as const, label: "In progress", time: "8h 04m" },
  { title: "Design comps for Bloom landing",        due: "Mon 13 Jan",  assignees: ["LW","CB"],      status: "warn"    as const, label: "Blocked",     time: "2h 12m" },
  { title: "QA pass on Villamore staging",          due: "Wed 15 Jan",  assignees: ["HW","DT"],      status: "info"    as const, label: "In progress", time: "1h 48m" },
  { title: "Setup CI for Noir Quarterly repo",      due: "Fri 17 Jan",  assignees: ["DL"],           status: "success" as const, label: "Done",        time: "3h 30m" },
  { title: "Brand audit deck for Atelier review",   due: "Mon 20 Jan",  assignees: ["CB","AN","DT"], status: "info"    as const, label: "In progress", time: "6h 12m" },
]

const perfConfig = {
  projects: { label: "Projects", color: "var(--violet)" },
  revenue:  { label: "Revenue",  color: "var(--blue)"   },
}

export default function ProjectsDashboardPage() {
  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Projects</PageHeaderTitle>
          <PageHeaderMeta>
            <Badge variant="info"><BadgeDot className="bg-blue" />6 active</Badge>
            Productivity 84%
          </PageHeaderMeta>
        </div>
        <PageHeaderActions>
          <Breadcrumbs
            items={[
              { label: "Paces", href: "#" },
              { label: "Dashboard", href: "#" },
              { label: "Projects" },
            ]}
          />
        </PageHeaderActions>
      </PageHeader>

      {/* Row 1 — 4 top stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <MiniStat label="Total Projects"  value="84"      delta="+9.19%"  deltaUp tint="violet" icon={<FolderKanban size={14} />} series={sparkProjects} sub="Since last month" />
        <MiniStat label="Total Tasks"     value="2.4k"    delta="+26.87%" deltaUp tint="blue"   icon={<ListChecks size={14} />}   series={sparkTasks}    spark="bar" sub="Since last month" />
        <MiniStat label="Avg. Earnings"   value="$48.20k" delta="+3.51%"  deltaUp tint="green"  icon={<DollarSign size={14} />}   series={sparkEarn}     sub="Per project" />
        <MiniStat label="Productivity"    value="84%"     delta="+1.05%"  deltaUp tint="amber"  icon={<ActIcon size={14} />}      series={sparkProd}     sub="Since last month" />
      </div>

      {/* Row 2 — Today's Hours + Project Status Breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 16 }}>
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Hours</CardTitle>
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-3">
              <div className="size-12 rounded-md grid place-items-center bg-tint-violet text-violet [box-shadow:var(--elev-1)] flex-none">
                <Clock size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-[length:var(--fs-12)] text-ink-3 uppercase font-bold tracking-[var(--tracking-eyebrow)]">Tracked today</span>
                <span className="font-mono font-bold tabular-nums text-[length:var(--fs-28)] text-ink leading-tight">05:30:57</span>
              </div>
            </div>
            <Button variant="primary" size="sm" className="w-full"><Play size={14} />Start tracker</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Status Breakdown</CardTitle>
            <CardAction className="flex items-center gap-2">
              <Button variant="ghost" size="sm"><Filter size={14} />Filter</Button>
              <Button variant="ghost" size="sm"><Download size={14} />Export</Button>
              <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {statusBreakdown.map((s) => (
                <MetricTile
                  key={s.label}
                  variant="inset"
                  iconSize="sm"
                  icon={s.icon}
                  tint={s.tint}
                  label={s.label}
                  value={s.count}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3 — Projects Performance Overview (full) */}
      <Card>
        <CardHeader>
          <CardTitle>Projects Performance Overview</CardTitle>
          <CardAction className="flex items-center gap-2">
            <Badge variant="info">12 months</Badge>
            <Button variant="ghost" size="sm"><Download size={14} />Export CSV</Button>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <KPIStrip
            className="mb-4"
            items={[
              { label: "Projects", value: "84",      delta: "+9.19%", deltaVariant: "success" },
              { label: "Active",   value: "28",      delta: "+4.2%",  deltaVariant: "info"    },
              { label: "Revenue",  value: "$248.6k", delta: "+12.4%", deltaVariant: "success" },
              { label: "Hours",    value: "1,840h",  delta: "-1.1%",  deltaVariant: "warn"    },
            ]}
          />
          <ChartContainer config={perfConfig} className="h-[280px]">
            <BarChart data={performanceData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="m" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="projects" fill="var(--violet)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="revenue"  fill="var(--blue)"   radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Row 4 — Today's Schedule (half) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
            <CardAction className="flex items-center gap-2">
              <Button variant="ghost" size="sm">View all</Button>
              <Button variant="ghost" size="sm">Add new</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              {schedule.map((s, i) => (
                <div
                  key={s.title}
                  className={
                    "grid grid-cols-[80px_auto_1fr] gap-3 items-center py-3 " +
                    (i > 0 ? "border-t border-[color:var(--hairline)]" : "")
                  }
                >
                  <div className="font-mono text-[length:var(--fs-13)] text-ink-2 tabular-nums">
                    <div>{s.start}</div>
                    <div className="text-ink-3 text-[11px]">{s.end}</div>
                  </div>
                  <span aria-hidden className={`size-2 rounded-full`} style={{ background: `var(--${s.tint})` }} />
                  <div className="flex flex-col min-w-0">
                    <strong className="text-[length:var(--fs-14)] truncate">{s.title}</strong>
                    <span className="text-[length:var(--fs-12)] text-ink-3 truncate">{s.who}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
            <CardAction>
              <Badge variant="info">This sprint</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {[
                { name: "Engineering", pct: 78, tint: "violet" as const, used: "624h", total: "800h" },
                { name: "Design",      pct: 52, tint: "blue"   as const, used: "208h", total: "400h" },
                { name: "QA",          pct: 64, tint: "amber"  as const, used: "192h", total: "300h" },
                { name: "Ops",         pct: 38, tint: "green"  as const, used: "120h", total: "320h" },
              ].map((t) => (
                <HorizontalBarRow
                  key={t.name}
                  label={t.name}
                  value={t.pct}
                  tint={t.tint}
                  tail={`${t.used} / ${t.total}`}
                  labelWidth={92}
                  tailWidth={88}
                  height={24}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 5 — Ongoing Projects table */}
      <Card>
        <CardHeader>
          <CardTitle>Ongoing Projects</CardTitle>
          <CardAction className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3 pointer-events-none" aria-hidden />
              <Input
                type="search"
                placeholder="Search…"
                className="pl-8 py-1.5 text-[length:var(--fs-13)] w-[200px] [box-shadow:var(--elev-inset)]"
              />
            </div>
            <Button variant="ghost" size="sm"><Filter size={14} />Filter</Button>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" color={p.color}>{p.init}</Avatar>
                      <div className="flex flex-col">
                        <strong className="text-[length:var(--fs-14)]">{p.name}</strong>
                        <span className="text-[length:var(--fs-12)] text-ink-3">{p.company}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-ink-2">{p.deadline}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold">{p.budget}</TableCell>
                  <TableCell>
                    <AvatarGroup>
                      {p.team.map((t, i) => (
                        <Avatar
                          key={i}
                          size="sm"
                          color={(["violet","blue","green","amber","red","brown"] as const)[i % 6]}
                        >
                          {t}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" color={p.lead.color}>{p.lead.init}</Avatar>
                      <span className="text-[length:var(--fs-13)]">{p.lead.name}</span>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant={p.status}>{p.label}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-1">
                      <Button variant="ghost" size="icon-sm" aria-label="View"><Eye size={14} /></Button>
                      <Button variant="ghost" size="icon-sm" aria-label="Edit"><Edit size={14} /></Button>
                      <Button variant="ghost" size="icon-sm" aria-label="Archive"><Archive size={14} /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Row 6 — Tasks table */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardAction className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><Filter size={14} />Filter</Button>
            <Button variant="ghost" size="sm"><Download size={14} />Export</Button>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Assignees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Time spent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((t) => (
                <TableRow key={t.title}>
                  <TableCell className="font-medium">{t.title}</TableCell>
                  <TableCell className="text-ink-2">{t.due}</TableCell>
                  <TableCell>
                    <AvatarGroup>
                      {t.assignees.map((a, i) => (
                        <Avatar
                          key={i}
                          size="sm"
                          color={(["violet","blue","green","amber","red"] as const)[i % 5]}
                        >
                          {a}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell><Badge variant={t.status}>{t.label}</Badge></TableCell>
                  <TableCell className="text-right tabular-nums text-ink-2">{t.time}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-1">
                      <Button variant="ghost" size="icon-sm" aria-label="View"><Eye size={14} /></Button>
                      <Button variant="ghost" size="icon-sm" aria-label="Edit"><Edit size={14} /></Button>
                      <Button variant="ghost" size="icon-sm" aria-label="Done"><CheckCircle2 size={14} /></Button>
                    </div>
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
