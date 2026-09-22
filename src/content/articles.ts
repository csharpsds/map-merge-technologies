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

export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  featured: boolean;
  categories: InsightCategory[];
  sections: ArticleSection[];
  takeaways: string[];
};

export function articleParagraphs(article: Article) {
  return article.sections.flatMap((section) => section.paragraphs);
}

export const articles: Article[] = [
  {
    slug: "planning-mule-3-to-mule-4-migration",
    title: "Planning a Mule 3 to Mule 4 Migration",
    excerpt:
      "A working sequence for cataloguing applications, replacing transports, rewriting DataWeave, and slicing cutover without treating Mule 4 as a compiler upgrade.",
    date: "2026-03-12",
    readingTime: "14 min",
    featured: true,
    categories: ["Migration", "MuleSoft Development", "Architecture"],
    takeaways: [
      "Treat Mule 4 as a redesign of transports, error handling, and DataWeave—not a rebuild of the same XML.",
      "Group cutover by system of record, not by Anypoint business group or folder name.",
      "Write MUnit around business-rule transformations before anyone “tidies” them.",
      "A slice is finished when the new application is operable, not when the old runtime is off.",
    ],
    sections: [
      {
        id: "why-migrations-stall",
        heading: "Why these programs stall",
        paragraphs: [
          "A Mule 3 to Mule 4 migration fails most often because it is treated as a compiler upgrade. The language, connectors, error-handling model, and transport behavior changed enough that a line-by-line rewrite without an inventory produces surprises in production.",
          "Teams also underestimate shared risk. Two applications that look independent in Runtime Manager often share a Salesforce object, a file drop, or a downstream batch window. Moving one without the other leaves a half-cutover that is hard to explain to operations.",
          "The useful plan is therefore boring: catalogue what exists, decide what the replacement is, prove it on a low-risk slice, then repeat. The rest of this note is that sequence.",
        ],
      },
      {
        id: "build-the-catalog",
        heading: "Build an application catalog first",
        paragraphs: [
          "Start with an application catalog: runtime version, connectors, custom Java, inbound transports, scheduled jobs, and the business process each application serves. Record who pages when it fails. If nobody can name an owner, that application is already a migration risk.",
          "Group applications that share a system of record. A payroll interface and a product-catalog feed should not share a cutover window just because they sit in the same business group. Shared credentials, shared queues, and shared file directories are better grouping keys than project names.",
          "Flag anything that still uses deprecated transports, MEL, or custom Java that wraps a library with no Java 17 story. Those items set the critical path more than the count of applications on a slide.",
        ],
      },
      {
        id: "replace-transports",
        heading: "Replace transports and connectors on purpose",
        paragraphs: [
          "Assess connector and transport replacements next. Many Mule 3 patterns depended on inbound transports that no longer exist in the same form. The replacement is usually an HTTP listener, a module, or an explicit connector—not an automatic mapping.",
          "Capture those replacements in the assessment so estimates include design work. “Same connector, new version” is a different estimate from “HTTP listener plus Object Store plus a scheduler that used to be a transport.”",
          "Do the same for outbound connections. A database connector that used a transport-specific retry story may now need an explicit until-successful or a circuit around a shared pool. Write that down before a developer discovers it in a production-like environment.",
        ],
      },
      {
        id: "dataweave-and-tests",
        heading: "Treat DataWeave as a rewrite surface",
        paragraphs: [
          "DataWeave 2.0 is a benefit, but it is also a rewrite surface. Identify the transformations that encode business rules: tax, status, customer matching, and any field that finance or operations will notice if it is wrong.",
          "Those mappings deserve tests before anyone refactors them “while we are here.” MUnit around those flows is part of the migration, not a later quality initiative. A sample vendor payload is not enough; include empty collections, unexpected enums, and the one record that arrives twice.",
          "If a transformation is undocumented, freeze current behavior with tests first. Improving the mapping is a second increment. Mixing both in one pull request is how silent functional change enters the new runtime.",
        ],
      },
      {
        id: "slice-cutover",
        heading: "Slice cutover and write rollback",
        paragraphs: [
          "Plan cutover in slices. Move a low-risk application first to prove the pipeline, environment variables, secret injection, and rollback path. Keep a written rollback for each slice: previous artifact, configuration, and the person who can authorize the reversal.",
          "Avoid a “big bang weekend” unless the landscape truly has one inbound and one outbound. Most estates have overlapping schedules. A slice that can run in parallel with the old application for a short window is safer than a hard cut that nobody can reverse after midnight.",
          "Migration is finished when the new application is operable—logged, monitored, and understood by the people who will support it—not when the old runtime is merely switched off.",
        ],
      },
    ],
  },
  {
    slug: "cloudhub-1-to-2-readiness",
    title: "CloudHub 1.0 to CloudHub 2.0 Readiness",
    excerpt:
      "What to inspect in networking, configuration, deployment shape, and rollback before you schedule a CloudHub 2.0 move.",
    date: "2026-02-18",
    readingTime: "13 min",
    featured: true,
    categories: ["CloudHub 2.0", "Migration", "Production Support"],
    takeaways: [
      "Inventory destinations, private spaces, and allowlists before you copy an application into a new runtime.",
      "Split application config from platform secrets so the same artifact can promote.",
      "A health check is not a traffic test. Prove batch size, streaming, and long-lived connections.",
      "Readiness is three answers: application change, network change, and who can reverse it.",
    ],
    sections: [
      {
        id: "not-a-checkbox",
        heading: "This is not a Runtime Manager checkbox",
        paragraphs: [
          "CloudHub 2.0 is not a checkbox in Runtime Manager. Networking, private spaces, deployment descriptors, and some operational assumptions change. Teams that copy an existing application and hope the new runtime accepts it usually discover the gaps during the first production promotion.",
          "Treat the move as a hosting modernization with a testable checklist. If you also intend to change Java versions or rewrite connectors in the same window, isolate those increments or accept that diagnosis will take longer.",
        ],
      },
      {
        id: "connectivity",
        heading: "Start with connectivity",
        paragraphs: [
          "Begin with connectivity. Inventory allowlists, VPNs, Private Spaces, and the destinations each application reaches. A move that looks simple in a non-production region can fail when production DNS, egress, or mutual TLS is different.",
          "Write down inbound paths as well. Partners who still call a CloudHub 1.0 URL, a custom domain, or a load-balancer rule will not update themselves because a new replica is healthy. The cutover plan needs a DNS or gateway owner, not only a MuleSoft developer.",
          "If an application talks to an on-premises system, confirm that the new private space or VPN path is actually provisioned. “We have a VPN somewhere” is not an answer you want during a release window.",
        ],
      },
      {
        id: "configuration",
        heading: "Clean configuration before the window",
        paragraphs: [
          "Review how configuration is injected today. Properties, secure properties, and secrets that were acceptable on CloudHub 1.0 may need a cleaner split between application config and platform secrets.",
          "Do that work before the cutover window, not during it. Developers copying a local properties file into a new environment is the most common way a CloudHub 2.0 move inherits the last environment’s credentials.",
          "Name the configuration keys you will keep. If two applications share a client id because “it was easier,” split them now. Shared credentials make rollback and rotation harder after the hosting change.",
        ],
      },
      {
        id: "pipelines",
        heading: "Update the pipeline in the same increment",
        paragraphs: [
          "Update CI/CD in the same increment as the hosting change. If people still deploy from a workstation, the new model will inherit the same operational risk. Maven builds, automated tests, and an explicit rollback artifact should exist before the first production application moves.",
          "The deploy descriptor will change. Treat that as code: review it, store it, and make sure a second person can run the promotion. A pipeline that only one contractor understands is not readiness.",
        ],
      },
      {
        id: "prove-traffic",
        heading: "Prove traffic, then name the reversal",
        paragraphs: [
          "Validate with production-like traffic patterns. A successful health check does not prove that batch size, streaming, or long-running connections behave the same way. Keep monitoring and log searches ready for the first hours after cutover.",
          "Readiness means you can answer three questions: what must change in the application, what must change in the network, and who can reverse the change if the new environment misbehaves.",
        ],
      },
    ],
  },
  {
    slug: "java-17-modernization-mulesoft",
    title: "Java 17 Modernization for MuleSoft",
    excerpt:
      "How to treat a Java 8 to Java 17 move as an application and connector review, not only a runtime setting.",
    date: "2026-01-27",
    readingTime: "12 min",
    featured: true,
    categories: ["Java 17", "Migration", "MuleSoft Development"],
    takeaways: [
      "Inventory custom Java and community libraries before you change the runtime dropdown.",
      "Supported on the target Java version is a stronger claim than “it still deploys.”",
      "Run the existing MUnit suite on a matching non-production runtime first.",
      "Do not combine Java 17 with an unplanned Mule 3 rewrite in the same window.",
    ],
    sections: [
      {
        id: "not-a-dropdown",
        heading: "More than a runtime dropdown",
        paragraphs: [
          "Java 17 modernization on MuleSoft is rarely just a runtime dropdown. Custom Java, older connectors, and libraries compiled against Java 8 can fail in ways that do not appear until a specific flow executes.",
          "The failures are often narrow: a SOAP client, a cryptography default, or a reflection call inside a community library. That is why a green deploy is a weak signal. You need the flows that actually use the custom code.",
        ],
      },
      {
        id: "inventory-java",
        heading: "Inventory custom Java first",
        paragraphs: [
          "Inventory every application that still ships custom Java or community libraries. Those are the first review targets. If a library has no Java 17-compatible release, decide whether to replace the library, isolate the code, or sequence that application later.",
          "Ask for source, not only a JAR. A compiled helper that nobody can rebuild is already a modernization blocker. Budget time to re-home that logic in DataWeave or a supported module where you can.",
        ],
      },
      {
        id: "connectors",
        heading: "Confirm connector support, not just deployability",
        paragraphs: [
          "Connector compatibility comes next. Confirm that the connector versions you intend to run are supported on the target runtime and Java version. A connector that “still deploys” is not the same as a connector that is supported.",
          "Where a connector upgrade is required, treat it as its own change: read the release notes, update configuration, and add a test around the operation you actually call. Upgrading “everything at once” hides which connector broke a mapping.",
        ],
      },
      {
        id: "test-on-target",
        heading: "Test on a matching runtime",
        paragraphs: [
          "Use a non-production runtime that matches the target Java version and run the existing MUnit suite there. If you do not have a suite, write tests around custom Java and the transformations that call it before you change the runtime. Otherwise you are using production as the test harness.",
          "Watch for removed or changed JVM defaults that affect cryptography, XML, or reflection. These issues show up in security-sensitive or SOAP-heavy applications more often than in simple HTTP proxies.",
        ],
      },
      {
        id: "sequence",
        heading: "Keep the increment isolated",
        paragraphs: [
          "Treat Java 17 as a planned modernization increment: assess, replace, test, then promote. Combining it with an unplanned CloudHub or Mule 3 rewrite in the same window multiplies the number of things that can fail at once.",
          "If leadership wants one program name, still keep separate checklists. The person diagnosing a TLS handshake should not also be guessing whether a DataWeave 1.0 rewrite is the cause.",
        ],
      },
    ],
  },
  {
    slug: "designing-reusable-api-led-integrations",
    title: "Designing Reusable API-led Integrations",
    excerpt:
      "How to keep system, process, and experience APIs useful after the first project that created them.",
    date: "2025-12-09",
    readingTime: "13 min",
    featured: true,
    categories: ["Architecture", "API Design", "MuleSoft Development"],
    takeaways: [
      "Give each layer one job. A system API that orchestrates is already a reuse problem.",
      "Publish the contract before implementation. Consumers should not read DataWeave to learn a field name.",
      "Do not force three layers on day one. Add them when a second consumer or a real orchestration appears.",
      "Reuse is a review habit: search Exchange, refuse silent bypasses, keep docs current.",
    ],
    sections: [
      {
        id: "easy-to-abandon",
        heading: "Easy to draw, easy to abandon",
        paragraphs: [
          "API-led connectivity is easy to draw and easy to abandon. The first project often creates a system API that is really a process API, or an experience API that embeds system-specific identifiers. The second project then bypasses the layers because they are not reusable.",
          "The diagram is not the architecture. The architecture is whether a new consumer can find a contract, trust the error model, and avoid opening the backend system again.",
        ],
      },
      {
        id: "layer-jobs",
        heading: "Give each layer a job",
        paragraphs: [
          "System APIs speak the language of one system of record. They hide connector quirks, pagination oddities, and authentication details. They should not embed a multi-step business process.",
          "Process APIs orchestrate business actions that span systems. Experience APIs shape a contract for a channel. If a layer is doing two jobs, later consumers will not trust it and will build a private path.",
        ],
      },
      {
        id: "contracts-first",
        heading: "Design the contract first",
        paragraphs: [
          "RAML or OpenAPI should describe resources, errors, and pagination before implementation starts. A consumer who has to read DataWeave to understand a field name is not consuming an API—they are reading an implementation.",
          "Agree an error envelope. Scattered 500s with connector text in the payload train every consumer to parse your internals. Version the contract when you break it; do not silently reshape a field because a new project preferred a different name.",
        ],
      },
      {
        id: "governance",
        heading: "Make governance followable",
        paragraphs: [
          "Reuse needs governance that developers can follow: naming, versioning, error envelopes, and a place to find existing APIs. Anypoint Exchange only helps if teams actually publish and search before they build.",
          "A review that only asks “did you use three layers?” will produce three layers of the same leaky contract. Ask instead: who is the consumer, what is reused, and what would a second consumer have to copy?",
        ],
      },
      {
        id: "grow-layers",
        heading: "Grow layers when they earn their keep",
        paragraphs: [
          "Do not force every integration through three layers on day one. A thin system API in front of a difficult legacy system is already an improvement. Add process and experience APIs when a second consumer appears or a business orchestration becomes real.",
          "Reusable architecture is a habit: review new designs against the catalog, refuse silent bypasses, and keep the documentation as current as the code.",
        ],
      },
    ],
  },
  {
    slug: "improving-munit-test-coverage",
    title: "Improving MUnit Test Coverage",
    excerpt:
      "Where MUnit pays off, what not to measure, and how to keep tests useful during migrations.",
    date: "2025-11-04",
    readingTime: "12 min",
    featured: false,
    categories: ["MUnit", "MuleSoft Development", "CI/CD"],
    takeaways: [
      "Cover business-rule DataWeave and error paths before you chase a coverage percentage.",
      "Mock at the connector boundary so MUnit stays fast when Salesforce is down.",
      "Keep tests in Git and fail the Maven build when they fail.",
      "Missing tests are migration scope, not a later quality program.",
    ],
    sections: [
      {
        id: "weak-goal",
        heading: "Coverage percentages are a weak goal",
        paragraphs: [
          "A suite that asserts HTTP 200 on every flow can report a high number and still miss the DataWeave branch that corrupts an amount field. Coverage is a hint, not a release criterion.",
          "Prefer a short list of risks: money, identity, status, and any mapping that operations cannot correct by hand. Write examples for those first.",
        ],
      },
      {
        id: "what-to-test",
        heading: "Test the rules, not the happy path only",
        paragraphs: [
          "If a mapping decides tax, status, or customer matching, it needs examples for the unusual inputs—not only the sample payload from the vendor demo.",
          "Error paths matter as much as success. A flow that swallows a connector fault and acknowledges a message is a production incident waiting for volume. Assert the error type you expect and the payload you refuse to ack.",
        ],
      },
      {
        id: "mock-boundary",
        heading: "Mock at the connector boundary",
        paragraphs: [
          "Tests that require a live Salesforce org or an ERP sandbox are integration tests; they belong in a different stage. MUnit should keep developers fast when those systems are unavailable.",
          "Mock the connector operation you call, not an entire HTTP stack if you can avoid it. The test should fail when the transformation changes, not when a sandbox password expires.",
        ],
      },
      {
        id: "in-the-pipeline",
        heading: "Put the suite where the pipeline can fail",
        paragraphs: [
          "Keep tests next to the application in source control and run them in Maven on every meaningful pipeline. A suite that only runs on one laptop will not protect a migration.",
          "A yellow pipeline that people ignore is not automation. Fail the build. If a test is flaky, fix the test or delete it. Do not teach the team to skip the stage.",
        ],
      },
      {
        id: "migration-scope",
        heading: "Treat missing tests as migration scope",
        paragraphs: [
          "When you modernize Mule 3 or CloudHub applications, treat missing tests as migration scope. Rewriting a flow without capturing current behavior is how silent functional change enters production.",
          "The useful metric is whether a known class of defect would now fail the build—not whether a dashboard shows a round number.",
        ],
      },
    ],
  },
  {
    slug: "securing-enterprise-apis",
    title: "Securing Enterprise APIs",
    excerpt:
      "A working order for identity, policies, secrets, and review so APIs are not exposed on hope.",
    date: "2025-10-15",
    readingTime: "13 min",
    featured: false,
    categories: ["API Security", "Architecture", "Production Support"],
    takeaways: [
      "Decide who the client is before you pick OAuth, JWT, or mutual TLS.",
      "Apply rate limits and throttling as runtime protection, not only as a compliance line.",
      "Keep secrets out of property files developers copy between machines.",
      "Every new API should pass the same checklist and have an owner for rotation.",
    ],
    sections: [
      {
        id: "ordinary-failures",
        heading: "Ordinary reasons APIs fail review",
        paragraphs: [
          "Enterprise APIs fail security reviews for ordinary reasons: a client id shared across environments, a secret in a property file, or no rate limit on an expensive process API.",
          "The fix is a repeatable order, not a new product. Identity, policy, secrets, logging, then an owner. Skip a step and the next project will reintroduce the same gap.",
        ],
      },
      {
        id: "identity",
        heading: "Start with identity",
        paragraphs: [
          "Decide who the client is—application, partner, or user-on-behalf-of—and use OAuth 2.0, OpenID Connect, JWT, or mutual TLS accordingly. Client ID enforcement is a baseline, not a complete model for sensitive data.",
          "Do not share one client across non-production and production. Rotation then becomes a coordinated outage. Issue separate clients and document who may request a new secret.",
        ],
      },
      {
        id: "policies",
        heading: "Apply policies as runtime protection",
        paragraphs: [
          "Apply API Manager policies consistently. Rate limiting, throttling, and IP allowlisting protect shared runtimes as much as they protect data. A noisy consumer should not be able to starve every other API on the same worker.",
          "Write down the intended policy set per layer. Experience APIs facing partners usually need a stricter envelope than an internal system API that already sits behind a private network. Inconsistency is how a “temporary” exception becomes the production path.",
        ],
      },
      {
        id: "secrets-and-logs",
        heading: "Secrets and logs",
        paragraphs: [
          "Move secrets out of application configuration that developers copy between machines. Secrets Manager or your organization’s vault should be the source of credentials, certificates, and signing keys.",
          "Log enough to investigate, not enough to leak. Audit who called an API and whether policy denied them. Avoid writing payloads that contain credentials or personal data into default application logs.",
        ],
      },
      {
        id: "review-habit",
        heading: "Make security a review habit",
        paragraphs: [
          "New APIs should pass the same checklist: identity, policy, secret handling, versioning, and an owner who will respond when a credential needs rotation.",
          "If you cannot name the owner, the API is already under-supported. Assign one before the first partner is onboarded.",
        ],
      },
    ],
  },
  {
    slug: "building-cicd-pipelines-mulesoft",
    title: "Building CI/CD Pipelines for MuleSoft",
    excerpt:
      "The minimum pipeline that makes MuleSoft releases repeatable: build, test, promote, approve, and roll back.",
    date: "2025-09-22",
    readingTime: "12 min",
    featured: false,
    categories: ["CI/CD", "MUnit", "Production Support"],
    takeaways: [
      "A second person should be able to promote a tested artifact without opening Studio.",
      "The same Maven build must work locally and in CI.",
      "Inject environment endpoints and secrets at deploy time, not in the artifact.",
      "A successful deploy is the start of the release. Watch health in the first hour.",
    ],
    sections: [
      {
        id: "job-of-pipeline",
        heading: "What the pipeline is for",
        paragraphs: [
          "A MuleSoft pipeline is doing its job when someone who did not write the application can promote a tested artifact without opening Anypoint Studio.",
          "If only the original developer can release, you have a personal workflow. That is fine for a spike. It is not fine for a shared runtime that operations will page.",
        ],
      },
      {
        id: "same-artifact",
        heading: "One artifact, two places",
        paragraphs: [
          "Put every application in Git with a Maven build that produces the same artifact locally and in CI. If the build requires a hidden Studio setting, the pipeline will drift.",
          "Pin versions you care about. A connector that resolves to “whatever Maven found today” is how two environments silently diverge.",
        ],
      },
      {
        id: "fail-closed",
        heading: "Fail closed on tests",
        paragraphs: [
          "Run MUnit and basic quality checks on every change that might reach a shared environment. Fail the build when tests fail.",
          "If the suite is slow, split unit-like MUnit from slower contract checks. Do not delete the slow stage; put it where it still gates promotion.",
        ],
      },
      {
        id: "config-split",
        heading: "Separate configuration from code",
        paragraphs: [
          "Environment endpoints, client credentials, and certificates should be injected at deploy time. That is what makes the same artifact promotable.",
          "Name the variables. A spreadsheet in a chat thread is not configuration management. The pipeline should know which keys each environment requires before it deploys.",
        ],
      },
      {
        id: "approve-and-watch",
        heading: "Approve, roll back, then watch",
        paragraphs: [
          "Add an approval gate for production and a rollback path that uses a previous artifact, not a hotfix built on a laptop. Jenkins, GitHub Actions, and Azure DevOps can all express this; pick the platform your organization already operates.",
          "Finally, connect deployment to monitoring. A successful deploy is only the start of the release. The people who approved the change should be able to see health, errors, and queue depth in the first hour.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function featuredArticles() {
  return articles.filter((article) => article.featured);
}

export function relatedArticles(article: Article, limit = 3) {
  return articles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      candidate,
      score: candidate.categories.filter((category) => article.categories.includes(category)).length,
    }))
    .sort((left, right) => right.score - left.score || right.candidate.date.localeCompare(left.candidate.date))
    .slice(0, limit)
    .map((entry) => entry.candidate);
}
