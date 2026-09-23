type WeeklySalesItem = { day: string; value: number }

type WeeklySalesChartProps = { data?: WeeklySalesItem[] }

const fallbackData: WeeklySalesItem[] = [
  { day: 'شنبه', value: 8400000 },
  { day: 'یکشنبه', value: 11200000 },
  { day: 'دوشنبه', value: 9600000 },
  { day: 'سهشنبه', value: 14800000 },
  { day: 'چهارشنبه', value: 12700000 },
  { day: 'پنجشنبه', value: 17300000 },
  { day: 'جمعه', value: 10500000 },
]

const formatPrice = (value: number) =>
  `${new Intl.NumberFormat('fa-IR').format(value)} تومان`

const formatCompactPrice = (value: number) =>
  new Intl.NumberFormat('fa-IR', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)

export function WeeklySalesChart({ data }: WeeklySalesChartProps) {
  const normalizedData =
    Array.isArray(data) && data.length > 0
      ? data
          .map((item) => ({
            day: String(item.day || ''),
            value: Number(item.value),
          }))
          .filter(
            (item) =>
              item.day.trim().length > 0 &&
              Number.isFinite(item.value) &&
              item.value >= 0,
          )
      : fallbackData

  const chartData = normalizedData.length > 0 ? normalizedData : fallbackData
  const maximumValue = Math.max(...chartData.map((item) => item.value), 1)
  const totalSales = chartData.reduce((sum, item) => sum + item.value, 0)
  const bestDay = chartData.reduce(
    (currentBest, item) =>
      item.value > currentBest.value ? item : currentBest,
    chartData[0],
  )

  return (
    <section
      className="flex h-full w-full min-w-0 flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--card)] p-4 sm:p-5"
      aria-labelledby="weekly-sales-title"
    >
      <div className="mb-5 flex shrink-0 flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="weekly-sales-title" className="text-lg font-semibold text-[var(--text-primary)]">
            فروش هفتگی
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            مقایسه میزان فروش فروشگاه در هفت روز هفته
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] px-3 py-2">
          <span className="block text-xs text-[var(--text-muted)]">مجموع فروش هفته</span>
          <strong className="mt-1 block text-sm text-[var(--text-primary)]">
            {formatPrice(totalSales)}
          </strong>
        </div>
      </div>

      <div className="relative min-h-0 min-w-0 flex-1">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[220px]" aria-hidden="true">
          <div className="absolute inset-x-0 top-0 border-t border-dashed border-[var(--border-subtle)]" />
          <div className="absolute inset-x-0 top-1/4 border-t border-dashed border-[var(--border-subtle)]" />
          <div className="absolute inset-x-0 top-2/4 border-t border-dashed border-[var(--border-subtle)]" />
          <div className="absolute inset-x-0 top-3/4 border-t border-dashed border-[var(--border-subtle)]" />
          <div className="absolute inset-x-0 bottom-0 border-t border-[var(--border)]" />
        </div>

        <div className="relative grid h-[260px] min-w-0 grid-cols-7 items-end gap-1.5 pt-4 sm:gap-3" dir="rtl">
          {chartData.map((item, index) => {
            const barHeight = Math.max(6, (item.value / maximumValue) * 100)
            const isBestDay = item.day === bestDay.day && item.value === bestDay.value

            return (
              <div key={`${item.day}-${index}`} className="group flex h-full min-w-0 flex-col justify-end">
                <div className="mb-2 hidden text-center text-xs font-medium text-[var(--text-primary)] opacity-0 transition-opacity group-hover:opacity-100 sm:block">
                  {formatCompactPrice(item.value)}
                </div>
                <button
                  type="button"
                  className="relative flex h-[220px] w-full items-end rounded-t-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card)]"
                  aria-label={`فروش روز ${item.day}: ${formatPrice(item.value)}`}
                  title={`${item.day}: ${formatPrice(item.value)}`}
                >
                  <span
                    className="relative block w-full rounded-t-lg bg-[var(--primary)] transition-all duration-300 hover:bg-[var(--accent)]"
                    style={{ height: `${barHeight}%`, minHeight: '12px' }}
                  >
                    {isBestDay && (
                      <span className="absolute inset-x-0 -top-6 hidden text-center text-xs font-medium text-[var(--interactive)] sm:block">
                        بیشترین
                      </span>
                    )}
                  </span>
                </button>
                <span className="mt-3 truncate text-center text-xs text-[var(--text-secondary)]" title={item.day}>
                  {item.day}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-3 flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-3">
        <span className="text-xs text-[var(--text-muted)]">
          برای مشاهده مبلغ، نشانگر را روی هر ستون قرار دهید.
        </span>
        <span className="text-xs text-[var(--text-secondary)]">
          بیشترین فروش:{' '}
          <strong className="text-[var(--text-primary)]">{bestDay.day}</strong>
        </span>
      </div>
    </section>
  )
}
