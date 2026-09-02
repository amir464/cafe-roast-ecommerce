import { Heart, ShoppingBag, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useStore } from '../../contexts/StoreContext'
import type { Product } from '../../types'
import { formatPrice } from '../../utils/format'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const isFavorite = wishlist.includes(product.id)

  return (
    <article className="group mx-auto flex min-h-0 w-full max-w-[420px] min-w-0 flex-col overflow-hidden rounded-[20px] border border-[var(--border-subtle)] bg-[var(--card)] transition hover:-translate-y-[5px] hover:border-[color-mix(in_srgb,var(--accent)_55%,var(--border))] hover:shadow-[0_17px_38px_var(--shadow)] sm:min-h-[470px] sm:max-w-none lg:min-h-[500px]">
      <div className="relative h-[180px] overflow-hidden bg-[var(--product-image)] sm:h-[230px] lg:h-[270px]">
        <Link className="block h-full" to={`/products/${product.slug}`}>
          <img className="h-full w-full object-cover transition duration-[400ms] group-hover:scale-[1.04]" src={product.image} alt={product.title} />
        </Link>
        {product.discount > 0 && (
          <b className="absolute right-3 top-3 rounded-[7px] bg-[var(--accent)] px-[9px] py-[5px] text-xs font-bold leading-[1.5] text-[#2C221E]">
            ٪{new Intl.NumberFormat('fa').format(product.discount)} تخفیف
          </b>
        )}
        <button
          className={`absolute left-3 top-3 grid h-[35px] w-[35px] place-items-center rounded-full border-0 bg-[var(--surface)] transition hover:bg-[var(--favorite-soft)] hover:text-[var(--favorite)] ${isFavorite ? 'text-[var(--favorite)] [&_svg]:fill-current' : 'text-[var(--favorite-inactive)] [&_svg]:fill-transparent'}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={
            isFavorite
              ? 'حذف از علاقه‌مندی‌ها'
              : 'افزودن به علاقه‌مندی‌ها'
          }
        >
          <Heart size={19} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:px-[18px] sm:pb-5 sm:pt-[18px]">
        <small className="text-[13px] leading-[1.55] text-[var(--text-secondary)]">{product.categoryName}</small>
        <Link to={`/products/${product.slug}`}>
          <h3 className="my-[5px] mb-2 text-base leading-[1.65] text-[var(--text-primary)]">{product.title}</h3>
        </Link>
        <div className="flex items-center gap-1 text-[13px] leading-[1.5] text-[var(--accent)]">
          <Star size={15} fill="currentColor" />{' '}
          {product.rating.toLocaleString('fa-IR')}{' '}
          <span className="text-[var(--text-secondary)]">({product.reviewCount.toLocaleString('fa-IR')})</span>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-[var(--border)] pt-3.5">
          <div className="flex flex-col">
            <strong className="text-[15px]">{formatPrice(product.price)}</strong>
            {product.oldPrice > 0 && (
              <del className="text-xs text-[var(--text-muted)]">{formatPrice(product.oldPrice)}</del>
            )}
          </div>
          <button
            className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border-0 bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
            onClick={() => addToCart(product)}
            aria-label={`افزودن ${product.title} به سبد`}
          >
            <ShoppingBag size={19} />
          </button>
        </div>
      </div>
    </article>
  )
}
