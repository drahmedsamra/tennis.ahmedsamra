import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AboutSection } from "@/components/layouts/about-section";
import { ContactSection } from "@/components/layouts/contact-section";
import { GallerySlider } from "@/components/layouts/gallery-slider";
import { HeroSection } from "@/components/layouts/hero/hero-section";
import { MobileContactActions } from "@/components/layouts/mobile-contact-actions";
import { PlayerAccessSection } from "@/components/layouts/player-access-section";
import { PlayerRegistrationForm } from "@/components/layouts/player-registration-form";
import { PricingSection } from "@/components/layouts/pricing-section";
import { ServicesSection } from "@/components/layouts/services-section";
import { TestimonialsSection } from "@/components/layouts/testimonials-section";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteNavbar } from "@/components/layouts/site-navbar";
import { getMarketingNavLinks } from "@/config/navigation";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import PlayerHero from "@/components/player/playerid/PlayerHero";
import PlayerDashboard from "@/components/player/playerid/PlayerDashboard";
import PlayerDetails from "@/components/player/playerid/PlayerDetails";
import PlayerReports from "@/components/player/playerid/PlayerReports";
import type { SearchState } from "@/app/(player)/player/actions";
import type { Player } from "@/types/player";
import type { Report } from "@/types/reports";
import type { GalleryImage } from "@/types/gallery";

type PlayerSearchAction = (
  prevState: SearchState,
  formData: FormData,
) => Promise<SearchState>;

type PlayerDashboardData = {
  player: Player;
  reports: Report[];
};

type HomePageProps = {
  dictionary: Dictionary;
  locale: Locale;
  playerDashboard?: PlayerDashboardData;
  playerSearchAction?: PlayerSearchAction;
  playerSearchRedirectToHome?: boolean;
  galleryImages?: GalleryImage[];
};

export function HomePage({
  dictionary,
  locale,
  playerDashboard,
  playerSearchAction,
  playerSearchRedirectToHome = false,
  galleryImages = [],
}: HomePageProps) {
  const navLinks = getMarketingNavLinks(dictionary);

  if (playerDashboard) {
    const { player, reports } = playerDashboard;

    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-5 sm:px-6 sm:py-8">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-900"
          >
            <ArrowRight className="size-4" aria-hidden />
            العودة للرئيسية / البحث عن لاعب آخر
          </Link>

          <PlayerHero player={player} reportsCount={reports.length} />
          <PlayerDashboard reportsCount={reports.length} />
          <PlayerDetails player={player} />
          <PlayerReports playerCode={player.player_code} reports={reports} />
        </div>
      </main>
    );
  }

  return (
    <>
      <SiteNavbar
        brand={dictionary.nav.brand}
        links={navLinks}
        locale={locale}
      />

      <main>
        <HeroSection
          locale={locale}
          content={dictionary.hero}
        />

        <PlayerRegistrationForm
          locale={locale}
          content={dictionary.registration}
        />

        <PlayerAccessSection
          locale={locale}
          searchAction={playerSearchAction}
          redirectToHome={playerSearchRedirectToHome}
        />

        <PricingSection content={dictionary.pricing} locale={locale} />

        <ServicesSection
          content={dictionary.services}
        />

        <AboutSection
          content={dictionary.about}
          locale={locale}
        />

        <GallerySlider
          content={dictionary.gallery}
          locale={locale}
          initialImages={galleryImages}
        />

        <TestimonialsSection
          content={dictionary.testimonials}
          locale={locale}
        />

        <ContactSection
          content={dictionary.contact}
        />
      </main>

      <MobileContactActions
        callLabel={dictionary.contact.actions.call}
        whatsappLabel={dictionary.contact.actions.whatsapp}
      />

      <SiteFooter
        brand={dictionary.nav.brand}
        content={dictionary.footer}
        links={navLinks}
      />
    </>
  );
}
