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

interface AvatarGroupProps extends React.ComponentProps<"div"> {
  /** Pixel overlap; default 8 (matches `-space-x-2`). */
  overlap?: number
  /** Maximum avatars shown before `+N` chip. */
  max?: number
  /** Ring color class for stacked avatars. */
  ringClass?: string
}

function AvatarGroup({
  className,
  children,
  overlap = 8,
  max,
  ringClass = "ring-2 ring-[color:var(--surface)]",
  ...props
}: AvatarGroupProps) {
  const arr = React.Children.toArray(children)
  const shown = max !== undefined && arr.length > max ? arr.slice(0, max) : arr
  const overflow = max !== undefined && arr.length > max ? arr.length - max : 0
  const styled = shown.map((child, i) => {
    if (!React.isValidElement<{ className?: string }>(child)) return child
    return React.cloneElement(child, {
      key: child.key ?? i,
      className: cn(ringClass, child.props.className),
    })
  })
  return (
    <div
      data-slot="avatar-group"
      className={cn("flex items-center", className)}
      {...props}
    >
      {styled.map((c, i) => (
        <div key={i} style={i === 0 ? undefined : { marginLeft: -overlap }}>
          {c}
        </div>
      ))}
      {overflow > 0 ? (
        <div
          aria-label={`${overflow} more`}
          className={cn(
            "size-6 rounded-full grid place-items-center bg-surface-3 text-ink-2 text-[length:var(--fs-12)] font-bold [box-shadow:var(--elev-1)]",
            ringClass
          )}
          style={{ marginLeft: -overlap }}
        >
          +{overflow}
        </div>
      ) : null}
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
export type { AvatarGroupProps }
