export const insightCategories = [
  "MuleSoft Development",
  "DataWeave",
  "API Design",
  "Architecture",
  "CloudHub 2.0",
  "Migration",
  "Java 17",
  "MUnit",
  "API Security",
  "CI/CD",
  "Production Support",
  "Troubleshooting",
] as const;

export type InsightCategory = (typeof insightCategories)[number];

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  featured: boolean;
  categories: InsightCategory[];
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "planning-mule-3-to-mule-4-migration",
    title: "Planning a Mule 3 to Mule 4 Migration",
    excerpt:
      "A practical sequence for assessing connectors, connectors, DataWeave changes, and cutover risk before the first application moves.",
    date: "2026-03-12",
    readingTime: "8 min",
    featured: true,
    categories: ["Migration", "MuleSoft Development", "Architecture"],
    body: [
      "A Mule 3 to Mule 4 migration fails most often because it is treated as a compiler upgrade. The language, connectors, error-handling model, and transport behavior changed enough that a line-by-line rewrite without an inventory produces surprises in production.",
      "Start with an application catalog: runtime version, connectors, custom Java, inbound transports, and the business process each application serves. Group applications that share a system of record. A payroll interface and a product-catalog feed should not share a cutover window just because they sit in the same business group.",
      "Assess connector and transport replacements next. Many Mule 3 patterns depended on transports that no longer exist in the same form. The replacement is usually an HTTP listener, a module, or an explicit connector—not an automatic mapping. Capture those replacements in the assessment so estimates reflect design work.",
      "DataWeave 2.0 is a benefit, but it is also a rewrite surface. Identify the transformations that encode business rules. Those deserve tests before anyone refactors them “while we are here.” MUnit around those flows is part of the migration, not a later quality initiative.",
      "Plan cutover in slices. Move a low-risk application first to prove the pipeline, environment, and rollback path. Keep a written rollback for each slice: previous artifact, configuration, and the person who can authorize the reversal.",
      "Migration is finished when the new application is operable—logged, monitored, and understood by the people who will support it—not when the old runtime is merely switched off.",
    ],
  },
  {
    slug: "cloudhub-1-to-2-readiness",
    title: "CloudHub 1.0 to CloudHub 2.0 Readiness",
    excerpt:
      "What to inspect in networking, deployment, and application shape before you schedule a CloudHub 2.0 move.",
    date: "2026-02-18",
    readingTime: "7 min",
    featured: true,
    categories: ["CloudHub 2.0", "Migration", "Production Support"],
    body: [
      "CloudHub 2.0 is not a checkbox in Runtime Manager. Networking, private spaces, deployment descriptors, and some operational assumptions change. Teams that copy an existing application and hope the new runtime accepts it usually discover the gaps during the first production promotion.",
      "Begin with connectivity. Inventory allowlists, VPNs, Private Spaces, and the destinations each application reaches. A move that looks simple in a non-production region can fail when production DNS, egress, or mutual TLS is different.",
      "Review how configuration is injected today. Properties, secure properties, and secrets that were acceptable on CloudHub 1.0 may need a cleaner split between application config and platform secrets. Do that work before the cutover window, not during it.",
      "Update CI/CD in the same increment as the hosting change. If people still deploy from a workstation, the new model will inherit the same operational risk. Maven builds, automated tests, and an explicit rollback artifact should exist before the first production application moves.",
      "Validate with production-like traffic patterns. A successful health check does not prove that batch size, streaming, or long-running connections behave the same way. Keep monitoring and log searches ready for the first hours after cutover.",
      "Readiness means you can answer three questions: what must change in the application, what must change in the network, and who can reverse the change if the new environment misbehaves.",
    ],
  },
  {
    slug: "java-17-modernization-mulesoft",
    title: "Java 17 Modernization for MuleSoft",
    excerpt:
      "How to treat a Java 8 to Java 17 move as an application and connector review, not only a runtime setting.",
    date: "2026-01-27",
    readingTime: "6 min",
    featured: true,
    categories: ["Java 17", "Migration", "MuleSoft Development"],
    body: [
      "Java 17 modernization on MuleSoft is rarely just a runtime dropdown. Custom Java, older connectors, and libraries compiled against Java 8 can fail in ways that do not appear until a specific flow executes.",
      "Inventory every application that still ships custom Java or community libraries. Those are the first review targets. If a library has no Java 17-compatible release, decide whether to replace the library, isolate the code, or sequence that application later.",
      "Connector compatibility comes next. Confirm that the connector versions you intend to run are supported on the target runtime and Java version. A connector that “still deploys” is not the same as a connector that is supported.",
      "Use a non-production runtime that matches the target Java version and run the existing MUnit suite there. If you do not have a suite, write tests around custom Java and the transformations that call it before you change the runtime. Otherwise you are using production as the test harness.",
      "Watch for removed or changed JVM defaults that affect cryptography, XML, or reflection. These issues show up in security-sensitive or SOAP-heavy applications more often than in simple HTTP proxies.",
      "Treat Java 17 as a planned modernization increment: assess, replace, test, then promote. Combining it with an unplanned CloudHub or Mule 3 rewrite in the same window multiplies the number of things that can fail at once.",
    ],
  },
  {
    slug: "designing-reusable-api-led-integrations",
    title: "Designing Reusable API-led Integrations",
    excerpt:
      "How to keep system, process, and experience APIs useful after the first project that created them.",
    date: "2025-12-09",
    readingTime: "7 min",
    featured: true,
    categories: ["Architecture", "API Design", "MuleSoft Development"],
    body: [
      "API-led connectivity is easy to draw and easy to abandon. The first project often creates a system API that is really a process API, or an experience API that embeds system-specific identifiers. The second project then bypasses the layers because they are not reusable.",
      "Give each layer a job. System APIs speak the language of one system of record. Process APIs orchestrate business actions that span systems. Experience APIs shape a contract for a channel. If a layer is doing two jobs, later consumers will not trust it.",
      "Design contracts first. RAML or OpenAPI should describe resources, errors, and pagination before implementation starts. A consumer who has to read DataWeave to understand a field name is not consuming an API—they are reading an implementation.",
      "Reuse needs governance that developers can follow: naming, versioning, error envelopes, and a place to find existing APIs. Anypoint Exchange only helps if teams actually publish and search before they build.",
      "Do not force every integration through three layers on day one. A thin system API in front of a difficult legacy system is already an improvement. Add process and experience APIs when a second consumer appears or a business orchestration becomes real.",
      "Reusable architecture is a habit: review new designs against the catalog, refuse silent bypasses, and keep the documentation as current as the code.",
    ],
  },
  {
    slug: "improving-munit-test-coverage",
    title: "Improving MUnit Test Coverage",
    excerpt:
      "Where MUnit pays off, what not to measure, and how to keep tests useful during migrations.",
    date: "2025-11-04",
    readingTime: "6 min",
    featured: false,
    categories: ["MUnit", "MuleSoft Development", "CI/CD"],
    body: [
      "Coverage percentages are a weak goal for MuleSoft testing. A suite that asserts HTTP 200 on every flow can report a high number and still miss the DataWeave branch that corrupts an amount field.",
      "Start with the transformations and error paths that encode business rules. If a mapping decides tax, status, or customer matching, it needs examples for the unusual inputs—not only the sample payload from the vendor demo.",
      "Mock at the connector boundary. Tests that require a live Salesforce org or an ERP sandbox are integration tests; they belong in a different stage. MUnit should keep developers fast when those systems are unavailable.",
      "Keep tests next to the application in source control and run them in Maven on every meaningful pipeline. A suite that only runs on one laptop will not protect a migration.",
      "When you modernize Mule 3 or CloudHub applications, treat missing tests as migration scope. Rewriting a flow without capturing current behavior is how silent functional change enters production.",
      "Improve coverage where it reduces risk. The useful metric is whether a known class of defect would now fail the build—not whether a dashboard shows a round number.",
    ],
  },
  {
    slug: "securing-enterprise-apis",
    title: "Securing Enterprise APIs",
    excerpt:
      "A working order for identity, policies, secrets, and review so APIs are not exposed on hope.",
    date: "2025-10-15",
    readingTime: "7 min",
    featured: false,
    categories: ["API Security", "Architecture", "Production Support"],
    body: [
      "Enterprise APIs fail security reviews for ordinary reasons: a client id shared across environments, a secret in a property file, or no rate limit on an expensive process API.",
      "Start with identity. Decide who the client is—application, partner, or user-on-behalf-of—and use OAuth 2.0, OpenID Connect, JWT, or mutual TLS accordingly. Client ID enforcement is a baseline, not a complete model for sensitive data.",
      "Apply API Manager policies consistently. Rate limiting, throttling, and IP allowlisting protect shared runtimes as much as they protect data. A noisy consumer should not be able to starve every other API on the same worker.",
      "Move secrets out of application configuration that developers copy between machines. Secrets Manager or your organization’s vault should be the source of credentials, certificates, and signing keys.",
      "Log enough to investigate, not enough to leak. Audit who called an API and whether policy denied them. Avoid writing payloads that contain credentials or personal data into default application logs.",
      "Security is a review habit. New APIs should pass the same checklist: identity, policy, secret handling, versioning, and an owner who will respond when a credential needs rotation.",
    ],
  },
  {
    slug: "building-cicd-pipelines-mulesoft",
    title: "Building CI/CD Pipelines for MuleSoft",
    excerpt:
      "The minimum pipeline that makes MuleSoft releases repeatable: build, test, promote, approve, and roll back.",
    date: "2025-09-22",
    readingTime: "6 min",
    featured: false,
    categories: ["CI/CD", "MUnit", "Production Support"],
    body: [
      "A MuleSoft pipeline is doing its job when someone who did not write the application can promote a tested artifact without opening Anypoint Studio.",
      "Put every application in Git with a Maven build that produces the same artifact locally and in CI. If the build requires a hidden Studio setting, the pipeline will drift.",
      "Run MUnit and basic quality checks on every change that might reach a shared environment. Fail the build when tests fail. A yellow pipeline that people ignore is not automation.",
      "Separate configuration from code. Environment endpoints, client credentials, and certificates should be injected at deploy time. That is what makes the same artifact promotable.",
      "Add an approval gate for production and a rollback path that uses a previous artifact, not a hotfix built on a laptop. Jenkins, GitHub Actions, and Azure DevOps can all express this; pick the platform your organization already operates.",
      "Finally, connect deployment to monitoring. A successful deploy is only the start of the release. The people who approved the change should be able to see health, errors, and queue depth in the first hour.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function featuredArticles() {
  return articles.filter((article) => article.featured);
}
