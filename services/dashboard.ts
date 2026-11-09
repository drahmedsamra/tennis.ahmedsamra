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

export type DashboardRegistrationPreview = {
  id: string;
  player_name: string;
  age: number;
  mobile_number: string;
  status: string;
  created_at: string;
};

export type CoachDashboardData = {
  stats: {
    players: number;
    activePlayers: number;
    reports: number;
    publishedReports: number;
    videos: number;
    registrations: number;
    pendingRegistrations: number;
  };
  recentPlayers: DashboardPlayerPreview[];
  recentReports: DashboardReportPreview[];
  recentRegistrations: DashboardRegistrationPreview[];
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
      registrations: 0,
      pendingRegistrations: 0,
    },
    recentPlayers: [],
    recentReports: [],
    recentRegistrations: [],
    error: null,
  };

  try {
    const supabase = await createClient();

    let regCount = 0;
    let pendingRegCount = 0;
    let recentRegs: DashboardRegistrationPreview[] = [];

    try {
      const [totalRes, pendingRes, recentRes] = await Promise.all([
        supabase
          .from("player_registration_requests")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("player_registration_requests")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase
          .from("player_registration_requests")
          .select("id, player_name, age, mobile_number, status, created_at")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      if (!totalRes.error) regCount = totalRes.count ?? 0;
      if (!pendingRes.error) pendingRegCount = pendingRes.count ?? 0;
      if (!recentRes.error && recentRes.data) {
        recentRegs = recentRes.data as DashboardRegistrationPreview[];
      }
    } catch {
      // Table may not exist yet before migration
    }

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
        registrations: regCount,
        pendingRegistrations: pendingRegCount,
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
      recentRegistrations: recentRegs,
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
