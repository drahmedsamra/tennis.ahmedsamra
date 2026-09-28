import Image from "next/image";
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
    <footer className="border-t border-white/10 bg-[#0b2118] text-white">
      <div className="marketing-shell py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.9fr_0.7fr] lg:gap-10">
          <div>
            <div className="flex items-center gap-3" dir="ltr">
              <span className="grid size-8 place-items-center border border-white/20 bg-white/5">
                <Image src="/images/icon.webp" alt="" width={20} height={20} />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.1em]">{brand}</p>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-7 text-white/65">{content.description}</p>
          </div>

          <nav aria-label={content.navigationLabel}>
            <h2 className="text-sm font-semibold text-white">{content.navigationTitle}</h2>
            <ul className="mt-5 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-[#a9d6aa]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-white">{content.contactTitle}</h2>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li><a href={contactInfo.phoneHref} className="transition-colors hover:text-[#a9d6aa]">{content.phoneLabel}: {contactInfo.phoneDisplay}</a></li>
              <li><a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#a9d6aa]">{content.whatsappLabel}: {contactInfo.whatsappDisplay}</a></li>
              <li><a href={contactInfo.emailHref} className="transition-colors hover:text-[#a9d6aa]">{content.emailLabel}: {contactInfo.email}</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">{content.socialTitle}</h2>
            <ul className="mt-5 space-y-3">
              {contactInfo.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} className="text-sm text-white/65 transition-colors hover:text-[#a9d6aa]">{social.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs text-white/45">&copy; {new Date().getFullYear()} {brand}. {content.rights}</p>
        </div>
      </div>
    </footer>
  );
}
