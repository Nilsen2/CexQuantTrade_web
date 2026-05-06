"use client"

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Play, Pause, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";
import { apiClient } from "@/lib/fetchApi";
import { useStrategyStore } from "@/store/useStrategy";
import { getAccumulatedDays } from "@/lib/utils";
import { useRouter } from "@/i18n/navigation";
import AlertConfirm from "@/components/AlertConfirm";
import constants from "@/lib/constants";

export default function StrategicPage() {
  const t = useTranslations();
  const router = useRouter();
  const [showApiDialog, setShowApiDialog] = useState(false)
  const [showTipDialog, setShowTipDialog] = useState(false)
  const { strategies, loading, activeId, getActiveStrategy } = useStrategyStore()
  const actionStrategy = async (st: Strategy) => {
    const action = st.id == activeId ? constants.STRATEGY_STOP : constants.STRATEGY_START
    try {
    const result = await apiClient.post(
      '/strategy/action',
      {id: st.id, exchangeId: st.exchanges[0], action}
    )
    if (result.code === 0) {
      if(result.data === constants.API_CONFIG_REQUIRED){
        setShowApiDialog(true)
      } else {
        getActiveStrategy()
        if(action === constants.STRATEGY_START){
          router.push(`/user/dashboard`)
        }
      }
    }
 
    } catch (error) {
    }
  }

  const stopStrategy = async () => {
    try {
    const result = await apiClient.post(
      '/strategy/action',
      {id: activeId, exchangeId: 1, action: constants.STRATEGY_STOP}
    )
    if (result.code === 0) {
      if(result.data === constants.API_CONFIG_REQUIRED){
        setShowApiDialog(true)
      } else {
        getActiveStrategy()
      }
    }
 
    } catch (error) {
    }
  }

    return (
        <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-4 text-white flex items-center">
                <LineChart className="w-6 h-6 mr-2" />
                {t('User.Menu.Strategy Market')}
            </h1>
            <h5 className="text-sm tracking-tight mb-4 text-zinc-300">{t('PubDesc.TSTB')}</h5>
            <section className="mb-12">
            {/* <h2 className="text-2xl font-semibold mb-6 text-white">{title}</h2> */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <StrategySkeleton key={i} />)
                : strategies?.map((s) => <StrategyCard key={s.id} isRunning={s.id == activeId} strategy={s} actionStrategy={actionStrategy} setShowTipDialog={setShowTipDialog}  />)}
            </div>
          </section>
          <AlertConfirm 
            title={t('User.ApiToken.a10')}
            description={t('User.ApiToken.a11')}
            visible={showApiDialog}
            onCancel={()=>setShowApiDialog(false)}
            onConfirm={()=>{
              setShowApiDialog(false)
              router.push('/user/api-token')
            }}
          />
          <AlertConfirm 
            title={t('Product.Warining')}
            description={t('Product.CloseByself')}
            visible={showTipDialog}
            onCancel={()=>setShowTipDialog(false)}
            onConfirm={()=>{
              setShowTipDialog(false)
              stopStrategy()
            }}
          />
        </div>
    )
}
function StrategySkeleton() {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow p-4">
        <Skeleton className="h-48 w-full mb-4 bg-neutral-800" />
        <Skeleton className="h-6 w-3/4 mb-2 bg-neutral-800" />
        <Skeleton className="h-4 w-1/2 mb-4 bg-neutral-800" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/3 bg-neutral-800" />
          <Skeleton className="h-4 w-1/3 bg-neutral-800" />
          <Skeleton className="h-4 w-1/3 bg-neutral-800" />
        </div>
      </div>
    )
}  

function StrategyCard({ strategy, isRunning, actionStrategy, setShowTipDialog }: { strategy: Strategy, isRunning: Boolean, actionStrategy:(strategy: Strategy)=> void, setShowTipDialog:(f: boolean)=> void }) {
  const t = useTranslations('Product');
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow p-4 hover:shadow-lg transition relative">
        {strategy.leverage == 0 ? <Badge className="absolute right-3 top-3 bg-green-600/30 text-green-400 border-green-700 mr-1" variant="secondary">{t('spot')}</Badge> : <Badge className="absolute right-3 top-3 bg-yellow-600/30 text-yellow-400 border-yellow-700 mr-1" variant="secondary">{t('futures')}</Badge>}
        <h3 className="text-lg font-semibold mb-1 text-white">{strategy.name}</h3>
        <p className="text-gray-400 text-sm mb-3 min-h-10">{strategy.description}</p>
        <div>
          {strategy.exchanges.map(e => {
            if(e == 2) return <Badge key={e} variant="secondary" className="bg-white text-black border-white mr-1">OKX</Badge>
            if(e == 1) return <Badge key={e} variant="secondary" className="bg-yellow-600/30 text-yellow-400 border-yellow-700 mr-1">Binance</Badge>
          })}
        </div>
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-4 md:grid-cols-4 text-sm border-b border-neutral-800 py-3">
           <div>
            <p className="text-gray-500">{t('Token')}</p>
            <div className="text-gray-200">
              <span className="font-bold mr-1">{strategy.token}</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500">{t('Leverage')}</p>
            <div className="text-green-400 font-bold">{strategy.leverage}x</div>
          </div>
          <div>
            <p className="text-gray-500">{t('Max USDT')}</p>
            <div className="text-gray-200 font-bold">{strategy.max_usdt}</div>
          </div>
          <div>
            <p className="text-gray-500">{t('Timeframe')}</p>
            <div className="text-gray-200 font-bold">{strategy.timeframe}</div>
          </div>
        </div>
        {/* <div className="flex justify-between text-sm border-b border-neutral-800 py-3">
          <div>
            <p className="text-gray-500">{t('Annual Return')}</p>
            <span className="text-green-400 font-bold">{strategy.annualReturn}%</span>
          </div>
          <div>
            <p className="text-gray-500">{t('Duration (days)')}</p>
            <p className="text-gray-200 font-medium">{getAccumulatedDays(strategy.createdAt)}</p>
          </div>
          <div>
            <p className="text-gray-500">{t('Max Drawdown')}</p>
            <p className="text-gray-200 font-medium">{strategy.maxDrawdown}%</p>
          </div>
        </div> */}
        <div className="flex justify-between mt-2">
          <div>
            <span className="text-gray-500 text-sm">{t('Win Rate')}: </span>
            <span className="text-green-400 font-bold">{strategy.winRate}%</span>
          </div>
           {isRunning ? (
              <Button
                variant="secondary"
                size="sm"
                className="bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-600/40"
                onClick={() => setShowTipDialog(true)}
              >
                <Pause className="w-4 h-4 mr-2" />
                {t('Pause')}
              </Button>
            ) : strategy.status == 2 ? (
              <Button
                variant="secondary"
                size="sm"
                className="text-zinc-400 hover:bg-zinc-600/30 border border-zinc-600/40"
              >
                <Wrench className="w-4 h-4 mr-2" />
                {t('Fix')}
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                className="bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-600/40"
                onClick={() => actionStrategy(strategy)}
              >
                <Play className="w-4 h-4 mr-2" />
                {t('Start')}
              </Button>
            )}
        </div>
      </div>
    )
}
  