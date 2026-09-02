import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'

import categories from '../../data/categories.json'
import { useStore } from '../../contexts/StoreContext'
import { EmptyState } from '../../components/common/EmptyState'
import { ProductGrid } from '../../components/product/ProductGrid'
import { formatNumber, formatPrice } from '../../utils/format'

export function ShopPage() {
  const { products } = useStore()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('new')
  const [available, setAvailable] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [max, setMax] = useState(2000000)

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          !search || product.title.includes(search)
        const matchesCategory =
          !category || product.categoryId === category
        const matchesAvailability =
          !available || product.stock > 0
        const matchesPrice = product.price <= max

        return (
          matchesSearch &&
          matchesCategory &&
          matchesAvailability &&
          matchesPrice
        )
      })
      .sort((a, b) => {
        if (sort === 'low') {
          return a.price - b.price
        }

        if (sort === 'high') {
          return b.price - a.price
        }

        return Number(b.isNew) - Number(a.isNew)
      })
  }, [products, search, category, sort, available, max])

  function handleResetFilters() {
    setSearch('')
    setCategory('')
    setMax(2200000)
    setAvailable(false)
  }

  return (
    <div className="mx-auto max-w-7xl px-3 pb-[90px] pt-[30px] sm:px-4 md:px-7">
      <div className="py-[35px] text-center md:py-[55px]">
        <span className="text-[13px] font-bold leading-[1.6] text-[var(--accent)]">فروشگاه کافه روست</span>
        <h1 className="m-2.5 text-[clamp(25px,7vw,41px)]">قهوه‌ای برای هر سلیقه</h1>
        <p className="leading-[1.85] text-[var(--text-secondary)]">از دانه‌های تک‌خاستگاه تا ابزارهای حرفه‌ای دم‌آوری</p>
      </div>

      <button
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 lg:hidden"
        onClick={() => setFiltersOpen((current) => !current)}
        aria-expanded={filtersOpen}
      >
        <SlidersHorizontal />{' '}
        {filtersOpen ? 'بستن فیلترها' : 'نمایش فیلترها'}
      </button>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[245px_minmax(0,1fr)] lg:gap-7">
        <aside className={`${filtersOpen ? 'block' : 'hidden'} h-max rounded-[17px] border border-[var(--border-subtle)] bg-[var(--card)] p-[22px] lg:sticky lg:top-2.5 lg:block`}>
          <h3 className="flex items-center gap-2 text-lg leading-[1.6] text-[var(--text-primary)]">
            <SlidersHorizontal /> فیلتر محصولات
          </h3>

          <label className="my-[22px] flex flex-col gap-[9px] text-sm font-semibold leading-[1.6]">
            جست‌وجو
            <div className="flex items-center rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-2.5">
              <Search className="w-[17px] text-[var(--text-secondary)]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="نام محصول..."
                className="w-full border-0 bg-transparent p-2.5 outline-0"
              />
            </div>
          </label>

          <label className="my-[22px] flex flex-col gap-[9px] text-sm font-semibold leading-[1.6]">
            دسته‌بندی
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-[9px] border border-[var(--border)] bg-[var(--surface)] p-2.5"
            >
              <option value="">همه دسته‌ها</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="my-[22px] flex flex-col gap-[9px] text-sm font-semibold leading-[1.6]">
            حداکثر قیمت <b>{formatPrice(max)}</b>
            <input
              type="range"
              min="300000"
              max="2200000"
              step="100000"
              value={max}
              onChange={(event) => setMax(+event.target.value)}
              className="accent-[var(--primary)]"
            />
          </label>

          <label className="my-[22px] flex flex-row items-center gap-[9px] text-sm font-semibold leading-[1.6]">
            <input
              type="checkbox"
              checked={available}
              onChange={(event) => setAvailable(event.target.checked)}
            />{' '}
            فقط کالاهای موجود
          </label>

          <button className="w-full rounded-[9px] border-0 bg-[var(--surface-muted)] p-2.5 text-sm" onClick={handleResetFilters}>
            پاک کردن فیلترها
          </button>
        </aside>

        <section className="min-w-0">
          <div className="mb-5 flex flex-col items-stretch gap-2.5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p>
              <b>{formatNumber(filteredProducts.length)}</b> محصول پیدا شد
            </p>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="w-full max-w-full rounded-[9px] border border-[var(--border)] bg-[var(--surface)] p-2.5 sm:w-auto"
            >
              <option value="new">جدیدترین</option>
              <option value="low">کمترین قیمت</option>
              <option value="high">بیشترین قیمت</option>
            </select>
          </div>

          {filteredProducts.length ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <EmptyState
              title="محصولی پیدا نشد"
              description="فیلترها را تغییر دهید و دوباره امتحان کنید."
            />
          )}
        </section>
      </div>
    </div>
  )
}
