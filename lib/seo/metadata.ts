import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import { absoluteUrl, localizedPath } from "@/lib/i18n/navigation";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type PageMetadataOptions = {
  locale: Locale;
  dictionary: Dictionary;
  pathname?: string;
};

export function createPageMetadata({
  locale,
  dictionary,
  pathname = "",
}: PageMetadataOptions): Metadata {
  const { title, description } = dictionary.metadata;
  const canonicalPath = localizedPath(locale, pathname);
  const canonicalUrl = absoluteUrl(canonicalPath);

  const languageAlternates = Object.fromEntries(
    locales.map((loc) => [loc, absoluteUrl(localizedPath(loc, pathname))]),
  );

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locales
        .filter((loc) => loc !== locale)
        .map((loc) => (loc === "ar" ? "ar_EG" : "en_US")),
      url: canonicalUrl,
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.creator,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
