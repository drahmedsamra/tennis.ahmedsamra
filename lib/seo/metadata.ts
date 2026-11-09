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
  const { title, description, keywords } = dictionary.metadata;
  const canonicalPath = localizedPath(locale, pathname);
  const canonicalUrl = absoluteUrl(canonicalPath);

  const languageAlternates = Object.fromEntries(
    locales.map((loc) => [loc, absoluteUrl(localizedPath(loc, pathname))]),
  );

  const googleVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    process.env.GOOGLE_SITE_VERIFICATION ||
    undefined;

  const ogImage = absoluteUrl("/images/hero/ahmed-samra-hero2.webp");

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Ahmed Samra", url: canonicalUrl }],
    creator: "Ahmed Samra",
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    verification: googleVerification
      ? {
          google: googleVerification,
        }
      : undefined,
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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.creator,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
