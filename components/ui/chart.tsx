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

  // Measure the wrapper ourselves and pass numeric dimensions to
  // ResponsiveContainer once we have them. With React 19 + recharts 3,
  // ResponsiveContainer's own measurement runs before the parent has
  // resolved its size and logs a width(-1)/height(-1) warning, even
  // though the chart eventually paints correctly. Mounting the chart
  // only after we know real dimensions avoids the warning entirely.
  const ref = React.useRef<HTMLDivElement>(null)
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

type ChartTooltipContentProps = {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: React.ReactNode
  className?: string
  hideLabel?: boolean
  hideIndicator?: boolean
  formatter?: (value: TooltipPayloadItem["value"], name: TooltipPayloadItem["name"]) => React.ReactNode
}

function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  hideLabel,
  hideIndicator,
  formatter,
}: ChartTooltipContentProps) {
  const { config } = useChart()
  if (!active || !payload?.length) return null
  return (
    <div
      className={cn(
        "min-w-[8rem] rounded-[var(--r-sm)] bg-surface text-ink p-2.5 text-[length:var(--fs-13)]",
        "[box-shadow:var(--elev-3)]",
        className
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
              {!hideIndicator && (
                <span
                  aria-hidden
                  className="size-2 shrink-0 rounded-full"
                  style={{ background: indicatorColor }}
                />
              )}
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
}
