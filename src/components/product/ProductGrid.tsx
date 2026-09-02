import type { Product } from '../../types'
import { ProductCard } from './ProductCard'

type ProductGridProps = {
  products: Product[]
}

export function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}
