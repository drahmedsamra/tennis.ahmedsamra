import { WalletCards } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/get-dictionary";

type PricingSectionProps = {
  content: Dictionary["pricing"];
};

export function PricingSection({ content }: PricingSectionProps) {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="border-b-4 border-background bg-background">
      <div className="marketing-shell py-10 sm:py-20 lg:py-28">
        <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <p className="marketing-kicker">{content.eyebrow}</p>
          <div>
            <h2 id="pricing-heading" className="marketing-heading max-w-3xl">
              {content.heading}
            </h2>
            <p className="marketing-copy mt-3 max-w-3xl sm:mt-5">{content.introduction}</p>
          </div>
        </div>

        <dl className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-6">
          {content.items.map((item, index) => {
            const isLastOdd =
              index === content.items.length - 1 && content.items.length % 2 === 1;

            return (
              <div
                key={item.name}
                className={`group flex min-h-56 flex-col overflow-hidden rounded-2xl border-2 border-primary/25 bg-card shadow-[0_10px_30px_-18px_oklch(0.36_0.085_154/0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/55 hover:shadow-[0_18px_36px_-16px_oklch(0.36_0.085_154/0.45)] sm:min-h-64 ${
                  index < 3 ? "lg:col-span-2" : "lg:col-span-3"
                } ${isLastOdd ? "sm:col-span-2" : ""}`}
              >
                <div className="h-1.5 bg-primary" aria-hidden />
                <div className="flex items-center justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
                  <span className="inline-flex size-9 items-center justify-center rounded-lg border border-primary/25 bg-primary/5 text-xs font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex size-9 items-center justify-center rounded-lg border border-primary/25 bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <WalletCards className="size-4" aria-hidden />
                  </span>
                </div>
                <dt className="px-5 pt-5 text-lg font-semibold text-foreground sm:px-6 sm:text-xl">
                  {item.name}
                </dt>
                <dd className="mt-2 flex flex-1 flex-col px-5 sm:px-6">
                  <p className="pb-5 text-sm leading-7 text-muted-foreground sm:pb-6">
                    {item.description}
                  </p>
                  <p className="mt-auto -mx-5 border-t-2 border-primary/15 bg-primary/[0.05] px-5 py-4 text-2xl font-semibold tracking-tight text-primary sm:-mx-6 sm:px-6 sm:py-5 sm:text-3xl">
                    {item.price}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
