import type { Metadata } from "next";
import PageHero from "@/components/sections/shared/PageHero";
import ServiceBlocks from "@/components/sections/services/ServiceBlocks";
import StackMarquee from "@/components/sections/services/StackMarquee";
import EngagementModels from "@/components/sections/services/EngagementModels";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, mobile apps, UI/UX design, cloud & DevOps and AI solutions — explore how OM Software Solutions builds your next product.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="What we do"
        title={"CAPABILITIES\nTHAT SHIP"}
        accentLine={1}
        description="Five disciplines, one senior team — every service covers strategy, design, engineering and launch under a single roof."
      />
      <ServiceBlocks />
      <StackMarquee />
      <EngagementModels />
    </>
  );
}
