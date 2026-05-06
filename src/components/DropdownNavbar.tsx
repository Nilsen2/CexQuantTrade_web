
import {
  LayoutDashboard,
  Bell,
  LineChart,
  KeyRound,
  Megaphone,
  SquareUser,
  History
} from "lucide-react";
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { useTranslations } from "next-intl";

export default function DropdownNavbar() {
    const t = useTranslations("User");
    const pathname = usePathname();
    const menuItems = [
        { name: t("Menu.Dashboard"), href: "/user/dashboard", icon: LayoutDashboard },
        { name: t("Menu.Profile"), href: "/user/info", icon: SquareUser },
        { name: t("Menu.Subscriptions"), href: "/user/subscription", icon: Bell },
        { name: t("Menu.Strategy Market"), href: "/user/strategic", icon: LineChart },
        { name: t("Menu.API Tokens"), href: "/user/api-token", icon: KeyRound },
        { name: t("Subscriptions.s2"), href: "/user/bill-history", icon: History },
        { name: t("Menu.Notifications"), href: "/user/notifications", icon: Megaphone },
    ]
    return (
    <div className="ml-2 md:hidden block">
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="p-2 rounded-full hover:bg-zinc-800 bg-zinc-800 transition cursor-pointer">
          <User className="w-5 h-5 text-purple-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-900 text-white border border-zinc-700 px-2">
        {menuItems.map((item) => {
            const isActive = pathname.indexOf(item.href) > -1;
            const Icon = item.icon;
            return (
                <DropdownMenuItem key={item.href} asChild>
                <Link
                    href={item.href}
                    className={cn(
                    "w-full flex justify-start font-medium items-center rounded-lg my-2 px-2 py-2 text-base transition-all duration-200",
                    isActive
                    ? "bg-zinc-800/80 text-white"
                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
                    )}
                >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                </Link>
                </DropdownMenuItem>
            )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
    )
}