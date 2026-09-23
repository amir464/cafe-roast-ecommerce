import { CheckCircle2, CreditCard, Package, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { MonthlyChart } from "../../components/charts/MonthlyChart";
import { useAuth } from "../../contexts/AuthContext";
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

export function UserOverview() {
  const { user } = useAuth();
  const { products, wishlist, orders } = useStore();

  const personalOrders = orders.filter((order) => order.userId === user?.id);

  const recentOrders = personalOrders.slice(0, 3);

  const favoriteProducts = products
    .filter((product) => wishlist.includes(product.id))
    .slice(0, 3);

  const totalOrders = personalOrders.length;

  const totalSpent = personalOrders.reduce(
    (sum, order) => sum + order.total,
    0,
  );

  const processingOrders = personalOrders.filter(
    (order) => order.deliveryStatus === "در حال پردازش",
  ).length;

  const deliveredOrders = personalOrders.filter(
    (order) =>
      order.deliveryStatus === "تحویل‌شده" ||
      order.deliveryStatus === "تحویل شده",
  ).length;

  return (
    <>
      <div className="mb-6 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="m-0 text-[clamp(21px,5vw,26px)]">
            صبح بخیر، {user?.firstName}!
          </h1>
          <p className="my-1 text-[13px] text-[var(--text-muted)]">
            این‌جا خلاصه فعالیت‌های حساب شما را می‌بینید.
          </p>
        </div>

        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--primary)] px-[22px] py-3 font-semibold text-[var(--on-dark-primary)] hover:bg-[var(--primary-hover)]"
          to="/shop"
        >
          خرید قهوه
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 [&_article]:flex [&_article]:items-start [&_article]:gap-[13px] [&_article]:rounded-2xl [&_article]:border [&_article]:border-[var(--border-subtle)] [&_article]:bg-[var(--card)] [&_article]:p-5 [&_article>span]:grid [&_article>span]:h-12 [&_article>span]:w-12 [&_article>span]:shrink-0 [&_article>span]:place-items-center [&_article>span]:rounded-xl [&_h3]:my-[3px] [&_h3]:text-[clamp(16px,4vw,23px)] [&_p]:m-0 [&_p]:text-[13px] [&_p]:text-[var(--text-muted)] [&_small]:text-xs [&_small]:text-[var(--success)]">
        <article>
          <span className="bg-[color-mix(in_srgb,var(--primary)_13%,var(--surface))] text-[var(--interactive)]">
            <Package />
          </span>
          <div>
            <p>کل سفارش‌ها</p>
            <h3>{formatNumber(totalOrders)} سفارش</h3>
            <small>تعداد سفارش‌های ثبت‌شده</small>
          </div>
        </article>

        <article>
          <span className="bg-[color-mix(in_srgb,var(--success)_12%,var(--surface))] text-[var(--success)]">
            <CreditCard />
          </span>
          <div>
            <p>مجموع خرید</p>
            <h3>{formatPrice(totalSpent)}</h3>
            <small>از ابتدای عضویت</small>
          </div>
        </article>

        <article>
          <span className="bg-[color-mix(in_srgb,var(--warning)_12%,var(--surface))] text-[var(--warning)]">
            <Truck />
          </span>
          <div>
            <p>در حال پردازش</p>
            <h3>{formatNumber(processingOrders)} سفارش</h3>
            <small>آماده‌سازی برای ارسال</small>
          </div>
        </article>

        <article>
          <span className="bg-[color-mix(in_srgb,var(--info)_12%,var(--surface))] text-[var(--info)]">
            <CheckCircle2 />
          </span>
          <div>
            <p>تحویل‌شده</p>
            <h3>{formatNumber(deliveredOrders)} سفارش</h3>
            <small>با موفقیت دریافت شده</small>
          </div>
        </article>
      </div>

      <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[2fr_1fr]">
        <div className="min-w-0">
          <MonthlyChart
            data={monthlyRevenueData}
            title="خریدهای ماهانه"
            description="روند خرید شما در ماه‌های گذشته"
            valueLabel="خرید"
          />
        </div>

        <section className="min-w-0 rounded-[15px] border border-[var(--border-subtle)] bg-[var(--card)] p-5 text-center">
          <div className="mx-auto my-2.5 grid h-[75px] w-[75px] place-items-center rounded-full bg-[var(--surface-muted)] font-extrabold text-[var(--interactive)]">
            {user?.firstName.charAt(0)}
          </div>

          <h3>
            {user?.firstName} {user?.lastName}
          </h3>

          <p>{user?.email}</p>
          <p>{user?.phone}</p>

          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-[22px] py-3 font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--surface-muted)]"
            to="/user/profile"
          >
            ویرایش اطلاعات
          </Link>
        </section>
      </div>

      <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">
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
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.date}</td>
                    <td>{formatPrice(order.total)}</td>
                    <td>
                      <span className="inline-block rounded-full bg-[color-mix(in_srgb,var(--success)_13%,var(--surface))] px-[9px] py-[5px] text-xs text-[var(--success)]">
                        {order.deliveryStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="min-w-0 rounded-[15px] border border-[var(--border-subtle)] bg-[var(--card)] p-5">
          <div className="flex justify-between border-b border-[var(--border-subtle)] pb-[18px]">
            <h3>علاقه‌مندی‌های من</h3>
            <Link to="/user/wishlist">مشاهده همه</Link>
          </div>

          {favoriteProducts.map((product) => (
            <div
              className="flex items-center gap-2.5 border-b border-[var(--border-subtle)] py-[9px] text-[13px]"
              key={product.id}
            >
              <img
                className="h-[42px] w-[42px] rounded-lg object-cover"
                src={product.image}
              />

              <span className="flex flex-1 flex-col">
                {product.title}
                <small className="text-xs text-[var(--text-muted)]">
                  {formatPrice(product.price)}
                </small>
              </span>
            </div>
          ))}

          {wishlist.length === 0 && <p>هنوز محصولی ذخیره نکرده‌اید.</p>}
        </section>
      </div>
    </>
  );
}
