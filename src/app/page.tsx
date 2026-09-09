import Hero from "@/components/sections/home/Hero";
import MarqueeBand from "@/components/sections/home/MarqueeBand";
import Manifesto from "@/components/sections/home/Manifesto";
import Stats from "@/components/sections/shared/Stats";
import SelectedWork from "@/components/sections/home/SelectedWork";
import ServicesPreview from "@/components/sections/home/ServicesPreview";
import Process from "@/components/sections/home/Process";
import Testimonials from "@/components/sections/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <Manifesto />
      <Stats />
      <SelectedWork />
      <ServicesPreview />
      <Process />
      <Testimonials />
    </>
  );
}
