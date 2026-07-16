import {
  BadgeCheck,
  User,
} from "lucide-react";

type Props = {
  name: string;
  id: string;
};

export default function PlayerHeader({
  name,
  id,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-10 text-white shadow-xl">

      {/* Background Glow */}

      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10">

        {/* Badge */}

        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
          <BadgeCheck className="h-4 w-4" />
          Ahmed Samra Tennis
        </div>

        {/* Player */}

        <div className="flex flex-col items-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/15 backdrop-blur">
            <User className="h-12 w-12" />
          </div>

          <h1 className="mt-6 text-4xl font-extrabold">
            أهلاً يا {name} 👋
          </h1>

          <p className="mt-2 text-green-100">
            مرحبًا بك في بوابة اللاعبين
          </p>

        </div>

        {/* Player ID */}

        <div className="mt-8 flex justify-center">
          <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.3em] text-green-100">
              Player ID
            </p>

            <p className="mt-2 text-3xl font-black tracking-[0.2em]">
              {id}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}