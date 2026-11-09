import { CheckCircle2, Quote, Sparkles, Star } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type TestimonialsSectionProps = {
  content: Dictionary["testimonials"];
  locale?: Locale;
};

export function TestimonialsSection({
  content,
  locale = "ar",
}: TestimonialsSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative isolate overflow-hidden border-b-4 border-background bg-gradient-to-b from-background via-[#f6faf6] to-background py-16 sm:py-24 lg:py-32"
    >
      <div className="marketing-shell relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
            <Sparkles className="size-3.5" aria-hidden />
            <span>{content.eyebrow}</span>
          </div>

          <h2
            id="testimonials-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {content.heading}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {content.introduction}
          </p>
        </div>

        {/* Testimonials 2x2 Balanced Grid */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
          {content.cards.map((testimonial, index) => (
            <article
              key={`${testimonial.author}-${testimonial.role}-${index}`}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-emerald-600/15 bg-card p-6 shadow-[0_12px_32px_-10px_rgba(16,185,129,0.20)] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/45 hover:shadow-[0_22px_45px_-12px_rgba(16,185,129,0.38)] sm:p-8"
              )}
            >
              {/* Decorative Emerald Top Strip */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500/30 via-emerald-400/60 to-emerald-500/30 transition-opacity group-hover:h-1.5 group-hover:from-emerald-400 group-hover:via-emerald-300 group-hover:to-emerald-500" />

              <div>
                {/* Header: Author + Role + Quote Icon */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      aria-hidden
                      className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-primary/10 text-base font-extrabold text-primary shadow-xs transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      <span>{testimonial.avatar}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-foreground sm:text-lg">
                        {testimonial.author}
                      </h3>
                      <p className="text-xs font-semibold text-primary">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/5 text-primary">
                    <Quote className="size-4" aria-hidden />
                  </div>
                </div>

                {/* 5 Gold Stars Rating */}
                <div className="mt-5 flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                      aria-hidden
                    />
                  ))}
                  <span className="ms-2 text-xs font-bold text-muted-foreground">
                    5.0
                  </span>
                </div>

                {/* Quote Text */}
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base sm:leading-loose">
                  <p>&ldquo;{testimonial.quote}&rdquo;</p>
                </blockquote>
              </div>

              {/* Verified Footer Badge */}
              <div className="mt-6 flex items-center gap-1.5 border-t border-border/60 pt-4 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="size-3.5" aria-hidden />
                <span>{isRtl ? "تقييم موثق من الملعب" : "Verified Court Review"}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
