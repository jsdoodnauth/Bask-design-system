"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"

const useToastManager = ToastPrimitive.useToastManager
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "fixed bottom-4 right-4 z-[60] flex w-[360px] max-w-[calc(100vw-2rem)] flex-col gap-2 outline-none",
        className
      )}
      {...props}
    />
  )
}

type ToastRootProps = ToastPrimitive.Root.Props

function Toast({ className, ...props }: ToastRootProps) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cn(
        "relative w-full rounded-[var(--r-md)] bg-surface text-ink p-4 pr-10 outline-none",
        "transition-[transform,opacity] duration-200",
        "data-starting-style:opacity-0 data-starting-style:translate-y-2",
        "data-ending-style:opacity-0 data-ending-style:translate-y-2",
        className
      )}
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn("text-[length:var(--fs-14)] font-semibold leading-tight", className)}
      {...props}
    />
  )
}

function ToastDescription({
  className,
  ...props
}: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("text-[length:var(--fs-13)] text-ink-2 leading-[var(--lh-body)] mt-1", className)}
      {...props}
    />
  )
}

function ToastAction({ className, ...props }: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-[var(--r-sm)] px-3 text-[length:var(--fs-13)] font-medium",
        "bg-surface-2 hover:bg-surface-3 transition-colors cursor-pointer outline-none mt-3",
        "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]",
        className
      )}
      {...props}
    />
  )
}

function ToastClose({ className, children, ...props }: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      className={cn(
        "absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-[var(--r-xs)]",
        "text-ink-3 hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer outline-none",
        "focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]",
        className
      )}
      {...props}
    >
      {children ?? <XIcon className="size-4" />}
    </ToastPrimitive.Close>
  )
}

/**
 * Convenience renderer: maps `manager.toasts` to styled <Toast> elements
 * inside <ToastViewport>. Use directly under <ToastProvider> at the app root.
 */
function Toaster({ className, ...props }: Omit<ToastPrimitive.Viewport.Props, "children">) {
  const { toasts } = useToastManager()
  return (
    <ToastViewport className={className} {...props}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast}>
          {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
          {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          {toast.actionProps && <ToastAction {...toast.actionProps} />}
          <ToastClose />
        </Toast>
      ))}
    </ToastViewport>
  )
}

export {
  Toast, ToastProvider, ToastViewport, Toaster,
  ToastTitle, ToastDescription, ToastAction, ToastClose,
  useToastManager,
}
