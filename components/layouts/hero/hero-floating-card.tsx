export function HeroFloatingCard() {
  return (
    <div className="absolute bottom-6 left-0 z-20 hidden max-w-[280px] rounded-2xl border border-primary/20 bg-background/95 p-5 shadow-2xl backdrop-blur lg:block">
      <div className="text-base font-bold text-primary">
        🎾 التقييم الفني للاعب
      </div>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        يمكنك اختيار الطريقة الأنسب لإجراء التقييم:
      </p>

      <ul className="mt-4 space-y-3 text-sm">
        <li className="flex items-center gap-2">
          <span className="text-primary">✓</span>
          <span>تقييم من مباراة</span>
        </li>

        <li className="flex items-center gap-2">
          <span className="text-primary">✓</span>
          <span>تقييم أثناء التدريب معي</span>
        </li>

        <li className="flex items-center gap-2">
          <span className="text-primary">✓</span>
          <span>تقييم أثناء التدريب مع مدربك</span>
        </li>

        <li className="flex items-center gap-2">
          <span className="text-primary">✓</span>
          <span>تقييم من خلال فيديو</span>
        </li>

        <li className="flex items-center gap-2">
          <span className="text-primary">✓</span>
          <span>خطة فنية قبل مواجهة لاعب معين</span>
        </li>
      </ul>

      <div className="mt-5 rounded-xl border border-primary/20 bg-primary/10 p-3 text-center">
        <div className="text-base font-bold text-primary">
          🎁 أول تقييم مجاني
        </div>

        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          ابدأ بمعرفة مستواك الحقيقي، ثم ضع خطة واضحة للوصول إلى المستوى التالي.
        </p>
      </div>
    </div>
  );
}