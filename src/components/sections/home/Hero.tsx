"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { useIsoLayoutEffect } from "@/lib/hooks";

/* Heavy WebGL bundle — client-only, code-split from the rest of the page. */
const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Meta elements fade in after the headline, once the preloader lifts. */
      const metas = gsap.utils.toArray<HTMLElement>("[data-hero-meta]");
      gsap.set(metas, { autoAlpha: 0, y: 26 });

      let onEnter: (() => void) | null = null;
      const play = () =>
        gsap.to(metas, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.75,
        });

      if (window.__omEnter) play();
      else {
        onEnter = () => play();
        window.addEventListener("om:enter", onEnter, { once: true });
      }

      /* Scroll-out parallax — content drifts up, canvas sinks & dims. */
      gsap.to(contentRef.current, {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(canvasWrapRef.current, {
        opacity: 0.15,
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => {
        if (onEnter) window.removeEventListener("om:enter", onEnter);
      };
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* WebGL particle orb */}
      <div ref={canvasWrapRef} className="absolute inset-0">
        <HeroCanvas className="h-full w-full" />
      </div>

      {/* Cinematic vignette into the page background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,15,28,0.68),rgba(10,15,28,0)_30%,rgba(10,15,28,0)_55%,#0A0F1C)]"
      />

      {/* Side annotation */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] uppercase tracking-[0.4em] text-accent/35 lg:block"
      >
        ✦ Web · Mobile · AI · Cloud
      </span>

      <div ref={contentRef} className="relative z-10 px-5 pb-8 pt-36 md:px-10 md:pb-12">
        {/* Eyebrow */}
        <div
          data-hero-meta
          className="mb-8 flex flex-wrap items-center justify-between gap-4 text-[10px] font-medium uppercase tracking-[0.3em] text-accent/55 md:text-xs"
        >
          <span>Digital product studio</span>
          <span className="hidden md:block">Est. 2026 — Ahmedabad, India</span>
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-primary" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for new projects
          </span>
        </div>

        {/* Headline */}
        <AnimatedHeading
          as="h1"
          trigger="enter"
          delay={0.15}
          text={"WE CRAFT\nIMMERSIVE ✦\nEXPERIENCES"}
          accentLine={1}
          strokeLine={2}
          className="font-display text-[clamp(3rem,10.5vw,9.5rem)] font-bold uppercase leading-[0.94] tracking-tight"
        />

        {/* Sub + scroll hint */}
        <div data-hero-meta className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <p className="max-w-md text-sm leading-relaxed text-accent/65 md:text-base">
            We are <span className="text-accent">OM Software Solutions</span> — a
            full-stack studio blending design, engineering and motion to ship
            digital products people remember.
          </p>
          <div className="hidden items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-accent/45 sm:flex">
            Scroll to explore
            <span className="relative block h-px w-16 overflow-hidden bg-white/15">
              <span className="animate-scan absolute inset-y-0 left-0 w-full bg-primary" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
