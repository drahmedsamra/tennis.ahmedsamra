import { Cairo, Inter } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  preload: true,
});

export function getLocaleFontClass(locale: "ar" | "en"): string {
  return locale === "ar" ? cairo.variable : inter.variable;
}
