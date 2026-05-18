"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  AlignCenterIcon, AlignLeftIcon, AlignRightIcon,
  BoldIcon, ItalicIcon, UnderlineIcon,
  AlertCircleIcon, CheckCircle2Icon, InfoIcon, TriangleAlertIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionPanel,
} from "@/components/ui/accordion"
import {
  Collapsible, CollapsibleTrigger, CollapsiblePanel,
} from "@/components/ui/collapsible"
import {
  Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue,
} from "@/components/ui/progress"
import {
  Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderValue,
} from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter,
  AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet"
import {
  Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription,
  ToastClose, useToastManager,
} from "@/components/ui/toast"
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
} from "@/components/ui/pagination"
import {
  Popover, PopoverTrigger, PopoverContent,
} from "@/components/ui/popover"
import {
  HoverCard, HoverCardTrigger, HoverCardContent,
} from "@/components/ui/hover-card"
import {
  Combobox, ComboboxInput, ComboboxInputGroup, ComboboxTrigger,
  ComboboxContent, ComboboxList, ComboboxEmpty, ComboboxItem,
} from "@/components/ui/combobox"
import {
  Form, FormRoot, FormField, FormItem, FormLabel, FormControl,
  FormDescription, FormMessage,
} from "@/components/ui/form"
import { DataTable, type DataTableColumn } from "@/components/ui/data-table"
import { DatePicker } from "@/components/ui/date-picker"
import { Calendar } from "@/components/ui/calendar"
import {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
} from "@/components/ui/carousel"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent, type ChartConfig,
} from "@/components/ui/chart"
import {
  ResizablePanelGroup, ResizablePanel, ResizableHandle,
} from "@/components/ui/resizable"
import { Badge } from "@/components/ui/badge"

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="section">
    <h2>{title}</h2>
    {children}
  </section>
)

// ── Sample data ──
const fruits = [
  { value: "apple",      label: "Apple" },
  { value: "banana",     label: "Banana" },
  { value: "cherry",     label: "Cherry" },
  { value: "dragonfruit",label: "Dragonfruit" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig",        label: "Fig" },
]

type Person = { id: string; name: string; role: string; status: "active" | "trial"; joined: string }
const people: Person[] = [
  { id: "1", name: "Alice Chen",   role: "Designer",  status: "active", joined: "2024-01-12" },
  { id: "2", name: "Bob Wilson",   role: "Engineer",  status: "trial",  joined: "2024-04-03" },
  { id: "3", name: "Carol Smith",  role: "PM",        status: "active", joined: "2023-11-21" },
  { id: "4", name: "David Park",   role: "Engineer",  status: "active", joined: "2024-02-08" },
  { id: "5", name: "Eva Martinez", role: "Designer",  status: "trial",  joined: "2024-05-19" },
]

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 273, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 314, mobile: 240 },
]

const chartConfig: ChartConfig = {
  desktop: { label: "Desktop", color: "var(--blue)" },
  mobile:  { label: "Mobile",  color: "var(--green)" },
}

// ── Form schema for Form demo ──
type FormValues = { username: string; email: string }

function ToastDemoButton() {
  const toast = useToastManager()
  return (
    <Button
      variant="default"
      onClick={() => toast.add({
        title: "Saved successfully",
        description: "Your changes have been published to production.",
      })}
    >
      Show toast
    </Button>
  )
}

