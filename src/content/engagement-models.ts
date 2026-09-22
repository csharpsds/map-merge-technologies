export type EngagementModel = {
  slug: string;
  title: string;
  description: string;
  suitedFor: string;
};

export const engagementModels: EngagementModel[] = [
  {
    slug: "staff-augmentation",
    title: "Staff Augmentation",
    description: "Add experienced MuleSoft professionals to an existing delivery team.",
    suitedFor:
      "Teams that already have a backlog, architecture direction, and delivery process, but need additional MuleSoft capacity.",
  },
  {
    slug: "dedicated-mulesoft-team",
    title: "Dedicated MuleSoft Team",
    description:
      "Build a Philippines-based development and architecture team aligned with the customer's processes.",
    suitedFor:
      "Organizations that want a stable integration squad working to their tools, ceremonies, and coding standards.",
  },
  {
    slug: "project-based-delivery",
    title: "Project-Based Delivery",
    description:
      "Deliver a defined integration initiative from discovery through production deployment.",
    suitedFor:
      "Migrations, new API programs, or system-connection projects with a clear outcome and timeline.",
  },
  {
    slug: "architecture-and-advisory",
    title: "Architecture and Advisory",
    description:
      "Provide expert technical guidance for architecture, modernization, security, governance, and performance.",
    suitedFor:
      "Customers who need design reviews, platform decisions, or a roadmap before committing a full delivery team.",
  },
  {
    slug: "managed-services",
    title: "Managed Services",
    description:
      "Provide maintenance, production support, monitoring, enhancements, and continuous improvement.",
    suitedFor:
      "Live MuleSoft landscapes that need reliable operations, release support, and planned improvement—not a one-off project.",
  },
];
