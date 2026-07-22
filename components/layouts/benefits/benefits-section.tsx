import { BenefitsGrid } from "./benefits-grid";
import { BenefitsHeader } from "./benefits-header";

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <BenefitsHeader />

        <BenefitsGrid />
      </div>
    </section>
  );
}