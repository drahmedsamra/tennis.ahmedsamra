import { getReports } from "@/services/reports";
import ReportsTable from "@/components/coach/ReportsTable";
import Link from "next/link";

export default async function ReportsPage() {
  const reports = await getReports();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Reports
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all player reports.
          </p>
        </div>

        <Link
          href="/coach/reports/new"
          className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
        >
          + Add Report
        </Link>
      </div>

      <ReportsTable reports={reports ?? []} />
    </div>
  );
}