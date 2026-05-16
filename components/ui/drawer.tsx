"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { cn } from "@/lib/utils"

type Side = "top" | "right" | "bottom" | "left"

const swipeForSide: Record<Side, "up" | "down" | "left" | "right"> = {
  top: "up",
  right: "right",
  bottom: "down",
  left: "left",
}

function Drawer({ ...props }: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 isolate z-50",
        "data-open:animate-in data-open:fade-in-0",
        "data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

const sideClasses: Record<Side, string> = {
  top:    "inset-x-0 top-0 max-h-[85vh] rounded-b-[var(--r-lg)] data-open:slide-in-from-top data-closed:slide-out-to-top",
  bottom: "inset-x-0 bottom-0 max-h-[85vh] rounded-t-[var(--r-lg)] data-open:slide-in-from-bottom data-closed:slide-out-to-bottom",
  left:   "inset-y-0 left-0 max-w-[400px] w-full h-full rounded-r-[var(--r-lg)] data-open:slide-in-from-left data-closed:slide-out-to-left",
  right:  "inset-y-0 right-0 max-w-[400px] w-full h-full rounded-l-[var(--r-lg)] data-open:slide-in-from-right data-closed:slide-out-to-right",
}

type DrawerContentProps = DrawerPrimitive.Popup.Props & { side?: Side }

function DrawerContent({
  className,
  children,
  side = "right",
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Popup
        data-slot="drawer-content"
        data-side={side}
        className={cn(
          "fixed z-50 bg-surface text-ink outline-none p-6",
          "data-open:animate-in data-closed:animate-out [animation-duration:240ms]",
          sideClasses[side],
          className
        )}
        {...props}
      >
        {children}
      </DrawerPrimitive.Popup>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 mb-4", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("flex justify-end gap-2.5 mt-6", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "font-display text-[length:var(--fs-22)] tracking-[var(--tracking-display)] leading-[var(--lh-display)] font-semibold",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-[length:var(--fs-14)] text-ink-2 leading-[var(--lh-body)]", className)}
      {...props}
    />
  )
}

export {
  Drawer, DrawerTrigger, DrawerPortal, DrawerClose, DrawerOverlay,
  DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription,
  swipeForSide,
}
