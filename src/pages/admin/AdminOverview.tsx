import { Boxes, CreditCard, ShoppingCart, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { MonthlyChart } from "../../components/charts/MonthlyChart";
import { CategoryShareChart } from "../../components/dashboard/admin/CategoryShareChart";
import { WeeklySalesChart } from "../../components/dashboard/admin/WeeklySalesChart";
import { useStore } from "../../contexts/StoreContext";
import dashboard from "../../data/dashboard.json";
import { formatNumber, formatPrice } from "../../utils/format";

const monthlyRevenueData = Array.isArray(dashboard.monthly)
  ? dashboard.monthly
      .map((item) => ({
        month: String(item.name),
        value: Number(item.value) * 1000000,
      }))
      .filter(
        (item) => item.month.trim().length > 0 && Number.isFinite(item.value),
      )
  : [];

const weeklySalesData = Array.isArray(dashboard.weekly)
  ? dashboard.weekly
      .map((item) => ({
        day: String(item.name),
        value: Number(item.value) * 1000000,
      }))
      .filter(
        (item) =>
          item.day.trim().length > 0 &&
          Number.isFinite(item.value) &&
          item.value >= 0,
      )
  : [];

export function AdminOverview() {
  const { products, orders } = useStore();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const totalOrders = orders.length;

  const lowStockProducts = products.filter(
    (product) => product.stock < 10,
  ).length;

  const bestSellingProducts = products
    .filter((product) => product.isBestSeller)
    .slice(0, 3);

  return (
    <div className="flex w-full min-w-0 flex-col gap-5">
      <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="m-0 text-[clamp(21px,5vw,26px)]">نمای کلی فروشگاه</h1>
          <p className="my-1 text-[13px] text-[var(--text-muted)]">
            خلاصه وضعیت فروش، سفارش‌ها و عملکرد فروشگاه
          </p>
        </div>

        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--primary)] px-[22px] py-3 font-semibold text-[var(--on-dark-primary)] hover:bg-[var(--primary-hover)]"
          to="/"
        >
          مشاهده فروشگاه
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 [&_article]:flex [&_article]:min-w-0 [&_article]:items-start [&_article]:gap-[13px] [&_article]:rounded-2xl [&_article]:border [&_article]:border-[var(--border-subtle)] [&_article]:bg-[var(--card)] [&_article]:p-5 [&_article>span]:grid [&_article>span]:h-12 [&_article>span]:w-12 [&_article>span]:shrink-0 [&_article>span]:place-items-center [&_article>span]:rounded-xl [&_h3]:my-[3px] [&_h3]:text-[clamp(16px,4vw,23px)] [&_p]:m-0 [&_p]:text-[13px] [&_p]:text-[var(--text-muted)] [&_small]:text-xs [&_small]:text-[var(--success)]">
        <article>
          <span className="bg-[color-mix(in_srgb,var(--primary)_13%,var(--surface))] text-[var(--interactive)]">
            <CreditCard />
          </span>

          <div>
            <p>فروش کل</p>
            <h3>{formatPrice(totalRevenue)}</h3>
            <small>بر اساس سفارش‌های ثبت‌شده</small>
          </div>
        </article>

        <article>
          <span className="bg-[color-mix(in_srgb,var(--success)_12%,var(--surface))] text-[var(--success)]">
            <ShoppingCart />
          </span>

          <div>
            <p>سفارش‌ها</p>
            <h3>{formatNumber(totalOrders)}</h3>
            <small>کل سفارش‌های فروشگاه</small>
          </div>
        </article>

        <article>
          <span className="bg-[color-mix(in_srgb,var(--info)_12%,var(--surface))] text-[var(--info)]">
            <Users />
          </span>

          <div>
            <p>مشتریان</p>
            <h3>۸۵۶</h3>
            <small>اطلاعات کاربران در مرحله بعد</small>
          </div>
        </article>

        <article>
          <span className="bg-[color-mix(in_srgb,var(--warning)_12%,var(--surface))] text-[var(--warning)]">
            <Boxes />
          </span>

          <div>
            <p>محصولات</p>
            <h3>{formatNumber(products.length)}</h3>
            <small>{formatNumber(lowStockProducts)} محصول کم‌موجودی</small>
          </div>
        </article>
      </div>
      <div className="grid min-w-0 grid-cols-1 items-stretch gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <div className="flex min-w-0 [&>*]:h-full [&>*]:w-full">
          <MonthlyChart
            data={monthlyRevenueData}
            title="درآمد ماهانه"
            description="روند درآمد فروشگاه در دوازده ماه گذشته"
            valueLabel="درآمد"
          />
        </div>

        <div className="flex min-w-0 [&>*]:h-full [&>*]:w-full">
          <WeeklySalesChart data={weeklySalesData} />
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 items-stretch gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <div className="flex min-w-0">
          <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--card)]">
            <div className="flex justify-between border-b border-[var(--border-subtle)] px-5 py-[18px]">
              <h3>سفارش‌های اخیر</h3>
              <Link to="/admin/orders">مشاهده همه</Link>
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
                  {orders.slice(0, 4).map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.date}</td>
                      <td>{formatPrice(order.total)}</td>
                      <td>
                        <span className="inline-block rounded-full border border-[color-mix(in_srgb,var(--success)_28%,transparent)] bg-[color-mix(in_srgb,var(--success)_13%,var(--surface))] px-[9px] py-[5px] text-xs text-[var(--success)]">
                          {order.deliveryStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="flex min-w-0">
          <CategoryShareChart />
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--card)] p-5">
          <h3>پرفروش‌ترین محصولات</h3>

          {bestSellingProducts.map((product, index) => (
            <div
              className="flex items-center gap-2.5 border-b border-[var(--border-subtle)] py-[9px] text-[13px] [&_img]:h-[42px] [&_img]:w-[42px] [&_img]:rounded-lg [&_img]:object-cover [&_span]:flex [&_span]:flex-1 [&_span]:flex-col [&_small]:text-xs [&_small]:text-[var(--text-muted)]"
              key={product.id}
            >
              <b>#{formatNumber(index + 1)}</b>

              <img src={product.image} />

              <span>
                {product.title}
                <small>محصول پرفروش</small>
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--card)] p-5">
          <h3>محصولات کم‌موجودی</h3>

          {products
            .filter((product) => product.stock < 10)
            .slice(0, 3)
            .map((product) => (
              <div
                className="flex items-center gap-2.5 border-b border-[var(--border-subtle)] py-[9px] text-[13px] [&_img]:h-[42px] [&_img]:w-[42px] [&_img]:rounded-lg [&_img]:object-cover [&_span]:flex [&_span]:flex-1 [&_span]:flex-col [&_small]:text-xs [&_small]:text-[var(--text-muted)]"
                key={product.id}
              >
                <img src={product.image} />

                <span>
                  {product.title}

                  <small>
                    تنها {formatNumber(product.stock)} عدد باقی مانده
                  </small>
                </span>

                <Link to="/admin/products">مدیریت</Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
