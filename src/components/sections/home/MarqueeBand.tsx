import Marquee from "@/components/ui/Marquee";
import { services } from "@/lib/data";

export default function MarqueeBand() {
  return (
    <section
      aria-hidden
      className="relative z-20 -mt-8 w-full overflow-hidden py-4 md:-mt-12 md:py-6"
    >
      <div className="w-full bg-primary py-4 md:py-5">
        <Marquee duration={24} className="w-full">
          {services.map((s) => (
            <span
              key={s.id}
              className="flex shrink-0 items-center"
            >
              <span className="mx-5 whitespace-nowrap font-display text-lg font-bold uppercase tracking-tight text-ink md:mx-8 md:text-3xl">
                {s.title}
              </span>

              <span className="text-ink/40">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}