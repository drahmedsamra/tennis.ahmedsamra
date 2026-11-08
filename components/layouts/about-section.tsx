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
    <section id="about" aria-labelledby="about-heading" className="border-b border-border/70 bg-[#eaf3ec]">
      <div className="marketing-shell grid gap-8 py-10 sm:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:py-28">
        <div>
          <p className="marketing-kicker">{content.eyebrow}</p>
          <h2 id="about-heading" className="marketing-heading mt-5 max-w-xl">
            {content.heading}
          </h2>
          <div className="marketing-copy mt-4 max-w-xl space-y-3 sm:mt-6 sm:space-y-5">
            {content.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground sm:mt-8"
          >
            {contactLabel}
            <ArrowUpLeft
              className={`size-4 ${locale === "ar" ? "rotate-180" : ""}`}
              aria-hidden
            />
          </Link>
        </div>

        <ol className="grid grid-cols-2 border-t border-border/80 sm:block sm:border-y">
          {content.roles.map((role, index) => (
            <li
              key={role.title}
              className="flex min-h-28 flex-col border-b border-border/80 p-4 odd:border-e sm:grid sm:min-h-0 sm:grid-cols-[3rem_minmax(0,0.7fr)_1.3fr_auto] sm:items-center sm:gap-5 sm:border-e-0 sm:p-0 sm:py-5 sm:last:border-b-0"
            >
              <span className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-sm font-semibold leading-6 text-foreground sm:mt-0 sm:text-base sm:leading-normal">{role.title}</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground sm:mt-0 sm:text-sm sm:leading-7">{role.description}</p>
              <CircleCheck className="hidden size-5 text-primary sm:block" aria-hidden />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
