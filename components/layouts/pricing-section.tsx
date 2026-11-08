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

        <dl className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2">
          {content.items.map((item, index) => (
            <div
              key={item.name}
              className="group relative flex min-h-52 flex-col overflow-hidden rounded-md border border-border/80 bg-background p-5 transition-colors hover:border-primary/40 sm:min-h-60 sm:p-8"
            >
              <span className="text-xs font-semibold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <WalletCards
                className="absolute end-6 top-6 size-5 text-primary/35 transition-colors group-hover:text-primary sm:end-8 sm:top-8"
                aria-hidden
              />
              <dt className="mt-8 text-lg font-semibold text-foreground sm:text-xl">
                {item.name}
              </dt>
              <dd className="mt-3 flex flex-1 flex-col">
                <p className="text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-auto border-t border-border/80 pt-5 text-2xl font-semibold text-primary sm:text-3xl">
                  {item.price}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
