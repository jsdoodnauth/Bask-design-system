import * as React from "react"
import {
  Globe, Users, BarChart3, Database,
  Settings, CreditCard, LineChart, Contact, ShoppingBag,
  Bell, Mail, ShoppingCart, Languages,
  Wallet, FolderKanban,
  GitPullRequest, MessageSquare, UserPlus, AlertTriangle,
} from "lucide-react"

import { BrandIcon } from "@/components/ui/brand-icon"

import {
  Sidebar, SidebarBrand, SidebarSection, SidebarSectionLabel,
  NavItem, NavItemGroup, SidebarFooter, SidebarCollapseToggle, UserPill,
  SidebarSearch, SidebarDivider,
} from "@/components/ui/sidebar"
import { MobileNav } from "@/components/ui/mobile-nav"
import { ThemePicker } from "@/components/ui/theme-picker"
import {
  TopNav, TopNavSearch, TopNavMega, TopNavMegaSection, TopNavMegaItem,
  TopNavSpacer, TopNavActions, TopNavIconButton,
} from "@/components/ui/top-nav"
import {
  NotificationFlyout, NotificationItem,
} from "@/components/ui/notification-flyout"
import { InboxFlyout, InboxThread } from "@/components/ui/inbox-flyout"
import { CartFlyout, CartLine } from "@/components/ui/cart-flyout"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { QuickThemeToggle } from "@/components/ui/quick-theme-toggle"
import {
  DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ToastProvider, Toaster } from "@/components/ui/toast"

