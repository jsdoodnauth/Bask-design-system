"use client"

import {
  Wallet, ArrowDownToLine, ArrowUpFromLine, RefreshCcw, AlertCircle,
  Send, MoreHorizontal, Search, Filter, Download,
  TrendingUp, PiggyBank, LineChart as LineIcon, Receipt,
  Car, Plane, GraduationCap, Home, Heart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ToastActionButton } from "@/components/ui/toast-action-button"
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card"
import { Badge, BadgeDot } from "@/components/ui/badge"
import { RecipientStack } from "@/components/ui/recipient-stack"
import { MiniStat } from "@/components/ui/mini-stat"
import { MetricTile } from "@/components/ui/metric-tile"
import { Alert, AlertIcon, AlertTitle, AlertDescription, AlertActions } from "@/components/ui/alert"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Input } from "@/components/ui/input"
import {
  PageHeader, PageHeaderTitle, PageHeaderMeta, PageHeaderActions,
} from "@/components/ui/app-shell"
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table"
import {
  Progress, ProgressTrack, ProgressIndicator,
} from "@/components/ui/progress"
import { CreditCardVisual } from "@/components/ui/credit-card-visual"
import { GoalCard } from "@/components/ui/goal-card"

const sparkIn   = [22, 28, 25, 31, 27, 38, 34, 42, 39, 48]
const sparkOut  = [38, 34, 36, 32, 30, 28, 30, 28, 26, 24]
const sparkInv  = [16, 20, 24, 22, 28, 32, 30, 36, 38, 42]
const sparkSav  = [14, 18, 16, 22, 20, 26, 24, 30, 28, 34]

type TxnType = "income" | "expense" | "transfer"
const txnTypeBadge: Record<TxnType, { variant: "success" | "danger" | "info"; label: string }> = {
  income:   { variant: "success", label: "Income"   },
  expense:  { variant: "danger",  label: "Expense"  },
  transfer: { variant: "info",    label: "Transfer" },
}

type TxnStatus = "success" | "warn" | "danger" | "info"

const transactions = [
  { id: "TXN8401", name: "Apple Store",       desc: "MacBook Air M2 purchase",      amount: "-$1,299.00", time: "Today, 10:24 AM",       type: "expense"  as TxnType, method: "Credit Card",  status: "success" as TxnStatus, label: "Success" },
  { id: "TXN8400", name: "Acme Payroll",      desc: "Bi-weekly salary",             amount: "+$5,820.00", time: "Today, 09:00 AM",       type: "income"   as TxnType, method: "ACH",          status: "success" as TxnStatus, label: "Success" },
  { id: "TXN8399", name: "Shell Energy",      desc: "Utility bill (Nov)",           amount: "-$148.00",   time: "Yesterday, 6:21 PM",    type: "expense"  as TxnType, method: "Direct Debit", status: "success" as TxnStatus, label: "Success" },
  { id: "TXN8398", name: "Vanguard Brokerage", desc: "Index fund auto-invest",       amount: "-$1,000.00", time: "Yesterday, 3:00 PM",    type: "transfer" as TxnType, method: "ACH",          status: "info"    as TxnStatus, label: "Pending" },
  { id: "TXN8397", name: "Uber",              desc: "Ride to airport",              amount: "-$42.50",    time: "Yesterday, 11:48 AM",   type: "expense"  as TxnType, method: "Credit Card",  status: "success" as TxnStatus, label: "Success" },
  { id: "TXN8396", name: "Stripe Payouts",    desc: "Client invoice settlement",    amount: "+$3,240.00", time: "Dec 14, 4:20 PM",       type: "income"   as TxnType, method: "Bank wire",    status: "success" as TxnStatus, label: "Success" },
  { id: "TXN8395", name: "Bluebird Studios",  desc: "Refund — order #BD2410",       amount: "-$210.00",   time: "Dec 13, 1:02 PM",       type: "expense"  as TxnType, method: "Credit Card",  status: "warn"    as TxnStatus, label: "On hold" },
  { id: "TXN8394", name: "Lemonade Insurance", desc: "Monthly premium",              amount: "-$48.00",    time: "Dec 12, 8:00 AM",       type: "expense"  as TxnType, method: "Direct Debit", status: "success" as TxnStatus, label: "Success" },
  { id: "TXN8393", name: "Coinbase",          desc: "ETH withdrawal",               amount: "-$820.00",   time: "Dec 11, 7:42 PM",       type: "transfer" as TxnType, method: "Crypto",       status: "danger"  as TxnStatus, label: "Failed" },
  { id: "TXN8392", name: "DigitalOcean",      desc: "Infra invoice",                amount: "-$84.00",    time: "Dec 10, 11:14 AM",      type: "expense"  as TxnType, method: "Credit Card",  status: "success" as TxnStatus, label: "Success" },
]

