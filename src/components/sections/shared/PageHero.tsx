import AnimatedHeading from "@/components/ui/AnimatedHeading";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

/**
 * Shared hero band for inner pages — eyebrow label, giant masked headline
 * (waits for the preloader on first load) and an optional description.
 */
export default function PageHero({
  label,
  title,
  accentLine,
  strokeLine,
  description,
}: {
  label: string;
  title: string;
  accentLine?: number;
  strokeLine?: number;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden px-5 pb-14 pt-32 md:px-10 md:pb-20 md:pt-44">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-[140px]"
      />
      <div className="relative">
        <Reveal y={20}>
          <SectionLabel>{label}</SectionLabel>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-8">
          <AnimatedHeading
            as="h1"
            trigger="enter"
            delay={0.1}
            text={title}
            accentLine={accentLine}
            strokeLine={strokeLine}
            className="font-display text-[clamp(2.9rem,9.5vw,8.75rem)] font-bold uppercase leading-[0.95] tracking-tight"
          />
          {description ? (
            <Reveal delay={0.5} className="mb-3 max-w-sm text-base leading-relaxed text-accent/60">
              {description}
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
