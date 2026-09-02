import { Coffee } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="px-5 py-[100px] text-center">
      <Coffee className="mx-auto h-[70px] w-[70px]" />
      <h1>۴۰۴</h1>
      <h2>این صفحه پیدا نشد</h2>
      <p>شاید آدرس را اشتباه وارد کرده‌اید یا صفحه جابه‌جا شده است.</p>
      <Link className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-[22px] py-3 font-semibold text-white hover:bg-[var(--primary-hover)]" to="/">
        بازگشت به خانه
      </Link>
    </div>
  )
}
