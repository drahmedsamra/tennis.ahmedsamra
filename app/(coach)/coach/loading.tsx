export default function CoachDashboardLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="h-24 animate-pulse rounded-2xl bg-white" />
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="h-24 animate-pulse rounded-2xl bg-white" />
        <div className="h-24 animate-pulse rounded-2xl bg-white" />
        <div className="h-24 animate-pulse rounded-2xl bg-white" />
      </div>
      <div className="h-20 animate-pulse rounded-2xl bg-white" />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-64 animate-pulse rounded-2xl bg-white" />
        <div className="h-64 animate-pulse rounded-2xl bg-white" />
      </div>
    </div>
  );
}
