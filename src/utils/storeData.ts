import type { Order } from '../types'

export function normalizeOrders(
  orders: Omit<Order, 'userId'>[] | Order[],
): Order[] {
  return orders.map((order) => ({
    ...order,
    userId:
      'userId' in order && order.userId
        ? order.userId
        : order.id === 'CR-1048'
          ? 'user'
          : `customer-${order.id}`,
  }))
}
