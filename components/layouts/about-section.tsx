import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type AboutSectionProps = {
  content: Dictionary["about"];
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-14 overflow-hidden lg:scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl px-6 py-32 lg:px-8 lg:py-44">
        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 xl:gap-28">
          <div className="luxury-reveal">
            <p className="text-[0.6875rem] font-semibold tracking-[0.28em] text-primary uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="about-heading"
              className="mt-6 max-w-3xl text-3xl font-semibold leading-[1.18] text-foreground sm:text-4xl lg:text-5xl"
            >
              {content.heading}
            </h2>
          </div>

          <div className="luxury-reveal luxury-reveal-delay-1 space-y-8">
            {content.story.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-2xl text-base leading-[1.95] text-muted-foreground sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:mt-28 lg:grid-cols-5">
          {content.roles.map((role, index) => (
            <article
              key={role.title}
              className={cn(
                "luxury-reveal group relative min-h-52 overflow-hidden rounded-xl border border-border/70 bg-card p-6 transition-colors duration-300 hover:border-primary/30",
                index === 0 && "luxury-reveal-delay-1",
                index === 1 && "luxury-reveal-delay-2",
                index === 2 && "luxury-reveal-delay-3",
                index === 3 && "luxury-reveal-delay-4",
                index === 4 && "luxury-reveal-delay-5",
              )}
            >
              <div
                aria-hidden
                className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <p className="text-[0.6875rem] font-semibold tracking-[0.22em] text-primary/80 uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-10 text-lg font-semibold leading-tight text-foreground">
                {role.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                {role.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
