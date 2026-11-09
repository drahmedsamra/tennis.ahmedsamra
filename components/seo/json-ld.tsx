import type { Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/config/site";
import { contactInfo } from "@/config/contact";

type JsonLdProps = {
  locale: Locale;
};

export function JsonLd({ locale }: JsonLdProps) {
  const isAr = locale === "ar";

  const sportsClubSchema = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    "@id": `${siteConfig.url}/#sportsclub`,
    name: isAr
      ? "كابتن أحمد سمرة | أكاديمية وتدريب التنس"
      : "Coach Ahmed Samra | Tennis Academy & Coaching",
    alternateName: [
      "Ahmed Samra Tennis",
      "أكاديمية أحمد سمرة للتنس",
      "كابتن أحمد سمرة مدرب تنس",
      "تدريب تنس القاهرة",
      "مدرب تنس في القاهرة",
    ],
    description: isAr
      ? "أكاديمية تدريب تنس أرضي احترافي وحصص فردية (برايفت) في القاهرة بإشراف الكابتن أحمد سمرة. بناء الأساس الفني، تصحيح التكنيك، وتأهيل لبطولات وتصنيف الاتحاد المصري للتنس."
      : "Professional tennis academy in Cairo offering private coaching, biomechanics correction, and tournament preparation under Coach Ahmed Samra.",
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo/logo-icon.webp`,
    image: `${siteConfig.url}/images/hero/ahmed-samra-hero2.webp`,
    telephone: contactInfo.phoneDisplay,
    email: contactInfo.email,
    priceRange: "300 - 9000 EGP",
    address: {
      "@type": "PostalAddress",
      addressLocality: isAr ? "القاهرة" : "Cairo",
      addressRegion: isAr ? "القاهرة" : "Cairo",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0444,
      longitude: 31.2357,
    },
    sport: "Tennis",
    coach: {
      "@type": "Person",
      name: "Ahmed Samra",
      alternateName: "أحمد سمرة",
      jobTitle: isAr ? "كبير مدربي التنس ومطور الأداء الفني" : "Head Tennis Coach & Performance Specialist",
      description: isAr
        ? "مدرب تنس متخصص في بناء الأساس الفني للناشئين وتأهيل اللاعبين لبطولات الجمهورية وتصنيف الاتحاد."
        : "Certified tennis coach specializing in technical biomechanics, ranking elevation, and competition readiness.",
      image: `${siteConfig.url}/images/hero/ahmed-samra-hero2.webp`,
      url: siteConfig.url,
      sameAs: [contactInfo.instagramHref],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "48",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isAr ? "باقات تدريب التنس" : "Tennis Coaching Programs",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isAr ? "تقييم المستوى الفني" : "Assessment Session",
          },
          price: "1000",
          priceCurrency: "EGP",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isAr ? "حصة فردية (برايفت)" : "Private Coaching Session",
          },
          price: "1200",
          priceCurrency: "EGP",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isAr ? "اشتراك الأكاديمي الشامل" : "Academy Membership",
          },
          price: "9000",
          priceCurrency: "EGP",
        },
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isAr ? "الرئيسية" : "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isAr ? "باقات التدريب والأسعار" : "Pricing & Plans",
        item: `${siteConfig.url}/#pricing`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: isAr ? "خدمات التنس وتصحيح التكنيك" : "Services & Technique Correction",
        item: `${siteConfig.url}/#services`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: isAr ? "بوابة اللاعب" : "Player Portal",
        item: `${siteConfig.url}/#player-portal`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsClubSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

