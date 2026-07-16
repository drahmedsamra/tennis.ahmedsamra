import Image from "next/image";
import {
  Calendar,
  FileText,
  MapPin,
  Trophy,
} from "lucide-react";

type Player = {
  full_name_ar: string;
  preferred_name_ar: string;
  player_code: string;
  egypt_tennis_id?: number | null;
  photo_url?: string | null;
  primary_club?: string | null;
  birth_year: number;
};

type Props = {
  player: Player;
  reportsCount: number;
};

export default function PlayerHero({
  player,
  reportsCount,
}: Props) {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 shadow-xl">

      {/* Decorative Glow */}

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

      <div className="relative px-6 py-7 sm:px-8 sm:py-8">

        <div className="flex flex-col items-center text-center">

          {/* Avatar */}

          {player.photo_url ? (
            <Image
              src={player.photo_url}
              alt={player.full_name_ar}
              width={130}
              height={130}
              priority
              className="h-32 w-32 rounded-full border-4 border-white/70 object-cover shadow-2xl"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/40 bg-white/15 text-6xl backdrop-blur">
              👤
            </div>
          )}

          {/* Welcome */}

          <h1 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            أهلاً يا {player.preferred_name_ar}
          </h1>

          <p className="mt-2 text-sm text-green-100 sm:text-base">
            مرحبًا بك في بوابة اللاعبين
          </p>

          {/* Player ID */}

          <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 px-7 py-4 backdrop-blur">

            <p className="text-[11px] uppercase tracking-[0.45em] text-green-100">
              Player ID
            </p>

            <p className="mt-2 text-3xl font-black tracking-[0.25em] uppercase text-white">
              {player.player_code}
            </p>

          </div>

          {/* Quick Info */}

          <div className="mt-6 flex flex-wrap justify-center gap-2">

            <QuickBadge
              icon={<MapPin className="h-4 w-4" />}
              text={player.primary_club ?? "غير محدد"}
            />

            <QuickBadge
              icon={<Calendar className="h-4 w-4" />}
              text={`${player.birth_year}`}
            />

            {player.egypt_tennis_id && (
              <QuickBadge
                icon={<Trophy className="h-4 w-4" />}
                text={`ETF ${player.egypt_tennis_id}`}
              />
            )}

            <QuickBadge
              icon={<FileText className="h-4 w-4" />}
              text={`${reportsCount} تقرير`}
            />

          </div>

        </div>

      </div>

    </section>
  );
}

type QuickBadgeProps = {
  icon: React.ReactNode;
  text: string;
};

function QuickBadge({
  icon,
  text,
}: QuickBadgeProps) {
  return (
    <div className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-medium text-white backdrop-blur">
      {icon}
      <span>{text}</span>
    </div>
  );
}