import { MessageCircle, Phone } from "lucide-react";

import { contactInfo } from "@/config/contact";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type CtaSectionProps = {
  content: Dictionary["cta"];
};

export function CtaSection({ content }: CtaSectionProps) {
  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="scroll-mt-14 overflow-hidden bg-muted/50 lg:scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="luxury-reveal relative overflow-hidden rounded-xl border border-border/70 bg-card p-8 sm:p-10 lg:p-12">
          <div
            aria-hidden
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
          />

          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[0.6875rem] font-semibold tracking-[0.28em] text-primary uppercase">
                {content.eyebrow}
              </p>
              <h2
                id="booking-heading"
                className="mt-6 max-w-3xl text-3xl font-semibold leading-[1.18] text-foreground sm:text-4xl lg:text-5xl"
              >
                {content.heading}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-[1.95] text-muted-foreground sm:text-lg">
                {content.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity duration-200 hover:opacity-90"
              >
                <MessageCircle className="size-4" aria-hidden />
                {content.whatsappButton}
              </a>
              <a
                href={contactInfo.phoneHref}
                className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-border bg-background px-8 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted"
              >
                <Phone className="size-4" aria-hidden />
                {content.phoneButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
