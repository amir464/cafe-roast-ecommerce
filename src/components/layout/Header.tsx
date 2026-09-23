import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CircleUserRound, Coffee, Menu, ShoppingBag, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useStore } from "../../contexts/StoreContext";
import { formatNumber } from "../../utils/format";

const nav = [
  ["/", "خانه"],
  ["/shop", "فروشگاه"],
  ["/about", "درباره ما"],
  ["/contact", "تماس با ما"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useStore();
  const { user } = useAuth();

  useEffect(() => {
    document.body.classList.toggle("drawer-open", open);
    return () => document.body.classList.remove("drawer-open");
  }, [open]);

  return (
    <>
      <div className="border-b border-[var(--border)] bg-[var(--background-secondary)] px-2 py-[7px] text-center text-[clamp(9px,3vw,13px)] leading-[1.6] text-[var(--text-secondary)]">
        ارسال رایگان برای سفارش‌های بیشتر از ۱٬۵۰۰٬۰۰۰ تومان
      </div>
      <header className="relative z-20 mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-2 border-b border-[var(--border-subtle)] bg-[var(--header-bg)] px-3 sm:px-5 md:px-7">
        <Link
          className="flex min-w-0 items-center gap-2.5 text-[var(--interactive)]"
          to="/"
        >
          <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-[var(--primary)] text-[var(--on-dark-primary)] sm:h-[42px] sm:w-[42px]">
            <Coffee />
          </span>
          <div className="flex min-w-0 flex-col">
            <b className="whitespace-nowrap text-sm text-[var(--text-primary)] md:text-[21px]">
              کافه روست
            </b>
            <small className="block text-[10px] tracking-[2px] text-[var(--text-secondary)]">
              CAFE ROAST
            </small>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map(([to, label]) => (
            <NavLink
              className={({ isActive }) =>
                `text-[15px] leading-[1.6] text-[var(--interactive)] ${isActive ? "font-bold text-[var(--interactive)]" : "text-[var(--text-secondary)]"}`
              }
              key={to}
              to={to}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2.5">
          <Link
            className="hidden h-[41px] w-[41px] place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--interactive)] hover:bg-[var(--surface-muted)] hover:text-[var(--interactive-hover)] sm:grid"
            to={
              user
                ? user.role === "admin"
                  ? "/admin/dashboard"
                  : "/user/dashboard"
                : "/login"
            }
            aria-label="حساب کاربری"
          >
            <CircleUserRound />
          </Link>
          <Link
            className="relative grid h-10 w-10 place-items-center overflow-visible rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--interactive)] hover:bg-[var(--surface-muted)] hover:text-[var(--interactive-hover)] sm:h-[41px] sm:w-[41px]"
            to="/cart"
            aria-label="سبد خرید"
          >
            <ShoppingBag />
            <span className="absolute -left-1.5 -top-[7px] flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--cart-badge)] px-[5px] text-[10px] font-bold leading-none text-[var(--cart-badge-text)]">
              {formatNumber(cartCount)}
            </span>
          </Link>
          {!user && (
            <Link
              className="hidden rounded-[11px] bg-[var(--primary)] px-[17px] py-2.5 text-sm text-[var(--on-primary)] hover:bg-[var(--primary-hover)] md:block"
              to="/login"
            >
              ورود / ثبت‌نام
            </Link>
          )}
          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--interactive)] hover:bg-[var(--surface-muted)] hover:text-[var(--interactive-hover)] sm:h-[41px] sm:w-[41px] md:hidden"
            onClick={() => setOpen(true)}
            aria-label="باز کردن منو"
          >
            <Menu />
          </button>
        </div>
      </header>
      {open && (
        <div
          className="fixed inset-0 z-[90] bg-[var(--overlay)] md:hidden"
          onClick={() => setOpen(false)}
        >
          <aside
            className="flex h-full w-[min(85vw,340px)] max-w-full flex-col gap-[22px] overflow-y-auto bg-[var(--surface-elevated)] p-[25px] text-[var(--interactive)] shadow-[-16px_0_45px_var(--shadow)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end rounded-lg p-2 hover:bg-[var(--surface-muted)]"
              onClick={() => setOpen(false)}
              aria-label="بستن منو"
            >
              <X />
            </button>
            <div className="flex items-center gap-2.5">
              <Coffee className="h-[42px] w-[42px] rounded-full bg-[var(--primary)] p-[9px] text-[var(--on-dark-primary)]" />
              <b>کافه روست</b>
            </div>
            {nav.map(([to, label]) => (
              <NavLink
                className={({ isActive }) =>
                  `flex min-h-11 items-center rounded-lg px-2 ${isActive ? "font-bold text-[var(--interactive)]" : "text-[var(--text-secondary)]"}`
                }
                key={to}
                to={to}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              className="flex min-h-11 items-center rounded-lg px-2 text-[var(--text-secondary)]"
              to="/login"
            >
              ورود به حساب کاربری
            </NavLink>
          </aside>
        </div>
      )}
    </>
  );
}
