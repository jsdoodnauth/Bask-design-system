"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { FieldRow } from "@/components/ui/field-row"
import {
  PageHeader, PageHeaderTitle, PageHeaderMeta,
} from "@/components/ui/app-shell"

export default function SettingsPage() {
  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle>Settings</PageHeaderTitle>
          <PageHeaderMeta>Workspace preferences and security</PageHeaderMeta>
        </div>
      </PageHeader>

      <Card>
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 18, maxWidth: 480 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Label htmlFor="s-name">Workspace name</Label>
                <Input id="s-name" defaultValue="Bloom Studio" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Label htmlFor="s-url">Public URL</Label>
                <Input id="s-url" defaultValue="bloom.bask.app" />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <Button variant="default">Cancel</Button>
                <Button variant="primary">Save changes</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <FieldRow label="Site downtime" hint="Immediate alerts when a site goes offline.">
              <Switch defaultChecked />
            </FieldRow>
            <FieldRow label="Weekly digest" hint="Friday summary of activity and risk.">
              <Switch defaultChecked />
            </FieldRow>
            <FieldRow label="Marketing email" hint="Product news, infrequent.">
              <Switch />
            </FieldRow>
            <FieldRow label="Deploy notifications" hint="Notify on every successful production deploy.">
              <Switch defaultChecked />
            </FieldRow>
          </TabsContent>

          <TabsContent value="security">
            <FieldRow label="Two-factor authentication" hint="Require a TOTP code on every login.">
              <Switch defaultChecked />
            </FieldRow>
            <FieldRow label="Single sign-on" hint="Connect SAML 2.0 or OpenID Connect identity providers.">
              <Switch />
            </FieldRow>
            <FieldRow label="Session timeout" hint="Auto sign-out after 30 minutes of inactivity.">
              <Switch defaultChecked />
            </FieldRow>
            <FieldRow label="API key rotation reminder" hint="Email every 90 days to rotate keys.">
              <Switch defaultChecked />
            </FieldRow>
          </TabsContent>
        </Tabs>
      </Card>
    </>
  )
}
