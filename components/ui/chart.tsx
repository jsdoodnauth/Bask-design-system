"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
  }
}

type ChartContextValue = { config: ChartConfig }
const ChartContext = React.createContext<ChartContextValue | null>(null)

function useChart() {
  const ctx = React.useContext(ChartContext)
  if (!ctx) throw new Error("Chart parts must be used inside <ChartContainer>")
  return ctx
}

/** Measures the nearest box via ResizeObserver. Returns null until the box
 *  has a non-zero size — render charts only after that to avoid recharts'
 *  width(-1)/height(-1) warning on React 19 + recharts 3. */
function useMeasuredSize<T extends HTMLElement>() {
  const ref = React.useRef<T>(null)
  const [size, setSize] = React.useState<{ w: number; h: number } | null>(null)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect
      if (r.width > 0 && r.height > 0) {
        setSize({ w: Math.round(r.width), h: Math.round(r.height) })
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, size] as const
}

/** Drop-in for ResponsiveContainer that measures its parent first. Use when
 *  ChartContainer's chart-axis class set isn't wanted (e.g. sparklines, pie). */
function MeasuredResponsiveContainer({
  className,
  style,
  children,
}: {
  className?: string
  style?: React.CSSProperties
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
}) {
  const [ref, size] = useMeasuredSize<HTMLDivElement>()
  return (
    <div ref={ref} className={className} style={style}>
      {size && (
        <RechartsPrimitive.ResponsiveContainer width={size.w} height={size.h}>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      )}
    </div>
  )
}

type ChartContainerProps = React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
}

function ChartContainer({
  config,
  className,
  children,
  ...props
}: ChartContainerProps) {
  const style = Object.fromEntries(
    Object.entries(config)
      .filter(([, v]) => v.color)
      .map(([k, v]) => [`--color-${k}`, v.color])
  ) as React.CSSProperties

  const [ref, size] = useMeasuredSize<HTMLDivElement>()

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-slot="chart"
        className={cn(
          "block w-full h-[260px] text-[length:var(--fs-13)]",
          "[&_.recharts-cartesian-grid_line]:stroke-[var(--hairline)]",
          "[&_.recharts-cartesian-axis-tick_text]:fill-[var(--ink-3)]",
          "[&_.recharts-cartesian-axis_line]:stroke-[var(--hairline)]",
          "[&_.recharts-tooltip-cursor]:fill-[var(--surface-2)] [&_.recharts-tooltip-cursor]:stroke-transparent",
          "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-layer]:outline-none [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        style={style}
        {...props}
      >
        {size && (
          <RechartsPrimitive.ResponsiveContainer width={size.w} height={size.h}>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        )}
      </div>
    </ChartContext.Provider>
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

type TooltipPayloadItem = {
  name?: string | number
  value?: string | number
  dataKey?: string | number
  color?: string
  payload?: Record<string, unknown>
}

type TooltipVariant = "default" | "compact" | "glass"
type IndicatorShape = "dot" | "square" | "line"

type ChartTooltipContentProps = {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: React.ReactNode
  className?: string
  hideLabel?: boolean
  hideIndicator?: boolean
  /** Visual variant. `compact` = single-line, `glass` = translucent backdrop-blur surface. */
  variant?: TooltipVariant
  /** Shape of the per-series indicator. Default "dot". */
  indicator?: IndicatorShape
  formatter?: (value: TooltipPayloadItem["value"], name: TooltipPayloadItem["name"]) => React.ReactNode
}

function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  hideLabel,
  hideIndicator,
  variant = "default",
  indicator = "dot",
  formatter,
}: ChartTooltipContentProps) {
  const { config } = useChart()
  if (!active || !payload?.length) return null

  const surfaceClass =
    variant === "glass"
      ? "bg-[color-mix(in_oklch,var(--surface)_82%,transparent)] backdrop-blur-md"
      : "bg-surface"

  const padClass = variant === "compact" ? "px-2 py-1.5" : "p-2.5"
  const minWidthClass = variant === "compact" ? "min-w-0" : "min-w-[8rem]"

  const renderIndicator = (color: string | undefined) => {
    if (hideIndicator) return null
    if (indicator === "line") {
      return (
        <span
          aria-hidden
          className="w-0.5 h-3 shrink-0 rounded-full"
          style={{ background: color }}
        />
      )
    }
    if (indicator === "square") {
      return (
        <span
          aria-hidden
          className="size-2 shrink-0 rounded-[2px]"
          style={{ background: color }}
        />
      )
    }
    return (
      <span
        aria-hidden
        className="size-2 shrink-0 rounded-full"
        style={{ background: color }}
      />
    )
  }

  if (variant === "compact") {
    const first = payload[0]
    const key = String(first.dataKey ?? first.name ?? 0)
    const itemConfig = config[key]
    const indicatorColor = first.color ?? itemConfig?.color
    return (
      <div
        className={cn(
          "rounded-[var(--r-sm)] text-ink text-[length:var(--fs-12)] inline-flex items-center gap-1.5",
          surfaceClass, padClass, minWidthClass,
          "[box-shadow:var(--elev-3)]",
          className,
        )}
      >
        {renderIndicator(indicatorColor)}
        {label != null && !hideLabel && <span className="text-ink-3">{label}:</span>}
        <span className="font-semibold tabular-nums">
          {formatter ? formatter(first.value, first.name) : first.value}
        </span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "rounded-[var(--r-sm)] text-ink text-[length:var(--fs-13)]",
        surfaceClass, padClass, minWidthClass,
        "[box-shadow:var(--elev-3)]",
        className,
      )}
    >
      {!hideLabel && label != null && (
        <div className="font-semibold mb-1.5">{label}</div>
      )}
      <div className="flex flex-col gap-1">
        {payload.map((item, i) => {
          const key = String(item.dataKey ?? item.name ?? i)
          const itemConfig = config[key]
          const indicatorColor = item.color ?? itemConfig?.color
          return (
            <div key={i} className="flex items-center gap-2">
              {renderIndicator(indicatorColor)}
              <span className="text-ink-2 flex-1">{itemConfig?.label ?? item.name}</span>
              <span className="font-medium tabular-nums">
                {formatter ? formatter(item.value, item.name) : item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

type LegendPayloadItem = {
  value?: string | number
  dataKey?: string | number
  color?: string
}

function ChartLegendContent({
  payload,
  className,
}: {
  payload?: LegendPayloadItem[]
  className?: string
}) {
  const { config } = useChart()
  if (!payload?.length) return null
  return (
    <div className={cn("flex items-center justify-center gap-4 mt-2", className)}>
      {payload.map((item, i) => {
        const key = String(item.dataKey ?? item.value ?? i)
        const itemConfig = config[key]
        return (
          <div key={i} className="flex items-center gap-1.5 text-[length:var(--fs-13)] text-ink-2">
            <span
              aria-hidden
              className="size-2 rounded-full"
              style={{ background: item.color ?? itemConfig?.color }}
            />
            {itemConfig?.label ?? item.value}
          </div>
        )
      })}
    </div>
  )
}

export {
  ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent,
  MeasuredResponsiveContainer, useMeasuredSize,
}
