"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Film, Video } from "lucide-react";
import { YouTubeIcon } from "@/components/icons/youtube-icon";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";
import Image from "next/image";

type ReportOption = {
  id: string;
  title: string;
  report_date: string | null;
  report_type: string | null;
  players?: {
    player_code: string;
    preferred_name_ar: string;
  } | null;
};

type VideoFormProps = {
  reports: ReportOption[];
  defaultReportId?: string;
  action: (formData: FormData) => Promise<void>;
};

export default function VideoForm({
  reports,
  defaultReportId,
  action,
}: VideoFormProps) {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const videoId = extractYouTubeId(youtubeUrl);
  const thumbnail = videoId ? getYouTubeThumbnail(youtubeUrl) : null;

  return (
    <form
      action={async (formData) => {
        setIsSubmitting(true);
        try {
          await action(formData);
        } finally {
          setIsSubmitting(false);
        }
      }}
      className="mx-auto max-w-4xl space-y-8"
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Video className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              بيانات الفيديو وربطه بالتقرير
            </h2>
            <p className="text-sm text-slate-500">
              قم باختيار التقرير الفني للاعب وضع رابط فيديو التحليل من يوتيوب
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* اختيار التقرير */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              التقرير الفني المرتبط بالفيديو <span className="text-red-500">*</span>
            </label>
            <select
              name="report_id"
              required
              defaultValue={defaultReportId || ""}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-slate-800 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            >
              <option value="">-- اختر التقرير الفني واللاعب --</option>
              {reports.map((r) => {
                const playerName =
                  r.players?.preferred_name_ar || r.players?.player_code || "لاعب";
                const playerCode = r.players?.player_code
                  ? `(${r.players.player_code})`
                  : "";
                const reportTitle = r.title || "تقرير فني";
                const date = r.report_date ? ` - ${r.report_date}` : "";
                return (
                  <option key={r.id} value={r.id}>
                    {playerName} {playerCode} ◄ {reportTitle} {date}
                  </option>
                );
              })}
            </select>
          </div>

          {/* عنوان الفيديو */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              عنوان الفيديو <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              type="text"
              required
              placeholder="مثال: تحليل ضربة الإرسال والتمركز الخلفي - بالحركة البطيئة"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-slate-800 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          {/* رابط يوتيوب */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              رابط يوتيوب (YouTube URL) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                name="youtube_url"
                type="url"
                required
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... أو https://youtu.be/..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 pr-12 text-slate-800 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
              />
              <YouTubeIcon className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-red-600" />
            </div>
            <p className="mt-2 text-xs text-slate-400">
              يقبل روابط الفيديوهات العادية، روابط المشاركة القصيرة (youtu.be)، أو روابط YouTube Shorts.
            </p>
          </div>

          {/* معاينة الفيديو إذا كان الرابط صحيحاً */}
          {thumbnail && (
            <div className="md:col-span-2 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold text-emerald-800">
                <Film className="h-4 w-4" />
                معاينة الفيديو المكتشف تلقائياً:
              </div>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-900 shadow">
                  <Image
                    src={thumbnail}
                    alt="YouTube Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">معرف الفيديو: {videoId}</p>
                  <p className="text-emerald-700">✓ تم التحقق من صحة رابط اليوتيوب بنجاح</p>
                </div>
              </div>
            </div>
          )}

          {/* الوصف والملاحظات الفنية */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              ملاحظات فنية حول الفيديو (اختياري)
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="اكتب التوجيهات الفنية المطلوب من اللاعب التركيز عليها أثناء مشاهدة الفيديو (مثال: ركز على زاوية المضرب عند الثانية 0:35 ونقل الوزن للأمام)..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-slate-800 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          {/* ترتيب العرض */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              ترتيب الظهور في التقرير
            </label>
            <input
              name="sort_order"
              type="number"
              defaultValue={1}
              min={1}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-slate-800 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>
        </div>
      </div>

      {/* أزرار الحفظ والإلغاء */}
      <div className="flex items-center justify-between">
        <Link
          href="/coach/videos"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowRight className="h-4 w-4" />
          إلغاء والعودة
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:opacity-50"
        >
          {isSubmitting ? "جاري الحفظ..." : "حفظ الفيديو وربطه بالتقرير"}
        </button>
      </div>
    </form>
  );
}
