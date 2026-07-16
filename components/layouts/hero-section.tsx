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
  const photoColumnClass =
    locale === "ar" ? "lg:col-start-1" : "lg:col-start-2";

  const textColumnClass =
    locale === "ar" ? "lg:col-start-2" : "lg:col-start-1";

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[78svh] items-center overflow-hidden"
    >
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.97_0.03_150),transparent_65%)]"
      />

      {/* Glow */}
      <div
        aria-hidden
        className="absolute end-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-primary/10 blur-[110px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Text */}
          <div className={cn("lg:row-start-1", textColumnClass)}>

            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
              🎾 Ahmed Samra Tennis
            </span>

            <h1
              id="hero-heading"
              className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {content.heading}
            </h1>

            <p className="mt-4 text-xl font-semibold text-primary">
              {content.subheading}
            </p>

            <p className="mt-6 max-w-xl text-lg leading-9 text-muted-foreground">
              {content.description}
            </p>

            {/* Features */}

            <div className="mt-8 flex flex-wrap gap-3">

              <span className="rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                📄 التقارير الفنية
              </span>

              <span className="rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                📈 تحليل الأداء
              </span>

              <span className="rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                🎯 خطة التطوير
              </span>

              <span className="rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                🎥 الفيديوهات
              </span>

            </div>

            {/* Buttons */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                href="#player-portal"
                className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/25"
              >
                {content.cta.book}
              </Link>

              <Link
                href="#contact"
                className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-background px-8 text-base font-semibold text-foreground transition-all duration-300 hover:border-primary/20 hover:bg-primary/5"
              >
                {content.cta.portal}
              </Link>

            </div>

          </div>

          {/* Hero Image */}

          <div
            className={cn(
              "relative flex items-end justify-center lg:row-start-1",
              photoColumnClass,
            )}
          >
            <div className="absolute h-[340px] w-[340px] rounded-full bg-primary/10 blur-[90px]" />

            <Image
              src="/images/hero/ahmed-samra-hero.webp"
              alt="Ahmed Samra"
              width={700}
              height={1000}
              priority
              quality={90}
              sizes="(max-width:768px) 90vw, (max-width:1280px) 45vw, 700px"
              className="relative z-10 h-auto w-full max-w-[400px] object-contain select-none lg:max-w-[470px]"
            />

          </div>

        </div>
      </div>
    </section>
  );
}