"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLenisRef } from "@/components/providers/SmoothScroll";
import { useIsoLayoutEffect } from "@/lib/hooks";
import type { Project } from "@/lib/data";

/** Case-study lightbox — backdrop blur, panel rise, Esc / backdrop to close. */
export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lenisRef = useLenisRef();
  const isOpen = !!project;

  useIsoLayoutEffect(() => {
    if (!isOpen) return;
    lenisRef.current?.stop();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-backdrop]",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 56, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out" }
      );
    }, rootRef);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      ctx.revert();
      window.removeEventListener("keydown", onKey);
      lenisRef.current?.start();
    };
  }, [isOpen, onClose, lenisRef]);

  if (!project) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[120] flex items-end justify-center md:items-center md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <button
        data-backdrop
        onClick={onClose}
        aria-label="Close case study"
        className="absolute inset-0 bg-ink/85 backdrop-blur-md"
      />
      <div
        ref={panelRef}
        data-lenis-prevent
        className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-white/10 bg-inksoft md:rounded-3xl"
      >
        <div className="relative">
          <img
            src={project.image}
            alt={`${project.title} — ${project.tagline}`}
            className="h-60 w-full object-cover md:h-96"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-inksoft via-transparent to-transparent"
          />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-ink/70 text-lg text-accent backdrop-blur transition-colors hover:bg-primary hover:text-ink"
          >
            ✕
          </button>
        </div>

        <div className="p-6 md:p-10">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-accent/50">
            <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">
              {project.category}
            </span>
            <span>{project.year}</span>
          </div>

          <h3 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-3 font-display text-lg text-accent/70">{project.tagline}</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-accent/65">
            {project.description}
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 border-y border-white/10 py-8">
            {project.results.map((r) => (
              <div key={r.label}>
                <p className="font-display text-2xl font-bold text-primary md:text-4xl">
                  {r.value}
                </p>
                <p className="mt-1.5 text-[11px] uppercase tracking-wider text-accent/45">
                  {r.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 px-4 py-1.5 text-[11px] uppercase tracking-wider text-accent/55"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <p className="text-sm text-accent/50">Want results like these?</p>
            <Link
              href="/contact"
              onClick={onClose}
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-transform hover:scale-105"
            >
              Start a similar project ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
