"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { BarChart3, Globe, Database, Users } from "lucide-react"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Stat } from "@/components/ui/stat"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent, type ChartConfig,
} from "@/components/ui/chart"
import {
  PageHeader, PageHeaderTitle, PageHeaderMeta,
} from "@/components/ui/app-shell"

const trafficData = [
  { month: "Jan", desktop: 4200, mobile: 2400 },
  { month: "Feb", desktop: 3800, mobile: 2900 },
  { month: "Mar", desktop: 5100, mobile: 3300 },
  { month: "Apr", desktop: 4700, mobile: 3800 },
  { month: "May", desktop: 5800, mobile: 4400 },
  { month: "Jun", desktop: 6200, mobile: 4900 },
]

const latencyData = [
  { month: "Jan", desktop: 168, mobile: 215 },
  { month: "Feb", desktop: 155, mobile: 198 },
  { month: "Mar", desktop: 162, mobile: 202 },
  { month: "Apr", desktop: 148, mobile: 188 },
  { month: "May", desktop: 142, mobile: 179 },
  { month: "Jun", desktop: 138, mobile: 172 },
]

const chartConfig: ChartConfig = {
  desktop: { label: "Desktop", color: "var(--blue)" },
  mobile:  { label: "Mobile",  color: "var(--green)" },
}

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Analytics</PageHeaderTitle>
          <PageHeaderMeta>Last 6 months</PageHeaderMeta>
        </div>
      </PageHeader>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <Stat label="Total visits"  value="29.8k" icon={<BarChart3 size={16} />} tint="blue" />
        <Stat label="Unique users"  value="11.2k" icon={<Users size={16} />}    tint="green" />
        <Stat label="Avg session"   value="3m 42s" icon={<Globe size={16} />}    tint="amber" />
        <Stat label="Bounce rate"   value="38%"   icon={<Database size={16} />} tint="violet" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <CardHeader>
            <CardTitle>Traffic by device</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={trafficData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile"  fill="var(--color-mobile)"  radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg latency · ms</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart data={latencyData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                <Line dataKey="mobile"  stroke="var(--color-mobile)"  strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
