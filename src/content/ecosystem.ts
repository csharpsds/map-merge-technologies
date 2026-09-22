import { siteConfig } from "@/content/site-config";

export type EcosystemTarget = {
  name: (typeof siteConfig.ecosystem)[number];
  useCase: string;
};

export const ecosystemTargets: EcosystemTarget[] = [
  {
    name: "Salesforce",
    useCase:
      "A possible use: keep accounts, contacts, or cases aligned with an ERP or a support platform through documented APIs instead of spreadsheet exports.",
  },
  {
    name: "SAP",
    useCase:
      "A possible use: publish order or material updates from SAP as a system API so other applications do not query the core directly.",
  },
  {
    name: "Workday",
    useCase:
      "A possible use: move worker or organization changes into downstream HR, identity, or finance systems on a controlled schedule.",
  },
  {
    name: "Microsoft Dynamics",
    useCase:
      "A possible use: synchronize customers, invoices, or inventory with a CRM or a commerce platform so operations teams are not re-keying records.",
  },
  {
    name: "Great Plains",
    useCase:
      "A possible use: expose finance postings or vendor records from Great Plains through a thin API layer that newer applications can consume.",
  },
  {
    name: "IBM MQ",
    useCase:
      "A possible use: bridge reliable queue traffic into HTTP APIs or event streams so newer services can participate without replacing the queue.",
  },
  {
    name: "Kafka",
    useCase:
      "A possible use: subscribe to domain events, enrich them in MuleSoft, and deliver a stable API or another topic for consumers that should not read the raw stream.",
  },
  {
    name: "Amazon SQS",
    useCase:
      "A possible use: buffer inbound work from partners or batch jobs, then process each message with retries and a clear failure path.",
  },
  {
    name: "Databases",
    useCase:
      "A possible use: read or write operational tables through a governed API so applications share a contract instead of ad-hoc SQL.",
  },
  {
    name: "ERP platforms",
    useCase:
      "A possible use: wrap order, inventory, and posting operations so channels and back-office tools call one integration contract.",
  },
  {
    name: "CRM platforms",
    useCase:
      "A possible use: keep customer identity consistent when sales, service, and billing systems each hold a piece of the record.",
  },
  {
    name: "E-commerce platforms",
    useCase:
      "A possible use: send catalog, cart, or fulfillment updates into ERP and support systems as orders move through the storefront.",
  },
  {
    name: "SaaS applications",
    useCase:
      "A possible use: connect a SaaS webhook or API to an internal process so the same event does not need a custom script in every tool.",
  },
  {
    name: "Legacy systems",
    useCase:
      "A possible use: place a system API in front of a file, SOAP, or terminal-era interface so newer consumers do not inherit that protocol.",
  },
  {
    name: "REST and SOAP services",
    useCase:
      "A possible use: mediate between REST consumers and existing SOAP services, including mapping, timeouts, and a shared error envelope.",
  },
  {
    name: "SFTP and file integrations",
    useCase:
      "A possible use: pick up scheduled files, validate them, and turn accepted rows into API calls or queue messages with an audit trail.",
  },
];

export const ecosystemRows: EcosystemTarget[][] = [
  ecosystemTargets.slice(0, 6),
  ecosystemTargets.slice(6, 11),
  ecosystemTargets.slice(11),
];
