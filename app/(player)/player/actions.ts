"use server";

import { createClient } from "@/lib/supabase/server";

export type SearchState = {
  success: boolean;
  error: string;
  playerCode?: string;
};

export async function searchPlayer(
  prevState: SearchState,
  formData: FormData
): Promise<SearchState> {
  const playerCode = formData
    .get("id")
    ?.toString()
    .trim();

  if (!playerCode) {
    return {
      success: false,
      error: "برجاء إدخال كود اللاعب.",
    };
  }

  const supabase = await createClient();

  const { data } = await supabase
    .from("players")
    .select("player_code")
    .ilike("player_code", playerCode)
    .maybeSingle();

  if (!data) {
    return {
      success: false,
      error:
        "هذا الكود غير موجود، تأكد من كتابته أو تواصل مع الكابتن أحمد سمرة.",
    };
  }

  return {
    success: true,
    error: "",
    playerCode: data.player_code,
  };
}