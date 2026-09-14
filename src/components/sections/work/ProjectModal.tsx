"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useLenisRef } from "@/components/providers/SmoothScroll";
import { useIsoLayoutEffect } from "@/lib/hooks";
import type { Project } from "@/lib/data";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lenisRef = useLenisRef();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  useIsoLayoutEffect(() => {
    if (!project) return;

    const root = rootRef.current;
    const backdrop = backdropRef.current;
    const panel = panelRef.current;

    if (!root || !backdrop || !panel) return;

    lenisRef.current?.stop();

    const ctx = gsap.context(() => {
      gsap.set(root, {
        autoAlpha: 1,
      });

      gsap.fromTo(
        backdrop,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        panel,
        {
          autoAlpha: 0,
          y: 45,
          scale: 0.97,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        "[data-modal-content]",
        {
          autoAlpha: 0,
          y: 18,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.15,
          ease: "power3.out",
        }
      );
    }, root);

    return () => {
      ctx.revert();
      lenisRef.current?.start();
    };
  }, [project, lenisRef]);

  if (!mounted || !project) return null;

  return createPortal(
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex h-[100dvh] w-full items-center justify-center p-3 sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-[#060a12]/90 backdrop-blur-xl"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className="relative z-10 flex h-full max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl sm:max-h-[92dvh] sm:rounded-3xl"
      >
        <div className="relative shrink-0">
          <div className="relative h-[240px] overflow-hidden sm:h-[300px] md:h-[360px] lg:h-[420px]">
            <img
              src={project.image}
              alt={`${project.title} — ${project.tagline}`}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/30 via-transparent to-transparent" />
          </div>

          <div className="absolute left-5 top-5 flex items-center gap-2 sm:left-7 sm:top-7">
            <span className="rounded-full bg-primary px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
              {project.category}
            </span>

            <span className="rounded-full border border-white/15 bg-ink/50 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
              {project.year}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="group absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink/65 text-lg text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary hover:text-ink sm:right-7 sm:top-7"
          >
            <span className="transition-transform duration-300 group-hover:rotate-90">
              ✕
            </span>
          </button>

          <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-7 sm:right-7 md:bottom-10">
            <p
              data-modal-content
              className="mb-2 text-[10px] uppercase tracking-[0.28em] text-primary"
            >
              Case Study
            </p>

            <h2
              data-modal-content
              className="max-w-4xl font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-4xl md:text-6xl lg:text-7xl"
            >
              {project.title}
            </h2>

            <p
              data-modal-content
              className="mt-3 max-w-2xl font-display text-base text-white/65 sm:text-lg md:text-xl"
            >
              {project.tagline}
            </p>
          </div>
        </div>

        <div
          data-lenis-prevent
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          <div className="mx-auto max-w-5xl px-5 py-8 sm:px-7 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
            <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:gap-16">
              <div>
                <p
                  data-modal-content
                  className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary"
                >
                  Overview
                </p>

                <p
                  data-modal-content
                  className="mt-4 max-w-2xl text-sm leading-[1.9] text-accent/65 sm:text-base"
                >
                  {project.description}
                </p>
              </div>

              <div
                data-modal-content
                className="border-l border-white/10 pl-6 lg:pl-8"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent/40">
                  Technology
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 px-3.5 py-2 text-[10px] uppercase tracking-[0.14em] text-accent/60 transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              data-modal-content
              className="mt-10 grid grid-cols-1 border-y border-white/10 sm:grid-cols-3"
            >
              {project.results.map((result, index) => (
                <div
                  key={result.label}
                  className={`py-7 sm:px-6 sm:py-8 ${
                    index > 0
                      ? "border-t border-white/10 sm:border-l sm:border-t-0"
                      : ""
                  }`}
                >
                  <p className="font-display text-4xl font-bold leading-none text-primary md:text-5xl">
                    {result.value}
                  </p>

                  <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-accent/40">
                    {result.label}
                  </p>
                </div>
              ))}
            </div>

            <div
              data-modal-content
              className="mt-10 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"
            >
              <div>
                <p className="font-display text-xl font-semibold text-white">
                  Want results like these?
                </p>

                <p className="mt-1 text-sm text-accent/45">
                  Let&apos;s build something memorable together.
                </p>
              </div>

              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:scale-105 hover:bg-[#FF671F]"
              >
                Start a similar project
                <span className="ml-2 text-base">↗</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-ink to-transparent" />
      </div>
    </div>,
    document.body
  );
} 