import Link from "next/link";
import { ArrowUpLeft, Check, ClipboardCheck, FileText, Route } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";

type AssessmentSectionProps = {
  locale: Locale;
};

const assessmentContent = {
  ar: {
    eyebrow: "التقييم الأول",
    heading: "كل خطوة تدريب أفضل تبدأ بصورة واضحة للمستوى الحالي.",
    description:
      "التقييم الفني يمنح اللاعب وولي الأمر فهماً هادئاً لما يعمل جيداً، وما يحتاج إلى تركيز في المرحلة التالية.",
    label: "أول تقييم مجاني",
    includes: [
      "تحليل فني وتكتيكي للأداء",
      "تحديد نقاط القوة وأولويات التطوير",
      "توصيات عملية قابلة للتطبيق",
    ],
    processTitle: "كيف يبدأ المسار؟",
    steps: [
      ["01", "تواصل وحدد طريقة التقييم المناسبة."],
      ["02", "تتم مراجعة الأداء في التدريب أو المباراة أو عبر الفيديو."],
      ["03", "استلم تقريراً واضحاً وخطوة تطوير تالية."],
    ],
    cta: "ابدأ تقييمك",
  },
  en: {
    eyebrow: "First assessment",
    heading: "Every better training decision starts with a clear view of the current level.",
    description:
      "A technical assessment gives the player and parent a calm, practical understanding of what is working and where the next phase needs focus.",
    label: "First assessment is complimentary",
    includes: [
      "Technical and tactical performance review",
      "Strengths and development priorities",
      "Practical recommendations for the next step",
    ],
    processTitle: "How the process begins",
    steps: [
      ["01", "Get in touch and choose the right assessment format."],
      ["02", "Performance is reviewed in training, a match, or on video."],
      ["03", "Receive a clear report and a focused next step."],
    ],
    cta: "Start your assessment",
  },
} as const;

const assessmentIcons = [ClipboardCheck, Route, FileText];

export function AssessmentSection({ locale }: AssessmentSectionProps) {
  const content = assessmentContent[locale];

  return (
    <section id="assessment" className="border-b border-border/70 bg-muted/45">
      <div className="marketing-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-28">
        <div>
          <p className="marketing-kicker">{content.eyebrow}</p>
          <h2 className="marketing-heading mt-5 max-w-xl">{content.heading}</h2>
          <p className="marketing-copy mt-6 max-w-xl">{content.description}</p>

          <div className="mt-8 border-s-2 border-primary ps-5">
            <p className="text-sm font-semibold text-primary">{content.label}</p>
            <ul className="mt-5 space-y-3">
              {content.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-foreground">
                  <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="#contact"
            className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
          >
            {content.cta}
            <ArrowUpLeft
              className={`size-4 ${locale === "ar" ? "rotate-180" : ""}`}
              aria-hidden
            />
          </Link>
        </div>

        <div className="border border-border/80 bg-background p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-semibold text-foreground">{content.processTitle}</p>
          <ol className="mt-8 divide-y divide-border/80 border-y border-border/80">
            {content.steps.map(([number, description], index) => {
              const Icon = assessmentIcons[index];

              return (
                <li key={number} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 sm:gap-6">
                  <span className="text-xs font-semibold text-primary">{number}</span>
                  <p className="text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
                  <Icon className="size-5 text-primary" aria-hidden />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
