import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type HeroActionsProps = {
  content: Dictionary["hero"];
  locale: Locale;
};

export function HeroActions({ content, locale }: HeroActionsProps) {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        href="#register"
        className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow-md"
      >
        <span>{content.cta.book}</span>
        <ArrowIcon className="size-4" aria-hidden />
      </Link>

      <Link
        href="#player-portal"
        className="inline-flex h-12 items-center justify-center rounded-xl border border-border/80 bg-white/80 px-6 text-sm font-semibold text-foreground backdrop-blur-xs transition hover:border-primary hover:text-primary"
      >
        {content.cta.portal}
      </Link>
    </div>
  );
}
