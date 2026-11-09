-- Migration: Create gallery_images table and gallery storage bucket
-- Description: Dynamic gallery for Ahmed Samra Tennis Academy with titles, descriptions, categories, and slider ordering

-- 1. Create gallery_images table
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    title_en TEXT,
    description_ar TEXT,
    description_en TEXT,
    category TEXT DEFAULT 'academy',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_gallery_images_display_order ON public.gallery_images (display_order ASC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_images_is_active ON public.gallery_images (is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotent execution)
DROP POLICY IF EXISTS "Allow public read access to active gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Allow coach insert gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Allow coach update gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Allow coach delete gallery images" ON public.gallery_images;

-- RLS Policies
CREATE POLICY "Allow public read access to active gallery images"
ON public.gallery_images
FOR SELECT
TO anon, authenticated, service_role
USING (true);

CREATE POLICY "Allow coach insert gallery images"
ON public.gallery_images
FOR INSERT
TO anon, authenticated, service_role
WITH CHECK (true);

CREATE POLICY "Allow coach update gallery images"
ON public.gallery_images
FOR UPDATE
TO anon, authenticated, service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow coach delete gallery images"
ON public.gallery_images
FOR DELETE
TO anon, authenticated, service_role
USING (true);

-- Updated_at Trigger
CREATE OR REPLACE FUNCTION public.handle_gallery_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_gallery_images_updated_at ON public.gallery_images;
CREATE TRIGGER set_gallery_images_updated_at
BEFORE UPDATE ON public.gallery_images
FOR EACH ROW
EXECUTE FUNCTION public.handle_gallery_images_updated_at();

-- 2. Storage Bucket Setup
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies
DROP POLICY IF EXISTS "Public can view gallery objects" ON storage.objects;
CREATE POLICY "Public can view gallery objects"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Allow upload to gallery bucket" ON storage.objects;
CREATE POLICY "Allow upload to gallery bucket"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Allow update in gallery bucket" ON storage.objects;
CREATE POLICY "Allow update in gallery bucket"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Allow delete from gallery bucket" ON storage.objects;
CREATE POLICY "Allow delete from gallery bucket"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'gallery');

-- 3. Initial Seed Data (if table is empty)
INSERT INTO public.gallery_images (image_url, title_ar, title_en, description_ar, description_en, category, display_order, is_active)
SELECT 
    'https://images.pexels.com/photos/22931874/pexels-photo-22931874.jpeg?auto=compress&cs=tinysrgb&w=1800',
    'تدريبات الخط الخلفي المكثفة',
    'Intensive Baseline Drills',
    'تطوير الدقة والتحكم وقوة الضربات من الخط الخلفي للملعب تحت إشراف تدريبي دقيق.',
    'Developing accuracy, control, and power from the baseline under precision coaching.',
    'تدريب',
    1,
    true
WHERE NOT EXISTS (SELECT 1 FROM public.gallery_images LIMIT 1);

INSERT INTO public.gallery_images (image_url, title_ar, title_en, description_ar, description_en, category, display_order, is_active)
SELECT 
    'https://images.pexels.com/photos/23379620/pexels-photo-23379620.jpeg?auto=compress&cs=tinysrgb&w=1400',
    'إتقان الإرسال والانطلاق',
    'Serve Mastery & Readiness',
    'التركيز على الميكانيكا الحركية الصحيحة للإرسال وقوة التوجيه في المباريات التنافسية.',
    'Focusing on proper biomechanics of serving and tactical placement in competition.',
    'إرسال',
    2,
    true
WHERE (SELECT COUNT(*) FROM public.gallery_images) = 1;

INSERT INTO public.gallery_images (image_url, title_ar, title_en, description_ar, description_en, category, display_order, is_active)
SELECT 
    'https://images.pexels.com/photos/23379591/pexels-photo-23379591.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'مهارات اللعب عند الشبكة والكرات الهوائية',
    'Net Play & Volley Precision',
    'تمارين رد الفعل السريع والتمركز الذكي لحسم النقاط في المواقف التكتيكية المختلفة.',
    'Refining rapid reaction times and court positioning to finish decisive points.',
    'مهارات',
    3,
    true
WHERE (SELECT COUNT(*) FROM public.gallery_images) = 2;

INSERT INTO public.gallery_images (image_url, title_ar, title_en, description_ar, description_en, category, display_order, is_active)
SELECT 
    'https://images.pexels.com/photos/23379592/pexels-photo-23379592.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'روح الفريق والشغف باللعبة',
    'Team Spirit & Sportsmanship',
    'بناء شخصية اللاعب الرياضية وتعزيز قيم الالتزام والشغف برياضة التنس داخل وخارج الملعب.',
    'Cultivating athletic character, discipline, and enduring passion for tennis.',
    'الأكاديمية',
    4,
    true
WHERE (SELECT COUNT(*) FROM public.gallery_images) = 3;

