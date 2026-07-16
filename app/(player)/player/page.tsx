import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import PlayerPortalCard from "@/components/player/PlayerPortalCard";
import PlayerHero from "@/components/player/PlayerHero";
import PlayerLoginCard from "@/components/player/PlayerLoginCard";
import PlayerErrorAlert from "@/components/player/PlayerErrorAlert";
import PlayerSearchForm from "@/components/player/PlayerSearchForm";
import PlayerFeatures from "@/components/player/PlayerFeatures";
import PlayerFooter from "@/components/player/PlayerFooter";

export default async function PlayerSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function searchPlayer(formData: FormData) {
    "use server";

    const id = formData
      .get("id")
      ?.toString()
      .trim()
      .toLowerCase();

    if (!id) {
      redirect("/player?error=empty");
    }

    const supabase = await createClient();

    const { data: player } = await supabase
      .from("players")
      .select("player_code")
      .eq("player_code", id)
      .maybeSingle();

    if (!player) {
      redirect("/player?error=notfound");
    }

    redirect(`/player/${id}`);
  }

  return (
    <main className="w-full bg-gradient-to-br from-green-50 via-white to-emerald-100 py-6 sm:py-10">
      <PlayerPortalCard>
        <PlayerHero />

        <PlayerErrorAlert error={error} />

        <PlayerLoginCard />

        <PlayerSearchForm action={searchPlayer} />

        <PlayerFeatures />

        <PlayerFooter />
      </PlayerPortalCard>
    </main>
  );
}