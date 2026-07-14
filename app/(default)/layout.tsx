import "../globals.css";

import { localeDirections } from "@/lib/i18n/config";
import { getLocaleFontClass } from "@/lib/fonts";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const locale = "ar";

  return (
    <html
      lang={locale}
      dir={localeDirections[locale]}
      data-locale={locale}
      className={`${getLocaleFontClass(locale)} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
