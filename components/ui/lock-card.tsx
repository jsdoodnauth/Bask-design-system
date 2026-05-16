"use client"

import * as React from "react"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useBaskTilt } from "@/lib/motion/bask-motion-provider"

interface LockCardProps extends React.ComponentProps<"div"> {
  title?: string
  description?: string
  action?: React.ReactNode
}

function LockCard({ title = "Members only", description, action, className, children, ...props }: LockCardProps) {
  const tiltRef = useBaskTilt()
  return (
    <div
      ref={tiltRef}
      data-slot="lock-card"
      className={cn("bg-surface-2 rounded-lg p-[22px] text-center", className)}
      {...props}
    >
      <div
        className="w-11 h-11 rounded-sm mx-auto mb-3 bg-violet-soft text-violet grid place-items-center"
        style={{ boxShadow: "var(--elev-2)" }}
      >
        <Lock size={18} />
      </div>
      <h3 className="text-[length:var(--fs-16)] font-semibold tracking-[-0.01em] mb-1">{title}</h3>
      {description && (
        <p
          className="text-[length:var(--fs-14)] text-ink-2 mb-4"
          style={{ lineHeight: "var(--lh-body)", margin: "6px 0 0" }}
        >
          {description}
        </p>
      )}
      {children}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export { LockCard }
