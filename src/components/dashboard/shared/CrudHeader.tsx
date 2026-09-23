import { Plus } from 'lucide-react'

type CrudHeaderProps = {
  title: string
  text: string
  action?: string
  onAction?: () => void
}

export function CrudHeader({
  title,
  text,
  action,
  onAction,
}: CrudHeaderProps) {
  return (
    <div className="mb-6 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
      <div className="min-w-0">
        <h1 className="m-0 text-[clamp(21px,5vw,26px)]">{title}</h1>
        <p className="my-1 text-[13px] leading-[1.65] text-[var(--text-muted)]">{text}</p>
      </div>
      {action && (
        <button className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border-0 bg-[var(--primary)] px-[22px] py-3 font-semibold text-[var(--on-dark-primary)] hover:bg-[var(--primary-hover)] sm:w-auto" onClick={onAction}>
          <Plus /> {action}
        </button>
      )}
    </div>
  )
}
