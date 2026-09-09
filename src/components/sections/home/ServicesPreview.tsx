import Link from "next/link";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { services } from "@/lib/data";

/** Service index rows with a saffron fill that sweeps up on hover. */
export default function ServicesPreview() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-40">
      <SectionLabel>What we do</SectionLabel>
      <AnimatedHeading
        as="h2"
        trigger="scroll"
        text="OUR SERVICES"
        className="mt-6 font-display text-[clamp(2.4rem,6.5vw,6rem)] font-bold uppercase leading-[0.95] tracking-tight"
      />

      <div className="mt-14 border-b border-white/10">
        {services.map((s) => (
          <Reveal key={s.id} y={24}>
            <Link
              href="/services"
              className="group relative block overflow-hidden border-t border-white/10"
            >
              {/* hover fill */}
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-500 ease-expo group-hover:scale-y-100" />
              <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition-colors duration-300 group-hover:text-ink md:grid-cols-[5rem_1fr_auto_3rem] md:gap-8 md:py-9">
                <span className="font-display text-sm text-primary transition-colors duration-300 group-hover:text-ink/60">
                  ({s.id})
                </span>
                <h3 className="font-display text-2xl font-semibold uppercase tracking-tight md:text-5xl">
                  {s.title}
                </h3>
                <p className="hidden text-sm text-accent/50 transition-colors duration-300 group-hover:text-ink/70 md:block">
                  {s.short}
                </p>
                <span className="justify-self-end text-2xl text-primary transition-all duration-500 group-hover:rotate-45 group-hover:text-ink">
                  ↗
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
