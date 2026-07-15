import ReportForm from "@/components/coach/ReportForm";

import { saveReport } from "../actions";

import { getPlayers } from "@/services/players";

export default async function NewReportPage() {
  const players = await getPlayers();

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Add New Report
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new player report.
        </p>

      </div>

      <ReportForm
        players={players}
        action={saveReport}
      />

    </div>
  );
}