import { Lock, ShieldCheck } from "lucide-react";

export default function PlayerLoginCard() {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-green-100 px-6 py-5">
        <div>
          <h2 className="text-xl font-extrabold text-green-900">
            تسجيل دخول اللاعب
          </h2>

          <p className="mt-1 text-sm text-green-700">
            الوصول الآمن إلى التقارير والملف الفني.
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
          <Lock className="h-8 w-8" />
        </div>
      </div>

      {/* Content */}

      <div className="flex items-start gap-4 px-6 py-6">
        <div className="mt-1 rounded-full bg-green-100 p-2 text-green-700">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <p className="text-base leading-8 text-gray-700">
          لكل لاعب{" "}
          <span className="font-bold text-green-700">
            كود خاص
          </span>{" "}
          يتيح له الوصول إلى ملفه الفني، وتقاريره الشخصية،
          وخطة التطوير، والفيديوهات الخاصة به فقط.
        </p>
      </div>
    </div>
  );
}