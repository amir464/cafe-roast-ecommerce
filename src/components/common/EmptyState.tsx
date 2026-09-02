import { ShoppingBag } from 'lucide-react'

type EmptyStateProps = {
  title: string
  description: string
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="rounded-[18px] border border-dashed border-[var(--border)] px-5 py-[70px] text-center text-[var(--text-muted)]">
      <ShoppingBag className="mx-auto" size={42} />

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  )
}
