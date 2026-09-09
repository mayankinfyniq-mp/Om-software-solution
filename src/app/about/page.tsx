import type { Metadata } from "next";
import PageHero from "@/components/sections/shared/PageHero";
import Stats from "@/components/sections/shared/Stats";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import ScrubText from "@/components/ui/ScrubText";
import SectionHeading from "@/components/ui/SectionHeading";
import { capabilities, milestones, values } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the designers and engineers behind OM Software Solutions — a senior studio crafting world-class digital products from Ahmedabad, India since 2016.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About us"
        title={"SOFTWARE\nWITH A SOUL"}
        accentLine={1}
        description="We're a 40-person team of designers and engineers from Ahmedabad, Gujarat — building digital products for clients across 6 countries."
      />

      {/* Studio image */}
      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <ParallaxImage
          src="/images/about-studio.jpg"
          alt="Abstract 3D composition representing the craft of the OM Software Solutions studio"
          className="aspect-[16/11] w-full rounded-2xl bg-inksoft md:aspect-[21/9]"
        />
        <Reveal y={16} className="mt-4 flex justify-between text-[11px] uppercase tracking-[0.25em] text-accent/40">
          <span>OM Studio · Ahmedabad</span>
          <span>Since 2016</span>
        </Reveal>
      </section>

      {/* Story */}
      <section className="px-5 md:px-10">
        <ScrubText
          className="max-w-6xl font-display text-[clamp(1.6rem,4vw,3.5rem)] font-medium leading-[1.2] tracking-tight"
          text="We started OM with three engineers and a belief: that software from India could compete with the *best studios in the world* — on craft, not just cost. Ten years and *120+ products* later, we're just getting started."
        />
      </section>

      {/* Values */}
      <section className="px-5 py-24 md:px-10 md:py-36">
        <SectionHeading label="What we believe" title="OUR VALUES" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 0.1}
              className="group rounded-2xl border border-white/10 bg-inksoft/40 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50"
            >
              <span className="font-display text-sm font-semibold text-primary/70">
                0{i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                {v.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-accent/55">{v.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Stats />

      {/* Timeline */}
      <section className="px-5 py-24 md:px-10 md:py-36">
        <SectionHeading label="The journey" title="TEN YEARS\nOF CRAFT" />
        <div className="mt-14 border-b border-white/10">
          {milestones.map((m, i) => (
            <Reveal
              key={m.year}
              delay={Math.min(i * 0.05, 0.2)}
              y={28}
              className="grid gap-2 border-t border-white/10 py-8 md:grid-cols-[8rem_14rem_1fr] md:gap-8 md:py-10"
            >
              <span className="font-display text-3xl font-bold text-primary md:text-4xl">
                {m.year}
              </span>
              <h3 className="font-display text-xl font-semibold md:text-2xl">{m.title}</h3>
              <p className="max-w-xl leading-relaxed text-accent/60">{m.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-5 pb-28 md:px-10 md:pb-40">
        <SectionHeading label="What we're great at" title="CAPABILITIES" />
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.12}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-primary/80">
                {cap.title}
              </p>
              <ul className="mt-4 border-b border-white/10">
                {cap.items.map((item, j) => (
                  <li
                    key={item}
                    className="group flex items-baseline justify-between border-t border-white/10 py-5 transition-colors hover:text-primary"
                  >
                    <span className="font-display text-xl font-medium tracking-tight md:text-2xl">
                      {item}
                    </span>
                    <span className="text-xs text-accent/35">0{j + 1}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
