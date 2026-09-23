import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Coffee,
  Leaf,
  Mail,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { FiCoffee } from "react-icons/fi";
import { MdOutlineCoffeeMaker } from "react-icons/md";
import { CiMug1 } from "react-icons/ci";
import { SiBuymeacoffee } from "react-icons/si";
import { GiCoffeePot } from "react-icons/gi";
import { LiaCoffeeSolid } from "react-icons/lia";
import { LuPackageCheck } from "react-icons/lu";
import categories from "../../data/categories.json";
import { useStore } from "../../contexts/StoreContext";
import { SectionTitle } from "../../components/common/SectionTitle";
import { ProductGrid } from "../../components/product/ProductGrid";

export function HomePage() {
  const { products } = useStore();

  const bestSellingProducts = products
    .filter((product) => product.isBestSeller)
    .slice(0, 4);

  const newProducts = products.filter((product) => product.isNew).slice(0, 4);

  return (
    <>
      <section className="mx-auto grid min-h-0 max-w-7xl grid-cols-1 items-center gap-[30px] bg-[var(--background)] px-3 py-[42px] sm:px-4 lg:min-h-[620px] lg:grid-cols-2 lg:gap-[45px] lg:px-7 lg:pb-[70px] lg:pt-16">
        <div>
          <span className="inline-flex items-center gap-[7px] rounded-[30px] bg-[color-mix(in_srgb,var(--success)_24%,var(--surface))] px-[13px] py-2 text-[13px] font-semibold leading-[1.6] text-[color-mix(in_srgb,var(--success)_55%,var(--text-primary))]">
            <Leaf size={16} /> رست تازه، هر هفته
          </span>

          <h1 className="mt-4 mb-4 text-[clamp(30px,9vw,58px)] font-black leading-[1.45] text-[var(--text-primary)] md:leading-[1.35]">
            عطر واقعی قهوه را
            <br />
            <em className="not-italic text-[var(--accent)]">تجربه کنید</em>
          </h1>

          <p className="max-w-[590px] text-sm leading-[2] text-[var(--text-secondary)] md:text-[17px]">
            منتخبی از بهترین قهوه‌ها و تجهیزات دم‌آوری برای ساختن لحظه‌های
            خوش‌طعم شما؛ تازه، دقیق و با عشق رست شده.
          </p>

          <div className="my-[30px] grid grid-cols-1 gap-3 sm:flex">
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-[22px] py-3 font-semibold text-[var(--on-dark-primary)] hover:-translate-y-0.5 hover:bg-[var(--primary-hover)]"
              to="/shop"
            >
              مشاهده محصولات <ChevronLeft />
            </Link>

            <Link
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-[22px] py-3 font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--surface-muted)]"
              to="/about"
            >
              داستان کافه روست
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-[25px] [&>div]:flex [&>div]:min-w-[82px] [&>div]:flex-col [&_b]:text-xl [&_span]:text-xs [&_span]:leading-[1.6] [&_span]:text-[var(--text-muted)]">
            <div>
              <b>+۱۲۰۰</b>
              <span>مشتری خوشحال</span>
            </div>

            <div>
              <b>٪۱۰۰</b>
              <span>تضمین تازگی</span>
            </div>

            <div>
              <b>۴٫۹</b>
              <span>امتیاز مشتریان</span>
            </div>
          </div>
        </div>

        <div className="relative h-auto min-h-0 lg:h-[470px]">
          <img
            src="/images/cafe-editorial.png"
            alt="فنجان قهوه تازه در کافه روست"
            className="static aspect-[4/3] h-auto w-full rounded-[90px_16px_90px_16px] object-cover shadow-[0_24px_60px_var(--shadow)] lg:absolute lg:h-full lg:aspect-auto"
          />

          <div className="absolute inset-x-3 bottom-3 flex max-w-[calc(100%-24px)] items-center gap-3 rounded-[14px] border border-[var(--border)] bg-[var(--surface-elevated)] px-5 py-[15px] lg:bottom-[25px] lg:right-0 lg:left-auto lg:max-w-none xl:right-[-20px] [&>svg]:shrink-0 [&>svg]:text-[var(--success)] [&>div]:flex [&>div]:min-w-0 [&>div]:flex-col [&_span]:text-xs [&_span]:leading-[1.6] [&_span]:text-[var(--text-muted)]">
            <Coffee />

            <div>
              <b>رست همین هفته</b>
              <span>ارسال مستقیم از روستری</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-[max(28px,calc((100vw-1224px)/2))] md:py-[70px]">
        <SectionTitle
          eyebrow="انتخاب بر اساس سلیقه"
          title="دسته‌بندی محصولات"
          description="هرآنچه برای یک فنجان حرفه‌ای نیاز دارید"
        />

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {categories.map((category, index) => (
            <Link
              to={`/shop?category=${category.id}`}
              className="rounded-[18px] border border-[var(--border-subtle)] bg-[var(--card)] px-[17px] py-6 text-center transition hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--accent)_55%,var(--border))] hover:shadow-[0_17px_38px_var(--shadow)] [&>b]:text-xs [&>b]:text-[var(--accent)] [&>h3]:text-base [&>p]:h-[35px] [&>p]:text-xs [&>p]:text-[var(--text-secondary)]"
              key={category.id}
            >
              <span className="mx-auto mb-[15px] grid h-12 w-14 place-items-center rounded-full bg-[var(--surface-muted)] text-[var(--adaptive-text)]">
                {
                  [
                    <FiCoffee size={20} />,
                    <LiaCoffeeSolid size={20} />,
                    <GiCoffeePot size={20} />,
                    <SiBuymeacoffee size={20} />,
                    <MdOutlineCoffeeMaker size={20} />,
                    <CiMug1 size={20} />,
                  ][index]
                }
              </span>

              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <b>مشاهده محصولات ←</b>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-[var(--background-secondary)] px-4 py-12 md:px-[max(28px,calc((100vw-1224px)/2))] md:py-[70px]">
        <SectionTitle
          eyebrow="محبوب‌ترین انتخاب‌ها"
          title="پرفروش‌های کافه روست"
        />

        <ProductGrid products={bestSellingProducts} />

        <div className="mt-[35px] text-center">
          <Link
            className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-[22px] py-3 font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--surface-muted)]"
            to="/shop"
          >
            مشاهده همه محصولات
          </Link>
        </div>
      </section>

      <section className="mx-4 my-7 flex min-h-[280px] max-w-[1224px] items-center rounded-[26px] border border-[var(--border-subtle)] bg-[var(--surface)] px-5 py-8 text-[var(--text-primary)] md:mx-auto md:my-[75px] md:p-[45px]">
        <div>
          <small>پیشنهاد این هفته</small>

          <h2 className="my-2.5 text-[27px] md:text-[37px]">
            برای شروع یک صبح عالی آماده‌اید؟
          </h2>

          <p className="mb-[25px]">
            تا ۲۰٪ تخفیف روی قهوه‌های منتخب و ارسال رایگان
          </p>

          <Link
            className="inline-flex items-center justify-center rounded-xl bg-[var(--surface-elevated)] px-[22px] py-3 font-semibold text-[var(--interactive)]"
            to="/shop"
          >
            خرید با تخفیف
          </Link>
        </div>
      </section>

      <section className="px-4 py-12 md:px-[max(28px,calc((100vw-1224px)/2))] md:py-[70px]">
        <SectionTitle eyebrow="تازه از راه رسیده" title="محصولات جدید" />
        <ProductGrid products={newProducts} />
      </section>

      <section className="grid grid-cols-1 bg-[var(--background-secondary)] px-4 py-10 sm:grid-cols-2 md:px-[max(28px,calc((100vw-1224px)/2))] lg:grid-cols-4 [&>div]:grid [&>div]:grid-cols-[50px_1fr] [&>div]:items-center [&>div]:px-[25px] [&>div]:py-3 [&_b]:text-[15px] [&_span]:text-sm [&_span]:leading-[1.8] [&_span]:text-[var(--text-secondary)] [&_svg]:row-span-2 [&_svg]:text-[var(--accent)]">
        <div>
          <Truck />
          <b>ارسال سریع و مطمئن</b>
          <span>به سراسر ایران</span>
        </div>

        <div>
          <LuPackageCheck size={22} />
          <b>تضمین تازگی رست</b>
          <span>بسته‌بندی بلافاصله پس از رست</span>
        </div>

        <div>
          <ShieldCheck />
          <b>ضمانت بازگشت</b>
          <span>تا ۷ روز پس از خرید</span>
        </div>

        <div>
          <Phone />
          <b>مشاوره تخصصی</b>
          <span>پاسخ‌گوی انتخاب شما هستیم</span>
        </div>
      </section>

      <section className="px-4 py-12 md:px-[max(28px,calc((100vw-1224px)/2))] md:py-[70px]">
        <SectionTitle
          eyebrow="روایت مشتریان"
          title="قهوه‌دوست‌ها درباره ما چه می‌گویند؟"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {[
            "کیفیت دانه‌ها واقعاً متفاوت است. بسته‌بندی حرفه‌ای بود و عطر قهوه از لحظه باز کردن فوق‌العاده بود.",
            "برای خرید آسیاب راهنمایی دقیقی گرفتم و خیلی سریع به دستم رسید. تجربه‌ای کاملاً رضایت‌بخش.",
            "ترکیب ویژه اسپرسو حالا انتخاب ثابت خانه ماست؛ طعم متعادل و کرمای بسیار خوبی دارد.",
          ].map((testimonial, index) => (
            <article
              className="rounded-[17px] border border-[var(--border-subtle)] bg-[var(--card)] p-[30px]"
              key={testimonial}
            >
              <div className="text-[var(--accent)]">★★★★★</div>

              <p className="leading-[2] text-[var(--text-secondary)]">
                «{testimonial}»
              </p>

              <b>{["مریم رضایی", "آرمان نادری", "نگار احمدی"][index]}</b>

              <small className="block text-[var(--text-muted)]">
                خریدار تأییدشده
              </small>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center justify-between gap-6 border-y border-[var(--border-subtle)] bg-[var(--primary)] px-4 py-9 text-[var(--on-dark-primary)] md:flex-row md:px-[max(28px,calc((100vw-1100px)/2))] md:py-[50px]">
        <div className="grid grid-cols-[50px_1fr]">
          <Mail className="row-span-2 text-[var(--on-dark-primary)]" />

          <h2 className="m-0 text-[var(--on-dark-primary)]">
            یک فنجان خبر خوب
          </h2>

          <p className="m-0 text-sm leading-[1.75] text-[var(--on-dark-secondary)]">
            برای دریافت پیشنهادهای ویژه و راهنمای دم‌آوری عضو خبرنامه شوید.
          </p>
        </div>

        <form
          className="grid w-full max-w-[520px] grid-cols-1 gap-1.5 rounded-xl bg-transparent p-0 sm:flex sm:bg-[var(--surface-elevated)] sm:p-[5px] md:w-auto"
          onSubmit={(event) => {
            event.preventDefault();
            alert("عضویت شما با موفقیت انجام شد.");
          }}
        >
          <input
            type="email"
            required
            placeholder="ایمیل شما"
            aria-label="ایمیل خبرنامه"
            className="min-h-11 w-full rounded-lg border-0 bg-[var(--surface-elevated)] p-2.5 text-[var(--text-primary)] outline-0 sm:w-[280px] sm:bg-transparent"
          />

          <button className="min-h-11 rounded-[9px] border-0 bg-[var(--primary)] px-5 py-2.5 text-[var(--on-dark-primary)] sm:min-h-0">
            عضویت در خبرنامه
          </button>
        </form>
      </section>
    </>
  );
}
