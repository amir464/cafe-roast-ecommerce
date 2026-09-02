export function Settings() {
  return (
    <>
      <div className="mb-6">
        <div>
          <h1 className="m-0 text-[clamp(21px,5vw,26px)]">تنظیمات فروشگاه</h1>
          <p className="my-1 text-[13px] text-[var(--text-muted)]">اطلاعات عمومی و تنظیمات نمایش فروشگاه</p>
        </div>
      </div>

      <section className="min-w-0 rounded-[15px] border border-[var(--border-subtle)] bg-[var(--card)] p-[18px] sm:p-5">
        <h3>اطلاعات عمومی</h3>
        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-[17px] [&_input]:mt-[7px] [&_input]:block [&_input]:w-full [&_input]:rounded-[10px] [&_input]:border [&_input]:border-[var(--border)] [&_input]:bg-[var(--surface)] [&_input]:p-[11px] [&_label]:text-sm [&_label]:font-semibold [&_textarea]:mt-[7px] [&_textarea]:block [&_textarea]:w-full [&_textarea]:rounded-[10px] [&_textarea]:border [&_textarea]:border-[var(--border)] [&_textarea]:bg-[var(--surface)] [&_textarea]:p-[11px]">
          <label>
            نام فروشگاه
            <input defaultValue="کافه روست" />
          </label>
          <label>
            شماره تماس
            <input defaultValue="۰۲۱-۸۸۷۷۶۶۵۵" />
          </label>
          <label>
            ایمیل پشتیبانی
            <input defaultValue="hello@caferoast.ir" />
          </label>
          <label>
            حد ارسال رایگان
            <input defaultValue="۱٬۵۰۰٬۰۰۰ تومان" />
          </label>
          <label className="sm:col-span-2">
            آدرس
            <textarea defaultValue="تهران، خیابان کریمخان، پلاک ۱۲۸" />
          </label>
        </div>
        <button className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--primary)] px-[22px] py-3 font-semibold text-white hover:bg-[var(--primary-hover)]">ذخیره تغییرات</button>
      </section>
    </>
  )
}
