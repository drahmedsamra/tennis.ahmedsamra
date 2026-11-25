import Link from "next/link";
import { getReportById } from "@/services/reports";
import { getVideosByReportId } from "@/services/videos";
import { YouTubeEmbed } from "@/components/common/youtube-embed";
import { ArrowRight, Edit, Film, Plus, Video as VideoIcon } from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReportPage({ params }: Props) {
  const { id } = await params;

  const [report, videos] = await Promise.all([
    getReportById(id),
    getVideosByReportId(id),
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-10">
      {/* رأس الصفحة */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
            <span>تقرير فني</span>
            <span>•</span>
            <span>{report.report_type || "تقييم عام"}</span>
          </div>
          <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
            {report.title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            تاريخ التقرير: {report.report_date || "-"} • المدرب: {report.author_name}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/coach/reports"
            className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowRight className="h-4 w-4" />
            كل التقارير
          </Link>
          <Link
            href={`/coach/reports/${id}/edit`}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-slate-800"
          >
            <Edit className="h-4 w-4" />
            تعديل التقرير
          </Link>
        </div>
      </div>

      {/* قسم الفيديوهات المرتبطة بالتقرير */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Film className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                الفيديوهات والتحليل المرئي
              </h2>
              <p className="text-xs text-slate-500">
                فيديوهات اليوتيوب المربوطة بهذا التقرير الفني
              </p>
            </div>
          </div>

          <Link
            href={`/coach/videos/new?reportId=${id}`}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
            إضافة فيديو لهذا التقرير
          </Link>
        </div>

        {videos.length === 0 && !report.youtube_url ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
            <VideoIcon className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-2 text-sm font-bold text-slate-700">
              لم تتم إضافة فيديوهات يوتيوب لهذا التقرير بعد
            </p>
            <p className="mt-1 text-xs text-slate-500">
              يمكنك ربط فيديو من اليوتيوب لمشاهدة التحليل التكتيكي وتكنيك الضربات.
            </p>
            <Link
              href={`/coach/videos/new?reportId=${id}`}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-700"
            >
              <Plus className="h-3.5 w-3.5" />
              ربط فيديو يوتيوب الآن
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {videos.map((video) => (
              <div
                key={video.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-4 shadow-sm"
              >
                <YouTubeEmbed url={video.youtube_url} title={video.title} />
                <h3 className="mt-3 font-bold text-slate-900 text-sm">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {video.description}
                  </p>
                )}
              </div>
            ))}

            {/* فيديو التقرير المباشر إن وجد كـ fallback */}
            {report.youtube_url && !videos.some((v) => v.youtube_url === report.youtube_url) && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-4 shadow-sm">
                <YouTubeEmbed url={report.youtube_url} title="فيديو التقرير المباشر" />
                <h3 className="mt-3 font-bold text-slate-900 text-sm">
                  فيديو التقرير الرئيسي
                </h3>
              </div>
            )}
          </div>
        )}
      </div>

      {/* تفاصيل التقرير */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6 md:p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <span className="text-xs text-slate-500">نوع التقرير</span>
            <p className="mt-1 font-bold text-slate-900">{report.report_type || "-"}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <span className="text-xs text-slate-500">التقييم العام</span>
            <p className="mt-1 font-bold text-emerald-600">
              {report.overall_rating ? `${report.overall_rating} / 10` : "-"}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <span className="text-xs text-slate-500">الفترة</span>
            <p className="mt-1 font-bold text-slate-900">{report.report_period || "-"}</p>
          </div>
        </div>

        {report.summary && (
          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-700">الملخص الفني</h3>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
              {report.summary}
            </div>
          </div>
        )}

        <div>
          <h3 className="mb-2 text-sm font-bold text-slate-700">محتوى التقرير والتوصيات</h3>
          <div className="whitespace-pre-wrap rounded-2xl bg-slate-50 p-5 text-sm leading-relaxed text-slate-800">
            {report.content_markdown}
          </div>
        </div>
      </div>
    </div>
  );
}
