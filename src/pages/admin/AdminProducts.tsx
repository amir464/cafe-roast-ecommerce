import { useState } from "react";
import { Pencil, Search, Trash2 } from "lucide-react";
import categories from "../../data/categories.json";
import { useStore } from "../../contexts/StoreContext";
import { CrudHeader } from "../../components/dashboard/shared/CrudHeader";
import { ConfirmDialog } from "../../components/modals/ConfirmDialog";
import { ProductModal } from "../../components/modals/ProductModal";
import type { Product } from "../../types";
import { formatNumber, formatPrice } from "../../utils/format";

export function AdminProducts() {
  const { products, saveProduct, deleteProduct } = useStore();

  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState<Product | null>(null);
  const [confirm, setConfirm] = useState<Product | null>(null);

  const shown = products.filter((product) => product.title.includes(search));

  const openNewProduct = () => {
    const template = products[0];

    if (!template) return;

    setEdit({
      ...template,
      id: crypto.randomUUID(),
      title: "",
      slug: `product-${Date.now()}`,
      image: "",
      gallery: [],
      price: 0,
      stock: 0,
      shortDescription: "",
    });
  };

  return (
    <>
      <CrudHeader
        title="مدیریت محصولات"
        text={`${formatNumber(products.length)} محصول فعال در فروشگاه`}
        action="افزودن محصول"
        onAction={openNewProduct}
      />

      <div className="mb-[15px] flex flex-wrap gap-2.5">
        <div className="flex w-full items-center rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-2.5 sm:w-[330px]">
          <Search className="w-[17px] text-[var(--text-muted)]" />

          <input
            placeholder="جست‌وجوی محصول..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full border-0 bg-transparent p-2.5 outline-0"
          />
        </div>

        <select className="min-h-11 max-w-full rounded-[9px] border border-[var(--border)] bg-[var(--surface)] p-2.5">
          <option>همه دسته‌بندی‌ها</option>

          {categories.map((category) => (
            <option key={category.id}>{category.name}</option>
          ))}
        </select>

        <select className="min-h-11 max-w-full rounded-[9px] border border-[var(--border)] bg-[var(--surface)] p-2.5">
          <option>همه وضعیت‌ها</option>
          <option>موجود</option>
          <option>رو به اتمام</option>
        </select>
      </div>

      <section className="w-full min-w-0 overflow-hidden rounded-[15px] border border-[var(--border-subtle)] bg-[var(--card)]">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse whitespace-nowrap text-right [&_td]:border-b [&_td]:border-[var(--border-subtle)] [&_td]:px-[17px] [&_td]:py-[13px] [&_th]:border-b [&_th]:border-[var(--border-subtle)] [&_th]:bg-[var(--surface)] [&_th]:px-[17px] [&_th]:py-[13px] [&_th]:text-[13px] [&_th]:text-[var(--text-muted)]">
            <thead>
              <tr>
                <th>محصول</th>
                <th>دسته‌بندی</th>
                <th>قیمت</th>
                <th>موجودی</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </thead>

            <tbody>
              {shown.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      {product.image ? (
                        <img
                          className="h-[45px] w-[45px] rounded-lg object-cover"
                          src={product.image}
                          alt={product.title}
                        />
                      ) : (
                        <div className="grid h-[45px] w-[45px] place-items-center rounded-lg bg-[var(--surface-muted)] text-[10px] text-[var(--text-muted)]">
                          بدون عکس
                        </div>
                      )}

                      <b>{product.title}</b>
                    </div>
                  </td>

                  <td>{product.categoryName}</td>

                  <td>{formatPrice(product.price)}</td>

                  <td>{formatNumber(product.stock)}</td>

                  <td>
                    <span
                      className={`inline-block rounded-full px-[9px] py-[5px] text-xs ${
                        product.stock < 8
                          ? "bg-[color-mix(in_srgb,var(--danger)_13%,var(--surface))] text-[var(--danger)]"
                          : "bg-[color-mix(in_srgb,var(--success)_13%,var(--surface))] text-[var(--success)]"
                      }`}
                    >
                      {product.stock ? "موجود" : "ناموجود"}
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-1.5 [&_button]:grid [&_button]:min-h-10 [&_button]:min-w-10 [&_button]:place-items-center [&_button]:rounded-[7px] [&_button]:border [&_button]:border-[var(--border)] [&_button]:bg-[var(--surface)] [&_button]:p-1.5 [&_svg]:w-[15px]">
                      <button
                        onClick={() => setEdit(product)}
                        aria-label={`ویرایش ${product.title}`}
                      >
                        <Pencil />
                      </button>

                      <button
                        onClick={() => setConfirm(product)}
                        aria-label={`حذف ${product.title}`}
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {edit && (
        <ProductModal
          product={edit}
          close={() => setEdit(null)}
          save={(product) => {
            saveProduct(product);
            setEdit(null);
          }}
        />
      )}

      {confirm && (
        <ConfirmDialog
          title="حذف محصول"
          text={`آیا از حذف «${confirm.title}» مطمئن هستید؟`}
          close={() => setConfirm(null)}
          accept={() => {
            deleteProduct(confirm.id);
            setConfirm(null);
          }}
        />
      )}
    </>
  );
}
