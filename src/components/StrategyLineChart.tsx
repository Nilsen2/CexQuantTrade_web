import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
  } from "@/components/ui/chart"
  import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
  } from "recharts"
  import { parseISO, format } from "date-fns"

// 图表配置
const chartConfig = {
    value: {
      label: "Return %",
      color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function StrategyLineChart({ data }: { data: { date: string; value: number }[] }) {
    return (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {/* 网格线 */}
            <CartesianGrid stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
  
            {/* X轴 */}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="#aaa"
            />
  
            {/* Y轴 */}
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
              stroke="#aaa"
            />
  
            {/* 悬浮提示 */}
            <ChartTooltip
              cursor={{ stroke: "rgba(255,255,255,0.2)" }}
              content={CustomTooltip}
            />
  
            {/* 折线（亮绿色） */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#99a1af"
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    )
  }
  
  function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload || !payload.length) return null
  
    const point = payload[0]
    const val = Number(point?.value)
  
    // 自动判断涨跌颜色
    const isPositive = val > 0
    const isNegative = val < 0
  
    const color = isPositive
      ? "text-green-400"
      : isNegative
      ? "text-red-400"
      : "text-gray-300"
  
    // 格式化数值
    const formattedValue =
      val === 0 || isNaN(val)
        ? "0.00%"
        : `${val > 0 ? "+" : ""}${val.toFixed(2)}%`
  
    // 格式化日期
    let formattedDate = label
    try {
      if (label && label.length >= 8) {
        const d = parseISO(label)
        if (!isNaN(d.getTime())) formattedDate = format(d, "yyyy-MM-dd")
      }
    } catch {}
  
    return (
      <div className="bg-neutral-900 border border-neutral-700 rounded-md p-2 text-sm shadow-lg text-gray-200">
        <div className="font-medium text-gray-400">{formattedDate}</div>
        <div className={`mt-1 font-semibold text-base ${color}`}>
          {formattedValue}
        </div>
      </div>
    )
  }