import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type HeroContentProps = {
  content: Dictionary["hero"];
  locale: Locale;
};

export function HeroContent({ content, locale }: HeroContentProps) {
  return (
    <>
      <p className="marketing-kicker flex items-center gap-3">
        <span className="h-px w-8 bg-primary" aria-hidden />
        {locale === "ar" ? "Ahmed Samra Tennis" : "Ahmed Samra Tennis"}
      </p>

      <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
        {content.heading}
      </h1>

      <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-primary sm:text-xl sm:leading-9">
        {content.subheading}
      </p>

      <p className="marketing-copy mt-5 max-w-2xl">
        {content.description}
      </p>
    </>
  );
}
