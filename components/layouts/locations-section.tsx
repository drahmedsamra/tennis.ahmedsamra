import Link from "next/link";
import { Check, Compass, MapPin, MessageCircle, Navigation } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { contactInfo } from "@/config/contact";

type LocationsSectionProps = {
  content: Dictionary["locations"];
  locale: Locale;
};

export function LocationsSection({ content, locale }: LocationsSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      className="scroll-mt-14 overflow-hidden py-12 sm:py-16 lg:scroll-mt-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold tracking-wider text-emerald-600 uppercase">
            <MapPin className="size-3" />
            {content.eyebrow}
          </div>
          <h2
            id="locations-heading"
            className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {content.heading}
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {content.subtitle}
          </p>
        </div>

        {/* Venues Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.venues.map((venue, idx) => {
            const isFeatured = idx === 0; // Fifth Settlement (Sky Courts) featured
            const waMessage = isRtl
              ? `أهلاً كابتن أحمد سمرة، أود الاستفسار عن مواعيد وتفاصيل التدريب في فرع ${venue.area} - ${venue.venue}.`
              : `Hello Coach Ahmed Samra, I would like to inquire about training schedule and details at ${venue.venue} (${venue.area}).`;
            const waUrl = `${contactInfo.whatsappHref}?text=${encodeURIComponent(waMessage)}`;

            return (
              <div
                key={venue.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4 transition-all duration-300 sm:p-5 hover:-translate-y-0.5 hover:shadow-lg ${
                  isFeatured
                    ? "border-emerald-500/40 bg-gradient-to-b from-emerald-500/[0.04] via-card to-card shadow-md shadow-emerald-500/5 ring-1 ring-emerald-500/20"
                    : "border-border/80 bg-card/60 backdrop-blur-xs hover:border-emerald-500/30"
                }`}
              >
                <div>
                  {/* Top Bar: Area & City */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                        {venue.city}
                      </span>
                      <h3 className="text-lg font-bold text-foreground sm:text-xl">
                        {venue.area}
                      </h3>
                    </div>

                    <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-transform group-hover:scale-105">
                      <Navigation className="size-4" />
                    </div>
                  </div>

                  {/* Specific Venue Name */}
                  <div className="mt-2.5 flex items-center gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-start text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    <MapPin className="size-3.5 shrink-0 text-emerald-600" />
                    <span className="truncate">{venue.venue}</span>
                  </div>

                  {/* Badge */}
                  {venue.badge && (
                    <div className="mt-2">
                      <span className="inline-block rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {venue.badge}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {venue.description}
                  </p>

                  {/* Features Chips */}
                  <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/50 pt-2.5">
                    {venue.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-foreground/80"
                      >
                        <Check className="size-3 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                <div className="mt-4 pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition shadow-xs ${
                      isFeatured
                        ? "bg-emerald-600 text-white shadow-emerald-600/20 hover:bg-emerald-700"
                        : "bg-muted text-foreground hover:bg-emerald-600 hover:text-white"
                    }`}
                  >
                    <MessageCircle className="size-3.5 fill-current/10" />
                    <span>{content.bookVenue}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Consultation Banner */}
        <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 p-4 text-white shadow-lg sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <Compass className="size-3.5" />
                <span>{content.question}</span>
              </div>
              <p className="mt-1 text-xs text-slate-300">
                {content.questionCta}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20 transition hover:bg-emerald-400"
              >
                <MessageCircle className="size-3.5" />
                <span>واتساب</span>
              </a>

              <Link
                href="#registration"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                <span>طلب تسجيل لاعب</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
