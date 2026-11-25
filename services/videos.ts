import { createClient } from "@/lib/supabase/server";
import type { NewReportVideo, ReportVideo } from "@/types/videos";

export async function getVideos(): Promise<ReportVideo[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("report_videos")
    .select(`
      *,
      player_reports (
        id,
        title,
        report_date,
        report_type,
        players (
          id,
          player_code,
          preferred_name_ar
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }

  return (data as unknown as ReportVideo[]) ?? [];
}

export async function getVideosByReportId(reportId: string): Promise<ReportVideo[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("report_videos")
    .select("*")
    .eq("report_id", reportId)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error(`Error fetching videos for report ${reportId}:`, error);
    return [];
  }

  return (data as ReportVideo[]) ?? [];
}

export async function getVideoById(id: string): Promise<ReportVideo | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("report_videos")
    .select(`
      *,
      player_reports (
        id,
        title,
        report_date,
        report_type,
        players (
          id,
          player_code,
          preferred_name_ar
        )
      )
    `)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching video ${id}:`, error);
    throw error;
  }

  return data as unknown as ReportVideo | null;
}

export async function createVideo(video: NewReportVideo): Promise<ReportVideo> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("report_videos")
    .insert({
      report_id: video.report_id,
      title: video.title,
      youtube_url: video.youtube_url,
      description: video.description || null,
      sort_order: video.sort_order ?? 1,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating video:", error);
    throw error;
  }

  return data as ReportVideo;
}

export async function updateVideo(
  id: string,
  video: Partial<NewReportVideo>
): Promise<ReportVideo> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("report_videos")
    .update(video)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating video ${id}:`, error);
    throw error;
  }

  return data as ReportVideo;
}

export async function deleteVideo(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("report_videos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting video ${id}:`, error);
    throw error;
  }
}

export type SyncVideoInput = {
  title: string;
  youtube_url: string;
  description?: string | null;
  sort_order?: number;
};

export async function syncReportVideos(
  reportId: string,
  videos: SyncVideoInput[]
): Promise<void> {
  const supabase = await createClient();

  // Delete current videos for this report
  const { error: deleteError } = await supabase
    .from("report_videos")
    .delete()
    .eq("report_id", reportId);

  if (deleteError) {
    console.error(`Error clearing videos for report ${reportId}:`, deleteError);
  }

  // Filter valid videos with both title and url
  const validVideos = videos.filter(
    (v) => v.title && v.title.trim() && v.youtube_url && v.youtube_url.trim()
  );

  if (validVideos.length === 0) return;

  const records = validVideos.map((v, idx) => ({
    report_id: reportId,
    title: v.title.trim(),
    youtube_url: v.youtube_url.trim(),
    description: v.description?.trim() || null,
    sort_order: v.sort_order ?? idx + 1,
  }));

  const { error: insertError } = await supabase
    .from("report_videos")
    .insert(records);

  if (insertError) {
    console.error(`Error inserting synced videos for report ${reportId}:`, insertError);
    throw insertError;
  }
}
