"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs";
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Mail, User, Calendar, ArrowUpRight, SquareUser, Lock, Shield, BrushCleaning } from "lucide-react"
import { useTranslations } from "next-intl"
import { signOut } from "next-auth/react"
import { useAuthStore } from "@/store/useAuthStore";
import { apiClient } from "@/lib/fetchApi";
import { useRouter } from "@/i18n/navigation";
import UpdatePassword from "@/components/UpdatePassword";

export default function UserInfoPage() {
    const { user } = useAuthStore()
    const router = useRouter()
    const t = useTranslations("User.Info")
    const [subs, setSubs] = useState<Subscription[]>([])
    const [activeSubs, setActiveSubs] = useState<Subscription>()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const getSubs = async () => {
        try {
            const result = await apiClient.post<Subscription[]>('/subs/history')
            if (result.code === 0) {
                setActiveSubs(result.data.find(item => item.status === "active"));
                setSubs(result.data.filter(item => item.status === "pending"));
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    const signOutNow = async () => {
        await signOut({redirect: false})
         const language = localStorage.getItem('language') || 
                document.documentElement.lang || 
                'en';
        window.location.href = language == 'en' ? '/' : `/${language}`;
    }
    useEffect(() => {
        getSubs();
    }, []);

    return (
        <div className="text-white">
            <h1 className="text-2xl font-semibold tracking-tight mb-4 text-white flex items-center">
                <SquareUser className="w-6 h-6 mr-2" />
                {t('i1')}
            </h1>
            <Card className="bg-zinc-900/70 border-zinc-800 shadow-[0_0_8px_rgba(255,255,255,0.05)]">
                <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700">
                    <User className="w-8 h-8 text-zinc-400" />
                </div>
                <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                    {user?.userName}
                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                        {user?.uid}
                    </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1 text-zinc-400">
                    <Mail className="w-4 h-4" />
                    {user?.email}
                    </CardDescription>
                    {/* <CardDescription className="flex items-center gap-2 mt-1 text-zinc-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    {t('i2')} {user?.uid}
                    </CardDescription> */}
                </div>
                </CardHeader>
                <Separator className="bg-zinc-800" />
                
                {loading ? <LoadingSkeleton />: 
                activeSubs? 
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {/* {t('i3')} */}
                        {activeSubs?.productName}
                        <Badge variant="secondary" className="bg-green-600/30 text-green-400 border-green-700">
                        {activeSubs?.status}
                        </Badge>
                    </CardTitle>
                    <CardDescription>{t('i4')}</CardDescription>
                    <div className="flex justify-between items-center">
                        <div>
                        <p className="text-zinc-500 text-sm flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" /> 
                            {t('i5')}: 
                            {activeSubs?.endAt && dayjs(activeSubs?.endAt*1000).format("YYYY-MM-DD HH:mm:ss")}
                        </p>
                        </div>
                        <div className="flex gap-3">
                        <Button variant="default" className="bg-purple-600 hover:bg-purple-700"
                            onClick={()=> router.push('/user/subscription')}>
                            <ArrowUpRight className="w-4 h-4 mr-1" /> {t('i6')}
                        </Button>
                        </div>
                    </div>
                </CardHeader> :
                <EmptyProcessStrategy t={t} jumpFun={()=>router.push('/user/strategic')} />
                }
                <CardContent className="space-y-4">
                    <Separator className="bg-zinc-800" />
                    <div className="flex">
                        {subs.map(el => <Card className="w-55 overflow-hidden bg-[url('/img/card.png')] bg-cover bg-center border border-green-800 relative mr-2" key={el?.id}>
                            
                            <CardHeader>
                            <CardTitle className="flex items-center">
                                <span className="text-white text-2xl">{el?.productName}</span>
                                <Badge variant="secondary" className="absolute right-1 top-1 px-2 py-1 bg-black text-white">
                                {el?.status}
                                </Badge>
                            </CardTitle>
                            <p className="text-white flex items-end mt-1">
                               <span className="text-4xl font-bold mr-4">${el?.price}</span>
                               <span className="text-2xl">{el?.duration}/{el?.type}</span>
                             </p>
                            </CardHeader>
                        </Card>)}
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-zinc-400 mb-4">{t('i7')}</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setOpen(true)}>
                                <Lock className="w-4 h-4 mr-1" /> {t('i8')}
                            </Button>
                            {/* <Button className="bg-purple-600 hover:bg-purple-700">
                                <Shield className="w-4 h-4 mr-1" /> {t('i9')}
                            </Button> */}
                            <Button variant="destructive"
                             onClick={signOutNow}>
                                <Shield className="w-4 h-4 mr-1" /> {t('i11')}
                            </Button>
                            {/* <Button variant="destructive">{t('i10')}</Button> */}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <UpdatePassword open={open} onOpenChange={setOpen} />
        </div>
    )
}

function LoadingSkeleton() {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow p-4">
        <Skeleton className="h-6 w-1/4 mb-2 bg-neutral-800" />
        <Skeleton className="h-6 w-1/4 mb-4 bg-neutral-800" />
        <div className="flex justify-between">
          <Skeleton className="h-6 w-2/3 bg-neutral-800" />
          <Skeleton className="h-6 w-20 bg-neutral-800" />
        </div>
      </div>
    )
}  


function EmptyProcessStrategy({t, jumpFun}:{t: any, jumpFun:() => void}) {
  return (
    <Empty>
      <EmptyHeader className="max-w-md">
        <EmptyMedia variant="icon">
          <BrushCleaning />
        </EmptyMedia>
        <EmptyTitle className="text-white">{t('e1')}</EmptyTitle>
        <EmptyDescription>
          {t('e2')}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button variant="default" className="bg-purple-600 hover:bg-purple-700"
          onClick={jumpFun}>{t('e3')}</Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}