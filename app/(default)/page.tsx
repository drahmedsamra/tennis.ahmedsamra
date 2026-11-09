import type { Metadata } from "next";

import { HomePage } from "@/components/layouts/home-page";
import { JsonLd } from "@/components/seo/json-ld";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createPageMetadata } from "@/lib/seo/metadata";
import { searchPlayer } from "@/app/(player)/player/actions";
import { getPlayer } from "@/services/players";
import { getActiveGalleryImages } from "@/services/gallery";
import type { Player } from "@/types/player";
import type { Report } from "@/types/reports";

const locale = "ar";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary(locale);

  return createPageMetadata({ locale, dictionary });
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ player?: string }>;
}) {
  const dictionary = await getDictionary(locale);
  const galleryImages = await getActiveGalleryImages();
  const { player: playerCode } = await searchParams;
  let playerDashboard:
    | { player: Player; reports: Report[] }
    | undefined;

  if (playerCode) {
    try {
      const { player, reports } = await getPlayer(playerCode);
      playerDashboard = {
        player: player as Player,
        reports: reports as Report[],
      };
    } catch {
      playerDashboard = undefined;
    }
  }

  return (
    <>
      <JsonLd locale={locale} />
      <HomePage
        dictionary={dictionary}
        locale={locale}
        playerDashboard={playerDashboard}
        playerSearchAction={searchPlayer}
        playerSearchRedirectToHome
        galleryImages={galleryImages}
      />
    </>
  );
}
