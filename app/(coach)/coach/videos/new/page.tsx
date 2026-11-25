import { getReports } from "@/services/reports";
import VideoForm from "@/components/coach/VideoForm";
import { saveVideoAction } from "../actions";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{
    reportId?: string;
  }>;
};

export default async function NewVideoPage({ searchParams }: Props) {
  const { reportId } = await searchParams;
  const reports = await getReports();

  return (
    <div className="space-y-6">
      <VideoForm
        reports={reports}
        defaultReportId={reportId}
        action={saveVideoAction}
      />
    </div>
  );
}
