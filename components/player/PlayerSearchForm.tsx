"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, ArrowRight, KeyRound, Loader2 } from "lucide-react";

import type { SearchState } from "@/app/(player)/player/actions";
import type { Locale } from "@/lib/i18n/config";

type PlayerSearchFormProps = {
  action: (
    prevState: SearchState,
    formData: FormData
  ) => Promise<SearchState>;
  locale?: Locale;
  redirectToHome?: boolean;
  showInternalHeading?: boolean;
};

const initialState: SearchState = {
  success: false,
  error: "",
};

function SubmitButton({ locale }: { locale: Locale }) {
  const { pending } = useFormStatus();
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const content =
    locale === "ar"
      ? { loading: "جارٍ فتح الملف...", submit: "عرض الملف والتقارير الفنية" }
      : { loading: "Opening profile...", submit: "View Technical Profile" };

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>{content.loading}</span>
        </>
      ) : (
        <>
          <span>{content.submit}</span>
          <ArrowIcon className="size-4" />
        </>
      )}
    </button>
  );
}

export default function PlayerSearchForm({
  action,
  locale = "ar",
  redirectToHome = false,
  showInternalHeading = false,
}: PlayerSearchFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success && state.playerCode) {
      router.push(
        redirectToHome
          ? `/?player=${encodeURIComponent(state.playerCode)}`
          : `/player/${state.playerCode}`
      );
    }
  }, [state, router, redirectToHome]);

  const content =
    locale === "ar"
      ? {
          code: "كود اللاعب",
          heading: "أدخل كود اللاعب",
          placeholder: "مثال: om1 / AST-0001",
          help: "هذا الكود مخصص للاعبين المسجلين مع الكابتن أحمد سمرة.",
        }
      : {
          code: "Player Code",
          heading: "Enter your player code",
          placeholder: "e.g. om1 / AST-0001",
          help: "This unique code is for players training with Coach Ahmed Samra.",
        };

  return (
    <form action={formAction} className="space-y-4">
      {showInternalHeading ? (
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            {content.code}
          </p>
          <h3 className="mt-1.5 text-base font-bold text-foreground">
            {content.heading}
          </h3>
        </div>
      ) : null}

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-3.5 flex items-center text-primary/70">
          <KeyRound className="size-4" />
        </div>
        <input
          name="id"
          type="text"
          autoComplete="off"
          dir="ltr"
          required
          placeholder={content.placeholder}
          className="h-12 w-full rounded-xl border-2 border-primary/25 bg-background ps-10 pe-4 text-center font-mono text-base font-bold uppercase tracking-[0.15em] text-foreground outline-none transition-all placeholder:font-sans placeholder:text-xs placeholder:font-normal placeholder:tracking-normal placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/15"
        />
      </div>

      {state.error ? (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-start text-xs font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
          <AlertCircle className="size-4 shrink-0 text-red-600" />
          <span>{state.error}</span>
        </div>
      ) : null}

      <SubmitButton locale={locale} />

      <p className="text-center text-xs text-muted-foreground">
        {content.help}
      </p>
    </form>
  );
}
