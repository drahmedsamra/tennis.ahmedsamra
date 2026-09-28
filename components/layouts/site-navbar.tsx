"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpLeft, Menu, X } from "lucide-react";

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
  const [activeHref, setActiveHref] = useState("");
  const pathname = usePathname();
  const arabicPath = localizedPath("ar", pathname);
  const englishPath = localizedPath("en", pathname);
  const primaryLink = useMemo(
    () => links.find((link) => link.href === "#contact"),
    [links],
  );
  const navigationLinks = useMemo(
    () => links.filter((link) => link.href !== "#contact"),
    [links],
  );

  useEffect(() => {
    const updateFromHash = () => setActiveHref(window.location.hash);
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-38% 0px -54% 0px" },
    );

    updateFromHash();
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", updateFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, [links]);

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

  function handleSectionClick(href: string) {
    setActiveHref(href);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95">
      <nav
        aria-label="Main navigation"
        className="marketing-shell flex h-16 items-center justify-between lg:h-[4.5rem]"
      >
        <Link
          href={localizedPath(locale)}
          dir="ltr"
          className="flex items-center gap-3 text-foreground"
        >
          <span className="grid size-8 place-items-center border border-primary/25 bg-primary/5">
            <Image
              src="/images/icon.webp"
              alt=""
              width={20}
              height={20}
            />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.1em]">
            {brand}
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-6 xl:gap-8">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "border-b-2 border-transparent py-2 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground",
                    activeHref === link.href && "border-primary text-foreground",
                  )}
                  onClick={() => handleSectionClick(link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <nav
            aria-label="Language switcher"
            className="flex items-center gap-2 border-s border-border ps-6 text-xs font-medium text-muted-foreground"
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

          {primaryLink ? (
            <Link
              href={primaryLink.href}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              onClick={() => handleSectionClick(primaryLink.href)}
            >
              {primaryLink.label}
              <ArrowUpLeft
                className={`size-3.5 ${locale === "ar" ? "rotate-180" : ""}`}
                aria-hidden
              />
            </Link>
          ) : null}
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted lg:hidden"
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
          "border-t border-border/80 bg-background lg:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <div className="marketing-shell py-2">
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
                  className={cn(
                    "block border-b border-border/60 py-4 text-sm font-medium text-muted-foreground transition-colors last:border-b-0 hover:text-foreground",
                    activeHref === link.href && "text-primary",
                  )}
                  onClick={() => handleSectionClick(link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {primaryLink ? (
            <Link
              href={primaryLink.href}
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground"
              onClick={() => handleSectionClick(primaryLink.href)}
            >
              {primaryLink.label}
              <ArrowUpLeft
                className={`size-4 ${locale === "ar" ? "rotate-180" : ""}`}
                aria-hidden
              />
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
