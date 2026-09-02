import { useState } from 'react'
import { Search } from 'lucide-react'
import { CrudHeader } from '../../components/dashboard/shared/CrudHeader'
import { useStore } from '../../contexts/StoreContext'
import { formatPrice } from '../../utils/format'

export function AdminOrders() {
  const { orders, updateOrder } = useStore()
  const [search, setSearch] = useState('')

  const shown = orders.filter(
    (order) =>
      order.id.includes(search) || order.customerName.includes(search),
  )

  return (
    <>
      <CrudHeader
        title="مدیریت سفارش‌ها"
        text="پیگیری و به‌روزرسانی سفارش‌های مشتریان"
      />

      <div className="mb-[15px] flex flex-wrap gap-2.5">
        <div className="flex w-full items-center rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-2.5 sm:w-[330px]">
          <Search className="w-[17px] text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="شماره سفارش یا نام مشتری..."
            className="w-full border-0 bg-transparent p-2.5 outline-0"
          />
        </div>
        <select className="min-h-11 max-w-full rounded-[9px] border border-[var(--border)] bg-[var(--surface)] p-2.5">
          <option>همه وضعیت‌های پرداخت</option>
          <option>پرداخت شده</option>
          <option>در انتظار</option>
        </select>
      </div>

      <section className="w-full min-w-0 overflow-hidden rounded-[15px] border border-[var(--border-subtle)] bg-[var(--card)]">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse whitespace-nowrap text-right [&_td]:border-b [&_td]:border-[var(--border-subtle)] [&_td]:px-[17px] [&_td]:py-[13px] [&_td]:text-[13px] [&_th]:border-b [&_th]:border-[var(--border-subtle)] [&_th]:bg-[var(--surface)] [&_th]:px-[17px] [&_th]:py-[13px] [&_th]:text-[13px] [&_th]:text-[var(--text-muted)]">
            <thead>
              <tr>
                <th>شماره سفارش</th>
                <th>مشتری</th>
                <th>تاریخ</th>
                <th>مبلغ</th>
                <th>پرداخت</th>
                <th>وضعیت ارسال</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((order) => (
                <tr key={order.id}>
                  <td>
                    <b>{order.id}</b>
                  </td>
                  <td>{order.customerName}</td>
                  <td>{order.date}</td>
                  <td>{formatPrice(order.total)}</td>
                  <td>
                    <span className="inline-block rounded-full bg-[color-mix(in_srgb,var(--success)_13%,var(--surface))] px-[9px] py-[5px] text-xs text-[var(--success)]">{order.paymentStatus}</span>
                  </td>
                  <td>
                    <select
                      value={order.deliveryStatus}
                      className="min-h-10 rounded-[9px] border border-[var(--border)] bg-[var(--surface)] p-2.5"
                      onChange={(event) =>
                        updateOrder(order.id, event.target.value)
                      }
                    >
                      <option>در حال پردازش</option>
                      <option>ارسال شده</option>
                      <option>تحویل شده</option>
                      <option>لغو شده</option>
                    </select>
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
