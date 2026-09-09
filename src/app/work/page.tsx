import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/sections/shared/PageHero";
import WorkGrid from "@/components/sections/work/WorkGrid";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by OM Software Solutions — fintech, healthcare, e-commerce, AI and WebGL experiences built between 2023 and 2026.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        label={`Portfolio · ${projects.length} case studies`}
        title={"SELECTED\nWORKS"}
        strokeLine={1}
        description="A snapshot of what happens when strategy, design and engineering sit at the same table."
      />
      <Suspense
        fallback={<div className="px-5 pb-40 text-accent/40 md:px-10">Loading projects…</div>}
      >
        <WorkGrid />
      </Suspense>
    </>
  );
}
