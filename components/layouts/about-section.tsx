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
    <section id="about" aria-labelledby="about-heading" className="border-y border-emerald-700/20 bg-[#e8f2e9] dark:bg-emerald-950/20 shadow-[inset_0_4px_12px_rgba(0,0,0,0.04),inset_0_-4px_12px_rgba(0,0,0,0.04)]">
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

        <ol className="flex flex-col gap-3">
          {content.roles.map((role, index) => (
            <li
              key={role.title}
              className="flex flex-col rounded-2xl border-2 border-emerald-600/20 bg-white dark:bg-slate-900 p-4 sm:grid sm:grid-cols-[3rem_minmax(0,0.7fr)_1.3fr_auto] sm:items-center sm:gap-5 sm:p-5 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all"
            >
              <span className="flex size-8 items-center justify-center rounded-xl bg-emerald-500/10 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white sm:mt-0 sm:text-base">
                {role.title}
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 sm:mt-0 sm:text-sm">
                {role.description}
              </p>
              <CircleCheck className="hidden size-5 text-emerald-600 sm:block" aria-hidden />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
