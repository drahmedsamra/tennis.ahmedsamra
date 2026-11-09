import Link from "next/link";
import { ArrowLeft, ArrowRight, KeyRound, Lock } from "lucide-react";

import PlayerSearchForm from "@/components/player/PlayerSearchForm";
import type { SearchState } from "@/app/(player)/player/actions";
import type { Locale } from "@/lib/i18n/config";

type PlayerAccessSectionProps = {
  locale: Locale;
  redirectToHome?: boolean;
  searchAction?: (
    prevState: SearchState,
    formData: FormData
  ) => Promise<SearchState>;
};

const portalContent = {
  ar: {
    cardEyebrow: "بوابة اللاعب",
    cardTitle: "الدخول بكود اللاعب",
    cardSubtitle: "أدخل كودك الخاص للوصول المباشر إلى ملفك وتقاريرك الفنية.",
    noCodeText: "ليس لديك كود لاعب حتى الآن؟",
    registerAction: "سجّل طلبك هنا",
    ctaDirect: "الدخول إلى بوابة اللاعبين",
  },
  en: {
    cardEyebrow: "Player Portal",
    cardTitle: "Access with Player Code",
    cardSubtitle: "Enter your private code for instant access to your profile & reports.",
    noCodeText: "Don't have a player code yet?",
    registerAction: "Register here",
    ctaDirect: "Enter Player Portal",
  },
} as const;

export function PlayerAccessSection({
  locale,
  redirectToHome = false,
  searchAction,
}: PlayerAccessSectionProps) {
  const content = portalContent[locale];
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="player-portal"
      className="relative isolate overflow-hidden border-b-4 border-background bg-gradient-to-b from-[#f8faf7] via-[#eef6f0] to-[#f8faf7] py-10 sm:py-16"
    >
      {/* Subtle court grid background accent */}
      <div
        aria-hidden
        className="court-mark absolute -start-20 top-10 hidden size-96 opacity-40 lg:block"
      />

      <div className="marketing-shell relative z-10">
        <div className="mx-auto max-w-xl">
          {/* Luxury Player Access Card */}
          <div className="relative">
            {/* Card glow layer */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 via-emerald-400/20 to-primary/10 blur-xl" />

            <div className="relative overflow-hidden rounded-3xl border-2 border-primary/25 bg-card p-6 shadow-xl ring-1 ring-primary/10 sm:p-8">
              {/* Decorative top strip */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-emerald-400 to-primary" />

              {/* Card Header */}
              <div className="flex items-center gap-3.5 border-b border-border/70 pb-5">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-xs">
                  <KeyRound className="size-5" aria-hidden />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                    {content.cardEyebrow}
                  </p>
                  <h3 className="text-lg font-bold text-foreground sm:text-xl">
                    {content.cardTitle}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {content.cardSubtitle}
              </p>

              {/* Search Form or Direct CTA */}
              <div className="mt-5">
                {searchAction ? (
                  <PlayerSearchForm
                    action={searchAction}
                    locale={locale}
                    redirectToHome={redirectToHome}
                  />
                ) : (
                  <div className="space-y-4 pt-2">
                    <Link
                      href="/player"
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 hover:shadow-lg"
                    >
                      <span>{content.ctaDirect}</span>
                      <ArrowIcon className="size-4" aria-hidden />
                    </Link>
                  </div>
                )}
              </div>

              {/* Card Footer: Registration link if no code */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Lock className="size-3 text-primary" />
                  {content.noCodeText}
                </span>
                <Link
                  href="#register"
                  className="font-bold text-primary transition hover:underline"
                >
                  {content.registerAction} {isRtl ? "←" : "→"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
