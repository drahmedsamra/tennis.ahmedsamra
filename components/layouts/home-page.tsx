import { AboutSection } from "@/components/layouts/about-section";
import { ContactSection } from "@/components/layouts/contact-section";
import { HeroSection } from "@/components/layouts/hero-section";
import { PlayerAccessSection } from "@/components/layouts/player-access-section";
import { ServicesSection } from "@/components/layouts/services-section";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteNavbar } from "@/components/layouts/site-navbar";

import { getMarketingNavLinks } from "@/config/navigation";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type HomePageProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function HomePage({ dictionary, locale }: HomePageProps) {
  const navLinks = getMarketingNavLinks(dictionary);

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

        <PlayerAccessSection />

        <ServicesSection
          content={dictionary.services}
        />

        <AboutSection
          content={dictionary.about}
        />

        <ContactSection
          content={dictionary.contact}
        />
      </main>

      <SiteFooter
        brand={dictionary.nav.brand}
        content={dictionary.footer}
        links={navLinks}
      />
    </>
  );
}