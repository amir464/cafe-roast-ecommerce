import productsData from '../data/products.json'
import type { Product } from '../types'

const products = productsData as Product[]

export function getProducts() {
  return products
}

export function getProductBySlug(slug: string) {
  return products.find(
    (product) => product.slug === slug,
  )
}