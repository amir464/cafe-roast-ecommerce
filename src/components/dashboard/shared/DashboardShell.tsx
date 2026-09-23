import { useEffect, useState, type ComponentType } from 'react'
import { Coffee, LogOut, Menu, Store, X } from 'lucide-react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

export type DashboardNavigationItem = {
  label: string
  path: string
  icon: ComponentType<{ size?: number }>
}

type DashboardShellProps = {
  navigation: DashboardNavigationItem[]
  contextLabel: string
  heading: string
}

export function DashboardShell({
  navigation,
  contextLabel,
  heading,
}: DashboardShellProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('drawer-open', open)
    return () => document.body.classList.remove('drawer-open')
  }, [open])

  return (
    <div className="min-h-screen bg-[var(--background)] lg:grid lg:grid-cols-[270px_minmax(0,1fr)]">
      {open && (
        <button
          className="fixed inset-0 z-[90] block border-0 bg-[var(--overlay)] backdrop-blur-[4px] lg:hidden"
          aria-label="بستن منو"
          onClick={() => setOpen(false)}
        />
      )}
      <aside className={`fixed inset-y-0 right-0 z-[100] flex h-[100dvh] w-[min(85vw,320px)] flex-col overflow-y-auto bg-[var(--sidebar)] px-[17px] py-[25px] text-[var(--text-secondary)] shadow-[-16px_0_45px_var(--shadow)] transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:w-[270px] lg:translate-x-0 lg:shadow-none ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center gap-2.5 px-2.5 pb-7">
          <Coffee className="h-[42px] w-[42px] rounded-full bg-[var(--primary)] p-[9px] text-[var(--on-dark-primary)]" />
          <div className="flex flex-col">
            <b className="text-[21px] text-[var(--text-primary)]">کافه روست</b>
            <small className="text-[10px] tracking-[2px] text-[var(--text-secondary)]">{contextLabel}</small>
          </div>
        </div>
        <button
          className="absolute left-3 top-3 grid min-h-11 min-w-11 place-items-center rounded-lg border-0 bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-muted)] lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="بستن منو"
        >
          <X />
        </button>
        <nav className="flex flex-col gap-[5px]">
          {navigation.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `flex min-h-11 items-center gap-3 rounded-[10px] px-3.5 py-3 text-sm leading-[1.6] hover:bg-[var(--active-nav-bg)] hover:text-[var(--accent)] ${isActive ? 'bg-[var(--active-nav-bg)] text-[var(--accent)] shadow-[inset_0_0_0_1px_var(--active-nav-border)] [&_svg]:text-[var(--interactive)]' : ''}`}
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
          <Link className="flex min-h-11 items-center gap-3 rounded-[10px] px-3.5 py-3 text-sm hover:bg-[var(--active-nav-bg)] hover:text-[var(--accent)]" to="/" onClick={() => setOpen(false)}>
            <Store size={20} />
            مشاهده فروشگاه
          </Link>
        </nav>
        <button
          className="mt-auto flex min-h-11 items-center gap-2.5 border-0 bg-transparent p-[13px] text-sm text-[var(--text-secondary)] hover:text-[var(--danger)]"
          onClick={() => {
            logout()
            navigate('/')
          }}
        >
          <LogOut /> خروج از حساب
        </button>
      </aside>
      <div className="min-w-0 w-full">
        <header className="flex min-h-[70px] items-center justify-between gap-2.5 border-b border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-2.5 md:h-[78px] md:px-[30px] md:py-0">
          <button
            className="grid min-h-11 min-w-11 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="باز کردن منو"
          >
            <Menu />
          </button>
          <div className="hidden min-w-0 sm:block">
            <h2 className="m-0 text-[17px]">{heading}</h2>
            <p className="my-[3px] text-xs text-[var(--text-muted)]">
              سلام {user?.firstName}، روز خوبی داشته باشید
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-[41px] w-[41px] place-items-center rounded-full bg-[var(--surface-muted)] font-extrabold text-[var(--interactive)]">{user?.firstName.charAt(0)}</span>
            <div className="hidden flex-col text-[13px] sm:flex">
              <b>
                {user?.firstName} {user?.lastName}
              </b>
              <small className="text-xs text-[var(--text-muted)]">{contextLabel}</small>
            </div>
          </div>
        </header>
        <main className="mx-0 w-full min-w-0 px-3 py-4 sm:px-4 sm:py-5 md:px-5 md:py-6 xl:px-10 xl:py-[30px]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
