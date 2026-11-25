import Link from "next/link";
import { notFound } from "next/navigation";
import { getReport } from "@/services/players";
import { getVideosByReportId } from "@/services/videos";
import ReportContent from "@/components/player/ReportContent";
import { ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
    reportId: string;
  }>;
};

export default async function ReportPage({ params }: Props) {
  const { id, reportId } = await params;

  const [report, videos] = await Promise.all([
    getReport(reportId),
    getVideosByReportId(reportId),
  ]);

  if (!report) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        <Link
          href={`/player/${id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          <ArrowRight className="h-4 w-4" />
          رجوع إلى صفحة اللاعب
        </Link>

        <div className="my-8 text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            {report.report_type || "تقرير فني"}
          </span>
          <h1 className="mt-3 text-3xl font-black text-slate-900 md:text-5xl">
            {report.title}
          </h1>

          <p className="mt-2 text-base text-slate-500">
            {report.report_date || "-"}
          </p>
        </div>

        <ReportContent
          coach={report.author_name ?? "أحمد سمرة"}
          content={report.content_markdown ?? ""}
          goals={[]}
          videos={videos}
          youtubeUrl={report.youtube_url}
        />
      </div>
    </main>
  );
}
