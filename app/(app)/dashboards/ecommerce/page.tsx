"use client"

import {
  ShoppingBag, DollarSign, AlertCircle, RefreshCcw,
  MoreHorizontal, Search, Filter, Download, Upload, Eye, Edit, Trash2,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from "recharts"

import { Button } from "@/components/ui/button"
import { ToastActionButton } from "@/components/ui/toast-action-button"
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card"
import { Badge, BadgeDot } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { MiniStat } from "@/components/ui/mini-stat"
import { KPIStrip } from "@/components/ui/kpi-strip"
import { Gauge } from "@/components/ui/gauge"
import { Alert, AlertTitle, AlertDescription, AlertActions } from "@/components/ui/alert"
import { WorldMap } from "@/components/ui/world-map"
import { SourceList } from "@/components/ui/source-list"
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
import { RowActionMenu } from "@/components/ui/row-action-menu"
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

const sparkOrders  = [22, 28, 25, 31, 27, 38, 34, 42, 39, 48]
const sparkRevenue = [44, 40, 46, 42, 48, 45, 52, 49, 56, 53]

const performanceData = Array.from({ length: 30 }, (_, i) => ({
  d: `${i + 1}`,
  visits:  4200 + Math.round(Math.sin(i / 2) * 1200 + Math.random() * 600),
  sales:   1800 + Math.round(Math.cos(i / 2.4) * 480 + Math.random() * 240),
}))

const salesData = Array.from({ length: 31 }, (_, i) => ({
  d: `${i + 1}`,
  revenue: 14000 + Math.round(Math.sin(i / 3) * 3200 + Math.random() * 1800),
  orders:   140 + Math.round(Math.cos(i / 2.4) * 30 + Math.random() * 24),
}))

type Stock = "in" | "low" | "out"
const stockBadge: Record<Stock, { variant: "success" | "warn" | "danger"; label: string }> = {
  in:  { variant: "success", label: "In Stock"     },
  low: { variant: "warn",    label: "Low Stock"    },
  out: { variant: "danger",  label: "Out of Stock" },
}

const products = [
  { name: "Modern Fabric Sofa Set",  company: "Furnishop",   price: "$435.00", qty: 18, amount: "$7,830.00", stock: "in"  as Stock, color: "blue"   as const, init: "FS" },
  { name: "Designer Glass Vase",     company: "Glamsource",  price: "$240.00", qty: 14, amount: "$3,360.00", stock: "low" as Stock, color: "violet" as const, init: "GV" },
  { name: "Velvet Recliner Chair",   company: "Crystallium", price: "$210.00", qty: 12, amount: "$2,520.00", stock: "in"  as Stock, color: "amber"  as const, init: "VC" },
  { name: "Minimalist TV Stand",     company: "Hyrend",      price: "$498.00", qty: 9,  amount: "$4,482.00", stock: "low" as Stock, color: "green"  as const, init: "TV" },
  { name: "Leather Lounge Sofa",     company: "Couchley",    price: "$675.00", qty: 7,  amount: "$4,725.00", stock: "in"  as Stock, color: "red"    as const, init: "LL" },
  { name: "Brass Desk Lamp",         company: "Lightara",    price: "$148.00", qty: 24, amount: "$3,552.00", stock: "in"  as Stock, color: "amber"  as const, init: "BL" },
  { name: "Walnut Coffee Table",     company: "Furnishop",   price: "$320.00", qty: 5,  amount: "$1,600.00", stock: "low" as Stock, color: "brown"  as const, init: "WT" },
  { name: "Ceramic Carafe Set",      company: "Glamsource",  price: "$84.00",  qty: 0,  amount: "$0.00",     stock: "out" as Stock, color: "blue"   as const, init: "CC" },
]

const orders = [
  { id: "BD24218", customer: { name: "John Carter",     initials: "JC", color: "violet" as const }, amount: "$128.00",  date: "26-Dec-2024", method: "Credit Card", status: "success" as const, label: "Paid"      },
  { id: "BD24208", customer: { name: "Penelope Wilson", initials: "PW", color: "blue"   as const }, amount: "$435.00",  date: "21-Dec-2024", method: "Credit Card", status: "info"    as const, label: "Pending"   },
  { id: "BD24207", customer: { name: "Andre Knight",    initials: "AK", color: "green"  as const }, amount: "$1,820",   date: "18-Dec-2024", method: "PayPal",      status: "success" as const, label: "Paid"      },
  { id: "BD24201", customer: { name: "Sophia Turner",   initials: "ST", color: "amber"  as const }, amount: "$60.00",   date: "14-Dec-2024", method: "Credit Card", status: "warn"    as const, label: "On hold"   },
  { id: "BD24109", customer: { name: "Mark Davies",     initials: "MD", color: "red"    as const }, amount: "$92.00",   date: "08-Dec-2024", method: "Credit Card", status: "danger"  as const, label: "Refunded"  },
  { id: "BD24087", customer: { name: "Elena Hart",      initials: "EH", color: "brown"  as const }, amount: "$210.00",  date: "02-Dec-2024", method: "PayPal",      status: "success" as const, label: "Paid"      },
  { id: "BD24064", customer: { name: "Marcus Hale",     initials: "MH", color: "blue"   as const }, amount: "$348.00",  date: "29-Nov-2024", method: "Apple Pay",   status: "info"    as const, label: "Pending"   },
]

const locations = [
  { label: "United States", value: "$28.6k", delta: "+8.4%", deltaUp: true,  iso: "us" },
  { label: "United Kingdom",value: "$18.4k", delta: "+4.2%", deltaUp: true,  iso: "gb" },
  { label: "Australia",     value: "$10.8k", delta: "-1.2%", deltaUp: false, iso: "au" },
  { label: "Germany",       value: "$8.2k",  delta: "+2.0%", deltaUp: true,  iso: "de" },
]

const perfConfig = {
  visits: { label: "Visits", color: "var(--blue)"   },
  sales:  { label: "Sales",  color: "var(--violet)" },
}
const salesConfig = {
  revenue: { label: "Revenue", color: "var(--violet)" },
  orders:  { label: "Orders",  color: "var(--amber)"  },
}

export default function EcommerceDashboardPage() {
  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>eCommerce</PageHeaderTitle>
          <PageHeaderMeta>
            <Badge variant="success"><BadgeDot className="bg-green" />Store live</Badge>
            42 orders to fulfill
          </PageHeaderMeta>
        </div>
        <PageHeaderActions>
          <Breadcrumbs
            items={[
              { label: "Paces", href: "#" },
              { label: "Dashboard", href: "#" },
              { label: "eCommerce" },
            ]}
          />
        </PageHeaderActions>
      </PageHeader>

      {/* Row 1 — 3 stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <MiniStat
          label="Orders" value="8,940" delta="+1.89%" deltaUp
          tint="violet" icon={<ShoppingBag size={14} />} series={sparkOrders}
          sub="Last 30 Days"
        />
        <MiniStat
          label="Revenue" value="$78.22k" delta="+5.23%" deltaUp
          tint="green" icon={<DollarSign size={14} />} series={sparkRevenue} spark="bar"
          sub="Last 30 Days"
        />
        <Card>
          <CardHeader>
            <CardTitle>Conv. Rate</CardTitle>
            <CardAction>
              <Badge variant="success">+4.87%</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col items-stretch">
            <Gauge
              value={72}
              size={140}
              valueColor="var(--blue)"
              sublabel="Goal 100%"
            />
          </CardContent>
        </Card>
      </div>

      {/* Row 2 — Store Performance Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Store Performance Analytics</CardTitle>
          <CardAction className="flex items-center gap-2">
            <ToastActionButton
              variant="default"
              size="sm"
              toastTitle="Refreshing storefront…"
              toastDescription="Pulling the latest orders and revenue."
            >
              <RefreshCcw size={14} />Refresh
            </ToastActionButton>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Alert variant="warn" className="mb-4">
            <AlertCircle />
            <AlertTitle>Poor Sales</AlertTitle>
            <AlertDescription>
              Property PS007 is not receiving hits this week. Review listing health and pricing.
            </AlertDescription>
            <AlertActions>
              <Button variant="warning" size="sm">Action now</Button>
            </AlertActions>
          </Alert>
          <ChartContainer config={perfConfig} className="h-[280px]">
            <AreaChart data={performanceData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <defs>
                <linearGradient id="ePerfV" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"  stopColor="var(--blue)" stopOpacity={0.32} />
                  <stop offset="100%" stopColor="var(--blue)" stopOpacity={0}    />
                </linearGradient>
                <linearGradient id="ePerfS" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"  stopColor="var(--violet)" stopOpacity={0.32} />
                  <stop offset="100%" stopColor="var(--violet)" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="d" tickLine={false} axisLine={false} interval={3} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area dataKey="visits" type="monotone" stroke="var(--blue)"   strokeWidth={2} fill="url(#ePerfV)" />
              <Area dataKey="sales"  type="monotone" stroke="var(--violet)" strokeWidth={2} fill="url(#ePerfS)" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Row 3 — Weekly Performance + Sales Report */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance Insights</CardTitle>
            <CardAction className="flex items-center gap-2">
              <Button variant="ghost" size="sm"><RefreshCcw size={14} />Refresh</Button>
              <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <KPIStrip
              className="mb-4"
              gap={16}
              items={[
                { label: "Visits",      value: "12,840", delta: "+8.4%", deltaUp: true },
                { label: "Conversions", value: "1,820",  delta: "+4.2%", deltaUp: true },
              ]}
            />
            <ChartContainer config={perfConfig} className="h-[180px]">
              <AreaChart data={performanceData.slice(0, 12)} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="d" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area dataKey="visits" type="monotone" stroke="var(--violet)" strokeWidth={2} fill="url(#ePerfS)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Report</CardTitle>
            <CardAction className="flex items-center gap-2">
              <Badge>1D</Badge>
              <Badge variant="info">1M</Badge>
              <Badge>1Y</Badge>
              <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <span className="block text-[length:var(--fs-12)] text-ink-3 uppercase font-bold tracking-[var(--tracking-eyebrow)]">Today&apos;s Earning</span>
            <span className="block text-[length:var(--fs-28)] font-bold text-ink leading-tight tabular-nums mb-3">$8,975.30</span>
            <KPIStrip
              className="mb-4"
              gap={16}
              valueSize="md"
              items={[
                { label: "Revenue", value: "$78,224" },
                { label: "Orders",  value: "8,940"   },
                { label: "Growth",  value: "25.20%"  },
              ]}
            />
            <ChartContainer config={salesConfig} className="h-[160px]">
              <AreaChart data={salesData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <defs>
                  <linearGradient id="eSalesA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"  stopColor="var(--amber)" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="var(--amber)" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="d" tickLine={false} axisLine={false} interval={3} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area dataKey="revenue" type="monotone" stroke="var(--amber)" strokeWidth={2} fill="url(#eSalesA)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 4 — Top Selling Products (full table) */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardAction className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><Download size={14} />Export</Button>
            <Button variant="ghost" size="sm"><Upload size={14} />Import</Button>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" color={p.color}>{p.init}</Avatar>
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-ink-2">{p.company}</TableCell>
                  <TableCell className="text-right tabular-nums">{p.price}</TableCell>
                  <TableCell className="text-right tabular-nums">{p.qty}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold">{p.amount}</TableCell>
                  <TableCell className="text-right"><Badge variant={stockBadge[p.stock].variant}>{stockBadge[p.stock].label}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Row 5 — Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardAction className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3 pointer-events-none" aria-hidden />
              <Input
                type="search"
                placeholder="Search…"
                className="pl-8 py-1.5 text-[length:var(--fs-13)] w-[180px] [box-shadow:var(--elev-inset)]"
              />
            </div>
            <Button variant="ghost" size="sm"><Filter size={14} /></Button>
            <Button variant="ghost" size="sm"><Download size={14} />Export</Button>
            <Button variant="ghost" size="sm"><Upload size={14} />Import</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-[length:var(--fs-13)] text-ink-2">#{o.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" color={o.customer.color}>{o.customer.initials}</Avatar>
                      <span className="text-[length:var(--fs-13)]">{o.customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-ink-2">{o.date}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold">{o.amount}</TableCell>
                  <TableCell className="text-ink-2">{o.method}</TableCell>
                  <TableCell className="text-right"><Badge variant={o.status}>{o.label}</Badge></TableCell>
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

      {/* Row 6 — Revenue By Locations */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue By Locations</CardTitle>
          <CardAction className="flex items-center gap-2">
            <Badge variant="info">25.9k orders</Badge>
            <Button variant="ghost" size="sm"><Filter size={14} />Filter</Button>
            <Button variant="ghost" size="sm"><Download size={14} />Export</Button>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[1.6fr_1fr] gap-6 items-start">
            <WorldMap
              height={300}
              hotspots={[
                { lng: -98,  lat: 39,  tint: "blue",   label: "United States" },
                { lng:  -3,  lat: 54,  tint: "red",    label: "United Kingdom" },
                { lng: 134,  lat: -25, tint: "green",  label: "Australia" },
                { lng:  10,  lat: 51,  tint: "amber",  label: "Germany" },
              ]}
            />
            <SourceList rows={locations} />
          </div>
        </CardContent>
      </Card>

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
            <ActivityItem avatar={<Avatar size="sm" color="green">NO</Avatar>} time="20 minutes ago">
              <strong>15 new orders</strong> synced from the storefront
              <p className="text-[length:var(--fs-13)] text-ink-3 m-0">By <strong>System</strong></p>
            </ActivityItem>
            <ActivityItem avatar={<Avatar size="sm" color="blue">SU</Avatar>} time="2 hours ago">
              <strong>Stock units low</strong> on Designer Glass Vase
              <p className="text-[length:var(--fs-13)] text-ink-3 m-0">By <strong>Inventory bot</strong></p>
            </ActivityItem>
            <ActivityItem avatar={<Avatar size="sm" color="violet">PI</Avatar>} time="Yesterday">
              <strong>Payment Gateway integration updated</strong>
              <p className="text-[length:var(--fs-13)] text-ink-3 m-0">By <strong>Sarah Lee</strong></p>
            </ActivityItem>
            <ActivityItem avatar={<Avatar size="sm" color="amber">IA</Avatar>} time="2 days ago">
              <strong>Inventory week auto-sync</strong> completed
              <p className="text-[length:var(--fs-13)] text-ink-3 m-0">By <strong>System</strong></p>
            </ActivityItem>
            <ActivityItem avatar={<Avatar size="sm" color="red">RR</Avatar>} time="3 days ago">
              <strong>Refund processed</strong> for order #BD24109
              <p className="text-[length:var(--fs-13)] text-ink-3 m-0">By <strong>Mark Davies</strong></p>
            </ActivityItem>
            <ActivityItem avatar={<Avatar size="sm" color="brown">CL</Avatar>} time="5 days ago">
              <strong>Catalog updated</strong> with 24 new SKUs
              <p className="text-[length:var(--fs-13)] text-ink-3 m-0">By <strong>Elena Hart</strong></p>
            </ActivityItem>
          </Activity>
        </CardContent>
      </Card>
    </>
  )
}
