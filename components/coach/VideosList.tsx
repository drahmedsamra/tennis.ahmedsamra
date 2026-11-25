"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  ExternalLink,
  FileText,
  Film,
  Plus,
  Search,
  Trash2,
  User,
  Video as VideoIcon,
} from "lucide-react";
import { YouTubeIcon } from "@/components/icons/youtube-icon";
import type { ReportVideo } from "@/types/videos";
import { YouTubeEmbed } from "@/components/common/youtube-embed";
import { deleteVideoAction } from "@/app/(coach)/coach/videos/actions";

type VideosListProps = {
  videos: ReportVideo[];
};

export default function VideosList({ videos }: VideosListProps) {
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredVideos = videos.filter((v) => {
    const term = search.toLowerCase().trim();
    if (!term) return true;

    const titleMatch = v.title.toLowerCase().includes(term);
    const descMatch = v.description?.toLowerCase().includes(term);
    const reportTitleMatch = v.player_reports?.title.toLowerCase().includes(term);
    const playerNameMatch = v.player_reports?.players?.preferred_name_ar
      ?.toLowerCase()
      .includes(term);
    const playerCodeMatch = v.player_reports?.players?.player_code
      ?.toLowerCase()
      .includes(term);

    return (
      titleMatch ||
      descMatch ||
      reportTitleMatch ||
      playerNameMatch ||
      playerCodeMatch
    );
  });

  const handleDelete = (id: string, reportId?: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الفيديو من التقرير؟")) {
      setDeletingId(id);
      startTransition(async () => {
        try {
          await deleteVideoAction(id, reportId);
        } finally {
          setDeletingId(null);
        }
      });
    }
  };

  // Distinct reports with videos count
  const uniqueReportsCount = new Set(videos.map((v) => v.report_id)).size;

  return (
    <div className="space-y-8">
      {/* رأس الصفحة والإجراءات */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm">
              <Film className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
                فيديوهات التقارير الفنية
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                إدارة وروابط فيديوهات اليوتيوب للتحليلات الفنية ومباريات اللاعبين
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/coach/videos/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
        >
          <Plus className="h-5 w-5" />
          إضافة فيديو جديد
        </Link>
      </div>

      {/* كروت الإحصائيات السريعة */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">إجمالي الفيديوهات</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <VideoIcon className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-slate-900">{videos.length}</p>
          <p className="mt-1 text-xs text-slate-500">فيديو مسجل ومربوط بالتقارير</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">التقارير المزودة بفيديو</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-slate-900">{uniqueReportsCount}</p>
          <p className="mt-1 text-xs text-slate-500">تقارير فنية تحتوي على تحليل مرئي</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">منصة الاستضافة</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <YouTubeIcon className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-xl font-bold text-slate-900">YouTube Embed</p>
          <p className="mt-1 text-xs text-slate-500">تشغيل سلس وسريع بأعلى جودة</p>
        </div>
      </div>

      {/* شريط البحث */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث باسم اللاعب، كود اللاعب، عنوان الفيديو، أو اسم التقرير..."
          className="w-full rounded-2xl border border-slate-200 bg-white p-4 pr-12 text-sm text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
        />
        <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      </div>

      {/* قائمة الفيديوهات */}
      {filteredVideos.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Film className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-800">
            {search ? "لا توجد نتائج مطابقة لبحثك" : "لا توجد فيديوهات مضافة بعد"}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {search
              ? "جرّب البحث بكلمات أخرى أو امسح شريط البحث."
              : "ابدأ بإضافة أول فيديو تحليلي واربطه بتقرير أحد اللاعبين."}
          </p>
          {!search && (
            <Link
              href="/coach/videos/new"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4" />
              إضافة فيديو جديد الآن
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => {
            const player = video.player_reports?.players;
            const report = video.player_reports;
            const isDeleting = deletingId === video.id;

            return (
              <div
                key={video.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:shadow-lg"
              >
                {/* مشغل الفيديو أو المعاينة */}
                <div className="relative aspect-video w-full bg-slate-900">
                  <YouTubeEmbed url={video.youtube_url} title={video.title} />
                </div>

                {/* تفاصيل الفيديو */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div className="space-y-3">
                    {/* معلومات اللاعب والتقرير */}
                    <div className="flex flex-wrap items-center gap-2">
                      {player && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                          <User className="h-3 w-3" />
                          {player.preferred_name_ar || player.player_code} ({player.player_code})
                        </span>
                      )}

                      {report && (
                        <Link
                          href={`/coach/reports/${report.id}`}
                          className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100 hover:text-blue-800"
                        >
                          <FileText className="h-3 w-3" />
                          {report.title}
                        </Link>
                      )}
                    </div>

                    {/* عنوان الفيديو */}
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {video.title}
                    </h3>

                    {/* الملاحظات الفنية */}
                    {video.description && (
                      <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
                        {video.description}
                      </p>
                    )}
                  </div>

                  {/* شريط الإجراءات السفلي */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2">
                      <a
                        href={video.youtube_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        يوتيوب
                      </a>

                      {report && (
                        <Link
                          href={`/coach/reports/${report.id}`}
                          className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          التقرير
                        </Link>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(video.id, video.report_id)}
                      disabled={isDeleting || isPending}
                      className="inline-flex items-center gap-1 rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      title="حذف الفيديو"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
