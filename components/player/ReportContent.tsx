import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  UserRound,
  Target,
  FileText,
  Film,
} from "lucide-react";
import type { ReportVideo } from "@/types/videos";
import { YouTubeEmbed } from "@/components/common/youtube-embed";

type Props = {
  coach: string;
  content: string;
  goals: string[];
  videos?: ReportVideo[];
  youtubeUrl?: string | null;
};

export default function ReportContent({
  coach,
  content,
  goals,
  videos = [],
  youtubeUrl,
}: Props) {
  // Combine videos from report_videos and direct youtubeUrl if unique
  const allVideos = [...videos];
  if (youtubeUrl && !allVideos.some((v) => v.youtube_url === youtubeUrl)) {
    allVideos.push({
      id: "report-direct-video",
      report_id: "",
      title: "فيديو التحليل الفني للمباراة",
      youtube_url: youtubeUrl,
      description: null,
      sort_order: 0,
      created_at: "",
    });
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      {/* Coach Header */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <UserRound className="h-7 w-7" />
          </div>

          <div>
            <p className="text-sm text-slate-500">المدرب المشرف</p>
            <h2 className="text-2xl font-bold text-slate-900">{coach}</h2>
          </div>
        </div>
      </section>

      {/* Videos Section if present */}
      {allVideos.length > 0 && (
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <Film className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  فيديوهات التحليل الفني
                </h2>
                <p className="text-sm text-slate-500">
                  تسجيلات مرئية لتحليل الضربات والمباريات مع التوجيهات التدريبية
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:p-8 md:grid-cols-2">
            {allVideos.map((video) => (
              <div
                key={video.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-4"
              >
                <YouTubeEmbed url={video.youtube_url} title={video.title} />
                <h3 className="mt-3 text-base font-bold text-slate-900">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {video.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Report Content */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <FileText className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                التقرير الفني
              </h2>
              <p className="text-sm text-slate-500">
                التحليل الفني والتوصيات
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mb-8 text-center text-3xl font-black text-slate-900">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <div className="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
                  <h2 className="text-2xl font-bold text-emerald-700">
                    {children}
                  </h2>
                </div>
              ),
              h3: ({ children }) => (
                <h3 className="mt-8 mb-4 text-xl font-bold text-slate-900">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-5 text-lg leading-9 text-slate-700">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mb-6 list-disc space-y-3 pr-6 marker:text-emerald-600">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-6 list-decimal space-y-3 pr-6 marker:text-emerald-600">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-lg leading-8 text-slate-700">
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-slate-900">
                  {children}
                </strong>
              ),
              hr: () => (
                <div className="my-8 border-t border-slate-200" />
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-8 rounded-2xl border-r-4 border-emerald-600 bg-emerald-50 p-6 italic leading-8 text-emerald-800">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </section>

      {/* Goals */}
      {goals.length > 0 && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Target className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                أهداف الأسبوع القادم
              </h2>
              <p className="text-sm text-slate-500">
                النقاط المطلوب التركيز عليها
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {goals.map((goal) => (
              <div
                key={goal}
                className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  ✓
                </div>

                <p className="text-lg text-slate-700">{goal}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
