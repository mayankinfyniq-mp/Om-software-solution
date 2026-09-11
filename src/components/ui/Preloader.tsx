"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
import { useLenisRef } from "@/components/providers/SmoothScroll";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lenisRef = useLenisRef();
  const [done, setDone] = useState(false);

  useIsoLayoutEffect(() => {
    const el = root.current;

    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.documentElement.classList.add("is-loading");
    lenisRef.current?.stop();

    const counter = { v: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setDone(true),
      });

      tl.to(counter, {
        v: 100,
        duration: reduced ? 0.4 : 1.9,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(counter.v);

          if (numRef.current) {
            numRef.current.textContent = String(v).padStart(3, "0");
          }

          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${v / 100})`;
          }
        },
      })
        .to(
          "[data-pre-inner]",
          {
            yPercent: -60,
            autoAlpha: 0,
            duration: 0.45,
            ease: "power3.in",
          },
          "+=0.15"
        )
        .add(() => {
          window.__omEnter = true;
          window.dispatchEvent(new Event("om:enter"));

          document.documentElement.classList.remove("is-loading");

          lenisRef.current?.start();
        })
        .to(
          "[data-pre-ink]",
          {
            yPercent: -100,
            duration: 0.85,
            ease: "power4.inOut",
          },
          "-=0.05"
        )
        .to(
          "[data-pre-primary]",
          {
            yPercent: -100,
            duration: 0.85,
            ease: "power4.inOut",
          },
          "-=0.68"
        )
        .set(el, {
          display: "none",
        });
    }, el);

    return () => ctx.revert();
  }, [lenisRef]);

  if (done) return null;

  return (
    <div
      data-preloader
      ref={root}
      className="fixed inset-0 z-[100]"
      aria-hidden
    >
      <div
        data-pre-primary
        className="absolute inset-0 bg-primary"
      />

      <div
        data-pre-ink
        className="absolute inset-0 flex flex-col justify-between bg-ink px-5 py-6 md:px-10 md:py-8"
      >
        <div
          data-pre-inner
          className="flex h-full flex-col items-center justify-center"
        >
          <div className="flex items-center gap-5 md:gap-7">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/20 p-2 shadow-[0_0_40px_rgba(235,137,26,0.12)] md:h-32 md:w-32 md:p-3">
              <img
                src="/images/logo.png"
                alt="OM Software Solutions"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex flex-col justify-center">
              <span className="font-display text-2xl font-bold uppercase leading-none tracking-[0.08em] text-white md:text-4xl">
                OM Software
              </span>

              <span className="mt-2 text-sm font-medium uppercase leading-none tracking-[0.4em] text-white/50 md:mt-3 md:text-base">
                Solutions
              </span>
            </div>
          </div>
        </div>

        <div
          data-pre-inner
          className="flex items-end justify-between"
        >
          <p className="max-w-[12rem] text-[10px] uppercase leading-relaxed tracking-[0.25em] text-accent/40">
            Crafting cinematic digital experiences
          </p>

          <div className="font-display text-5xl font-bold tabular-nums text-accent/90 md:text-7xl">
            <span ref={numRef}>000</span>
            <span className="text-primary">%</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-[3px] w-full bg-white/5">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0 bg-primary"
          />
        </div>
      </div>
    </div>
  );
}