import { createClient } from "@/lib/supabase/server";

export async function getReports() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("player_reports")
    .select(`
      *,
      players (
        id,
        player_code,
        preferred_name_ar
      )
    `)
    .order("report_date", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

export async function getReportById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("player_reports")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function createReport(report: Record<string, unknown>) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("player_reports")
    .insert(report)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateReport(
  id: string,
  report: Record<string, unknown>
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("player_reports")
    .update(report)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteReport(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("player_reports")
    .delete()
    .eq("id", id);

  if (error) throw error;
}