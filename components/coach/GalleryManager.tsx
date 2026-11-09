"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Loader2,
  Plus,
  RefreshCw,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import {
  addGalleryImageAction,
  deleteGalleryImageAction,
  toggleGalleryImageStatusAction,
  updateGalleryImageOrderAction,
} from "@/app/actions/gallery";
import type { GalleryImage } from "@/types/gallery";

type GalleryManagerProps = {
  initialImages: GalleryImage[];
};

export default function GalleryManager({ initialImages }: GalleryManagerProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descAr, setDescAr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [category, setCategory] = useState("تدريب");
  const [displayOrder, setDisplayOrder] = useState<number>(images.length + 1);

  // Stats
  const totalCount = images.length;
  const activeCount = images.filter((img) => img.is_active).length;
  const inactiveCount = totalCount - activeCount;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setFilePreview(objectUrl);
      setCustomUrl("");
    }
  }

  function resetForm() {
    setSelectedFile(null);
    setFilePreview(null);
    setCustomUrl("");
    setTitleAr("");
    setTitleEn("");
    setDescAr("");
    setDescEn("");
    setCategory("تدريب");
    setDisplayOrder(images.length + 1);
    setShowAddForm(false);
  }

  function handleAddSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titleAr.trim()) {
      setActionMessage({
        type: "error",
        text: "يرجى إدخال عنوان الصورة بالعربية على الأقل.",
      });
      return;
    }
    if (!selectedFile && !customUrl.trim()) {
      setActionMessage({
        type: "error",
        text: "يرجى اختيار ملف صورة أو إدخال رابط صورة صالح.",
      });
      return;
    }

    startTransition(async () => {
      setActionMessage(null);
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      formData.append("custom_url", customUrl.trim());
      formData.append("title_ar", titleAr.trim());
      formData.append("title_en", titleEn.trim());
      formData.append("description_ar", descAr.trim());
      formData.append("description_en", descEn.trim());
      formData.append("category", category.trim());
      formData.append("display_order", String(displayOrder));

      const res = await addGalleryImageAction(formData);
      if (res.success) {
        setActionMessage({
          type: "success",
          text: res.message || "تمت إضافة الصورة بنجاح!",
        });
        resetForm();
        window.location.reload();
      } else {
        setActionMessage({
          type: "error",
          text: res.error || "حدث خطأ أثناء إضافة الصورة.",
        });
      }
    });
  }

  function handleToggleStatus(img: GalleryImage) {
    startTransition(async () => {
      const res = await toggleGalleryImageStatusAction(img.id, img.is_active);
      if (res.success) {
        setImages((prev) =>
          prev.map((item) =>
            item.id === img.id ? { ...item, is_active: !item.is_active } : item
          )
        );
        setActionMessage({
          type: "success",
          text: `تم ${img.is_active ? "إخفاء" : "تفعيل"} الصورة بنجاح.`,
        });
      } else {
        setActionMessage({
          type: "error",
          text: res.error || "فشل تغيير حالة الصورة.",
        });
      }
    });
  }

  function handleOrderChange(img: GalleryImage, newOrder: number) {
    if (isNaN(newOrder)) return;
    startTransition(async () => {
      const res = await updateGalleryImageOrderAction(img.id, newOrder);
      if (res.success) {
        setImages((prev) =>
          prev
            .map((item) =>
              item.id === img.id ? { ...item, display_order: newOrder } : item
            )
            .sort((a, b) => a.display_order - b.display_order)
        );
      }
    });
  }

  function handleDelete(img: GalleryImage) {
    if (
      !confirm(
        `هل أنت متأكد من رغبتك في حذف الصورة "${img.title_ar}" من المعرض؟`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const res = await deleteGalleryImageAction(img.id, img.image_url);
      if (res.success) {
        setImages((prev) => prev.filter((item) => item.id !== img.id));
        setActionMessage({
          type: "success",
          text: res.message || "تم حذف الصورة بنجاح.",
        });
      } else {
        setActionMessage({
          type: "error",
          text: res.error || "فشل حذف الصورة.",
        });
      }
    });
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header and Quick Stats */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600">
              <ImageIcon className="size-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              معرض الصور (سلايدر الموقع)
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            تحكم في الصور المعروضة في الصفحة الرئيسية للأكاديمية مع العناوين
            والتفاصيل.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50"
          >
            <RefreshCw className="size-4" />
            تحديث
          </button>
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-500"
          >
            {showAddForm ? (
              <>
                <X className="size-4" />
                إلغاء
              </>
            ) : (
              <>
                <Plus className="size-4" />
                إضافة صورة جديدة
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            إجمالي الصور
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{totalCount}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            الصور المعروضة (نشطة)
          </p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">
            {activeCount}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            الصور المخفية
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-600">
            {inactiveCount}
          </p>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionMessage ? (
        <div
          className={`flex items-center justify-between gap-3 rounded-xl border p-4 text-sm ${
            actionMessage.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {actionMessage.type === "success" ? (
              <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="size-5 shrink-0 text-red-600" />
            )}
            <p className="font-medium">{actionMessage.text}</p>
          </div>
          <button
            type="button"
            onClick={() => setActionMessage(null)}
            className="text-slate-400 hover:text-slate-700"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}

      {/* Add New Image Form Card */}
      {showAddForm ? (
        <form
          onSubmit={handleAddSubmit}
          className="rounded-2xl border border-emerald-300/80 bg-white p-6 shadow-sm ring-4 ring-emerald-500/5 transition-all"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              إضافة صورة جديدة إلى السلايدر
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left: Image Selection (Upload or URL) */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-wide text-slate-700">
                  رفع صورة من جهازك
                </label>
                <div className="mt-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-emerald-500 hover:bg-emerald-50/20">
                  {filePreview ? (
                    <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-slate-200 shadow-xs">
                      <Image
                        src={filePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setFilePreview(null);
                        }}
                        className="absolute end-2 top-2 rounded-full bg-slate-900/80 p-1.5 text-white hover:bg-red-600"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="size-8 text-slate-400" />
                      <p className="mt-2 text-sm font-medium text-slate-700">
                        اضغط لاختيار صورة من جهازك
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        PNG, JPG, WebP بحجم حتى 5 ميجابايت
                      </p>
                      <label className="mt-3 cursor-pointer rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs ring-1 ring-slate-300 hover:bg-slate-50">
                        تصفح الملفات
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wide text-slate-700">
                  أو استخدم رابط صورة خارجي مباشر (اختياري)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={customUrl}
                  disabled={!!selectedFile}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>
            </div>

            {/* Right: Titles and Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold tracking-wide text-slate-700">
                  عنوان الصورة بالعربية <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: تدريبات الإرسال المتقدمة"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wide text-slate-700">
                  عنوان الصورة بالإنجليزية (English Title)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Advanced Serve Training"
                  value={titleEn}
                  dir="ltr"
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wide text-slate-700">
                  تفاصيل أو وصف الصورة بالعربية (يظهر فوق الصورة في السلايدر)
                </label>
                <textarea
                  rows={2}
                  placeholder="وصف مختصر عن التمرين أو البطولة أو اللقطة..."
                  value={descAr}
                  onChange={(e) => setDescAr(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wide text-slate-700">
                  تفاصيل الصورة بالإنجليزية (English Description)
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description in English..."
                  value={descEn}
                  dir="ltr"
                  onChange={(e) => setDescEn(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold tracking-wide text-slate-700">
                    التصنيف (Category)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="تدريب">تدريب</option>
                    <option value="بطولات">بطولات</option>
                    <option value="مهارات">مهارات</option>
                    <option value="إرسال">إرسال</option>
                    <option value="الأكاديمية">الأكاديمية</option>
                    <option value="أبطالنا">أبطالنا</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wide text-slate-700">
                    ترتيب الظهور (الرقم الأقل يظهر أولاً)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10))}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-500 disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  جاري الرفع والحفظ...
                </>
              ) : (
                <>
                  <Upload className="size-4" />
                  حفظ ونشر الصورة
                </>
              )}
            </button>
          </div>
        </form>
      ) : null}

      {/* Images List */}
      {images.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <ImageIcon className="size-6" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-900">
            لا توجد صور في المعرض حالياً
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            إذا قمت بتشغيل كود الـ SQL في سوبابيز، اضغط تحديث، أو ابدأ بإضافة صور
            جديدة الآن.
          </p>
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            <Plus className="size-4" />
            إضافة أول صورة
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <div
              key={img.id}
              className={`flex flex-col overflow-hidden rounded-2xl border bg-white shadow-xs transition hover:shadow-md ${
                img.is_active
                  ? "border-slate-200"
                  : "border-slate-200/60 opacity-60 bg-slate-50"
              }`}
            >
              {/* Image Preview Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <Image
                  src={img.image_url}
                  alt={img.title_ar}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                {/* Badge Category */}
                {img.category ? (
                  <span className="absolute start-3 top-3 rounded-full bg-slate-950/70 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 backdrop-blur">
                    {img.category}
                  </span>
                ) : null}

                {/* Status Badge */}
                <span
                  className={`absolute end-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur ${
                    img.is_active
                      ? "bg-emerald-500/90 text-white"
                      : "bg-slate-700/90 text-slate-200"
                  }`}
                >
                  {img.is_active ? "معروضة بالسلايدر" : "مخفية"}
                </span>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="font-bold text-slate-900">{img.title_ar}</h3>
                  {img.title_en ? (
                    <p className="mt-0.5 text-xs text-slate-400" dir="ltr">
                      {img.title_en}
                    </p>
                  ) : null}

                  {img.description_ar ? (
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">
                      {img.description_ar}
                    </p>
                  ) : null}
                </div>

                {/* Card Controls & Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] font-medium text-slate-500">
                      الترتيب:
                    </label>
                    <input
                      type="number"
                      min={0}
                      defaultValue={img.display_order}
                      onBlur={(e) =>
                        handleOrderChange(
                          img,
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                      className="w-14 rounded-lg border border-slate-200 px-2 py-1 text-center text-xs text-slate-800 focus:border-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      title={img.is_active ? "إخفاء من السلايدر" : "إظهار في السلايدر"}
                      onClick={() => handleToggleStatus(img)}
                      disabled={isPending}
                      className={`rounded-lg p-2 transition ${
                        img.is_active
                          ? "text-emerald-700 hover:bg-emerald-50"
                          : "text-slate-400 hover:bg-slate-200"
                      }`}
                    >
                      {img.is_active ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      title="حذف الصورة نهائياً"
                      onClick={() => handleDelete(img)}
                      disabled={isPending}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

