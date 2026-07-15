import { createClient } from "@/lib/supabase/server";
import type { NewPlayer, Player } from "@/types/player";

export async function getPlayers() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("preferred_name_ar");

  if (error) throw error;

  return (data ?? []) as Player[];
}

export async function getPlayer(playerCode: string) {
  const supabase = await createClient();

  const { data: player, error } = await supabase
    .from("players")
    .select("*")
    .eq("player_code", playerCode)
    .single();

  if (error) throw error;

  const { data: reports } = await supabase
    .from("player_reports")
    .select("*")
    .eq("player_id", player.id)
    .order("report_date", { ascending: false });

  return {
    player,
    reports: reports ?? [],
  };
}

export async function getPlayerById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Player;
}

export async function createPlayer(player: NewPlayer) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .insert(player)
    .select()
    .single();

  if (error) throw error;

  return data as Player;
}

export async function updatePlayer(
  id: string,
  player: Partial<NewPlayer>
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("players")
    .update(player)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Player;
}

export async function deletePlayer(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("players")
    .delete()
    .eq("id", id);

  if (error) throw error;
}