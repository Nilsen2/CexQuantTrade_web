"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import StrategyLineChart from "@/components/StrategyLineChart"
import { useTranslations } from "next-intl"

interface Strategy {
  id: number
  name: string
  description: string
  annualReturn: number
  sharpe: number
  drawdown: number
  duration: number
  winRate: number
  data: { date: string; value: number }[]
}
export default function StrategiesPage(){}
const old = function StrategiesPage() {
  const [deepseek, setDeepseek] = useState<Strategy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetch("")
      // const json = await res.json()
      // setDeepseek(json)
      // setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <main className="container mx-auto px-4 py-16 text-white">
      <StrategySection title="Top History Strategies" strategies={deepseek} loading={loading} />
    </main>
  )
}

function StrategySection({
  title,
  strategies,
  loading,
}: {
  title: string
  strategies: Strategy[]
  loading: boolean
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <StrategySkeleton key={i} />)
          : strategies.map((s) => <StrategyCard key={s.id} strategy={s} />)}
      </div>
    </section>
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

function StrategyCard({ strategy }: { strategy: Strategy }) {
  const t = useTranslations("Product");
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow p-4 hover:shadow-lg transition">
      <div className="h-48 mb-4">
        <StrategyLineChart data={strategy.data} />
      </div>

      <h3 className="text-lg font-semibold mb-1">{strategy.name}</h3>
      <p className="text-gray-400 text-sm mb-3 min-h-10">{strategy.description}</p>

      <div className="flex justify-between text-sm border-t border-neutral-800 pt-3">
        <div>
          <p className="text-gray-500">{t('Annual Return')}</p>
          <span className="text-green-400 font-bold">{strategy.annualReturn}%</span>
        </div>
        <div>
          <p className="text-gray-500">{t('Win Rate')}</p>
          <p className="text-gray-200 font-medium">{strategy.winRate}%</p>
        </div>
        <div>
          <p className="text-gray-500">{t('Max Drawdown')}</p>
          <p className="text-gray-200 font-medium">{strategy.drawdown}%</p>
        </div>
      </div>
    </div>
  )
}


