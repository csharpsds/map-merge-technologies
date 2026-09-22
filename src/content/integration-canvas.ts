export type SourceId = "crm" | "erp" | "saas";
export type CanvasNodeId = SourceId | "map" | "merge";
export type CanvasStage = "map" | "transform" | "deliver";

export type CanvasNode = {
  id: CanvasNodeId;
  label: string;
  kind: "source" | "layer" | "outcome";
  stage: CanvasStage;
};

export type CanvasPath = {
  id: string;
  from: CanvasNodeId;
  to: CanvasNodeId;
};

export type CanvasPoint = { x: number; y: number };

export type CanvasLayout = {
  id: "desktop" | "mobile";
  viewBox: { width: number; height: number };
  axis: "horizontal" | "vertical";
  nodes: Record<CanvasNodeId, CanvasPoint>;
};

export type CanvasFlow = {
  id: string;
  label: string;
  summary: string;
  layerLabel: string;
  outcomeLabel: string;
  defaultSource: SourceId;
  activePaths: string[];
  sourceExplanations: Record<SourceId, string>;
};

export const canvasNodes: CanvasNode[] = [
  { id: "crm", label: "CRM", kind: "source", stage: "map" },
  { id: "erp", label: "ERP", kind: "source", stage: "map" },
  { id: "saas", label: "SaaS", kind: "source", stage: "map" },
  { id: "map", label: "MAP", kind: "layer", stage: "transform" },
  { id: "merge", label: "Connected APIs", kind: "outcome", stage: "deliver" },
];

export const canvasPaths: CanvasPath[] = [
  { id: "crm-map", from: "crm", to: "map" },
  { id: "erp-map", from: "erp", to: "map" },
  { id: "saas-map", from: "saas", to: "map" },
  { id: "map-merge", from: "map", to: "merge" },
];

export const canvasLayouts: Record<"desktop" | "mobile", CanvasLayout> = {
  desktop: {
    id: "desktop",
    viewBox: { width: 840, height: 460 },
    axis: "horizontal",
    nodes: {
      crm: { x: 92, y: 78 },
      erp: { x: 92, y: 230 },
      saas: { x: 92, y: 382 },
      map: { x: 420, y: 230 },
      merge: { x: 748, y: 230 },
    },
  },
  mobile: {
    id: "mobile",
    viewBox: { width: 360, height: 680 },
    axis: "vertical",
    nodes: {
      crm: { x: 180, y: 56 },
      erp: { x: 180, y: 164 },
      saas: { x: 180, y: 272 },
      map: { x: 180, y: 408 },
      merge: { x: 180, y: 548 },
    },
  },
};

export const canvasStages: { id: CanvasStage; step: string; title: string; body: string }[] = [
  {
    id: "map",
    step: "01",
    title: "Map",
    body: "Identify the source systems and the records they own.",
  },
  {
    id: "transform",
    step: "02",
    title: "Transform",
    body: "Align fields, keys, and rules in the integration layer.",
  },
  {
    id: "deliver",
    step: "03",
    title: "Deliver",
    body: "Publish the result as reusable APIs for consuming systems.",
  },
];

export const canvasFlows: CanvasFlow[] = [
  {
    id: "customer-data",
    label: "Customer data",
    summary:
      "Customer identities are mapped from CRM, ERP, and support systems, transformed into one model, then delivered as reusable customer APIs. This is an illustrative example, not live customer data.",
    layerLabel: "Customer mapping",
    outcomeLabel: "Unified customer view",
    defaultSource: "crm",
    activePaths: ["crm-map", "erp-map", "saas-map", "map-merge"],
    sourceExplanations: {
      crm: "The CRM contributes accounts and contacts. Those records are mapped to a single customer key so later APIs do not invent a second identity.",
      erp: "The ERP contributes billing and account identifiers. They are aligned to the same customer key used by the CRM.",
      saas: "A support or commerce system contributes tickets and preferences without creating a duplicate customer record.",
    },
  },
  {
    id: "orders-operations",
    label: "Orders & operations",
    summary:
      "Orders and stock movements are mapped from the ERP, related to CRM context, orchestrated in the integration layer, then delivered as order APIs. This is an illustrative example, not a live transaction feed.",
    layerLabel: "Order orchestration",
    outcomeLabel: "Order & operations APIs",
    defaultSource: "erp",
    activePaths: ["erp-map", "crm-map", "saas-map", "map-merge"],
    sourceExplanations: {
      crm: "The CRM supplies the customer context for an order so operations APIs can show who the work belongs to.",
      erp: "The ERP is the system of record for orders, inventory, and fulfillment status. Those events are mapped first.",
      saas: "A warehouse or commerce platform adds shipment and fulfillment updates into the same order picture.",
    },
  },
  {
    id: "events-alerts",
    label: "Events & alerts",
    summary:
      "Operational events are mapped from SaaS and line-of-business systems, filtered and enriched, then delivered as alert and notification APIs. This is an illustrative example, not a real-time operations console.",
    layerLabel: "Event orchestration",
    outcomeLabel: "Alert & event APIs",
    defaultSource: "saas",
    activePaths: ["saas-map", "erp-map", "map-merge"],
    sourceExplanations: {
      crm: "CRM updates can raise a follow-up event—such as a high-value account change—once they pass the mapping rules.",
      erp: "ERP exceptions, such as a failed posting or a stock threshold, are mapped into a common alert shape.",
      saas: "SaaS webhooks and platform events are the usual start of this flow. They are validated, enriched, and published as alert APIs.",
    },
  },
];

export const serviceIntegrationDetails: Record<string, string> = {
  "mulesoft-architecture":
    "Defines which systems are mapped, which APIs are reusable, and where point-to-point connections should stop.",
  "api-development":
    "Turns the transformed model from the canvas into documented, testable APIs that other teams can call.",
  "migration-modernization":
    "Re-routes existing source-to-API flows onto a current runtime without losing the mapping already in place.",
  "enterprise-integration":
    "Connects the CRM, ERP, and SaaS nodes on the canvas so records move on purpose instead of through one-off scripts.",
  "devops-cicd":
    "Promotes the same mapped artifact from test to production so the canvas does not change meaning between environments.",
  "security-governance":
    "Places identity, policy, and secrets on the paths between systems and the APIs that expose them.",
  "managed-services":
    "Watches the live paths after go-live: queues, errors, and the APIs that consume the merged result.",
  "testing-quality":
    "Proves each hop—source, transformation, and API—before a flow is trusted in production.",
  "training-enablement":
    "Shows delivery teams how to read the canvas: what is mapped, what is transformed, and what is published.",
};

export function getCanvasFlow(id: string) {
  return canvasFlows.find((flow) => flow.id === id) ?? canvasFlows[0];
}

export function pathDefinition(
  from: CanvasPoint,
  to: CanvasPoint,
  axis: CanvasLayout["axis"],
) {
  if (axis === "vertical") {
    const mid = (from.y + to.y) / 2;
    return `M ${from.x} ${from.y} C ${from.x} ${mid}, ${to.x} ${mid}, ${to.x} ${to.y}`;
  }
  const mid = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${mid} ${from.y}, ${mid} ${to.y}, ${to.x} ${to.y}`;
}

export function pathsForSource(source: SourceId) {
  return [`${source}-map`, "map-merge"];
}
