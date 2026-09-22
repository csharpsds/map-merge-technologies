export type ExpertiseGroup = {
  id: string;
  title: string;
  items: string[];
};

export const expertiseGroups: ExpertiseGroup[] = [
  {
    id: "mulesoft-development",
    title: "MuleSoft Development",
    items: [
      "Mule 4",
      "DataWeave",
      "Anypoint Studio",
      "RAML",
      "REST APIs",
      "SOAP services",
      "Batch processing",
      "Event-driven integration",
      "MUnit",
    ],
  },
  {
    id: "anypoint-platform",
    title: "Anypoint Platform",
    items: [
      "API Manager",
      "Runtime Manager",
      "Anypoint Exchange",
      "Anypoint Monitoring",
      "CloudHub 1.0 and 2.0",
      "Runtime Fabric",
      "Private Spaces",
      "Anypoint MQ",
      "Secrets Manager",
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    items: [
      "API-led connectivity",
      "System APIs",
      "Process APIs",
      "Experience APIs",
      "Integration architecture",
      "API governance",
      "Security",
      "Scalability",
      "Design reviews",
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    items: [
      "Maven",
      "Git",
      "Azure DevOps",
      "GitHub Actions",
      "Jenkins",
      "Automated testing",
      "Environment management",
      "Deployment automation",
    ],
  },
];
