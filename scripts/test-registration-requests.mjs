import { createClient } from "@supabase/supabase-js";

const url = "https://grivtklckeaphdrjjkpb.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyaXZ0a2xja2VhcGhkcmpqa3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwMTc5NTAsImV4cCI6MjA5OTU5Mzk1MH0.KXR1NTk8vkLR2cpgNpxlatBoiUXq6N7QSGYepcThWaw";

const supabase = createClient(url, key);

async function test() {
  console.log("=== Checking Supabase for player_registration_requests ===");
  const { error } = await supabase
    .from("player_registration_requests")
    .select("id")
    .limit(1);

  if (error && error.code === "PGRST205") {
    console.log("⚠️ Table does not exist yet in database schema cache.");
    console.log("👉 Please run the migration SQL in Supabase SQL Editor.");
    return false;
  }

  if (error) {
    console.error("❌ Unexpected error:", error);
    return false;
  }

  console.log("✅ Table public.player_registration_requests exists and is accessible!");

  // Test insert
  console.log("Testing sample registration insertion...");
  const sample = {
    player_name: "أحمد سمرة (تجربة فحص)",
    date_of_birth: "2014-05-15",
    age: 12,
    gender: "Male",
    parent_name: "محمد سمرة",
    mobile_number: "01007031009",
    whatsapp_number: "01007031009",
    email: "test@ahmedsamra.com",
    played_before: true,
    current_level: "Intermediate",
    tennis_experience: "1–3 Years",
    tournament_experience: true,
    current_club: "Al Mansoura Club",
    previous_coach: "Captain Ahmed",
    preferred_training_type: "Private",
    preferred_days: ["Saturday", "Monday", "Wednesday"],
    preferred_time: "Evening",
    additional_notes: "طلب تسجيل تجريبي للتأكد من نجاح الربط و RLS",
    status: "pending",
  };

  const { data: inserted, error: insertError } = await supabase
    .from("player_registration_requests")
    .insert(sample)
    .select()
    .single();

  if (insertError) {
    console.error("❌ Insert failed:", insertError.message);
    return false;
  }

  console.log("✅ Insert succeeded! ID:", inserted.id);

  // Test read back
  const { data: readBack, error: readError } = await supabase
    .from("player_registration_requests")
    .select("*")
    .eq("id", inserted.id)
    .single();

  if (readError) {
    console.error("❌ Read failed:", readError.message);
    return false;
  }

  console.log("✅ Retrieved successfully:", readBack.player_name, "| Status:", readBack.status);

  // Test status update
  const { data: updated, error: updateError } = await supabase
    .from("player_registration_requests")
    .update({ status: "contacted" })
    .eq("id", inserted.id)
    .select()
    .single();

  if (updateError) {
    console.error("❌ Status update failed:", updateError.message);
    return false;
  }

  console.log("✅ Status updated successfully to:", updated.status);

  // Cleanup test record
  await supabase.from("player_registration_requests").delete().eq("id", inserted.id);
  console.log("✅ Cleaned up test record.");
  console.log("=== All Tests Passed 100% ===");
  return true;
}

test();
