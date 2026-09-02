import ordersData from '../data/orders.json'
import type { Order } from '../types'
import { normalizeOrders } from '../utils/storeData'

export function getOrders(): Order[] {
  return normalizeOrders(ordersData)
}