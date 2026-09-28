import { AboutSection } from "@/components/layouts/about-section";
import { ContactSection } from "@/components/layouts/contact-section";
import { HeroSection } from "@/components/layouts/hero/hero-section";
import { PlayerAccessSection } from "@/components/layouts/player-access-section";
import { ServicesSection } from "@/components/layouts/services-section";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteNavbar } from "@/components/layouts/site-navbar";
import { BenefitsSection } from "@/components/layouts/benefits/benefits-section";
import { AchievementsSection } from "@/components/layouts/achievements-section";
import { getMarketingNavLinks } from "@/config/navigation";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { AssessmentSection } from "@/components/layouts/assessment";

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

        <AssessmentSection locale={locale} />

        <PlayerAccessSection locale={locale} />

        <BenefitsSection locale={locale} />

        <ServicesSection
          content={dictionary.services}
        />

        <AboutSection
          content={dictionary.about}
          locale={locale}
        />

        <AchievementsSection content={dictionary.achievements} />

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
