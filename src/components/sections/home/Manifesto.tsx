import Link from "next/link";
import ScrubText from "@/components/ui/ScrubText";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";

export default function Manifesto() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-40">
      <SectionLabel>Who we are</SectionLabel>
      <ScrubText
        className="mt-8 max-w-6xl font-display text-[clamp(1.7rem,4.5vw,4rem)] font-medium leading-[1.18] tracking-tight"
        text="OM Software Solutions is an independent studio of *designers* and *engineers* crafting digital products with cinematic detail — software that feels *alive*, performs flawlessly and moves your business *forward*."
      />
      <Reveal className="mt-14">
        <Link
          href="/about"
          className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent/70 transition-colors hover:text-primary"
        >
          <span className="link-line">More about the studio</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">↗</span>
        </Link>
      </Reveal>
    </section>
  );
}
