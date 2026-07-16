import {
  BadgeInfo,
  Building2,
  Target,
  Trophy,
  User,
  UserRound,
} from "lucide-react";

type Player = {
  full_name_ar: string;
  egypt_tennis_id?: number | null;
  primary_club?: string | null;
  private_coach?: string | null;
  dominant_hand: string;
  dominant_eye: string;
};

type Props = {
  player: Player;
};

export default function PlayerDetails({
  player,
}: Props) {
  const dominance =
    player.dominant_hand === player.dominant_eye;

  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
          <BadgeInfo className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            الملف الشخصي
          </h2>

          <p className="text-sm text-slate-500">
            المعلومات الأساسية للاعب
          </p>
        </div>

      </div>

      <div className="space-y-3">

        <InfoRow
          icon={<User className="h-5 w-5" />}
          title="الاسم"
          value={player.full_name_ar}
        />

        <InfoRow
          icon={<Trophy className="h-5 w-5" />}
          title="رقم اتحاد التنس"
          value={player.egypt_tennis_id?.toString() ?? "-"}
        />

        <InfoRow
          icon={<Building2 className="h-5 w-5" />}
          title="النادي"
          value={player.primary_club ?? "غير محدد"}
        />

        <InfoRow
          icon={<UserRound className="h-5 w-5" />}
          title="المدرب الخاص"
          value={player.private_coach ?? "-"}
        />

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition-all hover:border-green-200 hover:bg-green-50">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
              <Target className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Dominance
              </p>

              <p className="text-base font-semibold text-slate-900">
                {dominance
                  ? "Same Dominance"
                  : "Cross Dominance"}
              </p>
            </div>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              dominance
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {dominance ? "Same" : "Cross"}
          </span>

        </div>

      </div>

    </section>
  );
}

type InfoRowProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

function InfoRow({
  icon,
  title,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition-all hover:border-green-200 hover:bg-green-50">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
          {icon}
        </div>

        <div>
          <p className="text-xs text-slate-500">
            {title}
          </p>

          <p className="text-base font-semibold text-slate-900">
            {value}
          </p>
        </div>

      </div>

    </div>
  );
}