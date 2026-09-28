import Link from "next/link";
import { ArrowUpLeft, CircleCheck } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type AboutSectionProps = {
  content: Dictionary["about"];
  locale: Locale;
};

export function AboutSection({ content, locale }: AboutSectionProps) {
  const contactLabel = locale === "ar" ? "تواصل مع أحمد" : "Contact Ahmed";

  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-border/70 bg-background">
      <div className="marketing-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:py-28">
        <div>
          <p className="marketing-kicker">{content.eyebrow}</p>
          <h2 id="about-heading" className="marketing-heading mt-5 max-w-xl">
            {content.heading}
          </h2>
          <div className="marketing-copy mt-6 max-w-xl space-y-5">
            {content.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
          >
            {contactLabel}
            <ArrowUpLeft
              className={`size-4 ${locale === "ar" ? "rotate-180" : ""}`}
              aria-hidden
            />
          </Link>
        </div>

        <ol className="border-y border-border/80">
          {content.roles.map((role, index) => (
            <li
              key={role.title}
              className="grid gap-3 border-b border-border/80 py-5 last:border-b-0 sm:grid-cols-[3rem_minmax(0,0.7fr)_1.3fr_auto] sm:items-center sm:gap-5"
            >
              <span className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="text-base font-semibold text-foreground">{role.title}</h3>
              <p className="text-sm leading-7 text-muted-foreground">{role.description}</p>
              <CircleCheck className="hidden size-5 text-primary sm:block" aria-hidden />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
