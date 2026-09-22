"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CaseStudyCard } from "@/components/case-study-card";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { caseStudies } from "@/content/case-studies";

const industries = ["All", ...new Set(caseStudies.map((study) => study.industry))];

export default function CaseStudiesPage() {
  const [industry, setIndustry] = useState("All");
  const filtered = useMemo(
    () =>
      industry === "All"
        ? caseStudies
        : caseStudies.filter((study) => study.industry === industry),
    [industry],
  );

  return (
    <section className="py-16">
      <Container>
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/case-studies", label: "Case Studies" },
          ]}
        />
        <h1 className="text-4xl font-semibold text-navy">Anonymized case studies</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate">
          These examples describe integration situations and qualitative outcomes. Customer
          names and confidential details are not published.
        </p>
        <div className="mt-8">
          <label htmlFor="case-industry" className="text-sm font-medium text-navy">
            Filter by industry
          </label>
          <select
            id="case-industry"
            className="mt-2 h-11 rounded-lg border border-input bg-white px-3 text-sm"
            value={industry}
            onChange={(event) => setIndustry(event.target.value)}
          >
            {industries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {filtered.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No case studies in that industry"
              description="Choose another industry or view all published examples."
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {filtered.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
