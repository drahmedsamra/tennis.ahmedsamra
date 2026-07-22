import { heroStats } from "./data";

export function HeroStats() {
  return (
    <div className="mt-10 grid grid-cols-3 gap-3">
      {heroStats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-border/60 bg-background/80 p-4 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
        >
          <div className="text-2xl">{stat.icon}</div>

          <div className="mt-2 text-2xl font-black text-primary">
            {stat.value}
          </div>

          <div className="mt-1 text-xs leading-5 text-muted-foreground">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}