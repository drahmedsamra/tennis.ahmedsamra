import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, FileText, FolderOpen, NotebookPen } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";

type PlayerAccessSectionProps = {
  locale: Locale;
};

const portalContent = {
  ar: {
    eyebrow: "بوابة اللاعب",
    heading: "مساحة منظمة للعودة إلى تفاصيل التطور.",
    description:
      "بوابة اللاعب تجمع التقارير الفنية والملاحظات وخطط التطوير في مكان واحد، ليظل التواصل بين التدريب والمراجعة واضحاً.",
    features: [
      ["التقارير الفنية", "راجع الملاحظات والتوصيات في أي وقت."],
      ["تحليل الأداء", "افهم التفاصيل التي تحتاج إلى انتباه في الملعب."],
      ["خطة التطوير", "ارجع إلى نقاط التركيز للمرحلة التالية."],
    ],
    cta: "الدخول إلى بوابة اللاعب",
    caption: "متابعة هادئة. تركيز أوضح.",
  },
  en: {
    eyebrow: "Player portal",
    heading: "An organised place to return to the details of progress.",
    description:
      "The Player Portal brings technical reports, coaching notes, and development plans together, keeping the connection between training and review clear.",
    features: [
      ["Technical reports", "Return to feedback and recommendations any time."],
      ["Performance analysis", "Understand the details that need attention on court."],
      ["Development plan", "Keep the next phase of focus within reach."],
    ],
    cta: "Enter the Player Portal",
    caption: "Calm follow-up. Clearer focus.",
  },
} as const;

const featureIcons = [FileText, NotebookPen, FolderOpen];

export function PlayerAccessSection({ locale }: PlayerAccessSectionProps) {
  const content = portalContent[locale];

  return (
    <section id="player-portal" className="overflow-hidden bg-[#11291e] text-white">
      <div className="marketing-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:py-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#a9d6aa]">
            {content.eyebrow}
          </p>
          <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-[1.12] text-white sm:text-4xl lg:text-5xl">
            {content.heading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg sm:leading-9">
            {content.description}
          </p>

          <ul className="mt-9 divide-y divide-white/15 border-y border-white/15">
            {content.features.map(([title, description], index) => {
              const Icon = featureIcons[index];

              return (
                <li key={title} className="grid grid-cols-[auto_1fr] gap-4 py-5">
                  <Icon className="mt-1 size-5 text-[#a9d6aa]" aria-hidden />
                  <div>
                    <h3 className="text-sm font-semibold text-white sm:text-base">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/65">{description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <Link
            href="/player"
            className="mt-9 inline-flex h-12 items-center gap-3 rounded-md border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:border-[#a9d6aa] hover:text-[#a9d6aa]"
          >
            {content.cta}
            <ArrowUpLeft
              className={`size-4 ${locale === "ar" ? "rotate-180" : ""}`}
              aria-hidden
            />
          </Link>
        </div>

        <figure className="relative mx-auto flex min-h-[22rem] w-full max-w-[30rem] items-end justify-center overflow-hidden border border-white/15 bg-[#173b2c] px-8 pt-8 sm:min-h-[30rem] sm:px-12">
          <div aria-hidden className="absolute inset-0 border-[1.4rem] border-[#1d4936]" />
          <div aria-hidden className="absolute start-8 top-8 h-20 w-20 border-s border-t border-[#a9d6aa]/40" />
          <Image
            src="/images/hero/ahmed-samra-hero.webp"
            alt="Ahmed Samra holding a tennis trophy"
            width={600}
            height={1027}
            sizes="(max-width: 1023px) min(30rem, calc(100vw - 40px)), 38vw"
            className="relative z-10 h-auto w-full max-w-[23rem] object-contain"
          />
          <figcaption className="absolute bottom-5 start-5 z-20 text-xs font-medium text-white/75">
            {content.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
