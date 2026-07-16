import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  locale: Locale;
  content: Dictionary["hero"];
};

const stats = [
  {
    value: "100+",
    label: "لاعب",
  },
  {
    value: "20+",
    label: "بطولة",
  },
  {
    value: "100+",
    label: "تقرير فني",
  },
];

export function HeroSection({ locale, content }: HeroSectionProps) {
  const photoColumnClass =
    locale === "ar" ? "lg:col-start-1" : "lg:col-start-2";

  const textColumnClass =
    locale === "ar" ? "lg:col-start-2" : "lg:col-start-1";

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden"
    >
      {/* Background */}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.97_0.05_150),transparent_60%)]"
      />

      {/* Decorative Blobs */}

      <div
        aria-hidden
        className="absolute -top-32 start-0 h-[380px] w-[380px] rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden
        className="absolute bottom-0 end-0 h-[420px] w-[420px] rounded-full bg-primary/15 blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* ===========================
              TEXT
          ============================ */}

          <div className={cn("lg:row-start-1", textColumnClass)}>

            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-semibold text-primary backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Ahmed Samra Tennis Platform
            </span>

            <h1
              id="hero-heading"
              className="mt-8 text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-7xl"
            >
              {content.heading}
            </h1>

            <p className="mt-5 text-xl font-bold text-primary sm:text-2xl">
              {content.subheading}
            </p>

            <p className="mt-7 max-w-2xl text-lg leading-9 text-muted-foreground">
              {content.description}
            </p>

            {/* Features */}

            <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full border border-primary/10 bg-background/80 px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                📄 التقارير الفنية
              </span>

              <span className="rounded-full border border-primary/10 bg-background/80 px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                📊 تحليل الأداء
              </span>

              <span className="rounded-full border border-primary/10 bg-background/80 px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                🎯 خطة التطوير
              </span>

              <span className="rounded-full border border-primary/10 bg-background/80 px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                🎥 تحليل الفيديو
              </span>

              <span className="rounded-full border border-primary/10 bg-background/80 px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                💪 Fitness Report
              </span>

            </div>

            {/* Buttons */}

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">

              <Link
                href="#player-portal"
                className="group inline-flex h-14 items-center justify-center rounded-full bg-primary px-9 text-base font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/30"
              >
                {content.cta.book}

                <svg
                  className="ms-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
                className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-background/70 px-9 text-base font-semibold backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/5"
              >
                {content.cta.portal}
              </Link>

            </div>

            {/* Stats */}

            <div className="mt-14 grid grid-cols-3 gap-5">

              {stats.map((item) => (

                <div
                  key={item.label}
                  className="rounded-3xl border border-border/70 bg-background/70 p-5 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-lg"
                >

                  <div className="text-3xl font-black text-primary lg:text-4xl">
                    {item.value}
                  </div>

                  <div className="mt-2 text-sm text-muted-foreground">
                    {item.label}
                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* ===========================
              IMAGE
          ============================ */}

          <div
            className={cn(
              "relative flex items-end justify-center lg:row-start-1",
              photoColumnClass,
            )}
          >            {/* Main Glow */}

          <div className="absolute h-[420px] w-[420px] rounded-full bg-primary/15 blur-[120px]" />

          {/* Ring */}

          <div className="absolute h-[470px] w-[470px] rounded-full border border-primary/10" />

          {/* Floating Card 1 */}

          <div className="absolute start-0 top-10 hidden rounded-3xl border border-border bg-background/90 p-5 shadow-xl backdrop-blur lg:block">

            <div className="text-sm font-semibold text-muted-foreground">
              Player Progress
            </div>

            <div className="mt-2 text-3xl font-black text-primary">
              +28%
            </div>

            <div className="mt-1 text-xs text-muted-foreground">
              خلال آخر 3 أشهر
            </div>

          </div>

          {/* Floating Card 2 */}

          <div className="absolute bottom-10 end-0 hidden rounded-3xl border border-border bg-background/90 p-5 shadow-xl backdrop-blur lg:block">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl">
                🎾
              </div>

              <div>

                <div className="font-bold">
                  AI Match Analysis
                </div>

                <div className="text-sm text-muted-foreground">
                  Tactical Report
                </div>

              </div>

            </div>

          </div>

          {/* Player Image */}

          <Image
            src="/images/hero/ahmed-samra-hero2.webp"
            alt="Ahmed Samra"
            width={760}
            height={1100}
            priority
            quality={95}
            sizes="(max-width:768px) 90vw, (max-width:1280px) 45vw, 760px"
            className="relative z-10 h-auto w-full max-w-[430px] object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.25)] transition-all duration-700 hover:scale-[1.02] lg:max-w-[560px]"
          />

          {/* Bottom Shadow */}

          <div
            aria-hidden
            className="absolute bottom-3 h-10 w-64 rounded-full bg-black/15 blur-2xl"
          />

        </div>

      </div>
    </div>
    </section>
  );
}