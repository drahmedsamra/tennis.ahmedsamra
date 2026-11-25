import ReportForm from "@/components/coach/ReportForm";
import { getReportById } from "@/services/reports";
import { getPlayers } from "@/services/players";
import { getVideosByReportId } from "@/services/videos";
import { updateReport } from "../../actions";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditReportPage({ params }: Props) {
  const { id } = await params;

  const [report, players, existingVideos] = await Promise.all([
    getReportById(id),
    getPlayers(),
    getVideosByReportId(id),
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
          تعديل التقرير الفني
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          تعديل تفاصيل التقرير والتقييم وفيديوهات التحليل الفني المرفقة
        </p>
      </div>

      <ReportForm
        report={report}
        players={players}
        initialVideos={existingVideos}
        action={updateReport.bind(null, id)}
      />
    </div>
  );
}
