"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SearchState = {
  error: string;
};

export async function searchPlayer(
  prevState: SearchState,
  formData: FormData
): Promise<SearchState> {
  const playerCode = formData
    .get("id")
    ?.toString()
    .trim()
    .toLowerCase();

  if (!playerCode) {
    return {
      error: "برجاء إدخال كود اللاعب.",
    };
  }

  const supabase = await createClient();

  const { data } = await supabase
    .from("players")
    .select("player_code")
    .eq("player_code", playerCode)
    .maybeSingle();

  if (!data) {
    return {
      error:
        "هذا الكود غير موجود، تأكد من كتابته أو تواصل مع الكابتن أحمد سمرة.",
    };
  }

  redirect(`/player/${playerCode}`);
}