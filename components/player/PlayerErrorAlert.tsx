type PlayerErrorAlertProps = {
  error?: string;
};

export default function PlayerErrorAlert({
  error,
}: PlayerErrorAlertProps) {
  if (error === "notfound") {
    return (
      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm font-semibold text-red-700">
        ❌ هذا الكود غير موجود، تأكد من كتابته أو تواصل مع الكابتن أحمد سمرة.
      </div>
    );
  }

  if (error === "empty") {
    return (
      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center text-sm font-semibold text-amber-700">
        ⚠️ برجاء إدخال كود اللاعب أولاً.
      </div>
    );
  }

  return null;
}