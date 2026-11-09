import { createClient } from "@/lib/supabase/server";
import type {
  GalleryImage,
  CreateGalleryImageInput,
  UpdateGalleryImageInput,
} from "@/types/gallery";

/**
 * Fetches all active gallery images for public display
 * Ordered by display_order ascending, then created_at descending
 */
export async function getActiveGalleryImages(): Promise<GalleryImage[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      // Graceful fallback if table does not exist yet
      if (error.code === "PGRST205") {
        console.warn("gallery_images table does not exist in schema cache yet.");
        return [];
      }
      console.error("Error fetching active gallery images:", error);
      return [];
    }

    return (data as GalleryImage[]) || [];
  } catch (err) {
    console.error("Unexpected error in getActiveGalleryImages:", err);
    return [];
  }
}

/**
 * Fetches all gallery images (both active and inactive) for Coach Dashboard
 */
export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      if (error.code === "PGRST205") {
        console.warn("gallery_images table does not exist yet.");
        return [];
      }
      throw new Error(error.message);
    }

    return (data as GalleryImage[]) || [];
  } catch (err) {
    console.error("Error in getAllGalleryImages:", err);
    return [];
  }
}

/**
 * Creates a new gallery image record
 */
export async function createGalleryImage(
  input: CreateGalleryImageInput
): Promise<GalleryImage> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .insert([input])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as GalleryImage;
}

/**
 * Updates an existing gallery image record
 */
export async function updateGalleryImage(
  id: string,
  input: UpdateGalleryImageInput
): Promise<GalleryImage> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as GalleryImage;
}

/**
 * Deletes a gallery image record
 */
export async function deleteGalleryImage(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

