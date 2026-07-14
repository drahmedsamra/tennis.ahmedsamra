import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n/config";
import { absoluteUrl, localizedPath } from "@/lib/i18n/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: absoluteUrl(localizedPath(locale)),
    lastModified,
    changeFrequency: "weekly",
    priority: locale === "ar" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((loc) => [loc, absoluteUrl(localizedPath(loc))]),
      ),
    },
  }));
}
