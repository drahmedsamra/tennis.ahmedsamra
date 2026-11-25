"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createReport,
  updateReport as updateReportService,
} from "@/services/reports";
import { syncReportVideos, type SyncVideoInput } from "@/services/videos";
import type { NewReport } from "@/types/reports";

function parseVideos(formData: FormData): SyncVideoInput[] {
  const raw = formData.get("videos_json")?.toString();
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((item, idx) => ({
        title: item.title ? String(item.title).trim() : "",
        youtube_url: item.youtube_url ? String(item.youtube_url).trim() : "",
        description: item.description ? String(item.description).trim() : null,
        sort_order: Number(item.sort_order) || idx + 1,
      }));
    }
  } catch (err) {
    console.error("Error parsing videos_json:", err);
  }
  return [];
}

function buildReport(formData: FormData): NewReport {
  return {
    player_id: formData.get("player_id")?.toString() ?? "",
    title: formData.get("title")?.toString().trim() ?? "",
    summary: formData.get("summary")?.toString().trim() || null,
    content_markdown: formData.get("content_markdown")?.toString().trim() ?? "",
    report_type: formData.get("report_type")?.toString().trim() ?? "",
    report_period: formData.get("report_period")?.toString().trim() || null,
    overall_rating: formData.get("overall_rating")
      ? Number(formData.get("overall_rating"))
      : null,
    author_name: formData.get("author_name")?.toString().trim() ?? "Ahmed Samra",
    youtube_url: formData.get("youtube_url")?.toString().trim() || null,
    report_date: formData.get("report_date")?.toString() ?? "",
    is_published: formData.get("is_published") === "on",
  };
}

export async function saveReport(formData: FormData) {
  const report = buildReport(formData);
  const videos = parseVideos(formData);

  // If videos were provided, ensure the primary youtube_url is filled
  if (videos.length > 0 && videos[0].youtube_url) {
    report.youtube_url = videos[0].youtube_url;
  }

  const created = await createReport(report);

  if (created?.id && videos.length > 0) {
    await syncReportVideos(created.id, videos);
  }

  revalidatePath("/coach/reports");
  revalidatePath("/coach/videos");
  revalidatePath("/coach");

  redirect(created?.id ? `/coach/reports/${created.id}` : "/coach/reports");
}

export async function updateReport(id: string, formData: FormData) {
  const report = buildReport(formData);
  const videos = parseVideos(formData);

  if (videos.length > 0 && videos[0].youtube_url) {
    report.youtube_url = videos[0].youtube_url;
  }

  await updateReportService(id, report);
  await syncReportVideos(id, videos);

  revalidatePath("/coach/reports");
  revalidatePath(`/coach/reports/${id}`);
  revalidatePath("/coach/videos");
  revalidatePath("/coach");

  redirect(`/coach/reports/${id}`);
}
