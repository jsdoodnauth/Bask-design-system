"use client";

import {
  RefreshCw, Database, Clock, ShieldAlert,
  Plus, Filter, MoreHorizontal, Flower2, Home, Settings2,
  CheckCircle2, AlertTriangle, XCircle, Calendar, Rotate3D,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge, BadgeDot } from "@/components/ui/badge";
import {
  Table, TableHeader, TableBody,
  TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import { Stat } from "@/components/ui/stat";

type BadgeVariant = "neutral" | "success" | "warn" | "danger" | "info" | "violet";

const SITES = [
  {
    name: "bloom-studio.com",
    color: "#2E7D32",
    bg: "#D9F0DB",
    icon: <Flower2 size={15} />,
    uptime: { label: "No Downtime", sub: "Sept 09 · 04:10 AM", variant: "success" as BadgeVariant },
    backup: { label: "2 hrs ago", variant: "info" as BadgeVariant },
    updates: { label: "4 Updates", variant: "info" as BadgeVariant },
    vulns: { label: "3 Risks", variant: "danger" as BadgeVariant },
  },
  {
    name: "villamore.com",
    color: "#3730A3",
    bg: "#E0E7FF",
    icon: <Home size={15} />,
    uptime: { label: "No Downtime", sub: "", variant: "success" as BadgeVariant },
    backup: { label: "In Progress", variant: "warn" as BadgeVariant },
    updates: { label: "4 Updates", variant: "info" as BadgeVariant },
    vulns: { label: "No Risks Found", variant: "success" as BadgeVariant },
  },
  {
    name: "atlas-mag.com",
    color: "#92400E",
    bg: "#FEF3C7",
    icon: <Settings2 size={15} />,
    uptime: { label: "7 Hours", sub: "Sept 09, 09:43 PM", variant: "warn" as BadgeVariant },
    backup: { label: "Failed Backup", variant: "danger" as BadgeVariant },
    updates: { label: "4 Updates", variant: "info" as BadgeVariant },
    vulns: { label: "3 Risks", variant: "danger" as BadgeVariant },
  },
];

export default function DashboardPage() {
  return (
    <main id="main-content" className="page">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h2>Sites</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="default" size="icon" aria-label="Filter"><Filter size={15} /></Button>
          <Button variant="default" size="icon" aria-label="More options"><MoreHorizontal size={15} /></Button>
          <Button variant="primary"><Plus size={15} /> Add site</Button>
        </div>
      </div>

      {/* Stat row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <Stat label="Core updates" value="7"      icon={<RefreshCw size={15} />}    tint="green" />
        <Stat label="Backups"      value="22"     icon={<Database   size={15} />}   tint="blue"  />
        <Stat label="Uptime"       value="99.98%" icon={<Clock      size={15} />}   tint="amber" />
        <Stat label="Risks"        value="3"      icon={<ShieldAlert size={15} />}  tint="red"   />
      </div>

      {/* Sites table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Site</TableHead>
              <TableHead>Uptime</TableHead>
              <TableHead>Backups</TableHead>
              <TableHead>Updates</TableHead>
              <TableHead>Vulnerabilities</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SITES.map((site) => (
              <TableRow key={site.name}>
                {/* Site */}
                <TableCell>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 30, height: 30,
                      borderRadius: "var(--r-sm)",
                      background: site.bg,
                      color: site.color,
                      display: "grid", placeItems: "center",
                      flexShrink: 0,
                      boxShadow: "var(--elev-1)",
                    }}>
                      {site.icon}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: "var(--fs-14)" }}>{site.name}</span>
                  </div>
                </TableCell>

                {/* Uptime */}
                <TableCell>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Badge variant={site.uptime.variant}>
                      {site.uptime.variant === "success"
                        ? <CheckCircle2 size={11} />
                        : <AlertTriangle size={11} />}
                      {site.uptime.label}
                    </Badge>
                    {site.uptime.sub && (
                      <span style={{ fontSize: "var(--fs-12)", color: "var(--ink-3)", paddingLeft: 2 }}>
                        {site.uptime.sub}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Backups */}
                <TableCell>
                  <Badge variant={site.backup.variant}>
                    {site.backup.variant === "danger"
                      ? <XCircle size={11} />
                      : site.backup.variant === "warn"
                      ? <AlertTriangle size={11} />
                      : <Calendar size={11} />}
                    {site.backup.label}
                  </Badge>
                </TableCell>

                {/* Updates */}
                <TableCell>
                  <Badge variant={site.updates.variant}>
                    <RefreshCw size={11} />
                    {site.updates.label}
                  </Badge>
                </TableCell>

                {/* Vulnerabilities */}
                <TableCell>
                  <Badge variant={site.vulns.variant}>
                    {site.vulns.variant === "success"
                      ? <CheckCircle2 size={11} />
                      : <ShieldAlert size={11} />}
                    {site.vulns.label}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </main>
  );
}
