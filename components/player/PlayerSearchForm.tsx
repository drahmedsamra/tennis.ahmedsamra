"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import type { SearchState } from "@/app/player/actions";

type PlayerSearchFormProps = {
  action: (
    prevState: SearchState,
    formData: FormData
  ) => Promise<SearchState>;
};

const initialState: SearchState = {
  success: false,
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 py-5 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
    >
      {pending ? (
        <>
          <Loader2 className="mr-3 h-6 w-6 animate-spin" />
          جاري تحميل الملف الفني...
        </>
      ) : (
        <>🎾 عرض الملف الفني</>
      )}
    </button>
  );
}

export default function PlayerSearchForm({
  action,
}: PlayerSearchFormProps) {
  const router = useRouter();

  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success && state.playerCode) {
      router.push(`/player/${state.playerCode}`);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="mt-8 space-y-6">
      {/* Label */}
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
          PLAYER CODE
        </p>

        <h3 className="mt-2 text-lg font-bold text-gray-900">
          أدخل كود اللاعب
        </h3>
      </div>

      {/* Input */}
      <input
        name="id"
        type="text"
        autoComplete="off"
        dir="ltr"
        placeholder="AST-0001"
        className="w-full rounded-3xl border-2 border-green-100 bg-white px-6 py-5 text-center text-3xl font-extrabold uppercase tracking-[0.35em] text-gray-900 shadow-sm outline-none transition-all duration-300 placeholder:text-gray-300 focus:border-green-600 focus:ring-4 focus:ring-green-100"
      />

      {state.error && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <SubmitButton />

      <p className="text-center text-sm leading-7 text-gray-500">
        إذا لم يكن لديك كود اللاعب، تواصل مع المدرب للحصول على بيانات الدخول.
      </p>
    </form>
  );
}