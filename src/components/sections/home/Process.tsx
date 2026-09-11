"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data";
import { useIsoLayoutEffect } from "@/lib/hooks";

export default function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) return;

    const ctx = gsap.context(() => {
      const setup = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = viewport.clientWidth;
        const distance = Math.max(0, trackWidth - viewportWidth);

        const sectionHeight =
          window.innerHeight + distance;

        gsap.set(section, {
          height: sectionHeight,
        });

        gsap.set(track, {
          x: 0,
        });

        if (progressRef.current) {
          gsap.set(progressRef.current, {
            scaleX: 0,
            transformOrigin: "left center",
          });
        }

        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === section) {
            trigger.kill();
          }
        });

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const progress = self.progress;

            gsap.set(track, {
              x: -distance * progress,
            });

            if (progressRef.current) {
              gsap.set(progressRef.current, {
                scaleX: progress,
              });
            }
          },
        });

        ScrollTrigger.refresh();
      };

      const handleResize = () => {
        setup();
      };

      setup();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-ink"
    >
      <div
        ref={viewportRef}
        className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden"
      >
        <div className="shrink-0 px-5 md:px-10 lg:px-12">
          <SectionHeading
            label="How we work"
            title={"FROM IDEA\nTO IMPACT"}
            description="A process refined over 120+ launches — transparent at every step, obsessive at every detail."
          />

          <div className="mt-10 hidden h-px w-full overflow-hidden bg-white/10 lg:block">
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-0 bg-primary"
            />
          </div>
        </div>

        <div className="mt-12 w-full md:mt-16 lg:mt-20">
          <div
            ref={trackRef}
            className="flex w-max gap-5 px-5 md:gap-6 md:px-10 lg:gap-8 lg:px-12"
          >
            {processSteps.map((step) => (
              <article
                key={step.n}
                className="flex h-[420px] w-[calc(100vw-40px)] shrink-0 flex-col rounded-2xl border border-white/10 bg-inksoft/60 p-7 md:h-[440px] md:w-[420px] md:p-9 lg:h-[440px] lg:w-[32rem] lg:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-6xl font-bold leading-none text-stroke md:text-7xl">
                    {step.n}
                  </span>

                  <span
                    aria-hidden
                    className="text-2xl text-primary"
                  >
                    ✦
                  </span>
                </div>

                <h3 className="mt-7 font-display text-3xl font-semibold uppercase leading-tight tracking-tight md:text-4xl">
                  {step.title}
                </h3>

                <p className="mt-4 leading-relaxed text-accent/60">
                  {step.desc}
                </p>

                <ul className="mt-auto space-y-3 pt-8">
                  {step.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-accent/70"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <div className="w-10 shrink-0 lg:w-24" />
          </div>
        </div>
      </div>
    </section>
  );
}