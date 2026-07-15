import Link from "next/link";
import { notFound } from "next/navigation";
import { getReport } from "@/services/players";
import ReportContent from "@/components/player/ReportContent";

type Props = {
  params: Promise<{
    id: string;
    reportId: string;
  }>;
};

export default async function ReportPage({ params }: Props) {
  const { id, reportId } = await params;

  console.log("Page reportId =", reportId);

  const report = await getReport(reportId);

  if (!report) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-8 py-12">
        <Link
          href={`/player/${id}`}
          className="text-green-600 hover:underline"
        >
          ← رجوع
        </Link>

        <div className="mt-10">
          <h1 className="text-6xl font-bold">
            {report.title}
          </h1>

          <p className="mt-4 text-3xl text-gray-500">
            {new Date(report.report_date).toLocaleDateString("ar-EG")}
          </p>
        </div>

        <div className="my-10 border-t" />

        <ReportContent
          coach={report.author_name ?? "أحمد سمرة"}
          content={[report.content_markdown ?? ""]}
          goals={[]}
        />
      </div>
    </main>
  );
}