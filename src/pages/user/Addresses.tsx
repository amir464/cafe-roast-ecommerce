import { Plus } from 'lucide-react'
import { CrudHeader } from '../../components/dashboard/shared/CrudHeader'

export function Addresses() {
  return (
    <>
      <CrudHeader
        title="آدرس‌های من"
        text="آدرس‌های ارسال سفارش را مدیریت کنید"
        action="افزودن آدرس"
      />
      <div className="grid grid-cols-1 gap-[15px] md:grid-cols-2">
        <article className="rounded-[15px] border border-[var(--border)] bg-[var(--surface-elevated)] p-[18px] sm:p-[23px] [&_button]:min-h-10 [&_button]:rounded-lg [&_button]:border [&_button]:border-[var(--border)] [&_button]:bg-[var(--surface)] [&_button]:px-3 [&_button]:py-2">
          <span className="inline-block rounded-full bg-[color-mix(in_srgb,var(--success)_13%,var(--surface))] px-[9px] py-[5px] text-xs text-[var(--success)]">آدرس پیش‌فرض</span>
          <h3>خانه</h3>
          <p>
            تهران، خیابان ولیعصر، بالاتر از پارک ساعی، کوچه یاس، پلاک ۲۴، واحد ۵
          </p>
          <small>کدپستی: ۱۵۱۶۸۱۳۴۵۶</small>
          <div className="mt-4 flex flex-wrap gap-2">
            <button>ویرایش</button>
            <button>حذف</button>
          </div>
        </article>
        <article className="grid min-h-[220px] place-items-center rounded-[15px] border border-dashed border-[var(--border)] bg-[var(--surface-elevated)] p-[23px] text-center [&>*]:my-1">
          <Plus />
          <h3>افزودن آدرس جدید</h3>
          <p>برای دریافت راحت‌تر سفارش‌ها</p>
        </article>
      </div>
    </>
  )
}
