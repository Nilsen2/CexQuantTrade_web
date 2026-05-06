"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Mail, Zap, AlertTriangle } from "lucide-react"
import { useTranslations } from "next-intl"

export default function NotificationSettings() {

  const t = useTranslations("User.Notification");

  const [settings, setSettings] = useState({
    tradingAlerts: true,
    subscriptionExpiry: true,
    systemUpdates: false,
    marketingEmails: false,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-[80vh] md:p-6 text-zinc-100 space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
        <Bell className="w-6 h-6 text-blue-400" />
        {t('n1')}
      </h1>

      <Card className="bg-zinc-900/70 border-zinc-800 shadow-[0_0_8px_rgba(255,255,255,0.05)]">
        <CardHeader>
          <CardTitle>{t('n2')}</CardTitle>
          <CardDescription className="text-zinc-400">
          {t('n3')}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Trading Alerts */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <div>
                <Label className="text-zinc-200">{t('n4')}</Label>
                <p className="text-sm text-zinc-400">
                {t('n5')}
                </p>
              </div>
            </div>
            <Switch
              checked={settings.tradingAlerts}
              className="data-[state=checked]:bg-purple-600"
              onCheckedChange={() => handleToggle("tradingAlerts")}
            />
          </div>

          {/* Subscription Expiry */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <div>
                <Label className="text-zinc-200">{t('n6')}</Label>
                <p className="text-sm text-zinc-400">
                {t('n7')}
                </p>
              </div>
            </div>
            <Switch
              checked={settings.subscriptionExpiry}
              className="data-[state=checked]:bg-purple-600"
              onCheckedChange={() => handleToggle("subscriptionExpiry")}
            />
          </div>

          {/* System Updates */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-green-400" />
              <div>
                <Label className="text-zinc-200">{t('n8')}</Label>
                <p className="text-sm text-zinc-400">
                {t('n9')}
                </p>
              </div>
            </div>
            <Switch
              checked={settings.systemUpdates}
              className="data-[state=checked]:bg-purple-600"
              onCheckedChange={() => handleToggle("systemUpdates")}
            />
          </div>

          {/* Marketing Emails */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-pink-400" />
              <div>
                <Label className="text-zinc-200">{t('n10')}</Label>
                <p className="text-sm text-zinc-400">
                {t('n11')}
                </p>
              </div>
            </div>
            <Switch
              checked={settings.marketingEmails}
              className="data-[state=checked]:bg-purple-600"
              onCheckedChange={() => handleToggle("marketingEmails")}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
