import { cn } from "@/lib/utils";

type SectionPlaceholderProps = {
  id: string;
  title: string;
  variant?: "default" | "muted";
};

export function SectionPlaceholder({
  id,
  title,
  variant = "default",
}: SectionPlaceholderProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-14 lg:scroll-mt-16",
        variant === "muted" && "bg-muted/50",
      )}
    >
      <div className="mx-auto max-w-6xl px-6 py-32 lg:px-8 lg:py-44">
        <div className="max-w-2xl">
          <p className="text-[0.6875rem] font-semibold tracking-[0.28em] text-primary uppercase">
            {title}
          </p>
          <h2 id={`${id}-heading`} className="sr-only">
            {title}
          </h2>
        </div>
      </div>
    </section>
  );
}
