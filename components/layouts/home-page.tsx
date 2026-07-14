import { AboutSection } from "@/components/layouts/about-section";
import { AchievementsSection } from "@/components/layouts/achievements-section";
import { ContactSection } from "@/components/layouts/contact-section";
import { CtaSection } from "@/components/layouts/cta-section";
import { GallerySection } from "@/components/layouts/gallery-section";
import { HeroSection } from "@/components/layouts/hero-section";
import { PlayerPortalSection } from "@/components/layouts/player-portal-section";
import { ServicesSection } from "@/components/layouts/services-section";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteNavbar } from "@/components/layouts/site-navbar";
import { TestimonialsSection } from "@/components/layouts/testimonials-section";
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
        <HeroSection locale={locale} content={dictionary.hero} />
        <AboutSection content={dictionary.about} />
        <AchievementsSection content={dictionary.achievements} />
        <ServicesSection content={dictionary.services} />
        <GallerySection content={dictionary.gallery} locale={locale} />
        <TestimonialsSection content={dictionary.testimonials} />
        <PlayerPortalSection content={dictionary.playerPortal} />
        <CtaSection content={dictionary.cta} />
        <ContactSection content={dictionary.contact} />
      </main>
      <SiteFooter
        brand={dictionary.nav.brand}
        content={dictionary.footer}
        links={navLinks}
      />
    </>
  );
}
