import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type PricingSectionProps = {
  content: Dictionary["pricing"];
  locale?: Locale;
};

const planIcons: LucideIcon[] = [
  Target,   // 0: Assessment
  Zap,      // 1: Private Session (Hero)
  Users,    // 2: Academy
  Trophy,   // 3: Rally / Match
  FileText, // 4: Technical Reports
];

export function PricingSection({ content, locale = "ar" }: PricingSectionProps) {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const topPlans = content.items.slice(0, 3);
  const bottomPlans = content.items.slice(3, 5);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative isolate overflow-hidden border-b-4 border-background bg-gradient-to-b from-background via-[#f6faf6] to-background py-16 sm:py-24 lg:py-32"
    >
      <div className="marketing-shell relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
            <Sparkles className="size-3.5" aria-hidden />
            <span>{content.eyebrow}</span>
          </div>

          <h2
            id="pricing-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {content.heading}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {content.introduction}
          </p>
        </div>

        {/* Top Row: 3 Core Plans */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-3 lg:items-stretch lg:gap-8">
          {topPlans.map((plan, idx) => {
            const Icon = planIcons[idx] ?? Target;
            const isPopular = plan.popular;

            return (
              <PricingCard
                key={plan.name}
                plan={plan}
                icon={Icon}
                isPopular={isPopular}
                ArrowIcon={ArrowIcon}
                ctaText={isPopular ? content.ctaPopular : content.ctaText}
              />
            );
          })}
        </div>

        {/* Bottom Row: 2 Specialized Plans */}
        {bottomPlans.length > 0 ? (
          <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-8 lg:gap-8">
            {bottomPlans.map((plan, idx) => {
              const actualIndex = idx + 3;
              const Icon = planIcons[actualIndex] ?? Trophy;

              return (
                <PricingCard
                  key={plan.name}
                  plan={plan}
                  icon={Icon}
                  isPopular={false}
                  ArrowIcon={ArrowIcon}
                  ctaText={content.ctaText}
                />
              );
            })}
          </div>
        ) : null}

        {/* Bottom Trust Assurance Note */}
        <div className="mt-12 text-center text-xs font-medium text-muted-foreground">
          <p>
            {isRtl
              ? "جميع الحصص والبرامج التدريبية تُدار بإشراف ومتابعة الكابتن أحمد سمرة مباشرة."
              : "All coaching sessions & plans are managed under direct supervision of Coach Ahmed Samra."}
          </p>
        </div>
      </div>
    </section>
  );
}

type PricingCardProps = {
  plan: Dictionary["pricing"]["items"][number];
  icon: LucideIcon;
  isPopular?: boolean;
  ArrowIcon: LucideIcon;
  ctaText: string;
};

function PricingCard({
  plan,
  icon: Icon,
  isPopular = false,
  ArrowIcon,
  ctaText,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl transition-all duration-300",
        isPopular
          ? "border-2 border-emerald-500 bg-gradient-to-b from-slate-950 via-[#071d12] to-slate-950 text-white shadow-2xl ring-4 ring-emerald-500/20 lg:-translate-y-2 lg:hover:-translate-y-3"
          : "border-2 border-border/80 bg-card p-6 shadow-sm hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl sm:p-8"
      )}
    >
      {/* Popular Header Strip & Badge */}
      {isPopular ? (
        <>
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500" />
          <div className="flex justify-end p-6 pb-0 sm:p-8 sm:pb-0">
            {plan.badge ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-extrabold tracking-wide text-slate-950 shadow-sm backdrop-blur">
                <Sparkles className="size-3" aria-hidden />
                {plan.badge}
              </span>
            ) : null}
          </div>
        </>
      ) : null}

      <div className={cn(isPopular ? "p-6 pt-3 sm:p-8 sm:pt-4" : "")}>
        {/* Card Header (Icon + Name + Non-popular Badge) */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-2xl transition-colors",
                isPopular
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "border border-primary/20 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
              )}
            >
              <Icon className="size-5" aria-hidden />
            </span>
            <div>
              <h3
                className={cn(
                  "text-lg font-bold sm:text-xl",
                  isPopular ? "text-white" : "text-foreground"
                )}
              >
                {plan.name}
              </h3>
              {plan.period ? (
                <p
                  className={cn(
                    "text-xs font-medium",
                    isPopular ? "text-slate-400" : "text-muted-foreground"
                  )}
                >
                  {plan.period}
                </p>
              ) : null}
            </div>
          </div>

          {!isPopular && plan.badge ? (
            <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              {plan.badge}
            </span>
          ) : null}
        </div>

        {/* Description */}
        <p
          className={cn(
            "mt-4 text-xs leading-relaxed sm:text-sm",
            isPopular ? "text-slate-300" : "text-muted-foreground"
          )}
        >
          {plan.description}
        </p>

        {/* Price Block */}
        <div className="mt-6 border-y py-4 border-border/60">
          <div className="flex items-baseline gap-1.5">
            <span
              className={cn(
                "text-3xl font-extrabold tracking-tight sm:text-4xl",
                isPopular ? "text-emerald-400" : "text-primary"
              )}
            >
              {plan.price}
            </span>
            {plan.currency ? (
              <span
                className={cn(
                  "text-sm font-semibold",
                  isPopular ? "text-slate-300" : "text-foreground"
                )}
              >
                {plan.currency}
              </span>
            ) : null}
          </div>
        </div>

        {/* Included Features List */}
        {plan.features && plan.features.length > 0 ? (
          <ul className="mt-6 space-y-3">
            {plan.features.map((feature, fIdx) => (
              <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                <span
                  className={cn(
                    "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                    isPopular
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                <span
                  className={cn(
                    "leading-relaxed",
                    isPopular ? "text-slate-200" : "text-foreground"
                  )}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* CTA Button */}
      <div className={cn("mt-8", isPopular ? "p-6 pt-0 sm:p-8 sm:pt-0" : "")}>
        <Link
          href="#register"
          className={cn(
            "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all duration-200",
            isPopular
              ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 hover:scale-[1.01]"
              : "border border-primary/25 bg-primary/5 text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md"
          )}
        >
          <span>{ctaText}</span>
          <ArrowIcon className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
