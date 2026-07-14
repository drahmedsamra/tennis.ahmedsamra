import "../../globals.css";

import { localeDirections } from "@/lib/i18n/config";
import { getLocaleFontClass } from "@/lib/fonts";

type EnglishLayoutProps = {
  children: React.ReactNode;
};

export default function EnglishLayout({ children }: EnglishLayoutProps) {
  const locale = "en";

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
