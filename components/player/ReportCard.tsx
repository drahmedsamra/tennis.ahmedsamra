import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    <Link href={`/player/${playerId}/report/${id}`}>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        {/* Header */}

        <div className="flex items-start justify-between gap-4">

          <h2 className="text-3xl font-bold leading-tight text-slate-900">
            📄 {title}
          </h2>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-500 whitespace-nowrap">
            {date}
          </span>

        </div>

        {/* Summary */}

        <p className="mt-5 text-xl leading-9 text-gray-600">
          {summary}
        </p>

        {/* Footer */}

        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">

          <span className="text-sm text-slate-400">
            اضغط لعرض التقرير الكامل
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg">

            عرض التقرير

            <ArrowLeft className="h-4 w-4" />

          </span>

        </div>

      </div>
    </Link>
  );
}