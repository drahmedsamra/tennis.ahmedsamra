import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
} from "lucide-react";

type Props = {
  id: string;
  playerId: string;
  title: string;
  summary: string;
  date: string;
};

export default function ReportCard({
  id,
  playerId,
  title,
  summary,
  date,
}: Props) {
  return (
    <Link
      href={`/player/${playerId}/report/${id}`}
      className="group block"
    >
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl">

        {/* Header */}

        <div className="flex items-start justify-between gap-4">

          <div className="flex items-start gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <FileText className="h-6 w-6" />
            </div>

            <div>

              <h2 className="text-2xl font-bold leading-tight text-slate-900">
                {title}
              </h2>

              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-500">

                <CalendarDays className="h-4 w-4" />

                {date}

              </div>

            </div>

          </div>

        </div>

        {/* Summary */}

        <p className="mt-6 line-clamp-3 text-lg leading-8 text-slate-600">
          {summary}
        </p>

        {/* Footer */}

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

          <span className="text-sm text-slate-400">
            اضغط لعرض التقرير الكامل
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-3 group-hover:bg-green-700">

            عرض التقرير

            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />

          </span>

        </div>

      </article>
    </Link>
  );
}