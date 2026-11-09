export type GalleryImage = {
  id: string;
  image_url: string;
  title_ar: string;
  title_en?: string | null;
  description_ar?: string | null;
  description_en?: string | null;
  category?: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type CreateGalleryImageInput = {
  image_url: string;
  title_ar: string;
  title_en?: string | null;
  description_ar?: string | null;
  description_en?: string | null;
  category?: string | null;
  display_order?: number;
  is_active?: boolean;
};

export type UpdateGalleryImageInput = Partial<CreateGalleryImageInput>;

