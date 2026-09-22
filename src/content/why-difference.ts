import { siteConfig } from "@/content/site-config";

export type WhyVisual =
  | "connections"
  | "layers"
  | "migration"
  | "security"
  | "testing"
  | "engagement"
  | "leadership"
  | "delivery"
  | "docs"
  | "reuse";

export type WhyReason = {
  title: (typeof siteConfig.why.reasons)[number];
  explanation: string;
  visual: WhyVisual;
};

export const whyReasons: WhyReason[] = [
  {
    title: "MuleSoft-focused technical expertise",
    explanation:
      "The work stays on MuleSoft, APIs, and the systems around them. You get people who already know the runtime, the connectors, and the usual failure modes—without treating every request as a generic software ticket.",
    visual: "connections",
  },
  {
    title: "Architecture and hands-on development capability",
    explanation:
      "Design and implementation sit in the same conversation. An API-led model is useful only if someone can also write the DataWeave, tests, and deployment shape that make it real.",
    visual: "layers",
  },
  {
    title: "Migration and modernization experience",
    explanation:
      "Mule 3, CloudHub, and Java upgrades are planned as assessments with tests and rollback—not as a weekend cutover. The goal is a runtime you can operate, not only one that starts.",
    visual: "migration",
  },
  {
    title: "API security and governance knowledge",
    explanation:
      "Identity, policies, and secrets are part of the design. Client credentials, rate limits, and an owner for rotation are agreed before an API is treated as production-ready.",
    visual: "security",
  },
  {
    title: "Strong testing and delivery standards",
    explanation:
      "MUnit, reviews, and a pipeline that can fail closed belong in the same increment as the feature. A change is ready when a second person can promote a tested artifact.",
    visual: "testing",
  },
  {
    title: "Flexible engagement models",
    explanation:
      "Augment a team, stand up a dedicated squad, run a defined project, or keep production supported. The model follows the constraint, not a single packaged offering.",
    visual: "engagement",
  },
  {
    title: "Direct access to senior technical leadership",
    explanation:
      "Architecture and delivery questions reach people who still read the code. You are not limited to an account layer when a design or incident needs a technical answer.",
    visual: "leadership",
  },
  {
    title: "Philippines-based global delivery",
    explanation:
      "Delivery is based in the Philippines, with remote collaboration across Asia-Pacific, Australia, New Zealand, Europe, and North America. Timezone coverage and English-language delivery are part of how the work is staffed.",
    visual: "delivery",
  },
  {
    title: "Documentation and knowledge transfer",
    explanation:
      "Decisions, runbooks, and contracts are written down and handed over. The integration should remain operable after the engagement, not only while the original authors are on the call.",
    visual: "docs",
  },
  {
    title: "Maintainable, reusable solutions",
    explanation:
      "System APIs, shared error shapes, and documented mappings are preferred over one-off scripts. The next project should be able to find and reuse what this one created.",
    visual: "reuse",
  },
];
