import {
  FileText,
  TrendingUp,
  Trophy,
  Video,
} from "lucide-react";

type Props = {
  reportsCount: number;
};

export default function PlayerDashboard({
  reportsCount,
}: Props) {
  return (
    <section className="-mt-8 relative z-10 px-2">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

        <DashboardCard
          icon={<FileText className="h-5 w-5" />}
          title="التقارير"
          value={reportsCount.toString()}
          color="green"
        />

        <DashboardCard
          icon={<Video className="h-5 w-5" />}
          title="الفيديوهات"
          value="0"
          color="blue"
        />

        <DashboardCard
          icon={<TrendingUp className="h-5 w-5" />}
          title="التطور"
          value="--"
          color="orange"
        />

        <DashboardCard
          icon={<Trophy className="h-5 w-5" />}
          title="التقييم"
          value="--"
          color="purple"
        />

      </div>
    </section>
  );
}

type DashboardCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: "green" | "blue" | "orange" | "purple";
};

function DashboardCard({
  icon,
  title,
  value,
  color,
}: DashboardCardProps) {
  const colors = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    orange: "bg-orange-100 text-orange-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div
        className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]}`}
      >
        {icon}
      </div>

      <p className="text-xs font-medium text-slate-500">
        {title}
      </p>

      <h3 className="mt-1 text-2xl font-extrabold text-slate-900">
        {value}
      </h3>

    </div>
  );
}