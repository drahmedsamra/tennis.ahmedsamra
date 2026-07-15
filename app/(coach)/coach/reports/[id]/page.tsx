import { getReportById } from "@/services/reports";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReportPage({
  params,
}: Props) {
  const { id } = await params;

  const report = await getReportById(id);

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          {report.title}
        </h1>

        <p className="mt-2 text-gray-500">
          Player Report
        </p>

      </div>

      <div className="rounded-2xl bg-white p-8 shadow space-y-5">

        <p>
          <strong>Player ID:</strong> {report.player_id}
        </p>

        <p>
          <strong>Type:</strong> {report.report_type}
        </p>

        <p>
          <strong>Date:</strong> {report.report_date || "-"}
        </p>

        <p>
          <strong>Rating:</strong> {report.overall_rating ?? "-"}
        </p>

        <p>
          <strong>Author:</strong> {report.author_name}
        </p>

        <p>
          <strong>Summary:</strong>
        </p>

        <div className="rounded-lg bg-slate-50 p-4">
          {report.summary || "-"}
        </div>

        <p>
          <strong>Report:</strong>
        </p>

        <div className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4">
          {report.content_markdown}
        </div>

        {report.youtube_url && (
          <>
            <p>
              <strong>YouTube:</strong>
            </p>

            <a
              href={report.youtube_url}
              target="_blank"
              className="text-blue-600 underline"
            >
              Open Video
            </a>
          </>
        )}

      </div>

    </div>
  );
}