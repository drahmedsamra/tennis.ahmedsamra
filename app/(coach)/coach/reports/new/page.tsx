import ReportForm from "@/components/coach/ReportForm";
import { saveReport } from "../actions";
import { getPlayers } from "@/services/players";

export const dynamic = "force-dynamic";

export default async function NewReportPage() {
  const players = await getPlayers();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
          إضافة تقرير فني جديد
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          إنشاء تقرير فني شامل للاعب مع إمكانية إرفاق فيديوهات اليوتيوب للتحليل المرئي
        </p>
      </div>

      <ReportForm
        players={players}
        action={saveReport}
      />
    </div>
  );
}
