import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useStore } from '../../contexts/StoreContext'
import { formatPrice } from '../../utils/format'

export function UserOrders() {
  const { user } = useAuth()
  const { orders } = useStore()

  const personalOrders = orders.filter((order) => order.userId === user?.id)

  return (
    <>
      <div className="mb-6">
        <div>
          <h1 className="m-0 text-[clamp(21px,5vw,26px)]">سفارش‌های من</h1>
          <p className="my-1 text-[13px] text-[var(--text-muted)]">جزئیات و وضعیت سفارش‌های ثبت‌شده</p>
        </div>
      </div>

      <section className="w-full min-w-0 overflow-hidden rounded-[15px] border border-[var(--border-subtle)] bg-[var(--card)]">
        <div className="flex justify-between border-b border-[var(--border-subtle)] px-5 py-[18px]">
          <h3>سفارش‌های اخیر</h3>
          <Link to="/user/orders">مشاهده همه</Link>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse whitespace-nowrap text-right [&_td]:border-b [&_td]:border-[var(--border-subtle)] [&_td]:px-[17px] [&_td]:py-[13px] [&_td]:text-[13px] [&_th]:border-b [&_th]:border-[var(--border-subtle)] [&_th]:bg-[var(--surface)] [&_th]:px-[17px] [&_th]:py-[13px] [&_th]:text-[13px] [&_th]:text-[var(--text-muted)]">
            <thead>
              <tr>
                <th>شماره</th>
                <th>مشتری</th>
                <th>تاریخ</th>
                <th>مبلغ</th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {personalOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.date}</td>
                  <td>{formatPrice(order.total)}</td>
                  <td>
                    <span className="inline-block rounded-full bg-[color-mix(in_srgb,var(--success)_13%,var(--surface))] px-[9px] py-[5px] text-xs text-[var(--success)]">{order.deliveryStatus}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
