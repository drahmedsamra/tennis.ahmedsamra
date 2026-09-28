import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type HeroActionsProps = {
  content: Dictionary["hero"];
  locale: Locale;
};

export function HeroActions({ content, locale }: HeroActionsProps) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        href="#contact"
        className="inline-flex h-12 items-center justify-center gap-3 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {content.cta.book}
        <ArrowUpLeft
          className={`size-4 ${locale === "ar" ? "rotate-180" : ""}`}
          aria-hidden
        />
      </Link>

      <Link
        href="#player-portal"
        className="inline-flex h-12 items-center justify-center border border-border bg-transparent px-6 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        {content.cta.portal}
      </Link>
    </div>
  );
}
