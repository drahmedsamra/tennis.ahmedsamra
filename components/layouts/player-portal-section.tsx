import {
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardList,
  MessageSquareText,
  Upload,
  Video,
  type LucideIcon,
} from "lucide-react";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type PlayerPortalSectionProps = {
  content: Dictionary["playerPortal"];
};

const featureIcons: Record<string, LucideIcon> = {
  progress: ChartNoAxesCombined,
  schedule: CalendarDays,
  matches: ClipboardList,
  video: Upload,
  notes: MessageSquareText,
  plan: Video,
};

export function PlayerPortalSection({ content }: PlayerPortalSectionProps) {
  return (
    <section
      id="player-portal"
      aria-labelledby="player-portal-heading"
      className="scroll-mt-14 overflow-hidden bg-muted/50 lg:scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl px-6 py-32 lg:px-8 lg:py-44">
        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20 xl:gap-28">
          <div className="luxury-reveal">
            <p className="text-[0.6875rem] font-semibold tracking-[0.28em] text-primary uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="player-portal-heading"
              className="mt-6 max-w-3xl text-3xl font-semibold leading-[1.18] text-foreground sm:text-4xl lg:text-5xl"
            >
              {content.heading}
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-[1.95] text-muted-foreground sm:text-lg">
              {content.introduction}
            </p>
          </div>

          <PortalMockup content={content.mockup} />
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3">
          {content.features.map((feature, index) => {
            const Icon = featureIcons[feature.icon] ?? ChartNoAxesCombined;

            return (
              <article
                key={feature.title}
                className={cn(
                  "luxury-reveal group relative min-h-56 overflow-hidden rounded-xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30",
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
                <div className="flex size-10 items-center justify-center rounded-full border border-border/70 bg-background text-primary transition-colors duration-300 group-hover:border-primary/30">
                  <Icon className="size-4" aria-hidden />
                </div>
                <h3 className="mt-10 text-lg font-semibold leading-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="luxury-reveal luxury-reveal-delay-2 mt-16 rounded-xl border border-border/70 bg-card p-6 sm:p-8 lg:mt-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[0.6875rem] font-semibold tracking-[0.28em] text-primary uppercase">
                {content.cta.eyebrow}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                {content.cta.description}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity duration-200 hover:opacity-90"
            >
              {content.cta.button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

type PortalMockupProps = {
  content: Dictionary["playerPortal"]["mockup"];
};

function PortalMockup({ content }: PortalMockupProps) {
  return (
    <div className="luxury-reveal luxury-reveal-delay-1 relative">
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
        <div
          aria-hidden
          className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
        />
        <div className="rounded-xl border border-border/70 bg-background p-4">
          <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
                {content.label}
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {content.title}
              </p>
            </div>
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-2 rounded-full bg-primary/60" />
              <span className="size-2 rounded-full bg-border" />
              <span className="size-2 rounded-full bg-border" />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_0.75fr]">
            <div className="rounded-xl border border-border/70 bg-card p-4">
              <div className="flex items-end gap-2" aria-hidden>
                <span className="h-14 flex-1 rounded-t-sm bg-primary/20" />
                <span className="h-20 flex-1 rounded-t-sm bg-primary/35" />
                <span className="h-12 flex-1 rounded-t-sm bg-primary/20" />
                <span className="h-24 flex-1 rounded-t-sm bg-primary/50" />
                <span className="h-16 flex-1 rounded-t-sm bg-primary/25" />
              </div>
              <p className="mt-4 text-sm font-semibold text-foreground">
                {content.chartTitle}
              </p>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                {content.chartDescription}
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-xl border border-border/70 bg-card p-4">
                <p className="text-xs font-semibold tracking-wide text-primary">
                  {content.sessionLabel}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {content.sessionText}
                </p>
              </div>
              <div className="rounded-xl border border-border/70 bg-card p-4">
                <p className="text-xs font-semibold tracking-wide text-primary">
                  {content.reviewLabel}
                </p>
                <div className="mt-4 space-y-2" aria-hidden>
                  <span className="block h-2 rounded-full bg-muted" />
                  <span className="block h-2 w-4/5 rounded-full bg-muted" />
                  <span className="block h-2 w-2/3 rounded-full bg-muted" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {content.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/70 bg-card p-4"
              >
                <p className="text-lg font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
