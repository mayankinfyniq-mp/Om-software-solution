"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useIsoLayoutEffect } from "@/lib/hooks";

/** Auto-rotating testimonials with a soft crossfade. */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  useIsoLayoutEffect(() => {
    if (!quoteRef.current) return;
    gsap.fromTo(
      quoteRef.current,
      { autoAlpha: 0, y: 26 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [index]);

  const t = testimonials[index];

  return (
    <section className="relative overflow-hidden border-t border-white/5 px-5 py-24 md:px-10 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <SectionLabel className="justify-center">Kind words</SectionLabel>
        <div ref={quoteRef} className="mt-10">
          <p className="font-display text-2xl font-medium leading-snug tracking-tight text-accent md:text-4xl">
            <span className="text-primary">“</span>
            {t.quote}
            <span className="text-primary">”</span>
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.25em] text-accent/50">
            {t.author} · <span className="text-primary/80">{t.role}</span>
          </p>
        </div>
        <div className="mt-10 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-[400ms]",
                i === index ? "w-8 bg-primary" : "w-1.5 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
