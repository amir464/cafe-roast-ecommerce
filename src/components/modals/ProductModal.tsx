import { useState } from 'react'
import { X } from 'lucide-react'
import categories from '../../data/categories.json'
import type { Product } from '../../types'

type ProductModalProps = {
  product: Product
  close: () => void
  save: (product: Product) => void
}

export function ProductModal({ product, close, save }: ProductModalProps) {
  const [form, setForm] = useState(product)

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[var(--overlay)] p-2.5 sm:p-5">
      <div className="max-h-[calc(100dvh-20px)] w-full max-w-[620px] overflow-y-auto rounded-[18px] bg-[var(--surface-elevated)] px-3.5 py-[18px] sm:max-h-[calc(100dvh-40px)] sm:p-[25px]">
        <div className="flex justify-between gap-4">
          <div>
            <h2>
              {product.title === 'محصول جدید'
                ? 'افزودن محصول'
                : 'ویرایش محصول'}
            </h2>
            <p>اطلاعات محصول را کامل و دقیق وارد کنید.</p>
          </div>
          <button className="shrink-0 self-start rounded-lg p-2 hover:bg-[var(--surface-muted)]" onClick={close} aria-label="بستن پنجره">
            <X />
          </button>
        </div>
        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-[17px] [&_input]:mt-[7px] [&_input]:block [&_input]:w-full [&_input]:rounded-[10px] [&_input]:border [&_input]:border-[var(--border)] [&_input]:bg-[var(--surface)] [&_input]:p-[11px] [&_label]:text-sm [&_label]:font-semibold [&_select]:mt-[7px] [&_select]:block [&_select]:w-full [&_select]:rounded-[10px] [&_select]:border [&_select]:border-[var(--border)] [&_select]:bg-[var(--surface)] [&_select]:p-[11px] [&_textarea]:mt-[7px] [&_textarea]:block [&_textarea]:w-full [&_textarea]:rounded-[10px] [&_textarea]:border [&_textarea]:border-[var(--border)] [&_textarea]:bg-[var(--surface)] [&_textarea]:p-[11px]">
          <label>
            نام محصول
            <input
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
            />
          </label>
          <label>
            دسته‌بندی
            <select
              value={form.categoryId}
              onChange={(event) => {
                const category = categories.find(
                  (item) => item.id === event.target.value,
                )!
                setForm({
                  ...form,
                  categoryId: category.id,
                  categoryName: category.name,
                })
              }}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            قیمت (تومان)
            <input
              type="number"
              value={form.price}
              onChange={(event) =>
                setForm({ ...form, price: Number(event.target.value) })
              }
            />
          </label>
          <label>
            موجودی
            <input
              type="number"
              value={form.stock}
              onChange={(event) =>
                setForm({ ...form, stock: Number(event.target.value) })
              }
            />
          </label>
          <label className="sm:col-span-2">
            توضیح کوتاه
            <textarea
              value={form.shortDescription}
              onChange={(event) =>
                setForm({ ...form, shortDescription: event.target.value })
              }
            />
          </label>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-between">
          <button className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-[22px] py-3 font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--surface-muted)]" onClick={close}>
            انصراف
          </button>
          <button className="inline-flex min-h-11 items-center justify-center rounded-xl border-0 bg-[var(--primary)] px-[22px] py-3 font-semibold text-white hover:bg-[var(--primary-hover)]" onClick={() => save(form)}>
            ذخیره محصول
          </button>
        </div>
      </div>
    </div>
  )
}
