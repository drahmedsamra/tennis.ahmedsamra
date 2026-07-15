import { getDashboardStats } from "@/services/dashboard";

export default async function CoachDashboard() {
  const stats = await getDashboardStats();

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            🎾 Coach Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Welcome back Ahmed Samra
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-8 shadow">
            <div className="text-gray-500">
              Players
            </div>

            <div className="mt-4 text-5xl font-bold">
              {stats.players}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow">
            <div className="text-gray-500">
              Reports
            </div>

            <div className="mt-4 text-5xl font-bold">
              {stats.reports}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow">
            <div className="text-gray-500">
              Videos
            </div>

            <div className="mt-4 text-5xl font-bold">
              {stats.videos}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}