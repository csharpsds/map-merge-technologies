export type Industry = {
  slug: string;
  title: string;
  summary: string;
  featured: boolean;
  challenges: string[];
  systems: string[];
  approach: string;
  outcomes: string[];
  services: string[];
  relatedCaseStudy?: string;
};

export const industries: Industry[] = [
  {
    slug: "banking-financial-services",
    title: "Banking and Financial Services",
    summary:
      "Connect core, channels, and partner platforms with controls that operations and risk teams can review.",
    featured: true,
    challenges: [
      "Channel applications needing consistent customer and product data",
      "Partner and payment interfaces with strict availability expectations",
      "Legacy cores that cannot be exposed directly",
      "Audit requirements for every change to a financial flow",
    ],
    systems: [
      "Core banking platforms",
      "CRM",
      "Payment and messaging rails",
      "Data warehouses",
      "Partner APIs",
    ],
    approach:
      "We isolate cores behind system APIs, apply security policies early, and design monitoring that shows when a financial interface is delayed or failing.",
    outcomes: [
      "Reusable customer and product APIs for new channels",
      "Clearer operational ownership of each interface",
      "Change paths that can be tested and reviewed",
    ],
    services: ["mulesoft-architecture", "security-governance", "api-development"],
    relatedCaseStudy: "enterprise-cloudhub-modernization",
  },
  {
    slug: "government-public-services",
    title: "Government and Public Services",
    summary:
      "Move case and constituent data across agencies without weakening security or auditability.",
    featured: true,
    challenges: [
      "Case updates that must stay consistent across several systems",
      "Private networking and mutual TLS requirements",
      "Uneven API maturity between agencies and vendors",
      "Need for monitoring and dead-letter handling on sensitive flows",
    ],
    systems: [
      "Case-management platforms",
      "Salesforce",
      "Document and identity systems",
      "Message queues",
      "Legacy registries",
    ],
    approach:
      "We use API-led design with explicit security controls, private connectivity where required, and operational handling for messages that cannot be lost.",
    outcomes: [
      "Case data that stays aligned across participating systems",
      "Security controls that match the sensitivity of the data",
      "Visible failure paths instead of silent drops",
    ],
    services: [
      "enterprise-integration",
      "security-governance",
      "mulesoft-architecture",
    ],
    relatedCaseStudy: "government-case-lifecycle-integration",
  },
  {
    slug: "education-publishing",
    title: "Education and Publishing",
    summary:
      "Synchronize learner, content, and commercial systems so staff are not re-entering the same records.",
    featured: true,
    challenges: [
      "Student or subscriber records split across multiple products",
      "Content and commerce platforms that do not share events",
      "Seasonal volume around enrollments or releases",
      "Partner and campus systems with uneven interfaces",
    ],
    systems: [
      "Student or subscriber information systems",
      "CRM",
      "Learning or content platforms",
      "E-commerce",
      "File-based vendor feeds",
    ],
    approach:
      "We identify the records that must stay aligned, then implement scheduled or event-driven integrations with validation before downstream systems accept the data.",
    outcomes: [
      "Fewer duplicated learner or subscriber records",
      "More predictable hand-offs between content and commerce",
      "Interfaces that can absorb seasonal peaks",
    ],
    services: ["enterprise-integration", "api-development", "managed-services"],
    relatedCaseStudy: "customer-support-synchronization",
  },
  {
    slug: "telecommunications",
    title: "Telecommunications",
    summary:
      "Keep order, service, and partner processes moving across a landscape that already has many interfaces.",
    featured: true,
    challenges: [
      "Order-to-activate journeys that span several platforms",
      "High-volume events and messaging",
      "Partner APIs with strict contracts",
      "Legacy OSS/BSS connections that still matter",
    ],
    systems: [
      "CRM",
      "Billing and product catalogs",
      "Messaging platforms",
      "Partner gateways",
      "Legacy service platforms",
    ],
    approach:
      "We stabilize the journeys that generate the most exceptions, then introduce reusable APIs and operational monitoring around the busiest events.",
    outcomes: [
      "Clearer order and service status across systems",
      "Better handling of partner and volume failures",
      "Less custom work for each new channel",
    ],
    services: ["api-development", "enterprise-integration", "devops-cicd"],
    relatedCaseStudy: "customer-support-synchronization",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    summary:
      "Connect clinical, administrative, and partner systems with careful handling of sensitive data.",
    featured: true,
    challenges: [
      "Patient or member data that cannot be copied casually between systems",
      "Scheduling, billing, and clinical applications that do not share events",
      "Vendor interfaces with limited modern APIs",
      "Need for audit logging and access control",
    ],
    systems: [
      "Electronic health or practice systems",
      "CRM",
      "Billing platforms",
      "Partner portals",
      "Secure file exchanges",
    ],
    approach:
      "We design integrations around least-privilege access, explicit contracts, and logging that operations and compliance teams can inspect.",
    outcomes: [
      "Fewer manual transfers of administrative data",
      "Clearer consent and access boundaries at the interface",
      "Operational visibility when a healthcare flow fails",
    ],
    services: ["security-governance", "enterprise-integration", "api-development"],
    relatedCaseStudy: "government-case-lifecycle-integration",
  },
  {
    slug: "retail-ecommerce",
    title: "Retail and E-commerce",
    summary:
      "Keep catalog, order, inventory, and customer-service data aligned across channels.",
    featured: true,
    challenges: [
      "Orders arriving faster than downstream fulfillment systems can absorb",
      "Inventory and price mismatches across channels",
      "Customer service working from incomplete order history",
      "Seasonal peaks that expose weak retry and throttling design",
    ],
    systems: [
      "E-commerce platforms",
      "ERP",
      "CRM",
      "Warehouse or fulfillment systems",
      "Payment and tax services",
    ],
    approach:
      "We design for bursts: queues, retries, rate limits, and monitoring so a campaign or seasonal peak does not silently drop orders.",
    outcomes: [
      "More consistent order and inventory views",
      "Customer-service systems that reflect recent activity",
      "Controlled handling of partner and platform rate limits",
    ],
    services: ["enterprise-integration", "api-development", "managed-services"],
    relatedCaseStudy: "customer-support-synchronization",
  },
  {
    slug: "aviation-travel",
    title: "Aviation and Travel",
    summary:
      "Coordinate booking, operations, and partner data where timing and exceptions are part of the product.",
    featured: true,
    challenges: [
      "Booking and operational systems that update at different speeds",
      "Partner and GDS-style interfaces with strict formats",
      "Disruption events that create sudden message volume",
      "Need for reliable notifications to downstream teams",
    ],
    systems: [
      "Reservation platforms",
      "CRM",
      "Operational control systems",
      "Partner APIs",
      "Messaging services",
    ],
    approach:
      "We focus on the events that create passenger or operational exceptions, then implement resilient integrations with monitoring around those paths.",
    outcomes: [
      "Faster propagation of schedule and booking changes",
      "Clearer handling of partner failures",
      "Operations teams that can see when a feed is late",
    ],
    services: ["enterprise-integration", "api-development", "testing-quality"],
    relatedCaseStudy: "enterprise-cloudhub-modernization",
  },
  {
    slug: "construction-property-technology",
    title: "Construction and Property Technology",
    summary:
      "Synchronize project, vendor, and commercial records across Salesforce, ERP, and construction platforms.",
    featured: true,
    challenges: [
      "Project, vendor, and change-order data living in separate products",
      "Purchase orders that must stay consistent with the system of record",
      "Scheduled jobs that fail without anyone noticing",
      "Need for validation and compensation when a downstream update fails",
    ],
    systems: [
      "Salesforce",
      "ERP",
      "Construction or project platforms",
      "Document stores",
      "Vendor portals",
    ],
    approach:
      "We implement scheduled and event-driven synchronization with staging, validation, and recovery so a failed update does not leave the landscape half-changed.",
    outcomes: [
      "Project commercial data that stays aligned across platforms",
      "Visible job status and error recovery",
      "Fewer spreadsheet workarounds for vendors and change orders",
    ],
    services: ["enterprise-integration", "api-development", "managed-services"],
    relatedCaseStudy: "erp-construction-platform-integration",
  },
  {
    slug: "professional-services",
    title: "Professional Services",
    summary:
      "Connect CRM, delivery, finance, and support tools so client work is not coordinated in inboxes.",
    featured: false,
    challenges: [
      "Opportunities, projects, and invoices tracked in different systems",
      "Time and expense data that finance cannot trust",
      "Client support tickets disconnected from CRM history",
      "Onboarding new tools without adding another silo",
    ],
    systems: [
      "CRM",
      "Professional-services automation",
      "Finance and ERP",
      "Support platforms",
      "Identity and collaboration tools",
    ],
    approach:
      "We start with the client lifecycle—win, deliver, invoice, support—and connect the systems that already hold each stage.",
    outcomes: [
      "A more complete client record across sales and delivery",
      "Fewer manual hand-offs into finance",
      "Support teams working from current account context",
    ],
    services: ["enterprise-integration", "api-development", "mulesoft-architecture"],
    relatedCaseStudy: "customer-support-synchronization",
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export function featuredIndustries() {
  return industries.filter((industry) => industry.featured);
}
