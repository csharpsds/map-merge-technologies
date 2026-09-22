import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Case Studies",
  description:
    "Anonymized MuleSoft and integration case studies covering CloudHub modernization, government case flows, ERP connectivity, and support synchronization.",
  path: "/case-studies",
});

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
