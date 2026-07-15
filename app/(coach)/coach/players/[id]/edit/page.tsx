import PlayerForm from "@/components/coach/PlayerForm";

import { getPlayerById } from "@/services/players";
import { updatePlayer } from "../../actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPlayerPage({
  params,
}: Props) {
  const { id } = await params;

  const player = await getPlayerById(id);

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Edit Player
        </h1>

        <p className="mt-2 text-gray-500">
          Update player information.
        </p>

      </div>

      <PlayerForm
        player={player}
        action={updatePlayer.bind(null, id)}
      />

    </div>
  );
}