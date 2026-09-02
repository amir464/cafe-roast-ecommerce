type SectionTitleProps = {
  eyebrow?: string
  title: string
  description?: string
}

export function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mb-[42px] text-center">
      {eyebrow && <span className="text-[13px] font-bold leading-[1.6] text-[var(--accent)]">{eyebrow}</span>}
      <h2 className="my-2 text-[clamp(25px,7vw,32px)] font-bold text-[var(--text-primary)]">{title}</h2>
      {description && <p className="leading-[1.85] text-[var(--text-secondary)]">{description}</p>}
    </div>
  )
}
