import * as React from "react"

import { cn } from "@/lib/utils"

interface FlagProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** ISO 3166-1 alpha-2 country code (case-insensitive). e.g. "us", "GB", "br". */
  iso: string
  /** Render height in px. Aspect is 4:3 by default. Default 16. */
  size?: number
  /** 1:1 aspect via flag-icons `.fis` modifier. */
  square?: boolean
  /** Rounded corners. Default true. */
  rounded?: boolean
}

/** Country flag rendered via `flag-icons` CSS sprites. Renders identically
 *  across platforms — emoji flags break on Windows (shown as ISO codes). */
function Flag({
  iso,
  size = 16,
  square = false,
  rounded = true,
  className,
  style,
  "aria-label": ariaLabel,
  ...props
}: FlagProps) {
  const code = iso.toLowerCase()
  return (
    <span
      role="img"
      aria-label={ariaLabel ?? code.toUpperCase()}
      className={cn(
        "fi",
        `fi-${code}`,
        square && "fis",
        rounded && "rounded-xs",
        "inline-block align-middle flex-none [background-size:cover] [background-position:center]",
        className
      )}
      style={{ fontSize: size, lineHeight: 1, ...style }}
      {...props}
    />
  )
}

export { Flag }
