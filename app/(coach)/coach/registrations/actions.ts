"use server";

import { revalidatePath } from "next/cache";
import { updateRegistrationRequestStatus } from "@/services/registration-requests";
import type { RegistrationRequestStatus } from "@/types/registration-request";

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

