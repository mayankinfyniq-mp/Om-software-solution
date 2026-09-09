"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";

/**
 * App Router template — remounts on every navigation, giving us lusion-style
 * curtain page transitions: an ink + saffron double curtain sweeps away to
 * reveal the incoming page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const ink = useRef<HTMLDivElement>(null);
  const primary = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(ink.current, { yPercent: -100, duration: 0.75, ease: "power4.inOut" }, 0.05)
        .to(primary.current, { yPercent: -100, duration: 0.75, ease: "power4.inOut" }, 0.16)
        .fromTo(root.current, { y: 28 }, { y: 0, duration: 0.9, ease: "power3.out" }, 0.2)
        .set([ink.current, primary.current], { display: "none" })
        .eventCallback("onComplete", () => ScrollTrigger.refresh());
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
        <div data-template-overlay ref={primary} className="absolute inset-0 bg-primary" />
        <div data-template-overlay ref={ink} className="absolute inset-0 bg-ink" />
      </div>
      {children}
    </div>
  );
}
