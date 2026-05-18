"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

/** Mobile-only top bar: hamburger trigger + brand. Tap opens a left Sheet
 *  with the nav contents. Auto-closes on route change. */
function MobileNav({
  children,
  brand = "Bask",
  className,
  ...props
}: { children: React.ReactNode; brand?: React.ReactNode } & Omit<React.ComponentProps<"div">, "children">) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  // Route change → close the drawer.
  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div
      data-slot="mobile-nav"
      className={cn("flex items-center gap-3 py-2", className)}
      {...props}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={<Button variant="default" size="icon" aria-label="Open navigation" />}
        >
          <Menu size={16} />
        </SheetTrigger>
        <SheetContent side="left" className="p-3 flex flex-col gap-1">
          {children}
        </SheetContent>
      </Sheet>
      <span className="font-display text-[length:var(--fs-22)] font-bold tracking-[var(--tracking-display)]">
        {brand}
      </span>
    </div>
  )
}

export { MobileNav }
