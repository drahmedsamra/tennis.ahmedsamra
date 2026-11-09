import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n/config";

export function localizedPath(locale: Locale, pathname = ""): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const unprefixedPath = normalizedPath.replace(/^\/(?:ar|en)(?=\/|$)/, "");
  const path = unprefixedPath === "" ? "/" : unprefixedPath;

  if (locale === "ar") {
    return path;
  }

  return path === "/" ? "/en" : `/en${path}`;
}

export function absoluteUrl(path: string): string {
  const baseUrl = siteConfig.url;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
