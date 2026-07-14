export const siteConfig = {
  name: "Ahmed Samra Tennis",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  creator: "@ahmedsamratennis",
} as const;

export type SiteConfig = typeof siteConfig;
