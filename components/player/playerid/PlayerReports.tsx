import ReportCard from "@/components/player/ReportCard";

type Report = {
  id: string;
  title: string;
  summary: string;
  report_date: string;
};

type Props = {
  playerCode: string;
  reports: Report[];
};

export default function PlayerReports({
  playerCode,
  reports,
}: Props) {
  return (
    <section className="mt-10">

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        التقارير الفنية
      </h2>

      {reports.length === 0 ? (

        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-gray-500 shadow-sm">
          لا توجد تقارير لهذا اللاعب حتى الآن.
        </div>

      ) : (

        <div className="space-y-6">

          {reports.map((report) => (

            <ReportCard
              key={report.id}
              id={report.id}
              playerId={playerCode}
              title={report.title}
              summary={report.summary}
              date={report.report_date}
            />

          ))}

        </div>

      )}

    </section>
  );
}