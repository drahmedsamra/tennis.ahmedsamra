import Link from "next/link";

type Player = {
  id: string;
  player_code: string;
  preferred_name_ar: string;
  full_name_ar: string;
  birth_year: number;
};

type PlayersTableProps = {
  players: Player[];
};

export default function PlayersTable({
  players,
}: PlayersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">

      <table className="w-full">

        <thead className="border-b bg-slate-50">

          <tr>

            <th className="p-4 text-right">Player Code</th>

            <th className="p-4 text-right">Name</th>

            <th className="p-4 text-right">Birth Year</th>

            <th className="p-4 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {players.length === 0 ? (

            <tr>

              <td
                colSpan={4}
                className="p-10 text-center text-gray-500"
              >
                No players found.
              </td>

            </tr>

          ) : (

            players.map((player) => (

              <tr
                key={player.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="p-4 font-mono">
                  {player.player_code}
                </td>

                <td className="p-4">
                  {player.preferred_name_ar || player.full_name_ar}
                </td>

                <td className="p-4">
                  {player.birth_year}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-2">

                    <Link
                      href={`/coach/players/${player.id}`}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                    >
                      View
                    </Link>

                    <Link
                      href={`/coach/players/${player.id}/edit`}
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