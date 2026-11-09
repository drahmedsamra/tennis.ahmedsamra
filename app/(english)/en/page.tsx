import type { Metadata } from "next";

import { searchPlayer } from "@/app/(player)/player/actions";
import { HomePage } from "@/components/layouts/home-page";
import { JsonLd } from "@/components/seo/json-ld";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getActiveGalleryImages } from "@/services/gallery";

const locale = "en";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary(locale);

  return createPageMetadata({ locale, dictionary });
}

export default async function Page() {
  const dictionary = await getDictionary(locale);
  const galleryImages = await getActiveGalleryImages();

  return (
    <>
      <JsonLd locale={locale} />
      <HomePage
        dictionary={dictionary}
        locale={locale}
        playerSearchAction={searchPlayer}
        galleryImages={galleryImages}
      />
    </>
  );
}
