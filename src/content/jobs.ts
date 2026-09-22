export type Job = {
  slug: string;
  title: string;
  location: string;
  employmentType: string;
  summary: string;
  description: string[];
};

export const careerInterests = [
  "General expression of interest",
  "MuleSoft development",
  "Architecture",
  "API design and development",
  "Migration and modernization",
  "DevOps and CI/CD",
  "Managed services",
  "Other",
] as const;

/**
 * Published openings. Leave this array empty when there are no vacancies.
 * Do not add placeholder or invented roles.
 *
 * Each object becomes a card on /careers and a page at /careers/<slug>.
 * The slug `apply` is reserved for the general application route.
 *
 * Example shape (commented — not a published vacancy):
 *
 * {
 *   slug: "mulesoft-developer",
 *   title: "MuleSoft Developer",
 *   location: "Remote — Philippines-based delivery",
 *   employmentType: "Full-time",
 *   summary: "Design and deliver API-led integrations on Anypoint Platform.",
 *   description: [
 *     "Work with architects and customer teams on Mule 4 APIs.",
 *     "Write DataWeave, MUnit, and notes the next engineer can run.",
 *   ],
 * }
 */
export const jobs: Job[] = [];

export function getJob(slug: string) {
  if (slug === "apply") return undefined;
  return jobs.find((job) => job.slug === slug);
}

export function jobInterestOptions() {
  const fromJobs = jobs.map((job) => job.title);
  return [...fromJobs, ...careerInterests];
}

export function defaultCareerInterest(preferred?: string) {
  const options = jobInterestOptions();
  if (preferred && options.includes(preferred)) return preferred;
  return "General expression of interest";
}
