import { Avatar } from "@/components/ui/avatar"

const COLORS = ["blue", "green", "violet", "amber", "red", "brown"] as const

function nameToInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function nameToColor(name: string): typeof COLORS[number] {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = ((hash * 31) + name.charCodeAt(i)) >>> 0
  return COLORS[hash % COLORS.length]
}

interface AvatarInitialsProps {
  name: string
  size?: "sm" | "default" | "lg"
  className?: string
}

function AvatarInitials({ name, size, className }: AvatarInitialsProps) {
  return (
    <Avatar color={nameToColor(name)} size={size} className={className} aria-label={name}>
      <span aria-hidden="true">{nameToInitials(name)}</span>
    </Avatar>
  )
}

export { AvatarInitials, nameToInitials, nameToColor }
