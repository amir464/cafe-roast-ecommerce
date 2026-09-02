import {
  Minus,
  Plus,
} from 'lucide-react'

type QuantitySelectorProps = {
  value: number
  onChange: (value: number) => void
}

export function QuantitySelector({
  value,
  onChange,
}: QuantitySelectorProps) {
  return (
    <div className="flex w-max items-center overflow-hidden rounded-[11px] border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]">
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="افزایش تعداد"
        className="border-0 bg-[var(--surface)] p-3 hover:bg-[var(--surface-muted)]"
      >
        <Plus size={17} />
      </button>

      <span className="min-w-[30px] text-center">{value.toLocaleString('fa-IR')}</span>

      <button
        type="button"
        onClick={() =>
          onChange(Math.max(1, value - 1))
        }
        aria-label="کاهش تعداد"
        className="border-0 bg-[var(--surface)] p-3 hover:bg-[var(--surface-muted)]"
      >
        <Minus size={17} />
      </button>
    </div>
  )
}
