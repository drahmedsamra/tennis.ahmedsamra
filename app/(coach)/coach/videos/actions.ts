"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createVideo, deleteVideo, updateVideo } from "@/services/videos";
import type { NewReportVideo } from "@/types/videos";

export async function saveVideoAction(formData: FormData) {
  const report_id = formData.get("report_id")?.toString().trim();
  const title = formData.get("title")?.toString().trim();
  const youtube_url = formData.get("youtube_url")?.toString().trim();
  const description = formData.get("description")?.toString().trim() || null;
  const sort_order = Number(formData.get("sort_order") || 1);

  if (!report_id) {
    throw new Error("يرجى اختيار التقرير المرتبط بالفيديو");
  }

  if (!title) {
    throw new Error("يرجى إدخال عنوان الفيديو");
  }

  if (!youtube_url) {
    throw new Error("يرجى إدخال رابط فيديو اليوتيوب");
  }

  const newVideo: NewReportVideo = {
    report_id,
    title,
    youtube_url,
    description,
    sort_order,
  };

  await createVideo(newVideo);

  revalidatePath("/coach/videos");
  revalidatePath("/coach/reports");
  revalidatePath(`/coach/reports/${report_id}`);
  revalidatePath("/coach");

  redirect("/coach/videos");
}

export async function deleteVideoAction(id: string, reportId?: string) {
  await deleteVideo(id);

  revalidatePath("/coach/videos");
  revalidatePath("/coach/reports");
  if (reportId) {
    revalidatePath(`/coach/reports/${reportId}`);
  }
  revalidatePath("/coach");
}

export async function updateVideoAction(id: string, formData: FormData) {
  const report_id = formData.get("report_id")?.toString().trim();
  const title = formData.get("title")?.toString().trim();
  const youtube_url = formData.get("youtube_url")?.toString().trim();
  const description = formData.get("description")?.toString().trim() || null;
  const sort_order = Number(formData.get("sort_order") || 1);

  if (!report_id || !title || !youtube_url) {
    throw new Error("بيانات الفيديو غير مكتملة");
  }

  await updateVideo(id, {
    report_id,
    title,
    youtube_url,
    description,
    sort_order,
  });

  revalidatePath("/coach/videos");
  revalidatePath(`/coach/reports/${report_id}`);
  redirect("/coach/videos");
}
