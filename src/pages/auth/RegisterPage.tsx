import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { AuthShell } from '../../components/auth/AuthShell'
import { useAuth } from '../../contexts/AuthContext'

const registerSchema = z
  .object({
    firstName: z.string().min(2, 'نام باید حداقل ۲ حرف باشد.'),
    lastName: z.string().min(2, 'نام خانوادگی را کامل وارد کنید.'),
    phone: z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست.'),
    email: z.string().email('ایمیل معتبر وارد کنید.'),
    password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد.'),
    confirm: z.string(),
    terms: z.literal(true, {
      message: 'پذیرش قوانین برای ثبت‌نام الزامی است.',
    }),
  })
  .refine((x) => x.password === x.confirm, {
    path: ['confirm'],
    message: 'تکرار رمز عبور یکسان نیست.',
  })

type RegisterForm = z.infer<typeof registerSchema>

const fields = [
  ['firstName', 'نام', 'سارا'],
  ['lastName', 'نام خانوادگی', 'محمدی'],
  ['phone', 'شماره موبایل', '09123456789'],
  ['email', 'ایمیل', 'example@email.com'],
  ['password', 'رمز عبور', 'حداقل ۶ کاراکتر'],
  ['confirm', 'تکرار رمز عبور', 'رمز عبور را تکرار کنید'],
] as const

export function RegisterPage() {
  const { register: registerUser } = useAuth()
  const [done, setDone] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) })

  if (done) {
    return (
      <AuthShell
        title="ثبت‌نام با موفقیت انجام شد"
        subtitle="حساب شما آماده استفاده است"
      >
        <div className="p-[30px] text-center">
          <CheckCircle2 className="mx-auto h-[60px] w-[60px] text-[var(--success)]" />
          <p>اکنون می‌توانید با اطلاعات خود وارد شوید.</p>
          <Link className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-[22px] py-3 font-semibold text-[var(--on-dark-primary)] hover:bg-[var(--primary-hover)]" to="/login">
            ورود به حساب
          </Link>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title="ساخت حساب جدید"
      subtitle="به جمع دوست‌داران قهوه بپیوندید"
    >
      <form
        className="mt-[25px] grid grid-cols-1 gap-[17px] sm:grid-cols-2 [&_i]:block [&_i]:text-xs [&_i]:not-italic [&_i]:leading-[1.6] [&_i]:text-[var(--danger)] [&_input:not([type=checkbox])]:mt-[7px] [&_input:not([type=checkbox])]:block [&_input:not([type=checkbox])]:w-full [&_input:not([type=checkbox])]:rounded-[10px] [&_input:not([type=checkbox])]:border [&_input:not([type=checkbox])]:border-[var(--border)] [&_input:not([type=checkbox])]:bg-[var(--surface)] [&_input:not([type=checkbox])]:p-[11px] [&_label]:text-sm [&_label]:font-semibold"
        onSubmit={handleSubmit(async (d) => {
          await new Promise((r) => setTimeout(r, 400))
          registerUser(
            {
              firstName: d.firstName,
              lastName: d.lastName,
              phone: d.phone,
              email: d.email,
            },
            d.password,
          )
          setDone(true)
        })}
      >
        {fields.map(([name, label, placeholder]) => (
          <label key={name}>
            {label}
            <input
              type={
                name.includes('password') || name === 'confirm'
                  ? 'password'
                  : 'text'
              }
              {...register(name)}
              placeholder={placeholder}
            />
            <i>{errors[name]?.message}</i>
          </label>
        ))}

        <label className="flex flex-wrap items-center gap-2 sm:col-span-2">
          <input type="checkbox" {...register('terms')} /> قوانین و شرایط استفاده
          را می‌پذیرم
          <i>{errors.terms?.message}</i>
        </label>

        <button className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-[22px] py-3 font-semibold text-[var(--on-dark-primary)] hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2" disabled={isSubmitting}>
          ایجاد حساب کاربری
        </button>

        <p className="text-center text-[13px] leading-[1.6] sm:col-span-2">
          قبلاً ثبت‌نام کرده‌اید؟ <Link to="/login">وارد شوید</Link>
        </p>
      </form>
    </AuthShell>
  )
}
