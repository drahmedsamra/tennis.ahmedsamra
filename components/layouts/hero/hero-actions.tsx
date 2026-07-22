import Link from "next/link";
import { cn } from "@/lib/utils";

type HeroActionsProps = {
  isRtl: boolean;
};

export function HeroActions({ isRtl }: HeroActionsProps) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Link
        href="#contact"
        className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
      >
        🎁 ابدأ تقييمك المجاني

        <svg
          className={cn(
            "ms-2 h-4 w-4 transition-transform",
            isRtl && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 12h14M13 5l7 7-7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <Link
        href="#player-portal"
        className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background/80 px-8 text-sm font-semibold backdrop-blur transition-all hover:border-primary hover:bg-primary/5"
      >
        🎾 دخول بوابة اللاعبين
      </Link>
    </div>
  );
}