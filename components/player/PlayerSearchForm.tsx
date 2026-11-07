"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import type { SearchState } from "@/app/(player)/player/actions";
import type { Locale } from "@/lib/i18n/config";

type PlayerSearchFormProps = {
  action: (
    prevState: SearchState,
    formData: FormData
  ) => Promise<SearchState>;
  locale?: Locale;
  redirectToHome?: boolean;
};

const initialState: SearchState = {
  success: false,
  error: "",
};

function SubmitButton({ locale }: { locale: Locale }) {
  const { pending } = useFormStatus();
  const content = locale === "ar"
    ? { loading: "جارٍ فتح الملف...", submit: "عرض الملف الفني" }
    : { loading: "Opening profile...", submit: "View profile" };

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="mr-3 h-6 w-6 animate-spin" />
          {content.loading}
        </>
      ) : (
        content.submit
      )}
    </button>
  );
}

export default function PlayerSearchForm({
  action,
  locale = "ar",
  redirectToHome = false,
}: PlayerSearchFormProps) {
  const router = useRouter();

  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success && state.playerCode) {
      router.push(
        redirectToHome
          ? `/?player=${encodeURIComponent(state.playerCode)}`
          : `/player/${state.playerCode}`,
      );
    }
  }, [state, router, redirectToHome]);

  const content = locale === "ar"
    ? {
        code: "كود اللاعب",
        heading: "أدخل كود اللاعب",
        help: "هذا الكود مخصص للاعبين المتدربين مع الكابتن أحمد سمرة.",
      }
    : {
        code: "Player code",
        heading: "Enter your player code",
        help: "This code is for players training with Ahmed Samra.",
      };

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          {content.code}
        </p>

        <h3 className="mt-2 text-base font-semibold text-foreground">
          {content.heading}
        </h3>
      </div>

      <input
        name="id"
        type="text"
        autoComplete="off"
        dir="ltr"
        placeholder="AST-0001"
        className="h-12 w-full rounded-md border border-border bg-background px-4 text-center text-lg font-semibold uppercase tracking-[0.2em] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
      />

      {state.error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <SubmitButton locale={locale} />

      <p className="text-center text-sm text-muted-foreground">
        {content.help}
      </p>
    </form>
  );
}
