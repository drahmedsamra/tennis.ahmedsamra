export function HeroSteps() {
  const steps = [
    {
      number: 1,
      title: "احجز أول تقييم مجاني",
      description:
        "تواصل معي لحجز موعد التقييم واختيار الطريقة المناسبة لك.",
    },
    {
      number: 2,
      title: "يتم تقييم مستواك",
      description:
        "سواء من خلال مباراة، أو أثناء تدريب، أو عبر فيديو، أو قبل مواجهة لاعب معين.",
    },
    {
      number: 3,
      title: "استلم تقريرك الفني",
      description:
        "تقرير احترافي يتضمن تحليل الأداء، ونقاط القوة والضعف، والتوصيات، وخطة تطوير واضحة.",
    },
    {
      number: 4,
      title: "تابع تطور مستواك",
      description:
        "يمكنك طلب تقييم جديد بعد فترة لمقارنة النتائج وقياس مدى تطور مستواك.",
    },
  ];

  return (
    <div className="mt-8 rounded-2xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur">
      <h3 className="text-lg font-bold">
        كيف تبدأ؟
      </h3>

      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        العملية بسيطة، والهدف منها أن تحصل على صورة واضحة لمستواك الحالي، ثم
        تعرف بالضبط ما الذي تحتاج إلى تطويره.
      </p>

      <div className="mt-6 space-y-5">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {step.number}
            </div>

            <div>
              <h4 className="font-semibold">{step.title}</h4>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}