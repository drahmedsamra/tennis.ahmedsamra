import ReportForm from "@/components/coach/ReportForm";

import { getReportById } from "@/services/reports";
import { getPlayers } from "@/services/players";

import { updateReport } from "../../actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditReportPage({
  params,
}: Props) {
  const { id } = await params;

  const report = await getReportById(id);

  const players = await getPlayers();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Edit Report
        </h1>

        <p className="mt-2 text-gray-500">
          Update report information.
        </p>
      </div>

      <ReportForm
        report={report}
        players={players}
        action={updateReport.bind(null, id)}
      />
    </div>
  );
}
