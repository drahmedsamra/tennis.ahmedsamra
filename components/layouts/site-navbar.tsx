"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/navigation";
import type { MarketingNavLink } from "@/config/navigation";
import { cn } from "@/lib/utils";

type SiteNavbarProps = {
  brand: string;
  links: MarketingNavLink[];
  locale: Locale;
};

export function SiteNavbar({ brand, links, locale }: SiteNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const arabicPath = localizedPath("ar", pathname);
  const englishPath = localizedPath("en", pathname);

  function handleLanguageSwitch(
    event: React.MouseEvent<HTMLAnchorElement>,
    nextLocale: Locale,
  ) {
    setMobileOpen(false);

    const hash = window.location.hash;

    if (!hash) {
      return;
    }

    event.preventDefault();
    window.location.href = `${localizedPath(nextLocale, pathname)}${hash}`;
  }

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 lg:h-16 lg:px-8"
      >
        <Link
          href={localizedPath(locale)}
          dir="ltr"
          className="text-[0.8125rem] font-semibold tracking-[0.12em] text-foreground uppercase"
        >
          {brand}
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.8125rem] font-medium tracking-wide text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <nav
            aria-label="Language switcher"
            className="flex items-center gap-2 text-[0.75rem] font-medium text-muted-foreground"
            dir="ltr"
          >
            <a
              href={arabicPath}
              hrefLang="ar"
              aria-current={locale === "ar" ? "true" : undefined}
              className={cn(
                "transition-colors hover:text-primary",
                locale === "ar" && "text-foreground",
              )}
              onClick={(event) => handleLanguageSwitch(event, "ar")}
            >
              العربية
            </a>
            <span aria-hidden className="text-border">
              |
            </span>
            <a
              href={englishPath}
              hrefLang="en"
              aria-current={locale === "en" ? "true" : undefined}
              className={cn(
                "transition-colors hover:text-primary",
                locale === "en" && "text-foreground",
              )}
              onClick={(event) => handleLanguageSwitch(event, "en")}
            >
              English
            </a>
          </nav>
        </div>

        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X className="size-5" aria-hidden />
          ) : (
            <Menu className="size-5" aria-hidden />
          )}
        </button>
      </nav>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <div className="mx-auto max-w-6xl px-6 py-2 lg:px-8">
          <nav
            aria-label="Language switcher"
            className="flex items-center gap-2 border-b border-border/40 py-4 text-[0.75rem] font-medium text-muted-foreground"
            dir="ltr"
          >
            <a
              href={arabicPath}
              hrefLang="ar"
              aria-current={locale === "ar" ? "true" : undefined}
              className={cn(
                "transition-colors hover:text-primary",
                locale === "ar" && "text-foreground",
              )}
              onClick={(event) => handleLanguageSwitch(event, "ar")}
            >
              العربية
            </a>
            <span aria-hidden className="text-border">
              |
            </span>
            <a
              href={englishPath}
              hrefLang="en"
              aria-current={locale === "en" ? "true" : undefined}
              className={cn(
                "transition-colors hover:text-primary",
                locale === "en" && "text-foreground",
              )}
              onClick={(event) => handleLanguageSwitch(event, "en")}
            >
              English
            </a>
          </nav>

          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block border-b border-border/40 py-4 text-[0.8125rem] font-medium tracking-wide text-muted-foreground transition-colors duration-200 last:border-b-0 hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
