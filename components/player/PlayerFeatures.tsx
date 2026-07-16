import React from "react";
import {
  TrendingUp,
  Target,
  Video,
  BarChart3,
} from "lucide-react";

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

export default function PlayerFeatures() {
  return (
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
  );
}