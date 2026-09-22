import { integrationAssets, type IntegrationAsset } from "@/content/integration-assets";

export type EcosystemTarget = IntegrationAsset & {
  useCase: string;
};

const useCases: Record<string, string> = {
  salesforce:
    "A possible use: keep accounts, contacts, or cases aligned with an ERP or a support platform through documented APIs instead of spreadsheet exports.",
  sap: "A possible use: publish order or material updates from SAP as a system API so other applications do not query the core directly.",
  workday:
    "A possible use: move worker or organization changes into downstream HR, identity, or finance systems on a controlled schedule.",
  "microsoft-dynamics":
    "A possible use: synchronize customers, invoices, or inventory with a CRM or a commerce platform so operations teams are not re-keying records.",
  "microsoft-dynamics-gp":
    "A possible use: expose finance postings or vendor records from Microsoft Dynamics GP through a thin API layer that newer applications can consume.",
  "ibm-mq":
    "A possible use: bridge reliable queue traffic into HTTP APIs or event streams so newer services can participate without replacing the queue.",
  "apache-kafka":
    "A possible use: subscribe to Apache Kafka domain events, enrich them in MuleSoft, and deliver a stable API or another topic for consumers that should not read the raw stream.",
  "amazon-sqs":
    "A possible use: buffer inbound work from partners or batch jobs, then process each message with retries and a clear failure path.",
  databases:
    "A possible use: read or write operational tables through a governed API so applications share a contract instead of ad-hoc SQL.",
  "erp-platforms":
    "A possible use: wrap order, inventory, and posting operations so channels and back-office tools call one integration contract.",
  "crm-platforms":
    "A possible use: keep customer identity consistent when sales, service, and billing systems each hold a piece of the record.",
  "ecommerce-platforms":
    "A possible use: send catalog, cart, or fulfillment updates into ERP and support systems as orders move through the storefront.",
  "saas-applications":
    "A possible use: connect a SaaS webhook or API to an internal process so the same event does not need a custom script in every tool.",
  "legacy-systems":
    "A possible use: place a system API in front of a file, SOAP, or terminal-era interface so newer consumers do not inherit that protocol.",
  "rest-soap-services":
    "A possible use: mediate between REST consumers and existing SOAP services, including mapping, timeouts, and a shared error envelope.",
  "sftp-file-integrations":
    "A possible use: pick up scheduled files, validate them, and turn accepted rows into API calls or queue messages with an audit trail.",
};

export const ecosystemTargets: EcosystemTarget[] = integrationAssets.map((asset) => ({
  ...asset,
  useCase: useCases[asset.id] ?? `A possible use: connect ${asset.label} through a documented API.`,
}));

export const ecosystemRows: EcosystemTarget[][] = [
  ecosystemTargets.slice(0, 6),
  ecosystemTargets.slice(6, 11),
  ecosystemTargets.slice(11),
];
