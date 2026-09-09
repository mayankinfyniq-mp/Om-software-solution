"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";

/**
 * Custom cursor — a saffron dot with a trailing ring. The ring morphs into a
 * filled saffron bubble with a label (e.g. "View") over elements marked with
 * `data-cursor-text`. Desktop pointers only; falls back to the native cursor
 * on touch devices and for users who prefer reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.documentElement.classList.add("custom-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let shown = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, input, textarea, label, select, [data-cursor-text]"
      );
      const text = target?.getAttribute("data-cursor-text");

      if (text) {
        label.textContent = text;
        gsap.to(label, { autoAlpha: 1, duration: 0.25 });
        gsap.to(ring, {
          scale: 2.7,
          backgroundColor: "rgba(255,103,31,0.95)",
          borderColor: "rgba(255,103,31,0)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { autoAlpha: 0, duration: 0.2 });
      } else if (target) {
        label.textContent = "";
        gsap.to(label, { autoAlpha: 0, duration: 0.15 });
        gsap.to(ring, {
          scale: 1.7,
          backgroundColor: "rgba(255,103,31,0.12)",
          borderColor: "rgba(255,103,31,0.7)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
      } else {
        label.textContent = "";
        gsap.to(label, { autoAlpha: 0, duration: 0.15 });
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "rgba(255,103,31,0)",
          borderColor: "rgba(248,250,252,0.4)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
      }
    };

    const onLeave = () => {
      shown = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      gsap.set(dot, { x, y });
      gsap.set(ring, { x: rx, y: ry });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    gsap.ticker.add(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[210] h-1.5 w-1.5 rounded-full bg-primary opacity-0"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[209] flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 opacity-0"
      >
        <span
          ref={labelRef}
          className="text-[9px] font-bold uppercase tracking-widest text-ink opacity-0"
        >
          View
        </span>
      </div>
    </>
  );
}
