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

export default function PlayerInfoCards({
  player,
}: Props) {
  return (
    <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

      <InfoCard
        icon={<Building2 className="h-5 w-5" />}
        title="النادي"
        value={player.primary_club ?? "غير محدد"}
      />

      <InfoCard
        icon={<Calendar className="h-5 w-5" />}
        title="سنة الميلاد"
        value={player.birth_year.toString()}
      />

      <InfoCard
        icon={<Hand className="h-5 w-5" />}
        title="اليد المفضلة"
        value={player.dominant_hand}
      />

      <InfoCard
        icon={<Eye className="h-5 w-5" />}
        title="العين المسيطرة"
        value={player.dominant_eye}
      />

    </section>
  );
}

type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

function InfoCard({
  icon,
  title,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">

        {icon}

      </div>

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-lg font-bold text-slate-900">
        {value}
      </h3>

    </div>
  );
}