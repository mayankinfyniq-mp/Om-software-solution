"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ParallaxImage from "@/components/ui/ParallaxImage";
import ProjectModal from "@/components/sections/work/ProjectModal";
import { gsap } from "@/lib/gsap";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useIsoLayoutEffect } from "@/lib/hooks";

const filters = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function WorkGrid() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const params = useSearchParams();

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  /* Deep-link support: /work?project=slug opens that case study directly. */
  useEffect(() => {
    const slug = params.get("project");
    if (!slug) return;
    const p = projects.find((x) => x.slug === slug);
    if (p) setActive(p);
  }, [params]);

  /* Re-animate the grid whenever the filter changes. */
  useIsoLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || !grid.children.length) return;
    const tween = gsap.fromTo(
      grid.children,
      { autoAlpha: 0, y: 32 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06, overwrite: true }
    );
    return () => {
      tween.kill();
    };
  }, [filter]);

  return (
    <>
      <section className="px-5 pb-28 md:px-10 md:pb-40">
        {/* Filters */}
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter projects by category">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300",
                filter === f
                  ? "border-primary bg-primary text-ink"
                  : "border-white/15 text-accent/60 hover:border-white/40 hover:text-accent"
              )}
            >
              {f}{" "}
              <span className="opacity-50">
                {f === "All" ? projects.length : projects.filter((p) => p.category === f).length}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24">
          {visible.map((p, i) => (
            <article key={p.slug} className={cn("group", i % 2 === 1 && "md:mt-20")}>
              <button
                onClick={() => setActive(p)}
                data-cursor-text="View"
                className="block w-full text-left"
                aria-label={`Open case study: ${p.title}`}
              >
                <ParallaxImage
                  src={p.image}
                  alt={`${p.title} — ${p.tagline}`}
                  className="aspect-[4/3] w-full rounded-2xl bg-inksoft"
                />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary md:text-3xl">
                      {p.title}
                    </h2>
                    <p className="mt-1.5 text-sm text-accent/50">{p.tagline}</p>
                  </div>
                  <span className="mt-1 text-xl text-accent/35 transition-all duration-300 group-hover:rotate-45 group-hover:text-primary">
                    ↗
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.2em] text-accent/40">
                  <span className="text-primary/70">{p.category}</span>
                  <span aria-hidden>·</span>
                  <span>{p.year}</span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
