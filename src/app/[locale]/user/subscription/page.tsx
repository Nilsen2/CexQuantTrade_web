"use client"

import { Card} from "@/components/ui/card"
import { Bell } from "lucide-react"
import Pricing from "@/components/Pricing";
import { useTranslations } from "next-intl";

export default function UserSubscriptionPage() {
    const t = useTranslations();
    return (
        <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-2 text-white flex items-center">
                <Bell className="w-6 h-6 mr-2" />
                {t('User.Menu.Subscriptions')}
            </h1>
            <h5 className="text-sm tracking-tight mb-4 text-zinc-300">{t('User.Subscriptions.s1')}</h5>
            <Card className="bg-zinc-900/70 border-zinc-800 shadow-[0_0_8px_rgba(255,255,255,0.05)] px-4">
                <div>
                    <Pricing/>
                </div>
            </Card>
        </div>
    )
}