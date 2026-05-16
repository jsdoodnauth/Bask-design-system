"use client"

import * as React from "react"
import { DayPicker, type DayPickerProps } from "react-day-picker"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components,
  ...props
}: DayPickerProps) {
  return (
    <DayPicker
      data-slot="calendar"
      showOutsideDays={showOutsideDays}
      className={cn("p-3 text-ink", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-3",
        month_caption: "flex justify-center pt-1 relative items-center h-9",
        caption_label: "text-[length:var(--fs-14)] font-semibold",
        nav: "flex items-center gap-1 absolute right-1 top-1",
        button_previous: cn(
          "inline-flex size-7 items-center justify-center rounded-[var(--r-xs)] text-ink-3",
          "hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer outline-none",
          "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]"
        ),
        button_next: cn(
          "inline-flex size-7 items-center justify-center rounded-[var(--r-xs)] text-ink-3",
          "hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer outline-none",
          "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-ink-3 rounded-[var(--r-xs)] w-9 font-medium text-[length:var(--fs-12)] uppercase tracking-[var(--tracking-eyebrow)]",
        week: "flex w-full mt-1",
        day: cn(
          "relative size-9 p-0 text-center text-[length:var(--fs-13)] focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-surface-2"
        ),
        day_button: cn(
          "size-9 p-0 inline-flex items-center justify-center rounded-[var(--r-xs)] cursor-pointer outline-none",
          "hover:bg-surface-2 transition-colors",
          "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]"
        ),
        selected: cn(
          "[&>button]:bg-[var(--blue)] [&>button]:text-white",
          "[&>button]:[box-shadow:inset_0_1.5px_0_rgba(255,255,255,0.25),inset_0_-1.5px_0_rgba(0,0,0,0.10)]",
          "[&>button:hover]:bg-[var(--blue)]"
        ),
        today: "[&>button]:font-semibold [&>button]:text-[var(--blue)]",
        outside: "text-ink-3/60 opacity-50",
        disabled: "opacity-40 [&>button]:cursor-not-allowed",
        hidden: "invisible",
        range_start: "[&>button]:rounded-r-none",
        range_middle:
          "[&>button]:rounded-none [&>button]:bg-blue-soft [&>button]:text-ink",
        range_end: "[&>button]:rounded-l-none",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...rest }) => {
          const Icon = orientation === "right" ? ChevronRightIcon : ChevronLeftIcon
          return <Icon className="size-4" {...rest} />
        },
        ...components,
      }}
      {...props}
    />
  )
}

export { Calendar }
