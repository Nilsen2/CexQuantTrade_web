"use client";

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bell,
  LineChart,
  KeyRound,
  Megaphone,
  SquareUser,
  History
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useStrategyStore } from "@/store/useStrategy";
import { useEffect } from "react";

export default function PersonalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const {getActiveStrategy, getStrategies} = useStrategyStore();

  const t = useTranslations("User");
  const menuItems = [
    { name: t("Menu.Dashboard"), href: "/user/dashboard", icon: LayoutDashboard },
    { name: t("Menu.Profile"), href: "/user/info", icon: SquareUser },
    { name: t("Menu.Subscriptions"), href: "/user/subscription", icon: Bell },
    { name: t("Menu.Strategy Market"), href: "/user/strategic", icon: LineChart },
    { name: t("Menu.API Tokens"), href: "/user/api-token", icon: KeyRound },
    { name: t("Subscriptions.s2"), href: "/user/bill-history", icon: History },
    { name: t("Menu.Notifications"), href: "/user/notifications", icon: Megaphone },
  ]

  useEffect(() => {
        getActiveStrategy();
        getStrategies();
    }, []);
  return (
    <div className="container mx-auto flex h-full gap-6 px-4 py-10 min-h-[600px]">
      <Card className="hidden md:flex  w-54 p-4 bg-zinc-900/60 backdrop-blur-md border-r border-zinc-800">
        <nav className="space-y-2 font-medium">
          {menuItems.map((item) => {
            const isActive = pathname.indexOf(item.href) > -1;
            const Icon = item.icon;
            return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex justify-start items-center rounded-lg px-3 py-3 text-base transition-all duration-200",
                    isActive
                    ? "bg-zinc-800/80 text-white"
                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              )
          })}
        </nav>
      </Card>

      <Card className="flex-1 bg-zinc-700/40 backdrop-blur-md border-r border-zinc-800 p-6">
        {children}
      </Card>
    </div>
  )
}
