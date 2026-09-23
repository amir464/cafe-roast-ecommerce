import { BarChart3, CreditCard, Package, Users } from "lucide-react";
import { MonthlyChart } from "../../components/charts/MonthlyChart";
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

export function Reports() {
  const { orders } = useStore();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const averageOrder = orders.length > 0 ? totalRevenue / orders.length : 0;

  const soldProducts = orders.reduce(
    (sum, order) =>
      sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0,
  );

  return (
    <>
      <div className="mb-6">
        <div>
          <h1 className="m-0 text-[clamp(21px,5vw,26px)]">گزارش‌های فروش</h1>
          <p className="my-1 text-[13px] text-[var(--text-muted)]">
            تحلیل عملکرد فروشگاه در شش ماه گذشته
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 [&_article]:flex [&_article]:items-start [&_article]:gap-[13px] [&_article]:rounded-2xl [&_article]:border [&_article]:border-[var(--border-subtle)] [&_article]:bg-[var(--card)] [&_article]:p-5 [&_article>span]:grid [&_article>span]:h-12 [&_article>span]:w-12 [&_article>span]:shrink-0 [&_article>span]:place-items-center [&_article>span]:rounded-xl [&_h3]:my-[3px] [&_h3]:text-[clamp(16px,4vw,23px)] [&_p]:m-0 [&_p]:text-[13px] [&_p]:text-[var(--text-muted)] [&_small]:text-xs [&_small]:text-[var(--success)]">
        <article>
          <span className="bg-[color-mix(in_srgb,var(--primary)_13%,var(--surface))]text-[var(--interactive)]">
            <CreditCard />
          </span>

          <div>
            <p>میانگین سفارش</p>
            <h3>{formatPrice(averageOrder)}</h3>
            <small>بر اساس سفارش‌های ثبت‌شده</small>
          </div>
        </article>

        <article>
          <span className="bg-[color-mix(in_srgb,var(--success)_12%,var(--surface))] text-[var(--success)]">
            <BarChart3 />
          </span>

          <div>
            <p>نرخ تبدیل</p>
            <h3>۳٫۸٪</h3>
            <small>۰٫۶٪ رشد</small>
          </div>
        </article>

        <article>
          <span className="bg-[color-mix(in_srgb,var(--info)_12%,var(--surface))] text-[var(--info)]">
            <Package />
          </span>

          <div>
            <p>کالاهای فروخته‌شده</p>
            <h3>{formatNumber(soldProducts)}</h3>
            <small>بر اساس سفارش‌ها</small>
          </div>
        </article>

        <article>
          <span className="bg-[color-mix(in_srgb,var(--warning)_12%,var(--surface))] text-[var(--warning)]">
            <Users />
          </span>

          <div>
            <p>نرخ بازگشت مشتری</p>
            <h3>۶۴٪</h3>
            <small>عالی</small>
          </div>
        </article>
      </div>

      <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[2fr_1fr]">
        <div className="min-w-0">
          <MonthlyChart
            data={monthlyRevenueData}
            title="روند فروش ماهانه"
            description="روند فروش در دوازده ماه گذشته"
            valueLabel="فروش"
          />
        </div>

        <div className="min-w-0">
          <WeeklySalesChart data={weeklySalesData} />
        </div>
      </div>
    </>
  );
}
