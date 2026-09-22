export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  industrySlug: string;
  challenge: string;
  summary: string;
  situation: string;
  approach: string[];
  cover: string[];
  technologies: string[];
  outcomes: string[];
  relatedServices: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "enterprise-cloudhub-modernization",
    title: "Enterprise CloudHub Modernization",
    industry: "Banking and Financial Services",
    industrySlug: "banking-financial-services",
    challenge:
      "MuleSoft applications on older runtimes and CloudHub infrastructure needed a planned path to current hosting and Java versions.",
    summary:
      "Assessed compatibility, modernized Java 17 runtimes, moved selected applications to CloudHub 2.0, and updated CI/CD and production validation.",
    situation:
      "A company needed to modernize MuleSoft applications running on older runtimes and CloudHub infrastructure. Remaining on the current stack was starting to constrain connector choices, Java support, and deployment practice.",
    approach: [
      "Catalogued applications, connectors, and environment dependencies",
      "Assessed CloudHub 2.0 and Java 17 compatibility before sequencing work",
      "Updated pipelines so promotions and rollback matched the new hosting model",
      "Validated production behavior with regression evidence, not only a smoke test",
    ],
    cover: [
      "Assessment",
      "Java 17 modernization",
      "CloudHub 2.0 migration",
      "Connector compatibility",
      "CI/CD updates",
      "Testing",
      "Production validation",
    ],
    technologies: [
      "Mule 4",
      "CloudHub 2.0",
      "Java 17",
      "Maven",
      "Azure DevOps",
      "MUnit",
    ],
    outcomes: [
      "Applications moved onto supported runtime and hosting combinations",
      "Deployment practice aligned with the target CloudHub model",
      "A repeatable pattern for remaining applications still in the backlog",
    ],
    relatedServices: [
      "migration-modernization",
      "devops-cicd",
      "testing-quality",
    ],
  },
  {
    slug: "government-case-lifecycle-integration",
    title: "Government Case Lifecycle Integration",
    industry: "Government and Public Services",
    industrySlug: "government-public-services",
    challenge:
      "A public-sector organization needed secure case updates to stay consistent across multiple systems.",
    summary:
      "Introduced API-led case updates with mutual TLS, private networking, Salesforce connectivity, and monitored message handling.",
    situation:
      "A public-sector organization needed secure case updates across multiple systems. Case workers could not rely on a single system of record, and failed updates were hard to see until someone chased them manually.",
    approach: [
      "Defined system and process APIs around the case lifecycle",
      "Applied mutual TLS and private networking for sensitive hops",
      "Connected Salesforce with explicit contracts rather than ad-hoc updates",
      "Added queue monitoring and dead-letter handling for messages that could not be lost",
    ],
    cover: [
      "API-led architecture",
      "Mutual TLS",
      "Salesforce integration",
      "Private networking",
      "Message queues",
      "Monitoring",
      "Dead-letter handling",
    ],
    technologies: [
      "Mule 4",
      "Salesforce",
      "API Manager",
      "Mutual TLS",
      "Anypoint MQ",
      "Anypoint Monitoring",
    ],
    outcomes: [
      "Case updates followed a documented, secure path between systems",
      "Failed messages became visible and recoverable",
      "Operations gained monitoring on the flows that mattered most",
    ],
    relatedServices: [
      "enterprise-integration",
      "security-governance",
      "mulesoft-architecture",
    ],
  },
  {
    slug: "erp-construction-platform-integration",
    title: "ERP and Construction Platform Integration",
    industry: "Construction and Property Technology",
    industrySlug: "construction-property-technology",
    challenge:
      "Project, vendor, change-order, and purchase-order data needed to stay aligned across Salesforce, ERP, and construction platforms.",
    summary:
      "Built scheduled synchronization with staging, validation, compensation logic, monitoring, and error recovery.",
    situation:
      "An organization needed project, vendor, change-order, and purchase-order data synchronized across Salesforce, ERP, and construction platforms. Spreadsheet workarounds were filling the gaps whenever a scheduled job failed.",
    approach: [
      "Mapped the commercial objects that had to stay consistent",
      "Introduced staging and validation before downstream systems accepted a change",
      "Added compensation logic so a partial update could be reversed or retried",
      "Instrumented jobs so missed runs and validation failures were visible",
    ],
    cover: [
      "Scheduled integrations",
      "Staging",
      "Validation",
      "Compensation logic",
      "Monitoring",
      "Error recovery",
    ],
    technologies: [
      "Mule 4",
      "Salesforce",
      "ERP APIs",
      "DataWeave",
      "Anypoint Monitoring",
      "SFTP",
    ],
    outcomes: [
      "Commercial records stayed aligned without daily spreadsheet repair",
      "Failed jobs produced a recovery path instead of silent drift",
      "Project and finance teams shared a more current view of vendors and orders",
    ],
    relatedServices: [
      "enterprise-integration",
      "api-development",
      "managed-services",
    ],
  },
  {
    slug: "customer-support-synchronization",
    title: "Customer Support Synchronization",
    industry: "Retail and E-commerce",
    industrySlug: "retail-ecommerce",
    challenge:
      "Customer and support-ticket information needed to stay current between CRM and customer-support platforms.",
    summary:
      "Implemented incremental synchronization with rate-limit awareness, retries, monitoring, and high-volume processing controls.",
    situation:
      "An organization needed customer and support-ticket information synchronized between CRM and customer-support platforms. Agents were opening tickets without the latest customer context, and bulk backfills were tripping API limits.",
    approach: [
      "Replaced full refreshes with incremental synchronization",
      "Respected platform rate limits and added retry with backoff",
      "Separated high-volume backfills from the live incremental path",
      "Added monitoring so lag and retry exhaustion were visible",
    ],
    cover: [
      "Incremental synchronization",
      "API rate limits",
      "Retry handling",
      "Monitoring",
      "High-volume processing",
    ],
    technologies: [
      "Mule 4",
      "CRM APIs",
      "Support-platform APIs",
      "DataWeave",
      "Anypoint MQ",
      "Anypoint Monitoring",
    ],
    outcomes: [
      "Support agents worked from more current customer context",
      "Synchronization stayed within platform rate limits",
      "Operations could see when the live feed was falling behind",
    ],
    relatedServices: [
      "enterprise-integration",
      "api-development",
      "managed-services",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
