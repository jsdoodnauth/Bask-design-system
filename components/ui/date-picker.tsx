"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type DatePickerProps = {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  format?: (date: Date) => string
}

const defaultFormat = (d: Date) =>
  d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })

function DatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  disabled,
  className,
  format = defaultFormat,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="default"
            disabled={disabled}
            data-slot="date-picker-trigger"
            className={cn(
              "w-full justify-between gap-2 font-normal text-left",
              !value && "text-ink-3",
              className
            )}
          />
        }
      >
        <span>{value ? format(value) : placeholder}</span>
        <CalendarIcon className="size-4 text-ink-3" />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onValueChange}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
