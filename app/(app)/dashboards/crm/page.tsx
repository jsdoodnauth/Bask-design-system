"use client"

import {
  Target, Users, DollarSign, TrendingUp, RefreshCcw, AlertCircle,
  MoreHorizontal, Search, Filter, Download, Upload,
  ShoppingCart, UserPlus, FileText,
} from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card"
import { Badge, BadgeDot } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { MiniStat } from "@/components/ui/mini-stat"
import { DonutTotal } from "@/components/ui/donut-total"
import { Alert, AlertDescription, AlertActions } from "@/components/ui/alert"
import { HorizontalBarRow } from "@/components/ui/horizontal-bar"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Activity, ActivityItem } from "@/components/ui/activity"
import { Input } from "@/components/ui/input"
import {
  PageHeader, PageHeaderTitle, PageHeaderMeta, PageHeaderActions,
} from "@/components/ui/app-shell"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table"

const sparkLeads    = [22, 28, 25, 31, 27, 38, 34, 42, 39, 48]
const sparkQual     = [44, 40, 46, 42, 48, 45, 40, 38, 36, 32]
const sparkDeals    = [16, 22, 19, 26, 24, 32, 28, 36, 33, 41]
const sparkRevenue  = [62, 58, 55, 60, 64, 68, 72, 70, 76, 82]
const sparkOrders   = [12, 18, 15, 22, 20, 28, 26, 32, 30, 36]
const sparkUsers    = [42, 46, 44, 50, 48, 54, 52, 60, 58, 64]
const sparkContract = [10, 11, 9, 12, 11, 10, 12, 11, 12, 11]

const overviewData = [
  { m: "Jan", a: 24, b: 18 },
  { m: "Feb", a: 28, b: 22 },
  { m: "Mar", a: 32, b: 24 },
  { m: "Apr", a: 36, b: 28 },
  { m: "May", a: 42, b: 32 },
  { m: "Jun", a: 38, b: 28 },
  { m: "Jul", a: 46, b: 34 },
  { m: "Aug", a: 52, b: 40 },
  { m: "Sep", a: 48, b: 38 },
  { m: "Oct", a: 56, b: 42 },
  { m: "Nov", a: 62, b: 46 },
  { m: "Dec", a: 68, b: 52 },
]

const leadSourceData = [
  { label: "Website",    value: 443, color: "var(--violet)" },
  { label: "Instagram",  value: 348, color: "var(--red)"    },
  { label: "WhatsApp",   value: 89,  color: "var(--green)"  },
  { label: "Newsletter", value: 64,  color: "var(--blue)"   },
]

const dealStatusData = [
  { stage: "Paused",     count: 5,  color: "var(--ink-3)"   },
  { stage: "New",        count: 18, color: "var(--blue)"    },
  { stage: "Cold Lead",  count: 12, color: "var(--amber)"   },
  { stage: "Canceled",   count: 8,  color: "var(--red)"     },
  { stage: "Deal Won",   count: 20, color: "var(--green)"   },
]
const dealStatusMax = Math.max(...dealStatusData.map((d) => d.count))

