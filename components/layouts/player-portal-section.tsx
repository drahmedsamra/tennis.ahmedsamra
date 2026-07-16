// NOTE:
// This is a starter replacement for player-portal-section.tsx.
// It keeps the same public API while simplifying the layout.
// You can paste it over your existing file.

import {
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardList,
  MessageSquareText,
  Upload,
  Video,
  type LucideIcon,
} from "lucide-react";

import type { Dictionary } from "@/lib/i18n/get-dictionary";

type PlayerPortalSectionProps = {
  content: Dictionary["playerPortal"];
};

const featureIcons: Record<string, LucideIcon> = {
  progress: ChartNoAxesCombined,
  schedule: CalendarDays,
  matches: ClipboardList,
  video: Upload,
  notes: MessageSquareText,
  plan: Video,
};

export function PlayerPortalSection({ content }: PlayerPortalSectionProps) {
  return (
    <section
      id="player-portal"
      className="bg-muted/40 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <p className="text-sm font-semibold text-primary uppercase">
            {content.eyebrow}
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            {content.heading}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            {content.introduction}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-sm text-primary font-semibold">
                  {content.mockup.label}
                </p>
                <h3 className="mt-2 text-2xl font-bold">
                  مها أحمد
                </h3>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                Active
              </span>
            </div>

            <div className="mt-8 space-y-6">

              <div className="rounded-2xl bg-muted p-5">
                <p className="text-sm text-muted-foreground">
                  آخر تقرير
                </p>
                <h4 className="mt-2 text-xl font-bold">
                  التقرير الفني بعد المباراة
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <Skill title="Defense" stars="★★★★★"/>
                <Skill title="Movement" stars="★★★★☆"/>
                <Skill title="Topspin" stars="★★★☆☆"/>
                <Skill title="Backhand" stars="★★☆☆☆"/>

              </div>

              <div className="rounded-2xl border p-5">
                <p className="font-semibold">أولويات الأسبوع</p>

                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>✅ Topspin</li>
                  <li>✅ First Serve</li>
                  <li>✅ Backhand</li>
                </ul>
              </div>

            </div>

          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            {content.features.map((feature)=>{

              const Icon =
                featureIcons[feature.icon] ?? ChartNoAxesCombined;

              return(
                <div
                  key={feature.title}
                  className="rounded-2xl border bg-card p-6 transition hover:-translate-y-1"
                >
                  <Icon className="h-6 w-6 text-primary"/>

                  <h3 className="mt-6 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-muted-foreground leading-7">
                    {feature.description}
                  </p>

                </div>
              );

            })}

          </div>

        </div>

      </div>
    </section>
  );
}

function Skill({
  title,
  stars,
}:{
  title:string;
  stars:string;
}){

  return(
    <div className="rounded-xl border p-4">
      <p className="font-semibold">{title}</p>
      <p className="mt-2 text-primary">{stars}</p>
    </div>
  );

}
