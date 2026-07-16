import Image from "next/image";
import {
  TrendingUp,
  Target,
  Video,
  FileText,
} from "lucide-react";

export default function PlayerHero() {
  return (
    <div className="text-center">
      {/* Hero Image */}

      <div className="relative mb-8 -mx-4 sm:-mx-8 lg:-mx-10 overflow-hidden">
        <Image
          src="/images/player_portal_photo2.webp"
          alt="Ahmed Samra Tennis Player Portal"
          width={1600}
          height={900}
          priority
          className="w-full h-auto"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>

      {/* Title */}

      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
        بوابة اللاعبين
      </h1>

      <p className="mt-3 text-xl font-semibold text-green-700">
        Player Reports Portal
      </p>

      {/* Description */}

      <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-gray-600">
        أدخل كود اللاعب للوصول إلى التقارير الفنية، وتحليل الأداء،
        ونقاط القوة، وخطة التطوير، والفيديوهات الخاصة بمسيرتك
        التدريبية.
      </p>

      {/* Features */}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
          <FileText className="h-4 w-4" />
          التقارير الفنية
        </div>

        <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
          <TrendingUp className="h-4 w-4" />
          تحليل الأداء
        </div>

        <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
          <Target className="h-4 w-4" />
          خطة التطوير
        </div>

        <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
          <Video className="h-4 w-4" />
          الفيديوهات
        </div>
      </div>
    </div>
  );
}