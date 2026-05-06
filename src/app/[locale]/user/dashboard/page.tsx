"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StrategyLineChart from "@/components/StrategyLineChart";
import { Skeleton } from "@/components/ui/skeleton"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Play,
  Pause,
  RefreshCw,
  TrendingUp,
  Receipt,
  Timer,
  LayoutDashboard,
  Sigma,
  BrushCleaning
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useStrategyStore } from "@/store/useStrategy";
import { getAccumulatedDays } from "@/lib/utils";
import { useRouter } from "@/i18n/navigation";
import { companyConfig } from "@/lib/company-config"
import AlertConfirm from "@/components/AlertConfirm";
import { apiClient } from "@/lib/fetchApi";

export default function DashboardPage() {
  const t = useTranslations();
  const router = useRouter();
  const { strategies, subStrategy, loading, getActiveStrategy } = useStrategyStore()

  const [activeStrategy, setActiveStrategy] = useState<Strategy | null>(null)

  useEffect(() => {
    if (!strategies || !subStrategy) {
      setActiveStrategy(null)
      return
    }

    const found = strategies.find(
      (s) => s.id === subStrategy.strategyId
    ) || null

    setActiveStrategy(found)
  }, [strategies, subStrategy])
  const [isRunning, setIsRunning] = useState(true);

  const [showTipDialog, setShowTipDialog] = useState(false)

  const actionStrategy = async (action: number) => {
      try {
      const result = await apiClient.post('/strategy/action', {id: activeStrategy?.id, exchangeId: activeStrategy?.exchanges[0], action})
      if (result.code === 0) {
        getActiveStrategy();
      }
    } catch (error) {
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight mb-4 text-white flex items-center">
        <LayoutDashboard className="w-6 h-6 mr-2" />
        {t('User.Menu.Dashboard')}
      </h1>
      {
        loading ? <LoadingSkeleton /> :
        activeStrategy ?
        <Card className="bg-zinc-900/70 border-zinc-800 shadow-[0_0_8px_rgba(255,255,255,0.05)]">
          <CardHeader>
            <CardTitle className="md:flex items-center justify-between gap-2 text-white">
              <div>
                {activeStrategy.leverage == 0 ? <Badge className=" bg-green-600/30 text-green-400 border-green-700 mr-1" variant="secondary">{t('Product.spot')}</Badge> : <Badge className=" bg-yellow-600/30 text-yellow-400 border-yellow-700 mr-1" variant="secondary">{t('Product.futures')}</Badge>}
                <span className="mr-2">{activeStrategy.name}</span>
                <Badge
                  variant="secondary"
                  className="bg-blue-600/20 text-green-400 border-green-700"
                >
                  {t('Product.Active')}
                   <span className="relative flex h-2 w-2 ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 md:my-0 my-4">
                {isRunning ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-600/40"
                    onClick={() => setShowTipDialog(true)}
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    {t('Product.Pause')}
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-600/40"
                    onClick={() => actionStrategy(1)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {t('Product.Start')}
                  </Button>
                )}

                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-zinc-800/70 text-zinc-300 hover:bg-zinc-700 border-zinc-700"
                  onClick={()=> router.push('/user/strategic')}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t('Product.Switch Strategy')}
                </Button>

                {/* <Button
                  variant="secondary"
                  className="bg-zinc-800/70 text-zinc-300 hover:bg-zinc-700 border-zinc-700"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  {t('Product.Switch AI Agent')}
                </Button>
                <Button
                  variant="secondary"
                  className="bg-zinc-800/70 text-zinc-300 hover:bg-zinc-700 border-zinc-700"
                >
                  <Spade className="w-4 h-4 mr-2" />
                  {t('Product.Switch CEX')}
                </Button> */}
              </div>
            </CardTitle>
            <CardDescription className="text-zinc-400">
              {activeStrategy.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* 策略指标 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-zinc-300 mb-6">
              <div className="bg-zinc-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Sigma className="w-4 h-4" />
                  {t('Product.Token')}
                </div>
                <p className="text-lg font-semibold text-green-400 mt-1">
                  {activeStrategy?.token}
                </p>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-zinc-400">
                  <TrendingUp className="w-4 h-4" />
                  
                  {t('Product.Leverage')}
                </div>
                <p className="text-lg font-semibold text-green-400 mt-1">
                  {activeStrategy?.leverage}x
                </p>
              </div>

              <div className="bg-zinc-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Receipt className="w-4 h-4" />
                  {t('Product.Max USDT')}
                </div>
                  <p className="text-lg font-semibold mt-1">
                   {activeStrategy?.max_usdt}
                  </p>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Timer className="w-4 h-4" />
                  
                  {t('Product.Timeframe')}
                </div>
                <p className="text-lg font-semibold text-red-400 mt-1">
                  {activeStrategy.timeframe}
                </p>
              </div>
            </div>
            {/* 折线图 */}
            <div className="w-full">
               
              {/* <StrategyLineChart data={activeStrategy.data} /> */}
            </div>
          </CardContent>
        </Card>:
        <Card className="bg-zinc-900/70 border-zinc-800 shadow-[0_0_8px_rgba(255,255,255,0.05)]">
          <EmptyProcessStrategy t={t} jumpFun={()=>router.push('/user/strategic')} />
        </Card>
      }
      <AlertConfirm 
        title={t('Product.Warining')}
        description={t('Product.CloseByself')}
        visible={showTipDialog}
        onCancel={()=>setShowTipDialog(false)}
        onConfirm={()=>{
          setShowTipDialog(false)
          actionStrategy(2)
        }}
      />
    </div>
  );
}

function LoadingSkeleton() {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow p-4">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-1/4 mb-4 bg-neutral-800" />
          <div className="flex justify-between">
            <Skeleton className="h-6 w-20 bg-neutral-800 mr-2" />
            <Skeleton className="h-6 w-20 bg-neutral-800" />
          </div>
        </div>
        <Skeleton className="h-6 w-2/3 bg-neutral-800 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-zinc-300 mb-6">
          <Skeleton className="bg-zinc-800/50 h-20 rounded-lg p-3 bg-neutral-800" />
          <Skeleton className="bg-zinc-800/50 h-20 rounded-lg p-3 bg-neutral-800" />
          <Skeleton className="bg-zinc-800/50 h-20 rounded-lg p-3 bg-neutral-800" />
          <Skeleton className="bg-zinc-800/50 h-20 rounded-lg p-3 bg-neutral-800" />
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
        <EmptyTitle className="text-white">{t('User.Dashboard.a1')}</EmptyTitle>
        <EmptyDescription>
          {t('User.Dashboard.a2')}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button variant="default" className="bg-purple-600 hover:bg-purple-700"
          onClick={jumpFun}>{t('User.Dashboard.a3')}</Button>
        </div>
      </EmptyContent>
       <EmptyDescription className="flex items-center">
        {t.rich('PubDesc.PrivatePlan',{
              purple: (chunks: React.ReactNode) => <a href={`mailto:${companyConfig.email}`} className="text-purple-600  hover:!text-purple-600 transition whitespace-nowrap">{chunks}</a>,
        })}
        </EmptyDescription>
    </Empty>
  )
}
