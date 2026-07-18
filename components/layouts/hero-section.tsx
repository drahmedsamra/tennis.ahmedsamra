import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  locale: Locale;
  content: Dictionary["hero"];
};

export function HeroSection({ locale, content }: HeroSectionProps) {
  const isRtl = locale === "ar";

  const features = [
    "📄 التقارير الفنية",
    "📊 تحليل الأداء",
    "🎯 خطة التطوير",
    "🎥 تحليل الفيديو",
    "💪 Fitness Report",
  ];

  const stats = [
    { icon: "👥", value: "100+", label: "لاعب" },
    { icon: "🏆", value: "20+", label: "بطولة" },
    { icon: "📄", value: "100+", label: "تقرير" },
  ];

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-primary/5 py-12 lg:py-16"
    >
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-primary/10 blur-[110px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2">

        {/* TEXT */}
        <div>

          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Ahmed Samra Tennis Platform
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight text-foreground lg:text-5xl">
            {content.heading}
          </h1>

          <p className="mt-3 text-xl font-bold text-primary">
            {content.subheading}
          </p>

          <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
            {content.description}
          </p>

          {/* Features */}

          <div className="mt-8 grid grid-cols-2 gap-3">

            {features.map((item) => (

              <div
                key={item}
                className="rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-center text-sm font-semibold shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                {item}
              </div>

            ))}

          </div>

          {/* Buttons */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <Link
              href="#player-portal"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {content.cta.book}

              <svg
                className={cn(
                  "ms-2 h-4 w-4 transition-transform",
                  isRtl && "rotate-180"
                )}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            </Link>

            <Link
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background/80 px-8 text-sm font-semibold backdrop-blur transition-all hover:border-primary hover:bg-primary/5"
            >
              {content.cta.portal}
            </Link>

          </div>

          {/* Stats */}

          <div className="mt-10 grid grid-cols-3 gap-3">

            {stats.map((item) => (

              <div
                key={item.label}
                className="rounded-2xl border border-border/60 bg-background/80 p-4 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >

                <div className="text-2xl">
                  {item.icon}
                </div>

                <div className="mt-1 text-2xl font-black text-primary">
                  {item.value}
                </div>

                <div className="mt-1 text-xs text-muted-foreground">
                  {item.label}
                </div>

              </div>

            ))}

          </div>

        </div>

        {/* IMAGE */}

        <div className="relative flex justify-center">

          <div className="absolute h-80 w-80 rounded-full bg-primary/15 blur-[90px]" />

          <Image
            src="/images/hero/ahmed-samra-hero2.webp"
            alt="Ahmed Samra"
            width={560}
            height={760}
            priority
            className="relative z-10 h-auto w-full max-w-[390px] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,.25)] transition-transform duration-500 hover:scale-[1.02] lg:max-w-[470px]"
          />

        </div>

      </div>
    </section>
  );
}