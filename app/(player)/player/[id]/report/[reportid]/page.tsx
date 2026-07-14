import Link from "next/link";
import ReportContent from "@/components/player/ReportContent";

type Props = {
  params: {
    id: string;
    reportId: string;
  };
};

export default function ReportPage({ params }: Props) {
  const report = {
    title: "التقرير الأسبوعي",
    date: "13 يوليو 2026",
    coach: "أحمد سمرة",

    content: [
      "كان أداء اللاعبة ممتازاً هذا الأسبوع.",
      "تحسن واضح في الحركة داخل الملعب.",
      "الفورهاند أصبح أكثر ثباتاً.",
      "يحتاج الباكهاند إلى المزيد من التدريب.",
    ],

    goals: [
      "تحسين الإرسال الأول",
      "زيادة ثبات الباكهاند",
      "اللعب الهجومي",
    ],
  };

  return (
    <main className="min-h-screen bg-white">

      <div className="mx-auto max-w-4xl px-8 py-12">

        <Link
          href={`/player/${params.id}`}
          className="text-green-600 hover:underline"
        >
          ← رجوع
        </Link>

        <div className="mt-10">

          <h1 className="text-6xl font-bold">
            {report.title}
          </h1>

          <p className="mt-4 text-3xl text-gray-500">
            {report.date}
          </p>

        </div>

        <div className="my-10 border-t" />

        <ReportContent
          coach={report.coach}
          content={report.content}
          goals={report.goals}
        />

      </div>

    </main>
  );
}