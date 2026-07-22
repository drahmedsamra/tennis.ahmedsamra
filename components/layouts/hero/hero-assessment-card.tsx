import Link from "next/link";

export function HeroAssessmentCard() {
  return (
    <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
      <div className="text-lg font-bold text-primary">
        🎁 أول تقييم مجاني
      </div>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        ابدأ رحلتك مع تقييم احترافي لمستواك دون أي تكلفة، واحصل على رؤية واضحة
        لمستواك الحالي وما تحتاج إليه للوصول إلى المستوى التالي.
      </p>

      <div className="mt-4 grid gap-2 text-sm">
        <div className="flex items-center gap-2">
          <span>✓</span>
          <span>تحليل الأداء الفني والتكتيكي</span>
        </div>

        <div className="flex items-center gap-2">
          <span>✓</span>
          <span>تحديد نقاط القوة والضعف</span>
        </div>

        <div className="flex items-center gap-2">
          <span>✓</span>
          <span>خطة تطوير شخصية</span>
        </div>

        <div className="flex items-center gap-2">
          <span>✓</span>
          <span>توصيات عملية قابلة للتطبيق</span>
        </div>
      </div>

      <Link
        href="#how-it-works"
        className="mt-5 inline-flex text-sm font-semibold text-primary transition hover:underline"
      >
        اقرأ كيف يتم التقييم →
      </Link>
    </div>
  );
}