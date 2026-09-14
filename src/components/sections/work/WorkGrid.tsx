"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ParallaxImage from "@/components/ui/ParallaxImage";
import ProjectModal from "@/components/sections/work/ProjectModal";
import { gsap } from "@/lib/gsap";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useIsoLayoutEffect } from "@/lib/hooks";

const filters = [
  "All",
  ...Array.from(new Set(projects.map((project) => project.category))),
];

export default function WorkGrid() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<Project | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  const params = useSearchParams();

  const visible = useMemo(() => {
    if (filter === "All") return projects;

    return projects.filter(
      (project) => project.category === filter
    );
  }, [filter]);

  useEffect(() => {
    const slug = params.get("project");

    if (!slug) return;

    const project = projects.find(
      (item) => item.slug === slug
    );

    if (project) {
      setActive(project);
    }
  }, [params]);

  useIsoLayoutEffect(() => {
    const grid = gridRef.current;

    if (!grid || !grid.children.length) return;

    const animation = gsap.fromTo(
      grid.children,
      {
        autoAlpha: 0,
        y: 30,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.07,
        overwrite: true,
      }
    );

    return () => {
      animation.kill();
    };
  }, [filter]);

  const openProject = (project: Project) => {
    setActive(project);
  };

  const closeProject = () => {
    setActive(null);
  };

  return (
    <>
      <section className="px-5 pb-28 md:px-10 md:pb-40">
        <div
          className="flex flex-wrap gap-2.5"
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map((item) => {
            const count =
              item === "All"
                ? projects.length
                : projects.filter(
                    (project) => project.category === item
                  ).length;

            const selected = filter === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={selected}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300",
                  selected
                    ? "border-primary bg-primary text-ink"
                    : "border-white/15 text-accent/60 hover:border-primary/50 hover:text-accent"
                )}
              >
                {item}

                <span
                  className={cn(
                    "ml-1.5",
                    selected
                      ? "text-ink/55"
                      : "text-accent/30"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24"
        >
          {visible.map((project, index) => (
            <article
              key={project.slug}
              className={cn(
                "group",
                index % 2 === 1 && "md:mt-20"
              )}
            >
              <button
                type="button"
                onClick={() => openProject(project)}
                data-cursor-text="View"
                className="block w-full text-left"
                aria-label={`Open case study: ${project.title}`}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <ParallaxImage
                    src={project.image}
                    alt={`${project.title} — ${project.tagline}`}
                    className="aspect-[4/3] w-full bg-inksoft"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="pointer-events-none absolute bottom-5 left-5 flex translate-y-3 items-center gap-2 rounded-full border border-white/15 bg-ink/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    View case study
                    <span className="text-primary">↗</span>
                  </div>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary md:text-3xl">
                      {project.title}
                    </h2>

                    <p className="mt-1.5 text-sm text-accent/50">
                      {project.tagline}
                    </p>
                  </div>

                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-lg text-accent/35 transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-ink">
                    ↗
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.2em] text-accent/40">
                  <span className="text-primary/70">
                    {project.category}
                  </span>

                  <span aria-hidden>·</span>

                  <span>{project.year}</span>
                </div>
              </button>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm uppercase tracking-[0.2em] text-accent/40">
              No projects found
            </p>
          </div>
        )}
      </section>

      <ProjectModal
        project={active}
        onClose={closeProject}
      />
    </>
  );
}