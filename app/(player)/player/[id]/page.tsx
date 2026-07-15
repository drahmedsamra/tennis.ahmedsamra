import PlayerHeader from "@/components/player/PlayerHeader";
import ReportCard from "@/components/player/ReportCard";
import { getPlayer } from "@/services/players";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PlayerPage({ params }: Props) {
  const { id } = await params;

  const { player, reports } = await getPlayer(id);

  if (!player) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Player not found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="mx-auto max-w-4xl">
        <PlayerHeader
          name={player.preferred_name_ar}
          id={player.player_code}
        />

        <div className="mt-10 space-y-6">
          {reports.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow">
              لا توجد تقارير لهذا اللاعب حتى الآن.
            </div>
          ) : (
            reports.map((report: any) => (
              <ReportCard
                key={report.id}
                id={report.id}
                playerId={player.player_code}
                title={report.title}
                summary={report.summary}
                date={report.report_date}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}