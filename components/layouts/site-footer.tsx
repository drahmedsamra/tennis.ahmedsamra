import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { contactInfo } from "@/config/contact";
import { BrandLogo } from "@/components/common/brand-logo";
import type { MarketingNavLink } from "@/config/navigation";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type SiteFooterProps = {
  brand: string;
  content: Dictionary["footer"];
  links: MarketingNavLink[];
};

function InstagramIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YouTubeIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" />
    </svg>
  );
}

const socialIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YouTubeIcon,
};

export function SiteFooter({ brand, content, links }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#0b2118] text-white">
      <div className="marketing-shell py-6 sm:py-8">
        {/* Main row: Brand, Nav links, Contact & Social icons */}
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:gap-8">
          {/* Brand */}
          <BrandLogo variant="dark" size="md" subtitle="Tennis Academy" />

          {/* Navigation Links - Horizontal */}
          <nav aria-label={content.navigationLabel}>
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm font-medium">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 transition-colors hover:text-[#a9d6aa]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & Social Links - Compact Horizontal Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Phone */}
            <a
              href={contactInfo.phoneHref}
              aria-label={`${content.phoneLabel}: ${contactInfo.phoneDisplay}`}
              title={`${content.phoneLabel}: ${contactInfo.phoneDisplay}`}
              className="inline-flex size-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-colors hover:border-[#a9d6aa] hover:bg-[#a9d6aa]/10 hover:text-[#a9d6aa]"
            >
              <Phone className="size-3.5" aria-hidden="true" />
            </a>

            {/* WhatsApp */}
            <a
              href={contactInfo.whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`${content.whatsappLabel}: ${contactInfo.whatsappDisplay}`}
              title={`${content.whatsappLabel}: ${contactInfo.whatsappDisplay}`}
              className="inline-flex size-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-colors hover:border-[#a9d6aa] hover:bg-[#a9d6aa]/10 hover:text-[#a9d6aa]"
            >
              <MessageCircle className="size-3.5" aria-hidden="true" />
            </a>

            {/* Email */}
            <a
              href={contactInfo.emailHref}
              aria-label={`${content.emailLabel}: ${contactInfo.email}`}
              title={`${content.emailLabel}: ${contactInfo.email}`}
              className="inline-flex size-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-colors hover:border-[#a9d6aa] hover:bg-[#a9d6aa]/10 hover:text-[#a9d6aa]"
            >
              <Mail className="size-3.5" aria-hidden="true" />
            </a>

            <span className="mx-1 h-3.5 w-px bg-white/15" aria-hidden="true" />

            {/* Socials */}
            {contactInfo.socials.map((social) => {
              const Icon = socialIcons[social.label];

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={
                    social.href.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    social.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex size-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-colors hover:border-[#a9d6aa] hover:bg-[#a9d6aa]/10 hover:text-[#a9d6aa]"
                >
                  {Icon ? (
                    <Icon className="size-3.5" />
                  ) : (
                    <span className="text-[10px] font-semibold">
                      {social.label.slice(0, 2)}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom bar - slim */}
        <div className="mt-5 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-[11px] text-white/45 sm:flex-row">
          <p>{content.description}</p>
          <p>
            &copy; {new Date().getFullYear()} {brand}. {content.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
