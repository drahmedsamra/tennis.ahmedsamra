export const siteConfig = {
  name: "Ahmed Samra Tennis",
  url:
    process.env.NEXT_PUBLIC_SITE_URL &&
    !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost")
      ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
      : "https://tennis.ahmedsamra.com",
  creator: "@ahmedsamratennis",
} as const;

export type SiteConfig = typeof siteConfig;
