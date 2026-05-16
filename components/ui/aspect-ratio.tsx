"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type AspectRatioProps = React.ComponentProps<"div"> & {
  ratio?: number
}

function AspectRatio({
  ratio = 1,
  style,
  className,
  ...props
}: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      className={cn("relative w-full [&>*]:absolute [&>*]:inset-0 [&>*]:size-full", className)}
      style={{ aspectRatio: String(ratio), ...style }}
      {...props}
    />
  )
}

export { AspectRatio }