function FormDemo() {
  const form = useForm<FormValues>({
    defaultValues: { username: "", email: "" },
  })
  const onSubmit = (values: FormValues) => {
    console.log("submitted", values)
  }
  return (
    <Form {...form}>
      <FormRoot onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm">
        <FormField
          name="username"
          control={form.control}
          rules={{ required: "Username is required", minLength: { value: 3, message: "Min 3 chars" } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl render={<Input placeholder="bask" {...field} />} />
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          rules={{
            required: "Email is required",
            pattern: { value: /.+@.+\..+/, message: "Invalid email" },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl render={<Input type="email" placeholder="you@example.com" {...field} />} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="primary" className="self-start">Submit</Button>
      </FormRoot>
    </Form>
  )
}

function ComboboxDemo() {
  const [value, setValue] = React.useState<string | null>(null)
  return (
    <div className="w-64">
      <Combobox<string> items={fruits.map((f) => f.value)} value={value} onValueChange={setValue}>
        <ComboboxInputGroup>
          <ComboboxInput placeholder="Pick a fruit…" />
          <ComboboxTrigger />
        </ComboboxInputGroup>
        <ComboboxContent>
          <ComboboxEmpty>No fruit found.</ComboboxEmpty>
          <ComboboxList>
            {fruits.map((f) => (
              <ComboboxItem key={f.value} value={f.value}>
                {f.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

export default function ComponentsPage() {
  const [progress, setProgress] = React.useState(42)
  const [slider, setSlider] = React.useState([30])
  const [align, setAlign] = React.useState<string[]>(["left"])
  const [bold, setBold] = React.useState(false)
  const [date, setDate] = React.useState<Date>()
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [page, setPage] = React.useState(2)

  const columns: DataTableColumn<Person>[] = [
    { id: "name", header: "Name", cell: (r) => <span className="font-semibold">{r.name}</span>, sortValue: (r) => r.name },
    { id: "role", header: "Role", cell: (r) => r.role, sortValue: (r) => r.role },
    { id: "status", header: "Status", cell: (r) => (
      <Badge variant={r.status === "active" ? "success" : "warn"}>{r.status}</Badge>
    ) },
    { id: "joined", header: "Joined", cell: (r) => r.joined, sortValue: (r) => r.joined },
  ]

  return (
    <ToastProvider>
      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 32px 96px" }}>
        <nav
          style={{
            display: "flex", gap: 8, flexWrap: "wrap",
            marginBottom: 40, padding: "12px 16px",
            background: "var(--surface-2)", borderRadius: "var(--r-lg)",
            fontSize: "var(--fs-13)",
          }}
        >
          <span style={{ color: "var(--ink-3)", fontWeight: 600, marginRight: 4, alignSelf: "center" }}>Back to:</span>
          <Link
            href="/phase1"
            style={{
              padding: "5px 12px", borderRadius: "var(--r-pill)",
              background: "var(--surface-3)", color: "var(--ink)",
              fontWeight: 600, textDecoration: "none",
            }}
          >
            Gallery
          </Link>
        </nav>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--fs-36)",
            letterSpacing: "var(--tracking-display)",
            lineHeight: "var(--lh-display)",
            margin: 0,
          }}
        >
          Bask — Waves 1–4
        </h1>
        <p style={{ color: "var(--ink-2)", marginTop: 12, marginBottom: 0 }}>
          New components built per <code>docs/ui-components-plan.md</code>.
        </p>

        {/* ── Wave 1 ── */}
        <Section title="Label, Alert, Skeleton, Aspect Ratio">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <Label htmlFor="lbl-input">Email address</Label>
              <Input id="lbl-input" placeholder="you@example.com" />

              <div className="flex flex-col gap-2 mt-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-24 w-full mt-2" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Alert variant="info">
                <InfoIcon />
                <AlertTitle>Heads up</AlertTitle>
                <AlertDescription>This is an informational alert.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <CheckCircle2Icon />
                <AlertTitle>Saved</AlertTitle>
                <AlertDescription>Changes applied successfully.</AlertDescription>
              </Alert>
              <Alert variant="warn">
                <TriangleAlertIcon />
                <AlertTitle>Approaching limit</AlertTitle>
                <AlertDescription>You have 80% of your storage used.</AlertDescription>
              </Alert>
              <Alert variant="danger">
                <AlertCircleIcon />
                <AlertTitle>Something broke</AlertTitle>
                <AlertDescription>The deploy failed; check logs.</AlertDescription>
              </Alert>

              <div className="mt-4 w-full max-w-sm">
                <AspectRatio ratio={16 / 9}>
                  <div className="bg-surface-2 rounded-[var(--r-md)] flex items-center justify-center text-ink-3 text-[length:var(--fs-13)]">
                    16:9 aspect ratio
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Accordion, Collapsible ── */}
        <Section title="Accordion & Collapsible">
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-4">
              <Accordion>
                <AccordionItem value="a">
                  <AccordionTrigger>Is the design carved?</AccordionTrigger>
                  <AccordionPanel>Yes — single soft cast + inset top highlight + faint bottom shade.</AccordionPanel>
                </AccordionItem>
                <AccordionItem value="b">
                  <AccordionTrigger>Does it parallax?</AccordionTrigger>
                  <AccordionPanel>Reactive elements use proximity-light tilt via the BaskMotionProvider.</AccordionPanel>
                </AccordionItem>
                <AccordionItem value="c">
                  <AccordionTrigger>Is it themeable?</AccordionTrigger>
                  <AccordionPanel>Six tones × light/dark via <code>data-theme</code>.</AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Card>
            <Card className="p-4 flex flex-col gap-3">
              <Collapsible>
                <CollapsibleTrigger render={<Button variant="default" size="sm" />}>
                  Toggle details
                </CollapsibleTrigger>
                <CollapsiblePanel className="mt-2">
                  <div className="rounded-[var(--r-sm)] bg-surface-2 p-3 text-ink-2 text-[length:var(--fs-13)]">
                    Collapsible panel content. Height animates between 0 and natural height.
                  </div>
                </CollapsiblePanel>
              </Collapsible>
            </Card>
          </div>
        </Section>

        {/* ── Progress + Slider ── */}
        <Section title="Progress & Slider">
          <Card className="p-6 flex flex-col gap-6">
            <Progress value={progress}>
              <div className="flex items-center justify-between mb-2">
                <ProgressLabel>Upload</ProgressLabel>
                <ProgressValue />
              </div>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setProgress((p) => Math.max(0, p - 10))}>−10</Button>
              <Button size="sm" onClick={() => setProgress((p) => Math.min(100, p + 10))}>+10</Button>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label>Volume</Label>
                <span className="text-[length:var(--fs-13)] tabular-nums text-ink-2">{slider[0]}</span>
              </div>
              <Slider
                value={slider}
                onValueChange={(v) => setSlider(Array.isArray(v) ? [...v] : [v])}
                min={0}
                max={100}
                step={1}
              >
                <SliderControl>
                  <SliderTrack>
                    <SliderIndicator />
                  </SliderTrack>
                  <SliderThumb />
                </SliderControl>
              </Slider>
            </div>
          </Card>
        </Section>

        {/* ── Toggle / ToggleGroup ── */}
        <Section title="Toggle & ToggleGroup">
          <div className="flex items-center gap-6 flex-wrap">
            <Toggle pressed={bold} onPressedChange={setBold} aria-label="Bold">
              <BoldIcon /> Bold
            </Toggle>
            <ToggleGroup value={align} onValueChange={setAlign} aria-label="Text alignment">
              <ToggleGroupItem value="left" aria-label="Align left"><AlignLeftIcon /></ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center"><AlignCenterIcon /></ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right"><AlignRightIcon /></ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup defaultValue={["b"]} multiple aria-label="Text style">
              <ToggleGroupItem value="b"><BoldIcon /></ToggleGroupItem>
              <ToggleGroupItem value="i"><ItalicIcon /></ToggleGroupItem>
              <ToggleGroupItem value="u"><UnderlineIcon /></ToggleGroupItem>
            </ToggleGroup>
          </div>
        </Section>

        {/* ── Scroll Area ── */}
        <Section title="Scroll Area">
          <Card className="p-3">
            <ScrollArea className="h-48 w-full rounded-[var(--r-sm)]">
              <div className="p-4 flex flex-col gap-3 text-[length:var(--fs-14)] text-ink-2">
                {Array.from({ length: 30 }).map((_, i) => (
                  <p key={i}>Item {i + 1} — scroll to see custom-styled scrollbar.</p>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </Section>

        {/* ── Overlays ── */}
        <Section title="Alert Dialog, Sheet, Toast">
          <div className="flex items-center gap-3 flex-wrap">
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="danger" />}>
                Delete account
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Your account and all data will be permanently removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Sheet>
              <SheetTrigger render={<Button variant="default" />}>
                Open sheet (right)
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>Make changes and save when you&apos;re done.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-3 mt-4">
                  <Label htmlFor="sheet-name">Name</Label>
                  <Input id="sheet-name" defaultValue="Joshua" />
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger render={<Button variant="default" />}>
                Open sheet (bottom)
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Bottom sheet</SheetTitle>
                  <SheetDescription>Anchored to the bottom edge.</SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <ToastDemoButton />
          </div>
        </Section>

        {/* ── Pagination ── */}
        <Section title="Pagination">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} />
              </PaginationItem>
              {[1, 2, 3].map((n) => (
                <PaginationItem key={n}>
                  <PaginationLink isActive={page === n} onClick={() => setPage(n)}>{n}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem>
                <PaginationLink isActive={page === 10} onClick={() => setPage(10)}>10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => setPage((p) => Math.min(10, p + 1))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <p className="text-center text-ink-3 text-[length:var(--fs-13)] mt-2">Page {page}</p>
        </Section>

        {/* ── Popover, Hover Card ── */}
        <Section title="Popover & Hover Card">
          <div className="flex items-center gap-3 flex-wrap">
            <Popover>
              <PopoverTrigger render={<Button variant="default" />}>
                Open popover
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-[length:var(--fs-14)]">Dimensions</h4>
                  <p className="text-[length:var(--fs-13)] text-ink-2">Set the width and height for the layer.</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="W" />
                    <Input placeholder="H" />
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <HoverCard>
              <HoverCardTrigger
                render={<a href="#" className="underline text-[var(--blue)] cursor-pointer">@bask</a>}
              />
              <HoverCardContent>
                <div className="flex gap-3">
                  <div className="size-10 rounded-full bg-blue-soft" />
                  <div>
                    <h4 className="font-semibold text-[length:var(--fs-14)]">@bask</h4>
                    <p className="text-[length:var(--fs-13)] text-ink-2">The carved design system.</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </Section>

        {/* ── Combobox ── */}
        <Section title="Combobox">
          <ComboboxDemo />
        </Section>

        {/* ── Form ── */}
        <Section title="Form (react-hook-form)">
          <Card className="p-6">
            <FormDemo />
          </Card>
        </Section>

        {/* ── Data Table ── */}
        <Section title="Data Table">
          <Card className="p-3">
            <DataTable
              data={people}
              columns={columns}
              getRowId={(r) => r.id}
              selectable
              selectedIds={selectedRows}
              onSelectedIdsChange={setSelectedRows}
              defaultSort={{ id: "name", direction: "asc" }}
            />
          </Card>
          <p className="text-ink-3 text-[length:var(--fs-13)] mt-2">
            Selected: {selectedRows.length} of {people.length}
          </p>
        </Section>

        {/* ── Calendar + DatePicker ── */}
        <Section title="Calendar & Date Picker">
          <div className="grid grid-cols-[auto_1fr] gap-6">
            <Card className="p-0 w-fit">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </Card>
            <Card className="p-6 flex flex-col gap-3">
              <Label>Pick a date</Label>
              <DatePicker value={date} onValueChange={setDate} />
              <p className="text-ink-3 text-[length:var(--fs-13)]">
                Selected: {date ? date.toLocaleDateString() : "none"}
              </p>
            </Card>
          </div>
        </Section>

        {/* ── Carousel ── */}
        <Section title="Carousel">
          <div className="px-8">
            <Carousel>
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, i) => (
                  <CarouselItem key={i} className="md:basis-1/3">
                    <Card className="p-6">
                      <CardHeader><CardTitle>Slide {i + 1}</CardTitle></CardHeader>
                      <CardContent>
                        <p className="text-ink-2 text-[length:var(--fs-14)]">CSS scroll-snap carousel item.</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Section>

        {/* ── Chart ── */}
        <Section title="Chart (recharts)">
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-4">
              <CardHeader><CardTitle>Bar chart</CardTitle></CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="p-4">
              <CardHeader><CardTitle>Line chart</CardTitle></CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <LineChart data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                    <Line dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ── Resizable ── */}
        <Section title="Resizable">
          <Card className="p-0 overflow-hidden h-64">
            <ResizablePanelGroup orientation="horizontal">
              <ResizablePanel id="left" defaultSize={30} minSize={20}>
                <div className="size-full p-4 text-ink-2 text-[length:var(--fs-14)]">Left pane</div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel id="middle" defaultSize={40} minSize={20}>
                <div className="size-full p-4 text-ink-2 text-[length:var(--fs-14)]">Middle pane</div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel id="right" defaultSize={30} minSize={20}>
                <div className="size-full p-4 text-ink-2 text-[length:var(--fs-14)]">Right pane</div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </Card>
        </Section>

        {/* Toast viewport — render once near the root of the page */}
        <ToastViewport>
          {/* Bridges with useToastManager.toasts via Toaster, but we inline minimal here */}
          <ToastRenderer />
        </ToastViewport>
      </main>
    </ToastProvider>
  )
}

function ToastRenderer() {
  const { toasts } = useToastManager()
  return (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast}>
          {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
          {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          <ToastClose />
        </Toast>
      ))}
    </>
  )
}
