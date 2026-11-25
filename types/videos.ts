export interface ReportVideo {
  id: string;
  report_id: string;
  title: string;
  youtube_url: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  player_reports?: {
    id: string;
    title: string;
    report_date: string | null;
    report_type: string | null;
    players?: {
      id: string;
      player_code: string;
      preferred_name_ar: string;
    } | null;
  } | null;
}

export type NewReportVideo = {
  report_id: string;
  title: string;
  youtube_url: string;
  description?: string | null;
  sort_order?: number;
};
