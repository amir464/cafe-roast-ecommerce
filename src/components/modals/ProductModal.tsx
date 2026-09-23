import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import categories from "../../data/categories.json";
import type { Product } from "../../types";

type ProductModalProps = {
  product: Product;
  close: () => void;
  save: (product: Product) => void;
};

const MAX_IMAGE_SIZE = 3.5 * 1024 * 1024;
const MAX_GALLERY_IMAGES = 2;

const IMAGE_MAX_WIDTH = 900;
const IMAGE_QUALITY = 0.75;

export function ProductModal({ product, close, save }: ProductModalProps) {
  const [form, setForm] = useState<Product>({
    ...product,
    gallery: product.gallery ?? [],
  });

  const [imageError, setImageError] = useState("");

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      const reader = new FileReader();

      reader.onload = () => {
        img.src = String(reader.result);
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const scale =
          img.width > IMAGE_MAX_WIDTH ? IMAGE_MAX_WIDTH / img.width : 1;

        const width = img.width * scale;

        const height = img.height * scale;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject("Canvas error");
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        const compressed = canvas.toDataURL("image/webp", IMAGE_QUALITY);

        console.log(
          "Compressed size:",
          Math.round(compressed.length / 1024),
          "KB",
        );

        resolve(compressed);
      };

      img.onerror = reject;
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const validateImage = (file: File) => {
    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("حجم اولیه تصویر باید کمتر از ۳ مگابایت باشد.");

      return false;
    }

    setImageError("");

    return true;
  };

  const setMainImage = (image: string) => {
    setForm((prev) => ({
      ...prev,
      image,
    }));
  };

  const handleMainImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file || !validateImage(file)) {
      return;
    }

    const image = await convertFileToBase64(file);

    setMainImage(image);
  };

  const handleGallery = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    const availableSlots = MAX_GALLERY_IMAGES - form.gallery.length;

    if (availableSlots <= 0) {
      setImageError("حداکثر ۲ تصویر برای گالری مجاز است.");

      return;
    }

    const selectedFiles = files.filter(validateImage).slice(0, availableSlots);

    const images = await Promise.all(selectedFiles.map(convertFileToBase64));

    setForm((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...images],
    }));
  };

  const removeGalleryImage = (image: string) => {
    setForm((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((item) => item !== image),
    }));
  };
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[var(--overlay)] p-2.5 sm:p-5">
      <div className="max-h-[calc(100dvh-20px)] w-full max-w-[620px] overflow-y-auto rounded-[18px] bg-[var(--surface-elevated)] px-3.5 py-[18px] sm:max-h-[calc(100dvh-40px)] sm:p-[25px]">
        <div className="flex justify-between gap-4">
          <div>
            <h2>
              {product.title === "محصول جدید" ? "افزودن محصول" : "ویرایش محصول"}
            </h2>

            <p>اطلاعات محصول را کامل و دقیق وارد کنید.</p>
          </div>

          <button
            className="shrink-0 self-start rounded-lg p-2 hover:bg-[var(--surface-muted)]"
            onClick={close}
            aria-label="بستن پنجره"
          >
            <X />
          </button>
        </div>

        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-[17px] [&_input]:mt-[7px] [&_input]:block [&_input]:w-full [&_input]:rounded-[10px] [&_input]:border [&_input]:border-[var(--border)] [&_input]:bg-[var(--surface)] [&_input]:p-[11px] [&_label]:text-sm [&_label]:font-semibold [&_select]:mt-[7px] [&_select]:block [&_select]:w-full [&_select]:rounded-[10px] [&_select]:border [&_select]:border-[var(--border)] [&_select]:bg-[var(--surface)] [&_select]:p-[11px] [&_textarea]:mt-[7px] [&_textarea]:block [&_textarea]:w-full [&_textarea]:rounded-[10px] [&_textarea]:border [&_textarea]:border-[var(--border)] [&_textarea]:bg-[var(--surface)] [&_textarea]:p-[11px]">
          <label>
            نام محصول
            <input
              value={form.title}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  title: event.target.value,
                }))
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
                );

                if (!category) return;

                setForm((prev) => ({
                  ...prev,
                  categoryId: category.id,
                  categoryName: category.name,
                }));
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
                setForm((prev) => ({
                  ...prev,
                  price: Number(event.target.value),
                }))
              }
            />
          </label>

          <label>
            موجودی
            <input
              type="number"
              value={form.stock}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  stock: Number(event.target.value),
                }))
              }
            />
          </label>

          <label className="sm:col-span-2">
            تصویر اصلی محصول
            <input type="file" accept="image/*" onChange={handleMainImage} />
            <span className="mt-2 block text-xs font-normal text-[var(--text-muted)]">
              حداکثر حجم فایل اولیه ۳ مگابایت - تصویر قبل از ذخیره فشرده می‌شود.
            </span>
            {form.image && (
              <img
                src={form.image}
                alt="تصویر اصلی محصول"
                className="mt-3 h-32 w-32 rounded-xl object-cover"
              />
            )}
          </label>

          <label className="sm:col-span-2">
            گالری تصاویر
            <span className="mt-2 block text-xs font-normal text-[var(--text-muted)]">
              حداکثر ۲ تصویر برای گالری مجاز است.
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={form.gallery.length >= MAX_GALLERY_IMAGES}
              onChange={handleGallery}
            />
            {imageError && (
              <p className="mt-2 text-xs text-[var(--danger)]">{imageError}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-3">
              {form.gallery.map((image) => (
                <div key={image} className="relative">
                  <button type="button" onClick={() => setMainImage(image)}>
                    <img
                      src={image}
                      alt="gallery"
                      className={`h-20 w-20 rounded-xl border-2 object-cover ${
                        form.image === image
                          ? "border-[var(--primary)]"
                          : "border-transparent"
                      }`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeGalleryImage(image)}
                    className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-[var(--danger)] text-[var(--on-dark-primary)]"
                    aria-label="حذف تصویر"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </label>

          <label className="sm:col-span-2">
            توضیح کوتاه
            <textarea
              value={form.shortDescription}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  shortDescription: event.target.value,
                }))
              }
            />
          </label>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-between">
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-[22px] py-3 font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--surface-muted)]"
            onClick={close}
          >
            انصراف
          </button>

          <button
            className="inline-flex min-h-11 items-center justify-center rounded-xl border-0 bg-[var(--primary)] px-[22px] py-3 font-semibold text-[var(--on-dark-primary)] hover:bg-[var(--primary-hover)]"
            onClick={() => save(form)}
          >
            ذخیره محصول
          </button>
        </div>
      </div>
    </div>
  );
}
