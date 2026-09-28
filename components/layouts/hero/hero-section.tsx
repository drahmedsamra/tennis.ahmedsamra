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
      className="relative isolate overflow-hidden border-b border-border/70 bg-background"
    >
      <div
        aria-hidden
        className="court-mark absolute -end-24 top-16 hidden size-80 opacity-60 lg:block"
      />

      <div className="marketing-shell relative grid gap-10 py-12 sm:py-16 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16 lg:py-16">
        <div className="order-2 lg:order-1 lg:py-8">
          <HeroContent content={content} locale={locale} />

          <HeroActions content={content} locale={locale} />

          <dl className="mt-10 grid border-y border-border/80 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 border-border/80 py-4 text-sm font-medium text-foreground sm:px-4 sm:first:ps-0 sm:not-last:border-e"
              >
                <Icon className="size-4 shrink-0 text-primary" aria-hidden />
                <dt>{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 lg:order-2">
          <HeroImage locale={locale} />
        </div>
      </div>
    </section>
  );
}
