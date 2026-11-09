import { createClient } from "@/lib/supabase/server";
import type {
  NewPlayerRegistrationRequest,
  PlayerRegistrationRequest,
  RegistrationRequestStatus,
} from "@/types/registration-request";

export async function createRegistrationRequest(
  data: NewPlayerRegistrationRequest
): Promise<PlayerRegistrationRequest> {
  const supabase = await createClient();

  const { data: inserted, error } = await supabase
    .from("player_registration_requests")
    .insert({
      ...data,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating registration request:", error);
    throw new Error(error.message || "Failed to insert registration request into Supabase");
  }

  return inserted as PlayerRegistrationRequest;
}

export type GetRequestsOptions = {
  status?: string;
  search?: string;
};

export async function getRegistrationRequests(
  options: GetRequestsOptions = {}
): Promise<PlayerRegistrationRequest[]> {
  const supabase = await createClient();

  let query = supabase
    .from("player_registration_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (options.status && options.status !== "all") {
    query = query.eq("status", options.status);
  }

  if (options.search && options.search.trim() !== "") {
    const term = `%${options.search.trim()}%`;
    query = query.or(
      `player_name.ilike.${term},mobile_number.ilike.${term},parent_name.ilike.${term}`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching registration requests:", error);
    throw error;
  }

  return (data ?? []) as PlayerRegistrationRequest[];
}

export async function getRegistrationRequestById(
  id: string
): Promise<PlayerRegistrationRequest | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("player_registration_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching registration request ${id}:`, error);
    return null;
  }

  return data as PlayerRegistrationRequest;
}

export async function updateRegistrationRequestStatus(
  id: string,
  status: RegistrationRequestStatus
): Promise<PlayerRegistrationRequest> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("player_registration_requests")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating registration request ${id}:`, error);
    throw error;
  }

  return data as PlayerRegistrationRequest;
}

export async function getRegistrationRequestStats() {
  try {
    const supabase = await createClient();

    const [totalRes, pendingRes, contactedRes, approvedRes, rejectedRes] =
      await Promise.all([
        supabase
          .from("player_registration_requests")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("player_registration_requests")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase
          .from("player_registration_requests")
          .select("*", { count: "exact", head: true })
          .eq("status", "contacted"),
        supabase
          .from("player_registration_requests")
          .select("*", { count: "exact", head: true })
          .eq("status", "approved"),
        supabase
          .from("player_registration_requests")
          .select("*", { count: "exact", head: true })
          .eq("status", "rejected"),
      ]);

    return {
      total: totalRes.count ?? 0,
      pending: pendingRes.count ?? 0,
      contacted: contactedRes.count ?? 0,
      approved: approvedRes.count ?? 0,
      rejected: rejectedRes.count ?? 0,
    };
  } catch (err) {
    console.error("Error fetching registration stats:", err);
    return {
      total: 0,
      pending: 0,
      contacted: 0,
      approved: 0,
      rejected: 0,
    };
  }
}

