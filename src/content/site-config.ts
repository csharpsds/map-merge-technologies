export type NavItem = {
  label: string;
  href: string;
};

export type ExperienceStat = {
  id: string;
  value: string;
  label: string;
};

export type ContactDetails = {
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  country: string;
};

function envValue(key: string): string {
  return (process.env[key] ?? "").trim();
}

export const siteConfig = {
  name: "Map & Merge Technologies",
  shortName: "Map & Merge",
  legalName: "Map & Merge Technologies",
  tagline: "Transforming Data. Connecting Systems.",
  description:
    "Map & Merge Technologies is a Philippines-based integration consulting company specializing in MuleSoft, APIs, system connectivity, and integration modernization.",
  locationLabel: "Philippines-based global delivery",
  country: "Philippines",
  url: envValue("NEXT_PUBLIC_SITE_URL") || "http://127.0.0.1:43127",
  locale: "en",
  brand: {
    logo: "/brand/map-merge-logo.png",
    icon: "/brand/map-merge-icon.png",
  },
  contact: {
    email: envValue("NEXT_PUBLIC_CONTACT_EMAIL"),
    phone: envValue("NEXT_PUBLIC_CONTACT_PHONE"),
    streetAddress: envValue("NEXT_PUBLIC_CONTACT_STREET"),
    city: envValue("NEXT_PUBLIC_CONTACT_CITY"),
    country: "Philippines",
  } satisfies ContactDetails,
  social: {
    linkedin: envValue("NEXT_PUBLIC_LINKEDIN_URL"),
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  footerServices: [
    { label: "MuleSoft Architecture", href: "/services/mulesoft-architecture" },
    { label: "API Development", href: "/services/api-development" },
    { label: "Migration", href: "/services/migration-modernization" },
    { label: "Enterprise Integration", href: "/services/enterprise-integration" },
    { label: "DevOps and CI/CD", href: "/services/devops-cicd" },
    { label: "Managed Services", href: "/services/managed-services" },
  ] satisfies NavItem[],
  footerCompany: [
    { label: "About Us", href: "/about" },
    { label: "Industries", href: "/industries" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Solutions", href: "/solutions" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  footerInsights: [
    { label: "All Insights", href: "/insights" },
    { label: "Migration", href: "/insights?category=Migration" },
    { label: "CloudHub 2.0", href: "/insights?category=CloudHub%202.0" },
    { label: "API Security", href: "/insights?category=API%20Security" },
  ] satisfies NavItem[],
  stats: [
    { id: "mulesoft-experience", value: "9+", label: "Years of MuleSoft Experience" },
    { id: "technology-experience", value: "10+", label: "Years in Technology and Integration" },
    { id: "global-delivery", value: "Global", label: "Delivery Experience" },
    { id: "industries", value: "Multiple", label: "Industries Supported" },
  ] satisfies ExperienceStat[],
  trustStatements: [
    "MuleSoft Specialists",
    "Philippines-Based Global Delivery",
    "Flexible Engagement Models",
    "End-to-End Integration Support",
  ],
  cta: {
    bookConsultation: "Book a Free Consultation",
    talkToExpert: "Talk to an Integration Expert",
    exploreServices: "Explore Our Services",
    requestMigration: "Request a Migration Assessment",
    contactCompany: "Contact Map & Merge",
    discussGoals: "Let’s Discuss Your Integration Goals.",
  },
  hero: {
    headline: "Transforming Data. Connecting Systems.",
    supporting:
      "Map & Merge Technologies helps organizations design, build, modernize, and support secure, scalable integration solutions using MuleSoft and modern API technologies.",
  },
  challengesHeading:
    "Integration Should Accelerate Your Business—Not Hold It Back.",
  challenges: [
    "Growing integration backlogs",
    "Disconnected applications and data",
    "Legacy Mule 3 applications",
    "CloudHub modernization requirements",
    "Unreliable point-to-point integrations",
    "Limited MuleSoft resources",
    "Manual deployment processes",
    "Production performance issues",
  ],
  solutions: [
    "Experienced MuleSoft professionals",
    "Reusable API-led architecture",
    "Migration and modernization expertise",
    "Automated deployment pipelines",
    "Flexible delivery capacity",
    "Production monitoring and support",
    "Secure integration standards",
    "Clear technical documentation",
  ],
  globalDelivery: {
    heading: "Global Integration Expertise from the Philippines.",
    body: "Map & Merge Technologies provides experienced integration professionals from the Philippines, with flexible collaboration options for organizations in Asia-Pacific, Australia, New Zealand, Europe, and North America.",
    highlights: [
      "Strong English communication",
      "Flexible timezone coverage",
      "Remote delivery experience",
      "International consulting experience",
      "Clear technical documentation",
      "Direct access to technical experts",
      "Cost-efficient delivery options",
    ],
  },
  why: {
    heading: "Deep MuleSoft Expertise. Practical Delivery. Clear Communication.",
    reasons: [
      "MuleSoft-focused technical expertise",
      "Architecture and hands-on development capability",
      "Migration and modernization experience",
      "API security and governance knowledge",
      "Strong testing and delivery standards",
      "Flexible engagement models",
      "Direct access to senior technical leadership",
      "Philippines-based global delivery",
      "Documentation and knowledge transfer",
      "Maintainable, reusable solutions",
    ],
  },
  finalCta: {
    heading: "Ready to Connect Your Systems?",
    body: "Tell us about your integration challenge, delivery backlog, modernization initiative, or support requirement. We'll help you identify the right approach.",
  },
  about: {
    introduction:
      "Map & Merge Technologies is a Philippines-based integration consulting company specializing in MuleSoft, APIs, system connectivity, and integration modernization. We help organizations simplify complex system landscapes and create secure, reusable connections between applications, data, and business processes.",
    mission:
      "To help organizations connect systems, modernize integrations, and move data securely through reliable and thoughtfully designed technology solutions.",
    vision:
      "To become a trusted global integration partner known for technical excellence, practical solutions, and long-term customer relationships.",
    promise:
      "We map the complexity, merge the technology, and create integrations that move businesses forward.",
    values: [
      {
        title: "Technical Excellence",
        description:
          "We treat architecture, code quality, and platform knowledge as everyday delivery standards—not optional extras.",
      },
      {
        title: "Reliability",
        description:
          "Integrations only create value when they stay dependable in production. We design for operations, not just demos.",
      },
      {
        title: "Transparency",
        description:
          "Customers should always know what we are building, why we chose an approach, and what risk remains.",
      },
      {
        title: "Customer Partnership",
        description:
          "We work as an extension of your team, aligned to your processes, security expectations, and delivery cadence.",
      },
      {
        title: "Continuous Improvement",
        description:
          "Platforms, runtimes, and business processes change. We keep integrations maintainable so they can change with them.",
      },
      {
        title: "Knowledge Sharing",
        description:
          "We document decisions, transfer ownership, and leave teams stronger than we found them.",
      },
    ],
  },
  legalDisclaimer:
    "MuleSoft, Anypoint Platform, Salesforce, and related marks are trademarks of their respective owners. Map & Merge Technologies is not represented as an official partner unless explicitly stated.",
  keywords: [
    "MuleSoft consulting Philippines",
    "MuleSoft developer Philippines",
    "MuleSoft integration services",
    "MuleSoft architecture",
    "Mule 3 to Mule 4 migration",
    "CloudHub 2.0 migration",
    "MuleSoft managed services",
    "MuleSoft API development",
    "MuleSoft staff augmentation",
    "API integration consulting",
  ],
  inquiryCategories: [
    "Free Consultation",
    "MuleSoft Architecture",
    "API Development",
    "MuleSoft Migration",
    "CloudHub 2.0 Migration",
    "Staff Augmentation",
    "Dedicated Team",
    "Managed Support",
    "Training",
    "Other",
  ],
  budgetRanges: [
    "Not sure yet",
    "Under USD 25,000",
    "USD 25,000 – 75,000",
    "USD 75,000 – 150,000",
    "USD 150,000+",
    "Monthly retainer / staffing",
  ],
  ecosystem: [
    "Salesforce",
    "SAP",
    "Workday",
    "Microsoft Dynamics",
    "Microsoft Dynamics GP",
    "IBM MQ",
    "Apache Kafka",
    "Amazon SQS",
    "Databases",
    "ERP platforms",
    "CRM platforms",
    "E-commerce platforms",
    "SaaS applications",
    "Legacy systems",
    "REST and SOAP services",
    "SFTP and file integrations",
  ],
  migrationSpotlight: [
    "Mule 3 to Mule 4 migration",
    "CloudHub 1.0 to CloudHub 2.0 migration",
    "Java 8 to Java 17 modernization",
    "Runtime and connector upgrades",
    "Runtime Fabric",
    "Private Spaces",
    "Application compatibility assessment",
    "Post-migration optimization",
  ],
} as const;

export function configuredContactEntries() {
  const entries: { label: string; value: string; href?: string }[] = [];
  if (siteConfig.contact.email) {
    entries.push({
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    });
  }
  if (siteConfig.contact.phone) {
    entries.push({
      label: "Phone",
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone}`,
    });
  }
  const address = [siteConfig.contact.streetAddress, siteConfig.contact.city]
    .filter(Boolean)
    .join(", ");
  if (address) {
    entries.push({ label: "Address", value: address });
  }
  return entries;
}

export function hasPublicContactDetails() {
  return configuredContactEntries().length > 0;
}
