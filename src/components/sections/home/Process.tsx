"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data";
import { useIsoLayoutEffect } from "@/lib/hooks";

/**
 * Process — pinned horizontal scroll on desktop (scroll down → panels slide
 * left, progress line fills), a simple vertical stack on mobile.
 */
export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const distance = () => track.scrollWidth - window.innerWidth + 48;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 lg:min-h-svh lg:flex lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="px-5 md:px-10">
        <SectionHeading
          label="How we work"
          title={"FROM IDEA\nTO IMPACT"}
          description="A process refined over 120+ launches — transparent at every step, obsessive at every detail."
        />
        <div className="mt-12 hidden h-px bg-white/10 lg:block">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-primary" />
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-12 flex flex-col gap-8 px-5 md:px-10 lg:mt-16 lg:w-max lg:flex-row lg:gap-8 lg:pr-[10vw]"
      >
        {processSteps.map((step) => (
          <div
            key={step.n}
            className="flex shrink-0 flex-col rounded-2xl border border-white/10 bg-inksoft/60 p-8 md:p-10 lg:min-h-[21rem] lg:w-[32rem]"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-6xl font-bold leading-none text-stroke md:text-7xl">
                {step.n}
              </span>
              <span aria-hidden className="text-2xl text-primary">✦</span>
            </div>
            <h3 className="mt-7 font-display text-3xl font-semibold uppercase tracking-tight">
              {step.title}
            </h3>
            <p className="mt-3 leading-relaxed text-accent/60">{step.desc}</p>
            <ul className="mt-auto space-y-3 pt-8">
              {step.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-accent/70">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
