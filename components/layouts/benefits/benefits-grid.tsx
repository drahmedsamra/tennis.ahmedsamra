import { benefits } from "./benefits-data";
import { BenefitCard } from "./benefit-card";

export function BenefitsGrid() {
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {benefits.map((benefit) => (
        <BenefitCard
          key={benefit.title}
          benefit={benefit}
        />
      ))}
    </div>
  );
}