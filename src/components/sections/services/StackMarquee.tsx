import Marquee from "@/components/ui/Marquee";
import { techStack } from "@/lib/data";

export default function StackMarquee() {
  return (
    <section aria-hidden className="overflow-hidden border-y border-white/5 py-8 md:py-10">
      <Marquee duration={30}>
        {techStack.map((t) => (
          <span
            key={t}
            className="mx-3 whitespace-nowrap rounded-full border border-white/10 px-6 py-2.5 font-display text-sm uppercase tracking-wider text-accent/60"
          >
            {t}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
