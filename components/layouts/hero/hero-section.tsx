import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

import {
  HeroActions,
  HeroAssessmentCard,
  HeroContent,
  HeroFeatures,
  HeroImage,
  HeroStats,
  HeroSteps,
} from ".";

type HeroSectionProps = {
  locale: Locale;
  content: Dictionary["hero"];
};

export function HeroSection({
  locale,
  content,
}: HeroSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-primary/5 py-12 lg:py-16"
    >
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-primary/10 blur-[110px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2">
        <div>
          <HeroContent />

          <HeroFeatures />

          <HeroActions isRtl={isRtl} />

          <HeroAssessmentCard />

          <HeroStats />

          <HeroSteps />
        </div>

        <HeroImage />
      </div>
    </section>
  );
}