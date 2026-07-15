import type { Player } from "@/types/player";

type PlayerFormProps = {
  player?: Partial<Player>;
  action: (formData: FormData) => void | Promise<void>;
};

export default function PlayerForm({
  player,
  action,
}: PlayerFormProps) {
  return (
    <form action={action} className="space-y-10">

      {/* Basic Information */}

      <section className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          👤 Basic Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Player Code *
            </label>

            <input
              name="player_code"
              type="text"
              defaultValue={player?.player_code ?? ""}
              placeholder="OM1"
              required
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Egypt Tennis ID
            </label>

            <input
              name="egypt_tennis_id"
              type="number"
              defaultValue={player?.egypt_tennis_id ?? ""}
              placeholder="Optional"
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Preferred Name (Arabic)
            </label>

            <input
              name="preferred_name_ar"
              type="text"
              defaultValue={player?.preferred_name_ar ?? ""}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Preferred Name (English)
            </label>

            <input
              name="preferred_name_en"
              type="text"
              defaultValue={player?.preferred_name_en ?? ""}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Full Name (Arabic)
            </label>

            <input
              name="full_name_ar"
              type="text"
              defaultValue={player?.full_name_ar ?? ""}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Full Name (English)
            </label>

            <input
              name="full_name_en"
              type="text"
              defaultValue={player?.full_name_en ?? ""}
              className="w-full rounded-xl border p-3"
            />
          </div>

        </div>

      </section>

      {/* Tennis Information */}

      <section className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          🎾 Tennis Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Birth Year
            </label>

            <input
              name="birth_year"
              type="number"
              defaultValue={player?.birth_year ?? ""}
              placeholder="2014"
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Gender
            </label>

            <select
              name="gender"
              defaultValue={player?.gender ?? ""}
              className="w-full rounded-xl border p-3"
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Dominant Hand
            </label>

            <select
              name="dominant_hand"
              defaultValue={player?.dominant_hand ?? ""}
              className="w-full rounded-xl border p-3"
            >
              <option value="">Select...</option>
              <option value="Right">Right</option>
              <option value="Left">Left</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Dominant Eye
            </label>

            <select
              name="dominant_eye"
              defaultValue={player?.dominant_eye ?? ""}
              className="w-full rounded-xl border p-3"
            >
              <option value="">Select...</option>
              <option value="Right">Right</option>
              <option value="Left">Left</option>
              <option value="Cross">Cross</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Primary Club
            </label>

            <input
              name="primary_club"
              type="text"
              defaultValue={player?.primary_club ?? ""}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Private Coach
            </label>

            <input
              name="private_coach"
              type="text"
              defaultValue={player?.private_coach ?? ""}
              className="w-full rounded-xl border p-3"
            />
          </div>

        </div>

      </section>

      {/* Parent Information */}

      <section className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          👨‍👩‍👦 Parent Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Parent Name
            </label>

            <input
              name="parent_name"
              type="text"
              defaultValue={player?.parent_name ?? ""}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Parent Phone
            </label>

            <input
              name="parent_phone"
              type="text"
              defaultValue={player?.parent_phone ?? ""}
              className="w-full rounded-xl border p-3"
            />
          </div>

        </div>

      </section>

      {/* Notes */}

      <section className="rounded-2xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          📝 Notes
        </h2>

        <textarea
          name="notes"
          rows={5}
          defaultValue={player?.notes ?? ""}
          className="w-full rounded-xl border p-3"
        />

      </section>

      <div className="flex justify-end">

        <button
          type="submit"
          className="rounded-xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
        >
          Save Player
        </button>

      </div>

    </form>
  );
}