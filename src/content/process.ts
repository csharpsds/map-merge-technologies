export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discovery",
    description:
      "We learn the systems, constraints, stakeholders, and outcomes that matter so the work starts from the real operating context.",
  },
  {
    step: 2,
    title: "Assessment",
    description:
      "We review the current integrations, platform setup, risks, and gaps, then identify what should be reused, retired, or redesigned.",
  },
  {
    step: 3,
    title: "Solution Design",
    description:
      "We define the API-led or integration pattern, security model, environments, and delivery plan before implementation begins.",
  },
  {
    step: 4,
    title: "Implementation",
    description:
      "We build MuleSoft applications, transformations, and supporting automation with reusable standards and clear documentation.",
  },
  {
    step: 5,
    title: "Testing",
    description:
      "We prove behavior with MUnit, integration tests, and targeted performance checks so defects are found before they reach production.",
  },
  {
    step: 6,
    title: "Deployment",
    description:
      "We release through controlled pipelines, environment checks, and rollback plans that match your change-management process.",
  },
  {
    step: 7,
    title: "Knowledge Transfer",
    description:
      "We hand over design decisions, runbooks, and operating guidance so your team can own and extend the solution.",
  },
  {
    step: 8,
    title: "Support and Optimization",
    description:
      "We stay available for production support, monitoring, enhancements, and the next wave of modernization.",
  },
];
