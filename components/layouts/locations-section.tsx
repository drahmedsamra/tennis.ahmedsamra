import Link from "next/link";
import { Check, Compass, MapPin, MessageCircle, Navigation, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { contactInfo } from "@/config/contact";
import { cn } from "@/lib/utils";

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
      className="relative isolate scroll-mt-14 overflow-hidden border-b-4 border-background bg-gradient-to-b from-[#f8faf7] via-background to-[#f8faf7] py-14 sm:py-20 lg:scroll-mt-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-bold tracking-wider text-emerald-700 dark:text-emerald-300 uppercase shadow-xs">
            <MapPin className="size-3.5 text-emerald-600" />
            <span>{content.eyebrow}</span>
          </div>
          <h2
            id="locations-heading"
            className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl"
          >
            {content.heading}
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
            {content.subtitle}
          </p>
        </div>

        {/* Venues Grid with Balanced 6-col Desktop Alignment */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {content.venues.map((venue, idx) => {
            const isFeatured = idx === 0; // Fifth Settlement (Sky Courts) featured
            const isLast = idx === content.venues.length - 1;
            const waMessage = isRtl
              ? `أهلاً كابتن أحمد سمرة، أود الاستفسار عن مواعيد وتفاصيل التدريب في فرع ${venue.area} - ${venue.venue}.`
              : `Hello Coach Ahmed Samra, I would like to inquire about training schedule and details at ${venue.venue} (${venue.area}).`;
            const waUrl = `${contactInfo.whatsappHref}?text=${encodeURIComponent(waMessage)}`;

            return (
              <div
                key={venue.id}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 transition-all duration-300",
                  "bg-white dark:bg-slate-900 p-5 sm:p-6",
                  isFeatured
                    ? "border-emerald-500 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/20 hover:border-emerald-600 hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1"
                    : "border-slate-200/90 dark:border-slate-700/80 shadow-md shadow-slate-200/50 dark:shadow-none hover:border-emerald-500/70 hover:shadow-xl hover:shadow-emerald-500/15 hover:-translate-y-1",
                  // 5 items grid layout: 3 on top row, 2 on bottom row (full balanced width)
                  idx < 3 ? "lg:col-span-2" : "lg:col-span-3",
                  isLast ? "sm:col-span-2 lg:col-span-3" : "sm:col-span-1"
                )}
              >
                {/* Decorative Top Accent Stripe */}
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-1.5 transition-colors",
                    isFeatured
                      ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600"
                      : "bg-gradient-to-r from-emerald-500/30 via-emerald-400/60 to-emerald-500/30 group-hover:from-emerald-500 group-hover:to-teal-500"
                  )}
                />

                <div>
                  {/* Top Bar: Area & City & Icon */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-block rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-800 dark:text-emerald-300 uppercase">
                          {venue.city}
                        </span>
                        {venue.badge && (
                          <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                            {isFeatured && <Sparkles className="size-2.5 text-emerald-500" />}
                            {venue.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                        {venue.area}
                      </h3>
                    </div>

                    <div
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110",
                        isFeatured
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                          : "border border-emerald-500/20 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white"
                      )}
                    >
                      <Navigation className="size-4" />
                    </div>
                  </div>

                  {/* Specific Venue Name with Crisp Border Box */}
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.08] px-3.5 py-2 text-start">
                    <MapPin className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                      {venue.venue}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm line-clamp-2">
                    {venue.description}
                  </p>

                  {/* Features Chips with Clear Visible Borders */}
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800 pt-3.5">
                    {venue.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs"
                      >
                        <Check className="size-3 text-emerald-600 shrink-0 stroke-[2.5]" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                <div className="mt-5 pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-xs",
                      isFeatured
                        ? "bg-emerald-600 text-white shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-md"
                        : "border-2 border-emerald-600/20 bg-emerald-50/50 dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                    )}
                  >
                    <MessageCircle className="size-3.5 fill-current/15" />
                    <span>{content.bookVenue}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact & High-Contrast Consultation Banner */}
        <div className="mt-10 rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 p-5 text-white shadow-xl sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold text-emerald-400">
                <Compass className="size-3.5" />
                <span>{content.question}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                {content.questionCta}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2.5">
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/30 transition hover:bg-emerald-400 hover:shadow-lg"
              >
                <MessageCircle className="size-4" />
                <span>واتساب مباشر</span>
              </a>

              <Link
                href="#registration"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-bold text-white backdrop-blur transition hover:bg-white/20"
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
