"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { useToastManager } from "@/components/ui/toast"

type ButtonProps = React.ComponentProps<typeof Button>

interface ToastActionButtonProps extends Omit<ButtonProps, "onClick"> {
  /** Toast title fired on click. */
  toastTitle: React.ReactNode
  toastDescription?: React.ReactNode
  /** Optional action ({ label, onClick }) shown on the toast. */
  toastAction?: { label: string; onClick?: () => void }
  /** Extra side-effect on click (fires alongside the toast). */
  onClick?: ButtonProps["onClick"]
}

function ToastActionButton({
  toastTitle, toastDescription, toastAction, onClick, ...props
}: ToastActionButtonProps) {
  const manager = useToastManager()
  return (
    <Button
      {...props}
      onClick={(e) => {
        manager.add({
          title: toastTitle,
          description: toastDescription,
          actionProps: toastAction
            ? { children: toastAction.label, onClick: toastAction.onClick }
            : undefined,
        })
        onClick?.(e)
      }}
    />
  )
}

export { ToastActionButton }
