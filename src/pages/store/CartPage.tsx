import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'

import { useStore } from '../../contexts/StoreContext'
import { EmptyState } from '../../components/common/EmptyState'
import { QuantitySelector } from '../../components/product/QuantitySelector'
import { formatNumber, formatPrice } from '../../utils/format'

export function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
  } = useStore()

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0,
  )

  const shipping = subtotal > 1500000 ? 0 : 85000

  const discount = cart.reduce(
    (sum, item) =>
      sum +
      (item.product.oldPrice
        ? item.product.oldPrice - item.product.price
        : 0) *
        item.quantity,
    0,
  )

  const total = subtotal + shipping

  return (
    <div className="mx-auto max-w-7xl px-3 pb-[90px] pt-[30px] sm:px-4 md:px-7">
      <div className="py-[35px] text-center">
        <h1 className="m-2.5 text-[clamp(25px,7vw,41px)]">سبد خرید شما</h1>
        <p className="text-[var(--text-secondary)]">
          {formatNumber(cart.length)} محصول در سبد شماست
        </p>
      </div>

      {cart.length === 0 ? (
        <>
          <EmptyState
            title="سبد خرید شما خالی است"
            description="محصولات تازه و خوش‌عطر ما منتظر شما هستند."
          />
          <div className="mt-[35px] text-center">
            <Link className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-[22px] py-3 font-semibold text-[var(--on-dark-primary)] hover:bg-[var(--primary-hover)]" to="/shop">
              شروع خرید
            </Link>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-[minmax(0,1fr)_340px]">
          <section>
            {cart.map(({ product, quantity }) => (
              <article
                className="mb-3.5 grid grid-cols-[68px_minmax(0,1fr)_40px] items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--card)] p-3 sm:grid-cols-[76px_minmax(0,1fr)_44px] sm:p-[18px] lg:grid-cols-[100px_minmax(0,1fr)_auto_130px_35px] lg:gap-5 [&>b]:col-start-2 [&>b]:row-start-3 [&>button]:col-start-3 [&>button]:row-start-1 [&>button]:border-0 [&>button]:bg-transparent [&>button]:text-[var(--danger)] [&>div:nth-of-type(2)]:col-span-2 [&>div:nth-of-type(2)]:row-start-2 lg:[&>b]:col-auto lg:[&>b]:row-auto lg:[&>button]:col-auto lg:[&>button]:row-auto lg:[&>div:nth-of-type(2)]:col-auto lg:[&>div:nth-of-type(2)]:row-auto"
                key={product.id}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-[68px] w-[68px] rounded-[11px] object-cover sm:h-[76px] sm:w-[76px] lg:h-[90px] lg:w-[100px]"
                />

                <div>
                  <small className="text-[13px] text-[var(--text-secondary)]">{product.categoryName}</small>
                  <Link to={`/products/${product.slug}`}>
                    <h3 className="my-[5px] text-base leading-[1.6]">{product.title}</h3>
                  </Link>
                  <strong>{formatPrice(product.price)}</strong>
                </div>

                <QuantitySelector
                  value={quantity}
                  onChange={(newQuantity) =>
                    updateQuantity(product.id, newQuantity)
                  }
                />

                <b>{formatPrice(product.price * quantity)}</b>

                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  aria-label={`حذف ${product.title}`}
                >
                  <Trash2 />
                </button>
              </article>
            ))}
          </section>

          <aside className="h-max rounded-[18px] bg-[var(--surface-muted)] p-[25px] lg:sticky lg:top-6 [&>div]:my-[18px] [&>div]:flex [&>div]:justify-between [&>div]:gap-3 [&>div]:text-sm">
            <h2>خلاصه سفارش</h2>

            <div>
              <span>جمع محصولات</span>
              <b>{formatPrice(subtotal)}</b>
            </div>

            <div>
              <span>هزینه ارسال</span>
              <b>
                {shipping
                  ? formatPrice(shipping)
                  : 'رایگان'}
              </b>
            </div>

            <div>
              <span>سود شما از خرید</span>
              <b className="text-[var(--success)]">{formatPrice(discount)}</b>
            </div>

            <hr />

            <div className="text-[17px]">
              <span>مبلغ قابل پرداخت</span>
              <b>{formatPrice(total)}</b>
            </div>

            <button className="my-[15px] inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-[22px] py-3 font-semibold text-[var(--on-dark-primary)] hover:bg-[var(--primary-hover)]">
              ادامه و ثبت سفارش
            </button>
            <Link className="block text-center text-[13px]" to="/shop">← ادامه خرید</Link>
          </aside>
        </div>
      )}
    </div>
  )
}
