"use client";

import { User, LogIn } from "lucide-react";
import { useSelectedLayoutSegments } from "next/navigation";
import { Button } from "@/components/ui/button";
import { companyConfig } from "@/lib/company-config";
import LocaleSwitcherSelect from "@/components/LocaleSwitcherSelect";
import DropdownNavbar from "@/components/DropdownNavbar";
import { Link } from "@/i18n/navigation";
import {useTranslations} from 'next-intl';
import { Session } from "next-auth";
import { useAuthStore } from "@/store/useAuthStore";

interface NavbarProps {
  session: Session | null;
}
export default function Navbar({ session }: NavbarProps) {
  const isLoggedSsr = !!session?.user;
  const { isLogged } = useAuthStore()
  const hydratedIsLogged = isLoggedSsr || isLogged

  const segments = useSelectedLayoutSegments();
  const pathname = '/' + segments.join('/');
  const t = useTranslations('Navbar');

  const navLinks = [
    { href: "/", label: t("Home") },
    { href: "/forecast", label: t("BTC Forecast") },
    { href: "/#pricing", label: t("Pricing") },
    { href: "/#faq", label: t("FAQ") },
    { href: "/how-it-works", label: t("How It Works") },
  ];

  const hideHeaderRoutes = ['/login', '/signup']

  const hideHeader = hideHeaderRoutes.includes(pathname)

  if(hideHeader) return null;

  return (
    <nav className="border-b border-zinc-800/50 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold">
            {companyConfig.shortName}
          </div>
          <span className="hidden md:block font-bold text-xl text-white">{companyConfig.name}</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-base font-medium">
          
          {navLinks.map((link) => {
            
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-2 py-1 text-sm ${
                  isActive ? "text-purple-600" : "text-zinc-300 hover:text-purple-600"
                }`}
              >
                {link.label}
                {/* 下划线 */}
                <span
                  className={`
                    absolute left-0 bottom-0 h-[2px] bg-purple-600
                    transition-all duration-300 ease-in-out
                    ${isActive ? "w-full" : "w-0"}
                  `}
                />
              </Link>
            );
          })}
        </div>
        <div className="flex justify-center items-center">
          {
            hydratedIsLogged ? (
              <>
              <Link href="/user/info" className="flex items-center gap-2 md:flex hidden">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-500" />
                </div>
              </Link>
              <DropdownNavbar />
              </>
            ) : 
            <>
            <Link href="/signin">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <LogIn className="w-4 h-4" />
                {t("Sign In")}
              </Button>
            </Link>
            <Link href="/signup" className="ml-2">
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:text-purple-500 bg-transparent hover:border-purple-500 hover:bg-transparent">
                <User className="w-4 h-4" />
                {t("Sign Up")}
              </Button>
            </Link>
            </>
          }
          <LocaleSwitcherSelect />
        </div>
      </div>
    </nav>
  );
}


