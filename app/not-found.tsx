import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-2xl font-semibold">404</h1>
        <Link
          href="/"
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          العودة للرئيسية
        </Link>
      </body>
    </html>
  );
}
