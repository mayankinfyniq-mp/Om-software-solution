import Link from "next/link";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { projects } from "@/lib/data";

export default function SelectedWork() {
  const featured = projects.slice(0, 4);

  return (
    <section className="px-5 py-24 md:px-10 md:py-40">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <SectionLabel>Selected work · 2023 — 2026</SectionLabel>
          <AnimatedHeading
            as="h2"
            trigger="scroll"
            text="FEATURED PROJECTS"
            className="mt-6 font-display text-[clamp(2.4rem,6.5vw,6rem)] font-bold uppercase leading-[0.95] tracking-tight"
          />
        </div>
        <Reveal className="mb-2">
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:border-primary hover:text-primary"
          >
            All works
            <span className="transition-transform duration-300 group-hover:rotate-45">↗</span>
          </Link>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-x-8 gap-y-16 md:mt-24 md:grid-cols-2 md:gap-y-24">
        {featured.map((p, i) => (
          <Reveal key={p.slug} className={i % 2 === 1 ? "md:mt-24" : ""}>
            <Link href={`/work?project=${p.slug}`} data-cursor-text="View" className="group block">
              <ParallaxImage
                src={p.image}
                alt={`${p.title} — ${p.tagline}`}
                className="aspect-[4/3] w-full rounded-2xl bg-inksoft"
              />
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-accent/50">{p.tagline}</p>
                </div>
                <span className="mt-1 text-xl text-accent/35 transition-all duration-300 group-hover:rotate-45 group-hover:text-primary">
                  ↗
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.2em] text-accent/40">
                <span className="text-primary/70">{p.category}</span>
                <span aria-hidden>·</span>
                <span>{p.tags.slice(0, 3).join(" · ")}</span>
                <span aria-hidden>·</span>
                <span>{p.year}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
