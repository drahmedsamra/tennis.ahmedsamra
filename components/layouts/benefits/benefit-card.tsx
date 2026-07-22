import { FeatureCard } from "@/components/ui/feature-card";
import type { Benefit } from "./types";

type BenefitCardProps = {
  benefit: Benefit;
};

export function BenefitCard({ benefit }: BenefitCardProps) {
  return (
    <FeatureCard
      icon={benefit.icon}
      title={benefit.title}
      description={benefit.description}
    />
  );
}