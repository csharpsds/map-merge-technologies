export type MegaLink = {
  label: string;
  href: string;
  description: string;
  preview: "map" | "api" | "migrate" | "secure" | "operate";
};

export type MegaColumn = {
  heading: string;
  links: MegaLink[];
};

export type MegaPanel = {
  id: string;
  label: string;
  href: string;
  columns: MegaColumn[];
  feature: {
    title: string;
    body: string;
    href: string;
    cta: string;
  };
};

export const megaNav: MegaPanel[] = [
  {
    id: "services",
    label: "Services",
    href: "/services",
    columns: [
      {
        heading: "Design and deliver",
        links: [
          {
            label: "MuleSoft Architecture",
            href: "/services/mulesoft-architecture",
            description: "API-led strategy, platform design, and reviews",
            preview: "map",
          },
          {
            label: "API Development",
            href: "/services/api-development",
            description: "RAML, Mule 4, DataWeave, and MUnit",
            preview: "api",
          },
          {
            label: "Enterprise Integration",
            href: "/services/enterprise-integration",
            description: "ERP, CRM, queues, files, and SaaS",
            preview: "map",
          },
          {
            label: "Migration",
            href: "/services/migration-modernization",
            description: "Mule 3, CloudHub 2.0, and Java 17",
            preview: "migrate",
          },
          {
            label: "DevOps and CI/CD",
            href: "/services/devops-cicd",
            description: "Pipelines, promotions, and rollback",
            preview: "operate",
          },
        ],
      },
      {
        heading: "Protect and operate",
        links: [
          {
            label: "Security and Governance",
            href: "/services/security-governance",
            description: "Identity, policies, and secrets",
            preview: "secure",
          },
          {
            label: "Managed Services",
            href: "/services/managed-services",
            description: "Monitoring, incidents, and upgrades",
            preview: "operate",
          },
          {
            label: "Testing and Quality",
            href: "/services/testing-quality",
            description: "MUnit, contracts, and readiness",
            preview: "api",
          },
          {
            label: "Training and Enablement",
            href: "/services/training-enablement",
            description: "Workshops, reviews, and mentoring",
            preview: "map",
          },
        ],
      },
    ],
    feature: {
      title: "See the full service map",
      body: "Nine service areas from architecture through production support.",
      href: "/services",
      cta: "View all services",
    },
  },
  {
    id: "solutions",
    label: "Solutions",
    href: "/solutions",
    columns: [
      {
        heading: "Outcomes",
        links: [
          {
            label: "Modern API foundation",
            href: "/solutions#modern-api-foundation",
            description: "Reusable system, process, and experience APIs",
            preview: "api",
          },
          {
            label: "Connect applications",
            href: "/solutions#connect-enterprise-applications",
            description: "ERP, CRM, and operational systems",
            preview: "map",
          },
          {
            label: "CloudHub 2.0 move",
            href: "/solutions#migrate-cloudhub-2",
            description: "Hosting, Java, and pipeline changes together",
            preview: "migrate",
          },
          {
            label: "Strengthen API security",
            href: "/solutions#strengthen-api-security",
            description: "Identity, throttling, and secrets",
            preview: "secure",
          },
        ],
      },
      {
        heading: "Capacity",
        links: [
          {
            label: "Scale a MuleSoft team",
            href: "/solutions#scale-mulesoft-team",
            description: "Augmentation or a dedicated squad",
            preview: "operate",
          },
          {
            label: "Managed production support",
            href: "/solutions#managed-production-support",
            description: "A durable owner after go-live",
            preview: "operate",
          },
          {
            label: "Automate delivery",
            href: "/solutions#automate-delivery",
            description: "Build, test, approve, and roll back",
            preview: "migrate",
          },
        ],
      },
    ],
    feature: {
      title: "Start from the outcome",
      body: "Each solution maps a business constraint to the services that usually follow.",
      href: "/solutions",
      cta: "Browse solutions",
    },
  },
  {
    id: "industries",
    label: "Industries",
    href: "/industries",
    columns: [
      {
        heading: "Operating landscapes",
        links: [
          {
            label: "Banking and Financial Services",
            href: "/industries#banking-financial-services",
            description: "Cores, channels, and reviewable controls",
            preview: "secure",
          },
          {
            label: "Government and Public Services",
            href: "/industries#government-public-services",
            description: "Case updates with private connectivity",
            preview: "secure",
          },
          {
            label: "Healthcare",
            href: "/industries#healthcare",
            description: "Clinical and administrative interfaces",
            preview: "map",
          },
          {
            label: "Retail and E-commerce",
            href: "/industries#retail-ecommerce",
            description: "Orders, inventory, and support sync",
            preview: "api",
          },
        ],
      },
      {
        heading: "Also covered",
        links: [
          {
            label: "Education and Publishing",
            href: "/industries#education-publishing",
            description: "Learner, content, and commerce records",
            preview: "map",
          },
          {
            label: "Telecommunications",
            href: "/industries#telecommunications",
            description: "Order-to-activate and partner APIs",
            preview: "operate",
          },
          {
            label: "Aviation and Travel",
            href: "/industries#aviation-travel",
            description: "Booking and disruption events",
            preview: "operate",
          },
          {
            label: "Construction and Property",
            href: "/industries#construction-property-technology",
            description: "Project, vendor, and purchase orders",
            preview: "migrate",
          },
        ],
      },
    ],
    feature: {
      title: "Patterns, not a client list",
      body: "Typical challenges and systems—without inventing published accounts.",
      href: "/industries",
      cta: "See industries",
    },
  },
  {
    id: "insights",
    label: "Insights",
    href: "/insights",
    columns: [
      {
        heading: "Read next",
        links: [
          {
            label: "Mule 3 to Mule 4 planning",
            href: "/insights/planning-mule-3-to-mule-4-migration",
            description: "Inventory, connectors, and sliced cutover",
            preview: "migrate",
          },
          {
            label: "CloudHub 2.0 readiness",
            href: "/insights/cloudhub-1-to-2-readiness",
            description: "Network, config, and rollback questions",
            preview: "migrate",
          },
          {
            label: "Reusable API-led design",
            href: "/insights/designing-reusable-api-led-integrations",
            description: "Keep layers useful after project one",
            preview: "api",
          },
          {
            label: "Securing enterprise APIs",
            href: "/insights/securing-enterprise-apis",
            description: "Identity, policies, and secrets order",
            preview: "secure",
          },
        ],
      },
      {
        heading: "Browse by topic",
        links: [
          {
            label: "Migration",
            href: "/insights?category=Migration",
            description: "Runtime, Java, and hosting moves",
            preview: "migrate",
          },
          {
            label: "CI/CD",
            href: "/insights?category=CI%2FCD",
            description: "Pipelines that people besides the author can run",
            preview: "operate",
          },
          {
            label: "API Security",
            href: "/insights?category=API%20Security",
            description: "Reviews that catch ordinary gaps",
            preview: "secure",
          },
        ],
      },
    ],
    feature: {
      title: "Practical notes, not slogans",
      body: "Longer articles on migration, APIs, testing, and operations.",
      href: "/insights",
      cta: "All insights",
    },
  },
  {
    id: "company",
    label: "Company",
    href: "/about",
    columns: [
      {
        heading: "Map & Merge",
        links: [
          {
            label: "About us",
            href: "/about",
            description: "Mission, values, and how we work",
            preview: "map",
          },
          {
            label: "Case studies",
            href: "/case-studies",
            description: "Anonymized delivery examples",
            preview: "operate",
          },
          {
            label: "Contact",
            href: "/contact",
            description: "Describe the landscape and the constraint",
            preview: "api",
          },
        ],
      },
    ],
    feature: {
      title: "Talk to an integration expert",
      body: "Architecture, migration, capacity, or support—start with a consultation.",
      href: "/contact",
      cta: "Book a free consultation",
    },
  },
];
