import Image from "next/image";

export function HeroImage() {
  return (
    <div className="relative flex justify-center lg:-mt-16 lg:translate-x-6">
      <div className="absolute h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-[120px]" />

      <Image
        src="/images/hero/ahmed-samra-hero2.webp"
        alt="Ahmed Samra"
        width={640}
        height={860}
        priority
        className="relative z-10 h-auto w-full max-w-[430px] object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,.22)] transition-transform duration-500 hover:scale-[1.02] lg:max-w-[560px]"
      />
    </div>
  );
}