function NavContents() {
  return (
    <>
      <SidebarBrand>Bask</SidebarBrand>
      <SidebarSearch placeholder="Filter nav…" />
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
      <SidebarDivider />
      <SidebarSection>
        <SidebarSectionLabel>Workspace</SidebarSectionLabel>
        <NavItem href="/sites" icon={<Globe size={14} />} count={4}>Sites</NavItem>
        <NavItem href="/customers" icon={<Users size={14} />} count={248}>Customers</NavItem>
        <NavItem href="/analytics" icon={<BarChart3 size={14} />}>Analytics</NavItem>
        <NavItem href="/backups" icon={<Database size={14} />}>Backups</NavItem>
      </SidebarSection>
      <SidebarDivider />
      <SidebarSection>
        <SidebarSectionLabel>Account</SidebarSectionLabel>
        <NavItem href="/settings" icon={<Settings size={14} />}>Settings</NavItem>
        <NavItem href="/billing" icon={<CreditCard size={14} />}>Billing</NavItem>
      </SidebarSection>
      <SidebarFooter>
        <ThemePicker className="mb-2" />
        <SidebarCollapseToggle />
      </SidebarFooter>
    </>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
    <div className="min-h-screen flex gap-3 p-3">
      {/* Floating sidebar — sticky full-height, rounded corners, margin all around */}
      <Sidebar
        collapsible
        className="max-[880px]:hidden flex-none sticky top-3 self-start max-h-[calc(100vh-1.5rem)] overflow-y-auto"
      >
        <NavContents />
      </Sidebar>

      <div className="flex flex-col flex-1 min-w-0 gap-3">
        {/* Floating top-nav pill */}
        <TopNav>
          <MobileNav className="min-[880px]:hidden -ml-1">
            <NavContents />
          </MobileNav>
          <TopNavSearch />
          <TopNavMega label="Apps">
            <TopNavMegaSection title="Dashboards">
              <TopNavMegaItem
                href="/dashboards/analytics"
                icon={<LineChart size={14} />}
                tint="blue"
                title="Analytics"
                description="Traffic + behavior"
              />
              <TopNavMegaItem
                href="/dashboards/crm"
                icon={<Contact size={14} />}
                tint="violet"
                title="CRM"
                description="Pipeline + leads"
              />
              <TopNavMegaItem
                href="/dashboards/ecommerce"
                icon={<ShoppingBag size={14} />}
                tint="amber"
                title="eCommerce"
                description="Orders + revenue"
              />
              <TopNavMegaItem
                href="/dashboards/finance"
                icon={<Wallet size={14} />}
                tint="green"
                title="Finance"
                description="Cash flow"
              />
              <TopNavMegaItem
                href="/dashboards/projects"
                icon={<FolderKanban size={14} />}
                tint="orange"
                title="Projects"
                description="Delivery + tasks"
              />
            </TopNavMegaSection>
            <TopNavMegaSection title="Workspace">
              <TopNavMegaItem
                href="/sites"
                icon={<Globe size={14} />}
                title="Sites"
                description="4 active"
              />
              <TopNavMegaItem
                href="/customers"
                icon={<Users size={14} />}
                title="Customers"
                description="248 records"
              />
              <TopNavMegaItem
                href="/backups"
                icon={<Database size={14} />}
                title="Backups"
                description="Last 24h"
              />
            </TopNavMegaSection>
          </TopNavMega>
          <TopNavSpacer />
          <TopNavActions>
            <CartFlyout
              subtotal="$248.40"
              checkoutHref="/checkout"
              meta="Free shipping on orders over $250."
              trigger={
                <TopNavIconButton label="Cart" count={3} dotTint="amber">
                  <ShoppingCart size={16} />
                </TopNavIconButton>
              }
            >
              <CartLine
                title="Linen apron — natural"
                variant="One size"
                price="$48.00"
                quantity={1}
              />
              <CartLine
                title="Ceramic pour-over kit"
                variant="500ml · matte black"
                price="$96.00"
                quantity={1}
              />
              <CartLine
                title="Heritage tea blend (×2)"
                variant="Smoked oolong"
                price="$52.20"
                quantity={2}
              />
            </CartFlyout>
            <InboxFlyout
              badge={12}
              viewAllHref="/inbox"
              trigger={
                <TopNavIconButton label="Inbox" count={12} dotTint="blue">
                  <Mail size={16} />
                </TopNavIconButton>
              }
            >
              <InboxThread
                unread
                initials="AM"
                avatarColor="blue"
                from="Aria Mensah"
                subject="Re: Q3 forecast — pricing changes"
                preview="Penciling the new tiered SKUs into the projections. One open question on enterprise…"
                time="4m"
                count={5}
              />
              <InboxThread
                unread
                initials="LD"
                avatarColor="violet"
                from="Léa Doré"
                subject="Design review — bullet bar chart"
                preview="Looks great overall. Two minor notes on the value tail spacing in dense rows."
                time="32m"
                count={3}
              />
              <InboxThread
                initials="DV"
                avatarColor="green"
                from="Devon Vasquez"
                subject="Welcome to the workspace"
                preview="Hey team — quick intro: I'll be picking up the Projects dashboard work starting Mon."
                time="Yesterday"
              />
            </InboxFlyout>
            <NotificationFlyout
              badge={4}
              viewAllHref="/notifications"
              trigger={
                <TopNavIconButton label="Notifications" dotTint="red">
                  <Bell size={16} />
                </TopNavIconButton>
              }
            >
              <NotificationItem
                unread
                icon={<GitPullRequest size={14} className="text-blue" />}
                title="Sarah opened PR #482"
                body={`"feat: add bullet bar chart variant" — ready for review.`}
                time="2 min ago"
              />
              <NotificationItem
                unread
                icon={<MessageSquare size={14} className="text-violet" />}
                title="3 new comments on Analytics dashboard"
                body="Aria, Léa and 1 other replied to your thread."
                time="14 min ago"
              />
              <NotificationItem
                unread
                icon={<UserPlus size={14} className="text-green" />}
                title="Devon Pratt joined the workspace"
                body="Invited by you on May 18."
                time="1 hr ago"
              />
              <NotificationItem
                icon={<AlertTriangle size={14} className="text-amber" />}
                title="Backup ran with warnings"
                body="2 files skipped — open the run log for details."
                time="Yesterday"
              />
            </NotificationFlyout>
            <TopNavIconButton label="GitHub">
              <BrandIcon slug="github" size={16} colored={false} />
            </TopNavIconButton>
            <LanguageSwitcher
              value="en-US"
              options={[
                { code: "en-US", label: "English (US)", iso: "us" },
                { code: "en-GB", label: "English (UK)", iso: "gb" },
                { code: "fr-FR", label: "Français",     iso: "fr" },
                { code: "de-DE", label: "Deutsch",      iso: "de" },
                { code: "es-ES", label: "Español",      iso: "es" },
                { code: "ja-JP", label: "日本語",         iso: "jp" },
              ]}
              trigger={
                <TopNavIconButton label="Language">
                  <Languages size={16} />
                </TopNavIconButton>
              }
            />
          </TopNavActions>
          <div className="mx-1 h-6 w-px bg-[color:var(--hairline)]" aria-hidden />
          <UserPill
            name="David Devi"
            role="Admin Head"
            initials="DD"
            color="violet"
            compact
          >
            <QuickThemeToggle />
            <DropdownMenuSeparator />
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
    <Toaster />
    </ToastProvider>
  )
}
