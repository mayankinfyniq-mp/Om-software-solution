import AnimatedHeading from "@/components/ui/AnimatedHeading";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/lib/data";

/** Full service breakdown — index / story + tags / deliverables checklist. */
export default function ServiceBlocks() {
  return (
    <section className="px-5 md:px-10">
      {services.map((s) => (
        <div
          key={s.id}
          className="grid gap-8 border-t border-white/10 py-16 md:py-24 lg:grid-cols-[5rem_1.2fr_1fr] lg:gap-14"
        >
          <Reveal y={24}>
            <span className="font-display text-lg font-semibold text-primary/80">/{s.id}</span>
          </Reveal>

          <div>
            <AnimatedHeading
              as="h2"
              trigger="scroll"
              text={s.title.toUpperCase()}
              className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl leading-relaxed text-accent/65">{s.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 px-4 py-1.5 text-[11px] uppercase tracking-wider text-accent/55"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:pt-2">
            <ul>
              {s.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-4 border-b border-white/5 py-4 text-sm text-accent/75"
                >
                  <span aria-hidden className="text-primary">✦</span>
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      ))}
      <div className="border-t border-white/10" />
    </section>
  );
}
