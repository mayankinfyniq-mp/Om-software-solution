import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { engagementModels } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function EngagementModels() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-36">
      <SectionHeading
        label="How to work with us"
        title="ENGAGEMENT\nMODELS"
        description="Three ways to plug our team into yours — pick whichever de-risks your roadmap the most."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {engagementModels.map((m, i) => (
          <Reveal
            key={m.title}
            delay={i * 0.12}
            className={cn(
              "group rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-2",
              m.popular
                ? "relative border-primary/50 bg-primary/5 hover:border-primary"
                : "border-white/10 bg-inksoft/40 hover:border-white/30"
            )}
          >
            {m.popular && (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
                Most popular
              </span>
            )}
            <h3 className="font-display text-2xl font-semibold tracking-tight">{m.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-accent/60">{m.description}</p>
            <ul className="mt-7 space-y-3">
              {m.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-accent/75">
                  <span aria-hidden className="font-bold text-primary">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
