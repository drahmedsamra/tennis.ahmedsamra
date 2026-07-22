import { heroFeatures } from "./data";

export function HeroFeatures() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3">
      {heroFeatures.map((feature) => (
        <div
          key={feature}
          className="rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-center text-sm font-semibold shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
        >
          {feature}
        </div>
      ))}
    </div>
  );
}