import { getPlayerById } from "@/services/players";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PlayerPage({
  params,
}: Props) {
  const { id } = await params;

  const player = await getPlayerById(id);

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          {player.preferred_name_ar || player.full_name_ar}
        </h1>

        <p className="mt-2 text-gray-500">
          Player Profile
        </p>

      </div>

      <div className="rounded-2xl bg-white p-8 shadow space-y-4">

        <p>
          <strong>Player Code:</strong> {player.player_code}
        </p>

        <p>
          <strong>Birth Year:</strong> {player.birth_year}
        </p>

        <p>
          <strong>Gender:</strong> {player.gender}
        </p>

        <p>
          <strong>Dominant Hand:</strong> {player.dominant_hand}
        </p>

        <p>
          <strong>Club:</strong> {player.primary_club}
        </p>

        <p>
          <strong>Private Coach:</strong> {player.private_coach}
        </p>

        <p>
          <strong>Parent:</strong> {player.parent_name}
        </p>

        <p>
          <strong>Phone:</strong> {player.parent_phone}
        </p>

        <p>
          <strong>Notes:</strong> {player.notes}
        </p>

      </div>

    </div>
  );
}