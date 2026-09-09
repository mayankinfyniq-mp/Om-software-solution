import AnimatedHeading from "@/components/ui/AnimatedHeading";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

/** Label + big animated heading + optional right-aligned description. */
export default function SectionHeading({
  label,
  title,
  accentLine,
  strokeLine,
  description,
  className,
}: {
  label: string;
  title: string;
  accentLine?: number;
  strokeLine?: number;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-8", className)}>
      <div>
        <SectionLabel>{label}</SectionLabel>
        <AnimatedHeading
          as="h2"
          trigger="scroll"
          text={title}
          accentLine={accentLine}
          strokeLine={strokeLine}
          className="mt-6 font-display text-[clamp(2.2rem,5.5vw,5rem)] font-bold uppercase leading-[0.95] tracking-tight"
        />
      </div>
      {description ? (
        <Reveal className="mb-2 max-w-sm text-sm leading-relaxed text-accent/55">
          {description}
        </Reveal>
      ) : null}
    </div>
  );
}
