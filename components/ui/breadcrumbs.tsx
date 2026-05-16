import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps extends React.ComponentProps<"nav"> {
  items: BreadcrumbItem[]
}

function Breadcrumbs({ items, className, ...props }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center flex-wrap text-[length:var(--fs-13)]", className)}
      {...props}
    >
      {items.map((item, i) => {
        const isCurrent = i === items.length - 1
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <ChevronRight size={14} className="text-ink-3 mx-0.5 flex-none" aria-hidden />
            )}
            {isCurrent ? (
              <span
                className="text-ink font-semibold px-2 py-1 rounded-[var(--r-xs)]"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <a
                href={item.href ?? "#"}
                className="text-ink-3 px-2 py-1 rounded-[var(--r-xs)] no-underline hover:bg-surface-2 hover:text-ink transition-colors focus-visible:outline-none focus-visible:[box-shadow:0_0_0_3px_var(--ring-color)]"
              >
                {item.label}
              </a>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

export { Breadcrumbs }
export type { BreadcrumbItem }
