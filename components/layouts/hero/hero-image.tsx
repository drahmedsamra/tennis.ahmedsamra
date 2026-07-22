import Image from "next/image";
import { HeroFloatingCard } from "./hero-floating-card";

export function HeroImage() {
  return (
    <div className="relative flex justify-center">
      <div className="absolute h-80 w-80 rounded-full bg-primary/15 blur-[90px]" />

      <Image
        src="/images/hero/ahmed-samra-hero2.webp"
        alt="Ahmed Samra"
        width={560}
        height={760}
        priority
        className="relative z-10 h-auto w-full max-w-[390px] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,.25)] transition-transform duration-500 hover:scale-[1.02] lg:max-w-[470px]"
      />

      <HeroFloatingCard />
    </div>
  );
}