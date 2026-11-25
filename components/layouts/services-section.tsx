import {
  Activity,
  Flag,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type ServicesSectionProps = {
  content: Dictionary["services"];
};

const serviceIcons: Record<string, LucideIcon> = {
  technique: Activity,
  tactics: Target,
  ranking: TrendingUp,
  pathway: Flag,
};

export function ServicesSection({ content }: ServicesSectionProps) {
  const isOddCount = content.cards.length % 2 !== 0;

  return (
    <section id="services" aria-labelledby="services-heading" className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="marketing-shell py-10 sm:py-20 lg:py-28">
        <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <p className="marketing-kicker">{content.eyebrow}</p>
          <div>
            <h2 id="services-heading" className="marketing-heading max-w-3xl">
              {content.heading}
            </h2>
            <p className="marketing-copy mt-3 max-w-3xl sm:mt-5">{content.introduction}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {content.cards.map((service, index) => {
            const Icon = serviceIcons[service.icon] ?? Target;
            const isLast = index === content.cards.length - 1;

            return (
              <article
                key={service.title}
                className={cn(
                  "relative min-h-44 bg-white dark:bg-slate-900 p-5 sm:min-h-56 sm:p-7 transition-colors hover:bg-emerald-50/50 dark:hover:bg-slate-800/80",
                  isOddCount && isLast && "col-span-2 sm:col-span-1"
                )}
              >
                <span className="text-xs font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon className="absolute end-5 top-5 size-5 text-primary/45 sm:end-7 sm:top-7 sm:size-6" aria-hidden />
                <h3 className="mt-7 text-base font-semibold leading-6 text-foreground sm:mt-12 sm:text-xl sm:leading-7">{service.title}</h3>
                <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-7">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
