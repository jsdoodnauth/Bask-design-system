"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, UserPlus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableHeader, TableBody,
  TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import { AvatarInitials } from "@/components/ui/avatar-initials";

type PlanVariant = "neutral" | "success" | "warn" | "danger" | "info" | "violet";
type StatusVariant = "neutral" | "success" | "warn" | "danger" | "info" | "violet";

const CUSTOMERS = [
  { id: "1", name: "Elena Marquez", plan: "Gold",   planVariant: "warn"    as PlanVariant, status: "Active",     statusVariant: "success" as StatusVariant },
  { id: "2", name: "Daniel Torres", plan: "Team",   planVariant: "info"    as PlanVariant, status: "Active",     statusVariant: "success" as StatusVariant },
  { id: "3", name: "Riley Park",    plan: "Silver", planVariant: "neutral" as PlanVariant, status: "Trial",      statusVariant: "warn"    as StatusVariant },
  { id: "4", name: "Sarah Miller",  plan: "Gold",   planVariant: "warn"    as PlanVariant, status: "Active",     statusVariant: "success" as StatusVariant },
  { id: "5", name: "Alex Taylor",   plan: "Bronze", planVariant: "warn"    as PlanVariant, status: "Cancelling", statusVariant: "danger"  as StatusVariant },
  { id: "6", name: "Casey Whitmore",plan: "Silver", planVariant: "neutral" as PlanVariant, status: "Active",     statusVariant: "success" as StatusVariant },
];

const PLAN_DOT: Record<string, string> = {
  Gold:   "bg-amber",
  Team:   "bg-blue",
  Silver: "bg-[var(--ink-3)]",
  Bronze: "bg-[#A0522D]",
};

const COL_HEAD: React.CSSProperties = {
  fontSize: "var(--fs-12)",
  fontWeight: 700,
  letterSpacing: "var(--tracking-eyebrow)",
  textTransform: "uppercase",
  color: "var(--ink-3)",
};

export default function CustomersPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allSelected = selected.size === CUSTOMERS.length;
  const someSelected = selected.size > 0 && !allSelected;

  function toggleAll(checked: boolean) {
    setSelected(checked ? new Set(CUSTOMERS.map((c) => c.id)) : new Set());
  }

  function toggleRow(id: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  }

  return (
    <main id="main-content" style={{ maxWidth: 1040, margin: "0 auto", padding: "48px 32px 96px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-28)",
          letterSpacing: "var(--tracking-display)",
          margin: 0,
        }}>
          Customers
        </h1>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="default" size="icon" aria-label="Download"><Download size={15} /></Button>
          <Button variant="primary"><UserPlus size={15} /> Add customer</Button>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
          <Search
            size={14}
            style={{
              position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)",
              color: "var(--ink-3)", pointerEvents: "none",
            }}
          />
          <Input placeholder="Search customers…" style={{ paddingLeft: 30 }} aria-label="Search customers" />
        </div>
        <Button variant="default"><SlidersHorizontal size={14} /> Filter</Button>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          background: "var(--surface-2)", borderRadius: "var(--r-md)",
          padding: "8px 14px", marginBottom: 12,
          fontSize: "var(--fs-13)", color: "var(--ink-2)",
        }}>
          <span>{selected.size} selected</span>
          <Button variant="danger" size="sm">Delete</Button>
          <Button variant="default" size="sm">Export</Button>
        </div>
      )}

      {/* Table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: 40 }}>
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onCheckedChange={(v) => toggleAll(!!v)}
                  aria-label="Select all customers"
                />
              </TableHead>
              <TableHead style={COL_HEAD}>Customer</TableHead>
              <TableHead style={COL_HEAD}>Plan</TableHead>
              <TableHead style={COL_HEAD}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CUSTOMERS.map((c) => (
              <TableRow
                key={c.id}
                data-selected={selected.has(c.id) || undefined}
                style={selected.has(c.id) ? { background: "var(--surface-2)" } : undefined}
              >
                <TableCell style={{ width: 40 }}>
                  <Checkbox
                    checked={selected.has(c.id)}
                    onCheckedChange={(v) => toggleRow(c.id, !!v)}
                    aria-label={`Select ${c.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <AvatarInitials name={c.name} />
                    <span style={{ fontWeight: 600, fontSize: "var(--fs-14)" }}>{c.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={c.planVariant}>
                    <BadgeDot className={PLAN_DOT[c.plan]} />
                    {c.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={c.statusVariant}>
                    <BadgeDot className={
                      c.statusVariant === "success" ? "bg-green"
                      : c.statusVariant === "warn"    ? "bg-amber"
                      : "bg-red"
                    } />
                    {c.status}
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
