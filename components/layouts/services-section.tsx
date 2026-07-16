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
  tournaments: ChartNoAxesCombined,
  video: Video,
  followup: Repeat,
};

export function ServicesSection({ content }: ServicesSectionProps) {
  const services = content.cards.slice(0, 4);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-16 bg-muted/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-primary">
            {content.eyebrow}
          </p>

          <h2
            id="services-heading"
            className="mt-5 text-4xl font-bold leading-[1.3] text-foreground sm:text-5xl"
          >
            {content.heading}
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-10 text-muted-foreground">
            {content.introduction}
          </p>

        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2">

          {services.map((service) => {

            const Icon = serviceIcons[service.icon] ?? CircleDot;

            return (

              <article
                key={service.title}
                className="group rounded-3xl border border-border bg-card p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">

                  <Icon className="h-7 w-7" />

                </div>

                <h3 className="mt-8 text-3xl font-bold text-foreground">

                  {service.title}

                </h3>

                <p className="mt-5 text-lg leading-9 text-muted-foreground">

                  {service.description}

                </p>

              </article>

            );

          })}

        </div>

      </div>
    </section>
  );
}