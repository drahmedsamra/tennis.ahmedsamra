import { redirect } from "next/navigation";

export default function PlayerSearchPage() {
  async function searchPlayer(formData: FormData) {
    "use server";

    const id = formData.get("id")?.toString().trim().toUpperCase();

    if (!id) return;

    redirect(`/player/${id}`);
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl border p-8">

        <div className="text-center">

          <div className="text-6xl mb-4">
            🎾
          </div>

          <h1 className="text-4xl font-bold">
            Player Reports
          </h1>

          <p className="text-gray-500 mt-3">
            Enter your Player ID
          </p>

        </div>

        <form action={searchPlayer} className="mt-8 space-y-4">

          <input
            name="id"
            type="text"
            placeholder="Player ID"
            autoComplete="off"
            className="w-full rounded-xl border p-4 text-center text-lg outline-none focus:ring-2 focus:ring-green-600"
          />

          <button
            className="w-full rounded-xl bg-green-600 py-4 text-lg font-semibold text-white hover:bg-green-700 transition"
          >
            View Reports
          </button>

        </form>

      </div>
    </main>
  );
}