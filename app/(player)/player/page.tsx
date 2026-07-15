import { redirect } from "next/navigation";

export default function PlayerSearchPage() {
  async function searchPlayer(formData: FormData) {
    "use server";

    const id = formData
      .get("id")
      ?.toString()
      .trim()
      .toLowerCase();

    if (!id) return;

    redirect(`/player/${id}`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-6">

      <div className="w-full max-w-lg rounded-3xl bg-white border border-green-100 shadow-2xl p-10">

        <div className="text-center">

          <div className="text-6xl">
            🎾
          </div>

          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            تقارير اللاعبين
          </h1>

          <p className="mt-2 text-gray-500">
            Player Reports
          </p>

          <p className="mt-6 text-gray-600 leading-7">
            أدخل كود اللاعب لعرض جميع التقارير الفنية
            <br />
            والفيديوهات الخاصة به.
          </p>

        </div>

        <form action={searchPlayer} className="mt-10 space-y-5">

          <input
            name="id"
            type="text"
            autoComplete="off"
            dir="ltr"
            placeholder="مثال: om1"
            className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 text-center text-xl font-semibold uppercase outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />

          <button
            className="w-full rounded-2xl bg-green-600 py-4 text-xl font-bold text-white transition hover:bg-green-700"
          >
            عرض التقارير
          </button>

        </form>

        <div className="mt-8 rounded-2xl bg-green-50 p-4 text-center text-sm text-gray-600">

          <span className="font-semibold">
            مثال:
          </span>

          {" "}
          OM1 &nbsp; | &nbsp; OM25 &nbsp; | &nbsp; SHU12

        </div>

      </div>

    </main>
  );
}