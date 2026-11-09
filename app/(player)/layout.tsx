import "../globals.css";

import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

import { BrandLogo } from "@/components/common/brand-logo";

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
              className="group transition-opacity hover:opacity-90"
            >
              <BrandLogo
                variant="light"
                size="md"
                subtitle="Player Reports Portal"
              />
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

          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </header>

        {/* Main */}
        <main className="mx-auto w-full max-w-7xl px-0 py-6 sm:px-4 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}