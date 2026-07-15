export interface Report {
  id: string;

  player_id: string;

  title: string;

  summary: string | null;

  content_markdown: string;

  report_type: string;

  report_period: string | null;

  overall_rating: number | null;

  author_name: string;

  youtube_url: string | null;

  report_date: string;

  is_published: boolean;

  created_at: string;

  updated_at: string;
}

export type NewReport = Omit<
  Report,
  "id" | "created_at" | "updated_at"
>;