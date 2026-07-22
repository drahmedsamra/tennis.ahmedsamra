export function HeroContent() {
  return (
    <>
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary">
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
        Ahmed Samra Tennis Platform
      </span>

      <h1 className="mt-4 text-4xl font-black leading-tight text-foreground lg:text-5xl">
        التقييم الفني للاعب
      </h1>

      <p className="mt-2 text-xl font-bold text-primary">
        لأن كل لاعب يحتاج إلى خريطة واضحة للتطور
      </p>

      <p className="mt-3 max-w-xl text-base leading-8 text-muted-foreground">
        اكتشف نقاط قوتك واعرف ما الذي يمنعك من الوصول إلى المستوى التالي من
        خلال تقييم فني احترافي يشمل التحليل الفني والتكتيكي، مع تحديد نقاط القوة
        والضعف وخطة تطوير شخصية تساعدك على تحقيق أفضل أداء داخل الملعب.
      </p>

      <p className="mt-3 max-w-xl text-base leading-8 text-muted-foreground">
        يمكن إجراء التقييم أثناء المباريات أو التدريبات أو من خلال تحليل
        الفيديو، مع إمكانية إعداد خطة فنية وتكتيكية قبل مواجهة أي لاعب.
      </p>
    </>
  );
}