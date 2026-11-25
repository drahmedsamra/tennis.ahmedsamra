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
      className="scroll-mt-14 overflow-hidden py-24 sm:py-32 lg:scroll-mt-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold tracking-widest text-emerald-600 uppercase">
            <MapPin className="size-3.5" />
            {content.eyebrow}
          </div>
          <h2
            id="locations-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {content.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {content.subtitle}
          </p>
        </div>

        {/* Venues Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.venues.map((venue, idx) => {
            const isFeatured = idx === 0; // Fifth Settlement (Sky Courts) featured
            const waMessage = isRtl
              ? `أهلاً كابتن أحمد سمرة، أود الاستفسار عن مواعيد وتفاصيل التدريب في فرع ${venue.area} - ${venue.venue}.`
              : `Hello Coach Ahmed Samra, I would like to inquire about training schedule and details at ${venue.venue} (${venue.area}).`;
            const waUrl = `${contactInfo.whatsappHref}?text=${encodeURIComponent(waMessage)}`;

            return (
              <div
                key={venue.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-6 transition-all duration-300 sm:p-8 hover:-translate-y-1 hover:shadow-xl ${
                  isFeatured
                    ? "border-emerald-500/40 bg-gradient-to-b from-emerald-500/[0.04] via-card to-card shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/20"
                    : "border-border/80 bg-card/60 backdrop-blur-xs hover:border-emerald-500/30"
                }`}
              >
                {/* Glow for featured */}
                {isFeatured && (
                  <div className="absolute -top-12 -end-12 size-36 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
                )}

                <div>
                  {/* Top Bar: Area & City */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                        {venue.city}
                      </span>
                      <h3 className="mt-1 text-xl font-black text-foreground sm:text-2xl">
                        {venue.area}
                      </h3>
                    </div>

                    <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 transition-transform group-hover:scale-110">
                      <Navigation className="size-5" />
                    </div>
                  </div>

                  {/* Specific Venue Name */}
                  <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 text-start">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      <MapPin className="size-4 shrink-0 text-emerald-600" />
                      <span>{venue.venue}</span>
                    </div>
                  </div>

                  {/* Badge */}
                  {venue.badge && (
                    <div className="mt-3">
                      <span className="inline-block rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        {venue.badge}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {venue.description}
                  </p>

                  {/* Features List */}
                  <ul className="mt-5 space-y-2.5 border-t border-border/60 pt-5">
                    {venue.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-center gap-2.5 text-xs text-foreground/80 sm:text-sm"
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                          <Check className="size-3 stroke-[3]" />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking Button */}
                <div className="mt-8 pt-4">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition shadow-sm ${
                      isFeatured
                        ? "bg-emerald-600 text-white shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-md"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-emerald-600 hover:text-white"
                    }`}
                  >
                    <MessageCircle className="size-4 fill-current/10" />
                    <span>{content.bookVenue}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="mt-14 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 p-6 text-white shadow-xl sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                <Compass className="size-3.5" />
                <span>استشارة واختيار الفرع الأقرب</span>
              </div>
              <h3 className="mt-3 text-xl font-black sm:text-2xl">
                {content.question}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                {content.questionCta}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
              >
                <MessageCircle className="size-4" />
                <span>تواصل عبر واتساب الآن</span>
              </a>

              <Link
                href="#registration"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
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
