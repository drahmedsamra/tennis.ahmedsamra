import { Quote } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type TestimonialsSectionProps = {
  content: Dictionary["testimonials"];
};

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-14 overflow-hidden bg-muted/50 lg:scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl px-6 py-32 lg:px-8 lg:py-44">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 xl:gap-28">
          <div className="luxury-reveal">
            <p className="text-[0.6875rem] font-semibold tracking-[0.28em] text-primary uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="testimonials-heading"
              className="mt-6 max-w-3xl text-3xl font-semibold leading-[1.18] text-foreground sm:text-4xl lg:text-5xl"
            >
              {content.heading}
            </h2>
          </div>

          <div className="luxury-reveal luxury-reveal-delay-1 flex items-end">
            <p className="max-w-2xl text-base leading-[1.95] text-muted-foreground sm:text-lg">
              {content.introduction}
            </p>
          </div>
        </div>

        <div className="-mx-6 mt-20 grid auto-cols-[minmax(17rem,85vw)] grid-flow-col gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory sm:auto-cols-[minmax(20rem,44vw)] lg:mx-0 lg:mt-28 lg:grid-flow-row lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
          {content.cards.map((testimonial, index) => (
            <article
              key={`${testimonial.author}-${testimonial.role}`}
              className={cn(
                "luxury-reveal group relative min-h-72 snap-start overflow-hidden rounded-xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30",
                index === 0 && "luxury-reveal-delay-1",
                index === 1 && "luxury-reveal-delay-2",
                index === 2 && "luxury-reveal-delay-3",
                index === 3 && "luxury-reveal-delay-4",
                index >= 4 && "luxury-reveal-delay-5",
              )}
            >
              <div
                aria-hidden
                className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div
                    aria-hidden
                    className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-background text-sm font-semibold text-primary"
                  >
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,oklch(0.97_0.02_152),transparent_55%)]" />
                    <span className="relative">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold leading-tight text-foreground">
                      {testimonial.author}
                    </h3>
                    <p className="mt-1 text-xs font-medium tracking-wide text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background text-primary transition-colors duration-300 group-hover:border-primary/30">
                  <Quote className="size-4" aria-hidden />
                </div>
              </div>

              <blockquote className="mt-10 text-sm leading-8 text-muted-foreground">
                <p>{testimonial.quote}</p>
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
