import {
  Building2,
  Calendar,
  Eye,
  Hand,
} from "lucide-react";

type Player = {
  primary_club?: string | null;
  birth_year: number;
  dominant_hand: string;
  dominant_eye: string;
};

type Props = {
  player: Player;
};

export default function PlayerStats({
  player,
}: Props) {
  return (
    <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

      <StatCard
        icon={<Building2 className="h-5 w-5" />}
        title="النادي"
        value={player.primary_club ?? "غير محدد"}
      />

      <StatCard
        icon={<Calendar className="h-5 w-5" />}
        title="سنة الميلاد"
        value={player.birth_year.toString()}
      />

      <StatCard
        icon={<Hand className="h-5 w-5" />}
        title="اليد المفضلة"
        value={player.dominant_hand}
      />

      <StatCard
        icon={<Eye className="h-5 w-5" />}
        title="العين المسيطرة"
        value={player.dominant_eye}
      />

    </section>
  );
}

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

function StatCard({
  icon,
  title,
  value,
}: StatCardProps) {
  return (
    <div className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">

      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-xl font-bold text-slate-900 break-words">
        {value}
      </h3>

    </div>
  );
}