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
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-16 bg-muted/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            {content.eyebrow}
          </p>

          <h2
            id="services-heading"
            className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl"
          >
            {content.heading}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            {content.introduction}
          </p>

        </div>

        {/* Cards */}

        <div className="mt-12 grid gap-4 md:grid-cols-2">

          {content.cards.slice(0, 4).map((service) => {

            const Icon = serviceIcons[service.icon] ?? CircleDot;

            return (

              <article
                key={service.title}
                className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">

                    <Icon className="h-6 w-6" />

                  </div>

                  <div className="flex-1">

                    <h3 className="text-xl font-bold text-foreground">

                      {service.title}

                    </h3>

                    <p className="mt-2 text-sm leading-7 text-muted-foreground">

                      {service.description}

                    </p>

                  </div>

                </div>

              </article>

            );

          })}

        </div>

      </div>
    </section>
  );
}