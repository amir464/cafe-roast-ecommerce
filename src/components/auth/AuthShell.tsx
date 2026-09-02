import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Coffee } from 'lucide-react'

type AuthShellProps = {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthShell({
  title,
  subtitle,
  children,
}: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(135deg,var(--background-secondary),var(--surface-elevated))] px-4 py-5 sm:p-[35px]">
      <Link className="mb-[25px] flex items-center gap-2.5 text-[var(--primary)]" to="/">
        <Coffee className="h-[42px] w-[42px] rounded-full bg-[var(--primary)] p-[9px] text-white" />
        <div className="flex flex-col">
          <b className="text-[21px] text-[var(--text-primary)]">کافه روست</b>
          <small className="text-[10px] tracking-[2px] text-[var(--text-secondary)]">CAFE ROAST</small>
        </div>
      </Link>

      <div className="w-full max-w-[580px] rounded-[22px] border border-[var(--border)] bg-[var(--surface-elevated)] px-3.5 py-5 text-[var(--text-primary)] sm:p-8">
        <div className="text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--surface-muted)] text-[var(--primary)]">
            <Coffee />
          </span>
          <h1 className="mb-[3px] mt-[13px] text-[27px]">{title}</h1>
          <p className="text-sm leading-[1.75] text-[var(--text-secondary)]">{subtitle}</p>
        </div>

        {children}
      </div>

      <Link className="mt-5 text-[13px] leading-[1.6]" to="/">بازگشت به فروشگاه</Link>
    </div>
  )
}
