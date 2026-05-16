"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles, LayoutDashboard, Users, FileText, ShoppingBag,
  Bell, Settings, Search, Filter, Star,
} from "lucide-react";
import { useBaskTilt } from "@/lib/motion/bask-motion-provider";
import { baskShadow } from "@/lib/bask-shadow";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Stat } from "@/components/ui/stat";
import { Stepper } from "@/components/ui/stepper";
import { Swatch } from "@/components/ui/swatch";
import { LockCard } from "@/components/ui/lock-card";
import { AvatarInitials } from "@/components/ui/avatar-initials";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Choice } from "@/components/ui/choice";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="section">
    <h2>{title}</h2>
    {children}
  </section>
);

const Row = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", ...style }}>
    {children}
  </div>
);

export default function Home() {
  const tiltRef = useBaskTilt();
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeSwatch, setActiveSwatch] = useState<string | null>("clay");
  const [choiceA, setChoiceA] = useState(false);
  const [choiceB, setChoiceB] = useState(false);

  const swatches = [
    { id: "clay",   color: "#C28B72" },
    { id: "slate",  color: "#718096" },
    { id: "forest", color: "#2D6A4F" },
    { id: "navy",   color: "#2C3E6B" },
    { id: "rose",   color: "#C06080" },
  ];

  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 32px 96px" }}>
      {/* Sample page nav */}
      <nav style={{
        display: "flex", gap: 8, flexWrap: "wrap",
        marginBottom: 40,
        padding: "12px 16px",
        background: "var(--surface-2)",
        borderRadius: "var(--r-lg)",
        fontSize: "var(--fs-13)",
      }}>
        <span style={{ color: "var(--ink-3)", fontWeight: 600, marginRight: 4, alignSelf: "center" }}>Sample pages:</span>
        {[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/customers", label: "Customers" },
          { href: "/article",   label: "Article"   },
          { href: "/product",   label: "Product"   },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              padding: "5px 12px",
              borderRadius: "var(--r-pill)",
              background: "var(--surface-3)",
              color: "var(--ink)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {label}
          </Link>
        ))}
      </nav>

      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "var(--fs-36)",
        letterSpacing: "var(--tracking-display)",
        lineHeight: "var(--lh-display)",
        margin: 0,
      }}>
        Bask — Component Gallery
      </h1>
      <p style={{ color: "var(--ink-2)", marginTop: 12, marginBottom: 0 }}>
        All components. Move the cursor to see proximity-light parallax.
      </p>

      {/* ── Stat tiles ── */}
      <Section title="Stat tiles">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          <Stat label="Core updates" value="7" icon={<LayoutDashboard size={16} />} tint="blue" />
          <Stat label="Active users" value="1,284" icon={<Users size={16} />} tint="green" />
          <Stat label="Articles" value="38" icon={<FileText size={16} />} tint="amber" />
          <Stat label="Revenue" value="$4.2k" icon={<ShoppingBag size={16} />} tint="violet" />
        </div>
      </Section>

      {/* ── Stepper ── */}
      <Section title="Stepper">
        <Row>
          <Stepper value={qty} onChange={setQty} min={1} max={20} />
          <span style={{ color: "var(--ink-2)" }}>qty: {qty}</span>
        </Row>
      </Section>

      {/* ── Swatches ── */}
      <Section title="Swatches">
        <Row>
          {swatches.map(s => (
            <Swatch
              key={s.id}
              color={s.color}
              active={activeSwatch === s.id}
              onClick={() => setActiveSwatch(s.id)}
              aria-label={s.id}
            />
          ))}
        </Row>
        <p style={{ color: "var(--ink-3)", fontSize: "var(--fs-13)", marginTop: 10 }}>
          Selected: {activeSwatch ?? "none"}
        </p>
      </Section>

      {/* ── LockCard ── */}
      <Section title="LockCard">
        <div style={{ maxWidth: 380 }}>
          <LockCard
            title="Members only"
            description="Subscribe to read the full article and unlock all premium content."
            action={<Button variant="primary">Unlock access</Button>}
          />
        </div>
      </Section>

      {/* ── AvatarInitials ── */}
      <Section title="AvatarInitials">
        <Row>
          {["Alice Chen", "Bob Wilson", "Carol Smith", "David Park", "Eva Martinez"].map(name => (
            <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <AvatarInitials name={name} />
              <span style={{ fontSize: "var(--fs-12)", color: "var(--ink-3)" }}>
                {name.split(" ")[0]}
              </span>
            </div>
          ))}
        </Row>
        <Row style={{ marginTop: 12 }}>
          <AvatarInitials name="Joshua Doodnauth" size="sm" />
          <AvatarInitials name="Joshua Doodnauth" size="default" />
          <AvatarInitials name="Joshua Doodnauth" size="lg" />
        </Row>
      </Section>

      {/* ── Breadcrumbs ── */}
      <Section title="Breadcrumbs">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Breadcrumbs items={[
            { label: "Dashboard", href: "#" },
            { label: "Customers", href: "#" },
            { label: "Alice Chen" },
          ]} />
          <Breadcrumbs items={[
            { label: "Sites", href: "#" },
            { label: "Article" },
          ]} />
        </div>
      </Section>

      {/* ── Choice rows ── */}
      <Section title="Choice rows">
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 420 }}>
          <Choice>
            <Checkbox checked={choiceA} onCheckedChange={(v) => setChoiceA(!!v)} id="ca" />
            <div>
              <div style={{ fontWeight: 600, fontSize: "var(--fs-14)" }}>Enable analytics</div>
              <div style={{ fontSize: "var(--fs-13)", color: "var(--ink-3)", marginTop: 1 }}>
                Collect anonymous usage data to improve the experience.
              </div>
            </div>
          </Choice>
          <Choice>
            <Checkbox checked={choiceB} onCheckedChange={(v) => setChoiceB(!!v)} id="cb" />
            <div>
              <div style={{ fontWeight: 600, fontSize: "var(--fs-14)" }}>Weekly digest</div>
              <div style={{ fontSize: "var(--fs-13)", color: "var(--ink-3)", marginTop: 1 }}>
                Receive a summary of activity every Monday morning.
              </div>
            </div>
          </Choice>
        </div>
      </Section>

      {/* ── Buttons ── */}
      <Section title="Buttons">
        <Row>
          <Button variant="default">Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="orange">Orange</Button>
          <Button variant="ghost">Ghost</Button>
        </Row>
        <Row style={{ marginTop: 12 }}>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary">Default</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="default" size="icon"><Bell size={16} /></Button>
          <Button variant="default" size="icon"><Search size={16} /></Button>
          <Button variant="default" size="icon"><Filter size={16} /></Button>
          <Button variant="default" size="icon"><Settings size={16} /></Button>
          <Button variant="default" disabled>Disabled</Button>
        </Row>
      </Section>

      {/* ── Cards ── */}
      <Section title="Cards">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          <Card>
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>Secondary description</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: "var(--ink-2)", margin: 0, lineHeight: "var(--lh-body)" }}>
                A basic card with the Bask carved shadow. Move the cursor near it to tilt the cast.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm">Action</Button>
            </CardFooter>
          </Card>
          <Card hoverLift>
            <CardHeader><CardTitle>Hover-lift card</CardTitle></CardHeader>
            <CardContent>
              <p style={{ color: "var(--ink-2)", margin: 0 }}>Shadow lifts on hover.</p>
            </CardContent>
          </Card>
          <div
            ref={tiltRef}
            style={{
              background: "var(--surface)",
              borderRadius: "var(--r-lg)",
              padding: 20,
              boxShadow: baskShadow("card"),
            }}
          >
            <strong>Raw baskShadow</strong>
            <p style={{ color: "var(--ink-2)", margin: "8px 0 0" }}>
              Using the helper directly — same shadow as Card component.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Badges ── */}
      <Section title="Badges">
        <Row>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="success"><BadgeDot className="bg-green" />Success</Badge>
          <Badge variant="warn"><BadgeDot className="bg-amber" />Warning</Badge>
          <Badge variant="danger"><BadgeDot className="bg-red" />Danger</Badge>
          <Badge variant="info"><BadgeDot className="bg-blue" />Info</Badge>
          <Badge variant="violet"><BadgeDot className="bg-violet" />Violet</Badge>
          <Badge variant="success"><Star size={11} />Rated</Badge>
        </Row>
      </Section>

      {/* ── Avatars ── */}
      <Section title="Avatars">
        <Row>
          <Avatar color="blue">JD</Avatar>
          <Avatar color="green">AB</Avatar>
          <Avatar color="violet">PK</Avatar>
          <Avatar color="amber">MW</Avatar>
          <Avatar color="red">SR</Avatar>
          <Avatar color="brown">TL</Avatar>
          <Avatar size="sm" color="blue">JD</Avatar>
          <Avatar size="lg" color="green">AB</Avatar>
        </Row>
      </Section>

      {/* ── Form Controls ── */}
      <Section title="Form Controls">
        <Card style={{ padding: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: "var(--fs-13)", fontWeight: 600, color: "var(--ink-2)", display: "block", marginBottom: 6 }}>
                Text input
              </label>
              <Input placeholder="Enter value…" />
            </div>
            <div>
              <label style={{ fontSize: "var(--fs-13)", fontWeight: 600, color: "var(--ink-2)", display: "block", marginBottom: 6 }}>
                Textarea
              </label>
              <Textarea placeholder="Enter longer text…" />
            </div>
            <div>
              <label style={{ fontSize: "var(--fs-13)", fontWeight: 600, color: "var(--ink-2)", display: "block", marginBottom: 6 }}>
                Select
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opt1">Option one</SelectItem>
                  <SelectItem value="opt2">Option two</SelectItem>
                  <SelectItem value="opt3">Option three</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Checkbox
                checked={checked}
                onCheckedChange={(v) => setChecked(!!v)}
                id="cb1"
              />
              <label htmlFor="cb1" style={{ fontSize: "var(--fs-14)", cursor: "pointer" }}>
                {checked ? "Checked — recessed → elevated" : "Unchecked — recessed well"}
              </label>
            </div>
            <RadioGroup defaultValue="r1" style={{ gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <RadioGroupItem value="r1" id="r1" />
                <label htmlFor="r1" style={{ fontSize: "var(--fs-14)", cursor: "pointer" }}>Option A</label>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <RadioGroupItem value="r2" id="r2" />
                <label htmlFor="r2" style={{ fontSize: "var(--fs-14)", cursor: "pointer" }}>Option B</label>
              </div>
            </RadioGroup>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Switch
                checked={switchOn}
                onCheckedChange={setSwitchOn}
                id="sw1"
              />
              <label htmlFor="sw1" style={{ fontSize: "var(--fs-14)", cursor: "pointer" }}>
                {switchOn ? "On" : "Off"}
              </label>
            </div>
          </div>
        </div>
        </Card>
      </Section>

      {/* ── Separator ── */}
      <Section title="Separator">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Separator />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "var(--ink-2)" }}>Left</span>
            <Separator orientation="vertical" style={{ height: 20 }} />
            <span style={{ color: "var(--ink-2)" }}>Right</span>
          </div>
        </div>
      </Section>

      {/* ── Table ── */}
      <Section title="Table">
        <Card style={{ padding: 8 }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: "Alice Chen", plan: "Pro", status: "active" },
                { name: "Bob Wilson", plan: "Starter", status: "trial" },
                { name: "Carol Smith", plan: "Enterprise", status: "active" },
              ].map((row) => (
                <TableRow key={row.name}>
                  <TableCell style={{ fontWeight: 600 }}>{row.name}</TableCell>
                  <TableCell>{row.plan}</TableCell>
                  <TableCell>
                    <Badge variant={row.status === "active" ? "success" : "warn"}>
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Section>

      {/* ── Tabs ── */}
      <Section title="Tabs">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" style={{ paddingTop: 16 }}>
              <p style={{ color: "var(--ink-2)", margin: 0 }}>Overview content — pill variant (recessed track, elevated active pill).</p>
            </TabsContent>
            <TabsContent value="activity" style={{ paddingTop: 16 }}>
              <p style={{ color: "var(--ink-2)", margin: 0 }}>Activity content.</p>
            </TabsContent>
            <TabsContent value="settings" style={{ paddingTop: 16 }}>
              <p style={{ color: "var(--ink-2)", margin: 0 }}>Settings content.</p>
            </TabsContent>
          </Tabs>

          <Tabs defaultValue="overview">
            <TabsList variant="line">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" style={{ paddingTop: 16 }}>
              <p style={{ color: "var(--ink-2)", margin: 0 }}>Underline tabs variant.</p>
            </TabsContent>
            <TabsContent value="activity" style={{ paddingTop: 16 }}>
              <p style={{ color: "var(--ink-2)", margin: 0 }}>Activity content.</p>
            </TabsContent>
          </Tabs>
        </div>
      </Section>

      {/* ── Tooltip, Dropdown, Dialog ── */}
      <Section title="Tooltip, Dropdown, Dialog">
        <Row>
          <Tooltip>
            <TooltipTrigger render={<Button variant="default" />}>
              Hover for tooltip
            </TooltipTrigger>
            <TooltipContent>Bask carved tooltip</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="default" />}>
              Actions <Sparkles size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings <DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog>
            <DialogTrigger render={<Button variant="primary" />}>
              Open dialog
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm action</DialogTitle>
                <DialogDescription>
                  This is a Bask modal with a warm-tinted blur backdrop and a carved surface.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="default">Cancel</Button>
                <Button variant="primary">Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Row>
      </Section>
    </main>
  );
}
