import { Trash2 } from 'lucide-react'

type ConfirmDialogProps = {
  title: string
  text: string
  close: () => void
  accept: () => void
}

export function ConfirmDialog({
  title,
  text,
  close,
  accept,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[var(--overlay)] p-2.5 sm:p-5">
      <div className="max-h-[calc(100dvh-20px)] w-full max-w-[400px] overflow-y-auto rounded-[18px] bg-[var(--surface-elevated)] px-3.5 py-[18px] text-center sm:p-[30px]">
        <span className="mx-auto grid h-[55px] w-[55px] place-items-center rounded-full bg-[color-mix(in_srgb,var(--danger)_13%,var(--surface))] text-[var(--danger)]">
          <Trash2 />
        </span>
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <button className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-[22px] py-3 font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--surface-muted)]" onClick={close}>
            انصراف
          </button>
          <button className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border-0 bg-[var(--danger)] px-[22px] py-3 font-semibold text-[var(--on-dark-primary)] hover:bg-[color-mix(in_srgb,var(--danger)_86%,var(--text-primary))]" onClick={accept}>
            بله، حذف شود
          </button>
        </div>
      </div>
    </div>
  )
}
