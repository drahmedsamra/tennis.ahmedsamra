import "../globals.css";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

import { localeDirections } from "@/lib/i18n/config";
import { getLocaleFontClass } from "@/lib/fonts";

type PlayerLayoutProps = {
  children: React.ReactNode;
};

export default function PlayerLayout({
  children,
}: PlayerLayoutProps) {
  const locale = "ar";

  return (
    <html
      lang={locale}
      dir={localeDirections[locale]}
      data-locale={locale}
      className={`${getLocaleFontClass(
        locale
      )} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-green-50">

        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/60">

          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 transition-opacity hover:opacity-90"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 shadow-sm">

                {/* إذا عندك صورة الكرة سيب السطرين دول */}
                <Image
                  src="/images/icon.webp"
                  alt="Ahmed Samra Tennis"
                  width={28}
                  height={28}
                  priority
                />

              </div>

              <div className="leading-tight">

                <h1 className="text-base font-bold tracking-tight text-slate-900">
                  Ahmed Samra Tennis
                </h1>

                <p className="text-xs text-slate-500">
                  Player Reports Portal
                </p>

              </div>

            </Link>

            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:shadow-xl"
            >
              <Home className="h-4 w-4" />

              الصفحة الرئيسية

              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

          {/* Accent Line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        </header>

        {/* Main */}
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>

      </body>
    </html>
  );
}