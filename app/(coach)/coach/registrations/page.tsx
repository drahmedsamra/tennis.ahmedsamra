import { getRegistrationRequests } from "@/services/registration-requests";
import { RegistrationRequestsView } from "@/components/coach/RegistrationRequestsView";
import type { PlayerRegistrationRequest } from "@/types/registration-request";

export const dynamic = "force-dynamic";

export default async function CoachRegistrationsPage() {
  let requests: PlayerRegistrationRequest[] = [];
  let loadError: string | null = null;

  try {
    requests = await getRegistrationRequests();
  } catch (error) {
    console.error("Failed to load registration requests:", error);
    loadError =
      error instanceof Error
        ? error.message
        : "Could not load registration requests. Please verify the database table exists.";
  }

  return (
    <div className="mx-auto max-w-7xl">
      {loadError ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="font-bold">Database setup note:</p>
          <p className="mt-1">
            The registration requests table is being initialized. Once the
            database migration is executed in the Supabase SQL Editor, all
            submitted requests will appear here immediately.
          </p>
        </div>
      ) : null}

      <RegistrationRequestsView initialRequests={requests} />
    </div>
  );
}

