import { useState } from 'react'
import { CrudHeader } from '../../components/dashboard/shared/CrudHeader'
import { useAuth } from '../../contexts/AuthContext'

export function Profile() {
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    phone: user?.phone ?? '',
    email: user?.email ?? '',
  })

  return (
    <>
      <CrudHeader
        title="تنظیمات پروفایل"
        text="اطلاعات شخصی و امنیت حساب خود را ویرایش کنید"
      />
      <section className="mb-[15px] min-w-0 rounded-[15px] border border-[var(--border-subtle)] bg-[var(--card)] p-[18px] sm:p-5">
        <h3>اطلاعات شخصی</h3>
        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-[17px] [&_input]:mt-[7px] [&_input]:block [&_input]:w-full [&_input]:rounded-[10px] [&_input]:border [&_input]:border-[var(--border)] [&_input]:bg-[var(--surface)] [&_input]:p-[11px] [&_label]:text-sm [&_label]:font-semibold">
          <label>
            نام
            <input
              value={form.firstName}
              onChange={(event) =>
                setForm({ ...form, firstName: event.target.value })
              }
            />
          </label>
          <label>
            نام خانوادگی
            <input
              value={form.lastName}
              onChange={(event) =>
                setForm({ ...form, lastName: event.target.value })
              }
            />
          </label>
          <label>
            شماره موبایل
            <input
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: event.target.value })
              }
            />
          </label>
          <label>
            ایمیل
            <input
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />
          </label>
        </div>
        <button className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--primary)] px-[22px] py-3 font-semibold text-[var(--on-dark-primary)] hover:bg-[var(--primary-hover)]" onClick={() => updateProfile(form)}>
          ذخیره تغییرات
        </button>
      </section>
      <section className="min-w-0 rounded-[15px] border border-[var(--border-subtle)] bg-[var(--card)] p-[18px] sm:p-5">
        <h3>تغییر رمز عبور</h3>
        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-[17px] [&_input]:mt-[7px] [&_input]:block [&_input]:w-full [&_input]:rounded-[10px] [&_input]:border [&_input]:border-[var(--border)] [&_input]:bg-[var(--surface)] [&_input]:p-[11px] [&_label]:text-sm [&_label]:font-semibold">
          <label>
            رمز عبور فعلی
            <input type="password" />
          </label>
          <label>
            رمز عبور جدید
            <input type="password" />
          </label>
        </div>
        <button className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-[22px] py-3 font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--surface-muted)]">به‌روزرسانی رمز عبور</button>
      </section>
    </>
  )
}
