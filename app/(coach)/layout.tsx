import "../globals.css";

import { localeDirections } from "@/lib/i18n/config";
import { getLocaleFontClass } from "@/lib/fonts";

import Sidebar from "@/components/coach/Sidebar";

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

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-10">
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}