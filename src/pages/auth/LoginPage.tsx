import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { AuthShell } from '../../components/auth/AuthShell'
import { useAuth } from '../../contexts/AuthContext'

const loginSchema = z.object({
  identity: z.string().min(1, 'ایمیل یا شماره موبایل را وارد کنید.'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد.'),
  remember: z.boolean().optional(),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginPage() {
  const { login } = useAuth()
  const navg = useNavigate()
  const loc = useLocation()
  const [show, setShow] = useState(false)
  const [serverError, setServerError] = useState('')
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { remember: true },
  })

  const submit = async (d: LoginForm) => {
    await new Promise((r) => setTimeout(r, 500))

    try {
      const u = login(d.identity, d.password)
      const intended = (loc.state as { from?: string } | null)?.from
      const allowed = Boolean(
        intended &&
          (u.role === 'admin'
            ? intended.startsWith('/admin/')
            : intended.startsWith('/user/')),
      )

      navg(
        allowed
          ? intended!
          : u.role === 'admin'
            ? '/admin/dashboard'
            : '/user/dashboard',
        { replace: true },
      )
    } catch (e) {
      setServerError((e as Error).message)
    }
  }

  return (
    <AuthShell
      title="خوش آمدید"
      subtitle="برای ادامه وارد حساب کافه روست شوید"
    >
      <form className="mt-[25px] grid gap-[17px] [&_i]:block [&_i]:text-xs [&_i]:not-italic [&_i]:leading-[1.6] [&_i]:text-[var(--danger)] [&_input:not([type=checkbox])]:mt-[7px] [&_input:not([type=checkbox])]:block [&_input:not([type=checkbox])]:w-full [&_input:not([type=checkbox])]:rounded-[10px] [&_input:not([type=checkbox])]:border [&_input:not([type=checkbox])]:border-[var(--border)] [&_input:not([type=checkbox])]:bg-[var(--surface)] [&_input:not([type=checkbox])]:p-[11px] [&_label]:text-sm [&_label]:font-semibold" onSubmit={handleSubmit(submit)}>
        <label>
          ایمیل یا شماره موبایل
          <input
            {...register('identity')}
            placeholder="example@email.com"
          />
          <i>{errors.identity?.message}</i>
        </label>

        <label>
          رمز عبور
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              {...register('password')}
              placeholder="حداقل ۶ کاراکتر"
            />
            <button className="absolute left-[7px] top-[11px] border-0 bg-transparent p-2 text-[var(--text-primary)]"
              type="button"
              onClick={() => setShow(!show)}
              aria-label="نمایش یا پنهان کردن رمز"
            >
              {show ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <i>{errors.password?.message}</i>
        </label>

        <div className="flex flex-wrap justify-between gap-3 text-[13px]">
          <label className="flex items-center gap-[5px]">
            <input type="checkbox" {...register('remember')} /> مرا به خاطر بسپار
          </label>
          <a href="#forgot">رمز عبور را فراموش کرده‌ام</a>
        </div>

        {serverError && <div className="rounded-[9px] bg-[color-mix(in_srgb,var(--danger)_13%,var(--surface))] p-2.5 text-xs text-[var(--danger)]">{serverError}</div>}

        <button className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-[22px] py-3 text-[15px] font-semibold text-[var(--on-dark-primary)] hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting}>
          {isSubmitting ? 'در حال ورود...' : 'ورود به حساب کاربری'}
        </button>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 [&_button]:min-h-11 [&_button]:rounded-lg [&_button]:border [&_button]:border-[var(--border)] [&_button]:bg-[var(--surface)] [&_button]:p-[9px] [&_button]:text-[13px]">
          <span className="text-center text-xs sm:col-span-2">ورود سریع حساب آزمایشی</span>
          <button
            type="button"
            onClick={() => {
              setValue('identity', 'user@caferoast.ir')
              setValue('password', '123456')
            }}
          >
            حساب مشتری
          </button>
          <button
            type="button"
            onClick={() => {
              setValue('identity', 'admin@caferoast.ir')
              setValue('password', '123456')
            }}
          >
            حساب مدیر
          </button>
        </div>

        <p className="text-center text-[13px] leading-[1.6]">
          حساب ندارید؟ <Link to="/register">ثبت‌نام کنید</Link>
        </p>
      </form>
    </AuthShell>
  )
}
