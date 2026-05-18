import * as React from "react"
import {
  Home as HomeIcon, Globe, Users, BarChart3, Database,
  Settings, CreditCard,
} from "lucide-react"

import {
  Sidebar, SidebarBrand, SidebarSection, SidebarSectionLabel,
  NavItem, SidebarFooter, UserPill,
} from "@/components/ui/sidebar"
import { AppShell, AppMain } from "@/components/ui/app-shell"
import { MobileNav } from "@/components/ui/mobile-nav"
import { ThemePicker } from "@/components/ui/theme-picker"
import {
  DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

/** Nav contents — rendered both in the desktop Sidebar and inside the mobile
 *  Sheet. Two separate React subtrees so each instance owns its own state
 *  (e.g. UserPill's tilt registration). */
function NavContents() {
  return (
    <>
      <SidebarBrand>Bask</SidebarBrand>
      <SidebarSection>
        <SidebarSectionLabel>Workspace</SidebarSectionLabel>
        <NavItem href="/" icon={<HomeIcon size={14} />}>Dashboard</NavItem>
        <NavItem href="/sites" icon={<Globe size={14} />} count={4}>Sites</NavItem>
        <NavItem href="/customers" icon={<Users size={14} />} count={248}>Customers</NavItem>
        <NavItem href="/analytics" icon={<BarChart3 size={14} />}>Analytics</NavItem>
        <NavItem href="/backups" icon={<Database size={14} />}>Backups</NavItem>
      </SidebarSection>
      <SidebarSection>
        <SidebarSectionLabel>Account</SidebarSectionLabel>
        <NavItem href="/settings" icon={<Settings size={14} />}>Settings</NavItem>
        <NavItem href="/billing" icon={<CreditCard size={14} />}>Billing</NavItem>
      </SidebarSection>
      <SidebarFooter>
        <ThemePicker className="mb-3" />
        <UserPill name="Joshua D." role="Owner · Free plan" initials="JD" color="violet">
          <DropdownMenuItem>Account settings</DropdownMenuItem>
          <DropdownMenuItem>Switch workspace</DropdownMenuItem>
          <DropdownMenuItem>Upgrade plan</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
        </UserPill>
      </SidebarFooter>
    </>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 32px 96px" }}>
      <AppShell>
        <Sidebar className="max-[880px]:hidden">
          <NavContents />
        </Sidebar>

        <AppMain>
          <MobileNav className="min-[880px]:hidden">
            <NavContents />
          </MobileNav>
          {children}
        </AppMain>
      </AppShell>
    </div>
  )
}
