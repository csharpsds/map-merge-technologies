export type ExpertiseItem = {
  name: string;
  summary: string;
};

export type ExpertiseGroup = {
  id: string;
  title: string;
  visual: "development" | "platform" | "architecture" | "devops";
  caption: string;
  items: ExpertiseItem[];
};

export const expertiseGroups: ExpertiseGroup[] = [
  {
    id: "mulesoft-development",
    title: "MuleSoft Development",
    visual: "development",
    caption: "Build the flows that map, transform, and expose data.",
    items: [
      {
        name: "Mule 4",
        summary:
          "The runtime used to implement APIs and integrations: listeners, connectors, error handling, and the application shape that operations will run.",
      },
      {
        name: "DataWeave",
        summary:
          "Transforms payloads between systems. This is where field names, types, and business rules are made explicit instead of hidden in glue code.",
      },
      {
        name: "Anypoint Studio",
        summary:
          "The desktop workspace for designing flows, inspecting payloads, and running applications locally before they reach a shared environment.",
      },
      {
        name: "RAML",
        summary:
          "A design-first contract for resources, examples, and errors so consumers can work from a specification rather than from implementation details.",
      },
      {
        name: "REST APIs",
        summary:
          "HTTP APIs that other applications call. Useful when a channel or process needs a stable resource model rather than a system-specific interface.",
      },
      {
        name: "SOAP services",
        summary:
          "Support for existing XML and WSDL interfaces, including cases where a newer REST consumer still has to reach a SOAP system of record.",
      },
      {
        name: "Batch processing",
        summary:
          "Scheduled or large-volume work—file loads, nightly syncs, backfills—handled in controlled steps with a record of what failed.",
      },
      {
        name: "Event-driven integration",
        summary:
          "React to messages, webhooks, or queue events as they arrive instead of polling, then publish a result other services can consume.",
      },
      {
        name: "MUnit",
        summary:
          "Automated tests for flows and DataWeave. They lock in current behavior before a migration or a change that would otherwise be checked only in production.",
      },
    ],
  },
  {
    id: "anypoint-platform",
    title: "Anypoint Platform",
    visual: "platform",
    caption: "Host, govern, and observe the applications after they are built.",
    items: [
      {
        name: "API Manager",
        summary:
          "Applies policies such as client identity, rate limits, and threat protection consistently, instead of coding those controls into every application.",
      },
      {
        name: "Runtime Manager",
        summary:
          "Deploys and inspects running applications: replicas, logs, and the basic health signals operations need after a release.",
      },
      {
        name: "Anypoint Exchange",
        summary:
          "A catalog for APIs, connectors, and templates so teams can find an existing asset before they build another copy.",
      },
      {
        name: "Anypoint Monitoring",
        summary:
          "Dashboards and alerts for latency, errors, and throughput so a failing integration is visible before callers open a ticket.",
      },
      {
        name: "CloudHub 1.0 and 2.0",
        summary:
          "Hosted Mule runtimes. Moving between them is a planned change to networking, deployment shape, and operations—not only a new checkbox.",
      },
      {
        name: "Runtime Fabric",
        summary:
          "A self-managed runtime option when applications must run closer to existing data centers or private Kubernetes capacity.",
      },
      {
        name: "Private Spaces",
        summary:
          "Isolated CloudHub 2.0 networking so applications can reach private destinations without exposing every listener to the public internet.",
      },
      {
        name: "Anypoint MQ",
        summary:
          "A managed queue for decoupling producers and consumers when a direct HTTP call is too brittle or the receiver may be briefly unavailable.",
      },
      {
        name: "Secrets Manager",
        summary:
          "Stores credentials and certificates outside application property files so the same artifact can promote without copying secrets.",
      },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    visual: "architecture",
    caption: "Decide which layer owns each contract before more point-to-point links appear.",
    items: [
      {
        name: "API-led connectivity",
        summary:
          "A working model that separates system, process, and experience APIs so the second project can reuse the first instead of bypassing it.",
      },
      {
        name: "System APIs",
        summary:
          "One system of record, one contract. They hide connector quirks and authentication so consumers do not learn the backend’s private language.",
      },
      {
        name: "Process APIs",
        summary:
          "Orchestrate a business action that spans systems—create an order, update a case—without embedding that logic in a channel application.",
      },
      {
        name: "Experience APIs",
        summary:
          "Shape the contract for a specific channel or audience so mobile, partner, or portal consumers are not forced to call every system API.",
      },
      {
        name: "Integration architecture",
        summary:
          "The map of systems, environments, and patterns: what is reused, what is retired, and where a new request should land.",
      },
      {
        name: "API governance",
        summary:
          "Naming, versioning, error envelopes, and review habits that developers can follow. Exchange only helps if teams search it before they build.",
      },
      {
        name: "Security",
        summary:
          "Identity, policies, and secret handling designed with the APIs, not added after the first security review finds a shared client id.",
      },
      {
        name: "Scalability",
        summary:
          "Worker size, async boundaries, and back-pressure so a noisy consumer cannot starve every other API on the same runtime.",
      },
      {
        name: "Design reviews",
        summary:
          "A check against the catalog and the target pattern before implementation starts, which is cheaper than rewriting a leaky contract later.",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    visual: "devops",
    caption: "Promote a tested artifact the same way every time.",
    items: [
      {
        name: "Maven",
        summary:
          "The build that produces the same Mule artifact on a laptop and in CI. If the build needs a hidden Studio setting, the pipeline will drift.",
      },
      {
        name: "Git",
        summary:
          "Source of truth for applications, tests, and deployment descriptors so a release is a reviewed change, not a file copied from a workstation.",
      },
      {
        name: "Azure DevOps",
        summary:
          "A pipeline host many enterprises already operate. Useful for build, test, approval, and promotion when that is the standard platform.",
      },
      {
        name: "GitHub Actions",
        summary:
          "Workflows next to the repository: run MUnit, publish an artifact, and gate production with the same checks as any other host.",
      },
      {
        name: "Jenkins",
        summary:
          "An automation server still common on existing estates. The goal is the same: a second person can promote a tested artifact.",
      },
      {
        name: "Automated testing",
        summary:
          "MUnit and related checks in the pipeline. A yellow stage that people skip is not automation; the build should fail when tests fail.",
      },
      {
        name: "Environment management",
        summary:
          "Keep endpoints, certificates, and secrets injected per environment so the same artifact can move from test to production.",
      },
      {
        name: "Deployment automation",
        summary:
          "Promote through a defined path with an approval gate and a rollback that uses the previous artifact, not a hotfix built on a laptop.",
      },
    ],
  },
];
