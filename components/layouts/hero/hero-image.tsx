import Image from "next/image";

import type { Locale } from "@/lib/i18n/config";

type HeroImageProps = {
  locale: Locale;
};

export function HeroImage({ locale }: HeroImageProps) {
  return (
    <figure className="relative mx-auto flex min-h-[27rem] max-w-[38rem] items-end justify-center px-4 pt-8 sm:min-h-[34rem] sm:px-8 sm:pt-10 lg:min-h-[39rem]">

      <Image
        src="/images/hero/ahmed-samra-hero2.webp"
        alt="Ahmed Samra holding a tennis trophy"
        width={989}
        height={1116}
        preload
        sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) min(38rem, calc(100vw - 64px)), 48vw"
        className="relative z-10 h-auto w-full max-w-[31rem] object-contain drop-shadow-[0_28px_32px_rgba(13,38,28,0.22)] sm:max-w-[34rem]"
      />

      <figcaption className="absolute bottom-4 start-4 z-20 border-s-2 border-primary ps-3 text-xs font-semibold text-foreground sm:bottom-6 sm:start-6">
        {locale === "ar" ? "أحمد سمرة | لاعب ومدرب تنس" : "Ahmed Samra | Tennis Player & Coach"}
      </figcaption>
    </figure>
  );
}
