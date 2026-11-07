import type { Dictionary } from "@/lib/i18n/get-dictionary";

export type MarketingNavLink = {
  label: string;
  href: string;
};

export function getMarketingNavLinks(
  dictionary: Dictionary,
): MarketingNavLink[] {
  const { links } = dictionary.nav;

  return [
    { label: links.about, href: "#about" },
    { label: links.pricing, href: "#pricing" },
    { label: links.services, href: "#services" },
    { label: links.playerPortal, href: "#player-portal" },
    { label: links.contact, href: "#contact" },
  ];
}
