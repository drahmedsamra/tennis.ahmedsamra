import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  Lock,
  TrendingUp,
  Target,
  Video,
  BarChart3,
} from "lucide-react";

export default async function PlayerSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function searchPlayer(formData: FormData) {
    "use server";

    const id = formData
      .get("id")
      ?.toString()
      .trim()
      .toLowerCase();

    if (!id) {
      redirect("/player?error=empty");
    }

    const supabase = await createClient();

    const { data: player } = await supabase
      .from("players")
      .select("player_code")
      .eq("player_code", id)
      .maybeSingle();

    if (!player) {
      redirect("/player?error=notfound");
    }

    redirect(`/player/${id}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4 py-10">

      <div className="w-full max-w-xl rounded-[32px] border border-green-100 bg-white p-10 shadow-2xl">

        {/* Logo */}

        <div className="text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 shadow-inner">

            <Image
              src="/images/icon.webp"
              alt="Ahmed Samra Tennis"
              width={52}
              height={52}
              priority
            />

          </div>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900">
            Ahmed Samra Tennis
          </h1>

          <p className="mt-2 text-lg font-semibold text-green-700">
            بوابة تقارير اللاعبين
          </p>

          <p className="mt-6 text-base leading-8 text-gray-600">
            أدخل كود اللاعب للوصول إلى التقارير الفنية،
            وتحليل الأداء، وخطة التطوير،
            والفيديوهات الخاصة به.
          </p>

        </div>

        {/* Secure Login */}

        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">

              <Lock className="h-6 w-6" />

            </div>

            <div>

              <h3 className="font-bold text-green-800">
                تسجيل دخول اللاعب
              </h3>

              <p className="mt-1 text-sm leading-7 text-green-700">
                لكل لاعب كود خاص يتيح له الوصول إلى ملفه الفني
                وتقاريره الشخصية فقط.
              </p>

            </div>

          </div>

        </div>

        {/* Error */}

        {error === "notfound" && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm font-semibold text-red-700">
            ❌ هذا الكود غير موجود، تأكد من كتابته أو تواصل مع الكابتن أحمد سمرة.
          </div>
        )}

        {error === "empty" && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center text-sm font-semibold text-amber-700">
            ⚠️ برجاء إدخال كود اللاعب أولاً.
          </div>
        )}

        {/* Form */}

        <form action={searchPlayer} className="mt-8 space-y-5">

          <input
            name="id"
            type="text"
            autoComplete="off"
            dir="ltr"
            placeholder="أدخل كود اللاعب"
            className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-5 text-center text-3xl font-bold uppercase tracking-[0.35em] shadow-inner outline-none transition-all focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-green-600 py-4 text-lg font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl active:scale-[0.98]"
          >
            عرض الملف
          </button>

        </form>

        {/* Platform Goals */}

        <div className="mt-10">

          <h2 className="mb-5 text-center text-lg font-bold text-green-700">
            🎯 ماذا ستجد داخل المنصة؟
          </h2>

          <div className="grid grid-cols-2 gap-4">
          <FeatureCard
            icon={<TrendingUp className="h-6 w-6" />}
            title="متابعة المستوى"
            description="قياس تطور الأداء بشكل دوري."
          />

          <FeatureCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="تحليل الأداء"
            description="إحصائيات وتقارير فنية دقيقة."
          />

          <FeatureCard
            icon={<Target className="h-6 w-6" />}
            title="خطة التطوير"
            description="برنامج تدريبي يناسب مستواك."
          />

          <FeatureCard
            icon={<Video className="h-6 w-6" />}
            title="الفيديوهات"
            description="مراجعة المباريات والتدريبات."
          />

          </div>

        </div>

        {/* Examples */}

        <div className="mt-8">

          <p className="mb-4 text-center text-sm font-semibold text-slate-600">
            أمثلة على أكواد اللاعبين
          </p>

          <div className="flex flex-wrap justify-center gap-3">

            <CodeBadge code="OM3" />
            <CodeBadge code="OM25" />
            <CodeBadge code="SHU12" />
            <CodeBadge code="ZM8" />

          </div>

        </div>

        {/* Footer */}

        <div className="mt-10 border-t border-gray-200 pt-6 text-center">

          <p className="text-sm font-medium text-gray-500">
            © 2026 Ahmed Samra Tennis
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Player Development Platform
          </p>

        </div>

      </div>

    </main>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-green-100 bg-green-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:bg-white hover:shadow-lg">

      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-green-700 shadow-sm transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      <h3 className="font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {description}
      </p>

    </div>
  );
}

function CodeBadge({
  code,
}: {
  code: string;
}) {
  return (
    <span className="rounded-full border border-green-200 bg-green-50 px-4 py-2 font-mono text-sm font-bold tracking-wider text-green-700 transition-all duration-300 hover:border-green-500 hover:bg-green-600 hover:text-white">
      {code}
    </span>
  );
}