import { Award } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/get-dictionary";

type AchievementsSectionProps = {
  content: Dictionary["achievements"];
};

export function AchievementsSection({ content }: AchievementsSectionProps) {
  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="bg-[#173b2c] text-white">
      <div className="marketing-shell py-16 sm:py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#a9d6aa]">
            {content.eyebrow}
          </p>
          <div>
            <h2 id="achievements-heading" className="max-w-4xl text-3xl font-semibold leading-[1.12] text-white sm:text-4xl lg:text-5xl">
              {content.heading}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg sm:leading-9">
              {content.introduction}
            </p>
          </div>
        </div>

        <ol className="mt-12 divide-y divide-white/15 border-y border-white/15">
          {content.cards.map((card, index) => (
            <li key={card.title} className="grid gap-3 py-6 sm:grid-cols-[4rem_minmax(0,0.7fr)_1.3fr_auto] sm:items-center sm:gap-6">
              <span className="text-xs font-semibold text-[#a9d6aa]">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-xs font-medium text-[#a9d6aa]">{card.value}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{card.title}</h3>
              </div>
              <p className="text-sm leading-7 text-white/65">{card.description}</p>
              <Award className="hidden size-5 text-[#a9d6aa] sm:block" aria-hidden />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
