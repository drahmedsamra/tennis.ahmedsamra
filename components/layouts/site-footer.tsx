import Link from "next/link";

import { contactInfo } from "@/config/contact";
import type { MarketingNavLink } from "@/config/navigation";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type SiteFooterProps = {
  brand: string;
  content: Dictionary["footer"];
  links: MarketingNavLink[];
};

export function SiteFooter({ brand, content, links }: SiteFooterProps) {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.9fr_0.8fr] lg:gap-12">
          <div>
            <p
              dir="ltr"
              className="text-[0.8125rem] font-semibold tracking-[0.12em] text-foreground uppercase"
            >
              {brand}
            </p>
            <p className="mt-6 max-w-xs text-sm leading-7 text-muted-foreground">
              {content.description}
            </p>
          </div>

          <nav aria-label={content.navigationLabel}>
            <h2 className="text-sm font-semibold text-foreground">
              {content.navigationTitle}
            </h2>
            <ul className="mt-6 flex flex-col gap-4">
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
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-foreground">
              {content.contactTitle}
            </h2>
            <ul className="mt-6 flex flex-col gap-4">
              <li>
                <a
                  href={contactInfo.phoneHref}
                  className="text-[0.8125rem] font-medium tracking-wide text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {content.phoneLabel}: {contactInfo.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.8125rem] font-medium tracking-wide text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {content.whatsappLabel}: {contactInfo.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.emailHref}
                  className="text-[0.8125rem] font-medium tracking-wide text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {content.emailLabel}: {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-foreground">
              {content.socialTitle}
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {contactInfo.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-background text-[0.6875rem] font-semibold text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:text-primary"
                  >
                    {social.label.slice(0, 1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-border/60 pt-8">
          <p className="text-[0.6875rem] tracking-wide text-muted-foreground">
            &copy; {new Date().getFullYear()} {brand}. {content.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
