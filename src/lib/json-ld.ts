import { siteConfig } from "@/content/site-config";
import { absoluteUrl } from "@/lib/metadata";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl(siteConfig.brand.logo),
    image: absoluteUrl(siteConfig.brand.icon),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    areaServed: [
      "Philippines",
      "Asia-Pacific",
      "Australia",
      "New Zealand",
      "Europe",
      "North America",
    ],
    knowsAbout: [
      "MuleSoft",
      "API integration",
      "Anypoint Platform",
      "CloudHub",
      "Enterprise integration",
    ],
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    ...(siteConfig.social.linkedin
      ? { sameAs: [siteConfig.social.linkedin] }
      : {}),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.url),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    areaServed: siteConfig.country,
    serviceType: "MuleSoft and API integration consulting",
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  url: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.date,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.brand.logo),
      },
    },
    mainEntityOfPage: absoluteUrl(input.url),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
