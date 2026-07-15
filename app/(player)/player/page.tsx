import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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
      <div className="w-full max-w-md rounded-3xl border border-green-100 bg-white p-8 shadow-2xl">
        {/* Logo */}

        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-5xl">
            🎾
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Ahmed Samra Tennis
          </h1>

          <p className="mt-2 text-lg font-medium text-green-700">
            Player Reports Portal
          </p>

          <p className="mt-5 text-sm leading-8 text-gray-600">
            مرحبًا بك في بوابة متابعة اللاعبين.
            <br />
            أدخل كود اللاعب للاطلاع على ملفه الفني الكامل،
            وآخر التقارير، وتحليل الأداء، وخطة التطوير،
            والفيديوهات المرتبطة بمسيرته التدريبية.
          </p>
        </div>

        {/* Error Messages */}

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
            placeholder="OM6"
            className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 text-center text-2xl font-bold uppercase tracking-widest outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
          />

          <button
            type="submit"
            className="w-full rounded-2xl bg-green-600 py-4 text-lg font-bold text-white transition hover:bg-green-700 active:scale-[0.98]"
          >
            عرض الملف
          </button>
        </form>

        {/* Platform Goals */}

        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">
          <h2 className="mb-4 text-center text-lg font-bold text-green-700">
            🎯 هدف المنصة
          </h2>

          <ul className="space-y-3 text-right text-sm leading-7 text-gray-700">
            <li>✅ متابعة مستوى اللاعب بشكل دوري.</li>
            <li>✅ تحليل الأداء الفني والتكتيكي.</li>
            <li>✅ تحديد نقاط القوة ونقاط التطوير.</li>
            <li>✅ تقديم توصيات تدريبية مخصصة.</li>
            <li>✅ متابعة تطور اللاعب على مدار الموسم.</li>
          </ul>
        </div>

        {/* Examples */}

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-center">
          <p className="text-sm font-semibold text-slate-600">
            أمثلة على أكواد اللاعبين
          </p>

          <p className="mt-2 text-lg font-bold tracking-wider text-gray-700">
            OM3 • OM25 • SHU12
          </p>
        </div>

        {/* Footer */}

        <div className="mt-8 border-t pt-5 text-center">
          <p className="text-xs text-gray-400">
            Powered by Ahmed Samra Tennis Platform
          </p>
        </div>
      </div>
    </main>
  );
}