"use server";

import { redirect } from "next/navigation";

import {
  createReport,
  updateReport as updateReportService,
} from "@/services/reports";

import type { NewReport } from "@/types/reports";

function buildReport(formData: FormData): NewReport {
  return {
    player_id:
      formData.get("player_id")?.toString() ?? "",

    title:
      formData.get("title")?.toString().trim() ?? "",

    summary:
      formData.get("summary")?.toString().trim() || null,

    content_markdown:
      formData.get("content_markdown")?.toString().trim() ?? "",

    report_type:
      formData.get("report_type")?.toString().trim() ?? "",

    report_period:
      formData.get("report_period")?.toString().trim() || null,

    overall_rating: formData.get("overall_rating")
      ? Number(formData.get("overall_rating"))
      : null,

    author_name:
      formData.get("author_name")?.toString().trim() ?? "",

    youtube_url:
      formData.get("youtube_url")?.toString().trim() || null,

    report_date:
      formData.get("report_date")?.toString() ?? "",

    is_published:
      formData.get("is_published") === "on",
  };
}

export async function saveReport(formData: FormData) {
  const report = buildReport(formData);

  await createReport(report);

  redirect("/coach/reports");
}

export async function updateReport(
  id: string,
  formData: FormData
) {
  const report = buildReport(formData);

  await updateReportService(id, report);

  redirect("/coach/reports");
}