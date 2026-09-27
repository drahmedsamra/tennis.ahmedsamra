import "../globals.css";

import { localeDirections } from "@/lib/i18n/config";
import { getLocaleFontClass } from "@/lib/fonts";

import Sidebar from "@/components/coach/Sidebar";
import MobileNav from "@/components/coach/MobileNav";

type CoachLayoutProps = {
  children: React.ReactNode;
};

export default function CoachLayout({
  children,
}: CoachLayoutProps) {
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
      <body className="min-h-full bg-slate-100">
        <div className="min-h-screen lg:flex">
          <div className="hidden lg:sticky lg:top-0 lg:block lg:h-screen lg:self-start">
            <Sidebar />
          </div>

          <main className="flex-1 px-3 py-4 pb-24 sm:px-6 sm:py-6 lg:p-8 lg:pb-8">
            {children}
          </main>
        </div>

        <MobileNav />
      </body>
    </html>
  );
}
