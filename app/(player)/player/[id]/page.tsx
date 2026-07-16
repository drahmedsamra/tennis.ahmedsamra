import Image from "next/image";
import PlayerHeader from "@/components/player/PlayerHeader";
import ReportCard from "@/components/player/ReportCard";
import { getPlayer } from "@/services/players";
import {
  Calendar,
  Eye,
  Hash,
  Trophy,
  User,
  Hand,
  FileText,
  Building2,
} from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PlayerPage({
  params,
}: Props) {
  const { id } = await params;

  const { player, reports } = await getPlayer(id);

  if (!player) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">
          Player not found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-6xl">

        <PlayerHeader
          name={player.preferred_name_ar}
          id={player.player_code}
        />

        {/* Hero */}

        <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">

          <div className="flex flex-col items-center gap-8 lg:flex-row">

            {/* Player Photo */}

            <div className="shrink-0">

              {player.photo_url ? (

                <Image
                  src={player.photo_url}
                  alt={player.full_name_ar}
                  width={170}
                  height={170}
                  className="h-44 w-44 rounded-full object-cover ring-4 ring-green-100"
                />

              ) : (

                <div className="flex h-44 w-44 items-center justify-center rounded-full bg-green-100 text-7xl">
                  👤
                </div>

              )}

            </div>

            {/* Player Info */}

            <div className="flex-1">

              <h1 className="text-4xl font-extrabold text-slate-900">
                {player.full_name_ar}
              </h1>

              {player.preferred_name_ar !==
                player.full_name_ar && (
                <p className="mt-2 text-xl font-semibold text-green-700">
                  {player.preferred_name_ar}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">

                <Badge
                  icon={<Hash className="h-4 w-4" />}
                  label={player.player_code}
                />

                {player.egypt_tennis_id && (
                  <Badge
                    icon={<Trophy className="h-4 w-4" />}
                    label={`ETF ${player.egypt_tennis_id}`}
                  />
                )}

                <Badge
                  icon={<FileText className="h-4 w-4" />}
                  label={`${reports.length} تقرير`}
                />

              </div>

            </div>

          </div>

        </div>
                {/* Player Information */}

                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

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

</div>

{/* Extra Information */}

<div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">

<h2 className="mb-6 text-2xl font-bold">
  بيانات اللاعب
</h2>

<div className="grid gap-5 md:grid-cols-2">

  <InfoRow
    title="الاسم الكامل"
    value={player.full_name_ar}
  />

  <InfoRow
    title="الاسم المفضل"
    value={player.preferred_name_ar}
  />

  <InfoRow
    title="كود اللاعب"
    value={player.player_code}
  />

  <InfoRow
    title="رقم اتحاد التنس"
    value={
      player.egypt_tennis_id?.toString() ??
      "-"
    }
  />

  <InfoRow
    title="النادي"
    value={
      player.primary_club ??
      "غير محدد"
    }
  />

  <InfoRow
    title="المدرب الخاص"
    value={
      player.private_coach ??
      "-"
    }
  />

  <InfoRow
    title="اليد المسيطرة"
    value={player.dominant_hand}
  />

  <InfoRow
    title="العين المسيطرة"
    value={player.dominant_eye}
  />

</div>

</div>

{/* Reports */}

<div className="mt-10">

  <h2 className="mb-6 text-2xl font-bold text-slate-900">
    التقارير الفنية
  </h2>

  {reports.length === 0 ? (

    <div className="rounded-2xl border bg-white p-10 text-center text-gray-500 shadow-sm">
      لا توجد تقارير لهذا اللاعب حتى الآن.
    </div>

  ) : (

    <div className="space-y-6">

      {reports.map((report: any) => (

        <ReportCard
          key={report.id}
          id={report.id}
          playerId={player.player_code}
          title={report.title}
          summary={report.summary}
          date={report.report_date}
        />

      ))}

    </div>

  )}

</div>

      </div>

    </main>
  );
}

type BadgeProps = {
  icon: React.ReactNode;
  label: string;
};

function Badge({
  icon,
  label,
}: BadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">

      {icon}

      {label}

    </div>
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
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">

        {icon}

      </div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-2 text-lg font-bold text-slate-900">
        {value}
      </h3>

    </div>
  );
}

type InfoRowProps = {
  title: string;
  value: string;
};

function InfoRow({
  title,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 transition-colors hover:bg-slate-100">

      <span className="text-sm font-medium text-slate-500">
        {title}
      </span>

      <span className="text-base font-bold text-slate-900 text-left">
        {value}
      </span>

    </div>
  );
}