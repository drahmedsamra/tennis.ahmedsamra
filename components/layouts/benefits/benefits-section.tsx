import { ChartNoAxesCombined, CircleCheck, FileSearch, Route } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";

type BenefitsSectionProps = {
  locale: Locale;
};

const benefitContent = {
  ar: {
    eyebrow: "تجربة التدريب",
    heading: "التفاصيل التي تمنح كل حصة معنى واتجاهاً.",
    description:
      "التطور لا يعتمد على تكرار التمرين فقط، بل على فهم الهدف ومراجعة الأداء والعودة إلى الملعب بخطوة واضحة.",
    items: [
      ["قراءة فنية دقيقة", "لفهم ما يحدث في الضربة والحركة وقرار اللعب."],
      ["مراجعة عملية", "ملاحظات يمكن تحويلها مباشرة إلى تركيز داخل التدريب."],
      ["تقدم منظم", "خطة تربط العمل اليومي بالمرحلة التالية من التطور."],
      ["متابعة واضحة", "تقارير تساعد اللاعب على العودة إلى التفاصيل المهمة."],
    ],
  },
  en: {
    eyebrow: "Coaching experience",
    heading: "The details that give every session purpose and direction.",
    description:
      "Progress is not only repetition. It comes from understanding the goal, reviewing performance, and returning to court with one clear next step.",
    items: [
      ["Technical clarity", "Understand what is happening in the stroke, movement, and decision."],
      ["Practical review", "Feedback that turns directly into focused training work."],
      ["Structured progress", "A plan that connects daily work with the next stage of development."],
      ["Clear follow-up", "Reports that help the player return to the details that matter."],
    ],
  },
} as const;

const benefitIcons = [FileSearch, CircleCheck, Route, ChartNoAxesCombined];

export function BenefitsSection({ locale }: BenefitsSectionProps) {
  const content = benefitContent[locale];

  return (
    <section id="benefits" className="border-b border-border/70 bg-background">
      <div className="marketing-shell py-16 sm:py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <p className="marketing-kicker">{content.eyebrow}</p>
          <div>
            <h2 className="marketing-heading max-w-3xl">{content.heading}</h2>
            <p className="marketing-copy mt-5 max-w-3xl">{content.description}</p>
          </div>
        </div>

        <ol className="mt-12 divide-y divide-border/80 border-y border-border/80">
          {content.items.map(([title, description], index) => {
            const Icon = benefitIcons[index];

            return (
              <li key={title} className="grid gap-4 py-6 sm:grid-cols-[4rem_minmax(0,0.75fr)_1.25fr_auto] sm:items-center sm:gap-6">
                <span className="text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{description}</p>
                <Icon className="hidden size-5 text-primary sm:block" aria-hidden />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
