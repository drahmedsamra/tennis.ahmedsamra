import { createClient } from "@/lib/supabase/server";

export type DashboardPlayerPreview = {
  id: string;
  player_code: string;
  name: string;
  birth_year: number | null;
  last_report_date: string | null;
};

export type DashboardReportPreview = {
  id: string;
  title: string;
  report_date: string | null;
  report_type: string | null;
  is_published: boolean;
  player_name: string | null;
  player_code: string | null;
};

export type CoachDashboardData = {
  stats: {
    players: number;
    activePlayers: number;
    reports: number;
    publishedReports: number;
    videos: number;
  };
  recentPlayers: DashboardPlayerPreview[];
  recentReports: DashboardReportPreview[];
  error: string | null;
};

type PlayerRow = {
  id: string;
  player_code: string;
  preferred_name_ar: string | null;
  full_name_ar: string | null;
  birth_year: number | null;
  player_reports: { report_date: string | null }[] | null;
};

type ReportPlayer = {
  player_code: string | null;
  preferred_name_ar: string | null;
};

type ReportRow = {
  id: string;
  title: string;
  report_date: string | null;
  report_type: string | null;
  is_published: boolean;
  players: ReportPlayer | ReportPlayer[] | null;
};

function asPlayer(value: ReportRow["players"]): ReportPlayer | null {
  if (!value) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function latestReportDate(
  reports: { report_date: string | null }[] | null,
): string | null {
  if (!reports?.length) return null;

  return reports.reduce<string | null>((latest, report) => {
    if (!report.report_date) return latest;
    if (!latest) return report.report_date;
    return report.report_date > latest ? report.report_date : latest;
  }, null);
}

export async function getDashboardStats() {
  const dashboard = await getCoachDashboard();
  return dashboard.stats;
}

export async function getCoachDashboard(): Promise<CoachDashboardData> {
  const empty: CoachDashboardData = {
    stats: {
      players: 0,
      activePlayers: 0,
      reports: 0,
      publishedReports: 0,
      videos: 0,
    },
    recentPlayers: [],
    recentReports: [],
    error: null,
  };

  try {
    const supabase = await createClient();

    const [
      playersCount,
      activePlayersCount,
      reportsCount,
      publishedReportsCount,
      videosCount,
      playersResult,
      reportsResult,
    ] = await Promise.all([
      supabase.from("players").select("*", { count: "exact", head: true }),
      supabase
        .from("players")
        .select("*", { count: "exact", head: true })
        .eq("active", true),
      supabase
        .from("player_reports")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("player_reports")
        .select("*", { count: "exact", head: true })
        .eq("is_published", true),
      supabase
        .from("report_videos")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("players")
        .select(
          `
          id,
          player_code,
          preferred_name_ar,
          full_name_ar,
          birth_year,
          player_reports ( report_date )
        `,
        )
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("player_reports")
        .select(
          `
          id,
          title,
          report_date,
          report_type,
          is_published,
          players (
            player_code,
            preferred_name_ar
          )
        `,
        )
        .order("report_date", { ascending: false })
        .limit(6),
    ]);

    const queryError =
      playersCount.error?.message ||
      activePlayersCount.error?.message ||
      reportsCount.error?.message ||
      publishedReportsCount.error?.message ||
      playersResult.error?.message ||
      reportsResult.error?.message ||
      null;

    const players = (playersResult.data ?? []) as PlayerRow[];
    const reports = (reportsResult.data ?? []) as ReportRow[];

    return {
      stats: {
        players: playersCount.count ?? 0,
        activePlayers: activePlayersCount.count ?? 0,
        reports: reportsCount.count ?? 0,
        publishedReports: publishedReportsCount.count ?? 0,
        videos: videosCount.count ?? 0,
      },
      recentPlayers: players.map((player) => ({
        id: player.id,
        player_code: player.player_code,
        name:
          player.preferred_name_ar ||
          player.full_name_ar ||
          player.player_code,
        birth_year: player.birth_year,
        last_report_date: latestReportDate(player.player_reports),
      })),
      recentReports: reports.map((report) => {
        const player = asPlayer(report.players);

        return {
          id: report.id,
          title: report.title,
          report_date: report.report_date,
          report_type: report.report_type,
          is_published: report.is_published,
          player_name: player?.preferred_name_ar ?? null,
          player_code: player?.player_code ?? null,
        };
      }),
      error: queryError,
    };
  } catch (error) {
    return {
      ...empty,
      error:
        error instanceof Error
          ? error.message
          : "Could not load dashboard data.",
    };
  }
}
