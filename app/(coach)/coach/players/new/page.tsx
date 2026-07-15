import PlayerForm from "@/components/coach/PlayerForm";
import { savePlayer } from "../actions";

export default function NewPlayerPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Add New Player
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new player profile.
        </p>

      </div>

      <PlayerForm action={savePlayer} />

    </div>
  );
}