"use client"

import * as React from "react"
import {
  SiGoogle,
  SiGooglechrome,
  SiInstagram,
  SiDribbble,
  SiMessenger,
  SiMeta,
  SiTelegram,
  SiX,
  SiWhatsapp,
  SiSnapchat,
  SiFirefox,
  SiSafari,
  SiBrave,
  SiOpera,
  SiTorbrowser,
  SiGithub,
} from "@icons-pack/react-simple-icons"

import { cn } from "@/lib/utils"

type IconComponent = React.ForwardRefExoticComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string
    color?: string
    size?: string | number
  } & React.RefAttributes<SVGSVGElement>
>

/** Curated slug map. Add entries here as new brand icons are needed. */
const BRAND_ICONS = {
  google:      { Icon: SiGoogle,        label: "Google"      },
  chrome:      { Icon: SiGooglechrome,  label: "Chrome"      },
  instagram:   { Icon: SiInstagram,     label: "Instagram"   },
  dribbble:    { Icon: SiDribbble,      label: "Dribbble"    },
  messenger:   { Icon: SiMessenger,     label: "Messenger"   },
  meta:        { Icon: SiMeta,          label: "Meta"        },
  telegram:    { Icon: SiTelegram,      label: "Telegram"    },
  x:           { Icon: SiX,             label: "X"           },
  whatsapp:    { Icon: SiWhatsapp,      label: "WhatsApp"    },
  snapchat:    { Icon: SiSnapchat,      label: "Snapchat"    },
  firefox:     { Icon: SiFirefox,       label: "Firefox"     },
  safari:      { Icon: SiSafari,        label: "Safari"      },
  brave:       { Icon: SiBrave,         label: "Brave"       },
  opera:       { Icon: SiOpera,         label: "Opera"       },
  tor:         { Icon: SiTorbrowser,    label: "Tor"         },
  github:      { Icon: SiGithub,        label: "GitHub"      },
} as const satisfies Record<string, { Icon: IconComponent; label: string }>

export type BrandSlug = keyof typeof BRAND_ICONS

interface BrandIconProps extends Omit<React.SVGProps<SVGSVGElement>, "color" | "title"> {
  slug: BrandSlug
  size?: number
  /** `true` (default) uses the brand's official hex. `false` uses currentColor. */
  colored?: boolean
  /** Explicit color override. Wins over `colored`. */
  color?: string
  /** Accessible title (also used as default tooltip). */
  title?: string
}

function BrandIcon({
  slug,
  size = 16,
  colored = true,
  color,
  title,
  className,
  ...props
}: BrandIconProps) {
  const entry = BRAND_ICONS[slug]
  if (!entry) return null
  const { Icon, label } = entry
  return (
    <Icon
      title={title ?? label}
      size={size}
      color={color ?? (colored ? "default" : "currentColor")}
      className={cn("inline-block", className)}
      {...props}
    />
  )
}

/** Type guard so callers can `if (isBrandSlug(s))` before passing. */
function isBrandSlug(s: string): s is BrandSlug {
  return s in BRAND_ICONS
}

export { BrandIcon, isBrandSlug, BRAND_ICONS }
