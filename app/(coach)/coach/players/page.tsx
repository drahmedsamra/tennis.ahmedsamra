import { createClient } from "@/lib/supabase/server";
import PlayersTable from "@/components/coach/PlayersTable";
import Link from "next/link";

export default async function PlayersPage() {
  const supabase = await createClient();

  const { data: players } = await supabase
    .from("players")
    .select("*")
    .order("preferred_name_ar");

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Players
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all players.
          </p>

        </div>

        <Link
          href="/coach/players/new"
          className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
        >
          + Add Player
        </Link>

      </div>

      <PlayersTable players={players ?? []} />

    </div>
  );
}