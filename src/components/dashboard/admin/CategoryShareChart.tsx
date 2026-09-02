type CategoryShareItem = {
  id: string
  name: string
  value: number
}

type CategoryShareChartProps = {
  data?: CategoryShareItem[]
}

const fallbackData: CategoryShareItem[] = [
  { id: 'espresso', name: 'قهوه اسپرسو', value: 32 },
  { id: 'brewing', name: 'تجهیزات دم‌آوری', value: 24 },
  { id: 'arabica', name: 'قهوه عربیکا', value: 18 },
  { id: 'accessories', name: 'ماگ و اکسسوری', value: 15 },
  { id: 'instant', name: 'قهوه فوری', value: 11 },
]

const segmentColors = [
  'var(--chart-one)',
  'var(--chart-two)',
  'var(--chart-three)',
  'var(--chart-four)',
  'var(--chart-five)',
  'var(--chart-six)',
]

const formatNumber = (value: number) =>
  new Intl.NumberFormat('fa-IR').format(value)

export function CategoryShareChart({ data }: CategoryShareChartProps) {
  const sourceData = Array.isArray(data) && data.length > 0 ? data : fallbackData
  const normalizedData = sourceData
    .map((item, index) => ({
      id: String(item.id || index),
      name: String(item.name || ''),
      value: Number(item.value),
    }))
    .filter(
      (item) =>
        item.name.trim().length > 0 &&
        Number.isFinite(item.value) &&
        item.value > 0,
    )

  const chartData = normalizedData.length > 0 ? normalizedData : fallbackData
  const total = chartData.reduce((sum, item) => sum + item.value, 0)
  const segments = chartData.map((item, index) => {
    const percentage = total > 0 ? (item.value / total) * 100 : 0
    const offset = chartData
      .slice(0, index)
      .reduce(
        (sum, previousItem) =>
          sum + (total > 0 ? (previousItem.value / total) * 100 : 0),
        0,
      )

    return {
      ...item,
      percentage,
      offset,
      color: segmentColors[index % segmentColors.length],
    }
  })

  return (
    <section className="h-full min-w-0 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card)] p-4 sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          سهم دسته‌بندی‌ها
        </h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          سهم هر دسته‌بندی از فروش محصولات
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 items-center gap-6 sm:grid-cols-[190px_minmax(0,1fr)]">
        <div className="mx-auto flex w-full max-w-[190px] items-center justify-center">
          <div className="relative aspect-square w-full">
            <svg
              viewBox="0 0 120 120"
              className="block h-full w-full -rotate-90"
              role="img"
              aria-label="نمودار سهم دسته‌بندی‌های محصولات"
            >
              <circle
                cx="60"
                cy="60"
                r="46"
                pathLength="100"
                fill="none"
                stroke="var(--surface-muted)"
                strokeWidth="15"
              />
              {segments.map((segment) => (
                <circle
                  key={segment.id}
                  cx="60"
                  cy="60"
                  r="46"
                  pathLength="100"
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="15"
                  strokeLinecap="butt"
                  strokeDasharray={`${segment.percentage} ${100 - segment.percentage}`}
                  strokeDashoffset={-segment.offset}
                >
                  <title>{`${segment.name}: ${formatNumber(Math.round(segment.percentage))} درصد`}</title>
                </circle>
              ))}
            </svg>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-[var(--text-muted)]">دسته‌بندی‌ها</span>
              <strong className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
                {formatNumber(chartData.length)}
              </strong>
              <span className="mt-1 text-xs text-[var(--text-secondary)]">گروه محصول</span>
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-3">
          {segments.map((segment) => (
            <div
              key={segment.id}
              className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2.5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: segment.color }}
                  aria-hidden="true"
                />
                <span
                  className="truncate text-sm text-[var(--text-primary)]"
                  title={segment.name}
                >
                  {segment.name}
                </span>
              </div>
              <span className="shrink-0 text-sm font-semibold text-[var(--text-primary)]">
                {formatNumber(Math.round(segment.percentage))}٪
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
