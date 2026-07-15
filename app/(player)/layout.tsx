import "../globals.css";

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
      <body className="min-h-screen bg-slate-100">
        <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}