"use server";

import { revalidatePath } from "next/cache";
import {
  updateRegistrationRequestStatus,
} from "@/services/registration-requests";
import { createPlayer } from "@/services/players";
import { createClient } from "@/lib/supabase/server";
import type { RegistrationRequestStatus } from "@/types/registration-request";
import type { NewPlayer } from "@/types/player";

export async function updateRequestStatusAction(
  id: string,
  status: RegistrationRequestStatus
) {
  try {
    await updateRegistrationRequestStatus(id, status);
    revalidatePath("/coach/registrations");
    revalidatePath("/coach");
    return { success: true };
  } catch (error) {
    console.error("Failed to update registration status:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update registration status",
    };
  }
}

export async function convertRequestToPlayerAction(
  requestId: string,
  customCode?: string
) {
  try {
    const supabase = await createClient();

    // 1. Fetch the registration request
    const { data: request, error: reqError } = await supabase
      .from("player_registration_requests")
      .select("*")
      .eq("id", requestId)
      .single();

    if (reqError || !request) {
      throw new Error("طلب التسجيل غير موجود.");
    }

    // 2. Determine or generate unique player code
    let finalCode = (
      customCode ||
      request.preferred_player_code ||
      ""
    )
      .trim()
      .toUpperCase();

    // Check existing codes to prevent duplicate
    const { data: existingPlayers } = await supabase
      .from("players")
      .select("player_code");

    const takenCodes = new Set(
      (existingPlayers || []).map((p) => p.player_code?.toUpperCase())
    );

    if (!finalCode) {
      // Auto generate random AS-XXXX
      let attempts = 0;
      do {
        const randNum = Math.floor(1000 + Math.random() * 9000);
        finalCode = `AS-${randNum}`;
        attempts++;
      } while (takenCodes.has(finalCode) && attempts < 50);
    } else if (takenCodes.has(finalCode)) {
      // If requested code is already taken, append a number
      let counter = 1;
      while (takenCodes.has(`${finalCode}-${counter}`)) {
        counter++;
      }
      finalCode = `${finalCode}-${counter}`;
    }

    // 3. Prepare birth year
    let birthYear = new Date().getFullYear() - (request.age || 10);
    if (request.date_of_birth) {
      const parsedYear = new Date(request.date_of_birth).getFullYear();
      if (!isNaN(parsedYear) && parsedYear > 1950) {
        birthYear = parsedYear;
      }
    }

    const nameParts = (request.player_name || "").trim().split(/\s+/);
    const firstName = nameParts[0] || "لاعب";

    let federationIdNum: number | null = null;
    if (request.egypt_tennis_id) {
      const parsed = parseInt(String(request.egypt_tennis_id).replace(/\D/g, ""), 10);
      if (!isNaN(parsed)) {
        federationIdNum = parsed;
      }
    }

    const notesSummary = [
      request.current_level ? `المستوى: ${request.current_level}` : null,
      request.preferred_training_type
        ? `نوع التدريب: ${request.preferred_training_type}`
        : null,
      request.preferred_days && request.preferred_days.length > 0
        ? `الأيام المفضلة: ${request.preferred_days.join("، ")}`
        : null,
      request.preferred_time ? `الميعاد: ${request.preferred_time}` : null,
      request.additional_notes ? `ملاحظات: ${request.additional_notes}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const newPlayerData: NewPlayer = {
      player_code: finalCode,
      egypt_tennis_id: federationIdNum,
      preferred_name_ar: firstName,
      preferred_name_en: firstName,
      full_name_ar: request.player_name,
      full_name_en: request.player_name,
      birth_year: birthYear,
      gender:
        request.gender === "Female" || request.gender === "أنثى"
          ? "Female"
          : "Male",
      dominant_hand: "Right",
      dominant_eye: "Right",
      primary_club: request.current_club || null,
      private_coach: request.previous_coach || null,
      parent_name: request.parent_name || null,
      parent_phone: request.mobile_number || null,
      photo_url: null,
      notes: notesSummary || null,
      active: true,
    };

    // 4. Insert into players table
    const created = await createPlayer(newPlayerData);

    // 5. Update request status to 'approved'
    await updateRegistrationRequestStatus(requestId, "approved");

    // 6. Build WhatsApp greeting text
    const parentOrPlayerName = request.parent_name || request.player_name;
    const whatsappGreeting = `مرحباً ${parentOrPlayerName}، أهلاً بك في أكاديمية أحمد سمرة للتنس! 🎾
تم اعتماد تسجيل اللاعب (${request.player_name}) بنجاح وإنشاء ملفه الرياضي.
كود اللاعب الخاص بك للمتابعة الفنية هو: *${finalCode}*
يمكنك الدخول به لمتابعة تقاريرك الدورية وملاحظات التدريب عبر الرابط التالي:
https://tennis.ahmedsamra.com/#player-portal`;

    const cleanPhone = (request.whatsapp_number || request.mobile_number).replace(
      /\D/g,
      ""
    );
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
      whatsappGreeting
    )}`;

    revalidatePath("/coach/registrations");
    revalidatePath("/coach/players");
    revalidatePath("/coach");

    return {
      success: true,
      player: created,
      playerCode: finalCode,
      whatsappUrl,
      whatsappGreeting,
    };
  } catch (error) {
    console.error("Failed to convert registration request to player:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "فشل تحويل طلب التسجيل إلى لاعب رسمي.",
    };
  }
}
