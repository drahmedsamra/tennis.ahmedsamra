import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { ClipboardCheck, FileText, Route } from "lucide-react";

import {
  HeroActions,
  HeroContent,
  HeroImage,
} from ".";

type HeroSectionProps = {
  locale: Locale;
  content: Dictionary["hero"];
};

export function HeroSection({
  locale,
  content,
}: HeroSectionProps) {
  const highlights = locale === "ar"
    ? [
        { icon: ClipboardCheck, label: "تدريب فردي" },
        { icon: FileText, label: "تحليل أداء" },
        { icon: Route, label: "خطة تطوير" },
      ]
    : [
        { icon: ClipboardCheck, label: "Individual coaching" },
        { icon: FileText, label: "Performance analysis" },
        { icon: Route, label: "Development plan" },
      ];

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden border-b border-border/70 bg-[#f8faf7]"
    >
      <div
        aria-hidden
        className="court-mark absolute -end-24 top-16 hidden size-80 opacity-60 lg:block"
      />

      <div className="marketing-shell relative grid gap-10 py-12 sm:py-16 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16 lg:py-16">
        <div className="order-2 lg:order-1 lg:py-8">
          <HeroContent content={content} locale={locale} />

          <HeroActions content={content} locale={locale} />

          <dl className="mt-10 grid grid-cols-3 border-y border-border/80">
            {highlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-1.5 border-border/80 py-3 text-xs font-medium text-foreground not-last:border-e sm:gap-3 sm:px-4 sm:py-4 sm:text-sm sm:first:ps-0"
              >
                <Icon className="size-3.5 shrink-0 text-primary sm:size-4" aria-hidden />
                <dt className="whitespace-nowrap">{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 lg:order-2">
          <HeroImage />
        </div>
      </div>
    </section>
  );
}
