import {
  ChartNoAxesCombined,
  CircleDot,
  Repeat,
  Video,
  type LucideIcon,
} from "lucide-react";

import type { Dictionary } from "@/lib/i18n/get-dictionary";

type ServicesSectionProps = {
  content: Dictionary["services"];
};

const serviceIcons: Record<string, LucideIcon> = {
  individual: CircleDot,
  juniors: CircleDot,
  tournaments: ChartNoAxesCombined,
  video: Video,
  followup: Repeat,
};

export function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <section id="services" aria-labelledby="services-heading" className="border-b border-border/70 bg-muted/45">
      <div className="marketing-shell py-16 sm:py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <p className="marketing-kicker">{content.eyebrow}</p>
          <div>
            <h2 id="services-heading" className="marketing-heading max-w-3xl">
              {content.heading}
            </h2>
            <p className="marketing-copy mt-5 max-w-3xl">{content.introduction}</p>
          </div>
        </div>

        <div className="mt-12 border-y border-border/80">
          {content.cards.map((service, index) => {
            const Icon = serviceIcons[service.icon] ?? CircleDot;

            return (
              <article
                key={service.title}
                className="grid gap-4 border-b border-border/80 py-6 last:border-b-0 sm:grid-cols-[4rem_minmax(0,0.8fr)_1.2fr_auto] sm:items-center sm:gap-6"
              >
                <span className="text-xs font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{service.description}</p>
                <Icon className="hidden size-5 text-primary sm:block" aria-hidden />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
