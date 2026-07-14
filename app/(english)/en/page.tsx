import type { Metadata } from "next";

import { HomePage } from "@/components/layouts/home-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createPageMetadata } from "@/lib/seo/metadata";

const locale = "en";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary(locale);

  return createPageMetadata({ locale, dictionary });
}

export default async function Page() {
  const dictionary = await getDictionary(locale);

  return <HomePage dictionary={dictionary} locale={locale} />;
}
