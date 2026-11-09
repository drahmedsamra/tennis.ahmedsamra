"use server";

import { createRegistrationRequest } from "@/services/registration-requests";
import type { NewPlayerRegistrationRequest } from "@/types/registration-request";

export type RegistrationFormState = {
  success: boolean;
  message?: string;
  error?: string;
};

function calculateAge(dobString: string): number {
  const dob = new Date(dobString);
  if (Number.isNaN(dob.getTime())) return 0;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return Math.max(0, age);
}

export async function submitPlayerRegistration(
  _prevState: RegistrationFormState,
  formData: FormData
): Promise<RegistrationFormState> {
  try {
    const playerName = formData.get("player_name")?.toString().trim();
    const dateOfBirth = formData.get("date_of_birth")?.toString().trim();
    const gender = formData.get("gender")?.toString().trim();
    const mobileNumber = formData.get("mobile_number")?.toString().trim();

    if (!playerName || playerName.length < 2) {
      return {
        success: false,
        error: "يرجى إدخال اسم اللاعب بشكل صحيح / Please enter a valid player name",
      };
    }

    if (!dateOfBirth) {
      return {
        success: false,
        error: "يرجى تحديد تاريخ الميلاد / Please provide the date of birth",
      };
    }

    if (!gender) {
      return {
        success: false,
        error: "يرجى اختيار النوع / Please select a gender",
      };
    }

    if (!mobileNumber || mobileNumber.length < 8) {
      return {
        success: false,
        error: "يرجى إدخال رقم هاتف صحيح / Please enter a valid mobile number",
      };
    }

    const age = calculateAge(dateOfBirth);

    const parentName = formData.get("parent_name")?.toString().trim() || null;
    const egyptTennisId =
      formData.get("egypt_tennis_id")?.toString().trim() || null;
    const preferredPlayerCode =
      formData.get("preferred_player_code")?.toString().trim().toUpperCase() || null;
    const whatsappNumber =
      formData.get("whatsapp_number")?.toString().trim() || null;
    const email = formData.get("email")?.toString().trim() || null;

    const playedBefore = formData.get("played_before") === "true";
    const currentLevel =
      formData.get("current_level")?.toString().trim() || null;
    const tennisExperience =
      formData.get("tennis_experience")?.toString().trim() || null;
    const tournamentExperience =
      formData.get("tournament_experience") === "true";
    const currentClub =
      formData.get("current_club")?.toString().trim() || null;
    const previousCoach =
      formData.get("previous_coach")?.toString().trim() || null;

    const preferredTrainingType =
      formData.get("preferred_training_type")?.toString().trim() || null;

    // Multiple selection for preferred days
    const preferredDays = formData
      .getAll("preferred_days")
      .map((d) => d.toString().trim())
      .filter(Boolean);

    const preferredTime =
      formData.get("preferred_time")?.toString().trim() || null;
    const additionalNotes =
      formData.get("additional_notes")?.toString().trim() || null;

    const newRequest: NewPlayerRegistrationRequest = {
      player_name: playerName,
      date_of_birth: dateOfBirth,
      age,
      gender,
      parent_name: parentName,
      egypt_tennis_id: egyptTennisId,
      preferred_player_code: preferredPlayerCode,
      mobile_number: mobileNumber,
      whatsapp_number: whatsappNumber,
      email,
      played_before: playedBefore,
      tennis_experience: tennisExperience,
      current_level: currentLevel,
      tournament_experience: tournamentExperience,
      current_club: currentClub,
      previous_coach: previousCoach,
      preferred_training_type: preferredTrainingType,
      preferred_days: preferredDays,
      preferred_time: preferredTime,
      additional_notes: additionalNotes,
    };

    await createRegistrationRequest(newRequest);

    return {
      success: true,
      message:
        "Your registration has been submitted successfully! We will contact you soon.",
    };
  } catch (err: unknown) {
    console.error("Failed to submit player registration:", err);
    let errorMsg =
      "حدث خطأ غير متوقع أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.";

    if (err instanceof Error) {
      if (err.message.includes("schema cache") || err.message.includes("PGRST205")) {
        errorMsg =
          "قاعدة البيانات: جدول player_registration_requests لم يتم إنشاؤه في Supabase بعد. يرجى تشغيل كود الـ SQL في Supabase SQL Editor أولاً.";
      } else {
        errorMsg = err.message;
      }
    } else if (typeof err === "object" && err !== null && "message" in err) {
      errorMsg = String((err as { message: unknown }).message);
    }

    return {
      success: false,
      error: errorMsg,
    };
  }
}

