import * as React from "react"
import {
  Globe, Users, BarChart3, Database,
  Settings, CreditCard, LineChart, Contact, ShoppingBag,
  Bell, Mail, ShoppingCart, Languages,
  Wallet, FolderKanban,
} from "lucide-react"

import { BrandIcon } from "@/components/ui/brand-icon"

import {
  Sidebar, SidebarBrand, SidebarSection, SidebarSectionLabel,
  NavItem, NavItemGroup, SidebarFooter, UserPill,
} from "@/components/ui/sidebar"
import { MobileNav } from "@/components/ui/mobile-nav"
import { ThemePicker } from "@/components/ui/theme-picker"
import {
  TopNav, TopNavSearch, TopNavMega, TopNavSpacer,
  TopNavActions, TopNavIconButton,
} from "@/components/ui/top-nav"
import {
  DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

function NavContents() {
  return (
    <>
      <SidebarBrand>Bask</SidebarBrand>
      <SidebarSection>
        <SidebarSectionLabel>Dashboards</SidebarSectionLabel>
        <NavItemGroup
          label="Dashboards"
          basePath="/dashboards"
          icon={<BarChart3 size={14} />}
        >
          <NavItem href="/dashboards/analytics" icon={<LineChart size={14} />}>Analytics</NavItem>
          <NavItem href="/dashboards/crm" icon={<Contact size={14} />}>CRM</NavItem>
          <NavItem href="/dashboards/ecommerce" icon={<ShoppingBag size={14} />}>eCommerce</NavItem>
          <NavItem href="/dashboards/finance" icon={<Wallet size={14} />}>Finance</NavItem>
          <NavItem href="/dashboards/projects" icon={<FolderKanban size={14} />}>Projects</NavItem>
        </NavItemGroup>
      </SidebarSection>
      <SidebarSection>
        <SidebarSectionLabel>Workspace</SidebarSectionLabel>
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
        <ThemePicker className="mb-2" />
      </SidebarFooter>
    </>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex gap-3 p-3">
      {/* Floating sidebar — sticky full-height, rounded corners, margin all around */}
      <Sidebar className="max-[880px]:hidden w-[240px] flex-none sticky top-3 self-start max-h-[calc(100vh-1.5rem)] overflow-y-auto">
        <NavContents />
      </Sidebar>

      <div className="flex flex-col flex-1 min-w-0 gap-3">
        {/* Floating top-nav pill */}
        <TopNav>
          <MobileNav className="min-[880px]:hidden -ml-1">
            <NavContents />
          </MobileNav>
          <TopNavSearch />
          <TopNavMega>Mega menu</TopNavMega>
          <TopNavSpacer />
          <TopNavActions>
            <TopNavIconButton label="Cart" count={3} dotTint="amber">
              <ShoppingCart size={16} />
            </TopNavIconButton>
            <TopNavIconButton label="Inbox" count={12} dotTint="blue">
              <Mail size={16} />
            </TopNavIconButton>
            <TopNavIconButton label="Notifications" dotTint="red">
              <Bell size={16} />
            </TopNavIconButton>
            <TopNavIconButton label="GitHub">
              <BrandIcon slug="github" size={16} colored={false} />
            </TopNavIconButton>
            <TopNavIconButton label="Language">
              <Languages size={16} />
            </TopNavIconButton>
          </TopNavActions>
          <div className="mx-1 h-6 w-px bg-[color:var(--hairline)]" aria-hidden />
          <UserPill
            name="David Devi"
            role="Admin Head"
            initials="DD"
            color="violet"
            compact
          >
            <DropdownMenuItem>Account settings</DropdownMenuItem>
            <DropdownMenuItem>Switch workspace</DropdownMenuItem>
            <DropdownMenuItem>Upgrade plan</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
          </UserPill>
        </TopNav>

        <main className="flex flex-col gap-[18px] min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
