import type { Metadata } from "next";
import GalleryManager from "@/components/coach/GalleryManager";
import { getAllGalleryImages } from "@/services/gallery";

export const metadata: Metadata = {
  title: "معرض الصور | Coach Ahmed Samra",
  description: "إدارة معرض صور أكاديمية أحمد سمرة للتنس",
};

export const revalidate = 0;

export default async function CoachGalleryPage() {
  const images = await getAllGalleryImages();

  return <GalleryManager initialImages={images} />;
}

