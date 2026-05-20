"use client"

import {
  ShoppingCart, Users, Smartphone, Monitor, UserPlus,
  Mail, Share2, ArrowDownToLine, PartyPopper,
  MoreHorizontal, Download, Upload, Trash2, Edit, Eye,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card"
import { Badge, BadgeDot } from "@/components/ui/badge"
import { MiniStat } from "@/components/ui/mini-stat"
import { MetricTile } from "@/components/ui/metric-tile"
import { KPIStrip } from "@/components/ui/kpi-strip"
import { WorldMap } from "@/components/ui/world-map"
import { SourceList } from "@/components/ui/source-list"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import {
  PageHeader, PageHeaderTitle, PageHeaderMeta, PageHeaderActions,
} from "@/components/ui/app-shell"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table"
import { RowActionMenu } from "@/components/ui/row-action-menu"
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import {
  Progress, ProgressTrack, ProgressIndicator,
} from "@/components/ui/progress"

const sparkOrders   = [22, 28, 25, 31, 27, 38, 34, 42, 39, 48]
const sparkVisitors = [44, 40, 46, 42, 48, 45, 52, 49, 56, 53]
const sparkSubs     = [16, 22, 19, 26, 24, 32, 28, 36, 33, 41]

const goals = [
  { name: "Total Visitors",  completed: "82,420",  target: "100,000", pct: 82, tint: "violet" as const },
  { name: "Mobile Traffic",  completed: "41,927",  target: "60,000",  pct: 69, tint: "blue"   as const },
  { name: "Desktop Traffic", completed: "18,476",  target: "30,000",  pct: 61, tint: "amber"  as const },
]

const sessionsData = Array.from({ length: 30 }, (_, i) => ({
  d: `D${i + 1}`,
  users:    1200 + Math.round(Math.sin(i / 2) * 380 + Math.random() * 240),
  sessions:  700 + Math.round(Math.cos(i / 2.4) * 280 + Math.random() * 180),
}))

const audiencePages = [
  { page: "/dashboard-analytics",   views: "12,840", bounce: "32.1%" },
  { page: "/dashboard-crm",         views:  "9,612", bounce: "28.6%" },
  { page: "/ubold/dashboard",       views:  "7,224", bounce: "41.2%" },
  { page: "/blog/launch",           views:  "5,810", bounce: "52.4%" },
  { page: "/blog/how-it-works",     views:  "4,308", bounce: "47.6%" },
]

const geoCountries = [
  { name: "United States", flag: "🇺🇸", visits: "67.5k",  pct: "72.15%", deltaUp: true,  tint: "blue"   as const, lng: -98, lat: 39 },
  { name: "India",         flag: "🇮🇳", visits: "7.92k",  pct: "28.65%", deltaUp: true,  tint: "amber"  as const, lng:  78, lat: 22 },
  { name: "Brazil",        flag: "🇧🇷", visits: "89.05k", pct: "62.50%", deltaUp: true,  tint: "green"  as const, lng: -55, lat: -10 },
  { name: "Canada",        flag: "🇨🇦", visits: "5.3k",   pct: "42.20%", deltaUp: false, tint: "violet" as const, lng:-106, lat: 56 },
] as const

const trafficSources = [
  { label: "Google",     value: "87.8k", delta: "+12.4%", deltaUp: true,  brand: "google"    as const },
  { label: "Instagram",  value: "42.9k", delta: "+8.1%",  deltaUp: true,  brand: "instagram" as const },
  { label: "LinkedIn",   value: "58.5k", delta: "+3.6%",  deltaUp: true,  initials: "in",   tint: "blue"   as const },
  { label: "Dribbble",   value: "2.85k", delta: "+0.9%",  deltaUp: true,  brand: "dribbble"  as const },
  { label: "Messenger",  value: "9.08k", delta: "+2.0%",  deltaUp: true,  brand: "messenger" as const },
  { label: "Meta",       value: "77.7k", delta: "+6.1%",  deltaUp: true,  brand: "meta"      as const },
  { label: "Telegram",   value: "31.5k", delta: "+4.2%",  deltaUp: true,  brand: "telegram"  as const },
  { label: "Twitter X",  value: "22.6k", delta: "-1.2%",  deltaUp: false, brand: "x"         as const },
  { label: "WhatsApp",   value: "3.1k",  delta: "+5.3%",  deltaUp: true,  brand: "whatsapp"  as const },
  { label: "Snapchat",   value: "5.8k",  delta: "-0.4%",  deltaUp: false, brand: "snapchat"  as const },
]

const browsers = [
  { label: "Chrome",  value: "62.5%", delta: "+5.06%", deltaUp: true,  brand: "chrome"  as const },
  { label: "Firefox", value: "12.3%", delta: "+1.50%", deltaUp: true,  brand: "firefox" as const },
  { label: "Safari",  value: "9.86%", delta: "+1.03%", deltaUp: true,  brand: "safari"  as const },
  { label: "Brave",   value: "5.42%", delta: "-1.30%", deltaUp: false, brand: "brave"   as const },
  { label: "Opera",   value: "3.18%", delta: "+0.60%", deltaUp: true,  brand: "opera"   as const },
  { label: "Tor",     value: "2.04%", delta: "+0.40%", deltaUp: true,  brand: "tor"     as const },
  { label: "Edge",    value: "1.92%", delta: "+0.42%", deltaUp: true,  initials: "Ed", tint: "blue"   as const },
  { label: "Other",   value: "2.78%", delta: "-2.10%", deltaUp: false, initials: "··", tint: "violet" as const },
]

const pages = [
  { name: "/dashboard",          source: "Direct",   views: "3,980", time: "02:14", bounce: "32.1%", conv: "4.2%" },
  { name: "/pricing",            source: "Google",   views: "1,742", time: "01:48", bounce: "28.6%", conv: "6.8%" },
  { name: "/features",           source: "LinkedIn", views: "2,310", time: "01:32", bounce: "41.2%", conv: "2.4%" },
  { name: "/blog/launch",        source: "Direct",   views: "1,498", time: "03:01", bounce: "52.4%", conv: "1.1%" },
  { name: "/blog/how-it-works",  source: "Google",   views: "1,142", time: "02:48", bounce: "47.6%", conv: "1.8%" },
  { name: "/changelog",          source: "GitHub",   views:   "892", time: "00:54", bounce: "62.1%", conv: "0.6%" },
  { name: "/about",              source: "Direct",   views:   "748", time: "01:21", bounce: "38.4%", conv: "0.9%" },
  { name: "/contact",            source: "Twitter",  views:   "612", time: "00:46", bounce: "44.2%", conv: "3.6%" },
]

const sessionsConfig = {
  users:    { label: "Users",    color: "var(--blue)"   },
  sessions: { label: "Sessions", color: "var(--violet)" },
}

export default function AnalyticsDashboardPage() {
  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Analytics</PageHeaderTitle>
          <PageHeaderMeta>
            <Badge variant="success"><BadgeDot className="bg-green" />Live data</Badge>
            Updated 2 minutes ago
          </PageHeaderMeta>
        </div>
        <PageHeaderActions>
          <Breadcrumbs
            items={[
              { label: "Paces", href: "#" },
              { label: "Dashboard", href: "#" },
              { label: "Analytics" },
            ]}
          />
        </PageHeaderActions>
      </PageHeader>

      {/* Row 1 — Total Orders / Total Visitors / Device Split (half) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 16 }}>
        <MiniStat
          label="Total Orders" value="$45.2k" delta="+3.21%" deltaUp
          tint="violet" icon={<ShoppingCart size={14} />} series={sparkOrders}
          sub="Last 30 Days"
        />
        <MiniStat
          label="Total Visitors" value="2.4M" delta="+6.84%" deltaUp
          tint="blue" icon={<Users size={14} />} series={sparkVisitors} spark="bar"
          sub="Last 30 Days"
        />

        <Card>
          <CardHeader>
            <CardTitle>Device Split</CardTitle>
            <CardAction>
              <Badge>This week</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <MetricTile
                icon={<Smartphone size={18} />}
                tint="blue"
                label="Mobile"
                value="69.40%"
                sub="41,927 sessions"
              />
              <MetricTile
                icon={<Monitor size={18} />}
                tint="violet"
                label="Desktop"
                value="30.60%"
                sub="18,476 sessions"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2 — Goals progress (half) + Total Subscribers (quarter) + Marketing Sources (quarter) */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16 }}>
        <Card>
          <CardHeader>
            <CardTitle>Goals Progress</CardTitle>
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Goal</TableHead>
                  <TableHead className="text-right">Completed</TableHead>
                  <TableHead className="text-right">Target</TableHead>
                  <TableHead className="w-[180px]">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goals.map((g) => (
                  <TableRow key={g.name}>
                    <TableCell className="font-medium">{g.name}</TableCell>
                    <TableCell className="text-right tabular-nums">{g.completed}</TableCell>
                    <TableCell className="text-right tabular-nums text-ink-2">{g.target}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Progress value={g.pct} className="flex-1">
                          <ProgressTrack>
                            <ProgressIndicator
                              style={{ width: `${g.pct}%`, background: `var(--${g.tint})` }}
                            />
                          </ProgressTrack>
                        </Progress>
                        <span className="text-[length:var(--fs-13)] tabular-nums text-ink-2 font-semibold w-[36px] text-right">{g.pct}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <MiniStat
          label="Total Subscribers" value="29.4k" delta="+4.87%" deltaUp
          tint="green" icon={<UserPlus size={14} />} series={sparkSubs}
          sub="Last 30 Days"
        />

        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-2 text-amber">
              <PartyPopper size={16} />
              <span className="text-[length:var(--fs-12)] uppercase font-bold tracking-[var(--tracking-eyebrow)]">Congratulations</span>
            </div>
            <p className="text-[length:var(--fs-13)] text-ink-2 m-0 mb-3 leading-snug">
              You hit a milestone — keep the momentum going.
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-[length:var(--fs-28)] font-bold text-ink tabular-nums">29.4k</span>
              <span className="text-[length:var(--fs-12)] text-ink-3 uppercase font-bold tracking-[var(--tracking-eyebrow)]">Subscribers</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3 — Marketing Sources Breakdown (3-up card) */}
      <Card>
        <CardHeader>
          <CardTitle>Marketing Sources Breakdown</CardTitle>
          <CardAction className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><Download size={14} />Export</Button>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <MetricTile
              icon={<Mail size={18} />}
              tint="blue"
              label="Email Marketing"
              value="+18,320"
              badge={<Badge variant="success">27.41%</Badge>}
            />
            <MetricTile
              icon={<Share2 size={18} />}
              tint="violet"
              label="Social Marketing"
              value="+30,842"
              badge={<Badge variant="success">46.13%</Badge>}
            />
            <MetricTile
              icon={<ArrowDownToLine size={18} />}
              tint="amber"
              label="Direct"
              value="+17,680"
              badge={<Badge variant="success">26.46%</Badge>}
            />
          </div>
        </CardContent>
      </Card>

      {/* Row 4 — Sessions Overview (full) */}
      <Card>
        <CardHeader>
          <CardTitle>Sessions Overview <span className="text-ink-3 font-normal text-[length:var(--fs-13)] ml-1">609.5k sessions</span></CardTitle>
          <CardAction className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><Download size={14} />Export</Button>
            <Button variant="ghost" size="sm"><Upload size={14} />Import</Button>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <KPIStrip
            className="mb-4"
            items={[
              { label: "Users",       value: "29.03k", delta: "+3.02%", deltaUp: true  },
              { label: "Sessions",    value: "42.15k", delta: "+4.78%", deltaUp: true  },
              { label: "Bounce Rate", value: "31.39%", delta: "-1.24%", deltaUp: false },
              { label: "Avg Duration",value: "3m 12s", delta: "+7.92%", deltaUp: true  },
            ]}
          />
          <ChartContainer config={sessionsConfig} className="h-[300px]">
            <AreaChart data={sessionsData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <defs>
                <linearGradient id="aUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"  stopColor="var(--blue)"   stopOpacity={0.32} />
                  <stop offset="100%" stopColor="var(--blue)"  stopOpacity={0}    />
                </linearGradient>
                <linearGradient id="aSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"  stopColor="var(--violet)" stopOpacity={0.32} />
                  <stop offset="100%" stopColor="var(--violet)" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="d" tickLine={false} axisLine={false} interval={3} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area dataKey="users"    type="monotone" stroke="var(--blue)"   strokeWidth={2} fill="url(#aUsers)"    />
              <Area dataKey="sessions" type="monotone" stroke="var(--violet)" strokeWidth={2} fill="url(#aSessions)" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Row 5 — Audience Insights (half) + User Geography (half) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <CardHeader>
            <CardTitle>Audience Insights</CardTitle>
            <CardAction className="flex items-center gap-2">
              <Button variant="ghost" size="sm"><Download size={14} />Export</Button>
              <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">B. Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {audiencePages.map((p) => (
                  <TableRow key={p.page}>
                    <TableCell className="font-medium">{p.page}</TableCell>
                    <TableCell className="text-right tabular-nums">{p.views}</TableCell>
                    <TableCell className="text-right tabular-nums text-ink-2">{p.bounce}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="default" className="w-full mt-3">View all</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Geography Intelligence</CardTitle>
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <WorldMap
              height={180}
              hotspots={geoCountries.map((c) => ({
                lng: c.lng, lat: c.lat, tint: c.tint, label: c.name,
              }))}
            />
            <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-[color:var(--hairline)]">
              {geoCountries.map((c) => (
                <div key={c.name} className="flex items-center gap-3 min-w-0">
                  <span aria-hidden style={{ fontSize: 22 }}>{c.flag}</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[length:var(--fs-13)] font-medium text-ink truncate">{c.name}</span>
                    <span className="text-[length:var(--fs-12)] text-ink-3 tabular-nums">{c.visits}</span>
                  </div>
                  <Badge variant={c.deltaUp ? "success" : "danger"} className="ml-auto">{c.pct}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 6 — Top Traffic Sources (full, displayed as columns) */}
      <Card>
        <CardHeader>
          <CardTitle>Top Traffic Sources</CardTitle>
          <CardAction className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><Download size={14} />Export</Button>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            <SourceList rows={trafficSources.slice(0, 4)} />
            <SourceList rows={trafficSources.slice(4, 7)} />
            <SourceList rows={trafficSources.slice(7)} />
          </div>
        </CardContent>
      </Card>

      {/* Row 7 — Sessions by Browser (half) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <CardHeader>
            <CardTitle>Sessions by Browser</CardTitle>
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <SourceList rows={browsers} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscriber Milestone</CardTitle>
            <CardAction>
              <Badge variant="success">All-time high</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="size-14 rounded-md grid place-items-center bg-tint-amber text-amber [box-shadow:var(--elev-1)] flex-none">
                <PartyPopper size={26} />
              </div>
              <div className="flex flex-col">
                <span className="text-[length:var(--fs-13)] text-ink-2 leading-snug mb-2">
                  Congratulations — your audience just crossed a new threshold. Keep publishing to compound the curve.
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[length:var(--fs-28)] font-bold text-ink tabular-nums">29.4k</span>
                  <span className="text-[length:var(--fs-12)] text-ink-3 uppercase font-bold tracking-[var(--tracking-eyebrow)]">Subscribers</span>
                </div>
                <Button variant="primary" size="sm" className="mt-3 self-start">Send announcement</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 8 — Page Analytics Overview (full table) */}
      <Card>
        <CardHeader>
          <CardTitle>Page Analytics Overview</CardTitle>
          <CardAction className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><Trash2 size={14} />Delete selected</Button>
            <Button variant="ghost" size="sm"><Download size={14} />Export</Button>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page path</TableHead>
                <TableHead>Top referral</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Avg. time</TableHead>
                <TableHead className="text-right">Bounce</TableHead>
                <TableHead className="text-right">Conv.</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((p) => (
                <TableRow key={p.name}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-ink-2">{p.source}</TableCell>
                  <TableCell className="text-right tabular-nums">{p.views}</TableCell>
                  <TableCell className="text-right tabular-nums text-ink-2">{p.time}</TableCell>
                  <TableCell className="text-right tabular-nums text-ink-2">{p.bounce}</TableCell>
                  <TableCell className="text-right tabular-nums text-ink-2">{p.conv}</TableCell>
                  <TableCell className="text-right">
                    <RowActionMenu>
                      <DropdownMenuItem><Eye />View</DropdownMenuItem>
                      <DropdownMenuItem><Edit />Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive"><Trash2 />Delete</DropdownMenuItem>
                    </RowActionMenu>
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
