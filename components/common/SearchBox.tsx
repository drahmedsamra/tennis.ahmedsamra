import type { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({
  icon,
  title,
  description,
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={`group h-full rounded-3xl border border-border/60 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl ${className}`}
    >
      <div className="flex h-full items-start gap-4">
        <div className="flex-1 text-right">
          <h3 className="text-2xl font-bold leading-tight text-foreground">
            {title}
          </h3>

          <p className="mt-2 text-base leading-7 text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>
    </div>
  );
}