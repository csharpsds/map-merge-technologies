import { siteConfig } from "@/content/site-config";

export type ChallengeVisual =
  | "backlog"
  | "disconnected"
  | "mule3"
  | "cloudhub"
  | "pointToPoint"
  | "capacity"
  | "pipeline"
  | "performance";

export type ChallengeBreakdown = {
  title: (typeof siteConfig.challenges)[number];
  problem: string;
  approach: string;
  practices: string[];
  outcome: string;
  visual: ChallengeVisual;
};

export const challengeBreakdowns: ChallengeBreakdown[] = [
  {
    title: "Growing integration backlogs",
    problem:
      "Requests pile up faster than a small team can design, build, and review them. Urgent connections skip the catalog, and the next project inherits the same queue.",
    approach:
      "Add experienced MuleSoft professionals and match the engagement model to the size of the queue—augmentation for a sprint of work, or a dedicated squad when the backlog is structural.",
    practices: [
      "Experienced MuleSoft professionals",
      "Flexible delivery capacity",
    ],
    outcome:
      "Work can be sequenced and staffed against the actual backlog, instead of waiting for a single overloaded owner to become free.",
    visual: "backlog",
  },
  {
    title: "Disconnected applications and data",
    problem:
      "CRM, ERP, and SaaS each keep their own records. Teams copy fields by hand or build a private path that the next consumer cannot reuse.",
    approach:
      "Introduce a reusable API-led model and write the contracts first—resources, errors, and ownership—so later projects can find a system or process API instead of opening the backend again.",
    practices: [
      "Reusable API-led architecture",
      "Clear integration contracts",
    ],
    outcome:
      "Applications share a documented interface. A second channel should be able to consume the same customer or order API without inventing another connection.",
    visual: "disconnected",
  },
  {
    title: "Legacy Mule 3 applications",
    problem:
      "Mule 3 runtimes, transports, and MEL-era flows do not move as a compiler upgrade. A line-by-line rewrite without an inventory usually fails in production.",
    approach:
      "Assess connectors, DataWeave, and tests first, then modernize in slices with a written rollback. MUnit around business-rule mappings is part of the migration, not a later quality program.",
    practices: [
      "Migration assessment",
      "Modernization",
      "Testing",
    ],
    outcome:
      "The replacement application can be operated and reversed. The old runtime is switched off after the new one is understood, not merely because it deployed.",
    visual: "mule3",
  },
  {
    title: "CloudHub modernization requirements",
    problem:
      "Hosting, private networking, and deployment shape change between CloudHub 1.0 and 2.0. Copying an application into a new runtime often fails on DNS, egress, or configuration.",
    approach:
      "Plan the CloudHub move with compatibility checks, a cleaner split of secrets from application config, and the same secure deployment path you will use after cutover.",
    practices: [
      "Planned CloudHub migration",
      "Compatibility checks",
      "Secure deployment standards",
    ],
    outcome:
      "You can answer what must change in the application, what must change in the network, and who can reverse the promotion if the new environment misbehaves.",
    visual: "cloudhub",
  },
  {
    title: "Unreliable point-to-point integrations",
    problem:
      "Each new pair of systems gets a custom script. Errors stay in one team’s logs, retries are inconsistent, and a noisy consumer can take the whole path down.",
    approach:
      "Replace one-off links with reusable APIs, explicit error handling, and production monitoring so a failure is visible and contained instead of discovered by a business user.",
    practices: [
      "Reusable APIs",
      "Error handling",
      "Production monitoring",
    ],
    outcome:
      "A broken hop has an owner, a log, and a contract. The next consumer should not have to copy a private script to get the same data.",
    visual: "pointToPoint",
  },
  {
    title: "Limited MuleSoft resources",
    problem:
      "Architecture, delivery, and support land on the same few people. When they are on leave or in an incident, the program stalls.",
    approach:
      "Bring specialist MuleSoft support through the engagement model that fits: staff augmentation, a dedicated team, or a time-boxed advisory review.",
    practices: [
      "Specialist support",
      "Flexible engagement models",
    ],
    outcome:
      "Capacity can rise or fall with the program without turning every request into a search for the one person who knows the landscape.",
    visual: "capacity",
  },
  {
    title: "Manual deployment processes",
    problem:
      "Releases depend on Studio, a workstation, or an undocumented checklist. Two environments drift, and rollback means building a hotfix by hand.",
    approach:
      "Put Maven builds, automated tests, and an approval gate in a pipeline so the same artifact can promote. Rollback uses the previous artifact, not a laptop build.",
    practices: [
      "Automated CI/CD pipelines",
      "Repeatable release practices",
    ],
    outcome:
      "Someone who did not write the application can promote a tested artifact, and the last good release remains available.",
    visual: "pipeline",
  },
  {
    title: "Production performance issues",
    problem:
      "Latency, heap, or queue depth show up after go-live. Without a baseline or an owner, the first response is a restart and a guess.",
    approach:
      "Investigate with logs and metrics, add monitoring where it is missing, then optimize the hop that is actually slow. Ongoing support keeps that loop in place.",
    practices: [
      "Investigation",
      "Monitoring",
      "Optimization",
      "Ongoing support",
    ],
    outcome:
      "The next incident has a place to look and a person who can act. Performance work is a review habit, not a one-time tune-up.",
    visual: "performance",
  },
];

export const documentationPractice =
  "Clear technical documentation supports the whole path—assessment, design, release, and handover—rather than sitting on a single challenge.";
