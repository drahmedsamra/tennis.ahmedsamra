import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  const [
    { count: players },
    { count: reports },
    { count: videos },
  ] = await Promise.all([
    supabase
      .from("players")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("player_reports")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("report_videos")
      .select("*", { count: "exact", head: true }),
  ]);

  return {
    players: players ?? 0,
    reports: reports ?? 0,
    videos: videos ?? 0,
  };
}