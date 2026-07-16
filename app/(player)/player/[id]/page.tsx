import PlayerHero from "@/components/player/playerid/PlayerHero";
import PlayerDashboard from "@/components/player/playerid/PlayerDashboard";
import PlayerDetails from "@/components/player/playerid/PlayerDetails";
import PlayerReports from "@/components/player/playerid/PlayerReports";

import { getPlayer } from "@/services/players";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PlayerPage({
  params,
}: Props) {
  const { id } = await params;

  const { player, reports } = await getPlayer(id);

  if (!player) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-800">
          Player not found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-5 sm:px-6 sm:py-8">

        <PlayerHero
          player={player}
          reportsCount={reports.length}
        />

        <PlayerDashboard
          reportsCount={reports.length}
        />

        <PlayerDetails
          player={player}
        />

        <PlayerReports
          playerCode={player.player_code}
          reports={reports}
        />

      </div>
    </main>
  );
}