import { EmptyState } from '../../components/common/EmptyState'
import { ProductGrid } from '../../components/product/ProductGrid'
import { useStore } from '../../contexts/StoreContext'
import { formatNumber } from '../../utils/format'

export function WishlistPage() {
  const { products, wishlist } = useStore()

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id),
  )
  const wishlistCount = formatNumber(wishlistProducts.length)

  return (
    <>
      <div className="mb-6">
        <div>
          <h1 className="m-0 text-[clamp(21px,5vw,26px)]">علاقه‌مندی‌های من</h1>
          <p className="my-1 text-[13px] text-[var(--text-muted)]">{wishlistCount} محصول ذخیره‌شده</p>
        </div>
      </div>

      {wishlistProducts.length ? (
        <ProductGrid products={wishlistProducts} />
      ) : (
        <EmptyState
          title="فهرست علاقه‌مندی‌ها خالی است"
          description="محصولات موردعلاقه خود را با آیکن قلب ذخیره کنید."
        />
      )}
    </>
  )
}
