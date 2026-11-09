"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  createGalleryImage,
  deleteGalleryImage,
  updateGalleryImage,
} from "@/services/gallery";
import type { CreateGalleryImageInput } from "@/types/gallery";

export type GalleryActionResult = {
  success: boolean;
  message?: string;
  error?: string;
};

export async function addGalleryImageAction(
  formData: FormData
): Promise<GalleryActionResult> {
  try {
    const supabase = await createClient();

    const titleAr = String(formData.get("title_ar") || "").trim();
    const titleEn = String(formData.get("title_en") || "").trim() || null;
    const descriptionAr =
      String(formData.get("description_ar") || "").trim() || null;
    const descriptionEn =
      String(formData.get("description_en") || "").trim() || null;
    const category = String(formData.get("category") || "academy").trim();
    const displayOrder = parseInt(
      String(formData.get("display_order") || "0"),
      10
    );
    const customUrl = String(formData.get("custom_url") || "").trim();
    const file = formData.get("file") as File | null;

    if (!titleAr) {
      return { success: false, error: "عنوان الصورة بالعربية مطلوب." };
    }

    let finalImageUrl = customUrl;

    // Handle file upload if provided
    if (file && file.size > 0) {
      const sanitizedName = file.name
        .replace(/[^a-zA-Z0-9.-]/g, "_")
        .toLowerCase();
      const filePath = `images/${Date.now()}_${sanitizedName}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, buffer, {
          contentType: file.type || "image/jpeg",
          upsert: true,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        return {
          success: false,
          error: `فشل رفع الصورة إلى سوبابيز: ${uploadError.message}`,
        };
      }

      const { data: publicData } = supabase.storage
        .from("gallery")
        .getPublicUrl(filePath);

      finalImageUrl = publicData.publicUrl;
    }

    if (!finalImageUrl) {
      return {
        success: false,
        error: "يرجى اختيار ملف صورة لرفعه أو إدخال رابط صورة صالح.",
      };
    }

    const payload: CreateGalleryImageInput = {
      image_url: finalImageUrl,
      title_ar: titleAr,
      title_en: titleEn,
      description_ar: descriptionAr,
      description_en: descriptionEn,
      category,
      display_order: isNaN(displayOrder) ? 0 : displayOrder,
      is_active: true,
    };

    await createGalleryImage(payload);

    revalidatePath("/");
    revalidatePath("/en");
    revalidatePath("/coach/gallery");

    return { success: true, message: "تمت إضافة الصورة إلى المعرض بنجاح!" };
  } catch (error: unknown) {
    console.error("Error adding gallery image:", error);
    const message =
      error instanceof Error ? error.message : "حدث خطأ غير متوقع أثناء الحفظ.";
    return { success: false, error: message };
  }
}

export async function toggleGalleryImageStatusAction(
  id: string,
  currentStatus: boolean
): Promise<GalleryActionResult> {
  try {
    await updateGalleryImage(id, { is_active: !currentStatus });

    revalidatePath("/");
    revalidatePath("/en");
    revalidatePath("/coach/gallery");

    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "فشل تغيير حالة الصورة.";
    return { success: false, error: message };
  }
}

export async function updateGalleryImageOrderAction(
  id: string,
  newOrder: number
): Promise<GalleryActionResult> {
  try {
    await updateGalleryImage(id, { display_order: newOrder });

    revalidatePath("/");
    revalidatePath("/en");
    revalidatePath("/coach/gallery");

    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "فشل تحديث ترتيب الصورة.";
    return { success: false, error: message };
  }
}

export async function deleteGalleryImageAction(
  id: string,
  imageUrl?: string
): Promise<GalleryActionResult> {
  try {
    const supabase = await createClient();

    // If image is stored in Supabase storage bucket "gallery", attempt cleanup
    if (imageUrl && imageUrl.includes("/storage/v1/object/public/gallery/")) {
      const pathPart = imageUrl.split("/storage/v1/object/public/gallery/")[1];
      if (pathPart) {
        await supabase.storage.from("gallery").remove([pathPart]);
      }
    }

    await deleteGalleryImage(id);

    revalidatePath("/");
    revalidatePath("/en");
    revalidatePath("/coach/gallery");

    return { success: true, message: "تم حذف الصورة من المعرض بنجاح." };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "حدث خطأ أثناء حذف الصورة.";
    return { success: false, error: message };
  }
}