const deals = [
  { id: "BD24218", name: "Ashton M001",  company: "Verteen Lewis",  pipeline: "warn"    as const, pipelineLabel: "Negotiate", close: "26-Dec-2024", user: { name: "Adam Newcombe", initials: "AN", color: "violet" as const }, value: "1,820",  status: "info"    as const, statusLabel: "Open" },
  { id: "BD24208", name: "Lincoln A205", company: "Newville",       pipeline: "info"    as const, pipelineLabel: "Qualified", close: "21-Dec-2024", user: { name: "David Lee",      initials: "DL", color: "blue"   as const }, value: "2,830",  status: "success" as const, statusLabel: "Won"  },
  { id: "BD24207", name: "Hyssop P002",  company: "Chase Norvel",   pipeline: "violet"  as const, pipelineLabel: "Proposal",  close: "18-Dec-2024", user: { name: "Cara Banks",     initials: "CB", color: "green"  as const }, value: "4,820",  status: "info"    as const, statusLabel: "Open" },
  { id: "BD24201", name: "EllaCott",     company: "EllaCott LLC",   pipeline: "success" as const, pipelineLabel: "Closed",    close: "14-Dec-2024", user: { name: "David Lee",      initials: "DL", color: "blue"   as const }, value: "1,310",  status: "success" as const, statusLabel: "Won"  },
  { id: "BD24109", name: "Annie N503",   company: "Colmed Stores",  pipeline: "danger"  as const, pipelineLabel: "Lost",      close: "08-Aug-2024", user: { name: "Lauren Wickham", initials: "LW", color: "amber"  as const }, value: "920",    status: "danger"  as const, statusLabel: "Lost" },
  { id: "BD24087", name: "Aspen B416",   company: "Bracewell",      pipeline: "warn"    as const, pipelineLabel: "Negotiate", close: "02-Aug-2024", user: { name: "Henry Watson",   initials: "HW", color: "red"    as const }, value: "3,418",  status: "info"    as const, statusLabel: "Open" },
  { id: "BD24064", name: "Galen S012",   company: "Silverspur",     pipeline: "info"    as const, pipelineLabel: "Qualified", close: "29-Jul-2024", user: { name: "Adam Newcombe",  initials: "AN", color: "violet" as const }, value: "612",    status: "success" as const, statusLabel: "Won"  },
  { id: "BD24038", name: "Korbin T108",  company: "Tindale & Co",   pipeline: "violet"  as const, pipelineLabel: "Proposal",  close: "20-Jul-2024", user: { name: "Cara Banks",     initials: "CB", color: "green"  as const }, value: "2,148",  status: "info"    as const, statusLabel: "Open" },
]

const topPerformers = [
  { name: "Jeremy Young",   role: "Senior Sales Executive",   leads: 248, deals: 67, tasks: 24 },
  { name: "Thomas Krueger", role: "Senior Sales Executive",   leads: 198, deals: 54, tasks: 19 },
  { name: "Pete Burnitt",   role: "Mid-tier Sales Executive", leads: 162, deals: 42, tasks: 16 },
  { name: "Henry Watson",   role: "Senior Sales Executive",   leads: 134, deals: 38, tasks: 14 },
  { name: "Emma Stetson",   role: "Mid-tier Sales Executive", leads: 109, deals: 28, tasks: 11 },
]

const locations = [
  { country: "United States", flag: "🇺🇸", sessions: "8,520", users: "4,210", pct: "62.5%", tint: "blue"  as const },
  { country: "India",         flag: "🇮🇳", sessions: "5,128", users: "2,840", pct: "28.7%", tint: "amber" as const },
  { country: "Australia",     flag: "🇦🇺", sessions: "2,114", users: "1,120", pct:  "8.8%", tint: "green" as const },
]

const overviewConfig = {
  a: { label: "New leads",    color: "var(--violet)" },
  b: { label: "Closed deals", color: "var(--blue)"   },
}

