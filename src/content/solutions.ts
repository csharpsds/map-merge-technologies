export type Solution = {
  slug: string;
  title: string;
  challenge: string;
  approach: string;
  services: string[];
  outcomes: string[];
};

export const solutions: Solution[] = [
  {
    slug: "modern-api-foundation",
    title: "Build a Modern API Foundation",
    challenge:
      "New consumers keep asking for the same system data, but each request produces another custom interface.",
    approach:
      "We introduce API-led layers, design-first contracts, and reusable system APIs so later projects consume capabilities instead of rebuilding connections.",
    services: ["mulesoft-architecture", "api-development", "security-governance"],
    outcomes: [
      "A documented API catalog instead of hidden point-to-point flows",
      "Faster onboarding for new channels and partners",
      "Clearer ownership of each interface",
    ],
  },
  {
    slug: "connect-enterprise-applications",
    title: "Connect Enterprise Applications",
    challenge:
      "ERP, CRM, HR, and specialist platforms hold overlapping records that teams reconcile by hand.",
    approach:
      "We map the business events that must move, then implement validated, monitored integrations across the systems that already run the operation.",
    services: ["enterprise-integration", "api-development", "managed-services"],
    outcomes: [
      "Fewer manual updates between operational systems",
      "Visible synchronization status and error handling",
      "Interfaces that operations teams can support",
    ],
  },
  {
    slug: "modernize-legacy-integrations",
    title: "Modernize Legacy Integrations",
    challenge:
      "Older Mule applications, file drops, and undocumented scripts still carry critical processes.",
    approach:
      "We assess what must stay, what can be replaced, and what should be isolated behind a system API, then modernize in a sequence the business can absorb.",
    services: ["migration-modernization", "mulesoft-architecture", "testing-quality"],
    outcomes: [
      "Reduced reliance on unsupported components",
      "Clearer boundaries around legacy systems",
      "A path to retire brittle connections over time",
    ],
  },
  {
    slug: "migrate-cloudhub-2",
    title: "Migrate to CloudHub 2.0",
    challenge:
      "Current CloudHub 1.0 or mixed hosting arrangements are approaching a point where remaining still is the riskier option.",
    approach:
      "We assess compatibility, plan runtime and networking changes, update CI/CD, and validate production behavior with a rollback path.",
    services: ["migration-modernization", "devops-cicd", "managed-services"],
    outcomes: [
      "Applications running on the target CloudHub model",
      "Updated deployment and configuration practices",
      "Post-cutover support while the new environment settles",
    ],
  },
  {
    slug: "improve-reliability",
    title: "Improve Integration Reliability",
    challenge:
      "Incidents repeat because retries, dead-letter handling, and monitoring were never designed as part of the interface.",
    approach:
      "We review failure paths, add operational controls, and tighten the tests and alerts that should have caught the last incident.",
    services: ["managed-services", "testing-quality", "api-development"],
    outcomes: [
      "Recoverable errors instead of silent data loss",
      "Better visibility when queues or APIs fall behind",
      "Fewer emergency restarts as the only response",
    ],
  },
  {
    slug: "automate-delivery",
    title: "Automate MuleSoft Delivery",
    challenge:
      "Releases depend on a few people who know how to deploy from a workstation.",
    approach:
      "We put builds, tests, approvals, and promotions into the CI platform you already operate, with secure configuration and rollback.",
    services: ["devops-cicd", "testing-quality", "training-enablement"],
    outcomes: [
      "Repeatable promotions across environments",
      "Automated quality checks on each change",
      "A release history teams can audit",
    ],
  },
  {
    slug: "scale-mulesoft-team",
    title: "Scale a MuleSoft Team",
    challenge:
      "The integration backlog is growing faster than hiring, and existing specialists are stretched across every incident.",
    approach:
      "We add staff augmentation or a dedicated Philippines-based team that works inside your process, with optional mentoring so capacity is not only rented.",
    services: ["training-enablement", "mulesoft-architecture", "api-development"],
    outcomes: [
      "Additional delivery capacity without pausing current work",
      "Shared standards across a larger team",
      "Direct access to architecture support when designs stall",
    ],
  },
  {
    slug: "strengthen-api-security",
    title: "Strengthen API Security",
    challenge:
      "APIs are reachable, but identity, throttling, and secret handling are inconsistent from one application to the next.",
    approach:
      "We apply API Manager policies, identity flows, and secrets practices that match the sensitivity of each interface.",
    services: ["security-governance", "mulesoft-architecture", "managed-services"],
    outcomes: [
      "Consistent client identity and access control",
      "Rate and network controls on shared runtimes",
      "Reviewable logging for security operations",
    ],
  },
  {
    slug: "improve-testing",
    title: "Improve Testing and Code Quality",
    challenge:
      "Every enhancement feels risky because the last reliable test was a manual walkthrough.",
    approach:
      "We add MUnit, contract tests, and production-readiness reviews around the flows that actually change and fail.",
    services: ["testing-quality", "devops-cicd", "api-development"],
    outcomes: [
      "Automated coverage on critical transformations",
      "Safer migrations and enhancements",
      "A shared definition of ready for release",
    ],
  },
  {
    slug: "managed-production-support",
    title: "Establish Managed Production Support",
    challenge:
      "After go-live there is no durable owner for certificates, queues, incidents, and small improvements.",
    approach:
      "We set up monitoring, incident handling, health checks, and a visible enhancement backlog with regular service reporting.",
    services: ["managed-services", "devops-cicd", "migration-modernization"],
    outcomes: [
      "A known path for production issues",
      "Preventive checks on certificates, runtimes, and queues",
      "Planned improvements instead of only reactive work",
    ],
  },
];