const goals = [
  { label: "New Car",        icon: <Car size={18} />,            target: "$48,000", saved: "$28,400", pct: 59, tint: "violet" as const },
  { label: "Vacation Trip",  icon: <Plane size={18} />,          target: "$6,000",  saved: "$4,820",  pct: 80, tint: "blue"   as const },
  { label: "Education",      icon: <GraduationCap size={18} />,  target: "$24,000", saved: "$12,840", pct: 53, tint: "amber"  as const },
  { label: "New Home",       icon: <Home size={18} />,           target: "$320,000",saved: "$84,200", pct: 26, tint: "green"  as const },
  { label: "Emergency Fund", icon: <Heart size={18} />,          target: "$15,000", saved: "$13,600", pct: 90, tint: "red"    as const },
]

const recipients = [
  { name: "Penelope W.", initials: "PW", color: "violet" as const },
  { name: "Andre K.",    initials: "AK", color: "blue"   as const },
  { name: "Sophia T.",   initials: "ST", color: "green"  as const },
  { name: "Mark D.",     initials: "MD", color: "amber"  as const },
  { name: "Elena H.",    initials: "EH", color: "red"    as const },
]

export default function FinanceDashboardPage() {
  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Finance</PageHeaderTitle>
          <PageHeaderMeta>
            <Badge variant="success"><BadgeDot className="bg-green" />Accounts healthy</Badge>
            Last sync just now
          </PageHeaderMeta>
        </div>
        <PageHeaderActions>
          <Breadcrumbs
            items={[
              { label: "Paces", href: "#" },
              { label: "Dashboard", href: "#" },
              { label: "Finance" },
            ]}
          />
        </PageHeaderActions>
      </PageHeader>

      {/* Alert banner */}
      <Alert variant="warn">
        <AlertIcon tint="amber"><AlertCircle size={18} /></AlertIcon>
        <AlertTitle>Your account needs a quick review</AlertTitle>
        <AlertDescription>
          Three transactions are flagged for verification. Resolve to keep autopay active.
        </AlertDescription>
        <AlertActions>
          <Button variant="primary">Action now</Button>
        </AlertActions>
      </Alert>

      {/* Total Balance card with debit card visual */}
      <Card>
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
          <CardAction>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[1.4fr_1fr] gap-6 items-center">
            <div className="flex flex-col gap-4">
              <div>
                <span className="block text-[length:var(--fs-12)] text-ink-3 uppercase font-bold tracking-[var(--tracking-eyebrow)]">Available balance</span>
                <span className="block text-[length:var(--fs-36)] font-bold text-ink tabular-nums leading-tight">$76,852.36</span>
                <span className="text-[length:var(--fs-13)] text-ink-3">Updated moments ago</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="default" size="sm"><Receipt size={14} />Details</Button>
                <Button variant="primary" size="sm"><Send size={14} />Transfer</Button>
                <Button variant="default" size="sm"><ArrowDownToLine size={14} />Request</Button>
              </div>
            </div>

            <CreditCardVisual
              productLabel="Bask Visa Debit"
              brand="Bask"
              number="4929 •••• •••• 1894"
              holder="David Devi"
              expiry="08/29"
            />
          </div>
        </CardContent>
      </Card>

      {/* Row — 4 financial summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <MiniStat label="Total Income"   value="$48.20k" delta="+8.72%"  deltaUp        tint="green"  icon={<ArrowDownToLine size={14} />} series={sparkIn}  sub="Last 30 Days" />
        <MiniStat label="Total Expenses" value="$22.84k" delta="+3.28%"  deltaUp={false} tint="red"    icon={<ArrowUpFromLine size={14} />} series={sparkOut} spark="bar" sub="Last 30 Days" />
        <MiniStat label="Investments"    value="$54.12k" delta="+5.69%"  deltaUp        tint="violet" icon={<LineIcon size={14} />}        series={sparkInv} sub="Portfolio" />
        <MiniStat label="Savings"        value="$18.30k" delta="+10.58%" deltaUp        tint="blue"   icon={<PiggyBank size={14} />}       series={sparkSav} sub="Goal: $20k" />
      </div>

      {/* Financial Overview (full, 4 metric boxes) */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardAction className="flex items-center gap-2">
            <ToastActionButton
              variant="ghost"
              size="sm"
              toastTitle="Refreshing balances…"
              toastDescription="Re-syncing accounts from your providers."
            >
              <RefreshCcw size={14} />Refresh
            </ToastActionButton>
            <Button variant="ghost" size="sm"><Download size={14} />Export</Button>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Revenue",    value: "$92.4k", delta: "+12.4%", up: true,  tint: "green"  as const, icon: <ArrowDownToLine size={18} /> },
              { label: "Expenses",   value: "$48.6k", delta: "+3.2%",  up: false, tint: "red"    as const, icon: <ArrowUpFromLine size={18} /> },
              { label: "Investment", value: "$54.1k", delta: "+5.7%",  up: true,  tint: "violet" as const, icon: <LineIcon size={18} />        },
              { label: "Savings",    value: "$18.3k", delta: "+10.6%", up: true,  tint: "blue"   as const, icon: <PiggyBank size={18} />       },
            ].map((m) => (
              <MetricTile
                key={m.label}
                variant="inset"
                iconSize="sm"
                icon={m.icon}
                tint={m.tint}
                label={m.label}
                value={m.value}
                badge={<Badge variant={m.up ? "success" : "danger"}>{m.delta}</Badge>}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Growth + Quick Transfer */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <CardHeader>
            <CardTitle>Investment Growth</CardTitle>
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="size-14 rounded-md grid place-items-center bg-tint-violet text-violet [box-shadow:var(--elev-1)] flex-none">
                <TrendingUp size={26} />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[length:var(--fs-12)] text-ink-3 uppercase font-bold tracking-[var(--tracking-eyebrow)]">Portfolio value</span>
                <span className="text-[length:var(--fs-28)] font-bold text-ink leading-tight tabular-nums">$248,420</span>
                <Badge variant="success" className="self-start mt-1">+14.2% YTD</Badge>
                <p className="text-[length:var(--fs-13)] text-ink-2 m-0 mt-3 leading-snug">
                  Tracking ahead of plan — index allocation is performing 2.4% above benchmark. Time to rebalance growth exposure.
                </p>
                <Button variant="primary" size="sm" className="self-start mt-3">View portfolio</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Transfer</CardTitle>
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <RecipientStack recipients={recipients} className="mb-4" />
            <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end mb-3">
              <div>
                <label className="text-[length:var(--fs-12)] text-ink-3 uppercase font-bold tracking-[var(--tracking-eyebrow)] block mb-1">Send</label>
                <Input placeholder="Penelope W." className="[box-shadow:var(--elev-inset)]" />
              </div>
              <div className="pb-2 text-ink-3">→</div>
              <div>
                <label className="text-[length:var(--fs-12)] text-ink-3 uppercase font-bold tracking-[var(--tracking-eyebrow)] block mb-1">Amount</label>
                <Input placeholder="$500.00" className="[box-shadow:var(--elev-inset)]" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" size="sm" className="flex-1"><Send size={14} />Send Money</Button>
              <Button variant="default" size="sm">Save as Draft</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardAction className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3 pointer-events-none" aria-hidden />
              <Input
                type="search"
                placeholder="Search…"
                className="pl-8 py-1.5 text-[length:var(--fs-13)] w-[200px] [box-shadow:var(--elev-inset)]"
              />
            </div>
            <Button variant="ghost" size="sm"><Filter size={14} />Status</Button>
            <Button variant="ghost" size="sm"><Download size={14} />Export</Button>
            <Button variant="ghost" size="icon-sm" aria-label="More"><MoreHorizontal size={14} /></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name / Business</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => {
                const isOut = t.amount.startsWith("-")
                return (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono text-[length:var(--fs-13)] text-ink-2">#{t.id}</TableCell>
                    <TableCell className="font-medium">{t.name}</TableCell>
                    <TableCell className="text-ink-2">{t.desc}</TableCell>
                    <TableCell className={`text-right tabular-nums font-semibold ${isOut ? "text-red" : "text-green"}`}>{t.amount}</TableCell>
                    <TableCell className="text-ink-2">{t.time}</TableCell>
                    <TableCell><Badge variant={txnTypeBadge[t.type].variant}>{txnTypeBadge[t.type].label}</Badge></TableCell>
                    <TableCell className="text-ink-2">{t.method}</TableCell>
                    <TableCell className="text-right"><Badge variant={t.status}>{t.label}</Badge></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* My Targets & Goals — horizontal cards */}
      <Card>
        <CardHeader>
          <CardTitle>My Targets &amp; Goals</CardTitle>
          <CardAction>
            <Button variant="ghost" size="sm">See all</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
            {goals.map((g) => (
              <GoalCard
                key={g.label}
                icon={g.icon}
                tint={g.tint}
                label={g.label}
                saved={g.saved}
                target={g.target}
                percent={g.pct}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
