import { createClient } from "@supabase/supabase-js";

const url = "https://grivtklckeaphdrjjkpb.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyaXZ0a2xja2VhcGhkcmpqa3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwMTc5NTAsImV4cCI6MjA5OTU5Mzk1MH0.KXR1NTk8vkLR2cpgNpxlatBoiUXq6N7QSGYepcThWaw";

const supabase = createClient(url, key);

async function test() {
  console.log("=== Checking Supabase for gallery_images table ===");
  const { data, error } = await supabase
    .from("gallery_images")
    .select("id, title_ar, image_url, is_active, display_order")
    .limit(5);

  if (error && error.code === "PGRST205") {
    console.log("⚠️ Table 'gallery_images' does not exist yet in schema cache.");
    console.log("👉 Please run the migration SQL in Supabase SQL Editor.");
    return false;
  }

  if (error) {
    console.error("❌ Unexpected error:", error);
    return false;
  }

  console.log("✅ Table public.gallery_images exists and is accessible!");
  console.log(`Found ${data.length} images:`);
  data.forEach((img, i) => {
    console.log(`  [${i + 1}] (${img.display_order}) ${img.title_ar} - active: ${img.is_active}`);
  });

  return true;
}

test();

