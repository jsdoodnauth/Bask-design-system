"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"
import { useBaskTilt } from "@/lib/motion/bask-motion-provider"

const COLOR_CLASSES: Record<string, string> = {
  blue:   "bg-blue",
  green:  "bg-green",
  violet: "bg-violet",
  amber:  "bg-amber",
  red:    "bg-[#9C3232]",
  brown:  "bg-[#7A4226]",
}

function Avatar({
  className,
  color = "blue",
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  color?: keyof typeof COLOR_CLASSES | string
  size?: "sm" | "default" | "lg"
}) {
  const tiltRef = useBaskTilt()
  const colorClass = COLOR_CLASSES[color] ?? color
  return (
    <AvatarPrimitive.Root
      ref={tiltRef}
      data-slot="avatar"
      data-size={size}
      className={cn(
        "relative inline-grid place-items-center rounded-full select-none shrink-0",
        "text-white font-bold text-[length:var(--fs-13)]",
        size === "sm" ? "size-6" : size === "lg" ? "size-10" : "size-9",
        colorClass,
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("flex size-full items-center justify-center rounded-full", className)}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("flex -space-x-2", className)}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
