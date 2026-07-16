import Link from "next/link";

import type { Dictionary } from "@/lib/i18n/get-dictionary";

type AboutSectionProps = {
  content: Dictionary["about"];
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-14 lg:scroll-mt-16"
    >
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-28">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            {content.eyebrow}
          </p>

          <h2
            id="about-heading"
            className="mt-5 text-4xl font-bold text-foreground sm:text-5xl"
          >
            {content.heading}
          </h2>

          <div className="mx-auto mt-8 max-w-3xl space-y-6">

            {content.story.slice(0, 2).map((paragraph) => (
              <p
                key={paragraph}
                className="text-lg leading-9 text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}

          </div>

          <div className="mt-12">

            <Link
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
            >
              تواصل معي
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}