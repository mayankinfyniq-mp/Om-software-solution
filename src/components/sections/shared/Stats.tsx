import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import { stats } from "@/lib/data";

export default function Stats() {
  return (
    <section className="border-y border-white/5 bg-inksoft/50 px-5 py-14 md:px-10 md:py-20">
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {stats.map((s) => (
          <Reveal key={s.label} className="border-l border-white/10 pl-5 md:pl-8">
            <Counter
              value={s.value}
              suffix={s.suffix}
              className="font-display text-5xl font-bold tracking-tight text-accent md:text-6xl"
            />
            <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-accent/45">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
