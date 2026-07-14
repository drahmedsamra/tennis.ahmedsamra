import PlayerHeader from "@/components/player/PlayerHeader";
import ReportCard from "@/components/player/ReportCard";

type Props = {
  params: {
    id: string;
  };
};

export default function PlayerPage({ params }: Props) {
  const player = {
    id: params.id,
    name: "أمنية أحمد سمرة",
  };

  const reports = [
    {
      id: 1,
      title: "التقرير الأسبوعي",
      summary: "تحسن ملحوظ في الحركة والإرسال.",
      date: "13 يوليو 2026",
    },
    {
      id: 2,
      title: "تقرير بطولة الجمهورية",
      summary: "مراجعة أداء البطولة الأخيرة.",
      date: "5 يوليو 2026",
    },
    {
      id: 3,
      title: "التقرير الأسبوعي",
      summary: "التركيز على ثبات الباكهاند.",
      date: "22 يونيو 2026",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">

      <div className="mx-auto max-w-4xl">

        <PlayerHeader
          name={player.name}
          id={player.id}
        />

        <div className="mt-10 space-y-6">

          {reports.map((report) => (

            <ReportCard
              key={report.id}
              id={report.id}
              playerId={player.id}
              title={report.title}
              summary={report.summary}
              date={report.date}
            />

          ))}

        </div>

      </div>

    </main>
  );
}