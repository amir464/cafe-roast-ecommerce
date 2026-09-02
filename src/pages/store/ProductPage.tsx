import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  CheckCircle2,
  Heart,
  Package,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react'

import { useStore } from '../../contexts/StoreContext'
import { SectionTitle } from '../../components/common/SectionTitle'
import { ProductGrid } from '../../components/product/ProductGrid'
import { QuantitySelector } from '../../components/product/QuantitySelector'
import { formatNumber, formatPrice } from '../../utils/format'

export function ProductPage() {
  const { slug } = useParams()
  const {
    products,
    addToCart,
    toggleWishlist,
    wishlist,
  } = useStore()
  const [quantity, setQuantity] = useState(1)

  const product = products.find((item) => item.slug === slug)

  if (!product) {
    return <Navigate to="/404" />
  }

  const isFavorite = wishlist.includes(product.id)
  const relatedProducts = products
    .filter(
      (item) =>
        item.categoryId === product.categoryId &&
        item.id !== product.id,
    )
    .slice(0, 4)

  return (
    <div className="mx-auto max-w-7xl px-3 pb-[90px] pt-[30px] sm:px-4 md:px-7">
      <div className="mb-[35px] mt-[15px] text-[13px] text-[var(--text-secondary)]">
        <Link to="/">خانه</Link> / <Link to="/shop">فروشگاه</Link> /{' '}
        <span>{product.title}</span>
      </div>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-[60px]">
        <div>
          <img className="aspect-square h-auto w-full rounded-[22px] object-cover lg:h-[520px] lg:aspect-auto" src={product.image} alt={product.title} />
          <div className="mt-2.5 flex gap-2.5 overflow-x-auto pb-1.5">
            {product.gallery.map((image, index) => (
              <img
                src={image}
                alt={`${product.title} نمای ${index + 1}`}
                key={image}
                className="h-[82px] w-[82px] shrink-0 rounded-[10px] object-cover"
              />
            ))}
          </div>
        </div>

        <div>
          <span className="inline-flex items-center rounded-[30px] bg-[color-mix(in_srgb,var(--success)_24%,var(--surface))] px-[13px] py-2 text-[13px] font-semibold text-[color-mix(in_srgb,var(--success)_55%,var(--text-primary))]">{product.categoryName}</span>
          <h1 className="text-[clamp(27px,7vw,36px)]">{product.title}</h1>

          <div className="flex items-center gap-1 text-[13px] text-[var(--accent)]">
            <Star fill="currentColor" />{' '}
            {product.rating.toLocaleString('fa')}{' '}
            <span className="text-[var(--text-secondary)]">
              ({formatNumber(product.reviewCount)} دیدگاه)
            </span>
          </div>

          <div className="my-[25px] flex flex-wrap items-center gap-3">
            <strong className="text-[26px]">{formatPrice(product.price)}</strong>
            {product.oldPrice > 0 && (
              <>
                <del className="text-[var(--text-muted)]">{formatPrice(product.oldPrice)}</del>
                <b className="rounded-lg bg-[var(--accent)] px-[9px] py-[5px] text-[#2C221E]">٪{formatNumber(product.discount)} تخفیف</b>
              </>
            )}
          </div>

          <p className="leading-[2] text-[var(--text-secondary)]">{product.description}</p>

          <div className="my-5 flex gap-[7px] rounded-[10px] border border-[color-mix(in_srgb,var(--success)_28%,transparent)] bg-[color-mix(in_srgb,var(--success)_13%,var(--surface))] p-3 text-[color-mix(in_srgb,var(--success)_75%,var(--text-primary))]">
            <CheckCircle2 />{' '}
            {product.stock > 0
              ? `موجود در انبار — ${formatNumber(product.stock)} عدد`
              : 'ناموجود'}
          </div>

          <ul className="grid list-none grid-cols-1 p-0 md:grid-cols-2">
            {product.features.map((feature) => (
              <li className="m-[7px] flex items-start gap-[7px] text-[var(--text-secondary)]" key={feature}>
                <CheckCircle2 className="w-[17px] shrink-0 text-[var(--success)]" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-[25px] grid grid-cols-[1fr_48px] gap-2.5 sm:flex">
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
            />
            <button
              className="col-start-1 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-[22px] py-3 font-semibold text-white hover:bg-[var(--primary-hover)] sm:flex-1"
              onClick={() => addToCart(product, quantity)}
            >
              <ShoppingCart /> افزودن به سبد خرید
            </button>
            <button
              className={`col-start-2 inline-flex min-h-[46px] items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 hover:bg-[var(--favorite-soft)] hover:text-[var(--favorite)] ${isFavorite ? 'text-[var(--favorite)] [&_svg]:fill-current' : 'text-[var(--favorite-inactive)] [&_svg]:fill-transparent'}`}
              onClick={() => toggleWishlist(product.id)}
              aria-label={
                isFavorite
                  ? 'حذف از علاقه‌مندی‌ها'
                  : 'افزودن به علاقه‌مندی‌ها'
              }
            >
              <Heart />
            </button>
          </div>

          <div className="mt-[25px] grid grid-cols-1 gap-3 border-t border-[var(--border)] pt-5 sm:flex sm:flex-wrap sm:justify-between [&_span]:flex [&_span]:items-center [&_span]:gap-[5px] [&_span]:text-xs [&_svg]:w-[17px]">
            <span>
              <Truck />
              ارسال سریع
            </span>
            <span>
              <ShieldCheck />
              ضمانت اصالت
            </span>
            <span>
              <Package />
              بسته‌بندی امن
            </span>
          </div>
        </div>
      </section>

      <section className="px-0 py-12 md:py-[90px]">
        <SectionTitle title="محصولات پیشنهادی برای شما" />
        <ProductGrid products={relatedProducts} />
      </section>
    </div>
  )
}
