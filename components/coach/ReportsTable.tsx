import Link from "next/link";

type Report = {
  id: string;
  title: string;
  report_date: string | null;
  report_type: string | null;
  overall_rating: number | null;
  is_published: boolean;
  players: {
    player_code: string;
    preferred_name_ar: string;
  } | null;
};

type ReportsTableProps = {
  reports: Report[];
};

export default function ReportsTable({
  reports,
}: ReportsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">
      <table className="w-full">
        <thead className="border-b bg-slate-50">
          <tr>
            <th className="p-4 text-right">Player</th>

            <th className="p-4 text-right">Title</th>

            <th className="p-4 text-right">Date</th>

            <th className="p-4 text-right">Type</th>

            <th className="p-4 text-right">Rating</th>

            <th className="p-4 text-right">Published</th>

            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="p-10 text-center text-gray-500"
              >
                No reports found.
              </td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr
                key={report.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-4">
                  {report.players?.preferred_name_ar} (
                  {report.players?.player_code})
                </td>

                <td className="p-4">
                  {report.title}
                </td>

                <td className="p-4">
                  {report.report_date ?? "-"}
                </td>

                <td className="p-4">
                  {report.report_type ?? "-"}
                </td>

                <td className="p-4">
                  {report.overall_rating ?? "-"}
                </td>

                <td className="p-4">
                  {report.is_published ? "✅" : "❌"}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/coach/reports/${report.id}`}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                    >
                      View
                    </Link>

                    <Link
                      href={`/coach/reports/${report.id}/edit`}
                      className="rounded-lg bg-amber-500 px-3 py-2 text-white hover:bg-amber-600"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}