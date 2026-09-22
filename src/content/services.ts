export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  cardDescription: string;
  heroDescription: string;
  featured: boolean;
  icon: "network" | "api" | "refresh" | "layers" | "git" | "shield" | "headset" | "test" | "graduation";
  capabilitiesPreview: [string, string, string];
  capabilities: string[];
  problem: string;
  approach: string;
  outcomes: string[];
  technologies: string[];
  relatedCaseStudies: string[];
  relatedServices: string[];
  faqs: ServiceFaq[];
};

export const services: Service[] = [
  {
    slug: "mulesoft-architecture",
    title: "MuleSoft Architecture and Strategy",
    shortTitle: "MuleSoft Architecture",
    cardDescription:
      "Shape a reusable integration landscape before more point-to-point connections accumulate.",
    heroDescription:
      "Define the platform, API layers, security model, and delivery standards that keep MuleSoft programs maintainable as they grow.",
    featured: true,
    icon: "network",
    capabilitiesPreview: [
      "API-led connectivity",
      "Platform architecture",
      "Design reviews",
    ],
    capabilities: [
      "Integration landscape assessment",
      "API and integration strategy",
      "API-led connectivity",
      "Platform architecture",
      "Environment planning",
      "Cloud, on-premises, and hybrid integration",
      "Security architecture",
      "API governance",
      "Reusable standards",
      "Scalability planning",
      "Architecture documentation",
      "Design reviews",
    ],
    problem:
      "Many integration programs start with a single urgent connection and never recover a coherent design. Applications multiply, environments drift, and every new request becomes a custom exception instead of a reusable capability.",
    approach:
      "We assess the current landscape, agree the target API-led model, and document the standards your teams can apply on the next project—not only in a slide deck. Architecture work is paired with delivery reality: runtime choices, environment strategy, and governance that developers can follow.",
    outcomes: [
      "A clear system and API map instead of undocumented connections",
      "Reusable patterns for system, process, and experience APIs",
      "Security and environment decisions that teams can implement consistently",
      "Design reviews that reduce rework before development starts",
    ],
    technologies: [
      "Anypoint Platform",
      "API-led connectivity",
      "CloudHub",
      "Runtime Fabric",
      "Private Spaces",
      "API Manager",
    ],
    relatedCaseStudies: [
      "government-case-lifecycle-integration",
      "enterprise-cloudhub-modernization",
    ],
    relatedServices: ["api-development", "security-governance", "migration-modernization"],
    faqs: [
      {
        question: "Do we need a full architecture engagement before any development?",
        answer:
          "Not always. Short design reviews can unblock a single initiative. A broader architecture engagement is more useful when several teams are building at once or a migration is about to reshape the platform.",
      },
      {
        question: "Can you work with an existing integration strategy?",
        answer:
          "Yes. We review what is already working, identify gaps, and refine standards rather than replacing a useful model for the sake of a rewrite.",
      },
    ],
  },
  {
    slug: "api-development",
    title: "API Design and Development",
    shortTitle: "API Development",
    cardDescription:
      "Design and build Mule 4 APIs that are documented, testable, and ready for reuse.",
    heroDescription:
      "Take APIs from specification to production with design-first contracts, DataWeave transformations, and MUnit coverage.",
    featured: true,
    icon: "api",
    capabilitiesPreview: [
      "Design-first APIs",
      "DataWeave transformations",
      "MUnit testing",
    ],
    capabilities: [
      "RAML and OpenAPI specifications",
      "Design-first API development",
      "Mule 4 application development",
      "REST and SOAP services",
      "DataWeave transformations",
      "Batch processing",
      "Event-driven integration",
      "Reusable connectors",
      "Error handling",
      "Logging",
      "MUnit testing",
      "API documentation",
      "API lifecycle management",
    ],
    problem:
      "APIs that are coded first and specified later become hard to consume, hard to test, and hard to change. Error handling and logging are often added after the first production incident.",
    approach:
      "We start from the contract, then implement Mule 4 applications with consistent error handling, logging, and automated tests. Transformations, batch jobs, and event-driven flows are designed so they can be operated—not only demonstrated.",
    outcomes: [
      "Published specifications that consumers can rely on",
      "Mule 4 applications with predictable error and retry behavior",
      "Automated tests that protect later changes",
      "Documentation that supports onboarding and support",
    ],
    technologies: [
      "Mule 4",
      "RAML",
      "OpenAPI",
      "DataWeave",
      "Anypoint Studio",
      "MUnit",
    ],
    relatedCaseStudies: [
      "customer-support-synchronization",
      "erp-construction-platform-integration",
    ],
    relatedServices: ["mulesoft-architecture", "testing-quality", "security-governance"],
    faqs: [
      {
        question: "Do you work design-first or code-first?",
        answer:
          "We prefer design-first with RAML or OpenAPI so consumers and testers share one contract. We can still stabilize an existing code-first API when that is the practical starting point.",
      },
      {
        question: "Can you take over an incomplete Mule 4 application?",
        answer:
          "Yes. We review the current flows, tests, and documentation, then complete or refactor the work against agreed quality standards.",
      },
    ],
  },
  {
    slug: "migration-modernization",
    title: "Migration and Modernization",
    shortTitle: "Migration",
    cardDescription:
      "Move Mule 3, CloudHub 1.0, and Java 8 estates forward with a planned, testable path.",
    heroDescription:
      "Modernize runtimes, connectors, and hosting models—including Mule 3 to 4, CloudHub 2.0, Java 17, Runtime Fabric, and Private Spaces.",
    featured: true,
    icon: "refresh",
    capabilitiesPreview: [
      "Mule 3 to Mule 4",
      "CloudHub 2.0 migration",
      "Java 17 modernization",
    ],
    capabilities: [
      "Mule 3 to Mule 4",
      "CloudHub 1.0 to CloudHub 2.0",
      "Java 8 to Java 17",
      "Runtime upgrades",
      "Connector upgrades",
      "Runtime Fabric migration",
      "Private Spaces",
      "Deprecated component replacement",
      "Compatibility assessment",
      "Performance optimization",
      "Regression testing",
      "Deployment planning",
      "Rollback planning",
      "Post-migration support",
    ],
    problem:
      "Older MuleSoft applications continue to run until a runtime, connector, or hosting change becomes unavoidable. Without an assessment and a rollback plan, modernization turns into an emergency rewrite.",
    approach:
      "We start with compatibility and dependency assessment, then sequence runtime, Java, and CloudHub changes so production risk stays visible. Testing, deployment, and rollback are part of the plan, not a final surprise.",
    outcomes: [
      "A sequenced modernization path instead of a single risky cutover",
      "Applications updated for supported runtimes and connectors",
      "Regression evidence before production validation",
      "Post-migration support while the new platform settles",
    ],
    technologies: [
      "Mule 4",
      "CloudHub 2.0",
      "Java 17",
      "Runtime Fabric",
      "Private Spaces",
      "MUnit",
    ],
    relatedCaseStudies: ["enterprise-cloudhub-modernization"],
    relatedServices: ["devops-cicd", "testing-quality", "managed-services"],
    faqs: [
      {
        question: "Can Mule 3 applications be migrated incrementally?",
        answer:
          "Often yes. We group applications by dependency and risk so some services can move while others remain on the current runtime until they are ready.",
      },
      {
        question: "Do you migrate only the runtime, or also the architecture?",
        answer:
          "Both are possible. Some customers need a like-for-like runtime move first. Others use the migration to introduce API-led boundaries and retire brittle point-to-point flows.",
      },
    ],
  },
  {
    slug: "enterprise-integration",
    title: "Enterprise System Integration",
    shortTitle: "Enterprise Integration",
    cardDescription:
      "Connect ERP, CRM, messaging, files, and SaaS platforms through reliable MuleSoft flows.",
    heroDescription:
      "Synchronize business data across Salesforce, SAP, Workday, messaging platforms, databases, and legacy systems without fragile point-to-point scripts.",
    featured: true,
    icon: "layers",
    capabilitiesPreview: [
      "ERP and CRM connectivity",
      "Messaging and events",
      "File and SaaS integration",
    ],
    capabilities: [
      "Salesforce",
      "SAP",
      "Workday",
      "ERP",
      "CRM",
      "Databases",
      "IBM MQ and JMS",
      "Kafka",
      "Amazon SQS",
      "E-commerce platforms",
      "SaaS applications",
      "Legacy applications",
      "SFTP and file processing",
    ],
    problem:
      "Operational teams cannot wait for overnight file drops or manual re-keying. When ERP, CRM, and specialist platforms stay disconnected, exceptions pile up and nobody trusts the data.",
    approach:
      "We design integrations around the real business event—orders, cases, vendors, tickets—then choose the right pattern: API, queue, batch, or file. Validation, compensation, and monitoring are built in so failures are recoverable.",
    outcomes: [
      "Shared operational data across the systems people already use",
      "Clear ownership of each interface and error path",
      "Fewer manual workarounds between platforms",
      "Monitoring that shows when synchronization falls behind",
    ],
    technologies: [
      "Salesforce",
      "SAP",
      "Workday",
      "IBM MQ",
      "Kafka",
      "Amazon SQS",
      "SFTP",
    ],
    relatedCaseStudies: [
      "erp-construction-platform-integration",
      "customer-support-synchronization",
      "government-case-lifecycle-integration",
    ],
    relatedServices: ["api-development", "mulesoft-architecture", "managed-services"],
    faqs: [
      {
        question: "Do you only integrate Salesforce?",
        answer:
          "No. Salesforce is a frequent system of engagement, but we also connect ERP, HR, messaging, databases, commerce, and legacy applications.",
      },
      {
        question: "What if a system has no modern API?",
        answer:
          "We use the interface that exists—SOAP, files, queues, or database access—then isolate it behind a system API so the rest of the landscape does not inherit that constraint.",
      },
    ],
  },
  {
    slug: "devops-cicd",
    title: "DevOps and CI/CD",
    shortTitle: "DevOps and CI/CD",
    cardDescription:
      "Replace manual MuleSoft deployments with tested, approvable, repeatable pipelines.",
    heroDescription:
      "Automate build, test, promotion, and rollback for MuleSoft applications using Maven, Git, and the CI platform you already run.",
    featured: true,
    icon: "git",
    capabilitiesPreview: [
      "Pipeline design",
      "Automated MUnit execution",
      "Release management",
    ],
    capabilities: [
      "Pipeline design",
      "Azure DevOps",
      "GitHub Actions",
      "Jenkins",
      "Maven",
      "Version control",
      "Automated MUnit execution",
      "Code-quality checks",
      "Environment deployments",
      "Secure configuration",
      "Release management",
      "Approval workflows",
      "Rollback automation",
      "Monitoring and logging",
    ],
    problem:
      "Manual Studio deploys and environment-specific configuration make every release a specialist task. Defects that tests could have caught arrive in production instead.",
    approach:
      "We put MuleSoft applications into version control with Maven builds, automated MUnit, and promotion rules that match your approval process. Secrets stay out of source, and rollback is a planned path rather than a late-night rebuild.",
    outcomes: [
      "Repeatable promotions across development, test, and production",
      "Automated tests running on every meaningful change",
      "Safer handling of environment configuration",
      "Release history that operations and audit teams can follow",
    ],
    technologies: [
      "Maven",
      "Git",
      "Azure DevOps",
      "GitHub Actions",
      "Jenkins",
      "MUnit",
    ],
    relatedCaseStudies: ["enterprise-cloudhub-modernization"],
    relatedServices: ["testing-quality", "migration-modernization", "managed-services"],
    faqs: [
      {
        question: "Which CI platform do you use?",
        answer:
          "We work with Azure DevOps, GitHub Actions, and Jenkins. The right choice is usually the platform your organization already operates.",
      },
      {
        question: "Can pipelines include approvals for production?",
        answer:
          "Yes. Automated checks can run on every commit while production still requires a human approval step.",
      },
    ],
  },
  {
    slug: "security-governance",
    title: "API Security and Governance",
    shortTitle: "Security and Governance",
    cardDescription:
      "Apply policies, identity, and auditability so APIs can be exposed without guesswork.",
    heroDescription:
      "Harden MuleSoft APIs with OAuth, mTLS, rate limits, secrets management, and governance standards your teams can reuse.",
    featured: false,
    icon: "shield",
    capabilitiesPreview: [
      "OAuth 2.0 and JWT",
      "API Manager policies",
      "Secrets management",
    ],
    capabilities: [
      "OAuth 2.0",
      "OpenID Connect",
      "JWT",
      "Client ID enforcement",
      "Mutual TLS",
      "IP allowlisting",
      "Rate limiting",
      "Throttling",
      "API Manager policies",
      "Secrets management",
      "API versioning",
      "Governance standards",
      "Audit logging",
      "Security reviews",
    ],
    problem:
      "APIs often reach consumers before identity, throttling, and secret handling are consistent. Governance then becomes a late review instead of a shared standard.",
    approach:
      "We review how APIs are exposed today, then apply API Manager policies, identity flows, and secret handling that match the sensitivity of the data. Versioning and audit logging are treated as part of the contract.",
    outcomes: [
      "Consistent access control across APIs",
      "Rate and threat controls that protect shared runtimes",
      "Secrets kept out of application configuration files",
      "Reviewable evidence for security and operations teams",
    ],
    technologies: [
      "API Manager",
      "OAuth 2.0",
      "OpenID Connect",
      "JWT",
      "Mutual TLS",
      "Secrets Manager",
    ],
    relatedCaseStudies: ["government-case-lifecycle-integration"],
    relatedServices: ["mulesoft-architecture", "api-development", "managed-services"],
    faqs: [
      {
        question: "Can you work within an existing identity provider?",
        answer:
          "Yes. We typically integrate with the identity platform you already operate rather than introducing a parallel authentication model.",
      },
      {
        question: "Is this only for externally published APIs?",
        answer:
          "No. Internal APIs still need client identity, logging, and rate controls—especially when multiple teams share the same platform.",
      },
    ],
  },
  {
    slug: "managed-services",
    title: "Managed MuleSoft Services",
    shortTitle: "Managed Services",
    cardDescription:
      "Keep production integrations healthy with monitoring, incident response, and planned improvement.",
    heroDescription:
      "Support live MuleSoft applications with monitoring, root-cause analysis, upgrades, and service reporting after go-live.",
    featured: true,
    icon: "headset",
    capabilitiesPreview: [
      "Production support",
      "Platform health checks",
      "Preventive maintenance",
    ],
    capabilities: [
      "Application monitoring",
      "Incident investigation",
      "Production support",
      "Root-cause analysis",
      "Performance tuning",
      "Application enhancements",
      "Platform health checks",
      "Runtime upgrades",
      "Certificate monitoring",
      "Queue monitoring",
      "Dead-letter queue monitoring",
      "Release support",
      "Preventive maintenance",
      "Service reporting",
    ],
    problem:
      "After go-live, integration knowledge often sits with the last project team. Certificates expire, queues back up, and small enhancements compete with production incidents.",
    approach:
      "We establish a support rhythm: monitoring, incident handling, health checks, and a visible backlog for enhancements. The goal is fewer surprises—not only faster reactions when something already failed.",
    outcomes: [
      "A named path for production issues and enhancements",
      "Regular visibility into runtime, queue, and certificate health",
      "Root-cause notes instead of generic restart advice",
      "Planned upgrades instead of emergency platform work",
    ],
    technologies: [
      "Anypoint Monitoring",
      "Runtime Manager",
      "Anypoint MQ",
      "CloudHub",
      "Runtime Fabric",
    ],
    relatedCaseStudies: [
      "enterprise-cloudhub-modernization",
      "customer-support-synchronization",
    ],
    relatedServices: ["devops-cicd", "testing-quality", "migration-modernization"],
    faqs: [
      {
        question: "Is managed support only available after you built the applications?",
        answer:
          "No. We can take on applications we did not originally build after an operational assessment and a documented handover.",
      },
      {
        question: "Do you provide 24/7 coverage by default?",
        answer:
          "Coverage is agreed per engagement. We do not advertise a default follow-the-sun roster that has not been scoped.",
      },
    ],
  },
  {
    slug: "testing-quality",
    title: "Testing and Quality Engineering",
    shortTitle: "Testing and Quality",
    cardDescription:
      "Raise confidence in MuleSoft releases with MUnit, contract tests, and production-readiness reviews.",
    heroDescription:
      "Build the test assets and quality gates that keep integrations stable through migrations, enhancements, and new consumers.",
    featured: false,
    icon: "test",
    capabilitiesPreview: [
      "MUnit development",
      "Integration testing",
      "Production-readiness reviews",
    ],
    capabilities: [
      "MUnit development",
      "Code-coverage improvement",
      "Functional testing",
      "Integration testing",
      "Regression testing",
      "Performance testing",
      "Load testing",
      "Contract testing",
      "Mock services",
      "Production-readiness reviews",
    ],
    problem:
      "Integrations are often tested only through a happy-path demo. Edge cases, partner failures, and volume appear for the first time in production.",
    approach:
      "We add automated MUnit around critical transformations and error paths, then complement that with integration, contract, and targeted performance tests. Mock services keep teams unblocked when a dependency is unavailable.",
    outcomes: [
      "Automated coverage on the flows that change most often",
      "Regression suites that make migrations safer",
      "Earlier detection of contract breaks",
      "A clearer go-live checklist for operations and delivery",
    ],
    technologies: ["MUnit", "Maven", "Mock services", "RAML", "OpenAPI"],
    relatedCaseStudies: ["enterprise-cloudhub-modernization"],
    relatedServices: ["api-development", "devops-cicd", "migration-modernization"],
    faqs: [
      {
        question: "Do you guarantee a specific coverage percentage?",
        answer:
          "No. We improve coverage where it reduces risk—transformations, branching, and error handling—rather than chasing a number that does not reflect production behavior.",
      },
      {
        question: "Can tests run in our existing pipeline?",
        answer:
          "Yes. MUnit and related checks are designed to run in Maven-based pipelines such as Azure DevOps, GitHub Actions, or Jenkins.",
      },
    ],
  },
  {
    slug: "training-enablement",
    title: "Training and Enablement",
    shortTitle: "Training and Enablement",
    cardDescription:
      "Build internal MuleSoft capability through workshops, mentoring, and practical code reviews.",
    heroDescription:
      "Help your team grow from platform fundamentals to architecture mentoring, CI/CD practice, and certification preparation.",
    featured: false,
    icon: "graduation",
    capabilitiesPreview: [
      "Mule 4 and DataWeave",
      "Architecture mentoring",
      "Certification preparation",
    ],
    capabilities: [
      "MuleSoft fundamentals",
      "Mule 4",
      "DataWeave",
      "RAML",
      "API design",
      "MUnit",
      "CI/CD",
      "Architecture mentoring",
      "Code reviews",
      "Certification preparation",
      "Customized workshops",
      "Knowledge transfer",
    ],
    problem:
      "Hiring alone does not create a sustainable MuleSoft practice. Teams need shared standards, review habits, and a way to grow junior engineers without slowing every project.",
    approach:
      "We design enablement around your actual landscape—your APIs, your pipeline, your naming standards. Workshops are paired with code reviews and mentoring so the learning shows up in delivery, not only in slides.",
    outcomes: [
      "Shared vocabulary for API-led design and Mule 4 delivery",
      "Practical DataWeave and MUnit skills on real examples",
      "Review habits that keep quality visible",
      "A clearer path for people preparing for role-based exams",
    ],
    technologies: [
      "Mule 4",
      "DataWeave",
      "RAML",
      "MUnit",
      "Anypoint Studio",
      "CI/CD",
    ],
    relatedCaseStudies: ["enterprise-cloudhub-modernization"],
    relatedServices: ["mulesoft-architecture", "api-development", "testing-quality"],
    faqs: [
      {
        question: "Is this official MuleSoft training?",
        answer:
          "No. We provide practical enablement and certification preparation based on delivery experience. We do not present this as an official MuleSoft or Salesforce training program.",
      },
      {
        question: "Can workshops be tailored to our project?",
        answer:
          "Yes. The most useful sessions use your APIs, naming conventions, and pipeline so the team can apply the material the same week.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function featuredServices() {
  return services.filter((service) => service.featured);
}
