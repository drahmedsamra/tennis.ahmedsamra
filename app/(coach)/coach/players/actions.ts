"use server";

import { redirect } from "next/navigation";

import {
  createPlayer,
  updatePlayer as updatePlayerService,
} from "@/services/players";

import type { NewPlayer } from "@/types/player";

function buildPlayer(formData: FormData): NewPlayer {
  return {
    player_code: formData.get("player_code")?.toString().trim() ?? "",

    egypt_tennis_id: formData.get("egypt_tennis_id")
      ? Number(formData.get("egypt_tennis_id"))
      : null,

    preferred_name_ar:
      formData.get("preferred_name_ar")?.toString().trim() ?? "",

    preferred_name_en:
      formData.get("preferred_name_en")?.toString().trim() ?? "",

    full_name_ar:
      formData.get("full_name_ar")?.toString().trim() ?? "",

    full_name_en:
      formData.get("full_name_en")?.toString().trim() ?? "",

    birth_year: Number(formData.get("birth_year")) || 0,

    gender: formData.get("gender")?.toString() ?? "",

    dominant_hand:
      formData.get("dominant_hand")?.toString() ?? "",

    dominant_eye:
      formData.get("dominant_eye")?.toString() ?? "",

    primary_club:
      formData.get("primary_club")?.toString().trim() || null,

    private_coach:
      formData.get("private_coach")?.toString().trim() || null,

    parent_name:
      formData.get("parent_name")?.toString().trim() || null,

    parent_phone:
      formData.get("parent_phone")?.toString().trim() || null,

    notes:
      formData.get("notes")?.toString().trim() || null,

    photo_url: null,

    active: true,
  };
}

export async function savePlayer(formData: FormData) {
  const player = buildPlayer(formData);

  await createPlayer(player);

  redirect("/coach/players");
}

export async function updatePlayer(
  id: string,
  formData: FormData
) {
  const player = buildPlayer(formData);

  await updatePlayerService(id, player);

  redirect("/coach/players");
}