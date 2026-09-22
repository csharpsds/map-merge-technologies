export const integrationIconNames = [
  "database",
  "modules",
  "contact",
  "cart",
  "cloud",
  "server",
  "api",
  "files",
  "queue",
  "stream",
  "people",
  "finance",
] as const;

export type IntegrationIconName = (typeof integrationIconNames)[number];

export type IntegrationUsage = "approved-logo" | "fallback-icon";

export type IntegrationAsset = {
  id: string;
  label: string;
  assetPath: string | null;
  icon: IntegrationIconName;
  source: string;
  usage: IntegrationUsage;
  notes: string;
};

export const integrationAssets: IntegrationAsset[] = [
  {
    id: "salesforce",
    label: "Salesforce",
    assetPath: null,
    icon: "contact",
    source: "https://www.salesforce.com/news/media-collection/company-logos-and-video/",
    usage: "fallback-icon",
    notes:
      "Press media collection is not a license for this commercial site. Original CRM icon until an approved file is added.",
  },
  {
    id: "sap",
    label: "SAP",
    assetPath: null,
    icon: "modules",
    source: "https://www.sap.com/about/legal/trademark.html",
    usage: "fallback-icon",
    notes: "No approved logo supplied. Original ERP-module icon only.",
  },
  {
    id: "workday",
    label: "Workday",
    assetPath: null,
    icon: "people",
    source: "https://www.workday.com/en-us/legal/workday-trademark-usage-guidelines.html",
    usage: "fallback-icon",
    notes: "No approved logo supplied. Original people/HR icon only.",
  },
  {
    id: "microsoft-dynamics",
    label: "Microsoft Dynamics",
    assetPath: null,
    icon: "modules",
    source: "https://learn.microsoft.com/en-us/dynamics365/get-started/icons",
    usage: "fallback-icon",
    notes:
      "Dynamics 365 icon pack is not treated as permission for this site. Original module icon only.",
  },
  {
    id: "microsoft-dynamics-gp",
    label: "Microsoft Dynamics GP",
    assetPath: null,
    icon: "finance",
    source: "https://learn.microsoft.com/en-us/dynamics-gp/",
    usage: "fallback-icon",
    notes:
      "Labeled as Microsoft Dynamics GP. Do not use a Dynamics 365 logo. Original finance icon only.",
  },
  {
    id: "ibm-mq",
    label: "IBM MQ",
    assetPath: null,
    icon: "queue",
    source: "https://www.ibm.com/legal/copyright-trademark",
    usage: "fallback-icon",
    notes: "No approved logo supplied. Original queue icon only.",
  },
  {
    id: "apache-kafka",
    label: "Apache Kafka",
    assetPath: null,
    icon: "stream",
    source: "https://www.apache.org/foundation/marks/",
    usage: "fallback-icon",
    notes:
      "No approved logo file added. Original event-stream icon; the name still identifies Apache Kafka.",
  },
  {
    id: "amazon-sqs",
    label: "Amazon SQS",
    assetPath: null,
    icon: "queue",
    source: "https://aws.amazon.com/architecture/icons/",
    usage: "fallback-icon",
    notes:
      "AWS architecture icons are for diagrams, not this marketing list, until an approved local file is added.",
  },
  {
    id: "databases",
    label: "Databases",
    assetPath: null,
    icon: "database",
    source: "Original Lucide line icon",
    usage: "fallback-icon",
    notes: "Category icon: database cylinder.",
  },
  {
    id: "erp-platforms",
    label: "ERP platforms",
    assetPath: null,
    icon: "modules",
    source: "Original Lucide line icon",
    usage: "fallback-icon",
    notes: "Category icon: connected business modules.",
  },
  {
    id: "crm-platforms",
    label: "CRM platforms",
    assetPath: null,
    icon: "contact",
    source: "Original Lucide line icon",
    usage: "fallback-icon",
    notes: "Category icon: customer record.",
  },
  {
    id: "ecommerce-platforms",
    label: "E-commerce platforms",
    assetPath: null,
    icon: "cart",
    source: "Original Lucide line icon",
    usage: "fallback-icon",
    notes: "Category icon: shopping cart.",
  },
  {
    id: "saas-applications",
    label: "SaaS applications",
    assetPath: null,
    icon: "cloud",
    source: "Original Lucide line icon",
    usage: "fallback-icon",
    notes: "Category icon: cloud application.",
  },
  {
    id: "legacy-systems",
    label: "Legacy systems",
    assetPath: null,
    icon: "server",
    source: "Original Lucide line icon",
    usage: "fallback-icon",
    notes: "Category icon: server / mainframe.",
  },
  {
    id: "rest-soap-services",
    label: "REST and SOAP services",
    assetPath: null,
    icon: "api",
    source: "Original Lucide line icon",
    usage: "fallback-icon",
    notes: "Category icon: API brackets.",
  },
  {
    id: "sftp-file-integrations",
    label: "SFTP and file integrations",
    assetPath: null,
    icon: "files",
    source: "Original Lucide line icon",
    usage: "fallback-icon",
    notes: "Category icon: folder with transfer arrows.",
  },
];

export function getIntegrationAsset(id: string) {
  return integrationAssets.find((item) => item.id === id);
}
