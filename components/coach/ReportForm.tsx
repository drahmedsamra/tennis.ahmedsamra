"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  FileText,
  Film,
  Plus,
  Trash2,
  User,
  Video as VideoIcon,
} from "lucide-react";
import { YouTubeIcon } from "@/components/icons/youtube-icon";
import { extractYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";
import type { Report } from "@/types/reports";
import type { ReportVideo } from "@/types/videos";

type VideoItem = {
  title: string;
  youtube_url: string;
  description: string;
};

type ReportFormProps = {
  report?: Partial<Report>;
  initialVideos?: ReportVideo[];
  action: (formData: FormData) => void | Promise<void>;
  players: {
    id: string;
    preferred_name_ar: string;
    player_code: string;
  }[];
};

export default function ReportForm({
  report,
  initialVideos,
  action,
  players,
}: ReportFormProps) {
  const today = new Date().toISOString().split("T")[0];

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    if (initialVideos && initialVideos.length > 0) {
      return initialVideos.map((v) => ({
        title: v.title,
        youtube_url: v.youtube_url,
        description: v.description || "",
      }));
    }
    if (report?.youtube_url) {
      return [
        {
          title: "فيديو التحليل الفني",
          youtube_url: report.youtube_url,
          description: "",
        },
      ];
    }
    return [];
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddVideo = () => {
    setVideos((prev) => [
      ...prev,
      {
        title: `فيديو تحليل #${prev.length + 1}`,
        youtube_url: "",
        description: "",
      },
    ]);
  };

  const handleRemoveVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVideoChange = (
    index: number,
    field: keyof VideoItem,
    value: string
  ) => {
    setVideos((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

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
      className="space-y-8"
    >
      {/* Hidden input passing the videos JSON */}
      <input type="hidden" name="videos_json" value={JSON.stringify(videos)} />

      {/* 1. قسم بيانات التقرير */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              بيانات التقرير الفني
            </h2>
            <p className="text-xs text-slate-500">
              أدخل تفاصيل التقرير واللاعب والتقييم الفني
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* اختيار اللاعب */}
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-bold text-slate-700">
              <User className="h-4 w-4 text-emerald-600" />
              اللاعب <span className="text-red-500">*</span>
            </label>
            <select
              name="player_id"
              required
              defaultValue={report?.player_id ?? ""}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-800 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            >
              <option value="">-- اختر اللاعب --</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.preferred_name_ar || player.player_code} ({player.player_code})
                </option>
              ))}
            </select>
          </div>

          {/* تاريخ التقرير */}
          <div>
            <label className="mb-2 flex items-center gap-1.5 text-sm font-bold text-slate-700">
              <Calendar className="h-4 w-4 text-emerald-600" />
              تاريخ التقرير
            </label>
            <input
              name="report_date"
              type="date"
              defaultValue={report?.report_date ?? today}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-800 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          {/* عنوان التقرير */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              عنوان التقرير <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              type="text"
              required
              defaultValue={report?.title ?? ""}
              placeholder="مثال: تحليل أداء مباراة نصف النهائي"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-800 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          {/* نوع التقرير */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              نوع التقرير
            </label>
            <input
              name="report_type"
              type="text"
              defaultValue={report?.report_type ?? "تقرير ماتش"}
              placeholder="مثال: تقرير ماتش، تقييم شهري، معسكر تدريبي"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-800 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          {/* التقييم العام */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              التقييم العام (من 10)
            </label>
            <input
              name="overall_rating"
              type="number"
              step="0.1"
              min="1"
              max="10"
              defaultValue={report?.overall_rating ?? ""}
              placeholder="مثال: 8.5"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-800 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          {/* الفترة التدريبية */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              الفترة التدريبية
            </label>
            <input
              name="report_period"
              type="text"
              defaultValue={report?.report_period ?? ""}
              placeholder="مثال: نوفمبر 2026"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-800 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          {/* الملخص السريع */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              الملخص الفني السريع
            </label>
            <textarea
              name="summary"
              rows={3}
              defaultValue={report?.summary ?? ""}
              placeholder="نظرة عامة مختصرة حول أداء اللاعب والنقاط الأساسية الإيجابية ونقاط التحسين..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-800 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          {/* محتوى وتفاصيل التقرير */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              محتوى التقرير الفني والتوصيات <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content_markdown"
              rows={10}
              required
              defaultValue={report?.content_markdown ?? ""}
              placeholder="اكتب التحليل الفني المفصل، تقسيم المهارات (الإرسال، الفورهاند، الباكهاند، التحرك، الجانب الذهني والتكتيكي)..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-sm leading-relaxed text-slate-800 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          {/* اسم المدرب */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              المدرب المشرف
            </label>
            <input
              name="author_name"
              type="text"
              defaultValue={report?.author_name ?? "Ahmed Samra"}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-800 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          {/* حالة النشر */}
          <div className="flex items-center gap-3 pt-6">
            <input
              id="published"
              name="is_published"
              type="checkbox"
              defaultChecked={report?.is_published ?? true}
              className="h-5 w-5 rounded-lg border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="published" className="cursor-pointer text-sm font-bold text-slate-800">
              نشر التقرير (ليكون مرئياً للاعب في بوابته)
            </label>
          </div>
        </div>
      </section>

      {/* 2. قسم فيديوهات التحليل الفني (YouTube Videos) */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Film className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                فيديوهات التحليل الفني (YouTube)
              </h2>
              <p className="text-xs text-slate-500">
                أضف فيديوهات من اليوتيوب لتحليل أداء اللاعب والضربات بالفيديو
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddVideo}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
          >
            <Plus className="h-4 w-4" />
            + إضافة فيديو يوتيوب للتقرير
          </button>
        </div>

        {videos.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
            <VideoIcon className="mx-auto h-8 w-8 text-slate-400" />
            <p className="mt-2 text-sm font-bold text-slate-700">
              لم تقم بإضافة فيديوهات لهذا التقرير بعد
            </p>
            <p className="mt-1 text-xs text-slate-500">
              يمكنك ربط فيديو أو أكثر من يوتيوب لمشاهدة التكنيك بالفيديو البطيء والملاحظات.
            </p>
            <button
              type="button"
              onClick={handleAddVideo}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-700"
            >
              <Plus className="h-3.5 w-3.5" />
              إضافة أول فيديو الآن
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {videos.map((video, index) => {
              const videoId = extractYouTubeId(video.youtube_url);
              const thumbnail = videoId ? getYouTubeThumbnail(video.youtube_url) : null;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition hover:border-slate-300"
                >
                  <div className="mb-4 flex items-center justify-between border-b border-slate-200/60 pb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                      <Film className="h-4 w-4 text-emerald-600" />
                      فيديو #{index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemoveVideo(index)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 transition hover:text-red-700"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      حذف الفيديو
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {/* عنوان الفيديو */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-700">
                        عنوان الفيديو
                      </label>
                      <input
                        type="text"
                        value={video.title}
                        onChange={(e) =>
                          handleVideoChange(index, "title", e.target.value)
                        }
                        placeholder="مثال: تحليل ضربة الإرسال والوقفة"
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    {/* رابط يوتيوب */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-700">
                        رابط يوتيوب (YouTube URL)
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          value={video.youtube_url}
                          onChange={(e) =>
                            handleVideoChange(index, "youtube_url", e.target.value)
                          }
                          placeholder="https://www.youtube.com/watch?v=... أو https://youtu.be/..."
                          className="w-full rounded-xl border border-slate-200 bg-white p-3 pr-10 text-sm text-slate-800 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                        <YouTubeIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-600" />
                      </div>
                    </div>

                    {/* معاينة الفيديو المصغرة */}
                    {thumbnail && (
                      <div className="md:col-span-2 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-2.5">
                        <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-900 shadow">
                          <Image
                            src={thumbnail}
                            alt="YouTube Thumbnail"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-xs">
                          <p className="font-bold text-slate-800">معرف الفيديو: {videoId}</p>
                          <p className="text-emerald-700 font-medium">✓ رابط YouTube صالح ومعتمد</p>
                        </div>
                      </div>
                    )}

                    {/* ملاحظات وتوجيهات الفيديو */}
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-xs font-bold text-slate-700">
                        ملاحظات فنية حول الفيديو (اختياري)
                      </label>
                      <textarea
                        rows={2}
                        value={video.description}
                        onChange={(e) =>
                          handleVideoChange(index, "description", e.target.value)
                        }
                        placeholder="اكتب التوجيه الفني المطلوب من اللاعب ملاحظته أثناء مشاهدة الفيديو..."
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={handleAddVideo}
              className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/50 px-5 py-3 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100"
            >
              <Plus className="h-4 w-4" />
              + إضافة فيديو آخر لهذا التقرير
            </button>
          </div>
        )}
      </section>

      {/* أزرار الإجراءات السفلية */}
      <div className="flex items-center justify-between">
        <Link
          href="/coach/reports"
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
          {isSubmitting ? "جاري حفظ التقرير والفيديوهات..." : "حفظ التقرير الفني"}
        </button>
      </div>
    </form>
  );
}
