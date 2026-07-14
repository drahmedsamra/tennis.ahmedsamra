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
      className="relative flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden lg:min-h-[calc(100svh-4rem)]"
    >
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,oklch(0.955_0.03_152),transparent_65%)]"
      />

      {/* Soft Glow */}
      <div
        aria-hidden
        className="absolute end-0 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-8 lg:px-8 lg:py-10 xl:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-8 xl:gap-12">
          {/* Text */}
          <div className={cn("lg:row-start-1", textColumnClass)}>
            <h1
              id="hero-heading"
              className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {content.heading}
            </h1>

            <p className="mt-3 text-xl font-medium text-primary sm:text-2xl">
              {content.subheading}
            </p>

            <p className="mt-6 max-w-lg text-base leading-[1.9] text-muted-foreground sm:text-lg">
              {content.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
              >
                {content.cta.book}
              </Link>

              <Link
                href="#player-portal"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-8 text-sm font-medium text-foreground transition-all duration-300 hover:bg-muted"
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
            <div className="absolute h-[480px] w-[480px] rounded-full bg-primary/10 blur-[100px]" />

            <Image
              src="/images/hero/ahmed-samra-hero.webp"
              alt="Ahmed Samra holding a trophy"
              width={700}
              height={1000}
              priority
              quality={85}
              sizes="(max-width:768px) 90vw, (max-width:1280px) 45vw, 700px"
              className="relative z-10 h-auto w-full max-w-[660px] object-contain select-none lg:max-w-[720px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}