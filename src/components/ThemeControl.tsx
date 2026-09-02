import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export function ThemeControl() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className="fixed bottom-[18px] left-[18px] z-[120] flex h-11 items-center gap-2 rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-3.5 text-[var(--text-primary)] shadow-[0_10px_30px_var(--shadow)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--surface-muted)]"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? 'فعال‌کردن تم رست روشن'
          : 'فعال‌کردن تم رست تیره'
      }
      title={isDark ? 'تم رست روشن' : 'تم رست تیره'}
    >
      {isDark ? <Sun className="w-[18px]" /> : <Moon className="w-[18px]" />}
      <span className="text-[13px] font-bold">{isDark ? 'رست روشن' : 'رست تیره'}</span>
    </button>
  )
}