export default function CRMDashboardPage() {
  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>CRM</PageHeaderTitle>
          <PageHeaderMeta>
            <Badge variant="info"><BadgeDot className="bg-blue" />Pipeline live</Badge>
            42 open deals
          </PageHeaderMeta>
        </div>
        <PageHeaderActions>
          <Breadcrumbs
            items={[
              { label: "Paces", href: "#" },
              { label: "Dashboard", href: "#" },
              { label: "CRM" },
            ]}
          />
        </PageHeaderActions>
      </PageHeader>

      {/* Row 1 — 4 top stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <MiniStat
          label="Leads Generated" value="48.2k" delta="+5.12%" deltaUp
          tint="violet" icon={<Target size={14} />} series={sparkLeads}
          sub="2.3k Up · Last 30 Days"
        />
        <MiniStat
          label="Qualified Leads" value="12.6k" delta="-3.45%" deltaUp={false}
          tint="amber" icon={<Users size={14} />} series={sparkQual} spark="bar"
          sub="0.4k Down · Last 30 Days"
        />
        <MiniStat
          label="Deals Closed" value="9.7k" delta="+2.94%" deltaUp
          tint="blue" icon={<TrendingUp size={14} />} series={sparkDeals}
          sub="1.1k Up · Last 30 Days"
        />
        <MiniStat
          label="Revenue Generated" value="$5.83M" delta="+4.21%" deltaUp
          tint="green" icon={<DollarSign size={14} />} series={sparkRevenue}
          sub="$32.4k Up · Last 30 Days"
        />
      </div>

      {/* Row 2 — Overview (Current Year) */}
      <Card>
        <CardHeader>
          <CardTitle>Overview <span className="text-ink-3 font-normal text-[length:var(--fs-13)] ml-1">Current Year</span></CardTitle>
          <CardAction className="flex items-center gap-2">
            <Badge variant="info">All</Badge>
            <Badge>1M</Badge>
            <Badge>6M</Badge>
            <Badge>1Y</Badge>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Alert variant="warn" className="mb-4">
            <AlertCircle />
            <AlertDescription>
              Server returned an error while syncing the latest leads.{" "}
              <a href="#" className="underline font-semibold">Refresh now</a>
            </AlertDescription>
            <AlertActions>
              <Button variant="default" size="sm"><RefreshCcw size={14} />Refresh</Button>
            </AlertActions>
          </Alert>
          <ChartContainer config={overviewConfig} className="h-[260px]">
            <BarChart data={overviewData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="m" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="a" fill="var(--violet)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="b" fill="var(--blue)"   radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Row 3 — 4 mini stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <MiniStat
          label="Revenue" value="$48.6k" delta="+3.91%" deltaUp
          tint="green" icon={<DollarSign size={14} />} series={sparkRevenue}
        />
        <MiniStat
          label="Orders" value="2,830" delta="+8.72%" deltaUp
          tint="blue" icon={<ShoppingCart size={14} />} series={sparkOrders} spark="bar"
        />
        <MiniStat
          label="New Users" value="14.2k" delta="+11.20%" deltaUp
          tint="violet" icon={<UserPlus size={14} />} series={sparkUsers}
        />
        <MiniStat
          label="New Contract" value="124" delta="0.00%" deltaUp
          tint="amber" icon={<FileText size={14} />} series={sparkContract} spark="bar"
        />
      </div>

      {/* Row 4 — Lead Source + Deal Status */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <CardHeader>
            <CardTitle>Lead Source</CardTitle>
            <CardAction className="flex items-center gap-2">
              <Button variant="ghost" size="sm"><Download size={14} />Export</Button>
              <Button variant="ghost" size="sm"><Upload size={14} />Import</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <DonutTotal
              data={leadSourceData}
              total="944"
              sublabel="Total leads"
              size={220}
              legendValueFormatter={(s, p) => `${p.toFixed(1)}%`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deal Status</CardTitle>
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {dealStatusData.map((s) => (
                <HorizontalBarRow
                  key={s.stage}
                  label={s.stage}
                  value={(s.count / dealStatusMax) * 100}
                  tint={s.color}
                  tail={s.count}
                  labelWidth={88}
                  tailWidth={28}
                  height={28}
                />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 text-[length:var(--fs-12)] text-ink-3 tabular-nums text-center">
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 5 — Deal Status table */}
      <Card>
        <CardHeader>
          <CardTitle>Deal Status Table</CardTitle>
          <CardAction className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3 pointer-events-none" aria-hidden />
              <Input
                type="search"
                placeholder="Search…"
                className="pl-8 py-1.5 text-[length:var(--fs-13)] w-[200px] [box-shadow:var(--elev-inset)]"
              />
            </div>
            <Button variant="ghost" size="sm"><Filter size={14} />Filter by</Button>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal ID</TableHead>
                <TableHead>Deal name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Pipeline</TableHead>
                <TableHead>Closing date</TableHead>
                <TableHead>User responsible</TableHead>
                <TableHead className="text-right">Deal value</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-mono text-[length:var(--fs-13)] text-ink-2">#{d.id}</TableCell>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell className="text-ink-2">{d.company}</TableCell>
                  <TableCell><Badge variant={d.pipeline}>{d.pipelineLabel}</Badge></TableCell>
                  <TableCell className="text-ink-2">{d.close}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" color={d.user.color}>{d.user.initials}</Avatar>
                      <span className="text-[length:var(--fs-13)]">{d.user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-semibold">${d.value}</TableCell>
                  <TableCell className="text-right"><Badge variant={d.status}>{d.statusLabel}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Row 6 — Top Performing + Location By Session */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <CardHeader>
            <CardTitle>Top Performing</CardTitle>
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="text-right">Leads</TableHead>
                  <TableHead className="text-right">Deals</TableHead>
                  <TableHead className="text-right">Tasks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPerformers.map((p, i) => (
                  <TableRow key={p.name}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar size="sm" color={(["violet","blue","green","amber","red"] as const)[i % 5]}>
                          {p.name.split(" ").map((n) => n[0]).join("")}
                        </Avatar>
                        <div className="flex flex-col">
                          <strong className="text-[length:var(--fs-14)]">{p.name}</strong>
                          <span className="text-[length:var(--fs-12)] text-ink-3">{p.role}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{p.leads}</TableCell>
                    <TableCell className="text-right tabular-nums">{p.deals}</TableCell>
                    <TableCell className="text-right tabular-nums">{p.tasks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location By Session</CardTitle>
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-right">Sessions</TableHead>
                  <TableHead className="text-right">Users</TableHead>
                  <TableHead className="text-right">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locations.map((l) => (
                  <TableRow key={l.country}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: 18 }} aria-hidden>{l.flag}</span>
                        <span className="font-medium">{l.country}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{l.sessions}</TableCell>
                    <TableCell className="text-right tabular-nums text-ink-2">{l.users}</TableCell>
                    <TableCell className="text-right"><Badge variant="info">{l.pct}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[color:var(--hairline)]">
              <Button variant="ghost" size="sm">Show top countries</Button>
              <Button variant="ghost" size="sm">View city breakdown</Button>
              <Button variant="ghost" size="sm"><Download size={14} />Download</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 7 — Recent Activity (full) */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardAction className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><Filter size={14} />Filter</Button>
            <Button variant="ghost" size="sm"><Download size={14} />Export logs</Button>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Activity>
            <ActivityItem avatar={<Avatar size="sm" color="green">SC</Avatar>} time="3 hours ago">
              <strong>15 new leads</strong> received from the website form
              <p className="text-[length:var(--fs-13)] text-ink-3 m-0">Attributed to <strong>Adam Newcombe</strong></p>
            </ActivityItem>
            <ActivityItem avatar={<Avatar size="sm" color="blue">LF</Avatar>} time="Yesterday">
              <strong>Lead follow-up</strong> completed for Verteen Lewis
              <p className="text-[length:var(--fs-13)] text-ink-3 m-0">By <strong>David Lee</strong></p>
            </ActivityItem>
            <ActivityItem avatar={<Avatar size="sm" color="violet">SC</Avatar>} time="2 days ago">
              <strong>Sales calls logged</strong>
              <p className="text-[length:var(--fs-13)] text-ink-3 m-0">8 calls completed across 6 accounts</p>
            </ActivityItem>
            <ActivityItem avatar={<Avatar size="sm" color="amber">TM</Avatar>} time="3 days ago">
              <strong>Team meeting</strong> scheduled for next Tuesday
              <p className="text-[length:var(--fs-13)] text-ink-3 m-0">By <strong>Cara Banks</strong></p>
            </ActivityItem>
            <ActivityItem avatar={<Avatar size="sm" color="red">DW</Avatar>} time="4 days ago">
              <strong>Deal won</strong> — Newville closed at $2,830
              <p className="text-[length:var(--fs-13)] text-ink-3 m-0">By <strong>David Lee</strong></p>
            </ActivityItem>
            <ActivityItem avatar={<Avatar size="sm" color="brown">CP</Avatar>} time="5 days ago">
              <strong>Campaign launched</strong> — Q4 outreach in motion
              <p className="text-[length:var(--fs-13)] text-ink-3 m-0">By <strong>Lauren Wickham</strong></p>
            </ActivityItem>
          </Activity>
        </CardContent>
      </Card>
    </>
  )
}
