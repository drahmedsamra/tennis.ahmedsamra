import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  subtitle?: string;
  className?: string;
};

export function BrandLogo({
  variant = "light",
  size = "md",
  showText = true,
  subtitle = "Tennis Academy",
  className,
}: BrandLogoProps) {
  const isDark = variant === "dark";

  const sizeClasses = {
    sm: {
      box: "size-8 sm:size-9",
      img: 26,
      title: "text-xs font-black tracking-wider",
      sub: "text-[9px] tracking-[0.16em]",
    },
    md: {
      box: "size-10 sm:size-11",
      img: 34,
      title: "text-sm sm:text-base font-black tracking-wider",
      sub: "text-[10px] sm:text-[11px] tracking-[0.18em]",
    },
    lg: {
      box: "size-14 sm:size-16",
      img: 50,
      title: "text-lg sm:text-xl font-black tracking-wider",
      sub: "text-xs tracking-[0.2em]",
    },
  }[size];

  return (
    <div
      dir="ltr"
      className={cn("flex items-center gap-3 select-none", className)}
    >
      {/* Dynamic Tennis Logo Mark */}
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105",
          sizeClasses.box,
          isDark
            ? "border border-white/20 bg-white/10 p-1.5 shadow-sm backdrop-blur-xs ring-1 ring-white/10"
            : "border border-primary/20 bg-gradient-to-br from-primary/10 via-emerald-500/10 to-primary/5 p-1.5 shadow-xs ring-1 ring-primary/10"
        )}
      >
        <Image
          src={isDark ? "/images/logo/logo-icon-dark.webp" : "/images/logo/logo-icon.webp"}
          alt="Ahmed Samra Tennis Logo"
          width={sizeClasses.img}
          height={sizeClasses.img}
          className="size-full object-contain"
          priority
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={cn(
              "font-black uppercase tracking-wider transition-colors",
              sizeClasses.title,
              isDark ? "text-white" : "text-foreground"
            )}
          >
            Ahmed Samra
          </span>
          <span
            className={cn(
              "font-bold uppercase",
              sizeClasses.sub,
              isDark ? "text-emerald-400" : "text-primary"
            )}
          >
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
}

