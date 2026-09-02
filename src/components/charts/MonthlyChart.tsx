import { useId, useState } from 'react'

export type MonthlyChartItem = {
  month: string
  value: number
}

type MonthlyChartProps = {
  data?: MonthlyChartItem[]
  title?: string
  description?: string
  valueLabel?: string
}

const fallbackData: MonthlyChartItem[] = [
  { month: 'فروردین', value: 12500000 },
  { month: 'اردیبهشت', value: 16800000 },
  { month: 'خرداد', value: 14200000 },
  { month: 'تیر', value: 19500000 },
  { month: 'مرداد', value: 22100000 },
  { month: 'شهریور', value: 20400000 },
  { month: 'مهر', value: 24800000 },
  { month: 'آبان', value: 27300000 },
  { month: 'آذر', value: 25900000 },
  { month: 'دی', value: 30100000 },
  { month: 'بهمن', value: 28600000 },
  { month: 'اسفند', value: 33400000 },
]

const numberFormatter = new Intl.NumberFormat('fa-IR')
const formatPrice = (value: number) => `${numberFormatter.format(value)} تومان`

const width = 1000
const height = 280
const padding = { top: 24, right: 24, bottom: 54, left: 50 }

type Point = MonthlyChartItem & { x: number; y: number }

function createSmoothPath(points: Point[]) {
  if (points.length < 2) return ''

  return points.slice(1).reduce((path, point, index) => {
    const previous = points[index]
    const midpoint = (previous.x + point.x) / 2
    return `${path} C ${midpoint} ${previous.y}, ${midpoint} ${point.y}, ${point.x} ${point.y}`
  }, `M ${points[0].x} ${points[0].y}`)
}

export function MonthlyChart({
  data,
  title = 'درآمد ماهانه',
  description = 'روند درآمد فروشگاه در دوازده ماه گذشته',
  valueLabel = 'درآمد',
}: MonthlyChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const gradientId = useId().replace(/:/g, '')
  const normalizedData =
    Array.isArray(data) && data.length > 0
      ? data
          .map((item) => ({ month: String(item.month ?? ''), value: Number(item.value) }))
          .filter((item) => item.month.trim().length > 0 && Number.isFinite(item.value) && item.value >= 0)
      : fallbackData

  const chartData = normalizedData.length > 0 ? normalizedData : fallbackData
  const maximumValue = Math.max(...chartData.map((item) => item.value))
  const minimumValue = Math.min(...chartData.map((item) => item.value))
  const valueRange = Math.max(maximumValue - minimumValue, 1)
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const verticalInset = 12

  const points: Point[] = chartData.map((item, index) => ({
    ...item,
    x: padding.left + (index / Math.max(chartData.length - 1, 1)) * chartWidth,
    y:
      padding.top +
      verticalInset +
      (1 - (item.value - minimumValue) / valueRange) * (chartHeight - verticalInset * 2),
  }))
  const linePath = createSmoothPath(points)
  const baseline = height - padding.bottom
  const areaPath = `${linePath} L ${points.at(-1)?.x ?? padding.left} ${baseline} L ${points[0].x} ${baseline} Z`
  const activePoint = activeIndex === null ? null : points[activeIndex]

  return (
    <section
      className="flex h-full w-full min-w-0 flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--card)] p-4 sm:p-5"
      aria-labelledby="monthly-chart-title"
    >
      <header className="shrink-0">
        <h2 id="monthly-chart-title" className="text-lg font-semibold text-[var(--text-primary)]">
          {title}
        </h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p>
      </header>

      <div className="mt-5 min-h-0 flex-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="block h-full min-h-[250px] w-full"
          role="img"
          aria-label={`${title}؛ نمودار خطی درآمد دوازده ماه گذشته`}
          preserveAspectRatio="none"
          onMouseLeave={() => setActiveIndex(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-fill)" />
              <stop offset="100%" stopColor="var(--chart-fill)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 0.33, 0.66, 1].map((ratio) => {
            const y = padding.top + ratio * chartHeight
            return (
              <line
                key={ratio}
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                stroke="var(--border-subtle)"
                strokeDasharray="5 5"
                vectorEffect="non-scaling-stroke"
              />
            )
          })}

          <path d={areaPath} fill={`url(#${gradientId})`} />
          <path
            d={linePath}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {points.map((point, index) => (
            <g key={point.month}>
              <circle
                cx={point.x}
                cy={point.y}
                r="12"
                fill="transparent"
                tabIndex={0}
                role="button"
                aria-label={`${valueLabel} ماه ${point.month}: ${formatPrice(point.value)}`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
                className="cursor-pointer outline-none"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={activeIndex === index ? 5.5 : 4}
                fill="var(--primary)"
                stroke="var(--card)"
                strokeWidth="2.5"
                pointerEvents="none"
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={point.x}
                y={height - 18}
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="11"
                className={index % 2 === 1 ? 'hidden sm:block' : undefined}
              >
                {point.month}
              </text>
            </g>
          ))}

          {activePoint && (
            <g pointerEvents="none">
              <rect
                x={Math.min(Math.max(activePoint.x - 70, 8), width - 148)}
                y={Math.max(activePoint.y - 62, 8)}
                width="140"
                height="48"
                rx="10"
                fill="var(--surface-elevated)"
                stroke="var(--border)"
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={Math.min(Math.max(activePoint.x, 78), width - 78)}
                y={Math.max(activePoint.y - 43, 27)}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize="11"
                fontWeight="600"
              >
                {activePoint.month}
              </text>
              <text
                x={Math.min(Math.max(activePoint.x, 78), width - 78)}
                y={Math.max(activePoint.y - 25, 45)}
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="10"
              >
                {formatPrice(activePoint.value)}
              </text>
            </g>
          )}
        </svg>
      </div>
    </section>
  )
}
