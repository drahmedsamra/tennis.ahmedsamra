import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  FileText,
  KeyRound,
  Lock,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

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
    badge: "بوابة المتابعة الفنية",
    eyebrow: "بوابة اللاعبين",
    heading: "متابعة التطور والتقارير الفنية",
    description:
      "تقاريرك الدورية وخطة تطورك في الملعب في مكان واحد، خطوة بخطوة.",
    features: [
      {
        icon: FileText,
        title: "تقارير فنية دورية",
        description: "تقييم مستمر للأداء الفني والتكتيكي.",
      },
      {
        icon: Target,
        title: "نقاط التركيز",
        description: "تحديد دقيق لنقاط القوة وفرص التطوير.",
      },
      {
        icon: BarChart3,
        title: "خطة التطور",
        description: "أهداف واضحة وخطوات للمرحلة القادمة.",
      },
    ],
    cardEyebrow: "بطاقة وصول المتدرب",
    cardTitle: "الدخول بكود اللاعب",
    cardSubtitle: "أدخل كودك الخاص للوصول المباشر إلى ملفك وتقاريرك.",
    noCodeText: "ليس لديك كود لاعب حتى الآن؟",
    registerAction: "سجّل طلبك هنا",
    ctaDirect: "الدخول إلى بوابة اللاعبين",
    caption: "متابعة هادئة · تركيز أوضح",
  },
  en: {
    badge: "Performance Portal",
    eyebrow: "Player Portal",
    heading: "Track Technical Progress & Reports",
    description:
      "Your periodic reports and tailored development plan in one place, step by step.",
    features: [
      {
        icon: FileText,
        title: "Periodic Reports",
        description: "Continuous technical & tactical reviews.",
      },
      {
        icon: Target,
        title: "Key Focus",
        description: "Clear strengths & improvement areas.",
      },
      {
        icon: BarChart3,
        title: "Progress Plan",
        description: "Clear goals for the upcoming stage.",
      },
    ],
    cardEyebrow: "Player Access Pass",
    cardTitle: "Access with Player Code",
    cardSubtitle: "Enter your private code for instant access to your profile & reports.",
    noCodeText: "Don't have a player code yet?",
    registerAction: "Register here",
    ctaDirect: "Enter Player Portal",
    caption: "Structured follow-up · Clearer focus",
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
      className="relative isolate overflow-hidden border-b-4 border-background bg-gradient-to-b from-[#f8faf7] via-[#eef6f0] to-[#f8faf7] py-12 sm:py-16 lg:py-24"
    >
      {/* Subtle court grid background accent */}
      <div
        aria-hidden
        className="court-mark absolute -start-20 top-10 hidden size-96 opacity-40 lg:block"
      />

      <div className="marketing-shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 xl:gap-20">
          {/* Left Column: Context, Story & Value */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" aria-hidden />
              <span>{content.badge}</span>
            </div>

            <h2 className="marketing-heading mt-4 max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {content.heading}
            </h2>

            <p className="marketing-copy mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
              {content.description}
            </p>

            {/* Feature Highlights Grid */}
            <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3.5">
              {content.features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="group flex items-center gap-3 rounded-xl border border-primary/15 bg-white/90 p-3 shadow-2xs backdrop-blur-xs transition-all hover:border-primary/40 hover:bg-white hover:shadow-xs sm:flex-col sm:items-start sm:rounded-2xl sm:p-4"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:size-9 sm:rounded-xl">
                      <Icon className="size-4" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-foreground sm:mt-3 sm:text-sm">
                        {feat.title}
                      </h3>
                      <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground sm:mt-1 sm:text-xs sm:leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust badge */}
            <div className="mt-8 flex items-center gap-2 text-xs font-medium text-emerald-800 dark:text-emerald-400">
              <ShieldCheck className="size-4 shrink-0 text-primary" />
              <span>
                {isRtl
                  ? "جميع التقارير الفنية تصدر بإشراف ومتابعة الكابتن أحمد سمرة مباشرة."
                  : "All technical reports are supervised directly by Coach Ahmed Samra."}
              </span>
            </div>
          </div>

          {/* Right Column: Luxury Player Access Card */}
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
                  {content.registerAction} &larr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
