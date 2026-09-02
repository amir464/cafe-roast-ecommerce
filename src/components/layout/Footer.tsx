import { Coffee } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-[var(--footer-border)] bg-[var(--footer-bg)] px-4 pb-5 pt-12 text-[var(--footer-text)] sm:px-7 md:pt-[65px] xl:px-[max(28px,calc((100vw-1224px)/2))]">
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:gap-[60px] lg:grid-cols-[2fr_1fr_1fr_1.5fr] [&_a]:my-[5px] [&_a]:block [&_a]:text-sm [&_a]:leading-[1.85] [&_a]:text-[var(--footer-text)] [&_a:hover]:text-[var(--accent)] [&_h4]:text-[17px] [&_h4]:font-semibold [&_h4]:text-[var(--footer-heading)] [&_p]:my-[5px] [&_p]:text-sm [&_p]:leading-[1.85] [&_p]:text-[var(--footer-text-secondary)]">
        <div>
          <div className="flex items-center gap-2.5">
            <Coffee className="h-[42px] w-[42px] rounded-full bg-[var(--primary)] p-[9px] text-white" />
            <b className="text-[var(--footer-heading)]">کافه روست</b>
          </div>
          <p>
            از انتخاب بهترین دانه‌ها تا رست دقیق؛ کنار شما هستیم تا هر روز یک
            فنجان بهتر بنوشید.
          </p>
        </div>
        <div>
          <h4>دسترسی سریع</h4>
          <Link to="/shop">فروشگاه</Link>
          <Link to="/about">درباره ما</Link>
          <Link to="/contact">تماس با ما</Link>
        </div>
        <div>
          <h4>خدمات مشتریان</h4>
          <Link to="/user/orders">پیگیری سفارش</Link>
          <a href="#faq">پرسش‌های متداول</a>
          <a href="#return">شرایط بازگشت</a>
        </div>
        <div>
          <h4>با ما در تماس باشید</h4>
          <p>تهران، خیابان کریمخان، پلاک ۱۲۸</p>
          <p>۰۲۱-۸۸۷۷۶۶۵۵</p>
          <p>hello@caferoast.ir</p>
        </div>
      </div>
      <div className="mt-[45px] border-t border-[var(--footer-border)] pt-[18px] text-center text-[13px] leading-[1.7] text-[var(--footer-text-secondary)]">
        © ۱۴۰۵ کافه روست؛ تمامی حقوق محفوظ است.
      </div>
    </footer>
  )
}
