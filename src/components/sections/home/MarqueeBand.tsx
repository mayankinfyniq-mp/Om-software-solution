import Marquee from "@/components/ui/Marquee";
import { services } from "@/lib/data";

/** Saffron service ticker, slightly tilted — overlaps the hero's base. */
export default function MarqueeBand() {
  return (
    <section aria-hidden className="relative z-20 -mt-8 overflow-hidden py-4 md:-mt-12 md:py-6">
      <div className="-rotate-2 scale-[1.03] bg-primary py-4 md:py-5">
        <Marquee duration={24}>
          {services.map((s) => (
            <span key={s.id} className="flex items-center">
              <span className="mx-5 whitespace-nowrap font-display text-lg font-bold uppercase tracking-tight text-ink md:mx-8 md:text-3xl">
                {s.title}
              </span>
              <span className="text-ink/40">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
