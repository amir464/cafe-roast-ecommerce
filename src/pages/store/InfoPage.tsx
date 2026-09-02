import { Mail, MapPin, Phone } from 'lucide-react'

type InfoPageProps = {
  contact?: boolean
}

export function InfoPage({ contact = false }: InfoPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-3 pb-[90px] pt-[30px] sm:px-4 md:px-7">
      <div className="py-[35px] text-center md:py-[55px]">
        <span className="text-[13px] font-bold text-[var(--accent)]">{contact ? 'همراه شما هستیم' : 'داستان ما'}</span>
        <h1 className="m-2.5 text-[clamp(25px,7vw,41px)]">
          {contact
            ? 'با ما در تماس باشید'
            : 'قهوه خوب، از انتخاب خوب شروع می‌شود'}
        </h1>
        <p className="leading-[1.85] text-[var(--text-secondary)]">
          {contact
            ? 'برای مشاوره خرید، پیگیری سفارش یا یک گفت‌وگوی قهوه‌ای پیام دهید.'
            : 'کافه روست با عشق به قهوه و احترام به تجربه شما شکل گرفت.'}
        </p>
      </div>
      {contact ? (
        <div className="grid grid-cols-1 gap-[25px] md:grid-cols-[2fr_1fr]">
          <section className="min-w-0 rounded-[15px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-[18px] md:p-5">
            <h2>پیام شما</h2>
            <div className="my-5 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-[17px] [&_input]:mt-[7px] [&_input]:block [&_input]:w-full [&_input]:rounded-[10px] [&_input]:border [&_input]:border-[var(--border)] [&_input]:bg-[var(--surface)] [&_input]:p-[11px] [&_label]:text-sm [&_label]:font-semibold [&_textarea]:mt-[7px] [&_textarea]:block [&_textarea]:w-full [&_textarea]:rounded-[10px] [&_textarea]:border [&_textarea]:border-[var(--border)] [&_textarea]:bg-[var(--surface)] [&_textarea]:p-[11px]">
              <label>
                نام و نام خانوادگی
                <input />
              </label>
              <label>
                شماره تماس
                <input />
              </label>
              <label className="md:col-span-2">
                موضوع
                <input />
              </label>
              <label className="md:col-span-2">
                متن پیام
                <textarea rows={5} />
              </label>
            </div>
            <button className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-[22px] py-3 font-semibold text-white hover:bg-[var(--primary-hover)]">ارسال پیام</button>
          </section>
          <aside className="grid gap-3 [&>div]:rounded-[15px] [&>div]:bg-[var(--surface-muted)] [&>div]:p-[25px]">
            <div>
              <Phone />
              <h3>تماس تلفنی</h3>
              <p>۰۲۱-۸۸۷۷۶۶۵۵</p>
            </div>
            <div>
              <Mail />
              <h3>ایمیل</h3>
              <p>hello@caferoast.ir</p>
            </div>
            <div>
              <MapPin />
              <h3>فروشگاه</h3>
              <p>تهران، خیابان کریمخان، پلاک ۱۲۸</p>
            </div>
          </aside>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-center gap-[55px] md:grid-cols-2">
          <img className="h-auto w-full rounded-[25px] object-cover md:h-[470px]" src="/images/cafe-editorial.png" alt="فضای گرم کافه روست" />
          <div>
            <h2>رست دقیق، طعم صادقانه</h2>
            <p className="leading-[2.1] text-[var(--text-secondary)]">
              ما از سال ۱۳۹۸ با یک هدف ساده شروع کردیم: دسترسی آسان‌تر به قهوه
              تازه و باکیفیت. هر دانه با شناخت خاستگاه انتخاب می‌شود و در
              پروفایلی دقیق رست می‌شود تا بهترین ویژگی‌های طعمی آن در فنجان شما
              دیده شود.
            </p>
            <p className="leading-[2.1] text-[var(--text-secondary)]">
              تیم ما از باریستاها و متخصصان رست تشکیل شده و همیشه آماده است تا
              متناسب با ذائقه و ابزار شما، بهترین انتخاب را پیشنهاد دهد.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-[34px] [&>div]:flex [&>div]:min-w-[82px] [&>div]:flex-col [&_b]:text-xl [&_span]:text-xs [&_span]:text-[var(--text-muted)]">
              <div>
                <b>+۶</b>
                <span>سال تجربه</span>
              </div>
              <div>
                <b>+۲۰</b>
                <span>خاستگاه قهوه</span>
              </div>
              <div>
                <b>+۱۲۰۰</b>
                <span>مشتری وفادار</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
