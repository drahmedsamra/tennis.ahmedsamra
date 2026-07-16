
type PlayerSearchFormProps = {
  action: (formData: FormData) => Promise<void>;
};

export default function PlayerSearchForm({
  action,
}: PlayerSearchFormProps) {
  return (
    <form action={action} className="mt-8 space-y-6">
      {/* Label */}

      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
          Player Code
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

      {/* Button */}

      <button
        type="submit"
        className="w-full rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 py-5 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
      >
        🎾 عرض الملف الفني
      </button>

      {/* Help Text */}

      <p className="text-center text-sm leading-7 text-gray-500">
        إذا لم يكن لديك كود اللاعب، تواصل مع المدرب للحصول على بيانات الدخول.
      </p>
    </form>
  );
}