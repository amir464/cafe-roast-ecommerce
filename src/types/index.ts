export interface Product {
  id: string
  title: string
  slug: string
  categoryId: string
  categoryName: string
  price: number
  oldPrice: number
  discount: number
  image: string
  gallery: string[]
  rating: number
  reviewCount: number
  stock: number
  shortDescription: string
  description: string
  features: string[]
  isFeatured: boolean
  isNew: boolean
  isBestSeller: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
}

export type UserRole = 'admin' | 'user'

export interface AuthUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
}

export interface User extends AuthUser {
  phone: string
  status: 'active' | 'inactive'
  registeredAt: string
  orderCount: number
}

export interface OrderItem {
  productId: string
  title: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  userId: string
  customerName: string
  date: string
  total: number
  paymentStatus: string
  deliveryStatus: string
  items: OrderItem[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface ChartData {
  name: string
  value: number
  secondary?: number
}

export interface DashboardStatistics {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
}
