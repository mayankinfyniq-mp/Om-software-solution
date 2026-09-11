"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLenisRef } from "@/components/providers/SmoothScroll";
import { navLinks, socials } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useIsoLayoutEffect } from "@/lib/hooks";

/**
 * Full-screen navigation overlay — slides down like a curtain, links rise
 * through their masks with a stagger, then everything reverses on close.
 */
export default function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const lenisRef = useLenisRef();
  const pathname = usePathname();

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(root.current, { visibility: "visible" })
        .fromTo(
          root.current,
          { yPercent: -100 },
          { yPercent: 0, duration: 0.7, ease: "power4.inOut" }
        )
        .fromTo(
          "[data-menu-link]",
          { yPercent: 130 },
          { yPercent: 0, duration: 0.75, stagger: 0.07, ease: "power4.out" },
          "-=0.28"
        )
        .fromTo(
          "[data-menu-meta]",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" },
          "-=0.45"
        );
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timeline = tl.current;
    if (!timeline) return;
    if (open) {
      lenisRef.current?.stop();
      timeline.timeScale(1).play();
    } else {
      timeline.timeScale(1.35).reverse();
      lenisRef.current?.start();
    }
  }, [open, lenisRef]);

  return (
    <div
      ref={root}
      aria-hidden={!open}
      className="fixed inset-0 z-[60] overflow-hidden bg-ink"
      style={{ visibility: "hidden" }}
    >
      {/* Decorative layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 select-none font-display text-[34vw] font-bold leading-none text-white/[0.03]"
      >
        ॐ
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="relative flex h-full flex-col justify-between px-5 pb-8 pt-24 md:px-10 md:pt-28">
        <nav aria-label="Main navigation">
          <ul className="space-y-1 md:space-y-3">
            {navLinks.map((link, i) => (
              <li key={link.href} className="overflow-hidden">
                <Link
                  href={link.href}
                  onClick={onClose}
                  data-cursor-text="Go"
                  className="group flex items-baseline gap-4 md:gap-7"
                >
                  <span className="font-display text-xs font-semibold text-primary/70 md:text-sm">
                    0{i + 1}
                  </span>
                  <span className="inline-block overflow-hidden">
                    <span
                      data-menu-link
                      className={cn(
                        "inline-block font-display text-[clamp(2.6rem,8vw,6.5rem)] font-bold uppercase leading-[1.04] tracking-tight transition-colors duration-300 group-hover:text-primary",
                        pathname === link.href && "text-primary"
                      )}
                    >
                      {link.label}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-wrap items-end justify-between gap-8 text-sm">
          <div data-menu-meta>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent/40">
              New business
            </p>
            <a
              href="mailto:omsoftwaresolutionsindia@gmail.com"
              className="link-line mt-2 inline-block font-display text-lg text-accent md:text-xl"
            >
              omsoftwaresolutionsindia@gmail.com
            </a>
          </div>
          <div data-menu-meta>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent/40">Socials</p>
            <div className="mt-2 flex gap-4 text-accent/70">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-line transition-colors hover:text-primary"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
